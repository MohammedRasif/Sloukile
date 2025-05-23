import { useDarkMode } from "../../../context/ThemeContext";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";

const AdminDashboardNavbar = ({ toggleSidebar, isSidebarOpen }) => {
    const { darkMode, setDarkMode } = useDarkMode();
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className="flex items-start w-full h-16 px-4">
            {/* Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="p-2 flex items-center"
            >
                {isSidebarOpen ? (
                    <GoSidebarCollapse className="h-5 w-5 text-gray-600 dark:text-gray-300 cursor-pointer hover:scale-110" />
                ) : (
                    <GoSidebarExpand className="h-5 w-5 text-gray-600 dark:text-gray-300 cursor-pointer hover:scale-110" />
                )}
            </button>

            <div className="flex justify-end items-center w-full">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleDarkMode}
                        className="h-16 w-16 rounded-xl p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 cursor-pointer shadow-md"
                    >
                        <svg
                            className="fill-gray-600 dark:fill-gray-400 block dark:hidden w-8 h-8"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                        </svg>
                        <svg
                            className="fill-yellow-500 hidden dark:block w-8 h-8"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                fillRule="evenodd"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                    <img
                        src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1738148405/fotor-2025010923230_1_u9l6vi.png"
                        className="h-[50px] my-2"
                        alt="Logo"
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardNavbar;