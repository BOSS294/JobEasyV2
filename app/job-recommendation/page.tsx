"use client";

import React, { useEffect, useState } from "react";
import { Search, AlertTriangle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { filterJobs } from "@/actions/filterJobs";
import hiringCafeJobs from "@/data/hiring-cafe-jobs.json";
import Navbar from "@/components/LandingPage/Navbar";
import Link from "next/link";

type JobSkill = { name: string };
type JobCard = {
  JobName: string;
  CompanyName: string;
  Location?: string | null;
  Description?: string | null;
  Salary?: string | null;
  Experience?: number | null;
  skills: JobSkill[];
  matchPercent: number;
  matchedSkills: string[];
};

type ResumeData = {
  Skills?: string;
  Experience?: string;
};

type ExternalJob = {
  title: string;
  company: string;
  location?: string | string[];
  salary?: string;
  skills?: string[];
  experience?: string;
};

const JobRecommendationsPage: React.FC = () => {
  const [jobs, setJobs] = useState<JobCard[]>([]);
  const [fallbackJobs, setFallbackJobs] = useState<JobCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [hasResumeData, setHasResumeData] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const resumeData = localStorage.getItem("resumeData");

        if (resumeData) {
          const parsedData: ResumeData = JSON.parse(resumeData);

          const storedSkills =
            parsedData.Skills?.split(",")
              .map((skill: string) => skill.trim().toLowerCase())
              .filter(Boolean) || [];

          const storedExperience = parsedData.Experience?.match(/\d+/)?.[0] || "0";
          const missing: string[] = [];

          if (storedSkills.length === 0) missing.push("skills");
          if (!parsedData.Experience?.trim()) missing.push("experience");
          setMissingFields(missing);

          const jobData = await filterJobs(storedSkills, storedExperience);
          const scoredJobs: JobCard[] = jobData.map((job) => {
            const jobSkills = (job.skills || []).map((s: JobSkill) => s.name?.toLowerCase());
            const matchedSkills = jobSkills.filter((skill: string) =>
              storedSkills.includes(skill)
            );
            const skillMatchPercent = Math.round(
              (matchedSkills.length / jobSkills.length) * 100 || 0
            );

            return {
              ...job,
              matchPercent: skillMatchPercent,
              matchedSkills,
            };
          });

          setJobs(scoredJobs);

          const fallback: JobCard[] = (hiringCafeJobs as ExternalJob[])
            .slice(0, 8)
            .map((job) => {
              const normalizedSkills = (job.skills ?? []).map((skill) => ({ name: skill }));
              const jobSkillNames = normalizedSkills.map((skill) => skill.name.toLowerCase());
              const matchedSkills = jobSkillNames.filter((skill) => storedSkills.includes(skill));
              const score = Math.max(55, Math.round((matchedSkills.length / (jobSkillNames.length || 1)) * 100));

              return {
                JobName: job.title,
                CompanyName: job.company,
                Location: Array.isArray(job.location) ? job.location.join(", ") : job.location ?? "Remote",
                Description: "Fallback suggestion from our broader job pool.",
                Salary: job.salary ?? "Not disclosed",
                Experience: null,
                skills: normalizedSkills,
                matchPercent: score,
                matchedSkills,
              };
            });

          setFallbackJobs(fallback);
        } else {
          setHasResumeData(false);
          setMissingFields(["skills", "experience"]);
          const fallbackOnly: JobCard[] = (hiringCafeJobs as ExternalJob[])
            .slice(0, 8)
            .map((job) => ({
              JobName: job.title,
              CompanyName: job.company,
              Location: Array.isArray(job.location) ? job.location.join(", ") : job.location ?? "Remote",
              Description: "General recommendation while we wait for your resume data.",
              Salary: job.salary ?? "Not disclosed",
              Experience: null,
              skills: (job.skills ?? []).map((skill) => ({ name: skill })),
              matchPercent: 60,
              matchedSkills: [],
            }));
          setFallbackJobs(fallbackOnly);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.JobName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.CompanyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.skills?.some((skill) =>
      skill.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const filteredFallbackJobs = fallbackJobs.filter((job) =>
    job.JobName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.CompanyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.skills?.some((skill) => skill.name?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <main className="min-h-screen bg-[#04070d] text-white">
      <Navbar />
      <div className="px-6 py-28 md:px-10">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-black md:text-4xl">
            Job Recommendations
          </h1>
          <p className="mt-1 text-sm text-[#9fb1cc]">Based on your resume analysis and skill mapping</p>
        </div>
        <div className="flex items-center gap-2 md:mt-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-full border border-[#2f446f] bg-[#091224] py-2 pl-10 pr-4 text-sm placeholder-[#7c95b9] focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#7c95b9]" />
          </div>
        </div>
      </div>

      {(missingFields.length > 0 || !hasResumeData) && (
        <div className="mb-6 rounded-2xl border border-[#8b6530] bg-[#2a1f12]/70 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 text-[#f2b353]" />
            <div>
              <p className="font-semibold text-[#ffd79b]">Resume details are incomplete</p>
              <p className="mt-1 text-sm text-[#e9cda1]">
                Missing: {missingFields.join(", ")}. Add them for better-quality matches.
              </p>
              <Link href="/resume" className="mt-2 inline-block text-sm font-bold text-[#ffd79b] underline">
                Update resume input
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="h-12 w-12 animate-spin rounded-full border-t-4 border-[#4b79ff] border-solid"></div>
        </div>
      ) : (
        <>
          {filteredJobs.length === 0 && (
            <div className="mb-6 rounded-2xl border border-[#2f446f] bg-[#0b1324]/90 p-5">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-5 w-5 text-[#2ed5c8]" />
                <div>
                  <p className="font-semibold">No exact recommendations found</p>
                  <p className="mt-1 text-sm text-[#9fb1cc]">
                    Showing fallback recommendations from our broader dataset so you still have options to apply.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
          {(filteredJobs.length > 0 ? filteredJobs : filteredFallbackJobs).map((job, idx) => (
            <motion.div
              key={`${job.JobName}-${job.CompanyName}-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative rounded-2xl border border-white/10 bg-[#0b1324]/90 p-6 shadow-inner"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{job.JobName}</h2>
                  <p className="text-sm text-[#9fb1cc]">{job.CompanyName}</p>
                  <p className="mt-1 flex items-center gap-1 text-sm text-[#7f95b7]">
                    📍 {job.Location || "N/A"}
                  </p>
                  <p className="mt-3 text-sm text-[#c7d5ec]">
                    {job.Description || "No description provided."}
                  </p>
                  {job.matchedSkills.length > 0 && (
                    <p className="mt-2 text-xs font-semibold text-[#7fd7cf]">
                      Recommended because: {job.matchedSkills.slice(0, 4).join(", ")}
                    </p>
                  )}
                </div>
                <div className="rounded-full bg-[#2ed5c8] px-3 py-1 text-xs font-bold text-[#06211d]">
                  {job.matchPercent}% Match
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {(job.skills || []).slice(0, 8).map((skill, i: number) => (
                  <span
                    key={i}
                    className="rounded-full bg-[#10203a] px-3 py-1 text-xs text-[#d1dff5]"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-[#89a2c5]">
                <span>{job.Salary || "Not Disclosed"} • Posted Recently</span>
              </div>
            </motion.div>
          ))}
        </div>
        </>
      )}
      </div>
    </main>
  );
};

export default JobRecommendationsPage;
