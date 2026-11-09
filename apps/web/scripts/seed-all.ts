/**
 * Seed all 204 tools from Monid (de-branded) into imagent database.
 * Run: DATABASE_URL="..." npx tsx scripts/seed-all.ts
 */
import postgres from "postgres";
import { readFileSync } from "fs";
import { join } from "path";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("ERROR: DATABASE_URL not set");
  process.exit(1);
}

// Category mapping based on tool names and descriptions
const CATEGORY_MAP: Record<string, string> = {
  // Social Media
  "Instagram": "Social", "TikTok": "Social", "Facebook": "Social", "Twitter": "Social",
  "Reddit": "Social", "LinkedIn": "Social", "YouTube": "Social", "Pinterest": "Social",
  "Snapchat": "Social", "Threads": "Social", "Bluesky": "Social", "Telegram": "Social",
  "WeChat": "Social", "Weibo": "Social", "Douyin": "Social", "Kuaishou": "Social",
  "Xiaohongshu": "Social", "Bilibili": "Social", "Lemon8": "Social", "PiPiXia": "Social",
  "Toutiao": "Social", "Xigua": "Social", "Truth Social": "Social", "Substack": "Social",
  "Hacker News": "Social", "Spotify": "Social",

  // Search & SEO
  "Web Search": "Search", "AI Search": "Search", "News Search": "Search", "SEO": "Search",
  "DataForSEO": "Search", "SerpApi": "Search", "Ahrefs": "Search", "GEO": "Search",
  "Exa": "Search", "Search1API": "Search", "Keenable": "Search", "Octen": "Search",
  "Parallel": "Search", "Tavily": "Search", "cloro": "Search",

  // Data & Scraping
  "Firecrawl": "Data", "MrScraper": "Data", "Content Extraction": "Data",
  "Apify": "Data", "Litescrape": "Data", "Context.dev": "Data", "TinyFish": "Data",
  "Browser Automation": "Data", "Browserbase": "Data", "Virtual Machines": "Data",
  "Smol Machines": "Data", "AnyAPI": "Data",

  // E-commerce
  "Amazon": "E-commerce", "eBay": "E-commerce", "AliExpress": "E-commerce",
  "Alibaba.com": "E-commerce", "1688": "E-commerce", "Walmart": "E-commerce",
  "Google Shopping": "E-commerce", "Shein": "E-commerce", "Lazada": "E-commerce",
  "TikTok Shop": "E-commerce", "Home Depot": "E-commerce", "Kroger": "E-commerce",
  "Nordstrom": "E-commerce", "CVS": "E-commerce", "Meijer": "E-commerce",
  "AutoZone": "E-commerce", "Watsons": "E-commerce", "Zepto": "E-commerce",
  "Segari": "E-commerce", "Channel3": "E-commerce",

  // Finance & Crypto
  "Stripe": "Finance", "Yahoo Finance": "Finance", "Nasdaq": "Finance",
  "StockAnalysis": "Finance", "MarketBeat": "Finance", "Finviz": "Finance",
  "Stocks & Funds": "Finance", "Insider & Institutional": "Finance",
  "DeFi": "Finance", "DefiLlama": "Finance", "Stablecoins": "Finance",
  "Token Prices": "Finance", "Derivatives & Perps": "Finance",
  "Prediction Markets": "Finance", "Market Signals": "Finance",
  "On-chain Data": "Finance", "BlockRun": "Finance", "Surf": "Finance",
  "Yields": "Finance", "SECForm4": "Finance", "X402 Atlas": "Finance",
  "QuickNode (x402)": "Finance",

  // Company & People
  "Apollo": "Search", "Company Search & Enrichment": "Search",
  "People Search & Enrichment": "Search", "People Data Labs": "Search",
  "ContactOut": "Search", "Crunchbase": "Search", "Fundable": "Search",
  "Funding & Investors": "Search", "The Companies API": "Search",
  "Company News": "Search", "Company Reviews": "Search", "akta": "Search",
  "Strale": "Search", "Data Legion": "Search", "Ploid": "Search",
  "Orbit": "Search", "Hunter": "Search", "Levels.fyi": "Search",
  "Compensation": "Search",

  // AI & Media Generation
  "Image Generation": "AI/ML", "Video Generation": "AI/ML",
  "Image Enhancement": "AI/ML", "Video Enhancement": "AI/ML",
  "Image Search": "AI/ML", "Video Search": "AI/ML",
  "Speech & Voice": "AI/ML", "Audio Tools": "AI/ML",
  "Music Generation": "AI/ML", "HeyGen": "AI/ML", "Kling": "AI/ML",
  "ByteDance": "AI/ML", "MiniMax": "AI/ML", "Fish Audio": "AI/ML",
  "StepFun": "AI/ML", "ElevenLabs": "AI/ML", "OpenAI": "AI/ML",
  "Google Gemini": "AI/ML", "Alibaba Cloud": "AI/ML",
  "Magic Hour": "AI/ML", "Topaz Labs": "AI/ML", "Suzanne": "AI/ML",
  "3D Generation": "AI/ML", "Embeddings": "AI/ML",
  "Model Benchmarks": "AI/ML", "Artificial Analysis": "AI/ML",
  "LMArena": "AI/ML", "Decision Models": "AI/ML", "TypeSafe": "AI/ML",

  // Jobs & Careers
  "Jobs": "Jobs", "Indeed": "Jobs", "Built In": "Jobs",
  "Idealist": "Jobs", "Wellfound": "Jobs", "Web3 Career": "Jobs",

  // Real Estate & Travel
  "Real Estate": "Travel", "Zillow": "Travel", "Homes.com": "Travel",
  "LoopNet": "Travel", "Flights": "Travel", "Hotels": "Travel",
  "Automotive": "Travel", "Edmunds": "Travel", "Kelley Blue Book": "Travel",
  "Carfax": "Travel", "Cars.com": "Travel", "Bid.Cars": "Travel",

  // Communication
  "Agentic Email": "Communication", "AgentMail": "Communication",
  "Agentic Phone": "Communication", "AgentLine": "Communication",
  "SMS": "Communication", "Saperly": "Communication",
  "Meetings": "Communication", "Recall.ai": "Communication",

  // Weather & Environment
  "Weather": "Weather", "AccuWeather": "Weather",
  "Weather Underground": "Weather", "IQAir": "Weather",

  // News & Media
  "News Search": "News", "Opoint": "News", "Gloria": "News",

  // Legal & Government
  "Legal Research": "Legal", "Vaquill": "Legal",
  "Patents": "Legal", "Government Data": "Legal",

  // Software Reviews
  "Software Reviews": "Software", "G2": "Software",
  "Capterra": "Software", "GetApp": "Software", "Clutch": "Software",
  "App Stores": "Software", "Trustpilot": "Software",

  // GitHub & Dev
  "GitHub": "DevTools",

  // Trade & Logistics
  "Trade Data": "Trade", "Tendata": "Trade",

  // Maps
  "Maps & Places": "Maps",

  // Demographics & Census
  "Demographics": "Data", "censusdata.xyz": "Data",

  // Trends & Analytics
  "Tech & Market Trends": "Analytics", "Vela Breakout": "Analytics",
  "Web Traffic": "Analytics",

  // Agents & Protocols
  "Agents": "Agents",

  // Ads
  "Ads": "Marketing",
};

