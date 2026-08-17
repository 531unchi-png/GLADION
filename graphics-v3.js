'use strict';
/* GLADION v3.7 — asset rendering layer. Game logic stays in game.js. */
(()=>{
 const baseBg=window.bg;
 const load=src=>{const i=new Image();i.decoding='async';i.src=src;return i};
 const A={
  bg:load('dark-ocean.png'),
  player:load('player-gladion.png'),
  scout:load('enemy-scout.png'),
  dart:load('enemy-assault.png'),
  armor:load('enemy-guardian.png'),
  bomber:load('enemy-shield.png'),
  drone:load('enemy-assault.png'),
  boss:load('boss-abyss-core.png'),
  boss2:load('boss-abyss-core-phase2.png')
 };
 const ready=i=>i&&i.complete&&i.naturalWidth>0;
 function cropBounds(img){
  if(!ready(img))return null;
  const key=img.src;if(cropBounds.cache.has(key))return cropBounds.cache.get(key);
  try{const c=document.createElement('canvas'),w=img.naturalWidth,h=img.naturalHeight;c.width=w;c.height=h;const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(img,0,0);const d=x.getImageData(0,0,w,h).data;let l=w,t=h,r=-1,b=-1;
   for(let yy=0;yy<h;yy+=2)for(let xx=0;xx<w;xx+=2){const n=(yy*w+xx)*4,a=d[n+3];if(a<18)continue;const rr=d[n],gg=d[n+1],bb=d[n+2];const mx=Math.max(rr,gg,bb),mn=Math.min(rr,gg,bb);const nearWhite=mn>225&&mx-mn<22;const pale=mn>185&&mx-mn<30;if(nearWhite||pale)continue;l=Math.min(l,xx);r=Math.max(r,xx);t=Math.min(t,yy);b=Math.max(b,yy)}
   const out=r>l&&b>t?{x:Math.max(0,l-4),y:Math.max(0,t-4),w:Math.min(w-l+4,r-l+9),h:Math.min(h-t+4,b-t+9)}:{x:0,y:0,w,h};cropBounds.cache.set(key,out);return out;
  }catch(_){return{x:0,y:0,w:img.naturalWidth,h:img.naturalHeight}}
 }
 cropBounds.cache=new Map();
 function sprite(c,img,x,y,targetW,targetH,glow){if(!ready(img))return false;const s=cropBounds(img);c.save();c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';if(glow){c.shadowColor=glow;c.shadowBlur=16}c.drawImage(img,s.x,s.y,s.w,s.h,x-targetW/2,y-targetH/2,targetW,targetH);c.restore();return true}
 function engine(c,x,y,s){c.save();c.globalCompositeOperation='lighter';const g=c.createLinearGradient(x-55*s,y,x+4*s,y);g.addColorStop(0,'rgba(0,80,255,0)');g.addColorStop(.48,'rgba(0,150,255,.38)');g.addColorStop(.78,'#27dcff');g.addColorStop(1,'#fff');c.fillStyle=g;c.shadowColor='#19cfff';c.shadowBlur=20;c.beginPath();c.moveTo(x-55*s,y);c.lineTo(x+5*s,y-8*s);c.lineTo(x+5*s,y+8*s);c.closePath();c.fill();c.restore()}
 window.drawShip=function(c,x,y,s=1){engine(c,x-35*s,y,s);if(sprite(c,A.player,x,y,112*s,82*s,'#32cfff'))return;c.save();c.translate(x,y);c.scale(s,s);c.fillStyle='#eafaff';c.beginPath();c.moveTo(42,0);c.lineTo(-26,-28);c.lineTo(-12,0);c.lineTo(-26,28);c.closePath();c.fill();c.restore()};
 const dims={scout:[62,46],dart:[70,46],armor:[88,66],bomber:[82,68],drone:[62,46]};
 window.drawEnemy=function(e){const c=ctx;if(e.type==='boss'){const img=e.phase>=2?A.boss2:A.boss;const w=Math.max(220,e.r*2.75),h=w*.78;if(sprite(c,img,e.x,e.y,w,h,'#ff244f'))return} else {const d=dims[e.type]||dims.scout;if(sprite(c,A[e.type]||A.scout,e.x,e.y,d[0],d[1],'#ff3158'))return}c.save();c.translate(e.x,e.y);c.strokeStyle='#ff3158';c.lineWidth=2;c.beginPath();c.moveTo(-e.r,0);c.lineTo(e.r,-e.r*.7);c.lineTo(e.r,e.r*.7);c.closePath();c.stroke();c.restore()};
 window.bg=function(){const img=A.bg;if(!ready(img))return baseBg();ctx.save();ctx.fillStyle='#01040c';ctx.fillRect(0,0,W,H);const sc=Math.max(W/img.naturalWidth,H/img.naturalHeight),dw=img.naturalWidth*sc,dh=img.naturalHeight*sc,travel=Math.max(1,dw),ox=-((G.time*7)%travel);ctx.globalAlpha=.94;ctx.drawImage(img,ox,(H-dh)/2,dw,dh);ctx.drawImage(img,ox+dw,(H-dh)/2,dw,dh);ctx.globalCompositeOperation='screen';const v=ctx.createRadialGradient(W*.58,H*.48,0,W*.58,H*.48,Math.max(W,H)*.75);v.addColorStop(0,'rgba(0,130,255,.08)');v.addColorStop(.5,'rgba(80,20,190,.06)');v.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=v;ctx.fillRect(0,0,W,H);ctx.restore()};
 window.GLADION_ART={version:'3.7',mode:'asset-layer',assets:A};
})();
