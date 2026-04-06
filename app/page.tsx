import Banner1 from "@/components/LandingPage/Banner1";
import CallToAction from "@/components/LandingPage/CallToAction";
import FeaturesBanner from "@/components/LandingPage/FeatureBanner";
import Navbar from "@/components/LandingPage/Navbar";
import ResumeMatchStats from "@/components/ResumeMatchStats";
import Reviews from "@/components/LandingPage/Reviews";

export default async function Home() {
  return (
    <main className="relative">
      <div className="parallax-bg" /> {/* Global Parallax Depth Layer */}
      <Navbar />
      
      <div className="relative z-10 flex flex-col gap-12">
        <Banner1 />
        <FeaturesBanner />
        <ResumeMatchStats />
        <Reviews />
        <CallToAction />
      </div>
    </main>
  );
}