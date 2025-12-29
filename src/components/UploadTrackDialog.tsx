import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const GENRES = ['Hip-Hop', 'Trap', 'R&B', 'Electronic', 'Pop', 'Rock', 'Jazz'];

export default function UploadTrackDialog() {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);

    setTimeout(() => {
      setUploading(false);
      setOpen(false);
      toast({
        title: 'Минусовка загружена!',
        description: 'Ваш трек успешно добавлен в каталог',
      });
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="border-primary text-white bg-primary hover:bg-primary/90">
          <Icon name="Upload" size={18} className="mr-2" />
          Загрузить трек
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Загрузить минусовку
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Заполните информацию о треке для публикации на платформе
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-foreground">
                Название трека *
              </Label>
              <Input
                id="title"
                placeholder="Night Vibes"
                required
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="artist" className="text-foreground">
                Имя исполнителя *
              </Label>
              <Input
                id="artist"
                placeholder="DJ Producer"
                required
                className="bg-background border-border"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="genre" className="text-foreground">
                Жанр *
              </Label>
              <Select required>
                <SelectTrigger id="genre" className="bg-background border-border">
                  <SelectValue placeholder="Выберите жанр" />
                </SelectTrigger>
                <SelectContent>
                  {GENRES.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bpm" className="text-foreground">
                BPM *
              </Label>
              <Input
                id="bpm"
                type="number"
                placeholder="140"
                min="50"
                max="200"
                required
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="text-foreground">
                Цена ($) *
              </Label>
              <Input
                id="price"
                type="number"
                placeholder="29.99"
                step="0.01"
                min="0"
                required
                className="bg-background border-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">
              Описание
            </Label>
            <Textarea
              id="description"
              placeholder="Расскажите о вашем треке, его особенностях и настроении..."
              className="bg-background border-border min-h-24"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="audio" className="text-foreground">
              Аудиофайл *
            </Label>
            <div className="flex items-center gap-3">
              <Input
                id="audio"
                type="file"
                accept="audio/*"
                required
                className="bg-background border-border"
              />
              <Icon name="Music" size={20} className="text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">
              Поддерживаемые форматы: MP3, WAV, FLAC (макс. 50 МБ)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cover" className="text-foreground">
              Обложка
            </Label>
            <div className="flex items-center gap-3">
              <Input
                id="cover"
                type="file"
                accept="image/*"
                className="bg-background border-border"
              />
              <Icon name="Image" size={20} className="text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">
              JPG, PNG (рекомендуемый размер: 1000x1000 px)
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-orange hover:opacity-90 text-white font-bold glow-purple"
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                  Загрузка...
                </>
              ) : (
                <>
                  <Icon name="Upload" size={18} className="mr-2" />
                  Опубликовать трек
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-border"
              disabled={uploading}
            >
              Отмена
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
