"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl font-bold text-white/10 mb-4">500</div>
          <h1 className="text-2xl font-bold text-white mb-3">Something went wrong</h1>
          <p className="text-gray-400 mb-8">
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-gray-200 transition"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
