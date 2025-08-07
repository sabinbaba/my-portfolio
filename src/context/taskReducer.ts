import { Task, TaskFilters } from '../types/taskTypes';

export type TaskAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'EDIT_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'SET_FILTERS'; payload: TaskFilters }
  | { type: 'RESET_FILTERS' };

export interface TaskState {
  tasks: Task[];
  filters: TaskFilters;
}

export const initialState: TaskState = {
  tasks: [],
  filters: {
    status: 'All',
    priority: '',
    category: '',
    dueDate: '',
    assignedUser: '',
  },
};

export function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    case 'SET_FILTERS':
      return { ...state, filters: action.payload };
    case 'RESET_FILTERS':
      return { ...state, filters: initialState.filters };
    default:
      return state;
  }
}
