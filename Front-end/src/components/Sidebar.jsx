import clsx from "clsx";
import React, { useState } from "react";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { PiPlugsConnectedFill } from "react-icons/pi";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { CiChat1 } from "react-icons/ci";

const linkData = [
  {
    label: "Dashboard",
    link: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Tasks",
    link: "tasks",
    icon: <FaTasks />,
  },
  {
    label: "Completed",
    link: "completed/completed",
    icon: <MdTaskAlt />,
  },
  {
    label: "In Progress",
    link: "in-progress/in progress",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "To Do",
    link: "todo/todo",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "Chat",
    link: "/chat",
    icon: <CiChat1 />,
  },
  {
    label: "Team",
    link: "team",
    icon: <FaUsers />,
  },
  {
    label: "Status",
    link: "status",
    icon: <IoCheckmarkDoneOutline />,
  },
  {
    label: "Trash",
    link: "trashed",
    icon: <FaTrashAlt />,
  },
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const [showDetails, setShowDetails] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 6);

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ el }) => {
    return (
      <Link
        onClick={closeSidebar}
        to={el.link}
        className={clsx(
          "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 dark:text-gray-400 text-base hover:bg-purple-300",
          path === el.link.split("/")[0]
            ? "bg-purple-600 text-white"
            : "hover:bg-purple-200"
        )}
      >
        {el.icon}
        <span className="hover:text-purple-700">{el.label}</span>
      </Link>
    );
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 p-5">
      <h1 className="flex gap-1 items-center">
        <p className="bg-purple-600 p-2 rounded-full">
          <PiPlugsConnectedFill className="text-white text-2xl font-black" />
        </p>
        <span className="text-2xl font-bold text-black dark:text-white">
          RemoteSync
        </span>
      </h1>

      <div className="flex-1 flex flex-col gap-y-5 py-8">
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>

      <div
        className="relative"
        onMouseEnter={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
      >
        <button className="w-full flex gap-2 p-2 items-center text-lg text-gray-800 dark:text-white hover:bg-purple-300 rounded-full">
          <MdSettings />
          <span>Need Help ?</span>

          {showDetails && (
            <div className="absolute top-full left-0 -mt-[9.5pc] p-2 bg-white border border-gray-300 shadow-lg rounded-md z-10">
              <div className="main text-sm">
                <Link to="User_guaid">
                  <div className="help my-1 hover:bg-purple-200  rounded-lg p-1">
                    User guaid
                  </div>
                </Link>
                <Link to="FAQ">
                  <div className="help hover:bg-purple-200 rounded-lg p-1">
                    Frequently asked questions
                  </div>
                </Link>
                <Link to="Contact">
                  <div className="help hover:bg-purple-200 rounded-lg p-1">
                    Contact us
                  </div>
                </Link>
              </div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
