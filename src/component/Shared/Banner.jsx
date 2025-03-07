import img from "./Decoration.png"
import img1 from "./Illustration.png"
const Banner = () => {
    return (
        <div className=" w-full h-[110vh]">

            <img src={img} className="w-full h-full " alt="Background" />

            {/* Overlay Content */}
            <div className="absolute top-0 left-0 w-full h-full flex flex-row items-center justify-center text-white space-x-10">
                <h1 className="text-4xl font-bold mb-4">This is Banner</h1>
                <img src={img1} alt="Overlay Image" className="w-[550px] h-[550px] lg:ml-96 " />
            </div>
        </div>

    );
}

export default Banner;
