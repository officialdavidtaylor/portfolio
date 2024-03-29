export default {
  content: ["./src/**/*.{astro,html,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: [
          "Lora",
          "ui-serif",
          "Georgia",
          "Cambria",
          '"Times New Roman"',
          "Times",
          "serif",
        ],
        project: [
          '"Fira Code"',
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace",
        ],
        display: [
          '"Roboto Slab"',
          "ui-serif",
          "Georgia",
          "Cambria",
          '"Times New Roman"',
          "Times",
          "serif",
        ],
      },
    },
  },
  plugins: [],
};
