import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  const theme = extendTheme({
    colors: {
      blue1: {
        100: "#08c6f9",
        // ...
        200: "#caeff9",
        300: "#3a7bd5",
        400: "#d8e5f7",
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
