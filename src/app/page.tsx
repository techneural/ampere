import CustomHardwarePortfolio from "@/components/Home/CustomHardwarePortfolio";
import DataCenter from "@/components/Home/DataCenter";
import DeploymentReady from "@/components/Home/DeploymentReady";
import Faq from "@/components/Home/Faq";
import Banner from "@/components/Home/Banner";
import HighPerformance from "@/components/Home/HighPerformance";
import MainServices from "@/components/Home/MainServices";
import ResearchPortfolio from "@/components/Home/ResearchPortfolio";
import SmarterDecisions from "@/components/Home/SmarterDecisions";
import TrustedCompanies from "@/components/Home/TrustedCompanies";
import WhyChooseUs from "@/components/Home/WhyChooseUs";

export default function Home() {
  return (
    <div className="bg-[url('@/assets/images/bg-fixed.png')] bg-fixed bg-no-repeat bg-cover bg-center">
      <Banner />
      <HighPerformance />
      <TrustedCompanies />
      <MainServices />
      <DataCenter />
      <DeploymentReady />
      <CustomHardwarePortfolio />
      <WhyChooseUs />
      <ResearchPortfolio />
      <SmarterDecisions />
      <Faq />
    </div>
  );
}
