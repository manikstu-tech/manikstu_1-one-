/**
 * Manikstu Agro · File Utilities
 * ─────────────────────────────────────────────────────────────────────────────
 * Shared helpers for file validation, formatting, and MIME-type management.
 * All upload touch-points (UploadDocumentModal, FileDropzone, project forms)
 * import from here so limits and labels stay in one place.
 *
 * IMPORTANT: This is a frontend-only prototype.  No bytes are transferred to a
 * server.  The helpers simulate the processing that a real backend pipeline
 * (e.g. AWS S3 pre-signed upload) would perform, so that every UI state
 * (validation error, progress, preview, success) is exercisable in the browser.
 */

// ─── Allowed MIME types ───────────────────────────────────────────────────────

export const ALLOWED_MIME_TYPES = [
  // Images
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  // Documents
  "application/pdf",
  // Spreadsheets (govt lists / import)
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv",
] as const;

export type AllowedMime = (typeof ALLOWED_MIME_TYPES)[number];

/** Human-readable extension list shown inside dropzones */
export const ALLOWED_EXT_LABEL = "JPG, PNG, WEBP, HEIC, PDF, XLS, XLSX, CSV";

// ─── File size limits ─────────────────────────────────────────────────────────

/** Maximum file size in bytes (20 MB) */
export const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024;

/** Displayed upper limit label */
export const MAX_FILE_SIZE_LABEL = "20 MB";

// ─── Per-drop configuration presets ──────────────────────────────────────────

export interface DropzoneConfig {
  /** accept attribute value for <input type="file"> */
  accept: string;
  /** Human-readable label displayed under the icon */
  hint: string;
  /** Maximum bytes per individual file */
  maxBytes: number;
  /** Maximum number of files in a single drop / selection */
  maxFiles: number;
  /** Whether multiple files may be selected at once */
  multiple: boolean;
}

const IMG_ACCEPT = "image/jpeg,image/png,image/webp,image/heic,image/heif";
const DOC_ACCEPT = `${IMG_ACCEPT},application/pdf`;
const SHEET_ACCEPT = `text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`;

export const DROPZONE_PRESETS = {
  /** Site photos, geotagged construction evidence */
  sitePhoto: {
    accept: IMG_ACCEPT,
    hint: "JPG, PNG, WEBP or HEIC · max 20 MB each",
    maxBytes: MAX_FILE_SIZE_BYTES,
    maxFiles: 10,
    multiple: true,
  } satisfies DropzoneConfig,

  /** KYC documents, bank slips, signed consent forms, work orders */
  document: {
    accept: DOC_ACCEPT,
    hint: "JPG, PNG, PDF · max 20 MB",
    maxBytes: MAX_FILE_SIZE_BYTES,
    maxFiles: 5,
    multiple: true,
  } satisfies DropzoneConfig,

  /** Single PDF only – sanction letters, project approval orders */
  singlePdf: {
    accept: "application/pdf",
    hint: "PDF only · max 20 MB",
    maxBytes: MAX_FILE_SIZE_BYTES,
    maxFiles: 1,
    multiple: false,
  } satisfies DropzoneConfig,

  /** Government beneficiary import lists */
  govtList: {
    accept: SHEET_ACCEPT,
    hint: "CSV, XLS or XLSX · max 20 MB",
    maxBytes: MAX_FILE_SIZE_BYTES,
    maxFiles: 1,
    multiple: false,
  } satisfies DropzoneConfig,
} as const;

// ─── Validation ───────────────────────────────────────────────────────────────

export interface FileValidationError {
  file: string;
  reason: string;
}

export interface ValidationResult {
  valid: File[];
  errors: FileValidationError[];
}

/**
 * Validates a FileList / File[] against the given config.
 * Returns both the accepted files and a list of per-file rejection reasons.
 */
export function validateFiles(
  files: File[],
  config: DropzoneConfig
): ValidationResult {
  const acceptedMimes = config.accept
    .split(",")
    .map((s) => s.trim().toLowerCase());

  const valid: File[] = [];
  const errors: FileValidationError[] = [];

  for (const file of files) {
    if (!acceptedMimes.includes(file.type.toLowerCase())) {
      errors.push({
        file: file.name,
        reason: `File type "${file.type || "unknown"}" is not allowed. Accepted: ${config.hint}`,
      });
      continue;
    }
    if (file.size > config.maxBytes) {
      errors.push({
        file: file.name,
        reason: `File is ${formatBytes(file.size)} — exceeds the ${formatBytes(config.maxBytes)} limit.`,
      });
      continue;
    }
    valid.push(file);
  }

  // Truncate valid list to maxFiles (remaining go to errors)
  if (valid.length > config.maxFiles) {
    const excess = valid.splice(config.maxFiles);
    for (const f of excess) {
      errors.push({
        file: f.name,
        reason: `Only ${config.maxFiles} file${config.maxFiles === 1 ? "" : "s"} may be uploaded at once.`,
      });
    }
  }

  return { valid, errors };
}

