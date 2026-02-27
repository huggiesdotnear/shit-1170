#![allow(non_camel_case_types)]
// =========================================
use dioxus::prelude::*;
use shit_1170::logic::enum_route::SHIT_APP_ROUTE;
use shit_1170::logic::hello::hello;
// =========================================
// =========================================
const FAVICON: Asset = asset!("/assets/shit_icon_blue.svg");
const MAIN_CSS: Asset = asset!("/assets/main.css");
const A_CSS: Asset = asset!("/assets/a.css");
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
    use_effect(|| {
        hello();
    });
    rsx! {
        document::Link { rel: "icon", href: FAVICON }
        document::Link { rel: "stylesheet", href: MAIN_CSS }
        document::Link { rel: "stylesheet", href: A_CSS }
        Router::<SHIT_APP_ROUTE> {}
    }
}
// =========================================
// =========================================
// copyright 2026 by sleet.near
