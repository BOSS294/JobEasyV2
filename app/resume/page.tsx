"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, 
  CheckCircle2, 
  Loader2, 
  Cpu, 
  ShieldCheck, 
  Zap 
} from "lucide-react";
import handleResume from "@/actions/handleResume";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from "@/components/LandingPage/Navbar";

const UploadResumeCard: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
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

  const simulateAnalysis = async (fileToProcess: File) => {
    setIsAnalyzing(true);
    setUploadProgress(0);
    
    // Smooth progress animation
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 150);

    try {
      const resumeData = await handleResume(fileToProcess);
      setUploadProgress(100);
      
      // Small delay so user sees the "100%" completion
      setTimeout(() => {
        localStorage.setItem("resumeData", JSON.stringify(resumeData));
        router.push("/job-recommendation");
      }, 800);
    } catch (error) {
      console.error(error);
      setIsAnalyzing(false);
      alert("Error processing resume. Please try again.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      simulateAnalysis(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
      simulateAnalysis(droppedFile);
    }
  };

  const handleSubmitManual = async () => {
    if (!jobTitle || !experience) {
      alert("Please provide both skills and experience.");
      return;
    }
    setIsAnalyzing(true);
    const resumeData = { Skills: jobTitle, Experience: experience };
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
    
    // Brief artificial delay for "AI feel"
    setTimeout(() => router.push("/job-recommendation"), 1000);
  };

  return (
    <main className="min-h-screen bg-[#04070d] text-white selection:bg-[#2ed5c8]/30">
      <Navbar />
      
      <section className="relative overflow-hidden px-4 pb-16 pt-32 md:px-8">
        {/* Abstract Background Elements */}
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[#2ed5c8]/5 blur-[120px]" />
        <div className="absolute right-[-5%] bottom-[-5%] h-[400px] w-[400px] rounded-full bg-[#4b79ff]/10 blur-[100px]" />

        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative rounded-[2.5rem] border border-white/10 bg-[#0b1324]/50 p-8 backdrop-blur-xl md:p-12"
          >
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#2ed5c8]/30 bg-[#2ed5c8]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#2ed5c8]">
              <Cpu className="h-3.5 w-3.5" /> Neural Engine Active
            </div>

            <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">
              Scan Your <span className="text-[#2ed5c8]">Future.</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#9fb1cc]">
              Our AI parses your professional DNA to find high-probability job matches in seconds.
            </p>

            {/* Upload Area */}
            <AnimatePresence mode="wait">
              {!isAnalyzing ? (
                <motion.div
                  key="upload-zone"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="group relative mt-10 cursor-pointer overflow-hidden rounded-3xl border-2 border-dashed border-white/10 bg-white/[0.02] p-10 transition-all hover:border-[#2ed5c8]/50 hover:bg-white/[0.04]"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="mb-4 rounded-2xl bg-white/5 p-4 transition-transform group-hover:scale-110 group-hover:bg-[#2ed5c8]/20">
                      <Upload className="h-10 w-10 text-[#2ed5c8]" />
                    </div>
                    <p className="text-xl font-bold text-white">Drop resume here</p>
                    <p className="mt-2 text-sm text-[#7c95b9]">
                      PDF, DOCX, or TXT up to <span className="text-white">10MB</span>
                    </p>
                    <div className="mt-6 rounded-xl bg-white px-6 py-2.5 text-sm font-black text-[#04070d]">
                      Browse Files
                    </div>
                  </div>
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.docx,.txt" />
                </motion.div>
              ) : (
                <motion.div
                  key="loading-zone"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-10 rounded-3xl border border-[#2ed5c8]/30 bg-[#2ed5c8]/5 p-10 text-center"
                >
                  <div className="flex flex-col items-center">
                    <Loader2 className="h-12 w-12 animate-spin text-[#2ed5c8]" />
                    <h3 className="mt-6 text-2xl font-black">Analyzing {file?.name || "Profile"}</h3>
                    <p className="mt-2 text-[#9fb1cc]">Parsing skills, experience, and intent...</p>
                    
                    <div className="mt-8 h-2 w-full max-w-md overflow-hidden rounded-full bg-white/5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        className="h-full bg-gradient-to-r from-[#2ed5c8] to-[#4b79ff]"
                      />
                    </div>
                    <span className="mt-3 text-xs font-bold text-[#2ed5c8]">{uploadProgress}% Complete</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Manual Entry Divider */}
            <div className="my-10 flex items-center gap-4">
              <div className="h-[1px] flex-1 bg-white/10" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#4b79ff]">OR ENTER MANUALLY</span>
              <div className="h-[1px] flex-1 bg-white/10" />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-[#7c95b9]">Skills Graph</label>
                <input
                  type="text"
                  placeholder="React, Python, AWS..."
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  disabled={isAnalyzing || file !== null}
                  className="w-full rounded-2xl border border-white/5 bg-white/5 p-4 text-sm outline-none transition-all focus:border-[#4b79ff] focus:ring-4 focus:ring-[#4b79ff]/10 disabled:opacity-50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-[#7c95b9]">Total Experience</label>
                <input
                  type="text"
                  placeholder="e.g. 5 Years"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  disabled={isAnalyzing || file !== null}
                  className="w-full rounded-2xl border border-white/5 bg-white/5 p-4 text-sm outline-none transition-all focus:border-[#4b79ff] focus:ring-4 focus:ring-[#4b79ff]/10 disabled:opacity-50"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(75, 121, 255, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmitManual}
              disabled={isAnalyzing || !!file}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-[1.5rem] bg-[#4b79ff] py-5 text-lg font-black transition-all hover:bg-[#3f68db] disabled:opacity-50"
            >
              Analyze & Find Matches <Zap className="h-5 w-5 fill-current" />
            </motion.button>
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-[2rem] border border-white/10 bg-[#0b1324]/80 p-8"
            >
              <h3 className="mb-6 flex items-center gap-2 text-xl font-bold">
                <ShieldCheck className="text-[#2ed5c8]" /> Safety First
              </h3>
              <div className="space-y-6">
                {[
                  { title: "Privacy Guaranteed", desc: "Your resume is processed and discarded after analysis. No data is stored permanently.", icon: <CheckCircle2 className="h-5 w-5 text-[#2ed5c8]" /> },
                  { title: "Signal Extraction", desc: "We look for 50+ unique professional signals including tech stack, leadership, and niche tools.", icon: <CheckCircle2 className="h-5 w-5 text-[#2ed5c8]" /> },
                  { title: "Real-time Ranking", desc: "Our engine updates matching scores instantly as market trends shift.", icon: <CheckCircle2 className="h-5 w-5 text-[#2ed5c8]" /> },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 shrink-0">{item.icon}</div>
                    <div>
                      <p className="font-bold text-white">{item.title}</p>
                      <p className="mt-1 text-sm text-[#7c95b9]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-[2rem] border border-[#4b79ff]/20 bg-gradient-to-br from-[#4b79ff]/10 to-transparent p-8"
            >
              <h3 className="mb-4 text-lg font-black italic">Pro Tip</h3>
              <p className="text-sm leading-relaxed text-[#9fb1cc]">
                Resumes with clear <span className="text-white font-bold underline decoration-[#2ed5c8]">quantitative achievements</span> (e.g., "Improved performance by 30%") receive a higher weighting in our matching algorithm.
              </p>
            </motion.div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default UploadResumeCard;