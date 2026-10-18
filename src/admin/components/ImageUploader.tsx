import { useState, useCallback } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { uploadImage } from "../../lib/api";

interface ImageUploaderProps {
  value: string[];                   // current image URLs
  onChange: (urls: string[]) => void;
  maxImages?: number;
}

export function ImageUploader({ value, onChange, maxImages = 10 }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError]         = useState<string | null>(null);

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const remaining = maxImages - value.length;
      const toUpload  = Array.from(files).slice(0, remaining);
      if (toUpload.length === 0) return;

      setError(null);
      setUploading(true);
      try {
        const urls = await Promise.all(toUpload.map((f) => uploadImage(f)));
        onChange([...value, ...urls]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
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
    const next = [...value];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      {value.length < maxImages && (
        <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border rounded-xl p-6 cursor-pointer hover:border-accent/60 hover:bg-accent/5 transition">
          <input
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(e) => handleFiles(e.target.files)}
          />
          {uploading ? (
            <Loader2 className="w-6 h-6 text-accent animate-spin" />
          ) : (
            <Upload className="w-6 h-6 text-muted-foreground" />
          )}
          <span className="text-sm text-muted-foreground">
            {uploading ? "Uploading…" : "Click or drag images to upload"}
          </span>
          <span className="text-xs text-muted-foreground/60">
            {value.length}/{maxImages} images
          </span>
        </label>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}

      {/* Image previews */}
      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {value.map((url, i) => (
            <div key={url + i} className="relative group aspect-video rounded-lg overflow-hidden bg-muted">
              <img src={url} alt={`Image ${i + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => moveImage(i, i - 1)}
                    className="text-xs px-2 py-1 bg-background/80 rounded hover:bg-background transition"
                    aria-label="Move left"
                  >
                    ←
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="p-1.5 bg-red-500/90 text-white rounded-full hover:bg-red-600 transition"
                  aria-label="Remove image"
                >
                  <X className="w-3 h-3" />
                </button>
                {i < value.length - 1 && (
                  <button
                    type="button"
                    onClick={() => moveImage(i, i + 1)}
                    className="text-xs px-2 py-1 bg-background/80 rounded hover:bg-background transition"
                    aria-label="Move right"
                  >
                    →
                  </button>
                )}
              </div>
              {i === 0 && (
                <span className="absolute bottom-1 left-1 text-xs bg-accent text-accent-foreground px-1.5 py-0.5 rounded">
                  Cover
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
