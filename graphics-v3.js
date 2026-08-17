'use strict';
/* GLADION v3.5 — NO-BOX hotfix. Never draw boxed raster combat sprites. */
(()=>{
 const baseShip=window.drawShip, baseEnemy=window.drawEnemy, baseBg=window.bg;
 const bgImg=new Image(); bgImg.decoding='async'; bgImg.src='dark-ocean.png';
 const bgReady=()=>bgImg.complete&&bgImg.naturalWidth>0;
 function aura(c,x,y,r,color,a=.22){c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(.32,color);g.addColorStop(1,'rgba(0,0,0,0)');c.globalAlpha=a;c.fillStyle=g;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.restore()}
 function engine(c,x,y,s){c.save();c.globalCompositeOperation='lighter';for(let j=0;j<4;j++){const len=(42+j*10+Math.sin((G?.time||0)*18+j)*5)*s,g=c.createLinearGradient(x-len,y,x,y);g.addColorStop(0,'rgba(0,80,255,0)');g.addColorStop(.45,'rgba(0,145,255,.28)');g.addColorStop(.8,'rgba(50,225,255,.72)');g.addColorStop(1,'rgba(255,255,255,.98)');c.globalAlpha=.35+j*.13;c.fillStyle=g;c.beginPath();c.moveTo(x-len,y);c.lineTo(x+4*s,y-(4+j)*s);c.lineTo(x+4*s,y+(4+j)*s);c.closePath();c.fill()}c.restore()}
 window.drawShip=function(c,x,y,s=1){aura(c,x,y,52*s,'rgba(35,185,255,.8)',.2);engine(c,x-24*s,y,s);c.save();c.shadowColor='#47dfff';c.shadowBlur=16*s;baseShip(c,x,y,s);c.restore()};
 window.drawEnemy=function(e){const boss=e.type==='boss';aura(ctx,e.x,e.y,(boss?Math.max(90,e.r*1.5):Math.max(24,e.r*1.8)),boss?'rgba(255,20,80,.8)':'rgba(255,45,95,.65)',boss?.22:.14);ctx.save();ctx.shadowColor=boss?'#ff174f':'#ff365c';ctx.shadowBlur=boss?24:12;baseEnemy(e);ctx.restore()};
 window.bg=function(){if(!bgReady())return baseBg();ctx.save();ctx.fillStyle='#01040b';ctx.fillRect(0,0,W,H);const im=bgImg,scale=Math.max(W/im.naturalWidth,H/im.naturalHeight),dw=im.naturalWidth*scale,dh=im.naturalHeight*scale,ox=-((G.time*7)%Math.max(1,dw));ctx.globalAlpha=.95;ctx.drawImage(im,ox,0,dw,dh);ctx.drawImage(im,ox+dw,0,dw,dh);ctx.globalCompositeOperation='screen';const g=ctx.createRadialGradient(W*.6,H*.35,0,W*.6,H*.35,Math.max(W,H)*.72);g.addColorStop(0,'rgba(95,35,220,.17)');g.addColorStop(.48,'rgba(0,140,255,.08)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);ctx.restore()};
 window.GLADION_ART={version:'3.5',mode:'no-box-safe-vector',note:'boxed raster sprites disabled; transparent production sprites required before raster re-enable'};
})();
