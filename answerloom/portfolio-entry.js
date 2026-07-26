(() => {
  const cardMarkup = `
    <article id="answerloom-project" class="al-portfolio-card" aria-labelledby="answerloom-title">
      <div class="al-portfolio-eyebrow">
        <span>03 / GEO PRODUCT</span>
        <span>独立产品设计与开发 · 2026</span>
      </div>
      <div class="al-portfolio-copy">
        <div class="al-portfolio-brand">
          <img src="./answerloom/logo.svg" alt="" />
          <strong id="answerloom-title">Answer<span>Loom</span></strong>
        </div>
        <h4>把 AI 搜索里的品牌黑盒，变成一条可执行的优化工作流。</h4>
        <p>面向个人开发者的生成式引擎优化工作台：从品牌建档、模型检测和分析报告，到内容审核、发布、监控与复测，形成完整闭环。下方通过可点击步骤与真实产品截图，展示一条完整的 GEO 优化案例。</p>
        <div class="al-portfolio-tags" aria-label="AnswerLoom 核心能力">
          <span>GEO / AEO</span>
          <span>多模型检测</span>
          <span>内容优化</span>
          <span>人工审核</span>
          <span>发布复测</span>
        </div>
      </div>
      <div class="al-flow-heading">
        <span>INTERACTIVE PRODUCT CASE / 交互式产品案例</span>
        <strong>从建立项目，到分析、优化、发布与复测。</strong>
        <small>交互步骤结合真实产品界面，案例数据仅用于演示</small>
      </div>
      <div class="al-flow-gallery" data-template-slot="answerloom" aria-label="AnswerLoom 交互式模板演示"></div>
    </article>
  `;

  const atlasMarkup = `
    <section id="product-atlas-entry" class="atlas-portfolio-entry" aria-labelledby="product-atlas-title">
      <div class="atlas-entry-topline">
        <span>PRODUCT SYSTEMS ATLAS / 交互式产品系统图谱</span>
        <span>03 PRODUCTS · 70+ NODES</span>
      </div>
      <div class="atlas-entry-layout">
        <div>
          <p>BEYOND THE INTERFACE</p>
          <h3 id="product-atlas-title">看见产品<br />如何真正运转。</h3>
        </div>
        <div class="atlas-entry-copy">
          <p>从用户、业务闭环、AI 链路到数据底座，交互式拆解 MUYU、MinuteFlow 与 AnswerLoom。每一个节点都可以点击并查看它的职责、价值和上下游关系。</p>
          <a href="./product-atlas/index.html">
            进入产品系统图谱
            <span>↗</span>
          </a>
        </div>
      </div>
      <div class="atlas-entry-products" aria-hidden="true">
        <span><b>01</b> MUYU</span>
        <span><b>02</b> MinuteFlow</span>
        <span><b>03</b> AnswerLoom</span>
      </div>
    </section>
  `;

  function mountAnswerLoom() {
    const work = document.querySelector("#work");
    if (!work) return false;

    if (!document.querySelector("#answerloom-project")) {
      const articles = work.querySelectorAll("article");
      const anchor = articles[articles.length - 1];
      if (!anchor) return false;
      anchor.insertAdjacentHTML("afterend", cardMarkup);
    }

    const answerLoomProject = document.querySelector("#answerloom-project");
    if (answerLoomProject && !document.querySelector("#product-atlas-entry")) {
      answerLoomProject.insertAdjacentHTML("afterend", atlasMarkup);
    }

    const nav = document.querySelector('nav[aria-label="主导航"]');
    if (nav && !nav.querySelector(".al-nav-link")) {
      const link = document.createElement("a");
      link.href = "#answerloom-project";
      link.className = "al-nav-link";
      link.textContent = "AnswerLoom";
      nav.append(link);
    }

    if (nav && !nav.querySelector(".atlas-nav-link")) {
      const atlasLink = document.createElement("a");
      atlasLink.href = "./product-atlas/index.html";
      atlasLink.className = "atlas-nav-link";
      atlasLink.textContent = "系统图谱";
      nav.append(atlasLink);
    }

    const productCount = Array.from(document.querySelectorAll("strong")).find(
      (node) =>
        node.textContent?.trim() === "02" &&
        node.parentElement?.textContent?.includes("上线 AI 产品"),
    );
    if (productCount) productCount.textContent = "03";

    const resume = document.querySelector("#resume");
    if (resume) {
      const resumeIndex = Array.from(resume.querySelectorAll("*")).find(
        (node) =>
          node.children.length === 0 && node.textContent?.trim() === "03",
      );
      if (resumeIndex) resumeIndex.textContent = "04";
    }

    return true;
  }

  function boot() {
    if (mountAnswerLoom()) return;
    const root = document.querySelector("#root");
    if (!root) return;
    const observer = new MutationObserver(() => {
      if (mountAnswerLoom()) {
        observer.disconnect();
      }
    });
    observer.observe(root, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
