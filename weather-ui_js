(function(){
let o=document.getElementById("wui");if(o)o.remove();

let css = `
#wui{
 position:fixed;top:20px;right:20px;
 background:white;padding:20px;
 border-radius:24px;
 box-shadow:0 6px 18px rgba(0,0,0,.25);
 width:210px;font-family:sans-serif;
 text-align:center;z-index:999999;
 opacity:0;animation:fadein .4s forwards;
}
#wui .wb{
 width:100%;padding:12px;margin:8px 0;
 border:none;border-radius:14px;
 background:#f7f7f7;font-size:15px;
 box-shadow:0 2px 6px rgba(0,0,0,.12);
 cursor:pointer;transition:.2s;
}
#wui .wb:hover{background:#efefef;}
#wui #wcls{
 margin-top:14px;padding:6px 12px;
 border:none;background:#ddd;border-radius:8px;
 cursor:pointer;
}
@keyframes fadein{
 0%{opacity:0;transform:scale(.9);}
 100%{opacity:1;transform:scale(1);}
}
@keyframes popfade{
 0%{opacity:0;transform:translate(-50%,-50%) scale(.4);}
 40%{opacity:1;transform:translate(-50%,-50%) scale(1);}
 100%{opacity:0;transform:translate(-50%,-50%) scale(1.3);}
}
`;

let st=document.createElement("style");
st.innerHTML=css;
document.body.appendChild(st);

let b=document.createElement("div");
b.id="wui";
b.innerHTML=`
 <div style="font-weight:bold;font-size:16px;margin-bottom:12px;">
   今日の気分は？
 </div>

 <button class="wb" data-w="晴れ">☀️ 晴れ</button>
 <button class="wb" data-w="曇り">⛅ 曇り</button>
 <button class="wb" data-w="雨">🌧 雨</button>
 <button class="wb" data-w="だるい">⚡ だるい</button>
 <button class="wb" data-w="ねむい">😪 ねむい</button>

 <div id="wmsg" style="margin-top:14px;font-size:14px;min-height:20px;"></div>

 <button id="wcls">閉じる</button>
`;
document.body.appendChild(b);

document.querySelectorAll("#wui .wb").forEach(btn=>{
 btn.onclick=()=>{
   let w=btn.dataset.w;
   let emoji=btn.textContent.split(" ")[0];
   document.getElementById("wmsg").textContent="送信中…";

   setTimeout(()=>{
     document.getElementById("wmsg").textContent=`今日の気分：${emoji} ${w}`;

     let fx=document.createElement("div");
     fx.textContent=emoji;
     fx.style=`
       position:fixed;top:50%;left:50%;
       transform:translate(-50%,-50%);
       font-size:70px;z-index:999999;
       animation:popfade 1.2s forwards;
     `;
     document.body.appendChild(fx);
     setTimeout(()=>fx.remove(),1300);

   },400);
 };
});

document.getElementById("wcls").onclick=()=>b.remove();
})();
``
