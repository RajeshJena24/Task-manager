import {create} from "zustand";

export const useTaskStore =create((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),

  createTask: async (newTask) => {
      if (!newTask.task_name || !newTask.task_description || !newTask.task_timelimit) {
        return {success: false, message: "Please fill all the fields"};
      }

      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      })
      const data = await res.json();
      set((state) => ({ tasks:[...state.tasks, data.data] }));
      return {success: true, message: "Task created successfully."};
  },

  fetchTasks: async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    set({ tasks: data });
    },

    updateTask: async (taskId, updatedTask) => {
        const res = await fetch(`/api/tasks/${taskId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        });
        const data = await res.json();
        if (!data.success) {
          return {success: false, message: data.message || "Failed to update task"};
        }

        set((state) => ({
          tasks: state.tasks.map((task) =>
            task._id === taskId ? { ...task, ...updatedTask } : task
          ),
        }));
        return {success: true, message: "Task updated successfully."};
    },

  deleteTask: async (taskId) => {
    const res = await fetch(`/api/tasks/${taskId}`, {
       method: "DELETE",
      });
       const data = await res.json(); // ✅ Required to parse response
      if(!data.success) {
        return {success: false, message: data.message || "Failed to delete task"};
      }
      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== taskId)
      }));
      return { success: true, message: "Task deleted successfully." };
    }
}));