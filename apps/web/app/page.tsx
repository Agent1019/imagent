export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-5xl font-bold tracking-tight">
          imagent
        </h1>
        <p className="text-xl text-gray-400">
          The package registry for AI agents.
          <br />
          Discover, install, and publish tools autonomously.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <a
            href="/explore"
            className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition"
          >
            Explore Packages
          </a>
          <a
            href="/publish"
            className="px-6 py-3 border border-gray-600 rounded-lg font-medium hover:border-gray-400 transition"
          >
            Publish a Tool
          </a>
        </div>
      </div>
    </main>
  );
}
