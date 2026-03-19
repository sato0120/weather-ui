(function(){

  // 古いUI削除
  const old = document.getElementById("wui");
  if (old) old.remove();

  const container = document.getElementById("app");
  if (!container) return;

  // UI本体
  const wrap = document.createElement("div");
  wrap.id = "wui";

  wrap.style.position = "absolute";
  wrap.style.top = "50%";
  wrap.style.left = "50%";
  wrap.style.transform = "translate(-50%, -50%)";
  wrap.style.width = "260px";
  wrap.style.padding = "25px 20px";
  wrap.style.borderRadius = "40px";
  wrap.style.background = "rgba(255,255,255,0.45)";
  wrap.style.backdropFilter = "blur(10px)";
  wrap.style.webkitBackdropFilter = "blur(10px)";
  wrap.style.boxShadow = "0 0 20px rgba(0,0,0,0.13)";
  wrap.style.textAlign = "center";
  wrap.style.fontFamily = "sans-serif";

  wrap.innerHTML = `
    <div style="font-weight:bold;font-size:16px;margin-bottom:15px;">今日の気分は？</div>
    <button class="btn" data-type="sun">☀️ 晴れ</button>
    <button class="btn" data-type="cloud">⛅ 曇り</button>
    <button class="btn" data-type="rain">🌧 雨</button>
    <button class="btn" data-type="rainbow">🌈 虹</button>
    <button class="btn" data-type="energy">⚡ だるい</button>
    <div id="msg" style="margin-top:15px;min-height:20px;"></div>
    <button id="closeUI" style="margin-top:15px;padding:7px 15px;border:none;border-radius:10px;background:#ddd;">閉じる</button>
  `;

  // container 内へ追加（重要）
  container.appendChild(wrap);

  // ボタン共通スタイル
  const style = document.createElement("style");
  style.textContent = `
    .btn {
      width: 100%;
      padding: 12px 0;
      margin: 6px 0;
      border: none;
      border-radius: 18px;
      background: rgba(255,255,255,0.7);
      box-shadow: 0 2px 5px rgba(0,0,0,0.12);
      font-size: 15px;
      cursor: pointer;
    }
    .btn:hover {
      background: rgba(255,255,255,0.9);
    }
    @keyframes pop {
      0% { transform: scale(0.4); opacity: 0; }
      50% { opacity: 1; }
      100% { transform: scale(1.4); opacity: 0; }
    }
  `;
  container.appendChild(style);

  const msg = wrap.querySelector("#msg");

  // アニメーション発動要素
  function spawnEffect(emoji) {
    const fx = document.createElement("div");
    fx.textContent = emoji;
    fx.style.position = "absolute";
    fx.style.top = "50%";
    fx.style.left = "50%";
    fx.style.transform = "translate(-50%, -50%)";
    fx.style.fontSize = "60px";
    fx.style.animation = "pop 0.9s forwards";
    container.appendChild(fx);
    setTimeout(()=>fx.remove(), 900);
  }

  wrap.querySelectorAll(".btn").forEach(btn=>{
    btn.onclick = ()=>{
      const emoji = btn.textContent.split(" ")[0];
      msg.textContent = `今日の気分：${emoji}`;
      spawnEffect(emoji);
    };
  });

  // UIだけ閉じる
  wrap.querySelector("#closeUI").onclick = ()=> wrap.remove();

})();
