import Banner from "@/components/About/Banner";
import Insights from "@/components/About/Insights";
import OurMission from "@/components/About/OurMission";
import StepByStep from "@/components/About/StepByStep";
import TalentedTeam from "@/components/About/TalentedTeam";
import WhoWeAre from "@/components/About/WhoWeAre";
import TrustedCompanies from "@/components/common/TrustedCompanies";

const page = () => {
  return (
    <>
      <Banner />
      <OurMission />
      <TrustedCompanies />
      <WhoWeAre />
      <TalentedTeam />
      <StepByStep />
      <Insights />
    </>
  );
};

export default page;
