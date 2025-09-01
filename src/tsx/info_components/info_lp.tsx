

import { useState, useEffect } from 'react';
import { fetchAllPoolsInfo, fetchShitPrice, type PoolInfo } from '../../ts/info/shit_lp_price';

const App_section_info_lp = () => {
    const [poolsData, setPoolsData] = useState<PoolInfo[]>([]);
    const [shitPrice, setShitPrice] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const [poolsData, shitPriceData] = await Promise.all([
                    fetchAllPoolsInfo(),
                    fetchShitPrice()
                ]);
                setPoolsData(poolsData);
                setShitPrice(shitPriceData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load data');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const formatPrice = (price: number): string => {
        if (price === 0) return '0.000000';
        if (price < 0.000001) return price.toFixed(8);
        if (price < 0.01) return price.toFixed(6);
        return price.toFixed(4);
    };

    const formatTokenAmount = (amount: number): string => {
        if (amount >= 1000000) return `${(amount / 1000000).toFixed(2)}M`;
        if (amount >= 1000) return `${(amount / 1000).toFixed(2)}K`;
        if (amount < 0.01) return amount.toFixed(6);
        return amount.toFixed(2);
    };

    const formatTVL = (tvl: number): string => {
        if (tvl >= 1000000) return `$${(tvl / 1000000).toFixed(2)}M`;
        if (tvl >= 1000) return `$${(tvl / 1000).toFixed(2)}K`;
        return `$${tvl.toFixed(2)}`;
    };

    const getTotalTVL = (): number => {
        return poolsData.reduce((sum, pool) => sum + pool.tvl_usd, 0);
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
                    <h3>SHIT Price</h3>
                    <div className="stat-value">${formatPrice(shitPrice)}</div>
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
                                    <span className="stat-value">${formatTVL(pool.tvl_usd)}</span>
                                </div>
                            </div>
                            <div className="token-amounts">
                                <div className="token-amount">
                                    <span className="token-symbol">{pool.token0_symbol}</span>
                                    <div>
                                        <span className="amount-value">{formatTokenAmount(pool.token0_amount_human)}</span>
                                        <span className="usd-value"> (${formatTVL(pool.token0_usd_value)})</span>
                                    </div>
                                </div>
                                <div className="token-amount">
                                    <span className="token-symbol">{pool.token1_symbol}</span>
                                    <div>
                                        <span className="amount-value">{formatTokenAmount(pool.token1_amount_human)}</span>
                                        <span className="usd-value"> (${formatTVL(pool.token1_usd_value)})</span>
                                    </div>
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