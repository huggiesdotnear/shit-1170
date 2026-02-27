use crate::logic::enum_route::SHIT_APP_ROUTE;
use dioxus::prelude::*;
use gloo_timers::future::TimeoutFuture;
use wasm_bindgen_futures::spawn_local;
// =========================================
// PAGE_HOME
#[component]
pub fn PAGE_HOME() -> Element {
    let router = use_router();

    use_effect(move || {
        // run once on mount
        redirect_after(router.clone(), 3000, SHIT_APP_ROUTE::PAGE_HOLDERS {});
    });
    rsx! {
        h1 { "HOME" }
    }
}
// =========================================
// generic helper: redirect after `delay_ms` to any Route
fn redirect_after(router: Router, delay_ms: u32, target: SHIT_APP_ROUTE) {
    spawn_local(async move {
        TimeoutFuture::new(delay_ms).await;
        router.push(target);
    });
}
// =========================================
// =========================================
// copyright 2026 by sleet.near
