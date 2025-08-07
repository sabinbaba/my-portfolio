import React from 'react';
import { Category } from '@/types/taskTypes';
import { Badge } from '@/components/ui/badge';
import { Code, Server, Users, Palette, Tag } from 'lucide-react';

interface CategoryBadgeProps {
  category: Category;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
  const config: Record<string, { className: string; icon: React.ReactNode }> = {
    Frontend: {
      className: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: <Code size={12} />,
    },
    Backend: {
      className: 'bg-purple-100 text-purple-800 border-purple-200',
      icon: <Server size={12} />,
    },
    Meeting: {
      className: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      icon: <Users size={12} />,
    },
    Design: {
      className: 'bg-pink-100 text-pink-800 border-pink-200',
      icon: <Palette size={12} />,
    },
  };

  const { className, icon } = config[category] || {
    className: 'bg-gray-100 text-gray-800 border-gray-200',
    icon: <Tag size={12} />,
  };

  return (
    <Badge variant="outline" className={`${className} flex items-center gap-1 text-xs font-medium`}>
      {icon}
      {category}
    </Badge>
  );
};

export default CategoryBadge;
