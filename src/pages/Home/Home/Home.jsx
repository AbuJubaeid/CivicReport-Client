import Banner from "../Banner";
import FAQ from "../FAQ";
import HowItWorks from "../HowItWorks";
import KeyFeatures from "../KeyFeatures";
import OurMission from "../OurMission";
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
