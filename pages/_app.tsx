import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import { theme } from "../utils/theme";
import "../styles/globals.css";
import Head from "next/head";
import gchLogo from "../public/GCH.svg";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
        <title>草根文化館有限公司 Grassroots Cultural Hub Limited</title>
        <meta
          name="description"
          content="草根文化館是一個非牟利機構，旨在促進教育、保護環境、救助貧困。秉承本會宗旨，我們就相關議題進行社區服務、培訓、研究及與這些領域上的其他群體交流合作。"
        />

        <meta
          property="og:title"
          content="草根文化館有限公司 Grassroots Cultural Hub Limited"
        />
        <meta
          property="og:description"
          content="草根文化館是一個非牟利機構，旨在促進教育、保護環境、救助貧困。秉承本會宗旨，我們就相關議題進行社區服務、培訓、研究及與這些領域上的其他群體交流合作。"
        />
        <meta property="og:image" content={gchLogo} />

        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
