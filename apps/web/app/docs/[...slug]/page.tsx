import type { Metadata } from "next";
import PageShell from "@/app/components/PageShell";
import { getRequestContext } from "@/lib/i18n/request";

const pages: Record<string, { en: string; zh: string; bodyEn: string; bodyZh: string }> = {
  api: {
    en: "API reference",
    zh: "API 参考",
    bodyEn: "The public registry endpoint is GET /api/v1/search?q=pdf. It returns published packages from Supabase.",
    bodyZh: "公开目录接口是 GET /api/v1/search?q=pdf。它返回 Supabase 里已发布的工具。",
  },
  "api/search": {
    en: "GET /api/v1/search",
    zh: "GET /api/v1/search",
    bodyEn: "Pass q to filter by name or description. The response is { query, results }. Unpublished rows are hidden by row-level security.",
    bodyZh: "用 q 按名称或说明过滤。响应是 { query, results }。未发布的行会被行级安全策略挡住。",
  },
  "api/invoke": {
    en: "Invoke",
    zh: "调用",
    bodyEn: "Invocation is metered per call. Install records are not readable with the public key.",
    bodyZh: "调用按次计量。使用公开密钥读不到调用记录。",
  },
  "api/billing": {
    en: "Billing",
    zh: "计费",
    bodyEn: "There is no subscription. Successful tool calls are the unit of billing.",
    bodyZh: "没有订阅。成功的工具调用是计费单位。",
  },
  cli: {
    en: "CLI reference",
    zh: "CLI 参考",
    bodyEn:
      "The getting-started flow uses imagent discover, imagent add, imagent auth, and imagent run. The published @imagent/cli package currently registers search, install, and publish; each command prints that it is not implemented yet. Start from packages/cli/src/index.ts.",
    bodyZh:
      "快速上手里的流程是 imagent discover、imagent add、imagent auth 和 imagent run。当前发布的 @imagent/cli 只注册了 search、install 和 publish，每条命令都会提示尚未实现。代码从 packages/cli/src/index.ts 看起。",
  },
  "cli/discover": {
    en: "imagent discover",
    zh: "imagent discover",
    bodyEn:
      "imagent discover \"generate PDF from markdown\" is the documented way to search MCP servers by capability. The live registry search is GET /api/v1/search?q=. The CLI search command is still a stub.",
    bodyZh:
      "文档中的 imagent discover \"generate PDF from markdown\" 用来按能力搜索 MCP Server。线上目录搜索是 GET /api/v1/search?q=。CLI 里的 search 命令还是占位实现。",
  },
  "cli/inspect": {
    en: "imagent inspect",
    zh: "imagent inspect",
    bodyEn:
      "Inspect is the documented step for reading a server's capabilities, trust score, and endpoints before you add it. Open /explore/{slug} for the same information in the browser. There is no inspect command in the current CLI package.",
    bodyZh:
      "inspect 是文档里添加之前查看能力、信任分和端点的一步。浏览器里打开 /explore/{slug} 能看到同样的信息。当前 CLI 包里没有 inspect 命令。",
  },
  "cli/run": {
    en: "imagent run",
    zh: "imagent run",
    bodyEn:
      "imagent run @scope/server method '{...}' is the documented invoke command. It is meant to send structured parameters and print the result. The current CLI does not implement run yet.",
    bodyZh:
      "文档中的调用命令是 imagent run @scope/server method '{...}'，用来发送结构化参数并打印结果。当前 CLI 还没有实现 run。",
  },
  integrations: {
    en: "Integrations",
    zh: "集成",
    bodyEn:
      "A tool can be reached three ways: the user completes OAuth, the agent calls the provider directly with a scoped token, or Imagent proxies the call and meters it. Pick one path per server and record it in the capability manifest.",
    bodyZh:
      "工具有三种接入方式：用户完成 OAuth、Agent 用有范围的令牌直连服务商，或由 Imagent 代理调用并计量。每个 Server 选一种，并写进能力清单。",
  },
  "integrations/oauth": {
    en: "OAuth",
    zh: "OAuth",
    bodyEn:
      "Use OAuth when the upstream account belongs to a person. The agent should not see the consent screen. After consent, exchange the result for a scoped token and store only that token for later calls.",
    bodyZh:
      "上游账号属于某个人时用 OAuth。Agent 不应该看到同意页。同意完成后，换成有范围的令牌，之后只保存这枚令牌。",
  },
  "integrations/direct": {
    en: "Direct",
    zh: "直连",
    bodyEn:
      "Direct means the agent calls the provider URL itself. The manifest must list the base URL, auth header, and JSON schema for each method. Imagent does not sit on the request path, so metering has to be reported back by the caller.",
    bodyZh:
      "直连是 Agent 自己请求服务商地址。能力清单要写明基础 URL、认证头，以及每个方法的 JSON schema。请求不经过 Imagent，用量要由调用方回传。",
  },
  "integrations/proxy": {
    en: "Proxy",
    zh: "代理",
    bodyEn:
      "Proxy sends the call through Imagent. The agent authenticates once, Imagent forwards the request, and the response includes usage metadata. This is the path used by the documented invoke endpoint.",
    bodyZh:
      "代理是请求经过 Imagent。Agent 认证一次，Imagent 转发请求，响应里带用量信息。文档中的 invoke 端点走的就是这条路径。",
  },
  examples: {
    en: "Examples",
    zh: "示例",
    bodyEn:
      "The examples below show three agent jobs: research, sales, and content. Each one starts with search, then invoke. Replace the tool name with a package that is published in the registry.",
    bodyZh:
      "下面三个例子分别是研究、销售和内容。都是先搜索再调用。把工具名换成目录里已发布的包。",
  },
  "examples/research": {
    en: "Research",
    zh: "研究",
    bodyEn:
      "Search for a web-research server, then invoke it with a question and a source limit. Keep the trust-score filter above 0.8 when the answer will be shown to a user.",
    bodyZh:
      "先搜索网页研究类 Server，再用问题和来源数量上限调用。结果要展示给用户时，把信任分过滤保持在 0.8 以上。",
  },
  "examples/sales": {
    en: "Sales",
    zh: "销售",
    bodyEn:
      "Look up a company, enrich the contact, then hand the result to an email server. Keep the enrichment call and the send call as two invokes so a failure in one does not hide the other.",
    bodyZh:
      "先查公司、补全联系人，再交给邮件 Server。补全和发送分成两次调用，一次失败不会把另一次的结果盖住。",
  },
  "examples/content": {
    en: "Content",
    zh: "内容",
    bodyEn:
      "Pass markdown to a document server and ask for a PDF URL. Store the URL from the response; do not assume the file stays on the agent.",
    bodyZh:
      "把 Markdown 交给文档 Server，要一个 PDF 地址。把响应里的地址存下来，不要假设文件还留在 Agent 上。",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { zh } = await getRequestContext();
  const { slug } = await params;
  const key = slug.join("/");
  const page = pages[key];
  const title = page ? (zh ? page.zh : page.en) : key;
  return { title: `${title} - Imagent`, robots: { index: false, follow: false } };
}

export default async function DocsSlugPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { zh } = await getRequestContext();
  const { slug } = await params;
  const key = slug.join("/");
  const page = pages[key];
  const title = page ? (zh ? page.zh : page.en) : key;
  const body = page
    ? zh
      ? page.bodyZh
      : page.bodyEn
    : zh
      ? "这一节的详细说明还在整理。命令行用法可以从仓库里的 packages/cli 看起。"
      : "The long-form writeup for this section is still being written. CLI behavior starts in packages/cli.";
  return (
    <PageShell title={title}>
      <p>{body}</p>
      <p>
        <a href="/docs" className="text-white underline">
          {zh ? "返回文档" : "Back to docs"}
        </a>
      </p>
    </PageShell>
  );
}
