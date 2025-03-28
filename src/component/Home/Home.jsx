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

const Home = () => {
    return (
        <div>
            <Navbar/>
            <Banner/>
            <Revolutionize/>
            <Contact/>
            <Pricing/>
            <UserSays/>
            <FAQPage/>
            <Frequently/>
            <Management/>
            <Footer/>
        </div>
    );
}

export default Home;
