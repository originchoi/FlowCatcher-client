import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full bg-gray-300 text-center px-4 py-20 mt-8 mx-auto z-10">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="mt-4">
          <a
            href="https://github.com/originchoi/FlowCatcher-client"
            className="text-blue-600 hover:underline mr-20"
          >
            About Us
          </a>
          <a
            href="mailto:kyun4525@gmail.com"
            className="text-blue-600 hover:underline mr-20"
          >
            Contact
          </a>
          <Link to="/policy" className="text-blue-600 hover:underline mr-20">
            Privacy Policy
          </Link>
        </div>
        <div className="text-sm text-gray-700 mt-10">
          © {new Date().getFullYear()} FlowCatcher. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
