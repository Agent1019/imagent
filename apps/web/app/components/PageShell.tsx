import Layout from "@/app/layouts/Layout";
import { getRequestContext } from "@/lib/i18n/request";

export default async function PageShell({
  title,
  lede,
  children,
}: {
  title: string;
  lede?: string;
  children: React.ReactNode;
}) {
  const { locale, t } = await getRequestContext();
  return (
    <Layout locale={locale} nav={t.nav} footer={t.footer} searchPlaceholder={t.hero.searchPlaceholder}>
      <div className="px-4 pb-20 pt-32 md:px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">{title}</h1>
          {lede ? <p className="mt-3 text-gray-400">{lede}</p> : null}
          <div className="mt-8 space-y-4 text-sm leading-relaxed text-gray-300">{children}</div>
        </div>
      </div>
    </Layout>
  );
}
