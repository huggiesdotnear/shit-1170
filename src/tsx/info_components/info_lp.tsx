

import { useState, useEffect } from 'react';
import { fetchAllPoolsInfo, type PoolInfo } from '../../ts/info/shit_lp_price';

const App_section_info_lp = () => {
    const [poolsData, setPoolsData] = useState<PoolInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPoolsData = async () => {
            try {
                setLoading(true);
                const data = await fetchAllPoolsInfo();
                setPoolsData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load pools data');
            } finally {
                setLoading(false);
            }
        };

        loadPoolsData();
    }, []);

    const formatPrice = (price: number): string => {
        if (price < 0.000001) return price.toExponential(3);
        if (price < 0.01) return price.toFixed(6);
        return price.toFixed(4);
    };

    const formatTVL = (tvl: number): string => {
        if (tvl >= 1000000) return `$${(tvl / 1000000).toFixed(2)}M`;
        if (tvl >= 1000) return `$${(tvl / 1000).toFixed(2)}K`;
        return `$${tvl.toFixed(2)}`;
    };

    const getTotalTVL = (): number => {
        return poolsData.reduce((sum, pool) => sum + pool.tvl_usd, 0);
    };

    const getAverageShitPrice = (): number => {
        const validPrices = poolsData.filter(pool => pool.shit_price_usd > 0);
        if (validPrices.length === 0) return 0;
        return validPrices.reduce((sum, pool) => sum + pool.shit_price_usd, 0) / validPrices.length;
    };

    if (loading) {
        return (
            <div className="info_lp">
                <div className="loading">Loading pools data...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="info_lp">
                <div className="error">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="info_lp">
            <div className="lp-header">
                <div className="lp-stat">
                    <h3>Total TVL</h3>
                    <div className="stat-value">{formatTVL(getTotalTVL())}</div>
                </div>
                <div className="lp-stat">
                    <h3>Pools</h3>
                    <div className="stat-value">{poolsData.length}</div>
                </div>
                <div className="lp-stat">
                    <h3>Avg SHIT Price</h3>
                    <div className="stat-value">${formatPrice(getAverageShitPrice())}</div>
                </div>
            </div>

            <div className="price-section">
                <h3>SHIT Price Across Pairs</h3>
                <div className="price-grid">
                    {poolsData.map((pool) => (
                        <div key={pool.pool_id} className="price-card">
                            <div className="pair-name">
                                {pool.token0_symbol}/{pool.token1_symbol}
                            </div>
                            <div className="price-value">
                                ${formatPrice(pool.shit_price_usd)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pools-section">
                <h3>Liquidity Pools</h3>
                <div className="pools-grid">
                    {poolsData.map((pool) => (
                        <div key={pool.pool_id} className="pool-card">
                            <div className="pool-header">
                                <div className="pool-pair">
                                    <span className="token-icon">💧</span>
                                    <span>{pool.token0_symbol}/{pool.token1_symbol}</span>
                                </div>
                                <div className="pool-id">#{pool.pool_id}</div>
                            </div>
                            <div className="pool-stats">
                                <div className="pool-stat">
                                    <span className="stat-label">TVL</span>
                                    <span className="stat-value">{formatTVL(pool.tvl_usd)}</span>
                                </div>
                                <div className="pool-stat">
                                    <span className="stat-label">SHIT Price</span>
                                    <span className="stat-value">${formatPrice(pool.shit_price_usd)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App_section_info_lp;