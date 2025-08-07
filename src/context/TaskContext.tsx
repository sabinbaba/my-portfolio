import React, { createContext, useContext, useReducer } from 'react';
import { taskReducer, initialState, TaskState } from './taskReducer';
import { Task, TaskFilters } from '../types/taskTypes';

type TaskContextType = {
  state: TaskState;
  addTask: (task: Omit<Task, 'id' | 'assignedOn'>) => void;
  editTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  setFilters: (filters: TaskFilters) => void;
  resetFilters: () => void;
  getFilteredTasks: () => Task[];
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const addTask = (task: Omit<Task, 'id' | 'assignedOn'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      assignedOn: new Date(),
    };
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  const editTask = (task: Task) => {
    dispatch({ type: 'EDIT_TASK', payload: task });
  };

  const deleteTask = (id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const toggleTask = (id: string) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  };

  const setFilters = (filters: TaskFilters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' });
  };

  const getFilteredTasks = () => {
    const { tasks, filters } = state;

    return tasks.filter((task) => {
      // Status filter
      if (filters.status === 'Completed' && !task.completed) return false;
      if (filters.status === 'Incomplete' && task.completed) return false;

      // Priority filter
      if (filters.priority && task.priority !== filters.priority) return false;

      // Category filter
      if (filters.category && task.category !== filters.category) return false;

      // Assigned user filter
      if (
        filters.assignedUser &&
        !task.assignedUser
          .toLowerCase()
          .includes(filters.assignedUser.toLowerCase())
      )
        return false;

      // Due date filter
      if (filters.dueDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (task.dueDate) {
          const dueDate = new Date(task.dueDate);
          dueDate.setHours(0, 0, 0, 0);

          switch (filters.dueDate) {
            case 'Overdue':
              if (dueDate >= today) return false;
              break;
            case 'Today':
              if (dueDate.getTime() !== today.getTime()) return false;
              break;
            case 'Upcoming':
              if (dueDate <= today) return false;
              break;
            case 'No Due Date':
              return false;
          }
        } else if (filters.dueDate !== 'No Due Date') {
          return false;
        }
      }

      return true;
    });
  };

  return (
    <TaskContext.Provider
      value={{
        state,
        addTask,
        editTask,
        deleteTask,
        toggleTask,
        setFilters,
        resetFilters,
        getFilteredTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
