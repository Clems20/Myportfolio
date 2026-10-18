import { useState, useCallback } from "react";
import { Upload, X, Loader2, ArrowLeft, ArrowRight } from "lucide-react";
import { uploadImage } from "../../lib/api";

interface ImageUploaderProps {
  value: string[];
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

  const removeImage = (index: number) => onChange(value.filter((_, i) => i !== index));

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
        <label
          className={[
            "flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-6 cursor-pointer transition-all",
            uploading
              ? "border-accent/40 bg-accent/5"
              : "border-border hover:border-accent/50 hover:bg-accent/3",
          ].join(" ")}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(e) => handleFiles(e.target.files)}
          />
          {uploading ? (
            <Loader2 className="w-5 h-5 text-accent animate-spin" />
          ) : (
            <div className="w-9 h-9 rounded-xl bg-muted/80 border border-border flex items-center justify-center">
              <Upload className="w-4 h-4 text-muted-foreground" />
            </div>
          )}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {uploading ? "Uploading…" : "Click or drag images to upload"}
            </p>
            <p className="text-xs text-muted-foreground/60 mt-0.5">
              {value.length} / {maxImages} images
            </p>
          </div>
        </label>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}

      {/* Previews */}
      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {value.map((url, i) => (
            <div
              key={url + i}
              className="relative group aspect-video rounded-xl overflow-hidden bg-muted border border-border"
            >
              <img src={url} alt={`Image ${i + 1}`} className="w-full h-full object-cover" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => moveImage(i, i - 1)}
                    className="p-1.5 bg-card rounded-lg border border-border hover:border-foreground/20 transition-all"
                    aria-label="Move left"
                  >
                    <ArrowLeft className="w-3 h-3" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="p-1.5 bg-red-500/90 text-white rounded-lg hover:bg-red-600 transition-all"
                  aria-label="Remove image"
                >
                  <X className="w-3 h-3" />
                </button>
                {i < value.length - 1 && (
                  <button
                    type="button"
                    onClick={() => moveImage(i, i + 1)}
                    className="p-1.5 bg-card rounded-lg border border-border hover:border-foreground/20 transition-all"
                    aria-label="Move right"
                  >
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Cover badge */}
              {i === 0 && (
                <span className="absolute bottom-1.5 left-1.5 text-[10px] font-medium bg-accent text-accent-foreground px-2 py-0.5 rounded-md">
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
