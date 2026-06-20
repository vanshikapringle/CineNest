import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  id: string;
  title: string;
  imageUrl: string;
  rating: number;
  genre: string;
  isClickable?: boolean;
}

export function MovieCard({ id, title, imageUrl, rating, genre, isClickable = true }: MovieCardProps) {
  const content = (
    <>
      <div className="aspect-[2/3] w-full bg-gray-900">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-black via-transparent to-transparent opacity-80" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-center space-x-1 mb-2 bg-black/50 w-fit px-2 py-1 rounded-md backdrop-blur-sm">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="text-sm font-semibold text-white">{rating}/10</span>
        </div>
        <h3 className="text-lg font-heading font-medium text-white line-clamp-1 group-hover:text-crimson-red transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-300 mt-1">{genre}</p>
      </div>
    </>
  );

  const className = "group relative block rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-crimson-red/20 " + (isClickable ? "cursor-pointer" : "cursor-default");

  if (isClickable) {
    return (
      <Link to={`/movie/${id}`} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <div className={className}>
      {content}
    </div>
  );
}
