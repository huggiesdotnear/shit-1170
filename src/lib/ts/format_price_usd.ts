// format_price_usd
// ============================================
export function format_price_usd(price_usd: string): string {
	return parseFloat(price_usd).toFixed(18).replace(/\.?0+$/, "");
}
// ============================================