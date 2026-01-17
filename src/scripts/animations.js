import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Connect Lenis to ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

function initPageAnimations() {
  // Scroll Progress
  gsap.to('#scroll-progress', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3
    }
  });
  
  // 1. Reveal Text Animation (Cinematic)
  document.querySelectorAll('.reveal-text').forEach((el) => {
    const content = el.innerHTML;
    el.innerHTML = `<span class="inner" style="display: block;">${content}</span>`;
    const inner = el.querySelector('.inner');
    
    gsap.from(inner, {
      yPercent: 100,
      duration: 1.8,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 95%',
        toggleActions: 'play none none none'
      }
    });
  });

  // 2. High-End Scroll Animations (Fade/Scale)
  document.querySelectorAll('[data-animate]').forEach((el) => {
    const type = el.getAttribute('data-animate');
    const delay = parseFloat(el.getAttribute('data-delay')) || 0;
    
    let fromVars = {
      duration: 1.6,
      ease: 'expo.out',
      delay: delay,
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    };

    if (type === 'fade-up') fromVars.y = 40;
    if (type === 'fade-down') fromVars.y = -40;
    if (type === 'fade-left') fromVars.x = 40;
    if (type === 'fade-right') fromVars.x = -40;
    if (type === 'scale-in') fromVars.scale = 0.95;

    gsap.from(el, fromVars);
  });

  // 3. Staggered Cascade Reveal (Lists/Grids)
  document.querySelectorAll('[data-stagger]').forEach((container) => {
    const children = Array.from(container.children);
    gsap.from(children, {
      y: 30,
      duration: 1.2,
      stagger: 0.1,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  // 4. Subtle Image Parallax
  document.querySelectorAll('.img-hover-zoom img, .img-hover-zoom div').forEach((img) => {
    gsap.to(img, {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: img.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });

  // 5. Horizontal Scroll Section
  const horizontalSection = document.querySelector('.horizontal-scroll-section');
  const horizontalWrapper = document.querySelector('.horizontal-scroll-wrapper');
  
  if (horizontalSection && horizontalWrapper) {
    const getScrollAmount = () => {
      return -(horizontalWrapper.scrollWidth - window.innerWidth);
    };

    gsap.to(horizontalWrapper, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: horizontalSection,
        start: 'top top',
        end: () => `+=${horizontalWrapper.scrollWidth - window.innerWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1
      }
    });
  }
}

// Tactile Micro-interactions
function initInteractiveElements() {
  // Magnetic Elements
  document.querySelectorAll('.pill-link, .card-tactile, .nav-link, .nav-phone, .btn').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(el, {
        x: x * 0.15,
        y: y * 0.15,
        duration: 0.4,
        ease: 'power2.out'
      });
    });
    
    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.3)'
      });
    });
  });
}

// Custom Cursor Logic
function initCustomCursor() {
  const cursor = document.getElementById('cursor');
  const cursorOutline = document.getElementById('cursor-outline');
  
  if (!cursor || !cursorOutline) return;
  
  document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    
    gsap.to(cursor, {
      x: clientX,
      y: clientY,
      duration: 0.1,
      ease: 'power2.out'
    });
    
    gsap.to(cursorOutline, {
      x: clientX,
      y: clientY,
      duration: 0.35,
      ease: 'power2.out'
    });

    const isInteractive = e.target.closest('a, button, input, textarea, .pill-link, .group');
    if (isInteractive) {
      gsap.to(cursor, { scale: 2.5, backgroundColor: 'var(--color-primary)', duration: 0.3 });
      gsap.to(cursorOutline, { scale: 0.4, opacity: 0.2, duration: 0.3 });
    } else {
      gsap.to(cursor, { scale: 1, backgroundColor: 'var(--color-secondary)', duration: 0.3 });
      gsap.to(cursorOutline, { scale: 1, opacity: 1, duration: 0.3 });
    }
  });

  if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    cursorOutline.style.display = 'none';
  }
}

// Smooth Scroll for Anchors
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          lenis.scrollTo(target, {
            offset: -100,
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          });
        }
      }
    });
  });
}

// Initialize everything on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
  initPageAnimations();
  initInteractiveElements();
  initCustomCursor();
  initSmoothScroll();
});
