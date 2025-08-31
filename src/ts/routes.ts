// routes.ts
export const ROUTES = {
    home: { path: '/', label: 'HOME' },
    swap: { path: '/swap', label: 'SWAP' },
    info: { path: '/info', label: 'ONCHAIN' },
    huggies: { path: '/huggies', label: 'HUGGIES' },
  } as const;
  
  export type RouteKey = keyof typeof ROUTES;