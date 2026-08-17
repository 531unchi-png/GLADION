'use strict';
/* GLADION v2.2 — cinematic boss encounter */
(()=>{
const originalSpawnBoss=window.spawnBoss;
window.spawnBoss=function(){
 audio.warning();toast('WARNING');G.bossTriggered=true;G.flash=.25;G.shake=8;
 setTimeout(()=>toast('ABYSSAL DREADNOUGHT'),650);
 setTimeout(()=>{if(G.mode!=='play')return;const b={type:'boss',x:W+190,y:H*.5,hp:1500,maxHp:1500,r:96,phase:1,fire:.8,burst:0,pattern:0,patternClock:2.4,dead:false,score:15000,color:'#a51930'};enemies.push(b);G.boss=b;$('bossBar').classList.remove('hidden');$('bossTitle').textContent='ABYSSAL DREADNOUGHT';G.shake=14;G.flash=.35;},1500)
};
function shot(x,y,a,s=200,r=5,color='#ff3652'){enemyBullets.get({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,r,life:8,color})}
function aimed(b,count=5,spread=.13,speed=220){let a=Math.atan2(player.y-b.y,player.x-b.x);for(let i=0;i<count;i++)shot(b.x-60,b.y,a+(i-(count-1)/2)*spread,speed,5,'#ff3652')}
function fan(b,count=13,speed=180){for(let i=0;i<count;i++){let a=Math.PI+(i-(count-1)/2)*.115;shot(b.x-55,b.y,a,speed,4,'#ff8b35')}}
function ring(b,count=18,speed=145){for(let i=0;i<count;i++){let a=i/count*Math.PI*2+G.time*.35;shot(b.x,b.y,a,speed,4,'#d44cff')}}
function lance(b){let a=Math.atan2(player.y-b.y,player.x-b.x);for(let j=0;j<4;j++)setTimeout(()=>{if(G.mode!=='play'||b.dead)return;shot(b.x-70,b.y,a,300+j*18,7,'#ffe15a');G.shake=5;audio.tone(95,.12,'sawtooth',.035,-25)},j*100)}
const baseUpdate=window.update;
window.update=function(dt){baseUpdate(dt);const b=G.boss;if(!b||b.dead||G.clearing||G.mode!=='play')return;b.patternClock=(b.patternClock??1)-dt;if(b.patternClock>0)return;b.phase=b.hp/b.maxHp<.25?4:b.hp/b.maxHp<.5?3:b.hp/b.maxHp<.75?2:1;b.pattern=(b.pattern+1)%4;if(b.pattern===0){toast('MISSILE STORM');fan(b,9+b.phase*2,175+b.phase*12);b.patternClock=1.5}else if(b.pattern===1){toast('VOID RING');ring(b,12+b.phase*3,120+b.phase*15);b.patternClock=1.8}else if(b.pattern===2){toast('LOCKED');aimed(b,3+b.phase*2,.09,210+b.phase*15);b.patternClock=1.35}else{toast('ABYSS LANCE');G.flash=.12;lance(b);b.patternClock=2.1}if(b.phase===4){G.shake=Math.max(G.shake,4);b.patternClock*=.78}}
const baseActivate=window.activateOD;
window.activateOD=function(){if(player.od<100||player.overdrive)return;baseActivate();G.flash=.45;G.shake=18;enemyBullets.each(b=>{particle(b.x,b.y,'#9df8ff',3,100,3);b.active=false});for(const e of enemies)if(!e.dead){const d=e.type==='boss'?55:35;damageEnemy(e,d,e.x,e.y)}toast('GLADION BREAK');audio.tone(180,.45,'sawtooth',.08,900)};
})();