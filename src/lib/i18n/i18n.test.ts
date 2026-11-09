import { describe, it, expect, beforeEach } from "vitest";
import {
  t,
  setLanguage,
  getLanguage,
  translate,
  isLanguageCode,
  LANGUAGE_OPTIONS,
  DEFAULT_LANGUAGE,
  DICTIONARIES
} from "./index";

describe("i18n translation system", () => {
  beforeEach(() => {
    setLanguage("en");
  });

  it("registers supported languages including Brasileiro", () => {
    expect(LANGUAGE_OPTIONS).toEqual([
      { value: "en", label: "English" },
      { value: "br", label: "Brasileiro" }
    ]);
    expect(isLanguageCode("en")).toBe(true);
    expect(isLanguageCode("br")).toBe(true);
    expect(isLanguageCode("invalid")).toBe(false);
  });

  it("has key parity between English and Brasileiro dictionaries", () => {
    const enKeys = Object.keys(DICTIONARIES.en).sort();
    const brKeys = Object.keys(DICTIONARIES.br).sort();

    expect(enKeys.length).toBeGreaterThan(200);
    expect(brKeys.length).toBe(enKeys.length);
    expect(brKeys).toEqual(enKeys);
  });

  it("translates known keys in English", () => {
    setLanguage("en");
    expect(t("outline")).toBe("Outline");
    expect(t("publish")).toBe("Publish");
    expect(t("chapter")).toBe("Chapter");
  });

  it("translates known keys in Brasileiro", () => {
    setLanguage("br");
    expect(t("outline")).toBe("Estrutura");
    expect(t("publish")).toBe("Publicar");
    expect(t("chapter")).toBe("Capítulo");
  });

  it("replaces interpolation parameters correctly", () => {
    // Test custom key interpolation
    const customEn = "Chapter {num}: {name}";
    const customDict = { test_chapter: customEn };
    (DICTIONARIES.en as Record<string, string>).test_chapter = customEn;

    expect(translate("test_chapter", "en", { num: 1, name: "The Beginning" })).toBe(
      "Chapter 1: The Beginning"
    );
  });

  it("falls back to English when a key is missing in another language", () => {
    (DICTIONARIES.en as Record<string, string>).only_in_en = "Only in English";
    delete (DICTIONARIES.br as Record<string, string>).only_in_en;

    expect(translate("only_in_en", "br")).toBe("Only in English");
  });

  it("falls back to the key string itself when absent in all dictionaries", () => {
    expect(t("non_existent_key")).toBe("non_existent_key");
  });

  it("updates active language through setLanguage", () => {
    setLanguage("br");
    expect(getLanguage()).toBe("br");

    setLanguage("en");
    expect(getLanguage()).toBe("en");
  });
});
