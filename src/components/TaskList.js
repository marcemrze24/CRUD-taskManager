import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "../features/tasks/taskSlice";
import { Link } from "react-router-dom";

const TaskList = () => {
    const tasks = useSelector((state) => state.tasks);
    const dispatch = useDispatch();
    const handleDelete = (id) => {
        dispatch(deleteTask(id));
    };
    return (
        <div>
            <header>
                <h1>Current Tasks: {tasks.length}</h1>
                <Link to={"/create-task"}>Create Task</Link>
            </header>
            {tasks.map((task, idx) => {
                return (
                    <div key={idx}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <button
                            onClick={() => {
                                handleDelete(task.id);
                            }}
                        >
                            delete task
                        </button>
                        <Link to={`/edit-task/${task.id}`}>edit task</Link>
                    </div>
                );
            })}
        </div>
    );
};

export default TaskList;