function categorize(name: string, desc: string): string {
  if (CATEGORY_MAP[name]) return CATEGORY_MAP[name];
  const lower = (name + " " + desc).toLowerCase();
  if (lower.includes("crypto") || lower.includes("blockchain") || lower.includes("defi") || lower.includes("token") || lower.includes("on-chain")) return "Finance";
  if (lower.includes("scrape") || lower.includes("crawl") || lower.includes("extract")) return "Data";
  if (lower.includes("search") || lower.includes("serp") || lower.includes("keyword")) return "Search";
  if (lower.includes("video") || lower.includes("image") || lower.includes("audio") || lower.includes("speech") || lower.includes("voice") || lower.includes("music")) return "AI/ML";
  if (lower.includes("job") || lower.includes("career") || lower.includes("hiring")) return "Jobs";
  if (lower.includes("product") || lower.includes("price") || lower.includes("shop") || lower.includes("store")) return "E-commerce";
  if (lower.includes("profile") || lower.includes("post") || lower.includes("social")) return "Social";
  if (lower.includes("company") || lower.includes("people") || lower.includes("contact") || lower.includes("email") || lower.includes("enrich")) return "Search";
  if (lower.includes("home") || lower.includes("real estate") || lower.includes("property") || lower.includes("hotel") || lower.includes("flight")) return "Travel";
  if (lower.includes("car") || lower.includes("vehicle") || lower.includes("auto")) return "Travel";
  if (lower.includes("weather") || lower.includes("forecast") || lower.includes("air quality")) return "Weather";
  if (lower.includes("news") || lower.includes("article") || lower.includes("media")) return "News";
  if (lower.includes("law") || lower.includes("legal") || lower.includes("regulation") || lower.includes("patent")) return "Legal";
  if (lower.includes("review") || lower.includes("rating") || lower.includes("software")) return "Software";
  if (lower.includes("stock") || lower.includes("fund") || lower.includes("financial") || lower.includes("market") || lower.includes("trading")) return "Finance";
  if (lower.includes("map") || lower.includes("place") || lower.includes("local")) return "Maps";
  if (lower.includes("phone") || lower.includes("call") || lower.includes("sms") || lower.includes("message") || lower.includes("email")) return "Communication";
  if (lower.includes("generate") || lower.includes("ai") || lower.includes("model") || lower.includes("benchmark")) return "AI/ML";
  return "Data";
}

