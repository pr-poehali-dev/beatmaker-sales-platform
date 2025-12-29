import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import TrackCard from '@/components/TrackCard';
import AudioPlayer from '@/components/AudioPlayer';
import ShoppingCart from '@/components/ShoppingCart';
import GenreFilter from '@/components/GenreFilter';
import { useToast } from '@/hooks/use-toast';

interface Track {
  id: number;
  title: string;
  artist: string;
  genre: string;
  bpm: number;
  price: number;
  duration: string;
  coverUrl: string;
}

const MOCK_TRACKS: Track[] = [
  {
    id: 1,
    title: 'Night Vibes',
    artist: 'DJ Producer',
    genre: 'Hip-Hop',
    bpm: 140,
    price: 29.99,
    duration: '3:24',
    coverUrl: 'https://cdn.poehali.dev/projects/d11ddfca-7cbb-4650-a327-5a10743b3840/files/7dcb1bde-8acc-4ac9-af28-fd2a3028d409.jpg',
  },
  {
    id: 2,
    title: 'Urban Flow',
    artist: 'Beat Master',
    genre: 'Trap',
    bpm: 160,
    price: 34.99,
    duration: '2:58',
    coverUrl: 'https://cdn.poehali.dev/projects/d11ddfca-7cbb-4650-a327-5a10743b3840/files/27b3075c-5145-41a2-b454-e3d94d2bbe59.jpg',
  },
  {
    id: 3,
    title: 'Smooth Soul',
    artist: 'Melody Maker',
    genre: 'R&B',
    bpm: 95,
    price: 39.99,
    duration: '4:12',
    coverUrl: 'https://cdn.poehali.dev/projects/d11ddfca-7cbb-4650-a327-5a10743b3840/files/d7987c2b-496c-4a28-8da7-e1d306ffd976.jpg',
  },
  {
    id: 4,
    title: 'Midnight Drive',
    artist: 'Sound Designer',
    genre: 'Electronic',
    bpm: 128,
    price: 44.99,
    duration: '3:45',
    coverUrl: 'https://cdn.poehali.dev/projects/d11ddfca-7cbb-4650-a327-5a10743b3840/files/7dcb1bde-8acc-4ac9-af28-fd2a3028d409.jpg',
  },
  {
    id: 5,
    title: 'Street Energy',
    artist: 'Urban Beats',
    genre: 'Hip-Hop',
    bpm: 145,
    price: 29.99,
    duration: '3:15',
    coverUrl: 'https://cdn.poehali.dev/projects/d11ddfca-7cbb-4650-a327-5a10743b3840/files/27b3075c-5145-41a2-b454-e3d94d2bbe59.jpg',
  },
  {
    id: 6,
    title: 'Love Melody',
    artist: 'Soul Producer',
    genre: 'R&B',
    bpm: 88,
    price: 39.99,
    duration: '4:30',
    coverUrl: 'https://cdn.poehali.dev/projects/d11ddfca-7cbb-4650-a327-5a10743b3840/files/d7987c2b-496c-4a28-8da7-e1d306ffd976.jpg',
  },
];

const GENRES = ['Hip-Hop', 'Trap', 'R&B', 'Electronic', 'Pop', 'Rock', 'Jazz'];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Все');
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cartItems, setCartItems] = useState<Track[]>([]);
  const { toast } = useToast();

  const filteredTracks = MOCK_TRACKS.filter((track) => {
    const matchesSearch =
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'Все' || track.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const handlePlay = (id: number) => {
    const track = MOCK_TRACKS.find((t) => t.id === id);
    if (track) {
      if (currentTrack?.id === id) {
        setIsPlaying(!isPlaying);
      } else {
        setCurrentTrack(track);
        setIsPlaying(true);
      }
    }
  };

  const handleAddToCart = (id: number) => {
    const track = MOCK_TRACKS.find((t) => t.id === id);
    if (track && !cartItems.find((item) => item.id === id)) {
      setCartItems([...cartItems, track]);
      toast({
        title: 'Добавлено в корзину',
        description: `${track.title} - ${track.artist}`,
      });
    }
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    toast({
      title: 'Удалено из корзины',
      variant: 'destructive',
    });
  };

  const handleCheckout = () => {
    toast({
      title: 'Оформление заказа',
      description: `Итого: $${cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}`,
    });
  };

  const handleNext = () => {
    if (currentTrack) {
      const currentIndex = MOCK_TRACKS.findIndex((t) => t.id === currentTrack.id);
      const nextTrack = MOCK_TRACKS[(currentIndex + 1) % MOCK_TRACKS.length];
      setCurrentTrack(nextTrack);
    }
  };

  const handlePrevious = () => {
    if (currentTrack) {
      const currentIndex = MOCK_TRACKS.findIndex((t) => t.id === currentTrack.id);
      const prevTrack =
        MOCK_TRACKS[(currentIndex - 1 + MOCK_TRACKS.length) % MOCK_TRACKS.length];
      setCurrentTrack(prevTrack);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-lg border-b border-border glow-purple">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 animate-slide-up">
              <img 
                src="https://cdn.poehali.dev/files/_tU9DmQxFNaJ6D0QUKu2UrPfPQn2zmW2YHDtSgLVI4EsWSpSFoH51iU17mgWAnUmHJYMLY0B60oni4bExYxJhJG7.jpg"
                alt="SiberianSound Group"
                className="w-12 h-12 object-contain hover:scale-110 transition-transform duration-300"
              />
              <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-neon-pink to-neon-orange">
                SiberianSound
              </h1>
            </div>

            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Icon
                  name="Search"
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  placeholder="Поиск минусовок, битмейкеров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background border-border"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                <Icon name="Upload" size={18} className="mr-2" />
                Загрузить
              </Button>
              <ShoppingCart
                items={cartItems}
                onRemoveItem={handleRemoveFromCart}
                onCheckout={handleCheckout}
              />
              <Button
                size="icon"
                variant="outline"
                className="border-primary hover:bg-primary/10"
              >
                <Icon name="User" size={20} className="text-primary" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center animate-slide-up">
          <h2 className="text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-neon-pink to-neon-orange">
            Маркетплейс минусовок
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Покупайте и продавайте качественные минусовки от профессиональных битмейкеров
          </p>
        </section>

        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-foreground">Жанры</h3>
            <span className="text-sm text-muted-foreground">
              {filteredTracks.length} минусовок
            </span>
          </div>
          <GenreFilter
            genres={GENRES}
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
          />
        </section>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTracks.map((track) => (
              <TrackCard
                key={track.id}
                {...track}
                onPlay={handlePlay}
                onAddToCart={handleAddToCart}
                isPlaying={currentTrack?.id === track.id && isPlaying}
              />
            ))}
          </div>

          {filteredTracks.length === 0 && (
            <div className="text-center py-12">
              <Icon name="SearchX" size={64} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-xl text-muted-foreground">Минусовки не найдены</p>
              <p className="text-sm text-muted-foreground mt-2">
                Попробуйте изменить фильтры или поисковый запрос
              </p>
            </div>
          )}
        </section>
      </main>

      <AudioPlayer
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
};

export default Index;