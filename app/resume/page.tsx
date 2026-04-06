"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, CheckCircle2, Sparkles } from "lucide-react";
import handleResume from "@/actions/handleResume";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from "@/components/LandingPage/Navbar";

const UploadResumeCard: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jobTitle, setJobTitle] = useState("");
  const [experience, setExperience] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { status } = useSession();

  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signup");
    }
  }, [status, router]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleSubmit = async () => {
    let resumeData;

    if (file) {
      // If resume file is uploaded, parse it
      resumeData = await handleResume(file);
    } else if (jobTitle || experience) {
      // If no resume, but manual input is provided
      resumeData = {
        Skills: jobTitle,
        Experience: experience,
      };
    } else {
      alert("Please upload a resume or provide skills/experience manually.");
      return;
    }

    localStorage.setItem("resumeData", JSON.stringify(resumeData));
    router.push("/job-recommendation");
  };


  return (
    <main className="min-h-screen bg-[#04070d] text-white">
      <Navbar />
      <section className="relative overflow-hidden px-4 pb-16 pt-28 md:px-8">
        <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 rounded-full bg-[#2ed5c8]/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 right-0 h-72 w-72 rounded-full bg-[#4b79ff]/15 blur-3xl" />

        <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-[#0b1324]/90 p-6 md:p-8"
          >
            <div className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#2ed5c8]">
              <Sparkles className="h-4 w-4" /> Resume Matching Flow
            </div>

            <h1 className="text-3xl font-black tracking-tight md:text-5xl">Upload Resume</h1>
            <p className="mt-2 max-w-2xl text-sm text-[#9fb1cc] md:text-base">
              Upload your resume or fill skills manually. We extract profile signals and redirect you to ranked job matches.
            </p>

            <motion.div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="mt-8 rounded-2xl border border-dashed border-[#3e5f95] bg-[#08101f] p-6 text-center transition-colors hover:border-[#2ed5c8]"
            >
              <Upload className="mx-auto mb-3 h-10 w-10 text-[#2ed5c8]" />
              <p className="font-semibold text-[#d9e7ff]">
                {file?.name ? `Selected: ${file.name}` : "Drag and drop your resume"}
              </p>
              <p className="mt-1 text-sm text-[#8ba5c8]">Supports PDF, DOCX, TXT (up to 5MB)</p>
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-4 rounded-xl bg-[#2ed5c8] px-6 py-2.5 text-sm font-bold text-[#06211d] transition hover:bg-[#27b8ae]"
              >
                Select File
              </button>
            </motion.div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-semibold text-white">Skills (Optional)</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. JavaScript, React, Node"
                  disabled={file !== null}
                  className={`w-full rounded-xl border border-[#2e4369] bg-[#091224] px-4 py-3 text-white placeholder-[#6f88ad] focus:border-[#4b79ff] focus:outline-none ${file ? "cursor-not-allowed opacity-60" : ""}`}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-white">Experience (Optional)</label>
                <input
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="e.g. 2 years"
                  disabled={file !== null}
                  className={`w-full rounded-xl border border-[#2e4369] bg-[#091224] px-4 py-3 text-white placeholder-[#6f88ad] focus:border-[#4b79ff] focus:outline-none ${file ? "cursor-not-allowed opacity-60" : ""}`}
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleSubmit}
              className="mt-7 w-full rounded-xl bg-[#4b79ff] py-3.5 text-sm font-bold text-white transition hover:bg-[#3f68db]"
            >
              Find Job Matches
            </motion.button>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="space-y-4"
          >
            <div className="rounded-2xl border border-white/10 bg-[#0b1324]/90 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8ba5c8]">How It Works</p>
              <div className="mt-4 space-y-3">
                {[
                  'Upload resume file',
                  'Extract skills and experience',
                  'Score matching jobs',
                  'Review ranked opportunities',
                ].map((step) => (
                  <div key={step} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#2ed5c8]" />
                    <p className="text-sm text-[#c9d8ef]">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b1324]/90 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8ba5c8]">Tips</p>
              <ul className="mt-3 space-y-2 text-sm text-[#c9d8ef]">
                <li className="flex gap-2"><FileText className="mt-0.5 h-4 w-4 text-[#4b79ff]" /> Keep skills comma-separated for best matching.</li>
                <li className="flex gap-2"><FileText className="mt-0.5 h-4 w-4 text-[#4b79ff]" /> Include technologies and tools you use daily.</li>
                <li className="flex gap-2"><FileText className="mt-0.5 h-4 w-4 text-[#4b79ff]" /> Use years/months in experience for better ranking.</li>
              </ul>
            </div>
          </motion.aside>
        </div>
      </section>
    </main>
  );
};

export default UploadResumeCard;
