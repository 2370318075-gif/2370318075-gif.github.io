(() => {
  "use strict";

  const demos = {
    muyu: {
      eyebrow: "MUYU / AI 影像创作平台",
      badge: "预制案例演示",
      title: "预制案例：二次元人像「风暴幻想」",
      note: "完整体验二次元人像修图流程 · 案例素材与结果均为演示内容",
      initialStep: 4,
      steps: [
        {
          label: "导入人像",
          meta: "上传漫展角色原片",
          stage: `
            <figure class="ix-product-screen">
              <img src="./muyu-console.png" alt="MUYU 二次元人像修图控制台" loading="lazy" />
              <figcaption><span>真实产品界面</span><b>上传原片 · 选择滤镜 · 配置特效</b></figcaption>
            </figure>
            <div class="ix-form-stack">
              <span class="ix-overline">PRESET CASE 01 / 二次元返图</span>
              <h4>角色人像 · 风暴幻想主题</h4>
              <div class="ix-file-row"><span>anime_portrait_storm_01.dng</span><b>预制素材</b></div>
              <div class="ix-tags"><span>角色人像</span><span>冷调幻想</span><span>风暴场景</span></div>
            </div>`,
          insight: ["案例类型：二次元氛围人像", "目标：保留本人特征并强化世界观", "界面来自真实产品版本"]
        },
        {
          label: "选择风格",
          meta: "确定角色视觉方向",
          stage: `
            <div class="ix-form-stack ix-span-two">
              <span class="ix-overline">二次元人像风格预设</span>
              <h4>先确定角色氛围，再进入五官与质感精修</h4>
              <div class="ix-choice-grid">
                <button type="button"><small>01</small><b>日系通透</b><span>柔光 · 低对比 · 清透肤色</span></button>
                <button type="button" class="is-selected"><small>02</small><b>风暴幻想</b><span>冷蓝 · 云层 · 闪电氛围</span></button>
                <button type="button"><small>03</small><b>赛博角色</b><span>青蓝 · 霓虹轮廓 · 高反差</span></button>
              </div>
            </div>`,
          insight: ["案例选择：风暴幻想", "本人特征保护：开启", "预设只影响色彩与氛围"]
        },
        {
          label: "人像精修",
          meta: "调整五官与细节",
          stage: `
            <div class="ix-effect-preview">
              <i class="ix-rain rain-a"></i><i class="ix-rain rain-b"></i><i class="ix-rain rain-c"></i>
              <span>二次元人像精修面板</span>
              <b>肤质 / 五官 / 发丝 / 冷调质感</b>
            </div>
            <div class="ix-control-list">
              <div><span>肤质净化</span><i style="--value:64%"></i><b>64</b></div>
              <div><span>五官精修</span><i style="--value:46%"></i><b>46</b></div>
              <div><span>发丝增强</span><i style="--value:78%"></i><b>78</b></div>
              <div><span>冷调质感</span><i style="--value:72%"></i><b>72</b></div>
            </div>`,
          insight: ["保留本人面部识别特征", "四类细节可分别控制", "支持原图与精修图对比"]
        },
        {
          label: "背景氛围",
          meta: "补充角色世界观",
          stage: `
            <div class="ix-form-stack ix-span-two">
              <span class="ix-overline">角色氛围与交付设置</span>
              <h4>风暴云层与闪电 · 二次元氛围返图</h4>
              <div class="ix-option-rows">
                <div><span>背景氛围</span><b><i>纯色棚拍</i><i class="is-on">风暴闪电</i><i>赛博街景</i></b></div>
                <div><span>画面比例</span><b><i>1:1</i><i class="is-on">4:5</i><i>9:16</i></b></div>
                <div><span>输出尺寸</span><b><i>1080P</i><i class="is-on">2K</i><i>4K</i></b></div>
              </div>
            </div>`,
          insight: ["背景不会覆盖人物轮廓", "案例选择：风暴闪电", "输出：2K / 横版对比"]
        },
        {
          label: "导出返图",
          meta: "查看原版效果图",
          stage: `
            <figure class="ix-product-result ix-span-two">
              <img src="./muyu-simulated-result.png" alt="MUYU 二次元人像风暴幻想修图前后对比" loading="lazy" />
              <figcaption><span>BEFORE / 原片</span><span>AFTER / 风暴幻想精修</span></figcaption>
            </figure>
            <div class="ix-result-strip ix-span-two">
              <div><span class="ix-status-dot"></span><b>原版产品效果图</b><small>保留上一版完整视觉结果</small></div>
              <span><b>人物特征</b>完整保留</span><span><b>背景氛围</b>风暴闪电</span><span><b>交付格式</b>高清 PNG</span>
            </div>`,
          insight: ["最终结果使用上一版原始展示图", "可以直接比较修图前后差异", "交互只负责带用户走完整流程"]
        }
      ]
    },
    brandloom: {
      eyebrow: "BRANDLOOM / AI 品牌策略平台",
      badge: "预制案例演示",
      title: "预制案例：NORTH STUDIO 品牌提案",
      note: "完整体验品牌策略流程 · 最终结果沿用上一版原始提案板",
      initialStep: 4,
      steps: [
        {
          label: "输入简报",
          meta: "对齐品牌背景",
          stage: `
            <div class="ix-brief-card">
              <span class="ix-overline">PRESET CASE 02 / AI 创意品牌</span><h4>NORTH STUDIO</h4>
              <p>为创意工作者提供智能、灵活、富有未来感的 AI 创作工具。</p>
              <div class="ix-tags"><span>智能</span><span>创意</span><span>未来感</span><span>极简</span></div>
            </div>
            <div class="ix-brief-facts">
              <div><small>目标人群</small><b>创意工作者与独立开发者</b></div>
              <div><small>主要场景</small><b>AI 创作、品牌内容与工具使用</b></div>
              <div><small>案例目标</small><b>建立未来感品牌系统与完整提案</b></div>
            </div>`,
          insight: ["案例类型：AI 创意品牌", "品牌资料为预制演示设定", "最终效果与原版提案图一致"]
        },
        {
          label: "策略生成",
          meta: "选择定位方向",
          stage: `
            <div class="ix-form-stack ix-span-two">
              <span class="ix-overline">案例策略方向</span>
              <h4>从“AI 工具”收敛到“创意工作伙伴”</h4>
              <div class="ix-strategy-list">
                <button type="button"><b>01 智能效率</b><span>强调快速、可靠与工具能力</span></button>
                <button type="button" class="is-selected"><b>02 创意伙伴</b><span>强调智能协作与想象力扩展</span></button>
                <button type="button"><b>03 未来实验室</b><span>强调前沿、探索与技术表达</span></button>
              </div>
            </div>`,
          insight: ["案例选择：创意伙伴", "品牌承诺：让 AI 提升想象与手艺", "语气：专业、简洁、未来感"]
        },
        {
          label: "视觉系统",
          meta: "查看设计语言",
          stage: `
            <div class="ix-brand-board">
              <small>WORDMARK / CASE 02</small>
              <strong>NORTH<span>°</span></strong>
              <p>Intelligent tools for creative minds.</p>
            </div>
            <div class="ix-palette-board">
              <span style="--swatch:#0a0c0b">INK</span>
              <span style="--swatch:#c8ff48">SIGNAL</span>
              <span style="--swatch:#f1f0e9">PAPER</span>
              <div><small>字体组合</small><b>Inter / 思源黑体</b></div>
            </div>`,
          insight: ["案例字标：NORTH STUDIO", "主色：Acid Green", "标志、字体与 IP 统一"]
        },
        {
          label: "人工确认",
          meta: "选择最终方案",
          stage: `
            <div class="ix-review-grid">
              <button type="button"><small>方案 A</small><b>NORTH°</b><span>字标更轻，适合内容平台传播</span></button>
              <button type="button" class="is-selected"><small>方案 B · 已选</small><b>N /</b><span>符号更强，适合应用图标与品牌物料</span></button>
            </div>
            <div class="ix-approval-note">
              <span class="ix-status-dot"></span><b>设计负责人已确认</b>
              <p>保留方案 B 的字标结构，辅助色减少到一组。</p>
            </div>`,
          insight: ["案例选择：方案 B", "保留 N 字母核心识别", "辅助色统一为 Acid Green"]
        },
        {
          label: "提案交付",
          meta: "整理品牌资产",
          stage: `
            <figure class="ix-product-result ix-span-two">
              <img src="./brandloom-simulated-result.png" alt="BRANDLOOM NORTH STUDIO 完整品牌提案板" loading="lazy" />
              <figcaption><span>FINAL BOARD / 完整品牌交付</span><span>策略 · 标志 · VI · IP · 应用</span></figcaption>
            </figure>
            <div class="ix-result-strip ix-span-two">
              <div><span class="ix-status-dot"></span><b>原版品牌提案图</b><small>保留上一版完整视觉结果</small></div>
              <span><b>品牌策略</b>5 个关键词</span><span><b>视觉系统</b>标志与 IP</span><span><b>应用物料</b>名片 / App / 手提袋</span>
            </div>`,
          insight: ["最终结果使用上一版原始提案图", "一张图完整展示品牌系统", "交互步骤帮助理解结果如何产生"]
        }
      ]
    },
    answerloom: {
      eyebrow: "AnswerLoom / GEO 优化工作台",
      badge: "真实案例复盘",
      title: "真实案例：AnswerLoom 产品工作流重构",
      note: "真实开发迭代复盘 · 不虚构品牌排名或检测分数",
      steps: [
        {
          label: "品牌建档",
          meta: "记录真实产品问题",
          stage: `
            <div class="ix-form-stack">
              <span class="ix-overline">真实迭代项目</span><h4>AnswerLoom · GEO 个人开发工作台</h4>
              <div class="ix-field"><small>原始问题</small><b>功能很多，但使用顺序不清晰</b></div>
              <div class="ix-field"><small>目标用户</small><b>需要低成本完成 GEO 分析的个人开发者</b></div>
            </div>
              <div class="ix-readiness"><span>已确认的真实问题</span><strong>4 项</strong><i><b style="width:100%"></b></i><ul><li>中英文混杂</li><li>模型选择逻辑不清</li><li>流程顺序断裂</li><li>历史数据无法长期保存</li></ul></div>`,
          insight: ["问题来自真实使用反馈", "目标用户：中国个人开发者", "先梳理流程再调整界面"]
        },
        {
          label: "流程重构",
          meta: "重新组织完整链路",
          stage: `
            <div class="ix-detection-plan">
              <span class="ix-overline">重构后的真实工作流</span><h4>配置 API → 品牌建档 → 发起分析 → 优化发布 → 效果复测</h4>
              <div class="ix-formula"><span>平台配置<br><b>01</b></span><i>→</i><span>品牌项目<br><b>02</b></span><i>→</i><span>分析执行<br><b>03</b></span><i>→</i><span>发布复测<br><b>04</b></span></div>
            </div>
            <div class="ix-model-list"><span><b>OpenRouter</b><small>平台 → 模型 → API Key</small></span><span><b>硅基流动</b><small>平台 → 模型 → API Key</small></span><em>真实产品配置逻辑</em></div>`,
          insight: ["只保留中国监测地区", "模型按平台分组", "每一步都有明确输入与产出"]
        },
        {
          label: "功能落地",
          meta: "完成关键模块",
          stage: `
            <div class="ix-score-grid"><span><small>产品配置</small><b>完成</b><i>平台 / 模型 / Key</i></span><span><small>项目记录</small><b>完成</b><i>问题 / 回答 / 报告</i></span><span><small>内容闭环</small><b>完成</b><i>审核 / 发布 / 复测</i></span></div>
            <div class="ix-bar-report"><h4>真实开发完成情况</h4><div><span>中文本地化</span><i><b style="width:100%"></b></i><em>完成</em></div><div><span>工作流重排</span><i><b style="width:100%"></b></i><em>完成</em></div><div><span>长期数据保存</span><i><b style="width:100%"></b></i><em>完成</em></div></div>`,
          insight: ["不展示虚构 GEO 分数", "用真实开发结果代替模拟排名", "关键模块已经落地"]
        },
        {
          label: "人工验收",
          meta: "检查中文使用逻辑",
          stage: `
            <div class="ix-editor">
              <div><span></span><span></span><span></span><b>真实产品验收记录</b><em>人工确认</em></div>
              <h4>从“功能堆叠”改成“一条完整工作流”</h4>
              <p>用户先配置模型平台，再建立品牌资料、发起分析、检查结果、优化内容，最后发布并复测。</p>
              <mark>专业模型名称保留英文 · 其余界面统一中文</mark>
            </div>
            <div class="ix-checklist"><span><b>✓</b>结构清晰</span><span><b>✓</b>问题直答</span><span><b>✓</b>来源已标注</span><span class="is-warn"><b>!</b>价格待确认</span></div>`,
          insight: ["流程顺序经过真实使用反馈调整", "界面语言统一为中文", "保留人工确认节点"]
        },
        {
          label: "结果沉淀",
          meta: "保存真实迭代成果",
          stage: `
            <div class="ix-retest">
              <span class="ix-overline">真实项目结果</span>
              <div><small>操作路径</small><strong>功能分散</strong><i>→</i><strong class="is-new">完整闭环</strong><b>已完成</b></div>
              <div><small>数据保存</small><strong>仅本地</strong><i>→</i><strong class="is-new">长期记录</strong><b>已完成</b></div>
            </div>
            <div class="ix-publish-card"><span class="ix-status-dot"></span><h4>案例状态：真实迭代已完成</h4><p>首页展示的是实际开发与使用反馈，不使用虚构品牌排名或虚构效果数据。</p><button type="button" data-demo-toast="这是 AnswerLoom 的真实开发复盘；未公开 API Key、用户数据或私有项目内容">查看案例说明</button></div>`,
          insight: ["项目记录可长期查看", "问题、回答与报告按品牌保存", "隐私数据不在公开页面展示"]
        }
      ]
    }
  };

  function renderDemo(key) {
    const config = demos[key];
    const root = document.createElement("section");
    root.className = `ix-demo ix-demo-${key}`;
    root.dataset.staticDemo = key;
    root.dataset.activeStep = "0";
    root.innerHTML = `
      <header class="ix-demo-header">
        <div><span>${config.eyebrow}</span><h3>${config.title}</h3></div>
        <p><i></i>${config.badge}<small>${config.note}</small></p>
      </header>
      <div class="ix-demo-shell">
        <nav class="ix-demo-steps" aria-label="${config.eyebrow}演示步骤"></nav>
        <div class="ix-demo-workspace">
          <main class="ix-demo-stage" aria-live="polite"></main>
          <aside class="ix-demo-inspector"></aside>
        </div>
        <footer class="ix-demo-footer">
          <button type="button" data-demo-prev aria-label="上一步">← 上一步</button>
          <span data-demo-progress></span>
          <button type="button" data-demo-next>下一步 →</button>
        </footer>
      </div>`;

    const nav = root.querySelector(".ix-demo-steps");
    config.steps.forEach((step, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.step = String(index);
      button.innerHTML = `<b>${String(index + 1).padStart(2, "0")}</b><span>${step.label}<small>${step.meta}</small></span>`;
      nav.appendChild(button);
    });

    function showStep(index) {
      const safeIndex = Math.max(0, Math.min(config.steps.length - 1, index));
      const step = config.steps[safeIndex];
      root.dataset.activeStep = String(safeIndex);
      root.querySelector(".ix-demo-stage").innerHTML = step.stage;
      root.querySelector(".ix-demo-inspector").innerHTML = `<span>本步说明</span><h4>${step.label}</h4><p>${step.meta}</p><ul>${step.insight.map((item) => `<li>${item}</li>`).join("")}</ul>`;
      root.querySelectorAll("[data-step]").forEach((button, buttonIndex) => {
        button.classList.toggle("is-active", buttonIndex === safeIndex);
        button.setAttribute("aria-current", buttonIndex === safeIndex ? "step" : "false");
      });
      root.querySelector("[data-demo-progress]").textContent = `${String(safeIndex + 1).padStart(2, "0")} / ${String(config.steps.length).padStart(2, "0")}`;
      root.querySelector("[data-demo-prev]").disabled = safeIndex === 0;
      root.querySelector("[data-demo-next]").textContent = safeIndex === config.steps.length - 1 ? "重新查看 ↻" : "下一步 →";
    }

    root.addEventListener("click", (event) => {
      const stepButton = event.target.closest("[data-step]");
      if (stepButton) showStep(Number(stepButton.dataset.step));
      if (event.target.closest("[data-demo-prev]")) showStep(Number(root.dataset.activeStep) - 1);
      if (event.target.closest("[data-demo-next]")) {
        const current = Number(root.dataset.activeStep);
        showStep(current === config.steps.length - 1 ? 0 : current + 1);
      }
      const toastButton = event.target.closest("[data-demo-toast]");
      if (toastButton) {
        const message = toastButton.dataset.demoToast;
        let toast = root.querySelector(".ix-demo-toast");
        if (!toast) {
          toast = document.createElement("div");
          toast.className = "ix-demo-toast";
          toast.setAttribute("role", "status");
          root.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add("is-visible");
        window.clearTimeout(root.toastTimer);
        root.toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
      }
    });

    showStep(config.initialStep || 0);
    return root;
  }

  function mountAll() {
    const muyu = document.querySelector(".project-muyu");
    if (muyu && !muyu.querySelector('[data-static-demo="muyu"]')) {
      const target = muyu.querySelector(".product-browser");
      if (target) target.replaceWith(renderDemo("muyu"));
      muyu.querySelector(".simulation-block")?.remove();
    }

    const brandloom = document.querySelector(".project-brandloom");
    if (brandloom && !brandloom.querySelector('[data-static-demo="brandloom"]')) {
      const target = brandloom.querySelector(".brand-demo");
      if (target) target.replaceWith(renderDemo("brandloom"));
      brandloom.querySelectorAll(".brand-simulation, .simulation-block").forEach((node) => node.remove());
    }

    const answerloom = document.querySelector("#answerloom-project");
    if (answerloom && !answerloom.querySelector('[data-static-demo="answerloom"]')) {
      const target = answerloom.querySelector(".al-flow-gallery");
      if (target) target.replaceWith(renderDemo("answerloom"));
    }

    return Boolean(
      document.querySelector('[data-static-demo="muyu"]') &&
      document.querySelector('[data-static-demo="brandloom"]') &&
      document.querySelector('[data-static-demo="answerloom"]')
    );
  }

  function beginMounting() {
    if (mountAll()) return;
    const observer = new MutationObserver(() => {
      if (mountAll()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 15000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", beginMounting, { once: true });
  } else {
    beginMounting();
  }
})();
