import Banner from "../Shared/Banner";
import Contact from "../Shared/Contact";
import FAQPage from "../Shared/FAQ";
import Pricing from "../Shared/Pricing";
import Revolutionize from "../Shared/Revolutionize";
import UserSays from "../Shared/UserSays";

const Home = () => {
    return (
        <div>
            <Banner/>
            <Revolutionize/>
            <Contact/>
            <Pricing/>
            <UserSays/>
            <FAQPage/>
        </div>
    );
}

export default Home;
