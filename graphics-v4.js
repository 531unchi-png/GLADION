'use strict';
/* GLADION v5.2 — production transparent sprite layer */
(()=>{
const C=()=>ctx;
const SRC={
 player:'./93E1037C-4420-49C7-8635-62CA31D62A7F.PNG',
 enemy1:'./EA3BF3FC-FEA3-41C9-B7ED-948F878B3EC7.PNG',
 enemy2:'./44C4AF99-9753-431D-9619-5B9DDAAECB42.PNG',
 enemy3:'./F773CB7A-6014-4B0B-A994-973D33536DDF.PNG',
 boss:'./94E02639-59FF-4E0F-8702-F88A38646A28.PNG',
 missile:'./CD656E5B-808B-474C-A1AA-77BB8D91FB8C.PNG',
 laser:'./FB35C0AC-851D-4A47-A644-6119AD10F1A5.PNG',
 explosion:'./44355BD6-2092-4F12-9F21-286C841BCEF3.PNG'
};
const art={};
for(const [k,src] of Object.entries(SRC)){const im=new Image();im.decoding='async';im.src=src;art[k]=im}
const ready=k=>art[k]&&art[k].complete&&art[k].naturalWidth>0;
function sprite(c,k,x,y,h,alpha=1){if(!ready(k))return false;const im=art[k],w=h*(im.naturalWidth/im.naturalHeight);c.save();c.globalAlpha=alpha;c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';c.drawImage(im,x-w/2,y-h/2,w,h);c.restore();return true}
function fallbackPlayer(c,x,y,s=1){c.save();c.globalAlpha=1;c.translate(x,y);c.scale(s,s);c.fillStyle='#dce9ef';c.strokeStyle='#65eaff';c.lineWidth=2;c.beginPath();c.moveTo(58,0);c.lineTo(-38,-26);c.lineTo(-22,0);c.lineTo(-38,26);c.closePath();c.fill();c.stroke();c.restore()}
function playerSprite(c,x,y,s=1){c.save();c.globalAlpha=1;const ok=sprite(c,'player',x,y,88*s,1);c.restore();if(!ok)fallbackPlayer(c,x,y,s)}
window.drawShip=playerSprite;
const enemyKey=e=>e.type==='dart'||e.type==='drone'?'enemy2':e.type==='armor'||e.type==='bomber'?'enemy3':'enemy1';
window.drawEnemy=function(e){const c=C();if(e.type==='boss'){if(!sprite(c,'boss',e.x,e.y,Math.max(175,e.r*2.05)))return;return}const h=Math.max(48,e.r*3.25);sprite(c,enemyKey(e),e.x,e.y,h)};
const blasts=[];
const oldExplosion=window.explosion;
window.explosion=function(x,y,big=false){if(typeof oldExplosion==='function')oldExplosion(x,y,big);blasts.push({x,y,big,t:0,d:big?.72:.38})};
const baseRender=window.render;
window.render=function(){
 baseRender(); if(G.mode!=='play')return;
 const c=C(),now=1/60;
 // Ensure the player never inherits the base invulnerability blink alpha.
 c.save();c.globalAlpha=1;playerSprite(c,player.x,player.y,1);c.restore();
 missiles.each(m=>{if(!m.active)return;sprite(c,'missile',m.x,m.y,22)});
 // High-detail laser VFX when the laser weapon is active/firing.
 if(player.laser>0&&player.laserTick>0&&ready('laser')){const h=Math.max(22,18+player.laser*2);const im=art.laser,w=h*(im.naturalWidth/im.naturalHeight);c.save();c.globalAlpha=.9;c.globalCompositeOperation='lighter';c.drawImage(im,player.x+25,player.y-h/2,Math.min(w,W-player.x-20),h);c.restore()}
 for(let i=blasts.length-1;i>=0;i--){const b=blasts[i];b.t+=now;if(b.t>=b.d){blasts.splice(i,1);continue}const p=b.t/b.d,alpha=Math.sin(Math.PI*p),h=(b.big?230:92)*(0.55+p*.65);sprite(c,'explosion',b.x,b.y,h,alpha)}
};
window.GLADION_ART={version:'5.2-production-assets',assets:SRC,playerHeight:88,blinkDisabled:true};
})();