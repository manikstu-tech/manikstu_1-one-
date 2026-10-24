"use client";

/**
 * FileDropzone — Industry-Ready Drag-and-Drop File Upload Component
 * ─────────────────────────────────────────────────────────────────────────────
 * Features:
 *  • Drag-and-drop with active / reject visual states
 *  • Click-to-browse via hidden <input type="file">
 *  • MIME-type + file-size validation using shared lib/file-utils.ts
 *  • Simulated per-file upload progress bar
 *  • Image thumbnail previews for photos
 *  • Accessible: keyboard-activated, aria-labels, role="button"
 *  • Cleans up object URLs on unmount (no memory leaks)
 *  • Configurable via DropzoneConfig presets
 */

import {
  useRef,
  useCallback,
  useState,
  useEffect,
  type DragEvent,
} from "react";
import { Upload, X, File as FileIcon, Image as ImageIcon, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import {
  validateFiles,
  simulateUpload,
  formatBytes,
  fileExtLabel,
  isImageFile,
  createAttachedFile,
  type AttachedFile,
  type DropzoneConfig,
  DROPZONE_PRESETS,
} from "@/lib/file-utils";

// ─── Props ────────────────────────────────────────────────────────────────────

export interface FileDropzoneProps {
  /** DropzoneConfig preset key or a custom config object */
  config?: keyof typeof DROPZONE_PRESETS | DropzoneConfig;
  /** Called whenever the accepted + uploaded file set changes */
  onChange?: (files: AttachedFile[]) => void;
  /** Optional controlled value (for form integration) */
  value?: AttachedFile[];
  /** Whether the dropzone is disabled (e.g. while form is submitting) */
  disabled?: boolean;
  /** Additional CSS classes for the outer container */
  className?: string;
  /** Label shown inside the zone (defaults to generic copy) */
  label?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function FileDropzone({
  config: configProp = "document",
  onChange,
  value,
  disabled = false,
  className = "",
  label,
}: FileDropzoneProps) {
  const config: DropzoneConfig =
    typeof configProp === "string"
      ? DROPZONE_PRESETS[configProp]
      : configProp;

  const inputRef = useRef<HTMLInputElement>(null);
  const [dragState, setDragState] = useState<"idle" | "over" | "reject">("idle");
  const [internalFiles, setInternalFiles] = useState<AttachedFile[]>([]);

  // Support both controlled and uncontrolled usage
  const files = value ?? internalFiles;

  // Clean up object URLs on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      for (const f of internalFiles) {
        if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── File processing pipeline ──────────────────────────────────────────────

  const processFiles = useCallback(
    async (rawFiles: File[]) => {
      const { valid, errors } = validateFiles(rawFiles, config);

      // Show validation errors as ephemeral "error" entries
      const errorEntries: AttachedFile[] = errors.map((e) => ({
        id: `err-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        file: new File([], e.file),
        previewUrl: null,
        progress: 0,
        status: "error",
        errorMessage: e.reason,
      }));

      // Build initial "uploading" entries for valid files
      const newEntries: AttachedFile[] = valid.map((file) => {
        const entry = createAttachedFile(file);
        // Generate image preview URL immediately
        if (isImageFile(file)) {
          entry.previewUrl = URL.createObjectURL(file);
        }
        return { ...entry, status: "uploading" as const };
      });

      const nextFiles = [...files, ...errorEntries, ...newEntries];
      setInternalFiles(nextFiles);
      onChange?.(nextFiles);

      // Run simulated upload for each valid file in parallel
      await Promise.all(
        newEntries.map(async (entry) => {
          try {
            await simulateUpload(entry.file, ({ pct, done }) => {
              setInternalFiles((prev) => {
                const updated = prev.map((f) =>
                  f.id === entry.id
                    ? { ...f, progress: pct, status: done ? ("done" as const) : ("uploading" as const) }
                    : f
                );
                onChange?.(updated);
                return updated;
              });
            });
          } catch {
            setInternalFiles((prev) => {
              const updated = prev.map((f) =>
                f.id === entry.id
                  ? { ...f, status: "error" as const, errorMessage: "Upload failed. Please try again." }
                  : f
              );
              onChange?.(updated);
              return updated;
            });
          }
        })
      );
    },
    [config, files, onChange]
  );

  // ── Drag handlers ─────────────────────────────────────────────────────────

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (disabled) return;
    const hasInvalidType = Array.from(e.dataTransfer.items).some(
      (item) => item.kind === "file" && !config.accept.includes(item.type)
    );
    setDragState(hasInvalidType ? "reject" : "over");
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragState("idle");
    }
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragState("idle");
    if (disabled) return;
    const raw = Array.from(e.dataTransfer.files);
    if (raw.length) void processFiles(raw);
  };

  // ── Input handler ─────────────────────────────────────────────────────────

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = Array.from(e.target.files ?? []);
    if (raw.length) void processFiles(raw);
    // Reset input so the same file can be re-selected after removal
    e.target.value = "";
  };

  // ── Remove handler ────────────────────────────────────────────────────────

  const removeFile = (id: string) => {
    setInternalFiles((prev) => {
      const target = prev.find((f) => f.id === id);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      const updated = prev.filter((f) => f.id !== id);
      onChange?.(updated);
      return updated;
    });
  };

  // ── Styles ────────────────────────────────────────────────────────────────

  const zoneBase =
    "relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition-all duration-150 px-4 py-7 text-center select-none";
  const zoneVariant =
    disabled
      ? "cursor-not-allowed border-line bg-brand-cream/20 opacity-50"
      : dragState === "over"
      ? "cursor-copy border-brand-green bg-success-bg/30 ring-2 ring-brand-green/30"
      : dragState === "reject"
      ? "cursor-no-drop border-brand-red bg-red-50/60 ring-2 ring-brand-red/20"
      : "cursor-pointer border-line bg-brand-cream/40 hover:border-brand-green/60 hover:bg-success-bg/20";

  return (
    <div className={`space-y-3 ${className}`}>
      {/* ── Drop Zone ─────────────────────────────────────────────────────── */}
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={label ?? "File upload area. Click or drag files here."}
        aria-disabled={disabled}
        className={`${zoneBase} ${zoneVariant}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => {
          if (!disabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
      >
        <input
          ref={inputRef}
          type="file"
          className="sr-only"
          accept={config.accept}
          multiple={config.multiple}
          disabled={disabled}
          onChange={onInputChange}
          aria-hidden="true"
          tabIndex={-1}
        />

        {dragState === "reject" ? (
          <AlertCircle className="size-8 text-brand-red" />
        ) : (
          <Upload
            className={`size-8 transition-colors ${
              dragState === "over" ? "text-brand-green" : "text-muted"
            }`}
          />
        )}

        <div>
          <p className="text-sm font-semibold text-brand-charcoal">
            {dragState === "over"
              ? "Release to attach"
              : dragState === "reject"
              ? "File type not accepted"
              : (label ?? "Drag & drop files here, or click to browse")}
          </p>
          <p className="mt-0.5 text-xs text-muted">{config.hint}</p>
          {config.maxFiles > 1 && (
            <p className="text-[11px] text-muted">
              Up to {config.maxFiles} files at once
            </p>
          )}
        </div>
      </div>

      {/* ── Attached Files List ────────────────────────────────────────────── */}
      {files.length > 0 && (
        <ul className="space-y-2" aria-label="Attached files">
          {files.map((f) => (
            <AttachedFileRow key={f.id} entry={f} onRemove={removeFile} />
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Attached File Row ────────────────────────────────────────────────────────

interface AttachedFileRowProps {
  entry: AttachedFile;
  onRemove: (id: string) => void;
}

function AttachedFileRow({ entry, onRemove }: AttachedFileRowProps) {
  const isError = entry.status === "error";
  const isDone = entry.status === "done";
  const isUploading = entry.status === "uploading";

  return (
    <li
      className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition ${
        isError
          ? "border-red-200 bg-red-50"
          : isDone
          ? "border-line bg-white"
          : "border-brand-green/30 bg-success-bg/20"
      }`}
    >
      {/* Thumbnail or icon */}
      <span className="grid size-9 shrink-0 place-items-center overflow-hidden rounded-lg bg-brand-cream text-muted">
        {entry.previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={entry.previewUrl}
            alt=""
            className="size-9 object-cover"
            aria-hidden="true"
          />
        ) : isError ? (
          <AlertCircle className="size-4 text-brand-red" />
        ) : entry.file.type.startsWith("image/") ? (
          <ImageIcon className="size-4 text-brand-green" />
        ) : (
          <FileIcon className="size-4 text-brand-leaf" />
        )}
      </span>

      {/* Name + size / error */}
      <div className="min-w-0 flex-1">
        <p
          className={`truncate text-xs font-semibold ${
            isError ? "text-brand-red" : "text-brand-charcoal"
          }`}
          title={entry.file.name || "Unknown file"}
        >
          {isError && !entry.file.name
            ? "Upload error"
            : entry.file.name}
        </p>

        {isError ? (
          <p className="text-[11px] text-brand-red">{entry.errorMessage}</p>
        ) : (
          <p className="text-[11px] text-muted">
            {entry.file.size > 0
              ? `${formatBytes(entry.file.size)} · ${fileExtLabel(entry.file)}`
              : fileExtLabel(entry.file)}
          </p>
        )}

        {/* Progress bar */}
        {isUploading && (
          <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-brand-green/20">
            <div
              className="h-full rounded-full bg-brand-green transition-all duration-150"
              style={{ width: `${entry.progress}%` }}
              role="progressbar"
              aria-valuenow={entry.progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Uploading ${entry.file.name}: ${entry.progress}%`}
            />
          </div>
        )}
      </div>

      {/* Status icon or remove button */}
      <div className="flex shrink-0 items-center gap-1.5">
        {isUploading && (
          <Loader2 className="size-4 animate-spin text-brand-green" aria-hidden="true" />
        )}
        {isDone && (
          <CheckCircle2 className="size-4 text-brand-leaf" aria-label="Upload complete" />
        )}
        <button
          type="button"
          onClick={() => onRemove(entry.id)}
          aria-label={`Remove ${entry.file.name || "file"}`}
          className="grid size-6 place-items-center rounded-md text-muted transition hover:bg-brand-cream hover:text-brand-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
        >
          <X className="size-3.5" />
        </button>
      </div>
    </li>
  );
}

