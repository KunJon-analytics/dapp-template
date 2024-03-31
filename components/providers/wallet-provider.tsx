"use client";

import * as React from "react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
  darkTheme,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import {
  arbitrum,
  mainnet,
  optimism,
  polygon,
  base,
  bsc,
  sepolia,
} from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { useTheme } from "next-themes";

import { env } from "@/env.mjs";
import { siteConfig } from "@/config/site";

import "@rainbow-me/rainbowkit/styles.css";

const { NEXT_PUBLIC_PROJECT_ID: projectId, NEXT_PUBLIC_ENABLE_TESTNETS } = env;
const { wallets } = getDefaultWallets();

const appInfo = {
  appName: siteConfig.name,
};

const config = getDefaultConfig({
  appName: siteConfig.name,
  projectId,
  wallets: [
    ...wallets,
    {
      groupName: "Other",
      wallets: [argentWallet, trustWallet, ledgerWallet],
    },
  ],
  chains: [
    bsc,
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    ...(NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  ssr: true,
});

const queryClient = new QueryClient();

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          appInfo={appInfo}
          theme={
            theme === "dark"
              ? darkTheme({
                  ...darkTheme.accentColors.pink,
                  accentColor: "#ffffff",
                  accentColorForeground: "#000000",
                })
              : lightTheme({
                  ...lightTheme.accentColors.pink,
                  accentColor: "#000000",
                  accentColorForeground: "#ffffff",
                })
          }
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
