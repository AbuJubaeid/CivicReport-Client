import Banner from "../Banner";
import FAQ from "../FAQ";
import HowItWorks from "../HowItWorks";
import KeyFeatures from "../KeyFeatures";
import LatestResolvedReports from "../LatestResolvedReports";
import OurMission from "../OurMission";
import RecentReports from "../RecentReports";
import WCAS from "../WCAS";


const Home = () => {


  return (
    <div className="bg-slate-50">
       
      <div>
        <Banner></Banner>
      </div>
      <div>
        <KeyFeatures></KeyFeatures>
      </div>
      <div>
        <HowItWorks></HowItWorks>
      </div>
      <div>
        <RecentReports></RecentReports>
      </div>
      <div>
        <LatestResolvedReports></LatestResolvedReports>
      </div>
      <div>
        <WCAS></WCAS>
      </div>
      <div>
        <OurMission></OurMission>
      </div>
      <div>
        <FAQ></FAQ>
      </div>
    </div>
  );
};

export default Home;
