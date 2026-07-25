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
        <p>面向个人开发者的生成式引擎优化工作台：从品牌建档、模型检测和分析报告，到内容审核、发布、监控与复测，形成完整闭环。下方仅展示产品演示流程截图。</p>
        <div class="al-portfolio-tags" aria-label="AnswerLoom 核心能力">
          <span>GEO / AEO</span>
          <span>多模型检测</span>
          <span>内容优化</span>
          <span>人工审核</span>
          <span>发布复测</span>
        </div>
      </div>
      <div class="al-flow-heading">
        <span>SIMULATED RUN / 产品流程演示</span>
        <strong>从建立项目，到发布后重新检测。</strong>
        <small>演示品牌、回答与结果均为模拟数据</small>
      </div>
      <div class="al-flow-gallery" aria-label="AnswerLoom 完整演示流程截图">
        <figure><a class="al-image-link" href="./answerloom/screens/01-project-workbench.jpg" target="_blank" rel="noopener" aria-label="查看项目工作台大图"><img loading="lazy" src="./answerloom/screens/01-project-workbench.jpg" alt="AnswerLoom 项目工作台，展示品牌、模型 API 与中国监测地区状态" /></a><figcaption><b>01</b><span>项目工作台<small>品牌资料与模型 API 已准备</small></span></figcaption></figure>
        <figure><a class="al-image-link" href="./answerloom/screens/02-analysis-goal.jpg" target="_blank" rel="noopener" aria-label="查看选择分析目标大图"><img loading="lazy" src="./answerloom/screens/02-analysis-goal.jpg" alt="AnswerLoom 选择 GEO 分析目标，当前选择竞品比较" /></a><figcaption><b>02</b><span>选择分析目标<small>明确本次想解决的问题</small></span></figcaption></figure>
        <figure><a class="al-image-link" href="./answerloom/screens/03-user-questions.jpg" target="_blank" rel="noopener" aria-label="查看生成用户问题大图"><img loading="lazy" src="./answerloom/screens/03-user-questions.jpg" alt="AnswerLoom 根据品牌资料生成中国用户可能提出的问题" /></a><figcaption><b>03</b><span>生成用户问题<small>确认、修改或补充真实提问</small></span></figcaption></figure>
        <figure><a class="al-image-link" href="./answerloom/screens/04-user-roles.jpg" target="_blank" rel="noopener" aria-label="查看选择用户角色大图"><img loading="lazy" src="./answerloom/screens/04-user-roles.jpg" alt="AnswerLoom 选择普通消费者等用户角色" /></a><figcaption><b>04</b><span>选择用户角色<small>模拟不同人群的关注重点</small></span></figcaption></figure>
        <figure><a class="al-image-link" href="./answerloom/screens/05-model-selection.jpg" target="_blank" rel="noopener" aria-label="查看选择回答模型大图"><img loading="lazy" src="./answerloom/screens/05-model-selection.jpg" alt="AnswerLoom 选择 OpenRouter 或硅基流动的回答模型" /></a><figcaption><b>05</b><span>选择回答模型<small>确定本次检测组合与调用规模</small></span></figcaption></figure>
        <figure><a class="al-image-link" href="./answerloom/screens/06-analysis-report.jpg" target="_blank" rel="noopener" aria-label="查看分析报告大图"><img loading="lazy" src="./answerloom/screens/06-analysis-report.jpg" alt="AnswerLoom GEO 分析报告，展示可见度、品牌提及和官网引用" /></a><figcaption><b>06</b><span>查看分析报告<small>找到低分问题和内容机会</small></span></figcaption></figure>
        <figure><a class="al-image-link" href="./answerloom/screens/07-content-opportunity.jpg" target="_blank" rel="noopener" aria-label="查看内容机会大图"><img loading="lazy" src="./answerloom/screens/07-content-opportunity.jpg" alt="AnswerLoom 根据报告选择内容机会与内容类型" /></a><figcaption><b>07</b><span>确定内容机会<small>把分析缺口转成创作任务</small></span></figcaption></figure>
        <figure><a class="al-image-link" href="./answerloom/screens/08-content-review.jpg" target="_blank" rel="noopener" aria-label="查看内容创作与审核大图"><img loading="lazy" src="./answerloom/screens/08-content-review.jpg" alt="AnswerLoom AI 内容草稿编辑与人工审核界面" /></a><figcaption><b>08</b><span>内容创作与审核<small>人工核实事实、数字和引用</small></span></figcaption></figure>
        <figure><a class="al-image-link" href="./answerloom/screens/09-publish-monitoring.jpg" target="_blank" rel="noopener" aria-label="查看发布与效果监控大图"><img loading="lazy" src="./answerloom/screens/09-publish-monitoring.jpg" alt="AnswerLoom WordPress 直接发布和手动登记发布信息界面" /></a><figcaption><b>09</b><span>发布与效果监控<small>登记网址并使用原条件复测</small></span></figcaption></figure>
      </div>
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
