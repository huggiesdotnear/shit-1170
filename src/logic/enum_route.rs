#![allow(non_camel_case_types)]
// =========================================
use crate::pages::app::MAIN_APP;
use crate::pages::page_about::PAGE_ABOUT;
use crate::pages::page_holders::PAGE_HOLDERS;
use crate::pages::page_home::PAGE_HOME;
use crate::pages::page_pools::PAGE_POOLS;
use dioxus::prelude::*;
// =========================================
// SHIT_APP_ROUTE
#[derive(Debug, Clone, Routable, PartialEq)]
pub enum SHIT_APP_ROUTE {
    #[layout(MAIN_APP)]
    #[route("/")]
    PAGE_HOME {},
    #[route("/holders")]
    PAGE_HOLDERS {},
    #[route("/pools")]
    PAGE_POOLS {},
    #[route("/about")]
    PAGE_ABOUT {},
}
