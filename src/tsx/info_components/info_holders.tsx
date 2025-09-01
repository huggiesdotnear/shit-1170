
import { useState, useEffect } from 'react';
import { fetchHolders, type ProcessedHolder } from '../../ts/info/shit_holders';

const App_section_info_holders = () => {
    const [holders, setHolders] = useState<ProcessedHolder[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadHolders = async () => {
            try {
                setLoading(true);
                const holdersData = await fetchHolders();
                setHolders(holdersData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load holders');
            } finally {
                setLoading(false);
            }
        };

        loadHolders();
    }, []);

    const getTypeIcon = (type: ProcessedHolder['type']) => {
        switch (type) {
            case 'dev': return '👨‍💻';
            case 'dex': return '🔄';
            case 'nft': return '🖼️';
            default: return '👤';
        }
    };

    const getTypeColor = (type: ProcessedHolder['type']) => {
        switch (type) {
            case 'dev': return '#4CAF50';
            case 'dex': return '#2196F3';
            case 'nft': return '#FF9800';
            default: return '#757575';
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
            <h5>holders ({holders.length})</h5>
            <div className="holders-list">
                {holders.map((holder, index) => (
                    <div 
                        key={holder.account_id} 
                        className={`holder-item ${holder.type}`}
                        style={{ borderLeft: `3px solid ${getTypeColor(holder.type)}` }}
                    >
                        <div className="holder-rank">#{index + 1}</div>
                        <span className="type-icon">{getTypeIcon(holder.type)}</span>
                        <span className="account-id">{holder.account_id}</span>
                        <div className="holder-stats">
                            <span className="holder-balance">{holder.balanceFormatted}</span>
                            <span className="holder-percentage">({holder.percentage})</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App_section_info_holders;