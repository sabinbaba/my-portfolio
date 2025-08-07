import React from 'react';
import { Search, X } from 'lucide-react';
import { useTaskOperations } from '@/hooks/useTasks';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useTaskOperations();

  return (
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <Input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 pr-10 h-11 bg-white shadow-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500"
      />
      {searchTerm && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSearchTerm('')}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
        >
          <X size={16} />
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
