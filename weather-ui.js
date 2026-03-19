(function(){

  // 既存UI削除
  let old=document.getElementById("wui");
  if(old) old.remove();

  // === ガラス風もこもこ雲ウィンドウ ===
  const wrap=document.createElement("div");
  wrap.id="wui";
  wrap.innerHTML=`
    <div class="title">今日の気分は？</div>
    <button class="btn" data-type="sun">☀️ 晴れ</button>
    <button class="btn" data-type="cloud">⛅ 曇り</button>
    <button class="btn" data-type="rain">🌧 雨</button>
    <button class="btn" data-type="rainbow">🌈 虹</button>
    <button class="btn" data-type="energy">⚡ だるい</button>
    <div id="msg"></div>
    <button id="closeBtn">閉じる</button>
  `;
  document.body.appendChild(wrap);

  // === ガラス風＆もこもこ雲CSS ===
  const st=document.createElement("style");
  st.innerHTML=`

  /* --- 全体ウィンドウ（ガラス雲） --- */
  #wui{
    position:fixed;
    top:20px;
    right:20px;
    width:240px;
    padding:25px 20px;
    border-radius:40px;
    background:rgba(255,255,255,0.35);
    box-shadow:0 0 30px rgba(255,255,255,0.6),0 6px 20px rgba(0,0,0,0.15);
    backdrop-filter:blur(14px);
    -webkit-backdrop-filter:blur(14px);
    z-index:999999;
    font-family:sans-serif;
    text-align:center;
    animation:fadein .5s ease forwards;
  }

  /* 雲のもこもこ輪郭を before/after で作る */
  #wui:before, #wui:after{
    content:"";
    position:absolute;
    background:rgba(255,255,255,0.35);
    backdrop-filter:blur(14px);
    border-radius:50%;
    z-index:-1;
    box-shadow:0 0 25px rgba(255,255,255,0.5);
  }
  #wui:before{
    width:110px;
    height:110px;
    top:-40px;
    left:30px;
  }
  #wui:after{
    width:90px;
    height:90px;
    top:-25px;
    right:20px;
  }

  /* タイトル */
  #wui .title{
    font-weight:bold;
    font-size:16px;
    margin-bottom:15px;
    color:#333;
  }

  /* ボタン */
  #wui .btn{
    width:100%;
    padding:12px 0;
    margin:6px 0;
    border:none;
    border-radius:18px;
    font-size:15px;
    cursor:pointer;
    background:rgba(255,255,255,0.7);
    box-shadow:0 2px 6px rgba(0,0,0,0.12);
    transition:0.25s;
  }
  #wui .btn:hover{
    background:rgba(255,255,255,0.85);
    transform:translateY(-2px);
  }

  /* 閉じる */
  #closeBtn{
    margin-top:18px;
    padding:8px 14px;
    border:none;
    border-radius:10px;
    background:#ddd;
    cursor:pointer;
  }

  #msg{
    margin-top:14px;
    min-height:22px;
    font-size:14px;
  }

  /* --- アニメーションエリア（天気演出） --- */
  .fx{
    position:fixed;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    z-index:999999;
    pointer-events:none;
  }

  /* 太陽回転 */
  @keyframes sunspin{
    0%{ transform:translate(-50%,-50%) scale(0.6) rotate(0deg); opacity:0; }
    40%{ opacity:1; }
    100%{ transform:translate(-50%,-50%) scale(1) rotate(360deg); opacity:0; }
  }

  /* 雨粒落下 */
  @keyframes raindrop{
    0%{ transform:translateY(0); opacity:0; }
    20%{ opacity:1; }
    100%{ transform:translateY(60px); opacity:0; }
  }

  /* 虹アニメ */
  @keyframes rainbows{
    0%{ transform:translate(-50%,-50%) scale(0.2); opacity:0; }
    100%{ transform:translate(-50%,-50%) scale(1); opacity:1; }
  }

  /* 雲ふわ〜 */
  @keyframes cloudfx{
    0%{ transform:translate(-50%,-50%) scale(0.7); opacity:0; }
    60%{ opacity:1; }
    100%{ transform:translate(-50%,-50%) scale(1); opacity:0; }
  }

  /* 雷シュバッ */
  @keyframes spark{
    0%{ opacity:0; transform:translate(-50%,-50%) scale(0.4) skew(-10deg,10deg); filter:brightness(1); }
    20%{ opacity:1; filter:brightness(2); }
    100%{ opacity:0; transform:translate(-50%,-50%) scale(1.2) skew(-10deg,10deg); filter:brightness(1); }
  }

  @keyframes fadein{
    from{ opacity:0; transform:scale(0.95); }
    to{ opacity:1; transform:scale(1); }
  }
  `;
  document.body.appendChild(st);

  // === 天気ボタンの動作 ===
  const msg=document.getElementById("msg");

  function spawnEffect(type){
    const fx=document.createElement("div");
    fx.className="fx";

    if(type==="sun"){
      fx.textContent="☀️";
      fx.style.fontSize="70px";
      fx.style.animation="sunspin 1.5s ease forwards";

    }else if(type==="rain"){
      // 雨粒3つ
      for(let i=0;i<3;i++){
        let drop=document.createElement("div");
        drop.style.position="absolute";
        drop.style.left=(i*14)+"px";
        drop.style.fontSize="22px";
        drop.textContent="💧";
        drop.style.animation="raindrop 0.9s ease forwards";
        fx.appendChild(drop);
      }

    }else if(type==="rainbow"){
      // 虹半円
      fx.style.width="160px";
      fx.style.height="80px";
      fx.style.borderRadius="80px 80px 0 0";
      fx.style.background="conic-gradient(red,orange,yellow,green,blue,indigo,violet)";
      fx.style.animation="rainbows 1.3s ease forwards";

    }else if(type==="cloud"){
      fx.textContent="☁️";
      fx.style.fontSize="70px";
      fx.style.animation="cloudfx 1.4s ease forwards";

    }else if(type==="energy"){
      fx.textContent="⚡";
      fx.style.fontSize="85px";
      fx.style.color="yellow";
      fx.style.animation="spark 0.8s ease forwards";
    }

    document.body.appendChild(fx);
    setTimeout(()=>fx.remove(),1600);
  }

  document.querySelectorAll(".btn").forEach(btn=>{
    btn.onclick=()=>{
      const type=btn.dataset.type;
      const emoji=btn.textContent.split(" ")[0];

      msg.textContent="送信中…";

      setTimeout(()=>{
        msg.textContent=`今日の気分：${emoji}`;
        spawnEffect(type);
      },400);
    };
  });

  document.getElementById("closeBtn").onclick=()=>wrap.remove();

})();
