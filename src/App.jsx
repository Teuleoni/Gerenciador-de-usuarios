import { useEffect, useState } from "react";
import AddTask from "./componentes/AddTask";
import Tarefas from "./componentes/Tasks";
import { v4 } from "uuid";
import Title from "./componentes/title";
import { GitCommit } from "lucide-react";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id == taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(newTasks);
  }

  function onTaskDelete(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTasks = {
      id: v4(),
      title: title,
      description: description,
      isCompleted: false,
    };
    setTasks([...tasks, newTasks]);
  }

  useEffect(() => {}, [tasks]);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  useEffect(() => {
    const fetchTasks = async () => {
      //CHAMAR UMA API

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
        {
          method: "GET",
        }
      );

      //PEGAR OS DADOS QUE ELA RETORNA
      const data = await response.json();

      //ARMAZENAR/PERSISTIR ESSES DADOS NO STATE
      setTasks(data);
    };
    /* fetchTasks(); */
  }, []);

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title> Gerenciador de tarefas</Title>

        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tarefas
          tasks={tasks}
          onTaskClick={onTaskClick}
          onTaskDelete={onTaskDelete}
        />
      </div>
    </div>
  );
}

export default App;
