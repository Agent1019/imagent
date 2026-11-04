export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="/" className="text-xl font-bold tracking-tight">
              imagent
            </a>
            <div className="hidden md:flex items-center gap-6 text-sm text-gray-400">
              <a href="/explore" className="hover:text-white transition">Explore</a>
              <a href="/docs" className="hover:text-white transition">Docs</a>
              <a href="/pricing" className="hover:text-white transition">Pricing</a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/login" className="text-sm text-gray-400 hover:text-white transition px-3 py-1.5">
              Sign in
            </a>
            <a
              href="/signup"
              className="text-sm bg-white text-black px-4 py-1.5 rounded-lg font-medium hover:bg-gray-200 transition"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-gray-400 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Now supporting MCP, A2A, and Function Calling protocols
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
            The infrastructure layer
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">
              for AI agents
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Discover MCP servers. Authenticate tool calls. Monetize usage.
            <br className="hidden md:block" />
            One platform for the entire agent tool ecosystem.
          </p>

          {/* Search Bar */}
          <div className="mt-10 max-w-xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/20 via-rose-500/20 to-purple-500/20 blur-xl opacity-0 group-focus-within:opacity-100 transition" />
              <div className="relative flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden focus-within:border-white/25 transition">
                <svg className="w-5 h-5 ml-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search 10,000+ MCP servers..."
                  className="w-full px-4 py-4 bg-transparent text-white placeholder-gray-500 outline-none text-sm"
                />
                <kbd className="hidden md:flex items-center gap-1 mr-4 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-gray-500">
                  ⌘K
                </kbd>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/explore"
              className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition text-sm"
            >
              Explore MCP Servers
            </a>
            <a
              href="/publish"
              className="px-6 py-3 border border-white/15 rounded-lg font-medium hover:border-white/30 hover:bg-white/5 transition text-sm"
            >
              Publish Your Server
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 border-y border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "10,000+", label: "MCP Servers" },
            { value: "50M+", label: "API Calls / Month" },
            { value: "2,400+", label: "Tool Publishers" },
            { value: "99.9%", label: "Uptime SLA" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Everything agents need, in one place
            </h2>
            <p className="mt-4 text-gray-400 max-w-xl mx-auto">
              From discovery to payment — a complete infrastructure for the agent-native economy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Discovery */}
            <div className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-8 hover:border-white/10 hover:bg-white/[0.04] transition">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Discover</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Semantic search across thousands of MCP servers. Agents find the right tools by capability, not by name. Filter by protocol, trust score, and latency.
              </p>
              <div className="mt-6 p-4 rounded-lg bg-black/40 border border-white/5">
                <code className="text-xs text-gray-300">
                  <span className="text-purple-400">GET</span> /api/v1/search
                  <br />
                  <span className="text-gray-500">?q=pdf+generation&protocol=mcp</span>
                </code>
              </div>
            </div>

            {/* Auth */}
            <div className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-8 hover:border-white/10 hover:bg-white/[0.04] transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Authenticate</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                OAuth 2.0 built for agent-to-tool interactions. Agents authenticate autonomously — no human in the loop. Scoped permissions, token rotation, and audit logs.
              </p>
              <div className="mt-6 p-4 rounded-lg bg-black/40 border border-white/5">
                <code className="text-xs text-gray-300">
                  <span className="text-emerald-400">Authorization</span>: Bearer
                  <br />
                  <span className="text-gray-500">imt_a1b2c3d4...x9y0z</span>
                </code>
              </div>
            </div>

            {/* Payment */}
            <div className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-8 hover:border-white/10 hover:bg-white/[0.04] transition">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Monetize</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Usage-based billing for every tool call. Publishers earn from their MCP servers. Agents pay per invocation with automatic metering and invoicing.
              </p>
              <div className="mt-6 p-4 rounded-lg bg-black/40 border border-white/5">
                <code className="text-xs text-gray-300">
                  <span className="text-amber-400">POST</span> /api/v1/billing/meter
                  <br />
                  <span className="text-gray-500">{"{ \"calls\": 1, \"cost\": \"$0.001\" }"}</span>
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">How it works</h2>
            <p className="mt-4 text-gray-400">Three steps from zero to production</p>
          </div>

          <div className="space-y-12">
            {[
              {
                step: "01",
                title: "Register your MCP server",
                desc: "Publish your server with a structured capability manifest. Imagent auto-generates documentation, validates your schema, and makes it discoverable.",
                color: "text-orange-400",
              },
              {
                step: "02",
                title: "Agents discover and authenticate",
                desc: "Agents search by capability, evaluate trust scores, and authenticate via OAuth — all without human intervention. You define the permission scopes.",
                color: "text-emerald-400",
              },
              {
                step: "03",
                title: "Get paid for every call",
                desc: "Set your pricing model — per-call, tiered, or freemium. Imagent meters usage, handles billing, and deposits earnings to your account.",
                color: "text-purple-400",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 md:gap-10 items-start">
                <div className={`text-4xl md:text-5xl font-bold ${item.color} font-mono shrink-0`}>
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Agent-native APIs,
                <br />
                <span className="text-gray-500">not human-native ones</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Every endpoint is designed for machine consumption. Structured responses, semantic errors, and built-in rate limiting. Your agent reads the spec, not a README.
              </p>
              <div className="space-y-3">
                {[
                  "Capability-based search with vector embeddings",
                  "OAuth 2.0 + agent identity tokens (AIT)",
                  "Automatic protocol adaptation (MCP ↔ A2A ↔ Function Calling)",
                  "Real-time usage metering and webhooks",
                ].map((feature) => (
                  <div key={feature} className="flex items-start gap-3 text-sm text-gray-300">
                    <svg className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="text-xs text-gray-500 ml-2">agent.ts</span>
              </div>
              <pre className="p-5 text-xs leading-relaxed overflow-x-auto">
                <code className="text-gray-300">{`import { ImagentClient } from "@imagent/sdk";

const client = new ImagentClient({
  apiKey: process.env.IMAGENT_KEY,
});

// 1. Discover tools by capability
const tools = await client.search({
  capability: "generate PDF from markdown",
  protocol: "mcp",
  minTrustScore: 0.8,
});

// 2. Authenticate and invoke
const result = await client.invoke({
  server: tools[0].id,
  method: "generate_pdf",
  params: { content: markdownBody },
  auth: { scope: "read:templates" },
});

// 3. Usage is metered automatically
console.log(result.usage);
// { calls: 1, cost: "$0.002", latency: "142ms" }`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Protocol Support */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-500 mb-6">Protocol-agnostic infrastructure</p>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-40">
            {["MCP", "A2A", "OpenAI", "Anthropic", "LangChain", "CrewAI"].map((name) => (
              <span key={name} className="text-lg font-semibold text-gray-400 tracking-wide">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Build the next agent economy
          </h2>
          <p className="text-gray-400 mb-8">
            Join thousands of publishers and agents building on imagent.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/signup"
              className="px-8 py-3.5 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition text-sm"
            >
              Start Building — Free
            </a>
            <a
              href="/docs"
              className="px-8 py-3.5 border border-white/15 rounded-lg font-medium hover:border-white/30 hover:bg-white/5 transition text-sm"
            >
              Read the Docs
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-lg font-bold mb-4">imagent</div>
              <p className="text-xs text-gray-500 leading-relaxed">
                The infrastructure layer for AI agents. Discover, authenticate, and monetize.
              </p>
            </div>
            <div>
              <div className="text-sm font-semibold mb-3 text-gray-300">Product</div>
              <div className="space-y-2 text-sm text-gray-500">
                <a href="/explore" className="block hover:text-white transition">Explore</a>
                <a href="/pricing" className="block hover:text-white transition">Pricing</a>
                <a href="/changelog" className="block hover:text-white transition">Changelog</a>
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold mb-3 text-gray-300">Developers</div>
              <div className="space-y-2 text-sm text-gray-500">
                <a href="/docs" className="block hover:text-white transition">Documentation</a>
                <a href="/api" className="block hover:text-white transition">API Reference</a>
                <a href="/status" className="block hover:text-white transition">Status</a>
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold mb-3 text-gray-300">Company</div>
              <div className="space-y-2 text-sm text-gray-500">
                <a href="/about" className="block hover:text-white transition">About</a>
                <a href="/blog" className="block hover:text-white transition">Blog</a>
                <a href="/careers" className="block hover:text-white transition">Careers</a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
            <span>&copy; 2026 imagent. All rights reserved.</span>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="/privacy" className="hover:text-white transition">Privacy</a>
              <a href="/terms" className="hover:text-white transition">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
