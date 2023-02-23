import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskForm from "../src/components/TaskForm";
import TaskList from "../src/components/TaskList";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<TaskList />} />
                    <Route path="/create-task" element={<TaskForm />} />
                    <Route path="/edit-task/:id" element={<TaskForm />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
