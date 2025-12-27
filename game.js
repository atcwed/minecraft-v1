const c=document.getElementById('game'),x=c.getContext('2d');
c.width=innerWidth;c.height=innerHeight;
const S=32,G=0.6;
const img={1:new Image(),2:new Image(),3:new Image(),4:new Image(),p:new Image(),e:new Image()};
img[1].src='textures/grass.png';img[2].src='textures/dirt.png';
img[3].src='textures/stone.png';img[4].src='textures/wood.png';
img.p.src='textures/player.png';img.e.src='textures/enemy.png';

let world=JSON.parse(localStorage.getItem('world'))||[];
if(!world.length){
 for(let y=0;y<25;y++){world[y]=[];
  for(let x0=0;x0<80;x0++) world[y][x0]=y>13?1:0;
 }}
const pl={x:100,y:0,w:28,h:28,vx:0,vy:0,g:false,hp:100,blk:1};
const en={x:400,y:0,w:28,h:28,vx:-1};

let L=false,R=false;
left.ontouchstart=()=>L=true;left.ontouchend=()=>L=false;
right.ontouchstart=()=>R=true;right.ontouchend=()=>R=false;
jump.ontouchstart=()=>{if(pl.g){pl.vy=-12;pl.g=false}};

function sel(b){pl.blk=b}

c.addEventListener('touchstart',e=>{
 const t=e.touches[0];
 const x0=Math.floor(t.clientX/S),y0=Math.floor(t.clientY/S);
 world[y0][x0]=world[y0][x0]?0:pl.blk;
 localStorage.setItem('world',JSON.stringify(world));
});

function u(){
 pl.vx=L?-4:R?4:0;pl.vy+=G;
 pl.x+=pl.vx;pl.y+=pl.vy;
 if(pl.y+pl.h>14*S){pl.y=14*S-pl.h;pl.vy=0;pl.g=true}
 en.x+=en.vx;if(Math.abs(en.x-pl.x)<28)pl.hp--;
 document.getElementById('hp').textContent=pl.hp;
}
function d(){
 x.clearRect(0,0,c.width,c.height);
 for(let y in world)for(let x0 in world[y])
  if(world[y][x0])x.drawImage(img[world[y][x0]],x0*S,y*S,S,S);
 x.drawImage(img.p,pl.x,pl.y,pl.w,pl.h);
 x.drawImage(img.e,en.x,en.y,en.w,en.h);
}
(function loop(){u();d();requestAnimationFrame(loop)})();