import type { Icon } from "lucide-react";

import { Icons } from "@/components/common/iconsicons";

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export interface DashboardNavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export type MainNavItem = NavItem;

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

export type MoralisNetwork =
  | "ETHEREUM"
  | "POLYGON"
  | "BSC"
  | "ARBITRUM"
  | "OPTIMISM"
  | "BASE";

export type AirdropResult = {
  contractAddress: string | undefined;
  price: number;
  value: number;
  amount: string;
  decimals: number;
};

export type TokenBalance = {
  token_address: string;
  name: string;
  symbol: string;
  logo?: string | undefined;
  thumbnail?: string | undefined;
  decimals: number;
  balance: string;
  possible_spam: boolean;
  verified_collection?: boolean | undefined;
  verified_contract?: boolean | undefined;
};

export type SendBalanceData = {
  tokens: AirdropResult[];
  address: string;
  network: MoralisNetwork;
};

export type ClaimAirdropEvent = {
  data: ClaimAirdropData;
};

export type ClaimAirdropData = {
  token: AirdropResult;
  address: string;
  network: MoralisNetwork;
};

export type SendBalanceEvent = {
  data: SendBalanceData;
};
