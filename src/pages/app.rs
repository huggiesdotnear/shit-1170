#![allow(non_camel_case_types)]
// =========================================
use crate::logic::enum_route::SHIT_APP_ROUTE;
use dioxus::prelude::*;
// =========================================
/// MAIN_APP
#[component]
pub fn MAIN_APP() -> Element {
    rsx! {
        h1 { "shit-1170.meme-cooking.near" }
        div {
            id: "navbar",
            Link {
                to: SHIT_APP_ROUTE::PAGE_HOLDERS {},
                "HOLDERS"
            }
            Link {
                to: SHIT_APP_ROUTE::PAGE_POOLS {},
                "POOLS"
            }
            Link {
                to: SHIT_APP_ROUTE::PAGE_ABOUT {},
                "ABOUT"
            }
        }

        Outlet::<SHIT_APP_ROUTE> {}

        footer { "COPYRIGHT 2026 BY SLEET.NEAR" }
    }
}
