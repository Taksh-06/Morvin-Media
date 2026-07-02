// CURSOR
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursor-trail');
let mx=0,my=0,tx=0,ty=0;
document.addEventListener('mousemove',e=>{
  mx=e.clientX;my=e.clientY;
  cursor.style.left=mx+'px';cursor.style.top=my+'px';
});
function animTrail(){
  tx+=(mx-tx)*.12;ty+=(my-ty)*.12;
  trail.style.left=tx+'px';trail.style.top=ty+'px';
  requestAnimationFrame(animTrail);
}
animTrail();

// LOADER
window.addEventListener('load',()=>{
  let pct=0;
  const num=document.getElementById('loader-num');
  const iv=setInterval(()=>{
    pct+=Math.random()*15;
    if(pct>=100){pct=100;clearInterval(iv);}
    num.textContent=Math.round(pct)+'%';
  },80);
  setTimeout(()=>{
    const l=document.getElementById('loader');
    l.style.opacity='0';l.style.transition='opacity .8s';
    setTimeout(()=>{l.style.display='none';},800);
  },2000);
});

// NAV SCROLL
const navbar=document.getElementById('navbar');
window.addEventListener('scroll',()=>{
  if(window.scrollY>80) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// REVEAL ON SCROLL
const revealEls=document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
const revealObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
},{threshold:.12});
revealEls.forEach(el=>revealObs.observe(el));

// PROJECT CARD OVERLAY FIX
document.querySelectorAll('.project-card').forEach(card=>{
  card.addEventListener('mouseenter',()=>{
    const info=card.querySelector('.project-info');
    if(info) info.style.opacity='1';
  });
  card.addEventListener('mouseleave',()=>{
    const info=card.querySelector('.project-info');
    if(info) info.style.opacity='0';
  });
});

// COUNTER
const counters=document.querySelectorAll('.counter');
const counterObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const el=e.target;
      const target=+el.dataset.target;
      let cur=0;
      const step=target/60;
      const iv=setInterval(()=>{
        cur+=step;
        if(cur>=target){cur=target;clearInterval(iv);}
        el.textContent=Math.round(cur).toLocaleString();
      },16);
      counterObs.unobserve(el);
    }
  });
},{threshold:.5});
counters.forEach(c=>counterObs.observe(c));

// FAQ ACCORDION
document.querySelectorAll('.faq-q').forEach(q=>{
  q.addEventListener('click',()=>{
    const item=q.parentElement;
    const a=item.querySelector('.faq-a');
    const inner=item.querySelector('.faq-a-inner');
    const open=item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i=>{
      i.classList.remove('open');
      i.querySelector('.faq-a').style.height='0';
      i.querySelector('.faq-q').setAttribute('aria-expanded','false');
    });
    if(!open){
      item.classList.add('open');
      a.style.height=inner.offsetHeight+'px';
      q.setAttribute('aria-expanded','true');
    }
  });
  q.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();q.click();}});
});

// BEFORE/AFTER SLIDER
const baHandle=document.getElementById('baHandle');
const baAfter=document.getElementById('baAfter');
const baWrap=document.querySelector('.ba-wrap');
if(baHandle){
  let dragging=false;
  const move=x=>{
    const rect=baWrap.getBoundingClientRect();
    let pct=((x-rect.left)/rect.width)*100;
    pct=Math.max(5,Math.min(95,pct));
    baAfter.style.clipPath=`inset(0 ${100-pct}% 0 0)`;
    baHandle.style.left=pct+'%';
    document.getElementById('baArrows').style.left=pct+'%';
  };
  baHandle.addEventListener('mousedown',e=>{dragging=true;e.preventDefault();});
  baWrap.addEventListener('click',e=>move(e.clientX));
  document.addEventListener('mousemove',e=>{if(dragging)move(e.clientX);});
  document.addEventListener('mouseup',()=>dragging=false);
  baHandle.addEventListener('touchstart',e=>{dragging=true;e.preventDefault();},{passive:false});
  document.addEventListener('touchmove',e=>{if(dragging)move(e.touches[0].clientX);},{passive:true});
  document.addEventListener('touchend',()=>dragging=false);
}

// CONTACT FORM
const contactSubmit = document.getElementById('contact-submit');
if(contactSubmit){
  contactSubmit.addEventListener('click',()=>{
    const name=document.getElementById('f-name').value.trim();
    const email=document.getElementById('f-email').value.trim();
    if(!name||!email){alert('Please fill in your name and email.');return;}
    contactSubmit.textContent='Sent! ✓';
    contactSubmit.style.background='#1a3a1a';
    contactSubmit.style.color='#4ade80';
    document.getElementById('form-success').style.display='block';
  });
}

// MAGNETIC BUTTONS (subtle)
document.querySelectorAll('.btn-primary,.btn-outline,.nav-cta').forEach(btn=>{
  btn.addEventListener('mousemove',e=>{
    const r=btn.getBoundingClientRect();
    const x=(e.clientX-r.left-r.width/2)*.2;
    const y=(e.clientY-r.top-r.height/2)*.2;
    btn.style.transform=`translate(${x}px,${y}px)`;
  });
  btn.addEventListener('mouseleave',()=>{btn.style.transform='';});
});

// HAMBURGER
const hamburger=document.getElementById('hamburger');
if(hamburger){
  hamburger.addEventListener('click',()=>{
    const links=document.querySelector('.nav-links');
    if(links.style.display==='flex'){
      links.style.cssText=''; // Clear inline styles so it falls back to desktop CSS
    } else {
      links.style.cssText='display:flex;flex-direction:column;position:fixed;top:0;left:0;right:0;bottom:0;background:#0D0D0D;align-items:center;justify-content:center;gap:2rem;z-index:9998';
      links.querySelectorAll('a').forEach(a=>a.style.fontSize='1.5rem');
    }
  });
}

// PARALLAX HERO GRID
document.addEventListener('mousemove',e=>{
  const hg = document.querySelector('.hero-grid');
  if(hg){
    const x=(e.clientX/window.innerWidth-.5)*20;
    const y=(e.clientY/window.innerHeight-.5)*20;
    hg.style.transform=`translate(${x}px,${y}px)`;
  }
});

// GSAP SCROLL ANIMATIONS (if loaded)
if(typeof gsap!=='undefined'&&typeof ScrollTrigger!=='undefined'){
  gsap.registerPlugin(ScrollTrigger);
  gsap.from('.hero-h1',{
    duration:1.4,
    y:80,opacity:0,
    ease:'power4.out',
    delay:.3
  });
  gsap.from('.hero-sub',{
    duration:1.2,
    y:40,opacity:0,
    ease:'power3.out',
    delay:.6
  });
  gsap.from('.hero-ctas',{
    duration:1,
    y:30,opacity:0,
    ease:'power3.out',
    delay:.9
  });
}