'use strict';
/* GLADION v2.3 — high-detail combat art pass */
(()=>{
 const baseShip=window.drawShip,baseEnemy=window.drawEnemy;
 const line=(c,x1,y1,x2,y2,color,w=1)=>{c.strokeStyle=color;c.lineWidth=w;c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke()};
 window.drawShip=function(c,x,y,s=1){
  baseShip(c,x,y,s);c.save();c.translate(x,y);c.scale(s,s);
  c.globalCompositeOperation='lighter';c.shadowColor='#6feaff';c.shadowBlur=12;
  line(c,-13,-13,14,-8,'#bff8ff',1);line(c,-13,13,14,8,'#bff8ff',1);
  c.fillStyle='#eafcff';c.fillRect(18,-1,13,2);c.fillStyle='#ff3952';c.fillRect(-19,-20,8,2);c.fillRect(-19,18,8,2);
  c.strokeStyle='#62eaff';c.globalAlpha=.7;c.beginPath();c.arc(3,0,13,-.55,.55);c.stroke();
  c.globalAlpha=.9;c.fillStyle='#77efff';c.beginPath();c.arc(-20,-10,2.2,0,7);c.arc(-20,10,2.2,0,7);c.fill();c.restore();
 };
 window.drawEnemy=function(e){
  baseEnemy(e);ctx.save();ctx.translate(e.x,e.y);ctx.globalCompositeOperation='lighter';
  if(e.type==='boss'){
   ctx.globalAlpha=.65;ctx.strokeStyle=e.phase>=3?'#ffcf58':'#ff4b66';ctx.lineWidth=1.5;
   for(const sy of [-1,1]){line(ctx,-72,sy*42,45,sy*58,ctx.strokeStyle,1.5);line(ctx,-48,sy*68,28,sy*38,'#8ca9bb',1)}
   for(const sy of [-1,1]){ctx.shadowColor='#ff3552';ctx.shadowBlur=15;ctx.fillStyle='#fff0dc';ctx.beginPath();ctx.arc(49,sy*37,4,0,7);ctx.fill()}
   ctx.shadowBlur=0;ctx.globalAlpha=.3;ctx.strokeStyle='#ff4b66';ctx.beginPath();ctx.arc(-12,0,38+Math.sin(G.time*4)*4,0,7);ctx.stroke();
  }else{
   const r=e.r;ctx.globalAlpha=.65;ctx.strokeStyle='#d9f7ff';ctx.lineWidth=.8;line(ctx,-r*.55,-r*.25,r*.45,-r*.12,'#d9f7ff',.8);line(ctx,-r*.55,r*.25,r*.45,r*.12,'#d9f7ff',.8);
   ctx.shadowColor=e.color;ctx.shadowBlur=10;ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(r*.28,0,Math.max(1.5,r*.1),0,7);ctx.fill();
  }ctx.restore();
 };
 const baseDraw=window.draw;
 window.draw=function(){baseDraw();if(G.mode!=='play')return;ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.11;ctx.strokeStyle='#7adfff';for(let i=0;i<7;i++){const y=(i*97+G.time*73)%H;ctx.lineWidth=i%3===0?2:1;ctx.beginPath();ctx.moveTo(W*.08,y);ctx.lineTo(W*.34,y-rand(0,4));ctx.stroke()}ctx.restore()};
})();
