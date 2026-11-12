"use client";

import { useState, type KeyboardEvent } from "react";
import type { Locale } from "@/lib/i18n/config";

type Kind = "skill" | "mcp" | "cli";
type Method = { title: string; desc: string };
type IntegrationContent = {
  title: string;
  subtitle: string;
  skill: Method;
  mcp: Method;
  cli: Method;
};
type DetailCopy = { headline: string; body: string; steps: [string, string, string] };
type Copy = {
  example: string;
  docs: string;
  agent: string;
  instruction: string;
  endpoint: string;
  configuration: string;
  terminal: string;
  cliNotice: string;
  detail: Record<Kind, DetailCopy>;
};

const copy: Record<Locale, Copy> = {
  en: {
    example: "Integration example", docs: "View documentation", agent: "Your Agent", instruction: "Skill instructions",
    endpoint: "Remote MCP endpoint", configuration: "Client configuration", terminal: "Terminal", cliNotice: "CLI integration is under development. Command format shown for reference.",
    detail: {
      skill: { headline: "Let your Agent handle the setup", body: "Send a tool’s Skill guide to your Agent and configure its integration within the conversation.", steps: ["Choose a tool", "Send its Skill guide", "Follow the setup instructions"] },
      mcp: { headline: "Connect from your MCP client", body: "Add a remote server address to an MCP-compatible client. Keep your tools in the workflow you already use.", steps: ["Open client settings", "Add a remote endpoint", "Save the configuration"] },
      cli: { headline: "Bring integration to your terminal", body: "A command-line workflow for discovering and installing tools. Explore the command format below.", steps: ["Open your terminal", "Choose a package", "Use the install command"] },
    },
  },
  zh: {
    example: "接入示例", docs: "查看文档", agent: "你的 Agent", instruction: "Skill 接入指引",
    endpoint: "远程 MCP 端点", configuration: "客户端配置", terminal: "终端", cliNotice: "CLI 接入功能开发中，下方为命令格式示例。",
    detail: {
      skill: { headline: "把接入交给你的 Agent", body: "将工具的 Skill 指引发送给 Agent，在对话中按指引完成接入配置。", steps: ["选择工具", "发送 Skill 指引", "按指引完成配置"] },
      mcp: { headline: "在 MCP 客户端中直接接入", body: "在支持 MCP 的客户端中添加远程服务地址，将工具接入现有工作流。", steps: ["打开客户端设置", "添加远程端点", "保存接入配置"] },
      cli: { headline: "从命令行管理工具接入", body: "面向开发者的命令行接入方式，用查找与安装命令串联工具工作流。", steps: ["打开终端", "选择工具包", "使用安装命令"] },
    },
  },
  es: {
    example: "Ejemplo de integración", docs: "Ver documentación", agent: "Tu Agent", instruction: "Guía de Skill",
    endpoint: "Endpoint MCP remoto", configuration: "Configuración del cliente", terminal: "Terminal", cliNotice: "La integración CLI está en desarrollo. Se muestra el formato del comando como referencia.",
    detail: {
      skill: { headline: "Deja la configuración a tu Agent", body: "Envía la guía Skill de una herramienta a tu Agent y configura la integración en la conversación.", steps: ["Elige una herramienta", "Envía su guía Skill", "Sigue las instrucciones"] },
      mcp: { headline: "Conecta desde tu cliente MCP", body: "Añade la dirección de un servidor remoto a un cliente compatible con MCP e integra las herramientas en tu flujo habitual.", steps: ["Abre los ajustes", "Añade un endpoint remoto", "Guarda la configuración"] },
      cli: { headline: "Integra desde tu terminal", body: "Un flujo de línea de comandos para buscar e instalar herramientas. Consulta el formato del comando.", steps: ["Abre la terminal", "Elige un paquete", "Usa el comando de instalación"] },
    },
  },
  fr: {
    example: "Exemple d’intégration", docs: "Voir la documentation", agent: "Votre Agent", instruction: "Guide Skill",
    endpoint: "Point de terminaison MCP distant", configuration: "Configuration du client", terminal: "Terminal", cliNotice: "L’intégration CLI est en cours de développement. Le format de commande est fourni à titre indicatif.",
    detail: {
      skill: { headline: "Confiez la configuration à votre Agent", body: "Envoyez le guide Skill d’un outil à votre Agent et configurez son intégration dans la conversation.", steps: ["Choisir un outil", "Envoyer son guide Skill", "Suivre les instructions"] },
      mcp: { headline: "Connectez votre client MCP", body: "Ajoutez l’adresse d’un serveur distant à un client compatible MCP pour intégrer les outils à votre workflow.", steps: ["Ouvrir les paramètres", "Ajouter un endpoint distant", "Enregistrer la configuration"] },
      cli: { headline: "Intégrez depuis votre terminal", body: "Un workflow en ligne de commande pour rechercher et installer des outils. Consultez le format de la commande.", steps: ["Ouvrir le terminal", "Choisir un package", "Utiliser la commande d’installation"] },
    },
  },
  de: {
    example: "Integrationsbeispiel", docs: "Dokumentation ansehen", agent: "Ihr Agent", instruction: "Skill-Anleitung",
    endpoint: "Remote-MCP-Endpunkt", configuration: "Client-Konfiguration", terminal: "Terminal", cliNotice: "Die CLI-Integration wird noch entwickelt. Das Befehlsformat dient als Beispiel.",
    detail: {
      skill: { headline: "Überlassen Sie Ihrem Agent die Einrichtung", body: "Senden Sie Ihrem Agent die Skill-Anleitung eines Tools und konfigurieren Sie die Integration im Gespräch.", steps: ["Tool auswählen", "Skill-Anleitung senden", "Einrichtungsschritten folgen"] },
      mcp: { headline: "Direkt über Ihren MCP-Client verbinden", body: "Fügen Sie einem MCP-kompatiblen Client eine Remote-Serveradresse hinzu und integrieren Sie Tools in Ihren Workflow.", steps: ["Client-Einstellungen öffnen", "Remote-Endpunkt hinzufügen", "Konfiguration speichern"] },
      cli: { headline: "Integration direkt im Terminal", body: "Ein Befehlszeilen-Workflow zum Suchen und Installieren von Tools. Sehen Sie sich das Befehlsformat an.", steps: ["Terminal öffnen", "Paket auswählen", "Installationsbefehl verwenden"] },
    },
  },
  pt: {
    example: "Exemplo de integração", docs: "Ver documentação", agent: "Seu Agent", instruction: "Guia Skill",
    endpoint: "Endpoint MCP remoto", configuration: "Configuração do cliente", terminal: "Terminal", cliNotice: "A integração CLI está em desenvolvimento. O formato do comando é apresentado como referência.",
    detail: {
      skill: { headline: "Deixe a configuração com seu Agent", body: "Envie o guia Skill de uma ferramenta ao seu Agent e configure a integração durante a conversa.", steps: ["Escolha uma ferramenta", "Envie seu guia Skill", "Siga as instruções"] },
      mcp: { headline: "Conecte pelo seu cliente MCP", body: "Adicione um endereço de servidor remoto a um cliente compatível com MCP e integre ferramentas ao seu fluxo de trabalho.", steps: ["Abra as configurações", "Adicione um endpoint remoto", "Salve a configuração"] },
      cli: { headline: "Integre pelo terminal", body: "Um fluxo de linha de comando para buscar e instalar ferramentas. Veja o formato do comando abaixo.", steps: ["Abra o terminal", "Escolha um pacote", "Use o comando de instalação"] },
    },
  },
  it: {
    example: "Esempio di integrazione", docs: "Vedi documentazione", agent: "Il tuo Agent", instruction: "Guida Skill",
    endpoint: "Endpoint MCP remoto", configuration: "Configurazione del client", terminal: "Terminale", cliNotice: "L’integrazione CLI è in sviluppo. Il formato del comando è mostrato come riferimento.",
    detail: {
      skill: { headline: "Affida la configurazione al tuo Agent", body: "Invia la guida Skill di uno strumento al tuo Agent e configura l’integrazione nella conversazione.", steps: ["Scegli uno strumento", "Invia la guida Skill", "Segui le istruzioni"] },
      mcp: { headline: "Connetti dal tuo client MCP", body: "Aggiungi l’indirizzo di un server remoto a un client compatibile con MCP e integra gli strumenti nel tuo workflow.", steps: ["Apri le impostazioni", "Aggiungi un endpoint remoto", "Salva la configurazione"] },
      cli: { headline: "Integra dal terminale", body: "Un workflow da riga di comando per cercare e installare strumenti. Consulta il formato del comando.", steps: ["Apri il terminale", "Scegli un pacchetto", "Usa il comando di installazione"] },
    },
  },
  ja: {
    example: "連携の例", docs: "ドキュメントを見る", agent: "あなたの Agent", instruction: "Skill 連携ガイド",
    endpoint: "リモート MCP エンドポイント", configuration: "クライアント設定", terminal: "ターミナル", cliNotice: "CLI 連携は開発中です。以下はコマンド形式の例です。",
    detail: {
      skill: { headline: "設定をあなたの Agent に任せる", body: "ツールの Skill ガイドを Agent に送信し、会話の中でガイドに沿って連携を設定します。", steps: ["ツールを選択", "Skill ガイドを送信", "ガイドに沿って設定"] },
      mcp: { headline: "MCP クライアントから直接接続", body: "MCP 対応クライアントにリモートサーバーのアドレスを追加し、ツールを既存のワークフローに組み込みます。", steps: ["クライアント設定を開く", "リモート接続先を追加", "設定を保存"] },
      cli: { headline: "ターミナルからツールを連携", body: "ツールの検索とインストールを行うコマンドライン方式です。以下のコマンド形式をご覧ください。", steps: ["ターミナルを開く", "パッケージを選択", "インストールコマンドを使用"] },
    },
  },
  ko: {
    example: "연동 예시", docs: "문서 보기", agent: "당신의 Agent", instruction: "Skill 연동 가이드",
    endpoint: "원격 MCP 엔드포인트", configuration: "클라이언트 설정", terminal: "터미널", cliNotice: "CLI 연동은 개발 중입니다. 아래는 명령어 형식 예시입니다.",
    detail: {
      skill: { headline: "설정을 당신의 Agent에게 맡기세요", body: "도구의 Skill 가이드를 Agent에게 보내고 대화에서 안내에 따라 연동을 설정하세요.", steps: ["도구 선택", "Skill 가이드 전송", "안내에 따라 설정"] },
      mcp: { headline: "MCP 클라이언트에서 바로 연결", body: "MCP 호환 클라이언트에 원격 서버 주소를 추가하고 기존 워크플로에 도구를 연결하세요.", steps: ["클라이언트 설정 열기", "원격 엔드포인트 추가", "설정 저장"] },
      cli: { headline: "터미널에서 도구 연동 관리", body: "도구를 검색하고 설치하는 명령줄 방식입니다. 아래에서 명령어 형식을 확인하세요.", steps: ["터미널 열기", "패키지 선택", "설치 명령어 사용"] },
    },
  },
};

