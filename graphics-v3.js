'use strict';
/* GLADION v4.0 — transparent player asset gate; game logic remains untouched. */
(()=>{
 const baseBg=window.bg;
 const load=src=>{const i=new Image();i.decoding='async';i.src=src;return i};
 const A={bg:load('dark-ocean.png'),player:load('assets/gladion-player-v4.svg'),scout:load('enemy-scout.png'),dart:load('enemy-assault.png'),armor:load('enemy-guardian.png'),bomber:load('enemy-shield.png'),drone:load('enemy-assault.png'),boss:load('boss-abyss-core.png'),boss2:load('boss-abyss-core-phase2.png')};
 const ready=i=>i&&i.complete&&i.naturalWidth>0;
 function drawAsset(c,img,x,y,w,h,glow,flip=false){if(!ready(img))return false;c.save();c.translate(x,y);if(flip)c.scale(-1,1);c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';if(glow){c.shadowColor=glow;c.shadowBlur=14}c.drawImage(img,-w/2,-h/2,w,h);c.restore();return true}
 function engine(c,x,y,s){c.save();c.globalCompositeOperation='lighter';const g=c.createLinearGradient(x-70*s,y,x+5*s,y);g.addColorStop(0,'rgba(0,90,255,0)');g.addColorStop(.5,'rgba(0,170,255,.42)');g.addColorStop(.82,'#33eaff');g.addColorStop(1,'#fff');c.fillStyle=g;c.shadowColor='#25dfff';c.shadowBlur=22;c.beginPath();c.moveTo(x-70*s,y);c.lineTo(x+5*s,y-9*s);c.lineTo(x+5*s,y+9*s);c.closePath();c.fill();c.restore()}
 window.drawShip=function(c,x,y,s=1){engine(c,x-52*s,y,s);if(drawAsset(c,A.player,x,y,142*s,86*s,'#37ddff',false))return;c.save();c.translate(x,y);c.fillStyle='#dffaff';c.beginPath();c.moveTo(55*s,0);c.lineTo(-40*s,-30*s);c.lineTo(-20*s,0);c.lineTo(-40*s,30*s);c.closePath();c.fill();c.restore()};
 const dims={scout:[62,46],dart:[70,46],armor:[88,66],bomber:[82,68],drone:[62,46]};
 window.drawEnemy=function(e){const c=ctx;if(e.type==='boss'){const img=e.phase>=2?A.boss2:A.boss;const w=Math.max(220,e.r*2.75),h=w*.78;if(drawAsset(c,img,e.x,e.y,w,h,'#ff244f',true))return}else{const d=dims[e.type]||dims.scout;if(drawAsset(c,A[e.type]||A.scout,e.x,e.y,d[0],d[1],'#ff3158',true))return}c.save();c.translate(e.x,e.y);c.strokeStyle='#ff3158';c.lineWidth=2;c.beginPath();c.moveTo(-e.r,0);c.lineTo(e.r,-e.r*.7);c.lineTo(e.r,e.r*.7);c.closePath();c.stroke();c.restore()};
 window.bg=function(){const img=A.bg;if(!ready(img))return baseBg();ctx.save();ctx.fillStyle='#01040c';ctx.fillRect(0,0,W,H);const sc=Math.max(W/img.naturalWidth,H/img.naturalHeight),dw=img.naturalWidth*sc,dh=img.naturalHeight*sc,ox=-((G.time*7)%Math.max(1,dw));ctx.globalAlpha=.94;ctx.drawImage(img,ox,(H-dh)/2,dw,dh);ctx.drawImage(img,ox+dw,(H-dh)/2,dw,dh);ctx.restore()};
 window.GLADION_ART={version:'4.0-player-gate',mode:'transparent-assets',assets:A};
})();