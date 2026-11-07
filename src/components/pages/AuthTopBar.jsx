import { Link } from "react-router";
import { FiArrowLeft } from "react-icons/fi";
import ThemeToggle from "../../theme/ThemeToggle";

const AuthTopBar = () => {
  return (
    <div className="fixed top-0 inset-x-0 z-50 bg-transparent  transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between">
        <Link
          to="/"
          aria-label="Back to home"
          className="flex items-center gap-2 px-3 py-2 rounded-md font-semibold text-[#780116] dark:text-[#c32f27] hover:bg-[#f7ac91] hover:text-white dark:hover:text-white transition-colors"
        >
          <FiArrowLeft size={20} />
          <span className="hidden sm:inline">Back to Home</span>
        </Link>

        <ThemeToggle />
      </div>
    </div>
  );
};

export default AuthTopBar;
