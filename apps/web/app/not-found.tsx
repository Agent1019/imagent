import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl font-bold text-white/10 mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-3">Page not found</h1>
        <p className="text-gray-400 mb-8">
          The page or resource you are looking for does not exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-gray-200 transition"
          >
            Go Home
          </Link>
          <Link
            href="/explore"
            className="px-5 py-2.5 rounded-lg border border-white/15 text-white text-sm font-medium hover:border-white/30 hover:bg-white/5 transition"
          >
            Explore Tools
          </Link>
        </div>
      </div>
    </div>
  );
}
