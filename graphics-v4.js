'use strict';
/* GLADION v5 CINEMATIC RENDERER — game logic untouched, no baked image cards. */
(()=>{
const C=()=>ctx;
function poly(c,p,fill,stroke,lw=1){c.beginPath();c.moveTo(p[0][0],p[0][1]);for(let i=1;i<p.length;i++)c.lineTo(p[i][0],p[i][1]);c.closePath();if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=lw;c.stroke()}}
function glow(c,color,blur=18){c.shadowColor=color;c.shadowBlur=blur}
function line(c,x1,y1,x2,y2,color,w=1){c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.strokeStyle=color;c.lineWidth=w;c.stroke()}
function engine(c,x,y,s=1,color='#35dfff'){c.save();c.globalCompositeOperation='lighter';let g=c.createLinearGradient(x-88*s,y,x+5*s,y);g.addColorStop(0,'rgba(0,70,255,0)');g.addColorStop(.35,'rgba(0,120,255,.22)');g.addColorStop(.72,color);g.addColorStop(1,'#fff');c.fillStyle=g;glow(c,color,24*s);poly(c,[[x-88*s,y],[x+3*s,y-9*s],[x+9*s,y],[x+3*s,y+9*s]],g);c.restore()}
function player(c,x,y,s=1){c.save();c.translate(x,y);c.scale(s,s);c.globalCompositeOperation='source-over';
 // silhouette: long, right-facing interceptor
 poly(c,[[-54,0],[-35,-18],[-10,-31],[18,-22],[58,-5],[73,0],[58,5],[18,22],[-10,31],[-35,18]],'#09121f','#77eaff',1.4);
 // swept wings
 poly(c,[[-22,-7],[-48,-43],[-10,-34],[18,-18],[42,-7]],'#121b2a','#42bfe8',1.2);poly(c,[[-22,7],[-48,43],[-10,34],[18,18],[42,7]],'#121b2a','#42bfe8',1.2);
 poly(c,[[-42,-38],[-19,-31],[3,-19],[-16,-16]],'#a80f2d','#ff4260',1);poly(c,[[-42,38],[-19,31],[3,19],[-16,16]],'#a80f2d','#ff4260',1);
 // armor plates
 poly(c,[[-30,-14],[4,-22],[46,-7],[18,-3]],'#d7e5ec','#fff',1);poly(c,[[-30,14],[4,22],[46,7],[18,3]],'#899aa7','#dff8ff',1);
 poly(c,[[10,-10],[59,-4],[72,0],[59,4],[10,10],[25,0]],'#263647','#ffc14d',1.2);
 // cockpit/core
 c.beginPath();c.ellipse(2,0,16,10,0,0,Math.PI*2);c.fillStyle='#071827';c.fill();c.strokeStyle='#5cecff';c.lineWidth=2;c.stroke();c.beginPath();c.ellipse(5,0,8,5,0,0,Math.PI*2);c.fillStyle='#bfffff';glow(c,'#38ddff',18);c.fill();c.shadowBlur=0;
 // panel detail
 for(let i=0;i<5;i++){line(c,-28+i*12,-16+i*.8,-18+i*12,-8,'rgba(105,225,255,.75)',.8);line(c,-28+i*12,16-i*.8,-18+i*12,8,'rgba(105,225,255,.55)',.8)}
 // guns
 line(c,24,-16,55,-10,'#ff3458',2);line(c,24,16,55,10,'#ff3458',2);c.restore();engine(c,x-43*s,y-14*s,.55*s);engine(c,x-43*s,y+14*s,.55*s)}
const styles={scout:{r:18,a:'#a70e25',b:'#ff304f'},dart:{r:15,a:'#6f0b20',b:'#ff6b3c'},armor:{r:29,a:'#350a16',b:'#ff304f'},bomber:{r:25,a:'#3a102c',b:'#ff3ca5'},drone:{r:17,a:'#421020',b:'#ff3c5c'}};
function foe(c,e){let st=styles[e.type]||styles.scout,r=st.r;c.save();c.translate(e.x,e.y); // left-facing
 glow(c,st.b,12);poly(c,[[r,0],[r*.45,-r*.7],[-r*.55,-r*.82],[-r,0],[-r*.55,r*.82],[r*.45,r*.7]],'#100812',st.b,1.2);c.shadowBlur=0;
 poly(c,[[r*.55,-r*.52],[-r*.2,-r*.58],[-r*.65,-r*.12],[r*.3,-r*.18]],st.a,'#ff6680',.8);poly(c,[[r*.55,r*.52],[-r*.2,r*.58],[-r*.65,r*.12],[r*.3,r*.18]],st.a,'#ff6680',.8);
 c.beginPath();c.arc(-r*.18,0,r*.27,0,Math.PI*2);c.fillStyle='#ff153f';glow(c,'#ff153f',16);c.fill();c.beginPath();c.arc(-r*.18,0,r*.11,0,Math.PI*2);c.fillStyle='#fff3da';c.fill();c.shadowBlur=0;
 line(c,-r*.9,-r*.22,-r*1.25,-r*.22,'#ff4260',1.5);line(c,-r*.9,r*.22,-r*1.25,r*.22,'#ff4260',1.5);c.restore();engine(c,e.x+r*.75,e.y,.28,'#ff3355')}
function boss(c,e){const r=Math.max(88,e.r),phase=e.phase||1;c.save();c.translate(e.x,e.y);glow(c,'#ff173f',22);
 // massive left-facing dreadnought silhouette
 poly(c,[[r*.95,-r*.18],[r*.45,-r*.65],[-r*.05,-r*.88],[-r*.62,-r*.62],[-r,-r*.18],[-r*1.18,0],[-r,r*.18],[-r*.62,r*.62],[-r*.05,r*.88],[r*.45,r*.65],[r*.95,r*.18]],'#09070d','#ff3152',2);
 c.shadowBlur=0; // layered armor
 for(const sy of [-1,1]){poly(c,[[r*.55,sy*r*.16],[r*.35,sy*r*.5],[-r*.05,sy*r*.72],[-r*.55,sy*r*.48],[-r*.78,sy*r*.18]],'#24101b','#9b263b',1);poly(c,[[r*.18,sy*r*.22],[-r*.1,sy*r*.52],[-r*.46,sy*r*.39],[-r*.6,sy*r*.18]],'#4b0c1d','#ff3652',1.2)}
 // reactor
 let rg=c.createRadialGradient(-r*.12,0,2,-r*.12,0,r*.32);rg.addColorStop(0,'#fff');rg.addColorStop(.2,'#ffdf9c');rg.addColorStop(.5,'#ff173f');rg.addColorStop(1,'rgba(255,0,30,0)');c.fillStyle=rg;glow(c,'#ff153f',28);c.beginPath();c.arc(-r*.12,0,r*.34,0,Math.PI*2);c.fill();c.shadowBlur=0;
 // turrets + hot lines
 for(const sy of [-1,1])for(let i=0;i<3;i++){let tx=-r*.35+i*r*.32,ty=sy*(r*.28+i*r*.1);c.fillStyle='#15121a';c.fillRect(tx-r*.09,ty-r*.06,r*.18,r*.12);line(c,tx-r*.04,ty,tx-r*.36,ty,phase>=3?'#ffbf44':'#ff3152',2)}
 for(let i=0;i<6;i++)line(c,-r*.72+i*r*.23,-r*.12,-r*.62+i*r*.23,r*.12,'rgba(255,58,85,.75)',1);
 c.restore();for(const yy of [-.48,0,.48])engine(c,e.x+r*.72,e.y+r*yy,.42,'#ff2748')}
window.drawShip=player;
window.drawEnemy=function(e){if(e.type==='boss')boss(C(),e);else foe(C(),e)};
// cinematic VFX replaces primitive bullet rendering by drawing additive halos after base frame
const baseRender=window.render;
window.render=function(){baseRender();if(G.mode!=='play')return;const c=C();c.save();c.globalCompositeOperation='lighter';
 bullets.each(b=>{let g=c.createLinearGradient(b.x-26,b.y,b.x+18,b.y);g.addColorStop(0,'rgba(20,110,255,0)');g.addColorStop(.5,'#20bfff');g.addColorStop(1,'#fff');c.strokeStyle=g;c.lineWidth=5;glow(c,'#37dfff',15);line(c,b.x-25,b.y,b.x+18,b.y,g,4)});
 missiles.each(m=>{let g=c.createLinearGradient(m.x-32,m.y,m.x+8,m.y);g.addColorStop(0,'rgba(255,60,0,0)');g.addColorStop(.6,'#ff8a22');g.addColorStop(1,'#fff');line(c,m.x-32,m.y,m.x+8,m.y,g,4)});
 particles.each(p=>{if(!p.active)return;c.globalAlpha=Math.max(0,p.life/(p.max||.65));c.fillStyle=p.color;glow(c,p.color,8);c.beginPath();c.arc(p.x,p.y,Math.max(1,p.size*1.25),0,Math.PI*2);c.fill()});
 c.restore();};
window.GLADION_ART={version:'5.0-cinematic',mode:'procedural-hi-detail'};
})();