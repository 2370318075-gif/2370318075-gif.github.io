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
      badge: "预制案例演示",
      title: "预制案例：鲜食盒 GEO 分析与优化",
      note: "交互步骤结合真实产品界面 · 默认先展示最终分析与发布结果",
      initialStep: 4,
      steps: [
        {
          label: "项目准备",
          meta: "确认品牌与模型配置",
          stage: `
            <figure class="ix-product-screen ix-product-screen-tall">
              <img src="./answerloom/screens/01-project-workbench.jpg" alt="AnswerLoom 鲜食盒项目工作台" loading="lazy" />
              <figcaption><span>真实产品界面</span><b>项目工作台</b></figcaption>
            </figure>
            <div class="ix-form-stack">
              <span class="ix-overline">PRESET CASE 03 / GEO 项目</span><h4>鲜食盒 · 健康预制餐品牌</h4>
              <div class="ix-field"><small>项目状态</small><b>品牌资料、模型 API 与中国地区已准备</b></div>
              <div class="ix-field"><small>本次目标</small><b>分析品牌在 AI 回答中的可见度与引用情况</b></div>
              <div class="ix-tags"><span>中国市场</span><span>竞品比较</span><span>品牌可见度</span></div>
            </div>
          `,
          insight: ["品牌资料已完成", "回答模型已连接", "监测地区只保留中国"]
        },
        {
          label: "选择检测",
          meta: "确认平台与回答模型",
          stage: `
            <figure class="ix-product-screen ix-product-screen-tall">
              <img src="./answerloom/screens/05-model-selection.jpg" alt="AnswerLoom 检测方式与回答模型选择界面" loading="lazy" />
              <figcaption><span>真实产品界面</span><b>模型与检测方式</b></figcaption>
            </figure>
            <div class="ix-form-stack">
              <span class="ix-overline">快速模型检测</span><h4>选择检测通道与回答模型</h4>
              <div class="ix-field"><small>模型平台</small><b>OpenRouter</b></div>
              <div class="ix-field"><small>回答模型</small><b>openai/gpt-4.1-mini</b></div>
              <div class="ix-field"><small>检测组合</small><b>用户问题 × 用户角色 × 回答模型</b></div>
              <div class="ix-tags"><span>低成本</span><span>可复测</span><span>结果可保存</span></div>
            </div>`,
          insight: ["模型按平台选择", "真实平台监测与快速检测分开", "本案例使用演示模式"]
        },
        {
          label: "分析报告",
          meta: "查看品牌可见度结果",
          stage: `
            <figure class="ix-product-screen ix-product-screen-tall">
              <img src="./answerloom/screens/06-analysis-report.jpg" alt="AnswerLoom 鲜食盒 GEO 分析报告" loading="lazy" />
              <figcaption><span>真实产品界面</span><b>GEO 分析报告</b></figcaption>
            </figure>
            <div class="ix-result-card">
              <span class="ix-status-dot"></span><small>案例分析已完成</small>
              <h4>从问题回答中找到品牌提及与引用机会</h4>
              <div class="ix-metrics"><span><b>85</b>单条可见度</span><span><b>67%</b>品牌提及率</span><span><b>67%</b>官网引用率</span></div>
              <button type="button" data-demo-toast="截图来自 AnswerLoom 原始演示流程，案例数据用于产品展示">查看报告说明</button>
            </div>`,
          insight: ["报告展示品牌提及与引用情况", "低分问题自动进入优化建议", "每条回答可以单独查看"]
        },
        {
          label: "内容优化",
          meta: "生成并人工审核草稿",
          stage: `
            <figure class="ix-product-screen ix-product-screen-tall">
              <img src="./answerloom/screens/08-content-review.jpg" alt="AnswerLoom 内容草稿生成与人工审核界面" loading="lazy" />
              <figcaption><span>真实产品界面</span><b>内容创作与审核</b></figcaption>
            </figure>
            <div class="ix-form-stack">
              <span class="ix-overline">从报告进入执行</span><h4>把低分问题转成官网内容任务</h4>
              <div class="ix-field"><small>内容类型</small><b>官网文章</b></div>
              <div class="ix-field"><small>目标读者</small><b>正在比较解决方案的潜在客户</b></div>
              <div class="ix-field"><small>人工审核</small><b>事实、数字、价格与引用必须确认</b></div>
              <div class="ix-tags"><span>生成草稿</span><span>人工核查</span><span>确认发布</span></div>
            </div>
          `,
          insight: ["内容机会来自分析报告", "草稿不会自动直接发布", "品牌负责人保留最终决定权"]
        },
        {
          label: "成果总览",
          meta: "查看分析与发布界面",
          stage: `
            <div class="ix-answerloom-results ix-span-two">
              <figure class="ix-product-screen ix-product-screen-tall">
                <img src="./answerloom/screens/06-analysis-report.jpg" alt="AnswerLoom GEO 分析报告结果" loading="lazy" />
                <figcaption><span>01 / 分析结果</span><b>可见度 · 提及率 · 官网引用</b></figcaption>
              </figure>
              <figure class="ix-product-screen ix-product-screen-tall">
                <img src="./answerloom/screens/09-publish-monitoring.jpg" alt="AnswerLoom 内容发布与效果监测界面" loading="lazy" />
                <figcaption><span>02 / 发布监测</span><b>人工确认 · 发布记录 · 后续复测</b></figcaption>
              </figure>
            </div>
            <div class="ix-result-strip ix-span-two">
              <div><span class="ix-status-dot"></span><b>完整 GEO 闭环</b><small>真实产品界面，不再使用 CSS 模拟结果</small></div>
              <span><b>分析</b>问题与回答评分</span><span><b>优化</b>内容草稿与审核</span><span><b>发布</b>记录并按原条件复测</span>
            </div>`,
          insight: ["默认展示真实产品成果界面", "分析结果可以直接进入内容优化", "发布后使用相同条件重新检测"]
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
