'use strict';
/* GLADION v2 — relative virtual stick. Keeps the player's ship visible under the thumb. */
(()=>{
  const root=document.createElement('div');root.id='punicon';root.className='hidden';root.setAttribute('aria-label','移動スティック');
  root.innerHTML='<div id="puniconKnob"></div><div id="puniconLabel">MOVE</div>';
  document.getElementById('combatHud').appendChild(root);
  const knob=document.getElementById('puniconKnob');
  const radius=42, speed=310;
  let active=false,pid=null,vx=0,vy=0,last=performance.now();
  const center=()=>{const r=root.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2}};
  function setStick(e){const c=center(),dx=e.clientX-c.x,dy=e.clientY-c.y,d=Math.hypot(dx,dy)||1,k=Math.min(radius,d)/d,x=dx*k,y=dy*k;knob.style.transform=`translate(${x}px,${y}px)`;vx=x/radius;vy=y/radius}
  function down(e){if(G.mode!=='play')return;e.preventDefault();e.stopPropagation();active=true;pid=e.pointerId;root.setPointerCapture?.(pid);setStick(e)}
  function move(e){if(!active||e.pointerId!==pid)return;e.preventDefault();e.stopPropagation();setStick(e)}
  function up(e){if(pid!==null&&e.pointerId!==undefined&&e.pointerId!==pid)return;active=false;pid=null;vx=vy=0;knob.style.transform='translate(0,0)'}
  root.addEventListener('pointerdown',down,{passive:false});root.addEventListener('pointermove',move,{passive:false});root.addEventListener('pointerup',up);root.addEventListener('pointercancel',up);
  function tick(now){const dt=Math.min(.04,(now-last)/1000||.016);last=now;if(G.mode==='play'){root.classList.remove('hidden');if(active&&player&&Number.isFinite(player.x)){player.targetX=clamp(player.targetX+vx*speed*dt,38,W*.68);player.targetY=clamp(player.targetY+vy*speed*dt,48,H-38)}}else root.classList.add('hidden');requestAnimationFrame(tick)}
  requestAnimationFrame(tick);
  /* Disable the old canvas-to-position gesture. Movement now belongs exclusively to the stick. */
  canvas.style.pointerEvents='none';root.style.pointerEvents='auto';
})();
