import { writable, derived, type Readable } from "svelte/store";
import type { LanguageCode, LanguageOption, TranslationDictionary, TranslationParams } from "./types";
import en from "./locales/en.json";
import br from "./locales/br.json";

export * from "./types";

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { value: "en", label: "English" },
  { value: "br", label: "Brasileiro" }
];

export const DEFAULT_LANGUAGE: LanguageCode = "en";
export const LANGUAGE_STORAGE_KEY = "prosecraft-language";

export const DICTIONARIES: Record<string, TranslationDictionary> = {
  en,
  br
};

export function isLanguageCode(value: unknown): value is LanguageCode {
  return typeof value === "string" && LANGUAGE_OPTIONS.some((opt) => opt.value === value);
}

export function detectSystemLanguage(): LanguageCode {
  if (typeof navigator !== "undefined" && navigator.language) {
    const lang = navigator.language.toLowerCase();
    if (lang.startsWith("pt") || lang.startsWith("br")) {
      return "br";
    }
  }
  return DEFAULT_LANGUAGE;
}

export function getInitialLanguage(): LanguageCode {
  if (typeof localStorage !== "undefined") {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (isLanguageCode(saved)) {
      return saved;
    }
  }
  return detectSystemLanguage();
}

let activeLanguageCode: LanguageCode = getInitialLanguage();

export const language = writable<LanguageCode>(activeLanguageCode);

export function getLanguage(): LanguageCode {
  return activeLanguageCode;
}

export function setLanguage(nextLanguage: LanguageCode): void {
  if (!isLanguageCode(nextLanguage)) return;
  activeLanguageCode = nextLanguage;
  language.set(nextLanguage);

  if (typeof localStorage !== "undefined") {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    } catch {
      // Storage unavailable or quota exceeded
    }
  }

  if (typeof document !== "undefined") {
    document.documentElement.lang = nextLanguage === "br" ? "pt-BR" : nextLanguage;
  }
}

export function translate(
  key: string,
  lang: LanguageCode = activeLanguageCode,
  params?: TranslationParams
): string {
  const currentDict = DICTIONARIES[lang] || DICTIONARIES[DEFAULT_LANGUAGE];
  const fallbackDict = DICTIONARIES[DEFAULT_LANGUAGE];

  let text = currentDict[key] ?? fallbackDict[key] ?? key;

  if (params) {
    for (const [paramKey, paramVal] of Object.entries(params)) {
      text = text.replace(new RegExp(`\\{${paramKey}\\}`, "g"), String(paramVal));
    }
  }

  return text;
}

/**
 * Universal translation export.
 * Can be used as a plain function `t('key')` in TS files,
 * or as a reactive Svelte store `$t('key')` in Svelte components.
 */
const derivedTranslate = derived(language, ($lang) => {
  return (key: string, params?: TranslationParams) => translate(key, $lang, params);
});

export interface TranslationStore extends Readable<(key: string, params?: TranslationParams) => string> {
  (key: string, params?: TranslationParams): string;
}

export const t: TranslationStore = Object.assign(
  (key: string, params?: TranslationParams) => translate(key, activeLanguageCode, params),
  {
    subscribe: derivedTranslate.subscribe
  }
);
