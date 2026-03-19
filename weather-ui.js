(function(){

  const area = document.getElementById("contentArea");
  if (!area) return;

  // コンテンツHTML（佐藤さんのラフをUI化）
  area.innerHTML = `
    <div style="font-weight:bold;font-size:20px;margin-bottom:25px;">
      今日の気分は？
    </div>

    <div id="icons" style="
      display:grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 22px;
      font-size:38px;
      padding: 0 30px;
    ">
      <div class="ic" data-w="sun">☀️</div>
      <div class="ic" data-w="cloud">⛅</div>
      <div class="ic" data-w="rain">🌧</div>
      <div class="ic" data-w="umbrella">🌂</div>
      <div class="ic" data-w="light">⚡</div>
      <div class="ic" data-w="rainbow">🌈</div>
    </div>

    <div id="msg" style="margin-top:25px; font-size:16px; height:22px;">
    </div>
  `;

  const icons = area.querySelectorAll(".ic");
  const msg = area.querySelector("#msg");

  // アニメーション用スタイル
  const st = document.createElement("style");
  st.textContent = `
    .ic {
      cursor: pointer;
      transition: transform 0.15s;
      text-shadow: 0 0 8px rgba(255,255,255,0.8);
    }
    .ic:hover {
      transform: scale(1.25);
    }

    @keyframes pop {
      0% { transform: scale(0.3); opacity: 0; }
      50% { opacity: 1; }
      100% { transform: scale(1.4); opacity: 0; }
    }

    .fxPop {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      font-size:70px;
      animation: pop 0.9s forwards;
      pointer-events:none;
    }
  `;
  document.body.appendChild(st);

  // アイコン押したときの処理
  icons.forEach(ic => {
    ic.onclick = () => {
      const emoji = ic.textContent.trim();

      msg.textContent = `今日の気分：${emoji}`;

      const fx = document.createElement("div");
      fx.className = "fxPop";
      fx.textContent = emoji;
      document.getElementById("popupCloud").appendChild(fx);
      setTimeout(()=>fx.remove(),900);
    };
  });

  // 閉じる処理
  document.getElementById("closeBtn").onclick = () => {
    // popup全体を消す（Edgeの仕様上 window.close はNG）
    document.getElementById("popupCloud").style.display = "none";
  };

})();
