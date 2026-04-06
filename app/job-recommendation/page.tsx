"use client";

import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { filterJobs } from "@/actions/filterJobs";

const JobRecommendationsPage: React.FC = () => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const resumeData = localStorage.getItem("resumeData");

        if (resumeData) {
          const parsedData = JSON.parse(resumeData);

          const storedSkills =
            parsedData.Skills?.split(",")
              .map((skill: string) => skill.trim().toLowerCase())
              .filter(Boolean) || [];

          const storedExperience = parsedData.Experience?.match(/\d+/)?.[0] || "0";

          const jobData = await filterJobs(storedSkills, storedExperience);
          const scoredJobs = jobData.map((job: any) => {
            const jobSkills = (job.skills || []).map((s: any) => s.name?.toLowerCase());
            const matchedSkills = jobSkills.filter((skill: string) =>
              storedSkills.includes(skill)
            );
            const skillMatchPercent = Math.round(
              (matchedSkills.length / jobSkills.length) * 100 || 0
            );

            return {
              ...job,
              matchPercent: skillMatchPercent,
            };
          });

          setJobs(scoredJobs);
        } else {
          console.error("No resume data found in localStorage.");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);
  const filteredJobs = jobs.filter((job: any) =>
    job.JobName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.CompanyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.skills?.some((skill: any) =>
      skill.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 relative">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-transparent bg-clip-text">
            Job Recommendations
          </h1>
          <p className="text-gray-400 text-sm mt-1">Based on your resume analysis</p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#111] border border-gray-700 rounded-full pl-10 pr-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-500 border-solid"></div>
        </div>
      ) : (
        <div className="space-y-6">
          
          {filteredJobs.map((job: any, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="hover:shadow-xl hover:cursor-pointer hover:shadow-cyan-500 bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] p-6 rounded-2xl border border-white/10 shadow-inner relative"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{job.JobName}</h2>
                  <p className="text-sm text-gray-400">{job.CompanyName}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    📍 {job.Location || "N/A"}
                  </p>
                  <p className="mt-3 text-sm text-gray-300">
                    {job.Description || "No description provided."}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                  {job.matchPercent}% Match
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {(job.skills || []).map((skill: any, i: number) => (
                  <span
                    key={i}
                    className="text-xs bg-white/10 text-white px-3 py-1 rounded-full"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
                <span>{job.Salary || "Not Disclosed"} • Posted Recently</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobRecommendationsPage;
