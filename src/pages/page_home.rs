use dioxus::prelude::*;
use gloo_timers::future::TimeoutFuture;
use wasm_bindgen_futures::spawn_local;
use web_sys::window;
// =========================================
// PAGE_HOME
#[component]
pub fn PAGE_HOME() -> Element {
    use_effect(move || {
        redirect_after(3000, "/holders");
    });
    rsx! {
        h1 { "HOME" }
    }
}
// =========================================
// generic helper: redirect after `delay_ms` using window.location
fn redirect_after(delay_ms: u32, path: &str) {
    let path = path.to_string();
    spawn_local(async move {
        TimeoutFuture::new(delay_ms).await;
        if let Some(win) = window() {
            win.location().set_href(&path).ok();
        }
    });
}
// =========================================
// =========================================
// copyright 2026 by sleet.near
