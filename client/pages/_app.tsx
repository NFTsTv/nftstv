import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { ModalContextProvider } from "context/modalContext";
import { Layout } from "components/Elements/Layout";
import { currentChain } from "utils/constants";

const { chains, provider } = configureChains(
  [currentChain],
  [
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY ?? "" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Broadcastr",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const client = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_LIVEPEER_API_KEY ?? "",
  }),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LivepeerConfig client={client}>
      <WagmiConfig client={wagmiClient}>
        <Head> broadcastr </Head>
        <RainbowKitProvider chains={chains}>
          <ModalContextProvider>
            <Layout>
              <Component {...pageProps} />
              <Analytics />
            </Layout>
          </ModalContextProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </LivepeerConfig>
  );
}

export default MyApp;
