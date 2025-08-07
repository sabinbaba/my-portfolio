import { useTasks } from '@/context/TaskContext';

export const useTaskOperations = () => {
  const {
    addTask,
    editTask,
    deleteTask,
    toggleTask,
    setFilters,
    resetFilters,
    setSearchTerm,
    getFilteredTasks,
    state,
  } = useTasks();

  return {
    addTask,
    editTask,
    deleteTask,
    toggleTask,
    setFilters,
    resetFilters,
    setSearchTerm,
    getFilteredTasks,
    tasks: state.tasks,
    filters: state.filters,
    searchTerm: state.searchTerm,
  };
};
