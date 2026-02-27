import type { FunctionalComponent } from "preact";

// info_components
import App_section_info_holders from "./info_components/info_holders";
import App_section_info_lp from "./info_components/info_lp";
import App_section_info_links from "./info_components/info_links";

// App_section_info.tsx
const App_section_info: FunctionalComponent<{ path?: string }> = () => {
  return (
    <section className="section_info">
      <h3>shit-1170.meme-cooking.near</h3>
      <App_section_info_holders />
      <App_section_info_lp />
      <App_section_info_links />
      <p>COPYRIGHT 2026 BY SLEET.NEAR</p>
    </section>
  );
};

export default App_section_info;
