import { Badge } from '@/components/ui/badge';

interface GenreFilterProps {
  genres: string[];
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
}

export default function GenreFilter({ genres, selectedGenre, onGenreChange }: GenreFilterProps) {
  const genreColors: Record<string, string> = {
    'Hip-Hop': 'bg-neon-purple hover:bg-neon-purple/80',
    'Trap': 'bg-neon-pink hover:bg-neon-pink/80',
    'R&B': 'bg-neon-orange hover:bg-neon-orange/80',
    'Pop': 'bg-neon-blue hover:bg-neon-blue/80',
    'Rock': 'bg-accent hover:bg-accent/80',
    'Electronic': 'bg-primary hover:bg-primary/80',
    'Jazz': 'bg-secondary hover:bg-secondary/80',
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Badge
        className={`cursor-pointer px-4 py-2 text-sm transition-all hover:scale-105 ${
          selectedGenre === 'Все'
            ? 'bg-gradient-to-r from-neon-purple to-neon-pink text-white border-0 glow-purple'
            : 'bg-muted text-muted-foreground hover:bg-muted/80 border-0'
        }`}
        onClick={() => onGenreChange('Все')}
      >
        Все жанры
      </Badge>
      {genres.map((genre) => (
        <Badge
          key={genre}
          className={`cursor-pointer px-4 py-2 text-sm transition-all hover:scale-105 text-white border-0 ${
            selectedGenre === genre
              ? `${genreColors[genre] || 'bg-primary'} glow-purple scale-105`
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
          onClick={() => onGenreChange(genre)}
        >
          {genre}
        </Badge>
      ))}
    </div>
  );
}
