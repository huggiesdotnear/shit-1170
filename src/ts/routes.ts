// routes.ts
export const ROUTES = {
    home: { path: '/', label: 'HOME' },
    swap: { path: '/swap', label: 'SWAP' },
    info: { path: '/info', label: 'INFO' },
  } as const;
  
  export type RouteKey = keyof typeof ROUTES;