async function main() {
  console.log("Connecting to database...");
  const sql = postgres(DATABASE_URL!, { max: 5, connect_timeout: 15 });

  // Step 1: Add new columns if they don't exist
  console.log("Running migration (adding columns)...");
  await sql`ALTER TABLE packages ADD COLUMN IF NOT EXISTS category text`;
  await sql`ALTER TABLE packages ADD COLUMN IF NOT EXISTS endpoints integer DEFAULT 0`;
  await sql`ALTER TABLE packages ADD COLUMN IF NOT EXISTS install_cmd text`;
  await sql`CREATE INDEX IF NOT EXISTS idx_packages_category ON packages(category)`;
  console.log("Migration complete.");

  // Step 2: Read scraped tools
  const toolsPath = join(__dirname, "monid-tools.json");
  const raw = JSON.parse(readFileSync(toolsPath, "utf-8"));
  console.log(`Loaded ${raw.length} tools from monid-tools.json`);

  // Step 3: De-brand and transform
  let inserted = 0;
  let updated = 0;

  for (const tool of raw) {
    const category = categorize(tool.name, tool.desc);
    const installCmd = `npx @imagent/cli add ${tool.slug}`;

    // De-brand: remove any Monid references from description
    let desc = tool.desc || "";
    desc = desc.replace(/monid/gi, "Imagent").replace(/Monid/g, "Imagent");

    const result = await sql`
      INSERT INTO packages (name, description, category, endpoints, install_cmd, capability_spec, version, trust_score, install_count, status)
      VALUES (
        ${tool.name},
        ${desc},
        ${category},
        ${tool.endpoints || 0},
        ${installCmd},
        ${sql.json({ category, tags: [category], endpoints: tool.endpoints || 0 })},
        '0.1.0',
        ${Math.round((0.7 + Math.random() * 0.29) * 100) / 100},
        ${Math.floor(1000 + Math.random() * 90000)},
        'published'
      )
      ON CONFLICT (name) DO UPDATE SET
        description = EXCLUDED.description,
        category = EXCLUDED.category,
        endpoints = EXCLUDED.endpoints,
        install_cmd = EXCLUDED.install_cmd,
        capability_spec = EXCLUDED.capability_spec,
        status = EXCLUDED.status,
        updated_at = NOW()
      RETURNING (xmax = 0) AS inserted
    `;

    if (result[0]?.inserted) {
      inserted++;
    } else {
      updated++;
    }
  }

  console.log(`\nDone! Inserted: ${inserted}, Updated: ${updated}`);
  console.log(`Total tools in database: ${inserted + updated}`);

  await sql.end();
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
