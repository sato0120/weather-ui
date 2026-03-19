(function(){

  // === ポップアップ側のコンテンツエリア ===
  const area = document.getElementById("contentArea");
  if (!area) {
    console.error("contentArea が見つからないよ！");
    return;
  }

  // === UI本文を描画 ===
  area.innerHTML = `
    <div style="font-weight:bold;font-size:22px;margin-bottom:35px;">
      今日の気分は？
    </div>

    <div id="icons" style="
      display:grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 28px;
      font-size:42px;
      padding: 0 40px;
      justify-items: center;
    ">
      <div class="ic" data-w="sun">☀️</div>
      <div class="ic" data-w="cloud">⛅</div>
      <div class="ic" data-w="rain">🌧</div>
      <div class="ic" data-w="umbrella">🌂</div>
      <div class="ic" data-w="light">⚡</div>
      <div class="ic" data-w="rainbow">🌈</div>
    </div>

    <div id="msg" style="
      margin-top:32px;
      font-size:17px;
      height:25px;
    "></div>
  `;

  const icons = area.querySelectorAll(".ic");
  const msg = area.querySelector("#msg");

  // === アニメーション用スタイル ===
  const st = document.createElement("style");
  st.textContent = `
    .ic {
      cursor: pointer;
      transition: transform 0.2s ease;
      text-shadow: 0 0 10px rgba(255,255,255,0.8);
    }
    .ic:hover {
      transform: scale(1.25);
    }

    /* 中央に出る pop アニメ */
    @keyframes popCenter {
      0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0; }
      40% { opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(1.6); opacity: 0; }
    }

    .fxPop {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 75px;
      z-index: 9999;
      animation: popCenter 0.9s forwards;
      pointer-events: none;
    }
  `;
  document.body.appendChild(st);

  // === アニメーションの発動処理 ===
  function spawnEffect(emoji) {
    const fx = document.createElement("div");
    fx.className = "fxPop";
    fx.textContent = emoji;

    // ★ ポップアップ全体の中央に固定位するため body に追加
    document.body.appendChild(fx);

    setTimeout(() => fx.remove(), 900);
  }

  // === アイコンクリック ===
  icons.forEach(ic => {
    ic.onclick = () => {
      const emoji = ic.textContent.trim();
      msg.textContent = `今日の気分：${emoji}`;
      spawnEffect(emoji);
    };
  });

  // === 閉じるボタン ===
  const closeBtn = document.getElementById("closeBtn");
  if (closeBtn) {
    closeBtn.onclick = () => {
      document.getElementById("popupCloud").style.display = "none";
    };
  }

})();
