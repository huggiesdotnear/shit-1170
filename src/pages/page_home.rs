use dioxus::prelude::*;
use dioxus::prelude::use_navigator;
use gloo_timers::future::TimeoutFuture;
use wasm_bindgen_futures::spawn_local;
use crate::logic::enum_route::SHIT_APP_ROUTE;
// =========================================
// PAGE_HOME
#[component]
pub fn PAGE_HOME() -> Element {
    let nav = use_navigator();
    use_effect(move || {
        redirect_to_target_after_3s(nav.clone());
    });
    rsx! {
        h1 { "HOME" }
    }
}
// =========================================
// generic helper: redirect after `delay_ms` to any Route
fn redirect_after(nav: Navigator, delay_ms: u32, target: SHIT_APP_ROUTE) {
    spawn_local(async move {
        TimeoutFuture::new(delay_ms).await;
        nav.push(target);
    });
}
fn redirect_to_target_after_3s(nav: Navigator) {
    redirect_after(nav, 3000, SHIT_APP_ROUTE::PAGE_HOLDERS {});
}
// =========================================
// =========================================
// copyright 2026 by sleet.near
