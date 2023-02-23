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
    }, []);
    return (
        <form onSubmit={handlerSubmit}>
            <input
                type="text"
                name="title"
                placeholder="title"
                onChange={handlerChange}
                value={task.title}
            />
            <textarea
                name="description"
                placeholder="description"
                onChange={handlerChange}
                value={task.description}
            ></textarea>
            <button type="submit">Save task</button>
        </form>
    );
};

export default TaskForm;
