// Holders
// https://api.fastnear.com/v1/ft/shit-1170.meme-cooking.near/top
// this returns the top 100 holders

export interface HolderAccount {
    account_id: string;
    balance: string;
}

export interface HoldersResponse {
    accounts: HolderAccount[];
}

export interface ProcessedHolder extends HolderAccount {
    type: 'dev' | 'dex' | 'nft' | 'regular';
    balanceFormatted: string;
    percentage: string;
}

// Known accounts mapping
const KNOWN_ACCOUNTS: Record<string, 'dev' | 'dex' | 'nft'> = {
    'sleet.near': 'dev',
    'hugges.near': 'dev',
    'v2.ref-finance.near': 'dex',
    'notdone.near': 'nft',
    'outwit.near': 'nft',
};

const TOTAL_SUPPLY = 1_000_000_000; // 1 billion tokens

// Format balance from wei-like format to readable number
const formatBalance = (balance: string): string => {
    const num = BigInt(balance);
    const divisor = BigInt('1000000000000000000'); // 18 decimals
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
    const divisor = BigInt('1000000000000000000'); // 18 decimals
    const formatted = Number(num / divisor);
    const percentage = (formatted / TOTAL_SUPPLY) * 100;

    if (percentage >= 0.01) {
        return `${percentage.toFixed(2)}%`;
    } else if (percentage >= 0.001) {
        return `${percentage.toFixed(3)}%`;
    } else {
        return '<0.001%';
    }
};

// Process holders data
const processHolders = (holders: HolderAccount[]): ProcessedHolder[] => {
    return holders.map(holder => {
        const knownType = KNOWN_ACCOUNTS[holder.account_id];
        return {
            ...holder,
            type: knownType || 'regular',
            balanceFormatted: formatBalance(holder.balance),
            percentage: calculatePercentage(holder.balance)
        };
    });
};

// Fetch holders data
export const fetchHolders = async (): Promise<ProcessedHolder[]> => {
    try {
        const response = await fetch('https://api.fastnear.com/v1/ft/shit-1170.meme-cooking.near/top');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: HoldersResponse = await response.json();
        return processHolders(data.accounts);
    } catch (error) {
        console.error('Error fetching holders:', error);
        throw error;
    }
};