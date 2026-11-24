import { useState, useCallback } from "react";
import { Upload, X, Loader2, ArrowLeft, ArrowRight, Star, ImageIcon } from "lucide-react";
import { uploadImage } from "../../lib/api";

interface ImageUploaderProps {
  value: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
}

export function ImageUploader({ value, onChange, maxImages = 10 }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const remaining = maxImages - value.length;
      if (remaining <= 0) return;

      const toUpload = Array.from(files).slice(0, remaining);
      if (toUpload.length === 0) return;

      setError(null);
      setUploading(true);
      try {
        const uploadedUrls = await Promise.all(toUpload.map((f) => uploadImage(f)));
        onChange([...value, ...uploadedUrls]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Image upload failed");
      } finally {
        setUploading(false);
      }
    },
    [value, onChange, maxImages],
  );

  const removeImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const moveImage = (from: number, to: number) => {
    if (to < 0 || to >= value.length) return;
    const next = [...value];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  };

  const setAsCover = (index: number) => {
    if (index === 0) return;
    moveImage(index, 0);
  };

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      {value.length < maxImages && (
        <label
          className={[
            "flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-2xl p-6 md:p-8 cursor-pointer transition-all group",
            uploading
              ? "border-accent/40 bg-accent/5 cursor-wait"
              : "border-border hover:border-accent/50 hover:bg-accent/5",
          ].join(" ")}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            disabled={uploading}
            className="sr-only"
            onChange={(e) => handleFiles(e.target.files)}
          />
          {uploading ? (
            <div className="w-11 h-11 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center">
              <Loader2 className="w-5 h-5 text-accent animate-spin" />
            </div>
          ) : (
            <div className="w-11 h-11 rounded-2xl bg-muted/80 border border-border group-hover:border-accent/40 group-hover:text-accent flex items-center justify-center transition-colors">
              <Upload className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
            </div>
          )}
          <div className="text-center space-y-1">
            <p className="text-sm font-medium text-foreground">
              {uploading ? "Uploading images to Cloudflare R2…" : "Click or drag & drop images to upload"}
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG, WebP or SVG · Max {maxImages} images ({value.length} / {maxImages} uploaded)
            </p>
          </div>
        </label>
      )}

      {error && (
        <div className="p-3 rounded-xl border border-red-500/20 bg-red-500/10 text-xs text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Previews Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {value.map((url, i) => (
            <div
              key={url + i}
              className="relative group aspect-video rounded-xl overflow-hidden bg-muted border border-border shadow-sm"
            >
              <img
                src={url}
                alt={`Uploaded preview ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Hover actions overlay */}
              <div className="absolute inset-0 bg-background/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-2">
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => moveImage(i, i - 1)}
                    className="p-1.5 bg-card/90 text-foreground rounded-lg border border-border hover:bg-card hover:border-foreground/30 transition-all"
                    title="Move left"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                )}

                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => setAsCover(i)}
                    className="p-1.5 bg-card/90 text-foreground rounded-lg border border-border hover:bg-card hover:border-accent hover:text-accent transition-all"
                    title="Set as Cover"
                  >
                    <Star className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-sm"
                  title="Remove image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>

                {i < value.length - 1 && (
                  <button
                    type="button"
                    onClick={() => moveImage(i, i + 1)}
                    className="p-1.5 bg-card/90 text-foreground rounded-lg border border-border hover:bg-card hover:border-foreground/30 transition-all"
                    title="Move right"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Cover badge */}
              {i === 0 ? (
                <span className="absolute top-2 left-2 text-[10px] font-semibold uppercase tracking-wider bg-accent text-accent-foreground px-2 py-0.5 rounded-md shadow-sm">
                  Cover
                </span>
              ) : (
                <span className="absolute top-2 left-2 text-[10px] font-medium bg-background/80 text-foreground/80 px-1.5 py-0.5 rounded-md backdrop-blur-sm">
                  #{i + 1}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
