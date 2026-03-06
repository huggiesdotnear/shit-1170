// Holders
// https://api.fastnear.com/v1/ft/shit-1170.meme-cooking.near/top
// this returns the top 100 holders

const CACHE_KEY = "shit_holders_cache";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export interface HolderAccount {
  account_id: string;
  balance: string;
}

export interface HoldersResponse {
  accounts: HolderAccount[];
}

export interface ProcessedHolder extends HolderAccount {
  type: "dev" | "dex" | "nft" | "regular" | "vault" | "burn";
  balanceFormatted: string;
  percentage: string;
}

interface CachedData {
  holders: ProcessedHolder[];
  timestamp: number;
}

// Known accounts mapping
const KNOWN_ACCOUNTS: Record<string, "dev" | "dex" | "vault" | "nft" | "burn"> = {
  "sleet.near": "dev",
  "vault.huggies.near": "vault",
  "growth.huggies.near": "vault",
  "ref.huggies.near": "vault",
  "sleet_mainnet_test_yes_doxing_myself_sorry_for_rugs.near": "dev",
  "huggies.near": "dev",
  "nonresistant.near": "dev",
  "nonresistantreally.tg": "dev",
  "shitbyhuggies.tipbot.intear.near": "dev",
  "v2.ref-finance.near": "dex",
  "veax.near": "dex",
  "dex.intear.near": "dex",
  "notdone.near": "nft",
  "outwit.near": "nft",
  "fediverse.near": "nft",
  "waffel.near": "nft",
  "utes.near": "nft",
  "powwow.near": "nft",
  "nearnexus.near": "nft",
  "hodldogshit.near": "nft",
  "sofo.near": "nft",
  "jeetersnotallowed.near": "nft",
  "ironclaw.near": "nft",
  "chicago.near": "nft",
  "burn.sleet.near": "burn",
};

const TOTAL_SUPPLY = 1_000_000_000; // 1 billion tokens

// Format balance from wei-like format to readable number
const formatBalance = (balance: string): string => {
  const num = BigInt(balance);
  const divisor = BigInt("1000000000000000000"); // 18 decimals
  const formatted = Number(num / divisor);

  if (formatted >= 1000000000) {
    return `${(formatted / 1000000000).toFixed(2)}B`;
  } else if (formatted >= 1000000) {
    return `${(formatted / 1000000).toFixed(2)}M`;
  } else if (formatted >= 1000) {
    return `${(formatted / 1000).toFixed(2)}K`;
  }
  return formatted.toFixed(2);
};

// Calculate percentage of total supply
const calculatePercentage = (balance: string): string => {
  const num = BigInt(balance);
  const divisor = BigInt("1000000000000000000"); // 18 decimals
  const formatted = Number(num / divisor);
  const percentage = (formatted / TOTAL_SUPPLY) * 100;

  if (percentage >= 0.01) {
    return `${percentage.toFixed(2)}%`;
  } else if (percentage >= 0.001) {
    return `${percentage.toFixed(3)}%`;
  } else {
    return "<0.001%";
  }
};

// Cache functions
const getCachedHolders = (): ProcessedHolder[] | null => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) {
      console.log("💾 No cached holders found");
      return null;
    }

    const data: CachedData = JSON.parse(cached);
    const now = Date.now();

    if (now - data.timestamp > CACHE_DURATION) {
      console.log("⏰ Cached holders expired");
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    console.log("✅ Using cached holders data");
    return data.holders;
  } catch (error) {
    console.error("❌ Error reading cache:", error);
    localStorage.removeItem(CACHE_KEY);
    return null;
  }
};

const setCachedHolders = (holders: ProcessedHolder[]): void => {
  try {
    const data: CachedData = {
      holders,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    console.log("💾 Cached holders data");
  } catch (error) {
    console.error("❌ Error caching data:", error);
  }
};

// Process holders data
const processHolders = (holders: HolderAccount[]): ProcessedHolder[] => {
  console.log("🔧 Processing holders data...");

  return holders.map((holder, index) => {
    const knownType = KNOWN_ACCOUNTS[holder.account_id];
    const processed = {
      ...holder,
      type: knownType || "regular",
      balanceFormatted: formatBalance(holder.balance),
      percentage: calculatePercentage(holder.balance),
    };

    // Log first 5 and any known accounts
    if (index < 5 || knownType) {
      console.log(`📋 #${index + 1} ${holder.account_id}:`, {
        type: processed.type,
        balance: processed.balanceFormatted,
        percentage: processed.percentage,
        rawBalance: holder.balance,
      });
    }

    return processed;
  });
};

// Fetch holders data
export const fetchHolders = async (
  forceRefresh = false,
): Promise<ProcessedHolder[]> => {
  // Check cache first (unless force refresh)
  if (!forceRefresh) {
    const cachedHolders = getCachedHolders();
    if (cachedHolders) {
      return cachedHolders;
    }
  } else {
    console.log("🔄 Force refresh requested, skipping cache");
  }

  try {
    console.log("🔄 Fetching fresh holders data...");
    const response = await fetch(
      "https://api.fastnear.com/v1/ft/shit-1170.meme-cooking.near/top",
    );

    if (!response.ok) {
      console.error("❌ HTTP error:", response.status, response.statusText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: HoldersResponse = await response.json();
    console.log("📊 Raw holders data:", data);
    console.log(`📈 Total holders received: ${data.accounts.length}`);

    const processedHolders = processHolders(data.accounts);
    console.log("✅ Processed holders:", processedHolders);

    // Log known accounts found
    const knownAccounts = processedHolders.filter((h) => h.type !== "regular");
    console.log(
      `🎯 Known accounts found: ${knownAccounts.length}`,
      knownAccounts.map((h) => `${h.account_id} (${h.type})`),
    );

    // Cache the results
    setCachedHolders(processedHolders);

    return processedHolders;
  } catch (error) {
    console.error("💥 Error fetching holders:", error);
    throw error;
  }
};
