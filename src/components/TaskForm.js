import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../features/tasks/taskSlice";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";

const TaskForm = () => {
    const [task, setTask] = useState({
        title: "",
        description: "",
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const tasks = useSelector((state) => state.tasks);
    const handlerSubmit = (e) => {
        e.preventDefault();
        if (params.id) {
            dispatch(editTask(task));
        } else {
            dispatch(
                addTask({
                    ...task,
                    id: uuid(),
                })
            );
        }
        navigate("/");
    };
    const handlerChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value,
        });
    };
    useEffect(() => {
        if (params.id) {
            const currentTask = tasks.find((task) => task.id === params.id);
            setTask(currentTask);
        }
    }, [params.id, tasks]);
    return (
        <form
            onSubmit={handlerSubmit}
            className="bg-zinc-800 max-w-sm p-4 mb-1"
        >
            <label htmlFor="title" className="block text-xs font-bold">
                Task:
            </label>
            <input
                type="text"
                name="title"
                placeholder="title"
                onChange={handlerChange}
                value={task.title}
                className="w-full p-2 rounded-md bg-zinc-600 mb-2"
            />
            <label
                htmlFor="description"
                className="block text-xs font-bold mb-2"
            >
                Description:
            </label>
            <textarea
                name="description"
                placeholder="description"
                onChange={handlerChange}
                value={task.description}
                className="w-full p-2 rounded-md bg-zinc-600 mb-2"
            ></textarea>
            <button type="submit" className="bg-indigo-600 px-2 py-1">
                Save task
            </button>
        </form>
    );
};

export default TaskForm;
