import { NavLink } from "react-router-dom";
import img from"./image_1__1_-removebg-preview 1.png"

const Navbar = () => {
    return (
        <div className="absolute top-0 left-0 w-full bg-transparent text-white">
  <div className="container mx-auto flex items-center justify-between px-6 ">
    
    {/* Logo Section */}
    <div>
      <img src={img} alt="Logo" className="h-[105.67px]  w-[126.25px]" />
    </div>

    {/* Navigation Links */}
    <nav className="hidden md:flex items-center space-x-6">
      <NavLink to="/" className="hover:text-[#CBB702] transition duration-300 text-[22.5px] font-[600]">Home</NavLink>
      <NavLink to="/features" className="hover:text-[#CBB702] transition duration-300 text-[22.5px] font-[600]">Features</NavLink>
      <NavLink to="/pricing" className="hover:text-[#CBB702] transition duration-300 text-[22.5px] font-[600]">Pricing</NavLink>
      <NavLink to="/contact" className="hover:text-[#CBB702] transition duration-300 text-[22.5px] font-[600]">Contact</NavLink>
    </nav>

    {/* Auth Buttons */}
    <div className="flex items-center space-x-4 text-[22.5px] ">
      <NavLink to="/signin" className="hover:text-[#CBB702] transition duration-300">SIGN IN</NavLink>
      <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg  transition duration-300 text-[22.5px] font-[600]">
        Register
      </button>
    </div>
  </div>
</div>

    );
}

export default Navbar;
