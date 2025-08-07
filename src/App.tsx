import React from 'react';
import { TaskProvider } from './context/TaskContext';
import TaskList from './components/TaskList';

const App: React.FC = () => {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-100">
        <TaskList />
      </div>
    </TaskProvider>
  );
};

export default App;
