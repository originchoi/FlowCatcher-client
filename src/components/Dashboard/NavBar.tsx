import { NavLink } from "react-router-dom";
import { GrOverview, GrAnalytics } from "react-icons/gr";
import { DiGoogleAnalytics } from "react-icons/di";
import { GoProjectRoadmap } from "react-icons/go";

function Navbar() {
  return (
    <div className="w-150 bg-gray-200">
      <div className="flex flex-col items-start justify-start">
        <NavLink
          to="/dashboard/overview"
          className={({ isActive }) =>
            isActive
              ? "flex items-center py-15 px-4 hover:bg-indigo-500 w-full bg-indigo-600 text-white"
              : "flex items-center py-15 px-4 hover:bg-indigo-500 w-full"
          }
          style={{ transition: "background-color 0.5s, color 0.5s" }}
        >
          <GrOverview className="mr-10" />
          개요
        </NavLink>
        <NavLink
          to="/dashboard/projects"
          className={({ isActive }) =>
            isActive
              ? "flex items-center py-15 px-4 hover:bg-indigo-500 w-full bg-indigo-600 text-white"
              : "flex items-center py-15 px-4 hover:bg-indigo-500 w-full"
          }
          style={{ transition: "background-color 0.5s, color 0.5s" }}
        >
          <GoProjectRoadmap className="mr-10" />
          프로젝트 생성하기
        </NavLink>
        <NavLink
          to="/dashboard/analytics/behavior"
          className={({ isActive }) =>
            isActive
              ? "flex items-center py-15 px-4 hover:bg-indigo-500 w-full bg-indigo-600 text-white"
              : "flex items-center odd:py-15 px-4 hover:bg-indigo-500 w-full"
          }
          style={{ transition: "background-color 0.5s, color 0.5s" }}
        >
          <DiGoogleAnalytics className="mr-10" />
          행동 흐름 분석
        </NavLink>
        <NavLink
          to="/dashboard/analytics/conversion"
          className={({ isActive }) =>
            isActive
              ? "flex items-center py-15 px-4 hover:bg-indigo-500 w-full bg-indigo-600 text-white"
              : "flex items-center py-15 px-4 hover:bg-indigo-500 w-full"
          }
          style={{ transition: "background-color 0.5s, color 0.5s" }}
        >
          <GrAnalytics className="mr-10" />
          전환율 분석
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
