import { useState, useEffect } from "react";
import {
  getTasksByProject,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskProjectService";
import { useParams } from "react-router-dom";
import TaskListProject from "../components/TaskListProject";
import TaskModal from "../components/TaskModal";

export default function TarefasProjetoPage() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    status: "Pendente", // Status padrão
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasksByProject(id);
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    };
    fetchTasks();
  }, [id]);

  const handleCreateTask = async () => {
    try {
      const createdTask = await createTask(id, taskData);
      setTasks([...tasks, createdTask]);
      resetModal();
    } catch (error) {
      console.error("Error creating task:", error.message);
    }
  };

  const handleUpdateTask = async () => {
    try {
      const updatedTask = await updateTask(id, currentTask.id, {
        ...taskData,
        status: taskData.status,
      }); // Inclui o status
      setTasks(
        tasks.map((task) => (task.id === currentTask.id ? updatedTask : task))
      );
      resetModal();
    } catch (error) {
      console.error("Error updating task:", error.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(id, taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const taskToUpdate = tasks.find((task) => task.id === taskId);
      const updatedTask = await updateTask(id, taskId, {
        ...taskToUpdate,
        status: newStatus,
      });
      setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
    } catch (error) {
      console.error("Error updating task status:", error.message);
    }
  };

  const resetModal = () => {
    setTaskData({ name: "", description: "", status: "pendente" });
    setCurrentTask(null);
    setShowModal(false);
    setEditModal(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tarefas do Projeto {id}</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => setShowModal(true)}
      >
        Adicionar Tarefa
      </button>

      <TaskListProject
        tasks={tasks}
        onEdit={(task) => {
          setCurrentTask(task);
          setTaskData({
            name: task.name,
            description: task.description,
            status: task.status, // Incluindo o status ao editar
          });
          setEditModal(true);
        }}
        onDelete={handleDeleteTask}
        onStatusChange={handleStatusChange} // Lógica de alteração de status
      />

      {showModal && (
        <TaskModal
          title="Criar Nova Tarefa"
          taskData={taskData}
          setTaskData={setTaskData}
          onCancel={resetModal}
          onSubmit={handleCreateTask}
        />
      )}

      {editModal && (
        <TaskModal
          title="Editar Tarefa"
          taskData={taskData}
          setTaskData={setTaskData}
          onCancel={resetModal}
          onSubmit={handleUpdateTask}
        />
      )}
    </div>
  );
}
