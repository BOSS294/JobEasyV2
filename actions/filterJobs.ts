'use server';

import { PrismaClient } from '@prisma/client';
import hiringCafeJobs from '@/data/hiring-cafe-jobs.json';

const prisma = new PrismaClient();

type ExternalJob = {
  title: string;
  company: string;
  experience?: string;
  salary?: string;
  location?: string | string[];
  skills?: string[];
};

type JobWithSkills = {
  JobName: string;
  CompanyName: string;
  Location: string | null;
  Description: string | null;
  Salary: string | null;
  Experience: number | null;
  skills: Array<{ name: string }>;
};

const parseYears = (value?: string): number | null => {
  if (!value) return null;
  const nums = value.match(/\d+/g);
  if (!nums || nums.length === 0) return null;
  return parseInt(nums[nums.length - 1], 10);
};

const normalizeExternalJob = (job: ExternalJob): JobWithSkills => ({
  JobName: job.title,
  CompanyName: job.company,
  Location: Array.isArray(job.location) ? job.location.join(', ') : job.location ?? null,
  Description: null,
  Salary: job.salary ?? null,
  Experience: parseYears(job.experience),
  skills: (job.skills ?? []).map((skill) => ({ name: skill })),
});

export async function filterJobs(skills: string[], experience: string) {
  const normalizedSkills = skills.map((skill) => skill.toLowerCase());
  const experienceYears = parseInt(experience, 10);

  const whereWithSkills = {
    ...(normalizedSkills.length > 0 && {
      skills: {
        some: {
          name: {
            in: normalizedSkills,
            mode: 'insensitive' as const,
          },
        },
      },
    }),
  };

  let dbJobs: JobWithSkills[] = [];

  try {
    dbJobs = await prisma.jobs.findMany({
      where: {
        ...whereWithSkills,
        ...(experience && !Number.isNaN(experienceYears) && {
          Experience: {
            lte: experienceYears,
          },
        }),
      },
      include: {
        skills: true,
      },
    }) as unknown as JobWithSkills[];
  } catch (error: unknown) {
    const prismaError = error as { code?: string };
    if (prismaError.code === 'P2022') {
      // Older databases may not have Jobs.Experience yet; retry without experience filtering.
      dbJobs = await prisma.jobs.findMany({
        where: whereWithSkills,
        include: {
          skills: true,
        },
      }) as unknown as JobWithSkills[];
    } else {
      throw error;
    }
  }

  const externalMatches = (hiringCafeJobs as ExternalJob[])
    .filter((job) => {
      const jobSkills = (job.skills ?? []).map((skill) => skill.toLowerCase());
      const skillMatch = normalizedSkills.length === 0 || normalizedSkills.some((skill) => jobSkills.includes(skill));
      const maxExp = parseYears(job.experience);
      const expMatch = Number.isNaN(experienceYears) || maxExp === null || maxExp <= experienceYears;
      return skillMatch && expMatch;
    })
    .slice(0, 40)
    .map(normalizeExternalJob);

  const merged = [...dbJobs, ...externalMatches];
  const deduped = new Map<string, JobWithSkills>();

  merged.forEach((job) => {
    const key = `${job.JobName.toLowerCase()}::${job.CompanyName.toLowerCase()}`;
    if (!deduped.has(key)) deduped.set(key, job as JobWithSkills);
  });

  return Array.from(deduped.values());
}
