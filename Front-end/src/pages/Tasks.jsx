import React, { useEffect, useState, useRef } from "react";
import { FaList } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdGridView } from "react-icons/md";
import { useParams, useSearchParams } from "react-router-dom";
import { Button, Loading, Table, Tabs, Title } from "../components";
import { AddTask, BoardView, TaskTitle } from "../components/tasks";
import { useChangeTaskStageMutation, useGetAllTaskQuery } from "../redux/slices/api/taskApiSlice";
import { useUploadImageMutation } from "../redux/slices/api/taskApiSlice";
import { TASK_TYPE } from "../utils";
import { useSelector } from "react-redux";
import TaskDialog from "../components/tasks/TaskDialog";
import { useTaskContext } from "../components/contextapi/TaskContext";
import { useScreenRecording } from "../components/contextapi/RecordingContext";

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const Tasks = () => {
  const { taskId, taskStatus } = useTaskContext(); // Retrieve taskId and taskStatus from context
  const params = useParams();
  const { user } = useSelector((state) => state.auth);
  const [searchParams] = useSearchParams();
  const [searchTerm] = useState(searchParams.get("search") || "");
  const { stream } = useScreenRecording();

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const videoRef = useRef(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const status = params?.status || "";

  const { data, isLoading, refetch } = useGetAllTaskQuery({
    strQuery: status,
    isTrashed: "",
    search: searchTerm,
  });

  const [uploadImage] = useUploadImageMutation();

  // Effect to attach screen stream to video element
  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play();
      };
    }
  }, [stream]);

  useEffect(() => {
    if (data?.tasks && Array.isArray(data.tasks)) {
      const inProgressTask = data.tasks.find((task) => task.stage === "in progress");
      if (inProgressTask) {
        handleScreenShareStart(inProgressTask._id);
        return;
      }
    }

    if (taskStatus && taskId) {
      handleScreenShareStart(taskId);
    }
  }, [data, taskStatus, taskId]);

  const startTakingScreenshots = (stream, taskId) => {
    if (!videoRef.current) {
      console.log("Video reference not available.");
      return;
    }

    const interval = setInterval(async () => {
      const video = videoRef.current;

      if (video && video.readyState === video.HAVE_ENOUGH_DATA) {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(async (blob) => {
          if (blob) {
            try {
              const arrayBuffer = await blob.arrayBuffer();
              const uint8Array = new Uint8Array(arrayBuffer);

              await uploadImage({
                taskId,
                uint8Array,
              }).unwrap();

              console.log("Screenshot uploaded successfully for task:", taskId);
            } catch (error) {
              console.error("Error uploading screenshot:", error);
            }
          }
        }, "image/png");
      } else {
        console.log("Video is not ready or has no data to capture.");
      }
    }, 5000);

    stream.getVideoTracks()[0].onended = () => {
      clearInterval(interval);
      console.log("Screen sharing stopped, clearing screenshot interval.");
    };
  };

  const handleScreenShareStart = async (taskId) => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      console.log("Stream received:", stream);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
        };
      }

      startTakingScreenshots(stream, taskId); // Pass the taskId to startTakingScreenshots
    } catch (err) {
      console.error("Error starting screen share:", err);
    }
  };

  useEffect(() => {
    refetch();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [open]);

  return isLoading ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Title title={status ? `${status} Tasks` : "Tasks"} />
        {!status && user?.isAdmin && (
          <Button
            label="Create Task"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-purple-600 text-white rounded-md py-2 2xl:py-2.5"
            onClick={() => setOpen(true)}
          />
        )}
      </div>

      <div>
        <Tabs tabs={TABS} setSelected={setSelected}>
          {!status && (
            <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
              <TaskTitle label="To Do" className={TASK_TYPE.todo} count={data?.tasks.filter(task => task.stage === "todo").length || 0} />
              <TaskTitle label="In Progress" className={TASK_TYPE["in progress"]} count={data?.tasks.filter(task => task.stage === "in progress").length || 0} />
              <TaskTitle label="Completed" className={TASK_TYPE.completed} count={data?.tasks.filter(task => task.stage === "completed").length || 0} />
            </div>
          )}

          {selected === 0 ? (
            <BoardView tasks={data?.tasks} />
          ) : (
            <Table tasks={data?.tasks} />
          )}
        </Tabs>
      </div>

      <video ref={videoRef} autoPlay style={{ display: "none" }} />

      {isDialogOpen && (
        <TaskDialog
          onScreenShareStart={handleScreenShareStart}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
      <AddTask open={open} setOpen={setOpen} />
    </div>
  );
};

export default Tasks;
