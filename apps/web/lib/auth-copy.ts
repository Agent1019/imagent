import type { Locale } from "@/lib/i18n/config";

export type AuthCopy = {
  loginTitle: string;
  signupTitle: string;
  subtitle: string;
  googleSignIn: string;
  googleSignUp: string;
  pending: string;
  signedIn: string;
  continueLabel: string;
  signOut: string;
  termsLead: string;
  and: string;
  terms: string;
  privacy: string;
  error: string;
  unavailable: string;
};

const copy: Record<Locale, AuthCopy> = {
  en: {
    loginTitle: "Sign in",
    signupTitle: "Get started",
    subtitle: "Use your Google account to enter Imagent. One account works across the tools on the platform.",
    googleSignIn: "Sign in with Google",
    googleSignUp: "Sign up with Google",
    pending: "Redirecting to Google…",
    signedIn: "Signed in",
    continueLabel: "Continue",
    signOut: "Sign out",
    termsLead: "By continuing, you agree to the",
    and: "and",
    terms: "Terms",
    privacy: "Privacy Policy",
    error: "Sign-in didn't finish. Please try again.",
    unavailable: "Google sign-in isn't available yet. Please try again later.",
  },
  zh: {
    loginTitle: "登录",
    signupTitle: "免费开始",
    subtitle: "用 Google 账号进入 Imagent。一个账号就能使用平台上的工具。",
    googleSignIn: "使用 Google 登录",
    googleSignUp: "使用 Google 注册",
    pending: "正在前往 Google…",
    signedIn: "已登录",
    continueLabel: "继续",
    signOut: "退出登录",
    termsLead: "继续即表示你同意",
    and: "和",
    terms: "服务条款",
    privacy: "隐私政策",
    error: "登录没有完成，请再试一次。",
    unavailable: "Google 登录暂时不可用，请稍后再试。",
  },
  ko: {
    loginTitle: "로그인",
    signupTitle: "시작하기",
    subtitle: "Google 계정으로 Imagent에 들어오세요. 계정 하나로 플랫폼의 모든 도구를 쓸 수 있습니다.",
    googleSignIn: "Google로 로그인",
    googleSignUp: "Google로 가입",
    pending: "Google로 이동 중…",
    signedIn: "로그인됨",
    continueLabel: "계속",
    signOut: "로그아웃",
    termsLead: "계속하면 다음에 동의하게 됩니다:",
    and: "및",
    terms: "서비스 약관",
    privacy: "개인정보 처리방침",
    error: "로그인이 끝나지 않았습니다. 다시 시도해 주세요.",
    unavailable: "Google 로그인을 아직 사용할 수 없습니다. 잠시 후 다시 시도해 주세요.",
  },
  ja: {
    loginTitle: "ログイン",
    signupTitle: "無料で始める",
    subtitle: "Google アカウントで Imagent に入れます。アカウント 1 つでプラットフォーム上のツールを使えます。",
    googleSignIn: "Google でログイン",
    googleSignUp: "Google で登録",
    pending: "Google に移動しています…",
    signedIn: "ログイン中",
    continueLabel: "続ける",
    signOut: "ログアウト",
    termsLead: "続けると、次に同意したことになります：",
    and: "と",
    terms: "利用規約",
    privacy: "プライバシーポリシー",
    error: "ログインが完了しませんでした。もう一度お試しください。",
    unavailable: "Google ログインはまだ使えません。しばらくしてからもう一度お試しください。",
  },
  es: {
    loginTitle: "Iniciar sesión",
    signupTitle: "Comenzar",
    subtitle: "Entra en Imagent con tu cuenta de Google. Una sola cuenta vale para todas las herramientas de la plataforma.",
    googleSignIn: "Iniciar sesión con Google",
    googleSignUp: "Registrarse con Google",
    pending: "Redirigiendo a Google…",
    signedIn: "Sesión iniciada",
    continueLabel: "Continuar",
    signOut: "Cerrar sesión",
    termsLead: "Al continuar, aceptas los",
    and: "y la",
    terms: "Términos",
    privacy: "Política de privacidad",
    error: "El inicio de sesión no se completó. Inténtalo de nuevo.",
    unavailable: "El inicio de sesión con Google aún no está disponible. Inténtalo más tarde.",
  },
  pt: {
    loginTitle: "Entrar",
    signupTitle: "Começar",
    subtitle: "Entre no Imagent com sua conta Google. Uma conta vale para todas as ferramentas da plataforma.",
    googleSignIn: "Entrar com o Google",
    googleSignUp: "Criar conta com o Google",
    pending: "Redirecionando para o Google…",
    signedIn: "Sessão iniciada",
    continueLabel: "Continuar",
    signOut: "Sair",
    termsLead: "Ao continuar, você concorda com os",
    and: "e a",
    terms: "Termos",
    privacy: "Política de Privacidade",
    error: "O login não foi concluído. Tente de novo.",
    unavailable: "O login com o Google ainda não está disponível. Tente mais tarde.",
  },
  it: {
    loginTitle: "Accedi",
    signupTitle: "Inizia",
    subtitle: "Entra in Imagent con il tuo account Google. Un solo account vale per tutti gli strumenti della piattaforma.",
    googleSignIn: "Accedi con Google",
    googleSignUp: "Registrati con Google",
    pending: "Reindirizzamento a Google…",
    signedIn: "Accesso effettuato",
    continueLabel: "Continua",
    signOut: "Esci",
    termsLead: "Continuando, accetti i",
    and: "e l'",
    terms: "Termini",
    privacy: "Informativa sulla privacy",
    error: "Accesso non completato. Riprova.",
    unavailable: "L'accesso con Google non è ancora disponibile. Riprova più tardi.",
  },
  fr: {
    loginTitle: "Se connecter",
    signupTitle: "Commencer",
    subtitle: "Entrez sur Imagent avec votre compte Google. Un seul compte donne accès à tous les outils de la plateforme.",
    googleSignIn: "Se connecter avec Google",
    googleSignUp: "S'inscrire avec Google",
    pending: "Redirection vers Google…",
    signedIn: "Connecté",
    continueLabel: "Continuer",
    signOut: "Se déconnecter",
    termsLead: "En continuant, vous acceptez les",
    and: "et la",
    terms: "Conditions",
    privacy: "Politique de confidentialité",
    error: "La connexion ne s'est pas terminée. Réessayez.",
    unavailable: "La connexion Google n'est pas encore disponible. Réessayez plus tard.",
  },
  de: {
    loginTitle: "Anmelden",
    signupTitle: "Kostenlos starten",
    subtitle: "Melde dich mit deinem Google-Konto bei Imagent an. Ein Konto gilt für alle Tools auf der Plattform.",
    googleSignIn: "Mit Google anmelden",
    googleSignUp: "Mit Google registrieren",
    pending: "Weiterleitung zu Google…",
    signedIn: "Angemeldet",
    continueLabel: "Weiter",
    signOut: "Abmelden",
    termsLead: "Wenn du fortfährst, stimmst du den",
    and: "und der",
    terms: "Nutzungsbedingungen",
    privacy: "Datenschutzerklärung",
    error: "Die Anmeldung wurde nicht abgeschlossen. Bitte versuche es erneut.",
    unavailable: "Die Anmeldung mit Google ist noch nicht verfügbar. Bitte versuche es später erneut.",
  },
};

export function getAuthCopy(locale: Locale): AuthCopy {
  return copy[locale];
}
