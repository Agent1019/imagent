/**
 * Update logo_url for all packages using Google Favicon Service.
 * Run: DATABASE_URL="..." npx tsx scripts/update-logos.ts
 */
import postgres from "postgres";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("ERROR: DATABASE_URL not set");
  process.exit(1);
}

// Domain mapping: tool name → primary domain
const DOMAIN_MAP: Record<string, string> = {
  // Well-known brands
  "HeyGen": "heygen.com",
  "1688": "1688.com",
  "Ahrefs": "ahrefs.com",
  "Alibaba Cloud": "alibabacloud.com",
  "Alibaba.com": "alibaba.com",
  "AliExpress": "aliexpress.com",
  "Amazon": "amazon.com",
  "Apify": "apify.com",
  "Apollo": "apollo.io",
  "AutoZone": "autozone.com",
  "Bilibili": "bilibili.com",
  "Bluesky": "bsky.app",
  "Browserbase": "browserbase.com",
  "Carfax": "carfax.com",
  "Cars.com": "cars.com",
  "ContactOut": "contactout.com",
  "Crunchbase": "crunchbase.com",
  "CVS": "cvs.com",
  "DefiLlama": "defillama.com",
  "Douyin": "douyin.com",
  "eBay": "ebay.com",
  "Edmunds": "edmunds.com",
  "ElevenLabs": "elevenlabs.io",
  "Exa": "exa.ai",
  "Facebook": "facebook.com",
  "Firecrawl": "firecrawl.dev",
  "Fish Audio": "fish.audio",
  "GitHub": "github.com",
  "G2": "g2.com",
  "Google Gemini": "gemini.google.com",
  "Google Shopping": "shopping.google.com",
  "Hacker News": "news.ycombinator.com",
  "Home Depot": "homedepot.com",
  "Homes.com": "homes.com",
  "Hunter": "hunter.io",
  "Indeed": "indeed.com",
  "Instagram": "instagram.com",
  "IQAir": "iqair.com",
  "Kling": "klingai.com",
  "Kroger": "kroger.com",
  "Kuaishou": "kuaishou.com",
  "Lazada": "lazada.com",
  "Lemon8": "lemon8-app.com",
  "Levels.fyi": "levels.fyi",
  "LinkedIn": "linkedin.com",
  "LoopNet": "loopnet.com",
  "MarketBeat": "marketbeat.com",
  "Meijer": "meijer.com",
  "MiniMax": "minimaxi.com",
  "Nasdaq": "nasdaq.com",
  "Naver": "naver.com",
  "Nordstrom": "nordstrom.com",
  "OpenAI": "openai.com",
  "Pinterest": "pinterest.com",
  "Reddit": "reddit.com",
  "SerpApi": "serpapi.com",
  "Shein": "shein.com",
  "Snapchat": "snapchat.com",
  "Spotify": "spotify.com",
  "Substack": "substack.com",
  "Tavily": "tavily.com",
  "Telegram": "telegram.org",
  "Threads": "threads.net",
  "TikTok": "tiktok.com",
  "TikTok Shop": "shop.tiktok.com",
  "Topaz Labs": "topazlabs.com",
  "Toutiao": "toutiao.com",
  "Trustpilot": "trustpilot.com",
  "Walmart": "walmart.com",
  "Watsons": "watsons.com",
  "WeChat": "wechat.com",
  "Weibo": "weibo.com",
  "Xiaohongshu": "xiaohongshu.com",
  "Yahoo Finance": "finance.yahoo.com",
  "Y Combinator": "ycombinator.com",
  "YouTube": "youtube.com",
  "Zepto": "zepto.com",
  "Zhihu": "zhihu.com",
  "Zillow": "zillow.com",
  "Stripe": "stripe.com",
  "Slack": "slack.com",
  "Notion": "notion.so",
  "Resend": "resend.com",
  "E2B": "e2b.dev",
  "Composio": "composio.dev",
  "Brave Search": "brave.com",
  "MrScraper": "mrscraper.com",
  "AccuWeather": "accuweather.com",
  "Tendata": "tendata.com",
  "ByteDance": "bytedance.com",
  "Capterra": "capterra.com",
  "Clutch": "clutch.co",
  "Finviz": "finviz.com",
  "GetApp": "getapp.com",
  "Idealist": "idealist.org",
  "Kelley Blue Book": "kbb.com",
  "Opoint": "opoint.com",
  "Recall.ai": "recall.ai",
  "Search1API": "search1api.com",
  "StepFun": "stepfun.com",
  "TinyFish": "tinyfish.io",
  "Wellfound": "wellfound.com",
  "Channel3": "channel3.ai",
  "Fundable": "fundable.com",
  "QuickNode (x402)": "quicknode.com",
  "Saperly": "saperly.com",
  "StockAnalysis": "stockanalysis.com",
  "PiPiXia": "pipixia.com",
  "Gloria": "gloria.ai",
  "Ploid": "ploid.com",
  "Octen": "octen.ai",
  "Orbit": "orbit.fm",
  "Parallel": "parallel.ai",
  "Keenable": "keenable.com",
  "Litescrape": "litescrape.com",
  "LMArena": "lmarena.ai",
  "Magic Hour": "magichour.ai",
  "Smol Machines": "smolmachines.ai",
  "Context.dev": "context.dev",
  "Data Legion": "datalegion.com",
  "DataForSEO": "dataforseo.com",
  "People Data Labs": "peopledatalabs.com",
  "BlockRun": "blockrun.com",
  "Surf": "surf.tech",
  "Vela Breakout": "velabreakout.com",
  "X402 Atlas": "x402.org",
  "censusdata.xyz": "censusdata.xyz",
  "akta": "akta.ai",
  "cloro": "cloro.ai",
  "AnyAPI": "anyapi.io",
  "Strale": "strale.io",
};

// Fallback: try common domain patterns from tool name
function guessDomain(name: string): string {
  const clean = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  return `${clean}.com`;
}

function faviconUrl(domain: string): string {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}

async function main() {
  console.log("Connecting to database...");
  const sql = postgres(DATABASE_URL!, { max: 5, connect_timeout: 15 });

  // Step 1: Add logo_url column if not exists
  console.log("Running migration (adding logo_url column)...");
  await sql`ALTER TABLE packages ADD COLUMN IF NOT EXISTS logo_url text`;
  console.log("Migration complete.");

  // Step 2: Get all packages
  const packages = await sql`SELECT name FROM packages WHERE status = 'published'`;
  console.log(`Found ${packages.length} packages to update.`);

  let updated = 0;
  let mapped = 0;
  let guessed = 0;

  for (const pkg of packages) {
    const name = pkg.name as string;
    let domain = DOMAIN_MAP[name];

    if (domain) {
      mapped++;
    } else {
      // Try to guess from name
      domain = guessDomain(name);
      guessed++;
    }

    const logoUrl = faviconUrl(domain);

    await sql`UPDATE packages SET logo_url = ${logoUrl} WHERE name = ${name}`;
    updated++;
  }

  console.log(`\nDone! Updated: ${updated}`);
  console.log(`  Mapped (known domain): ${mapped}`);
  console.log(`  Guessed (fallback): ${guessed}`);

  await sql.end();
}

main().catch((err) => {
  console.error("Update logos failed:", err);
  process.exit(1);
});
