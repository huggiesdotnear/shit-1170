// Token interface definition
export interface Token {
    name: string;
    ca: string; // Contract address
    decimals: number;
}

// Ref Finance configuration interface
export interface RefFinanceConfig {
    contractAddress: string;
    version: string;
    lpPools: number[];
}

// Token configurations
export const TOKENS: Record<string, Token> = {
    SHIT: {
        name: "SHIT",
        ca: "shit-1170.meme-cooking.near",
        decimals: 18
    },
    JAMBO: {
        name: "JAMBO",
        ca: "jambo-1679.meme-cooking.near",
        decimals: 18
    },
    PUMP: {
        name: "PUMPOPOLY",
        ca: "token.pumpopoly.near",
        decimals: 18
    },
    CRANS: {
        name: "CRANS",
        ca: "crans.tkn.near",
        decimals: 18
    },
    NEAR: {
        name: "NEAR",
        ca: "near",
        decimals: 24
    },
    DOGSHIT: {
        name: "DOGSHIT",
        ca: "dogshit-1408.meme-cooking.near",
        decimals: 18
    },
    BLACKDRAGON: {
        name: "BLACKDRAGON",
        ca: "blackdragon.tkn.near",
        decimals: 24
    },
    KAT: {
        name: "KAT",
        ca: "kat.token0.near",
        decimals: 18
    }
};

// Ref Finance V2 configuration
export const REF_FINANCE_CONFIG: RefFinanceConfig = {
    contractAddress: "v2.ref-finance.near",
    version: "v2",
    lpPools: [5767, 6525, 6524, 6526]
};

// Helper functions
export const getTokenByCA = (contractAddress: string): Token | undefined => {
    return Object.values(TOKENS).find(token => token.ca === contractAddress);
};

export const getTokenByName = (name: string): Token | undefined => {
    return TOKENS[name.toUpperCase()];
};

export const isValidLPPool = (poolId: number): boolean => {
    return REF_FINANCE_CONFIG.lpPools.includes(poolId);
};

// Export all token contract addresses as a convenient array
export const TOKEN_ADDRESSES = Object.values(TOKENS).map(token => token.ca);