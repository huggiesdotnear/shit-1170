#![allow(non_camel_case_types)]
// =========================================
use dioxus::prelude::*;
use shit_1170::pages::page_about::PAGE_ABOUT;
use shit_1170::pages::page_holders::PAGE_HOLDERS;
use shit_1170::pages::page_home::PAGE_HOME;
use shit_1170::pages::page_pools::PAGE_POOLS;
// =========================================
// =========================================
// SHIT_APP_ROUTE
#[derive(Debug, Clone, Routable, PartialEq)]
enum SHIT_APP_ROUTE {
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
// =========================================
// =========================================
const FAVICON: Asset = asset!("/assets/shit_icon_blue.svg");
const MAIN_CSS: Asset = asset!("/assets/main.css");
// =========================================
// =========================================
// main
fn main() {
    dioxus::launch(App);
}
// =========================================
// =========================================
#[component]
fn App() -> Element {
    rsx! {
        document::Link { rel: "icon", href: FAVICON }
        document::Link { rel: "stylesheet", href: MAIN_CSS }
        Router::<SHIT_APP_ROUTE> {}
    }
}
// =========================================
// =========================================
/// MAIN_APP
#[component]
fn MAIN_APP() -> Element {
    rsx! {
        h1 { "shit-1170.meme-cooking.near" }
        div {
            id: "navbar",
            Link {
                to: SHIT_APP_ROUTE::PAGE_HOME {},
                "Home"
            }
        }

        Outlet::<SHIT_APP_ROUTE> {}
    }
}
// =========================================
// =========================================
// copyright 2026 by sleet.near
