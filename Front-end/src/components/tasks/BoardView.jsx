import TaskCard from "./TaskCard";

const BoardView = ({ tasks = [] }) => {
  // Ensure tasks is always an array to prevent errors
  const groupedTasks = tasks?.reduce(
    (acc, task) => {
      if (!acc[task.stage]) acc[task.stage] = []; // Ensure array exists before pushing
      acc[task.stage].push(task);
      return acc;
    },
    { todo: [], "in progress": [], completed: [] }
  );

  return (
    <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
      {["todo", "in progress", "completed"].map((stage) => (
        <div key={stage} className="flex flex-col w-full gap-4">
          {groupedTasks[stage]?.map((task) => (
            <TaskCard task={task} key={task._id} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default BoardView;
