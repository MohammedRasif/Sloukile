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
        <div className="bg-gradient-to-r from-[#DDFBEC] via-[#F5F3E6] to-[#EAEFFB]">
            <Navbar/>
            <Banner/>
            <Contact/>
            <Revolutionize/>
            <WatchLearn/>
            <Pricing/>
            <UserSays/>
            <FAQPage/>
            <Frequently/>
            {/* <Management/> */}
            <Footer/>
        </div>
    );
}

export default Home;
