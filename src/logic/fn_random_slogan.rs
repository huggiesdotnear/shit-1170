use crate::logic::const_slogans::HUGGIES_SLOGANS;
use rand::prelude::*;
// =========================================
pub fn random_slogan() -> &'static str {
    let mut rng = rand::rng();
    let idx = rng.random_range(0..HUGGIES_SLOGANS.len());
    HUGGIES_SLOGANS[idx]
}
// =========================================
// copyright 2026 by sleet.near