// ─── Formatting helpers ───────────────────────────────────────────────────────

/** Converts bytes to a human-readable string: "1.4 MB", "820 KB", "512 B" */
export function formatBytes(bytes: number): string {
  if (bytes >= 1_048_576) return `${(bytes / 1_048_576).toFixed(1)} MB`;
  if (bytes >= 1_024) return `${Math.round(bytes / 1_024)} KB`;
  return `${bytes} B`;
}

/** Returns the uppercase extension label for a file: "PDF", "JPG", "XLSX", … */
export function fileExtLabel(file: File): string {
  const parts = file.name.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : "FILE";
}

/** Whether a File is an image type that can be previewed with URL.createObjectURL */
export function isImageFile(file: File): boolean {
  return file.type.startsWith("image/");
}

/** Strips the extension and replaces underscores/dashes with spaces for a readable name */
export function prettifyFileName(name: string): string {
  return name.replace(/\.[^.]+$/, "").replace(/[_-]/g, " ");
}

// ─── Simulated upload ─────────────────────────────────────────────────────────

export interface UploadProgressEvent {
  pct: number; // 0–100
  done: boolean;
}

/**
 * Simulates a chunked upload to give the UI a realistic progress bar.
 * Replace the body with a real XHR / fetch + ReadableStream in production.
 *
 * @param file      File object being uploaded
 * @param onProgress  Callback called every ~100 ms
 * @returns  A promise that resolves when the "upload" is complete
 */
export async function simulateUpload(
  file: File,
  onProgress: (evt: UploadProgressEvent) => void
): Promise<void> {
  // Duration scales with file size: 400 ms base + 1 ms / 10 KB
  const durationMs = Math.min(400 + file.size / 10_240, 3_500);
  const steps = 20;
  const delay = durationMs / steps;

  for (let i = 1; i <= steps; i++) {
    await new Promise<void>((resolve) => setTimeout(resolve, delay));
    onProgress({ pct: Math.round((i / steps) * 100), done: i === steps });
  }
}

// ─── Attached file record ─────────────────────────────────────────────────────

/** Represents a file attached to a form after passing validation + (mock) upload */
export interface AttachedFile {
  /** Unique key for React list rendering */
  id: string;
  /** Original browser File object */
  file: File;
  /** Data-URL for image previews (null for non-images) */
  previewUrl: string | null;
  /** Upload progress 0–100 */
  progress: number;
  /** Upload lifecycle state */
  status: "pending" | "uploading" | "done" | "error";
  /** Error message if status === "error" */
  errorMessage?: string;
}

/** Creates an initial AttachedFile record (before upload starts) */
export function createAttachedFile(file: File): AttachedFile {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    file,
    previewUrl: null, // filled in by the component after createObjectURL
    progress: 0,
    status: "pending",
  };
}

// ─── Client-side Export & Download Helpers ─────────────────────────────────────

/**
 * Triggers a real browser file download using a generated Blob.
 */
export function downloadBlob(blob: Blob, fileName: string): void {
  if (typeof window === "undefined") return;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export interface CsvColumn<T> {
  header: string;
  key: keyof T | ((row: T) => string | number | boolean | null | undefined);
}

/**
 * Exports tabular data as a clean CSV file with UTF-8 BOM encoding.
 * Ensures proper display of Indian rupee symbols and UTF-8 characters in Excel.
 */
export function exportTableToCsv<T>(
  fileName: string,
  columns: CsvColumn<T>[],
  data: T[]
): void {
  const headerLine = columns
    .map((c) => `"${String(c.header).replace(/"/g, '""')}"`)
    .join(",");

  const rows = data.map((row) =>
    columns
      .map((col) => {
        const val =
          typeof col.key === "function" ? col.key(row) : row[col.key];
        const str = val === null || val === undefined ? "" : String(val);
        return `"${str.replace(/"/g, '""')}"`;
      })
      .join(",")
  );

  // Prepend UTF-8 Byte Order Mark (\uFEFF) for Microsoft Excel compatibility
  const csvContent = "\uFEFF" + [headerLine, ...rows].join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  downloadBlob(blob, fileName.endsWith(".csv") ? fileName : `${fileName}.csv`);
}

/**
 * Triggers a sample document file download with standard formatted content.
 */
export function downloadSampleDocument(
  fileName: string,
  content: string = "Manikstu Agro Operations Evidence Document\n\nGenerated for Project AJAH Operations."
): void {
  const isPdf = fileName.toLowerCase().endsWith(".pdf");
  const mimeType = isPdf ? "application/pdf" : "text/plain;charset=utf-8";
  const blob = new Blob([content], { type: mimeType });
  downloadBlob(blob, fileName);
}


