import { useState, useEffect } from "react";
import { fetchHolders, type ProcessedHolder } from "../../ts/info/shit_holders";
import { fetchShitPrice } from "../../ts/info/shit_lp_price_ref";

const App_section_info_holders = () => {
  const [holders, setHolders] = useState<ProcessedHolder[]>([]);
  const [filteredHolders, setFilteredHolders] = useState<ProcessedHolder[]>([]);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "dev" | "dex" | "nft" | "vault" | "burn"
  >("all");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shitPrice, setShitPrice] = useState<number>(0);

  const loadHolders = async (forceRefresh = false) => {
    try {
      setLoading(true);
      const [holdersData, priceData] = await Promise.all([
        fetchHolders(forceRefresh),
        fetchShitPrice(),
      ]);
      setHolders(holdersData);
      setFilteredHolders(holdersData);
      setShitPrice(priceData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load holders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHolders();
  }, []);

  // Filter holders when activeFilter or holders change
  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredHolders(holders);
    } else {
      setFilteredHolders(
        holders.filter((holder) => holder.type === activeFilter),
      );
    }
  }, [activeFilter, holders]);

  const handleFilterClick = (
    filter: "all" | "dev" | "dex" | "vault" | "nft" | "burn",
  ) => {
    setActiveFilter(filter);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setError(null);
    try {
      await loadHolders(true);
    } finally {
      setRefreshing(false);
    }
  };

  const getTypeIcon = (type: ProcessedHolder["type"]) => {
    switch (type) {
      case "dev":
        return "👨‍💻";
      case "vault":
        return "🏦";
      case "dex":
        return "🔄";
      case "nft":
        return "🖼️";
      case "burn":
        return "🔥";
      default:
        return "👤";
    }
  };

  const calculateUsdValue = (balance: string): string => {
    if (!shitPrice) return "$0.00";

    const num = BigInt(balance);
    const divisor = BigInt("1000000000000000000"); // 18 decimals
    const tokenAmount = Number(num / divisor);
    const usdValue = tokenAmount * shitPrice;

    if (usdValue >= 1000000) {
      return `$${(usdValue / 1000000).toFixed(2)}M`;
    } else if (usdValue >= 1000) {
      return `$${(usdValue / 1000).toFixed(2)}K`;
    } else if (usdValue >= 1) {
      return `$${usdValue.toFixed(2)}`;
    } else {
      return `$${usdValue.toFixed(4)}`;
    }
  };

  if (loading) {
    return (
      <div className="info_holders">
        <h5>holders</h5>
        <div className="loading">Loading holders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="info_holders">
        <h5>holders</h5>
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="info_holders">
      <h5>holders</h5>

      <div className="filter-buttons">
        <button
          className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
          onClick={() => handleFilterClick("all")}
        >
          ALL
        </button>
        <button
          className={`filter-btn ${activeFilter === "dev" ? "active" : ""}`}
          onClick={() => handleFilterClick("dev")}
        >
          👨‍💻
        </button>
        <button
          className={`filter-btn ${activeFilter === "dex" ? "active" : ""}`}
          onClick={() => handleFilterClick("dex")}
        >
          🔄
        </button>
        <button
          className={`filter-btn ${activeFilter === "nft" ? "active" : ""}`}
          onClick={() => handleFilterClick("nft")}
        >
          🖼️
        </button>
        <button
          className={`filter-btn ${activeFilter === "vault" ? "active" : ""}`}
          onClick={() => handleFilterClick("vault")}
        >
          🏦
        </button>
        <button
          className={`filter-btn ${activeFilter === "burn" ? "active" : ""}`}
          onClick={() => handleFilterClick("burn")}
        >
          🔥
        </button>
      </div>

      <div className="holders-list">
        {filteredHolders.map((holder, index) => (
          <div key={holder.account_id} className={`holder-item ${holder.type}`}>
            <div className="holder-left">
              <span className="holder-rank">#{index + 1}</span>
              <span className="type-icon">{getTypeIcon(holder.type)}</span>
              <span className="account-id">{holder.account_id}</span>
            </div>
            <div className="holder-right">
              <span className="holder-balance">
                {holder.balanceFormatted} ({calculateUsdValue(holder.balance)})
              </span>
              <span className="holder-percentage">{holder.percentage}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="refresh-section">
        <button
          className="refresh-btn"
          onClick={handleRefresh}
          disabled={refreshing}
        >
          {refreshing ? "🔄 Refreshing..." : "🔄 Refresh Data"}
        </button>
      </div>
      <p>
        🖼️ these near accounts are available as NFTs on{" "}
        <a href="https://namesky.app/" target="_blank">
          namesky
        </a>
      </p>
    </div>
  );
};

export default App_section_info_holders;
