import { Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { Navbar, Sidebar } from "./components";
import {
  Dashboard,
  Login,
  TaskDetail,
  Tasks,
  Trash,
  Users,
  StatusPage,
} from "./pages";
import { setOpenSidebar } from "./redux/slices/authSlice";
import { TaskProvider } from "./components/contextapi/TaskContext";
import { ScreenRecordingProvider } from "./components/contextapi/RecordingContext";

import User_guaid from "./pages/Need help/User guaid/User-Guaid";
import FAQ from "./pages/Need help/FAQ/FAQ";
import Contact from "./pages/Need help/Contact/contact";
import Task_Report from "./pages/Task Report/Report";
import Resource_Management from "./pages/Task Report/Resource Management/Resource";

function Layout() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return user ? (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-1/5 h-screen bg-white dark:bg-[#1f1f1f] sticky top-0 hidden md:block">
        <Sidebar />
      </div>

      <MobileSidebar />

      <div className="flex-1 overflow-y-auto">
        <Navbar />

        <div className="p-4 2xl:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/log-in" state={{ from: location }} replace />
  );
}

const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <>
      <Transition
        show={isSidebarOpen}
        as={Fragment}
        enter="transition-opacity duration-700"
        enterFrom="opacity-x-10"
        enterTo="opacity-x-100"
        leave="transition-opacity duration-700"
        leaveFrom="opacity-x-100"
        leaveTo="opacity-x-0"
      >
        {(ref) => (
          <div
            ref={(node) => (mobileMenuRef.current = node)}
            className={`md:hidden w-full h-full bg-black/40 transition-transform duration-700 transform
             ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            onClick={() => closeSidebar()}
          >
            <div className="bg-white w-3/4 h-full">
              <div className="w-full flex justify-end px-5 pt-5">
                <button
                  onClick={() => closeSidebar()}
                  className="flex justify-end items-end"
                >
                  <IoMdClose size={25} />
                </button>
              </div>

              <div className="-mt-10">
                <Sidebar />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};

const App = () => {
  const theme = "light";

  return (
    <TaskProvider>
      <ScreenRecordingProvider>
        <main className={theme}>
          <div className="w-full min-h-screen bg-[#f3f4f6] dark:bg-[#0d0d0df4]">
            <Routes>
              <Route element={<Layout />}>
                <Route index psth="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/completed/:status?" element={<Tasks />} />
                <Route path="/in-progress/:status?" element={<Tasks />} />
                <Route path="/todo/:status?" element={<Tasks />} />

                <Route path="/User_guaid" element={<User_guaid />} />
                <Route path="/FAQ" element={<FAQ />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/task_report" element={<Task_Report />} />
                <Route
                  path="/resource-management"
                  element={<Resource_Management />}
                />

                <Route path="/trashed" element={<Trash />} />
                <Route path="/task/:id" element={<TaskDetail />} />
                <Route path="/team" element={<Users />} />
                <Route path="/status" element={<StatusPage />} />
              </Route>

              <Route path="/log-in" element={<Login />} />
            </Routes>
          </div>

          <Toaster richColors position="top-center" />
        </main>
      </ScreenRecordingProvider>
    </TaskProvider>
  );
};

export default App;
