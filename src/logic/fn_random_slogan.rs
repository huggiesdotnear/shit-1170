use crate::logic::const_slogans::HUGGIES_SLOGANS;
use web_sys::window;
// =========================================
fn random_usize() -> usize {
    window()
        .and_then(|w| w.crypto().ok())
        .and_then(|crypto| {
            let mut array = [0u8; 4];
            crypto.get_random_values_with_u8_array(&mut array).ok()?;
            Some(u32::from_le_bytes(array) as usize)
        })
        .unwrap_or(0)
}
// =========================================
pub fn random_slogan() -> &'static str {
    let len = HUGGIES_SLOGANS.len();
    let idx = if len > 0 { random_usize() % len } else { 0 };
    HUGGIES_SLOGANS[idx]
}
// =========================================
// copyright 2026 by sleet.near