const kinds: Kind[] = ["skill", "mcp", "cli"];
const skillPrompt = "Read https://imagent.ai/tools/tavily/skill.md and follow the instructions to set up the Imagent MCP Marketplace and install the MCP server.";
const mcpUrl = "https://mcp.imagent.ai/tavily";
const mcpConfig = JSON.stringify({ mcpServers: { tavily: { url: mcpUrl } } }, null, 2);

function MethodIcon({ kind }: { kind: Kind }) {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      {kind === "skill" && <><path d="M8 3H15L19 7V21H5V3H8Z" strokeWidth={1.5} strokeLinejoin="round" /><path d="M14 3V8H19M9 12H15M9 16H13" strokeWidth={1.5} strokeLinecap="round" /></>}
      {kind === "mcp" && <><path d="M8 8L10 6C12 4 14 4 16 6L18 8C20 10 20 12 18 14L16 16M16 16L14 18C12 20 10 20 8 18L6 16C4 14 4 12 6 10L8 8M9 15L15 9" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /></>}
      {kind === "cli" && <><rect x="3" y="4" width="18" height="16" rx="3" strokeWidth={1.5} /><path d="M7 9L10 12L7 15M13 15H17" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /></>}
    </svg>
  );
}

function Preview({ kind, text }: { kind: Kind; text: Copy }) {
  return (
    <div className="integration-preview-stage" data-integration-preview={kind}>
      <div className="integration-preview-layer" aria-hidden="true" />
      <div className={`integration-preview-surface integration-preview-${kind}`}>
        <div className="integration-preview-toolbar">
          <span className="integration-preview-brand"><MethodIcon kind={kind} />{kind === "skill" ? text.agent : kind === "mcp" ? text.configuration : text.terminal}</span>
          <span className="integration-preview-format">{kind === "skill" ? "Skill" : kind === "mcp" ? "JSON" : "CLI"}</span>
        </div>
        {kind === "skill" && (
          <div className="integration-skill-body">
            <div className="integration-preview-caption">{text.instruction}</div>
            <div className="integration-chat-bubble"><p>{skillPrompt}</p></div>
            <div className="integration-preview-file"><MethodIcon kind="skill" /><span><strong>Tavily</strong><small>skill.md</small></span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M9 5L16 12L9 19" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /></svg></div>
          </div>
        )}
        {kind === "mcp" && (
          <div className="integration-config-body">
            <div className="integration-preview-caption">{text.endpoint}</div>
            <div className="integration-endpoint"><span aria-hidden="true">↗</span><code>{mcpUrl}</code></div>
            <pre tabIndex={0} aria-label={text.configuration}><code>{mcpConfig}</code></pre>
          </div>
        )}
        {kind === "cli" && (
          <div className="integration-terminal-body">
            <pre tabIndex={0} aria-label={text.terminal}><code><span className="integration-terminal-comment"># Imagent CLI</span>{"\n\n"}<span className="integration-terminal-prompt">$</span> imagent search tavily{"\n\n"}<span className="integration-terminal-prompt">$</span> imagent install tavily</code></pre>
            <p className="integration-cli-notice">{text.cliNotice}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function IntegrationShowcase({ content, locale }: { content: IntegrationContent; locale: Locale }) {
  const [active, setActive] = useState<Kind>("skill");
  const text = copy[locale];

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, kind: Kind) => {
    const index = kinds.indexOf(kind);
    let next: number;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % kinds.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index + kinds.length - 1) % kinds.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = kinds.length - 1;
    else return;
    event.preventDefault();
    setActive(kinds[next]);
    event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>("button")[next]?.focus({ preventScroll: true });
  };

  return (
    <div className="integration-showcase" data-integration-showcase>
      <div className="integration-section-heading">
        <h2 lang={locale} data-home-heading="integration">{content.title}</h2>
        <p>{content.subtitle}</p>
      </div>
      <div className="integration-choice-column">
        <div className="integration-choice-list" role="tablist" aria-label={content.title} aria-orientation="vertical">
          {kinds.map(kind => (
            <button
              key={kind}
              id={`integration-tab-${kind}`}
              type="button"
              role="tab"
              aria-selected={active === kind}
              aria-expanded={active === kind}
              aria-controls={`integration-detail-${kind}`}
              tabIndex={active === kind ? 0 : -1}
              className="integration-choice"
              data-integration-choice={kind}
              onPointerEnter={event => {
                if (event.pointerType === "mouse" && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
                  const currentPanel = document.getElementById(`integration-detail-${active}`);
                  if (active !== kind && currentPanel?.contains(document.activeElement)) {
                    event.currentTarget.focus({ preventScroll: true });
                  }
                  setActive(kind);
                }
              }}
              onFocus={() => setActive(kind)}
              onClick={() => setActive(kind)}
              onKeyDown={event => handleKeyDown(event, kind)}
            >
              <span className="integration-choice-heading">
                <span className="integration-choice-icon"><MethodIcon kind={kind} /></span>
                <span className="integration-choice-title">{content[kind].title}</span>
                <span className="integration-choice-arrow" aria-hidden="true"><svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 12H19M13 6L19 12L13 18" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" /></svg></span>
              </span>
              <span className="integration-choice-description" aria-hidden={active !== kind}>
                <span className="integration-choice-description-inner"><span>{content[kind].desc}</span></span>
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="integration-detail-stack" data-active-integration={active}>
        {kinds.map(kind => (
          <div
            key={kind}
            id={`integration-detail-${kind}`}
            className="integration-detail"
            role="tabpanel"
            aria-labelledby={`integration-tab-${kind}`}
            aria-hidden={active !== kind}
            inert={active !== kind}
            data-active={active === kind}
          >
            <Preview kind={kind} text={text} />
            <div className="integration-detail-footer scrollbar-hide">
              <ol className="integration-detail-steps">
                {text.detail[kind].steps.map((step, index) => <li key={step}><span aria-hidden="true">{index + 1}</span>{step}</li>)}
              </ol>
              <a className="integration-docs-link" href="/docs#how-it-works">{text.docs}<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M7 7H17V17" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /></svg></a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
