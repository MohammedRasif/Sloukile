import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Banner from "../Shared/Banner";
import Contact from "../Shared/Contact";
import FAQPage from "../Shared/FAQ";
import Frequently from "../Shared/Frequently";
import Management from "../Shared/Management";
import Pricing from "../Shared/Pricing";
import Revolutionize from "../Shared/Revolutionize";
import UserSays from "../Shared/UserSays";
import WatchLearn from "../Shared/WatchLearn";

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-[#EAEFFB] via-[#F5F3E6] to-[#EAEFFB] dark:from-[#202125] dark:via-[#35373a] dark:to-[#202125]">
      <Navbar />
      <Banner />
      <Contact />
      <Revolutionize />
      <WatchLearn />
      <Pricing />
      <UserSays />
      <FAQPage />
      <Frequently />
      {/* <Management/> */}
      <Footer />
    </div>
  );
};

export default Home;