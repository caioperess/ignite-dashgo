import { Theme, extendTheme } from "@chakra-ui/react";
import { Roboto } from "@next/font/google";

const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"] });

const customTheme = {
  colors: {
    gray: {
      "50": "#EEEEF2",
      "100": "#D1D2DC",
      "200": "#B3B5C6",
      "300": "#9699B0",
      "400": "#797D9A",
      "500": "#616480",
      "600": "#4B4D63",
      "700": "#353646",
      "800": "#1F2029",
      "900": "#181B23",
    },
  },
  fonts: {
    heading: roboto.style.fontFamily,
    body: roboto.style.fontFamily,
  },
  styles: {
    global: {
      body: {
        bg: "gray.900",
        color: "gray.50",
      },
    },
  },
} as Theme;

export const theme = extendTheme(customTheme);
