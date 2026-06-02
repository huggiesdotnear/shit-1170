import { near_kit_env } from "@near-kit-tool-box/env";
import { ft_metadata_fun } from "@near-kit-tool-box/fun";
import type { FT_METADATA_TYPE } from "@near-kit-tool-box/fun";
// ============================================
const ft_metadata: FT_METADATA_TYPE = await ft_metadata_fun(near_kit_env, "shit-1170.meme-cooking.near")
// ============================================
console.log(ft_metadata.name)
console.log(ft_metadata.decimals)
console.log(ft_metadata.symbol)
console.log(ft_metadata.icon)