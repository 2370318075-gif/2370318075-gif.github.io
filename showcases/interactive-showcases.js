(() => {
  "use strict";

  const demos = {
    muyu: {
      eyebrow: "MUYU / AI 影像创作平台",
      title: "真实案例：影像工作室社交内容交付",
      note: "真实内部交付复盘 · 客户与素材信息已脱敏",
      steps: [
        {
          label: "上传原片",
          meta: "接收真实交付需求",
          stage: `
            <div class="ix-scene ix-scene-photo" aria-label="抽象原片预览">
              <span class="ix-moon"></span><span class="ix-mountain ix-mountain-one"></span><span class="ix-mountain ix-mountain-two"></span>
              <span class="ix-scene-label">RAW · 24 MP</span>
            </div>
            <div class="ix-form-stack">
              <span class="ix-overline">我们影像 · 内部交付项目</span>
              <h4>活动人物照 · 社交平台竖版内容</h4>
              <div class="ix-file-row"><span>客户原片</span><b>信息已脱敏</b></div>
              <div class="ix-tags"><span>竖版发布</span><span>人物主体</span><span>当日交付</span></div>
            </div>`,
          insight: ["真实来源：影像工作室", "目标：缩短后期时间", "原片与客户信息已脱敏"]
        },
        {
          label: "选择配方",
          meta: "按交付要求定调",
          stage: `
            <div class="ix-form-stack ix-span-two">
              <span class="ix-overline">本次实际采用的视觉方向</span>
              <h4>先锁定风格，再调整局部效果</h4>
              <div class="ix-choice-grid">
                <button type="button"><small>01</small><b>电影蓝调</b><span>冷色 · 克制 · 高反差</span></button>
                <button type="button" class="is-selected"><small>02</small><b>活动纪实</b><span>自然肤色 · 清晰主体 · 稳定质感</span></button>
                <button type="button"><small>03</small><b>霓虹街头</b><span>洋红 · 青蓝 · 湿地反射</span></button>
              </div>
            </div>`,
          insight: ["已选：活动纪实", "主体保护：开启", "方案由摄影师人工确认"]
        },
        {
          label: "叠加特效",
          meta: "完成局部优化",
          stage: `
            <div class="ix-effect-preview">
              <i class="ix-rain rain-a"></i><i class="ix-rain rain-b"></i><i class="ix-rain rain-c"></i>
              <span>实际调整项</span>
              <b>肤色保护 / 背景层次 / 轻颗粒</b>
            </div>
            <div class="ix-control-list">
              <div><span>肤色保护</span><i style="--value:92%"></i><b>高</b></div>
              <div><span>背景层次</span><i style="--value:68%"></i><b>中</b></div>
              <div><span>主体锐度</span><i style="--value:76%"></i><b>中</b></div>
              <div><span>自然颗粒</span><i style="--value:24%"></i><b>低</b></div>
            </div>`,
          insight: ["摄影师保留最终控制权", "原图与结果可以对照", "参数可复用于同组照片"]
        },
        {
          label: "输出设置",
          meta: "适配使用场景",
          stage: `
            <div class="ix-form-stack ix-span-two">
              <span class="ix-overline">交付规格</span>
              <h4>社交平台竖版内容 · 高清交付</h4>
              <div class="ix-option-rows">
                <div><span>画面比例</span><b><i>1:1</i><i class="is-on">4:5</i><i>9:16</i></b></div>
                <div><span>输出尺寸</span><b><i>1080P</i><i class="is-on">2K</i><i>4K</i></b></div>
                <div><span>文件格式</span><b><i>JPG</i><i class="is-on">PNG</i><i>WEBP</i></b></div>
              </div>
            </div>`,
          insight: ["目标：社交媒体发布", "覆盖 1K—4K 输出", "格式按客户要求选择"]
        },
        {
          label: "生成交付",
          meta: "复盘真实结果",
          stage: `
            <div class="ix-compare">
              <div class="ix-mini-scene is-before"><span>客户原片</span></div>
              <div class="ix-mini-scene is-after"><span>人工确认成片</span><i></i></div>
            </div>
            <div class="ix-result-card">
              <span class="ix-status-dot"></span><small>真实项目已完成交付</small>
              <h4>活动人物照 · 社交平台成片</h4>
              <div class="ix-metrics"><span><b>4 步</b>完成配置</span><span><b>1K—4K</b>输出范围</span><span><b>约 67%</b>流程提效</span></div>
              <button type="button" data-demo-toast="真实案例已完成交付；客户图片与文件不在公开页面展示">查看案例说明</button>
            </div>`,
          insight: ["结果经过摄影师人工确认", "流程效率较原方式提升约 67%", "客户素材不在公开页面展示"]
        }
      ]
    },
    brandloom: {
      eyebrow: "BRANDLOOM / AI 品牌策略平台",
      title: "真实案例：独立创作者品牌提案内测",
      note: "真实内测复盘 · 品牌名称与商业信息已脱敏",
      steps: [
        {
          label: "输入简报",
          meta: "对齐品牌背景",
          stage: `
            <div class="ix-brief-card">
              <span class="ix-overline">真实内测项目 · 名称已脱敏</span><h4>独立创作者个人品牌</h4>
              <p>把零散的个人定位和视觉偏好，整理成一份能够沟通与提案的品牌方案。</p>
              <div class="ix-tags"><span>个人品牌</span><span>内容创作</span><span>可信赖</span><span>可持续</span></div>
            </div>
            <div class="ix-brief-facts">
              <div><small>真实问题</small><b>方向多，但无法形成统一表达</b></div>
              <div><small>主要场景</small><b>作品发布与合作提案</b></div>
              <div><small>案例目标</small><b>完成一份可讲清楚的品牌提案</b></div>
            </div>`,
          insight: ["案例来自真实产品内测", "商业信息已脱敏", "需求由用户本人确认"]
        },
        {
          label: "策略生成",
          meta: "选择定位方向",
          stage: `
            <div class="ix-form-stack ix-span-two">
              <span class="ix-overline">本次内测生成的三条方向</span>
              <h4>从真实简报中收敛出一个主方向</h4>
              <div class="ix-strategy-list">
                <button type="button"><b>01 工具理性</b><span>强调效率、可靠与结构</span></button>
                <button type="button" class="is-selected"><b>02 安静创造</b><span>强调专注、留白与个人表达</span></button>
                <button type="button"><b>03 灵感伙伴</b><span>强调陪伴、启发与成长</span></button>
              </div>
            </div>`,
          insight: ["最终选择：安静创造", "选择经过用户人工确认", "未公开真实品牌文案"]
        },
        {
          label: "视觉系统",
          meta: "查看设计语言",
          stage: `
            <div class="ix-brand-board">
              <small>WORDMARK / 脱敏示意</small>
              <strong>CREATOR<span>°</span></strong>
              <p>真实方案结构，品牌名称已替换。</p>
            </div>
            <div class="ix-palette-board">
              <span style="--swatch:#0a0c0b">INK</span>
              <span style="--swatch:#c8ff48">SIGNAL</span>
              <span style="--swatch:#f1f0e9">PAPER</span>
              <div><small>字体组合</small><b>Inter / 思源黑体</b></div>
            </div>`,
          insight: ["保留真实方案结构", "敏感名称使用占位字标", "视觉选择由用户确认"]
        },
        {
          label: "人工确认",
          meta: "选择最终方案",
          stage: `
            <div class="ix-review-grid">
              <button type="button"><small>方案 A</small><b>CREATOR°</b><span>结构更强，表达更外向</span></button>
              <button type="button" class="is-selected"><small>方案 B · 已选</small><b>CREATOR/</b><span>更克制，适合个人品牌长期使用</span></button>
            </div>
            <div class="ix-approval-note">
              <span class="ix-status-dot"></span><b>设计负责人已确认</b>
              <p>保留方案 B 的字标结构，辅助色减少到一组。</p>
            </div>`,
          insight: ["真实人工确认节点", "反馈被写入下一阶段", "方案 B 进入交付"]
        },
        {
          label: "提案交付",
          meta: "整理品牌资产",
          stage: `
            <div class="ix-delivery">
              <span class="ix-overline">真实内测提案已完成</span>
              <h4>Creator_Brand_Proposal_v1.0</h4>
              <ul><li><b>✓</b>品牌定位与语气指南</li><li><b>✓</b>标识与安全空间规范</li><li><b>✓</b>色彩、字体与应用示例</li><li><b>✓</b>社交媒体模板规范</li></ul>
            </div>
            <div class="ix-delivery-score"><small>内测用户</small><strong>18</strong><span>人</span><button type="button" data-demo-toast="案例来自真实内测；为保护用户信息，公开页面不提供原始提案文件">查看案例说明</button></div>`,
          insight: ["种子用户：18 人", "独立完成率：86%", "内测满意度：4.2 / 5"]
        }
      ]
    },
    answerloom: {
      eyebrow: "AnswerLoom / GEO 优化工作台",
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
        <p><i></i>真实案例复盘<small>${config.note}</small></p>
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
