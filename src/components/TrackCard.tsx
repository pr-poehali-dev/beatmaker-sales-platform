import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

interface TrackCardProps {
  id: number;
  title: string;
  artist: string;
  genre: string;
  bpm: number;
  price: number;
  duration: string;
  coverUrl: string;
  onPlay: (id: number) => void;
  onAddToCart: (id: number) => void;
  isPlaying?: boolean;
}

export default function TrackCard({
  id,
  title,
  artist,
  genre,
  bpm,
  price,
  duration,
  coverUrl,
  onPlay,
  onAddToCart,
  isPlaying = false,
}: TrackCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={`relative overflow-hidden bg-card border-border transition-all duration-300 hover:scale-[1.02] ${
        isPlaying ? 'glow-purple ring-2 ring-primary' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={coverUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div
          className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
            isHovered || isPlaying ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Button
            size="icon"
            className={`w-16 h-16 rounded-full bg-primary hover:bg-primary/90 ${
              isPlaying ? 'animate-pulse-glow' : ''
            }`}
            onClick={() => onPlay(id)}
          >
            <Icon name={isPlaying ? 'Pause' : 'Play'} size={28} className="text-white" />
          </Button>
        </div>
        <Badge className="absolute top-2 right-2 bg-neon-pink text-white border-0">
          {genre}
        </Badge>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-lg text-foreground truncate">{title}</h3>
          <p className="text-sm text-muted-foreground truncate">{artist}</p>
        </div>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="Clock" size={14} />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Activity" size={14} />
            <span>{bpm} BPM</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-bold text-neon-purple">${price}</span>
          <Button
            size="sm"
            className="bg-accent hover:bg-accent/90 text-white"
            onClick={() => onAddToCart(id)}
          >
            <Icon name="ShoppingCart" size={16} className="mr-2" />
            В корзину
          </Button>
        </div>
      </div>
    </Card>
  );
}
