(function(){

  const area = document.getElementById("contentArea");
  if (!area) return;

  // UI本体
  area.innerHTML = `
    <div style="font-weight:bold;font-size:20px;margin-bottom:25px;">
      今日の気分は？
    </div>

    <div id="icons" style="
      display:grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      font-size:40px;
      padding: 0 30px;
      justify-items: center;
    ">
      <div class="ic">☀️</div>
      <div class="ic">⛅</div>
      <div class="ic">🌧</div>
      <div class="ic">🌂</div>
      <div class="ic">⚡</div>
      <div class="ic">🌈</div>
    </div>

    <div id="msg" style="margin-top:25px; font-size:16px; height:22px;"></div>
  `;

  const icons = area.querySelectorAll(".ic");
  const msg = area.querySelector("#msg");

  const st = document.createElement("style");
  st.textContent = `
    .ic { cursor:pointer; transition:0.2s; }
    .ic:hover { transform: scale(1.2); }

    @keyframes fxPop {
      0% { transform: translate(-50%, -50%) scale(0.3); opacity:0;}
      40% { opacity:1; }
      100% { transform: translate(-50%, -50%) scale(1.6); opacity:0; }
    }
    .fx {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 70px;
      z-index: 1000;
      animation: fxPop 0.9s forwards;
      pointer-events: none;
    }
  `;
  document.body.appendChild(st);

  // アニメを body 中央に固定
  function spawnFX(emoji) {
    const fx = document.createElement("div");
    fx.className = "fx";
    fx.textContent = emoji;
    document.body.appendChild(fx);
    setTimeout(() => fx.remove(), 900);
  }

  icons.forEach(ic=>{
    ic.onclick = ()=>{
      const emoji = ic.textContent.trim();
      msg.textContent = `今日の気分：${emoji}`;
      spawnFX(emoji);
    };
  });

  document.getElementById("closeBtn").onclick = () => {
    document.getElementById("popupCloud").style.display = "none";
  };

})();
