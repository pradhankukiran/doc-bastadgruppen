import { translations } from "./translations";

export function t(
  lang: string,
  key: string,
  vars: Record<string, string | number> = {}
): string {
  const template =
    translations[lang]?.[key] ?? translations["en"][key] ?? key;

  return template.replace(/{{(.*?)}}/g, (_match: string, varName: string) => {
    const trimmed = varName.trim();
    return vars.hasOwnProperty(trimmed) ? String(vars[trimmed]) : "";
  });
} 