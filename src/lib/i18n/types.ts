export type LanguageCode = "en" | "br" | (string & {});

export type LanguageOption = {
  value: LanguageCode;
  label: string;
};

export type TranslationParams = Record<string, string | number>;

export type TranslationDictionary = Record<string, string>;
