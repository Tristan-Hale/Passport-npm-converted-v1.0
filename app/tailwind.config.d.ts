import type { Config } from "tailwindcss";

declare const config: Config & {
  theme: {
    screens: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      "2xl": string;
    };
  };
};

export default config;
