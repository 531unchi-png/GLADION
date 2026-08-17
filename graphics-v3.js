'use strict';
/* GLADION v3.2 — real PNG sprite renderer */
(()=>{
 const baseShip=window.drawShip, baseEnemy=window.drawEnemy, baseBg=window.bg;
 const paths={player:'player-gladion.png',scout:'enemy-scout.png',assault:'enemy-assault.png',shield:'enemy-shield.png',guardian:'enemy-guardian.png',boss:'boss-abyss-core.png',boss2:'boss-abyss-core-phase2.png',background:'dark-ocean.png'};
 const art={};
 Object.entries(paths).forEach(([k,src])=>{const im=new Image();im.decoding='async';im.src=src;art[k]=im});
 const ready=k=>art[k]&&art[k].complete&&art[k].naturalWidth>0;
 function sprite(c,im,x,y,w,h,rot=0,flip=false){c.save();c.translate(x,y);c.rotate(rot);if(flip)c.scale(-1,1);c.shadowColor='#47dfff';c.shadowBlur=10;c.drawImage(im,-w/2,-h/2,w,h);c.restore()}
 window.drawShip=function(c,x,y,s=1){if(!ready('player'))return baseShip(c,x,y,s);const pulse=1+Math.sin((window.G?.time||0)*10)*.025;sprite(c,art.player,x,y,96*s*pulse,118*s*pulse,Math.PI/2);c.save();c.globalCompositeOperation='lighter';const g=c.createLinearGradient(x-75*s,y,x-25*s,y);g.addColorStop(0,'rgba(25,111,255,0)');g.addColorStop(.65,'rgba(52,207,255,.55)');g.addColorStop(1,'rgba(220,255,255,.9)');c.fillStyle=g;c.fillRect(x-78*s,y-10*s,55*s,20*s);c.restore()};
 const map={scout:'scout',dart:'assault',armor:'guardian',bomber:'shield',drone:'assault'};
 window.drawEnemy=function(e){if(e.type==='boss'){const key=e.phase>=3&&ready('boss2')?'boss2':'boss';if(!ready(key))return baseEnemy(e);const size=Math.max(150,e.r*2.55);sprite(ctx,art[key],e.x,e.y,size,size,Math.PI/2,true);return}const key=map[e.type]||'scout';if(!ready(key))return baseEnemy(e);const size=Math.max(42,e.r*3.1);sprite(ctx,art[key],e.x,e.y,size,size,Math.PI/2,true)};
 window.bg=function(){baseBg();if(!ready('background'))return;ctx.save();ctx.globalAlpha=.72;const im=art.background;const scale=Math.max(W/im.naturalWidth,H/im.naturalHeight);const dw=im.naturalWidth*scale,dh=im.naturalHeight*scale;let ox=-((G.time*18)%(Math.max(1,dw)));ctx.drawImage(im,ox,0,dw,dh);ctx.drawImage(im,ox+dw,0,dw,dh);ctx.globalCompositeOperation='screen';const neb=ctx.createRadialGradient(W*.58,H*.32,10,W*.58,H*.32,Math.max(W,H)*.62);neb.addColorStop(0,'rgba(40,145,255,.18)');neb.addColorStop(.55,'rgba(80,20,145,.08)');neb.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=neb;ctx.fillRect(0,0,W,H);ctx.restore()};
 window.GLADION_ART={version:'3.2',mode:'real-png',paths,images:art};
})();
