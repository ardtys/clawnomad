export type PlatformType = "web2" | "web3" | "moltworld";

export type TravelStatus = "success" | "pending" | "intercepted";

export interface TravelEvent {
  id: string;
  timestamp: Date;
  source: {
    platform: PlatformType;
    name: string;
    icon?: string;
  };
  destination: {
    platform: PlatformType;
    name: string;
    icon?: string;
  };
  status: TravelStatus;
  action: string;
  description: string;
  txHash?: string;
  gasUsed?: string;
  intelligenceLogs?: string[];
}

export interface AgentProfile {
  id: string;
  name: string;
  reputationScore: number;
  currentStatus: string;
  currentPlatform: PlatformType;
  totalTravels: number;
  successRate: number;
  encryptedMemory: boolean;
}

export interface Permission {
  id: string;
  category: "web2" | "web3" | "moltworld";
  name: string;
  description: string;
  enabled: boolean;
  limit?: string;
  mode?: "manual" | "autonomous";
}
