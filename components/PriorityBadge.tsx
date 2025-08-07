import React from 'react';
import { Priority } from '@/types/taskTypes';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Minus, ArrowUp } from 'lucide-react';

interface PriorityBadgeProps {
  priority: Priority;
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const config = {
    Low: {
      className: 'bg-green-100 text-green-800 border-green-200',
      icon: <Minus size={12} />,
    },
    Medium: {
      className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      icon: <Minus size={12} />,
    },
    High: {
      className: 'bg-red-100 text-red-800 border-red-200',
      icon: <ArrowUp size={12} />,
    },
  };

  const { className, icon } = config[priority];

  return (
    <Badge variant="outline" className={`${className} flex items-center gap-1 text-xs font-medium`}>
      {icon}
      {priority}
    </Badge>
  );
};

export default PriorityBadge;
