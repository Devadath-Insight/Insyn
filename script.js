/* ── CURSOR (desktop only) ── */
if(window.matchMedia('(pointer:fine)').matches){
  const cur=document.getElementById('cursor');
  const ring=document.getElementById('cursorRing');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{
    mx=e.clientX; my=e.clientY;
    cur.style.left=mx+'px'; cur.style.top=my+'px';
  });
  (function animRing(){
    rx+=(mx-rx)*.12; ry+=(my-ry)*.12;
    ring.style.left=rx+'px'; ring.style.top=ry+'px';
    requestAnimationFrame(animRing);
  })();
}

/* ── LOADER ── */
window.addEventListener('load',()=>{
  setTimeout(()=>document.getElementById('loader').classList.add('hidden'),1500);
});

/* ── NAVBAR SCROLL ── */
const navbar=document.getElementById('navbar');
window.addEventListener('scroll',()=>{
  navbar.classList.toggle('scrolled',window.scrollY>60);
},{passive:true});

/*whatsapp form submission*/

function sendToWhatsApp() {
  const name = document.querySelector('input[placeholder="Your Name"]').value;
  const email = document.querySelector('input[placeholder="Email Address"]').value;
  const phone = document.querySelector('input[placeholder="Phone / WhatsApp"]').value;
  const type = document.querySelector('select').value;
  const message = document.querySelector('textarea').value;

  const whatsappNumber = "919048631734"; // 

  const text =
`*New Enquiry - INSYN*

Name: ${name}
Email: ${email}
Phone: ${phone}
Type: ${type}
Message: ${message}`;

  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

  window.open(url, "_blank");
}



/* ── HAMBURGER ── */
const ham=document.getElementById('hamburger');
const mob=document.getElementById('mobileMenu');
ham.addEventListener('click',()=>{
  const isOpen=ham.classList.toggle('open');
  mob.classList.toggle('open');
  ham.setAttribute('aria-expanded',isOpen);
  document.body.style.overflow=isOpen?'hidden':'';
});
function closeMenu(){
  ham.classList.remove('open');
  mob.classList.remove('open');
  ham.setAttribute('aria-expanded','false');
  document.body.style.overflow='';
}
/* Close mobile menu on ESC */
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeMenu(); });

/* ── SCROLL REVEAL ── */
const revealEls=document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
},{threshold:.1, rootMargin:'0px 0px -40px 0px'});
revealEls.forEach(el=>io.observe(el));

/*Slide images*/

const slider = document.getElementById("slider");
const slides = slider.querySelectorAll("img");
const dotsContainer = document.getElementById("dots");

slides.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");

  dot.addEventListener("click", () => {
    slides[i].scrollIntoView({ behavior: "smooth", inline: "start" });
  });

  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

slider.addEventListener("scroll", () => {
  const index = Math.round(slider.scrollLeft / slider.clientWidth);

  dots.forEach(d => d.classList.remove("active"));
  if (dots[index]) dots[index].classList.add("active");
});


/* ── COUNTER ANIMATION ── */
function animateCount(el,target,dur=1800){
  let start=null;
  function step(ts){
    if(!start) start=ts;
    const p=Math.min((ts-start)/dur,1);
    const ease=1-Math.pow(1-p,3);
    el.textContent=Math.floor(ease*target)+(target===5?'★':target===100?'%':'+');
    if(p<1) requestAnimationFrame(step);
    else el.textContent=target+(target===5?'★':target===100?'%':'+');
  }
  requestAnimationFrame(step);
}
const statNums=document.querySelectorAll('.stat-num');
const statIO=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ animateCount(e.target,+e.target.dataset.count); statIO.unobserve(e.target); }
  });
},{threshold:.5});
statNums.forEach(el=>statIO.observe(el));

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t=document.querySelector(a.getAttribute('href'));
    if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth',block:'start'}); }
  });
});

/* ── PARALLAX HERO (only on desktop to avoid janky mobile scroll) ── */
if(window.matchMedia('(min-width:860px)').matches){
  const heroBg=document.querySelector('.hero-bg');
  window.addEventListener('scroll',()=>{
    if(heroBg) heroBg.style.transform='translateY('+(window.scrollY*.22)+'px)';
  },{passive:true});
}

/* ── TOUCH: pause review scroll on touch ── */
const track=document.getElementById('reviewsTrack');
if(track){
  track.addEventListener('touchstart',()=>{ track.style.animationPlayState='paused'; },{passive:true});
  track.addEventListener('touchend',()=>{ track.style.animationPlayState='running'; },{passive:true});
}