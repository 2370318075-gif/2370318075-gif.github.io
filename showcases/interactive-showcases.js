(() => {
  "use strict";

  const demos = {
    muyu: {
      eyebrow: "MUYU / AI 影像创作平台",
      title: "从一张原片，到可交付成片",
      note: "预生成影像工作流，不上传图片、不调用模型",
      steps: [
        {
          label: "上传原片",
          meta: "建立创作任务",
          stage: `
            <div class="ix-scene ix-scene-photo" aria-label="抽象原片预览">
              <span class="ix-moon"></span><span class="ix-mountain ix-mountain-one"></span><span class="ix-mountain ix-mountain-two"></span>
              <span class="ix-scene-label">RAW · 24 MP</span>
            </div>
            <div class="ix-form-stack">
              <span class="ix-overline">新建影像任务</span>
              <h4>城市雨夜 · 人像原片</h4>
              <div class="ix-file-row"><span>IMG_0248.DNG</span><b>36.8 MB</b></div>
              <div class="ix-tags"><span>竖构图</span><span>低照度</span><span>人物主体</span></div>
            </div>`,
          insight: ["输入检查完成", "人物主体已识别", "原图安全保留"]
        },
        {
          label: "选择配方",
          meta: "确定视觉方向",
          stage: `
            <div class="ix-form-stack ix-span-two">
              <span class="ix-overline">推荐视觉配方</span>
              <h4>选择一种预设，快速确定风格基线</h4>
              <div class="ix-choice-grid">
                <button type="button"><small>01</small><b>电影蓝调</b><span>冷色 · 克制 · 高反差</span></button>
                <button type="button" class="is-selected"><small>02</small><b>阴冷电影</b><span>青灰 · 雨雾 · 暗部细节</span></button>
                <button type="button"><small>03</small><b>霓虹街头</b><span>洋红 · 青蓝 · 湿地反射</span></button>
              </div>
            </div>`,
          insight: ["已选：阴冷电影", "主体保护：开启", "风格强度：68%"]
        },
        {
          label: "叠加特效",
          meta: "组合可控效果",
          stage: `
            <div class="ix-effect-preview">
              <i class="ix-rain rain-a"></i><i class="ix-rain rain-b"></i><i class="ix-rain rain-c"></i>
              <span>效果组合预览</span>
              <b>雨雾 / 雷电 / 冷青色调</b>
            </div>
            <div class="ix-control-list">
              <div><span>环境雨雾</span><i style="--value:78%"></i><b>78</b></div>
              <div><span>远景雷电</span><i style="--value:42%"></i><b>42</b></div>
              <div><span>主体保护</span><i style="--value:92%"></i><b>92</b></div>
              <div><span>电影颗粒</span><i style="--value:24%"></i><b>24</b></div>
            </div>`,
          insight: ["可单独调节", "不会破坏原片", "支持返回上一步"]
        },
        {
          label: "输出设置",
          meta: "适配使用场景",
          stage: `
            <div class="ix-form-stack ix-span-two">
              <span class="ix-overline">交付规格</span>
              <h4>小红书竖版视觉 · 高清成片</h4>
              <div class="ix-option-rows">
                <div><span>画面比例</span><b><i>1:1</i><i class="is-on">4:5</i><i>9:16</i></b></div>
                <div><span>输出尺寸</span><b><i>1080P</i><i class="is-on">2K</i><i>4K</i></b></div>
                <div><span>文件格式</span><b><i>JPG</i><i class="is-on">PNG</i><i>WEBP</i></b></div>
              </div>
            </div>`,
          insight: ["目标：社交媒体", "尺寸：2048 × 2560", "预计文件：5.2 MB"]
        },
        {
          label: "生成交付",
          meta: "查看静态结果",
          stage: `
            <div class="ix-compare">
              <div class="ix-mini-scene is-before"><span>处理前</span></div>
              <div class="ix-mini-scene is-after"><span>预生成成片</span><i></i></div>
            </div>
            <div class="ix-result-card">
              <span class="ix-status-dot"></span><small>模板任务已完成</small>
              <h4>城市雨夜_阴冷电影_v03.png</h4>
              <div class="ix-metrics"><span><b>2K</b>分辨率</span><span><b>4:5</b>比例</span><span><b>5.2 MB</b>大小</span></div>
              <button type="button" data-demo-toast="这是预生成演示，未创建真实文件">查看交付说明</button>
            </div>`,
          insight: ["原图对比已生成", "参数可继续调整", "历史版本可回看"]
        }
      ]
    },
    brandloom: {
      eyebrow: "BRANDLOOM / AI 品牌策略平台",
      title: "从品牌简报，到一套可提案的视觉系统",
      note: "预生成品牌项目，不调用模型、不创建真实资产",
      steps: [
        {
          label: "输入简报",
          meta: "对齐品牌背景",
          stage: `
            <div class="ix-brief-card">
              <span class="ix-overline">品牌名称</span><h4>NORTH STUDIO</h4>
              <p>为独立创作者提供轻量、可信赖的数字工具。</p>
              <div class="ix-tags"><span>克制</span><span>现代</span><span>专业</span><span>有温度</span></div>
            </div>
            <div class="ix-brief-facts">
              <div><small>核心人群</small><b>25—35 岁创意工作者</b></div>
              <div><small>主要场景</small><b>个人品牌与作品发布</b></div>
              <div><small>差异价值</small><b>把复杂工具变得简单</b></div>
            </div>`,
          insight: ["简报完整度：92%", "缺失项：品牌禁区", "可进入策略阶段"]
        },
        {
          label: "策略生成",
          meta: "选择定位方向",
          stage: `
            <div class="ix-form-stack ix-span-two">
              <span class="ix-overline">三条预生成策略方向</span>
              <h4>以“安静的专业感”建立差异认知</h4>
              <div class="ix-strategy-list">
                <button type="button"><b>01 工具理性</b><span>强调效率、可靠与结构</span></button>
                <button type="button" class="is-selected"><b>02 安静创造</b><span>强调专注、留白与个人表达</span></button>
                <button type="button"><b>03 灵感伙伴</b><span>强调陪伴、启发与成长</span></button>
              </div>
            </div>`,
          insight: ["定位：安静创造", "品牌承诺：让创作回到创作", "语气：简洁、坦诚"]
        },
        {
          label: "视觉系统",
          meta: "查看设计语言",
          stage: `
            <div class="ix-brand-board">
              <small>WORDMARK / 01</small>
              <strong>NORTH<span>°</span></strong>
              <p>Quiet tools for bold ideas.</p>
            </div>
            <div class="ix-palette-board">
              <span style="--swatch:#0a0c0b">INK</span>
              <span style="--swatch:#c8ff48">SIGNAL</span>
              <span style="--swatch:#f1f0e9">PAPER</span>
              <div><small>字体组合</small><b>Inter / 思源黑体</b></div>
            </div>`,
          insight: ["主标识：字标方案 01", "主色：Signal Green", "对比度符合可读性"]
        },
        {
          label: "人工确认",
          meta: "选择最终方案",
          stage: `
            <div class="ix-review-grid">
              <button type="button"><small>方案 A</small><b>NORTH°</b><span>结构更强，适合工具产品</span></button>
              <button type="button" class="is-selected"><small>方案 B · 已选</small><b>NORTH/</b><span>更克制，适合创作者品牌</span></button>
            </div>
            <div class="ix-approval-note">
              <span class="ix-status-dot"></span><b>设计负责人已确认</b>
              <p>保留方案 B 的字标结构，辅助色减少到一组。</p>
            </div>`,
          insight: ["人工决策已记录", "变更项：2 条", "方案 B 进入交付"]
        },
        {
          label: "提案交付",
          meta: "整理品牌资产",
          stage: `
            <div class="ix-delivery">
              <span class="ix-overline">品牌提案包已就绪</span>
              <h4>NORTH_STUDIO_BrandKit_v1.0</h4>
              <ul><li><b>✓</b>品牌定位与语气指南</li><li><b>✓</b>标识与安全空间规范</li><li><b>✓</b>色彩、字体与应用示例</li><li><b>✓</b>社交媒体模板规范</li></ul>
            </div>
            <div class="ix-delivery-score"><small>提案完整度</small><strong>96</strong><span>/ 100</span><button type="button" data-demo-toast="这是模板演示，未生成真实提案文件">查看交付清单</button></div>`,
          insight: ["共 4 类交付物", "版本：v1.0", "支持后续版本归档"]
        }
      ]
    },
    answerloom: {
      eyebrow: "AnswerLoom / GEO 优化工作台",
      title: "从品牌建档，到发布后的效果复测",
      note: "预生成 GEO 分析，不调用 API、不发布真实内容",
      steps: [
        {
          label: "品牌建档",
          meta: "建立分析上下文",
          stage: `
            <div class="ix-form-stack">
              <span class="ix-overline">当前项目</span><h4>山泉盒 · 健康饮水品牌</h4>
              <div class="ix-field"><small>官方网站</small><b>www.example.cn</b></div>
              <div class="ix-field"><small>核心产品</small><b>家庭饮水订阅服务</b></div>
            </div>
            <div class="ix-readiness"><span>资料准备度</span><strong>88%</strong><i><b style="width:88%"></b></i><ul><li>品牌简介已填写</li><li>产品资料已确认</li><li>竞品范围已设置</li></ul></div>`,
          insight: ["监测地区：中国", "目标：提升品牌可见度", "资料可开始检测"]
        },
        {
          label: "模型检测",
          meta: "组合问题与角色",
          stage: `
            <div class="ix-detection-plan">
              <span class="ix-overline">本次检测组合</span><h4>8 个问题 × 3 类角色 × 2 个模型</h4>
              <div class="ix-formula"><span>真实问题<br><b>8</b></span><i>×</i><span>用户角色<br><b>3</b></span><i>×</i><span>回答模型<br><b>2</b></span><i>=</i><span>检测样本<br><b>48</b></span></div>
            </div>
            <div class="ix-model-list"><span><b>OpenRouter</b><small>Qwen 2.5 72B</small></span><span><b>硅基流动</b><small>DeepSeek V3</small></span><em>模板模式 · 不发起调用</em></div>`,
          insight: ["角色：家庭用户 / 白领 / 新手", "样本：48 条", "预计费用：¥0（模板）"]
        },
        {
          label: "分析报告",
          meta: "定位内容缺口",
          stage: `
            <div class="ix-score-grid"><span><small>品牌可见度</small><b>42</b><i>+8</i></span><span><small>品牌提及率</small><b>58%</b><i>+12%</i></span><span><small>官网引用率</small><b>21%</b><i>待提升</i></span></div>
            <div class="ix-bar-report"><h4>用户问题覆盖</h4><div><span>家庭饮水方案</span><i><b style="width:72%"></b></i><em>72</em></div><div><span>订阅价格比较</span><i><b style="width:46%"></b></i><em>46</em></div><div><span>水质安全依据</span><i><b style="width:28%"></b></i><em>28</em></div></div>`,
          insight: ["主要缺口：水质安全依据", "机会内容：选购指南", "建议优先级：高"]
        },
        {
          label: "内容优化",
          meta: "人工审核草稿",
          stage: `
            <div class="ix-editor">
              <div><span></span><span></span><span></span><b>内容优化草稿</b><em>等待人工确认</em></div>
              <h4>家庭饮水订阅怎么选？先看这 4 个指标</h4>
              <p>选择家庭饮水服务时，建议依次核对水源信息、检测报告、配送频率与售后范围……</p>
              <mark>引用依据已标注 · 价格信息待人工复核</mark>
            </div>
            <div class="ix-checklist"><span><b>✓</b>结构清晰</span><span><b>✓</b>问题直答</span><span><b>✓</b>来源已标注</span><span class="is-warn"><b>!</b>价格待确认</span></div>`,
          insight: ["内容评分：86", "待确认事实：1 项", "未执行真实发布"]
        },
        {
          label: "发布复测",
          meta: "比较优化效果",
          stage: `
            <div class="ix-retest">
              <span class="ix-overline">同条件复测 · 预生成结果</span>
              <div><small>品牌可见度</small><strong>42</strong><i>→</i><strong class="is-new">67</strong><b>+25</b></div>
              <div><small>官网引用率</small><strong>21%</strong><i>→</i><strong class="is-new">49%</strong><b>+28%</b></div>
            </div>
            <div class="ix-publish-card"><span class="ix-status-dot"></span><h4>内容状态：模拟已发布</h4><p>已使用相同问题、角色和模型条件完成复测。</p><button type="button" data-demo-toast="这是预生成演示，没有向任何平台发布内容">查看模拟发布记录</button></div>`,
          insight: ["复测条件一致", "两个核心指标提升", "可继续进入下一轮优化"]
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
        <p><i></i>静态交互演示<small>${config.note}</small></p>
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

    showStep(0);
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
