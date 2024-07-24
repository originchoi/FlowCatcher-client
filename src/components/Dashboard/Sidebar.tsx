import { NavLink } from "react-router-dom";
import { GrAnalytics } from "react-icons/gr";
import { DiGoogleAnalytics } from "react-icons/di";
import { GoProjectRoadmap } from "react-icons/go";

function Sidebar() {
  return (
    <div className="bg-gray-200">
      <aside className="relative flex flex-col max-w-150 h-full">
        <div className="w-150">
          <NavLink
            to="/dashboard/projects"
            className={({ isActive }) =>
              isActive
                ? "flex items-center py-10 px-4 hover:bg-indigo-500 w-full bg-indigo-600 text-white"
                : "flex items-center py-10 px-4 hover:bg-indigo-500 w-full"
            }
            style={{ transition: "background-color 0.5s, color 0.5s" }}
          >
            <GoProjectRoadmap className="mr-4" />
            프로젝트 생성하기
          </NavLink>
          <NavLink
            to="/dashboard/analytics/behavior"
            className={({ isActive }) =>
              isActive
                ? "flex items-center py-10 px-4 hover:bg-indigo-500 w-full bg-indigo-600 text-white"
                : "flex items-center py-10 px-4 hover:bg-indigo-500 w-full"
            }
            style={{ transition: "background-color 0.5s, color 0.5s" }}
          >
            <DiGoogleAnalytics className="mr-4" />
            행동 흐름 분석
          </NavLink>
          <NavLink
            to="/dashboard/analytics/conversion"
            className={({ isActive }) =>
              isActive
                ? "flex items-center py-10 px-4 hover:bg-indigo-500 w-full bg-indigo-600 text-white"
                : "flex items-center py-10 px-4 hover:bg-indigo-500 w-full"
            }
            style={{ transition: "background-color 0.5s, color 0.5s" }}
          >
            <GrAnalytics className="mr-4" />
            전환율 분석
          </NavLink>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
