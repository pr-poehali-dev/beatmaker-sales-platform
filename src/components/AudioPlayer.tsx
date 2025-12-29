import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { useState, useEffect } from 'react';

interface Track {
  id: number;
  title: string;
  artist: string;
  coverUrl: string;
}

interface AudioPlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function AudioPlayer({
  currentTrack,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
}: AudioPlayerProps) {
  const [volume, setVolume] = useState([75]);
  const [speed, setSpeed] = useState([100]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(180);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => (prev < duration ? prev + 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <Card className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-50 glow-purple">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="relative w-16 h-16 flex-shrink-0">
              <img
                src={currentTrack.coverUrl}
                alt={currentTrack.title}
                className={`w-full h-full rounded-lg object-cover ${
                  isPlaying ? 'animate-pulse-glow' : ''
                }`}
              />
              {isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-8 bg-neon-purple rounded-full animate-wave"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-foreground truncate">{currentTrack.title}</h4>
              <p className="text-sm text-muted-foreground truncate">{currentTrack.artist}</p>
            </div>
          </div>

          <div className="flex-1 max-w-2xl space-y-2">
            <div className="flex items-center justify-center gap-4">
              <Button
                size="icon"
                variant="ghost"
                className="text-foreground hover:text-primary"
                onClick={onPrevious}
              >
                <Icon name="SkipBack" size={20} />
              </Button>
              <Button
                size="icon"
                className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90"
                onClick={onPlayPause}
              >
                <Icon name={isPlaying ? 'Pause' : 'Play'} size={24} className="text-white" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-foreground hover:text-primary"
                onClick={onNext}
              >
                <Icon name="SkipForward" size={20} />
              </Button>
            </div>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="w-10 text-right">{formatTime(currentTime)}</span>
              <Slider
                value={[currentTime]}
                max={duration}
                step={1}
                className="flex-1"
                onValueChange={(value) => setCurrentTime(value[0])}
              />
              <span className="w-10">{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-6 flex-1 justify-end">
            <div className="flex items-center gap-2 min-w-[150px]">
              <Icon name="Volume2" size={18} className="text-muted-foreground" />
              <Slider
                value={volume}
                max={100}
                step={1}
                className="w-24"
                onValueChange={setVolume}
              />
              <span className="text-xs text-muted-foreground w-8">{volume[0]}%</span>
            </div>

            <div className="flex items-center gap-2 min-w-[150px]">
              <Icon name="Gauge" size={18} className="text-muted-foreground" />
              <Slider
                value={speed}
                min={50}
                max={150}
                step={5}
                className="w-24"
                onValueChange={setSpeed}
              />
              <span className="text-xs text-muted-foreground w-8">{speed[0]}%</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
