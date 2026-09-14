import {
  ImagePlus,
  X,
} from "lucide-react";

import {
  ChangeEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface GalleryImageUploaderProps {
  files: File[];

  onChange: (
    files: File[]
  ) => void;

  disabled?: boolean;
}

const MAX_FILES = 10;

const MAX_FILE_SIZE =
  8 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

const GalleryImageUploader = ({
  files,
  onChange,
  disabled = false,
}: GalleryImageUploaderProps) => {
  const inputRef =
    useRef<HTMLInputElement | null>(
      null
    );

  const [
    error,
    setError,
  ] = useState("");

  /* =========================================
     IMAGE PREVIEWS
  ========================================= */

  const previews =
    useMemo(
      () =>
        files.map(
          (file) =>
            URL.createObjectURL(
              file
            )
        ),
      [files]
    );

  /* =========================================
     CLEAN PREVIEW URLS
  ========================================= */

  useEffect(() => {
    return () => {
      previews.forEach(
        (url) => {
          URL.revokeObjectURL(
            url
          );
        }
      );
    };
  }, [previews]);

  /* =========================================
     SELECT FILES
  ========================================= */

  const handleFileChange = (
    event:
      ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles =
      Array.from(
        event.target.files ||
          []
      );

    setError("");

    if (
      selectedFiles.length ===
      0
    ) {
      return;
    }

    const combinedFiles = [
      ...files,
      ...selectedFiles,
    ];

    /* =========================================
       FILE COUNT VALIDATION
    ========================================= */

    if (
      combinedFiles.length >
      MAX_FILES
    ) {
      setError(
        `You can upload a maximum of ${MAX_FILES} images at once.`
      );

      event.target.value =
        "";

      return;
    }

    /* =========================================
       FILE TYPE VALIDATION
    ========================================= */

    const invalidType =
      selectedFiles.find(
        (file) =>
          !ALLOWED_TYPES.includes(
            file.type
          )
      );

    if (invalidType) {
      setError(
        "Only JPG, PNG, WEBP and AVIF images are allowed."
      );

      event.target.value =
        "";

      return;
    }

    /* =========================================
       FILE SIZE VALIDATION
    ========================================= */

    const oversizedFile =
      selectedFiles.find(
        (file) =>
          file.size >
          MAX_FILE_SIZE
      );

    if (oversizedFile) {
      setError(
        "Each image must be 8 MB or smaller."
      );

      event.target.value =
        "";

      return;
    }

    /* =========================================
       REMOVE DUPLICATES
    ========================================= */

    const uniqueFiles =
      combinedFiles.filter(
        (
          file,
          index,
          currentFiles
        ) =>
          index ===
          currentFiles.findIndex(
            (currentFile) =>
              currentFile.name ===
                file.name &&
              currentFile.size ===
                file.size &&
              currentFile.lastModified ===
                file.lastModified
          )
      );

    onChange(
      uniqueFiles
    );

    event.target.value = "";
  };

  /* =========================================
     REMOVE FILE
  ========================================= */

  const removeFile = (
    indexToRemove: number
  ) => {
    const updatedFiles =
      files.filter(
        (
          _,
          index
        ) =>
          index !==
          indexToRemove
      );

    onChange(
      updatedFiles
    );

    setError("");
  };

  /* =========================================
     CLEAR ALL
  ========================================= */

  const clearAll = () => {
    onChange([]);

    setError("");

    if (
      inputRef.current
    ) {
      inputRef.current.value =
        "";
    }
  };

  return (
    <div>
      {/* Header */}

      <div className="mb-2 flex items-center justify-between gap-3">
        <label className="block text-sm font-semibold text-[#06364a]">
          Gallery Images
        </label>

        {files.length > 0 && (
          <button
            type="button"
            disabled={
              disabled
            }
            onClick={
              clearAll
            }
            className="text-xs font-semibold text-red-500 transition hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Hidden Input */}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        multiple
        disabled={
          disabled
        }
        onChange={
          handleFileChange
        }
        className="hidden"
      />

      {/* Upload Box */}

      <button
        type="button"
        disabled={
          disabled ||
          files.length >=
            MAX_FILES
        }
        onClick={() =>
          inputRef.current?.click()
        }
        className="flex min-h-[130px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#cddde3] bg-[#f8fbfc] px-6 py-5 text-center transition hover:border-[#4c92aa] hover:bg-[#f2f9fb] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ImagePlus
          size={30}
          className="text-[#4c92aa]"
        />

        <span className="mt-3 text-sm font-semibold text-[#06364a]">
          {files.length === 0
            ? "Choose Images"
            : "Add More Images"}
        </span>

        <span className="mt-1 text-xs text-slate-500">
          Select one or multiple
          images from your device
        </span>

        <span className="mt-1 text-xs text-slate-400">
          JPG, PNG, WEBP or AVIF
          · Max 8 MB each · Up to
          10 images
        </span>

        {files.length > 0 && (
          <span className="mt-2 rounded-full bg-[#e9f6fb] px-3 py-1 text-xs font-semibold text-[#176b87]">
            {files.length}{" "}
            {files.length === 1
              ? "image"
              : "images"}{" "}
            selected
          </span>
        )}
      </button>

      {/* Validation Error */}

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}

      {/* Image Previews */}

      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {files.map(
            (
              file,
              index
            ) => (
              <div
                key={`${file.name}-${file.lastModified}`}
                className="group relative overflow-hidden rounded-xl border border-[#e1eaee] bg-white"
              >
                {/* Preview */}

                <div className="aspect-square overflow-hidden bg-slate-100">
                  <img
                    src={
                      previews[
                        index
                      ]
                    }
                    alt={
                      file.name
                    }
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Remove */}

                <button
                  type="button"
                  disabled={
                    disabled
                  }
                  onClick={() =>
                    removeFile(
                      index
                    )
                  }
                  aria-label={`Remove ${file.name}`}
                  className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/75 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <X
                    size={15}
                  />
                </button>

                {/* File Info */}

                <div className="p-2">
                  <p
                    className="truncate text-xs font-medium text-[#06364a]"
                    title={
                      file.name
                    }
                  >
                    {file.name}
                  </p>

                  <p className="mt-1 text-[11px] text-slate-400">
                    {(
                      file.size /
                      1024 /
                      1024
                    ).toFixed(
                      2
                    )}{" "}
                    MB
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default GalleryImageUploader;