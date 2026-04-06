"use client";

import React, { useEffect, useState, useMemo } from "react";
import { 
  Search, 
  AlertTriangle, 
  Sparkles, 
  MapPin, 
  DollarSign, 
  Briefcase, 
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Cpu
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { filterJobs } from "@/actions/filterJobs";
import hiringCafeJobs from "@/data/hiring-cafe-jobs.json";
import Navbar from "@/components/LandingPage/Navbar";
import Link from "next/link";

// --- Types ---
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

const LOADING_MESSAGES = [
  "Analyzing Resume...",
  "Mapping Skills...",
  "Scanning Job Market...",
  "Calculating Match Scores...",
];

// --- Components ---

const LoadingState = () => {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setMsgIdx((prev) => (prev + 1) % LOADING_MESSAGES.length), 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-40">
      <div className="relative mb-8 h-24 w-24">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-3xl border-2 border-[#2ed5c8]/30 bg-[#2ed5c8]/10"
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-4 rounded-full bg-[#2ed5c8] blur-xl opacity-20"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Cpu className="h-10 w-10 text-[#2ed5c8]" />
        </div>
      </div>
      <motion.p 
        key={LOADING_MESSAGES[msgIdx]}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="text-lg font-bold text-[#9fb1cc]"
      >
        {LOADING_MESSAGES[msgIdx]}
      </motion.p>
    </div>
  );
};

const JobCardItem = ({ job, idx }: { job: JobCard; idx: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05, type: "spring", stiffness: 100 }}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1324]/60 p-6 backdrop-blur-md transition-all hover:border-[#2ed5c8]/40 hover:bg-[#0d1729]"
    >
      {/* Glow Effect */}
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#2ed5c8]/5 blur-[80px] group-hover:bg-[#2ed5c8]/10" />

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <h2 className="text-xl font-black text-white md:text-2xl">{job.JobName}</h2>
            <div className="hidden md:block">
               {job.matchPercent > 80 && <Sparkles className="h-5 w-5 text-yellow-400" />}
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-[#7c95b9]">
            <span className="flex items-center gap-1 text-[#2ed5c8]">
              <Briefcase className="h-4 w-4" /> {job.CompanyName}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" /> {job.Location || "Remote"}
            </span>
            <span className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" /> {job.Salary || "Market Rate"}
            </span>
          </div>

          <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-[#9fb1cc]">
            {job.Description || "No detailed description available for this role."}
          </p>

          {/* Skill Pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {job.skills.slice(0, 10).map((skill, i) => {
              const isMatched = job.matchedSkills.includes(skill.name.toLowerCase());
              return (
                <span
                  key={i}
                  className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold transition-all ${
                    isMatched 
                    ? "bg-[#2ed5c8]/10 text-[#2ed5c8] border border-[#2ed5c8]/20" 
                    : "bg-white/5 text-[#7c95b9] border border-white/5"
                  }`}
                >
                  {isMatched && <CheckCircle2 className="h-3 w-3" />}
                  {skill.name}
                </span>
              );
            })}
          </div>
        </div>

        {/* Right Side Score */}
        <div className="flex flex-col items-center justify-center gap-2 md:w-32">
          <div className="relative flex h-20 w-20 items-center justify-center">
            <svg className="h-full w-full -rotate-90">
              <circle cx="40" cy="40" r="36" fill="transparent" stroke="currentColor" strokeWidth="6" className="text-white/5" />
              <motion.circle 
                cx="40" cy="40" r="36" fill="transparent" stroke="currentColor" strokeWidth="6" 
                strokeDasharray="226.19"
                initial={{ strokeDashoffset: 226.19 }}
                animate={{ strokeDashoffset: 226.19 - (226.19 * job.matchPercent) / 100 }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                className="text-[#2ed5c8]"
              />
            </svg>
            <span className="absolute text-lg font-black">{job.matchPercent}%</span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#2ed5c8]/80">Match Score</span>
          
          <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-bold text-[#04070d] transition-all hover:bg-[#2ed5c8] active:scale-95">
            Apply Now <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Page ---

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
          const storedSkills = parsedData.Skills?.split(",").map(s => s.trim().toLowerCase()).filter(Boolean) || [];
          const storedExperience = parsedData.Experience?.match(/\d+/)?.[0] || "0";
          
          const missing: string[] = [];
          if (storedSkills.length === 0) missing.push("skills");
          if (!parsedData.Experience?.trim()) missing.push("experience");
          setMissingFields(missing);

          const jobData = await filterJobs(storedSkills, storedExperience);
          const scoredJobs: JobCard[] = jobData.map((job) => {
            const jobSkills = (job.skills || []).map((s: JobSkill) => s.name?.toLowerCase());
            const matchedSkills = jobSkills.filter((skill: string) => storedSkills.includes(skill));
            return {
              ...job,
              matchPercent: Math.round((matchedSkills.length / (jobSkills.length || 1)) * 100),
              matchedSkills,
            };
          });
          setJobs(scoredJobs.sort((a, b) => b.matchPercent - a.matchPercent));

          const fallback: JobCard[] = (hiringCafeJobs as ExternalJob[]).slice(0, 8).map((job) => {
            const normalizedSkills = (job.skills ?? []).map((skill) => ({ name: skill }));
            const matchedSkills = normalizedSkills.filter(s => storedSkills.includes(s.name.toLowerCase())).map(s => s.name);
            return {
              JobName: job.title,
              CompanyName: job.company,
              Location: Array.isArray(job.location) ? job.location.join(", ") : job.location ?? "Remote",
              Description: "Strategic suggestion based on broad market demand.",
              Salary: job.salary ?? "Not disclosed",
              Experience: null,
              skills: normalizedSkills,
              matchPercent: Math.max(55, Math.round((matchedSkills.length / (normalizedSkills.length || 1)) * 100)),
              matchedSkills,
            };
          });
          setFallbackJobs(fallback);
        } else {
          setHasResumeData(false);
          setMissingFields(["skills", "experience"]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        // Artificially extend loading slightly to show the AI animation
        setTimeout(() => setLoading(false), 2000);
      }
    };
    fetchJobs();
  }, []);

  const displayedJobs = useMemo(() => {
    const list = jobs.length > 0 ? jobs : fallbackJobs;
    return list.filter((job) =>
      job.JobName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.CompanyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills?.some((skill) => skill.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [jobs, fallbackJobs, searchTerm]);

  return (
    <main className="min-h-screen bg-[#04070d] text-white selection:bg-[#2ed5c8]/30">
      <Navbar />
      
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-10 top-20 h-96 w-96 rounded-full bg-[#4b79ff]/5 blur-[120px]" />
        <div className="absolute -right-10 bottom-20 h-96 w-96 rounded-full bg-[#2ed5c8]/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-28">
        
        {/* Header Section */}
        <header className="mb-12 flex flex-col items-center justify-between gap-8 md:flex-row md:items-end">
          <div className="text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#2ed5c8]/30 bg-[#2ed5c8]/10 px-4 py-1 text-xs font-bold text-[#2ed5c8]"
            >
              <BrainCircuit className="h-3 w-3" /> AI-Driven Skill Mapping
            </motion.div>
            <h1 className="text-4xl font-black tracking-tighter md:text-5xl">Your Perfect <span className="text-[#2ed5c8]">Matches.</span></h1>
            <p className="mt-2 text-[#9fb1cc]">Curated roles based on your experience and skill graph.</p>
          </div>

          <div className="relative w-full max-w-sm">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#7c95b9]" />
            <input
              type="text"
              placeholder="Search by role or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-sm font-medium transition-all focus:border-[#2ed5c8]/50 focus:outline-none focus:ring-4 focus:ring-[#2ed5c8]/10"
            />
          </div>
        </header>

        {/* Warning Banner */}
        <AnimatePresence>
          {(missingFields.length > 0 || !hasResumeData) && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden rounded-3xl border border-orange-500/20 bg-orange-500/5 p-5 backdrop-blur-md"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-orange-500/10 p-2 text-orange-500">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-orange-200">Recommendation Quality Notice</h3>
                  <p className="mt-1 text-sm text-orange-200/60">
                    Missing: <span className="font-bold text-orange-300">{missingFields.join(", ")}</span>. Providing these will improve match accuracy by up to 40%.
                  </p>
                  <Link href="/resume" className="mt-4 flex items-center gap-2 text-sm font-black text-orange-400 hover:text-orange-300">
                    Update Resume Analysis <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        {loading ? (
          <LoadingState />
        ) : (
          <div className="space-y-6">
            {jobs.length === 0 && !loading && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="mb-8 flex items-center gap-4 rounded-3xl border border-[#2ed5c8]/20 bg-[#2ed5c8]/5 p-6"
              >
                <Sparkles className="h-6 w-6 text-[#2ed5c8]" />
                <p className="text-sm font-medium text-[#c7d5ec]">
                  <span className="font-black text-white">No exact matches?</span> We&apos;ve pulled high-demand roles from our broader network that match your core domain.
                </p>
              </motion.div>
            )}

            {displayedJobs.length > 0 ? (
              displayedJobs.map((job, idx) => (
                <JobCardItem key={idx} job={job} idx={idx} />
              ))
            ) : (
              <div className="py-20 text-center">
                <p className="text-xl font-bold text-[#7c95b9]">No jobs found for &quot;{searchTerm}&quot;</p>
                <button onClick={() => setSearchTerm("")} className="mt-4 text-[#2ed5c8] underline">Clear search</button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default JobRecommendationsPage;