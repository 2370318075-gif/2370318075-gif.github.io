(() => {
  "use strict";

  const demos = {
    muyu: {
      eyebrow: "MUYU / AI 影像创作平台",
      badge: "预制案例演示",
      title: "预制案例：二次元角色人像精修",
      note: "完整体验二次元人像修图流程 · 案例素材与结果均为演示内容",
      steps: [
        {
          label: "导入人像",
          meta: "上传漫展角色原片",
          stage: `
            <div class="ix-scene ix-anime-portrait" aria-label="二次元角色人像案例预览">
              <span class="ix-anime-halo"></span>
              <span class="ix-anime-hair"></span>
              <span class="ix-anime-face"><i></i><i></i><b></b></span>
              <span class="ix-anime-costume"></span>
              <span class="ix-scene-label">COSPLAY RAW · 24 MP</span>
            </div>
            <div class="ix-form-stack">
              <span class="ix-overline">PRESET CASE 01 / 二次元返图</span>
              <h4>漫展角色人像 · 樱色幻想主题</h4>
              <div class="ix-file-row"><span>cosplay_portrait_01.dng</span><b>预制素材</b></div>
              <div class="ix-tags"><span>角色人像</span><span>妆面细节</span><span>服装纹理</span></div>
            </div>`,
          insight: ["案例类型：二次元角色返图", "目标：保留本人特征并强化角色感", "素材为预制演示内容"]
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
                <button type="button" class="is-selected"><small>02</small><b>樱色幻想</b><span>粉紫 · 梦幻光晕 · 细腻肤质</span></button>
                <button type="button"><small>03</small><b>赛博角色</b><span>青蓝 · 霓虹轮廓 · 高反差</span></button>
              </div>
            </div>`,
          insight: ["案例选择：樱色幻想", "本人特征保护：开启", "预设只影响色彩与氛围"]
        },
        {
          label: "人像精修",
          meta: "调整五官与细节",
          stage: `
            <div class="ix-effect-preview">
              <i class="ix-rain rain-a"></i><i class="ix-rain rain-b"></i><i class="ix-rain rain-c"></i>
              <span>二次元人像精修面板</span>
              <b>肤质 / 五官 / 发丝 / 服装细节</b>
            </div>
            <div class="ix-control-list">
              <div><span>肤质净化</span><i style="--value:64%"></i><b>64</b></div>
              <div><span>五官精修</span><i style="--value:46%"></i><b>46</b></div>
              <div><span>发丝增强</span><i style="--value:78%"></i><b>78</b></div>
              <div><span>服装纹理</span><i style="--value:72%"></i><b>72</b></div>
            </div>`,
          insight: ["保留本人面部识别特征", "四类细节可分别控制", "支持原图与精修图对比"]
        },
        {
          label: "背景氛围",
          meta: "补充角色世界观",
          stage: `
            <div class="ix-form-stack ix-span-two">
              <span class="ix-overline">角色氛围与交付设置</span>
              <h4>樱花光斑背景 · 漫展返图竖版</h4>
              <div class="ix-option-rows">
                <div><span>背景氛围</span><b><i>纯色棚拍</i><i class="is-on">樱花光斑</i><i>赛博街景</i></b></div>
                <div><span>画面比例</span><b><i>1:1</i><i class="is-on">4:5</i><i>9:16</i></b></div>
                <div><span>输出尺寸</span><b><i>1080P</i><i class="is-on">2K</i><i>4K</i></b></div>
              </div>
            </div>`,
          insight: ["背景不会覆盖人物轮廓", "案例选择：樱花光斑", "输出：2K / 4:5"]
        },
        {
          label: "导出返图",
          meta: "查看精修结果",
          stage: `
            <div class="ix-compare">
              <div class="ix-mini-scene ix-anime-before is-before"><span>角色原片</span></div>
              <div class="ix-mini-scene ix-anime-after is-after"><span>二次元精修</span><i></i></div>
            </div>
            <div class="ix-result-card">
              <span class="ix-status-dot"></span><small>预制案例演示完成</small>
              <h4>漫展角色_樱色幻想_精修_v01.png</h4>
              <div class="ix-metrics"><span><b>2K</b>返图尺寸</span><span><b>4:5</b>人像比例</span><span><b>PNG</b>导出格式</span></div>
              <button type="button" data-demo-toast="这是用于展示 MUYU 工作流的预制案例，不会生成或下载真实文件">查看案例说明</button>
            </div>`,
          insight: ["完整展示二次元人像修图流程", "所有内容均为预制演示", "不会调用真实生成模型"]
        }
      ]
    },
    brandloom: {
      eyebrow: "BRANDLOOM / AI 品牌策略平台",
      badge: "预制案例演示",
      title: "预制案例：栖屿咖啡品牌提案",
      note: "完整体验品牌策略流程 · 品牌与内容均为演示设定",
      steps: [
        {
          label: "输入简报",
          meta: "对齐品牌背景",
          stage: `
            <div class="ix-brief-card">
              <span class="ix-overline">PRESET CASE 02 / 新消费品牌</span><h4>栖屿咖啡 QIYU COFFEE</h4>
              <p>为城市独处者提供一杯安静、松弛、可以短暂停靠的社区咖啡。</p>
              <div class="ix-tags"><span>社区咖啡</span><span>安静松弛</span><span>城市停靠</span><span>自然质感</span></div>
            </div>
            <div class="ix-brief-facts">
              <div><small>目标人群</small><b>22—35 岁城市青年</b></div>
              <div><small>主要场景</small><b>通勤停靠与周末独处</b></div>
              <div><small>案例目标</small><b>形成可落地的品牌定位与视觉提案</b></div>
            </div>`,
          insight: ["案例类型：社区咖啡品牌", "品牌资料为预制演示设定", "可完整体验提案流程"]
        },
        {
          label: "策略生成",
          meta: "选择定位方向",
          stage: `
            <div class="ix-form-stack ix-span-two">
              <span class="ix-overline">案例策略方向</span>
              <h4>从“卖咖啡”收敛到“城市停靠点”</h4>
              <div class="ix-strategy-list">
                <button type="button"><b>01 日常能量</b><span>强调高效、稳定与通勤补给</span></button>
                <button type="button" class="is-selected"><b>02 城市停靠</b><span>强调独处、松弛与短暂停留</span></button>
                <button type="button"><b>03 社区连接</b><span>强调邻里、熟悉感与共同活动</span></button>
              </div>
            </div>`,
          insight: ["案例选择：城市停靠", "品牌承诺：给忙碌留一小段空白", "语气：自然、安静、不过度营销"]
        },
        {
          label: "视觉系统",
          meta: "查看设计语言",
          stage: `
            <div class="ix-brand-board">
              <small>WORDMARK / CASE 02</small>
              <strong>QIYU<span>°</span></strong>
              <p>Pause here, then move on.</p>
            </div>
            <div class="ix-palette-board">
              <span style="--swatch:#0a0c0b">INK</span>
              <span style="--swatch:#c8ff48">SIGNAL</span>
              <span style="--swatch:#f1f0e9">PAPER</span>
              <div><small>字体组合</small><b>Inter / 思源黑体</b></div>
            </div>`,
          insight: ["案例字标：QIYU°", "主色：Signal Green", "中英文组合已建立"]
        },
        {
          label: "人工确认",
          meta: "选择最终方案",
          stage: `
            <div class="ix-review-grid">
              <button type="button"><small>方案 A</small><b>QIYU°</b><span>更轻快，适合社交媒体传播</span></button>
              <button type="button" class="is-selected"><small>方案 B · 已选</small><b>栖屿 /</b><span>更安静，适合门店与包装长期使用</span></button>
            </div>
            <div class="ix-approval-note">
              <span class="ix-status-dot"></span><b>设计负责人已确认</b>
              <p>保留方案 B 的字标结构，辅助色减少到一组。</p>
            </div>`,
          insight: ["案例选择：方案 B", "保留中式文字识别度", "辅助色缩减为一组"]
        },
        {
          label: "提案交付",
          meta: "整理品牌资产",
          stage: `
            <div class="ix-delivery">
              <span class="ix-overline">预制品牌提案已就绪</span>
              <h4>QIYU_COFFEE_Brand_Proposal_v1.0</h4>
              <ul><li><b>✓</b>品牌定位与语气指南</li><li><b>✓</b>标识与安全空间规范</li><li><b>✓</b>色彩、字体与应用示例</li><li><b>✓</b>社交媒体模板规范</li></ul>
            </div>
            <div class="ix-delivery-score"><small>案例交付物</small><strong>4</strong><span>类</span><button type="button" data-demo-toast="这是用于展示 BRANDLOOM 工作流的预制案例，不会创建真实品牌资产">查看案例说明</button></div>`,
          insight: ["品牌定位与语气", "字标、色彩和字体规范", "社交媒体与门店应用示例"]
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
