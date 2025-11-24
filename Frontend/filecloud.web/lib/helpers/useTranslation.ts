import { useRouter } from "next/navigation";
import es from "@/messages/es.json";
import en from "@/messages/en.json";

const translations: Record<string, Record<string, string>> = {
  es,
  en,
};

export function useTranslation() {
  const router = useRouter();
  // Next.js App Router locale detection (default to 'es')
  let locale = "es";
  if (typeof window !== "undefined") {
    const pathLocale = window.location.pathname.split("/")[1];
    if (translations[pathLocale]) locale = pathLocale;
  }
  const t = (key: string) => translations[locale][key] || key;
  return { t, locale };
}
