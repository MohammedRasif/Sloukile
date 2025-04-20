import { useGetProfileQuery } from "../../Redux/feature/ApiSlice";
import { FaRegCircleUser } from "react-icons/fa6";

const DashboardNavbar = () => {
  const { data: profile, isLoading, isError } = useGetProfileQuery();

  return (
    <div className="flex justify-end items-center w-full h-16">
      <div className="fixed top-0 w-full left-[calc(100%-140px)]">
        <div className="flex items-center space-x-4">
          {/* Logo */}
          {/* <img
            src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1738148405/fotor-2025010923230_1_u9l6vi.png"
            className="h-[50px] my-2"
            alt="Logo"
          /> */}
          {/* Profile Image or Icon */}
          {isLoading ? (
            <div className="h-[50px] w-[50px] flex items-center justify-center text-gray-500 dark:text-gray-300">
              Loading...
            </div>
          ) : isError ? (
            <FaRegCircleUser className="h-[40px] w-[40px] text-gray-600 dark:text-gray-300 mt-3" />
          ) : profile?.image ? (
            <img
              src={profile.image}
              className="h-[40px] w-[40px] rounded-full object-cover mt-3"
              alt="Profile"
            />
          ) : (
            <FaRegCircleUser className="h-[40px] w-[40px] text-gray-600 dark:text-gray-300 mt-3" />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;