import React from 'react';
import { Priority, Category, DueDateFilter, StatusFilter } from '@/types/taskTypes';
import { useTaskOperations } from '@/hooks/useTasks';
import { Filter, RotateCcw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const FilterPanel: React.FC = () => {
  const { filters, setFilters, resetFilters } = useTaskOperations();

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const activeFiltersCount = Object.values(filters).filter(f => f && f !== '').length;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              {activeFiltersCount}
            </Badge>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            <RotateCcw size={16} className="mr-1" />
            Reset
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Status
          </Label>
          <Select
            value={filters.status || "all"}
            onValueChange={(value) => handleFilterChange('status', value === "all" ? "" : value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Incomplete">Incomplete</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Priority
          </Label>
          <Select
            value={filters.priority || "all"}
            onValueChange={(value) => handleFilterChange('priority', value === "all" ? "" : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Priorities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="High">High Priority</SelectItem>
              <SelectItem value="Medium">Medium Priority</SelectItem>
              <SelectItem value="Low">Low Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Category
          </Label>
          <Select
            value={filters.category || "all"}
            onValueChange={(value) => handleFilterChange('category', value === "all" ? "" : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Frontend">Frontend</SelectItem>
              <SelectItem value="Backend">Backend</SelectItem>
              <SelectItem value="Meeting">Meeting</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Due Date
          </Label>
          <Select
            value={filters.dueDate || "all"}
            onValueChange={(value) => handleFilterChange('dueDate', value === "all" ? "" : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Due Dates" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Due Dates</SelectItem>
              <SelectItem value="Overdue">Overdue</SelectItem>
              <SelectItem value="Today">Due Today</SelectItem>
              <SelectItem value="Upcoming">Upcoming</SelectItem>
              <SelectItem value="No Due Date">No Due Date</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="assignedUser" className="text-sm font-medium text-gray-700 mb-2 block">
            Assigned To
          </Label>
          <Input
            id="assignedUser"
            type="text"
            value={filters.assignedUser}
            onChange={(e) => handleFilterChange('assignedUser', e.target.value)}
            placeholder="Filter by assignee..."
            className="h-10"
          />
        </div>
      </div>
    </Card>
  );
};

export default FilterPanel;
