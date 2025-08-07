export type Priority = 'Low' | 'Medium' | 'High';
export type Category = 'Frontend' | 'Backend' | 'Meeting' | 'Design' | 'Other';
export type DueDateFilter = 'Overdue' | 'Today' | 'Upcoming' | 'No Due Date';
export type StatusFilter = 'All' | 'Completed' | 'Incomplete';

export interface Task {
  id: string;
  taskName: string;
  priority: Priority;
  category: Category;
  dueDate: Date | null;
  assignedUser: string;
  assignedOn: Date;
  completed: boolean;
}

export interface TaskFilters {
  status: StatusFilter;
  priority: Priority | '';
  category: Category | '';
  dueDate: DueDateFilter | '';
  assignedUser: string;
}
