import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="w-150 bg-gray-600 text-white">
      <div className="flex flex-col items-start justify-start text-white py-4">
        <NavLink
          to="/dashboard/overview"
          className={({ isActive }) =>
            isActive
              ? "py-2 px-4 hover:bg-gray-700 w-full bg-gray-900"
              : "py-2 px-4 hover:bg-gray-700 w-full"
          }
        >
          개요
        </NavLink>
        <NavLink
          to="/dashboard/projects"
          className={({ isActive }) =>
            isActive
              ? "py-2 px-4 hover:bg-gray-700 w-full bg-gray-900"
              : "py-2 px-4 hover:bg-gray-700 w-full"
          }
        >
          api key 발급받기
        </NavLink>
        <NavLink
          to="/dashboard/analytics/behavior"
          className={({ isActive }) =>
            isActive
              ? "py-2 px-4 hover:bg-gray-700 w-full bg-gray-900"
              : "py-2 px-4 hover:bg-gray-700 w-full"
          }
        >
          행동 흐름 분석 상세
        </NavLink>
        <NavLink
          to="/dashboard/analytics/conversion"
          className={({ isActive }) =>
            isActive
              ? "py-2 px-4 hover:bg-gray-700 w-full bg-gray-900"
              : "py-2 px-4 hover:bg-gray-700 w-full"
          }
        >
          전환율 상세
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
