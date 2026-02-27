use crate::logic::const_slogans::HUGGIES_SLOGANS;
use getrandom::getrandom;
// =========================================
fn random_u64() -> Result<u64, getrandom::Error> {
    let mut bytes = [0u8; 8];
    getrandom(&mut bytes)?;
    Ok(u64::from_le_bytes(bytes))
}

pub fn random_slogan() -> &'static str {
    let len = HUGGIES_SLOGANS.len() as u64;

    // Infallible enough for your use: if getrandom fails, just fall back to index 0.
    let idx = match random_u64() {
        Ok(n) if len > 0 => (n % len) as usize,
        _ => 0,
    };

    HUGGIES_SLOGANS[idx]
}
// =========================================
// copyright 2026 by sleet.near
