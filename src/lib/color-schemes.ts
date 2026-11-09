export type ColorScheme =
  | "poligonal"
  | "prosecraft"
  | "nord"
  | "gruvbox"
  | "solarized"
  | "catppuccin"
  | "everforest"
  | "rose-pine"
  | "dracula";

export const colorSchemeOptions: Array<{ value: ColorScheme; label: string }> = [
  { value: "poligonal", label: "Poligonal Dark (Prismatic)" },
  { value: "prosecraft", label: "ProseCraft" },
  { value: "nord", label: "Nord" },
  { value: "gruvbox", label: "Gruvbox" },
  { value: "solarized", label: "Solarized" },
  { value: "catppuccin", label: "Catppuccin" },
  { value: "everforest", label: "Everforest" },
  { value: "rose-pine", label: "Rosé Pine" },
  { value: "dracula", label: "Dracula" }
];

export type PreviewPalette = {
  desk: string;
  page: string;
  ink: string;
  muted: string;
  rule: string;
  border: string;
  shadow: string;
};

export const defaultPreviewPalette: PreviewPalette = {
  desk: "#e8e8e2",
  page: "#ffffff",
  ink: "#1d211d",
  muted: "#73776f",
  rule: "#d9dbd4",
  border: "#d8d8d1",
  shadow: "0 14px 38px rgba(28, 32, 27, 0.12)"
};

export const defaultDarkPreviewPalette: PreviewPalette = {
  desk: "#060709",
  page: "#0b0c10",
  ink: "#f0f2f8",
  muted: "#8e95a5",
  rule: "#1c1e2a",
  border: "rgba(255, 255, 255, 0.08)",
  shadow: "0 14px 38px rgba(0, 0, 0, 0.7)"
};

export function isColorScheme(value: string | null): value is ColorScheme {
  return colorSchemeOptions.some((option) => option.value === value);
}

export function readPreviewPalette(): PreviewPalette {
  const styles = getComputedStyle(document.documentElement);
  const read = (name: string, fallback: string): string => {
    const value = styles.getPropertyValue(name).trim();
    return value || fallback;
  };
  const shadowRgb = read("--p-shadow-rgb", "");
  const shadowAlpha = read("--p-preview-shadow-alpha", "");
  const shadow = shadowRgb && shadowAlpha
    ? `0 14px 38px rgba(${shadowRgb}, ${shadowAlpha})`
    : read("--shadow-preview-page", defaultPreviewPalette.shadow);

  return {
    desk: read("--page-bg", defaultPreviewPalette.desk),
    page: read("--surface-raised", defaultPreviewPalette.page),
    ink: read("--text-primary", defaultPreviewPalette.ink),
    muted: read("--text-muted", defaultPreviewPalette.muted),
    rule: read("--border", defaultPreviewPalette.rule),
    border: read("--border-control", defaultPreviewPalette.border),
    shadow
  };
}
