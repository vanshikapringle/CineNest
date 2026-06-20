import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SectionHeaderProps {
  title: string;
  actionText?: string;
  actionHref?: string;
}

export function SectionHeader({ title, actionText, actionHref }: SectionHeaderProps) {
  return (
    <div className="flex justify-between items-end mb-6">
      <h2 className="text-2xl font-heading font-semibold text-soft-white tracking-wide">
        {title}
      </h2>
      {actionText && actionHref && (
        <Link to={actionHref} className="flex items-center text-sm text-crimson-red hover:text-rose-400 transition-colors">
          {actionText}
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
