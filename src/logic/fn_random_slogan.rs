use rand::prelude::*;
use crate::logic::const_slogans::HUGGIES_SLOGANS;
// =========================================
pub fn random_slogan() -> &'static str {
    let mut rng = rand::rng(); // <- function, not module
    let idx = rng.random_range(0..HUGGIES_SLOGANS.len());
    HUGGIES_SLOGANS[idx]
}