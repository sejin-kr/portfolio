// * =============== cursor ===============v *//
function cursorFunc() {
  const cursor = document.getElementById('cursor');
  const cards = document.querySelectorAll('.card');
  const footer = document.querySelector('footer');
  const footerText = document.querySelector('footer .f-txt');

  if (!cursor) return;

  // 실제 마우스 좌표
  let mouseX = 0;
  let mouseY = 0;

  // 커서 위치 (부드럽게 이동할 좌표)
  let cursorX = 0;
  let cursorY = 0;

  const speed = 0.1;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;

    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  // ✨ 카드에 호버시 cursor_preview 클래스 추가
  cards.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor_preview');
    });

    item.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor_preview');
    });
  });

  // ✨ footer 호버시 클래스 추가
  footer.addEventListener('mouseenter', () => {
    cursor.classList.add('cursor_point');
  });
  footer.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor_point');
  });

  // ✨ footer text 호버시 클래스 추가
  footerText.addEventListener('mouseenter', () => {
    cursor.classList.add('cursor_copyEmail');
  });
  footerText.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor_copyEmail');
  });
}

// * =============== split text ===============v *//
function splitTextEffect() {
  document.querySelectorAll('.card').forEach((card) => {
    const title = new SplitText(card.querySelector('.tit strong'), { type: 'chars' });
    const text = new SplitText(card.querySelector('.tit span'), { type: 'chars' });

    gsap.set(title.chars, { y: '-10px', opacity: 0, filter: 'blur(15px)' });
    gsap.set(text.chars, { y: '-5px', opacity: 0, filter: 'blur(15px)' });

    card.addEventListener('mouseenter', function () {
      gsap.to(title.chars, {
        y: '0',
        filter: 'blur(0px)',
        opacity: 1,
        stagger: () => gsap.utils.random(0, 0.2),
        duration: 0.6,
        ease: 'power2.out',
      });

      gsap.to(text.chars, {
        y: '0',
        filter: 'blur(0px)',
        opacity: 1,
        stagger: () => gsap.utils.random(0, 0.3),
        duration: 0.6,
        ease: 'power2.out',
      });
    });

    card.addEventListener('mouseleave', function () {
      gsap.to(title.chars, {
        y: '10px',
        filter: 'blur(10px)',
        opacity: 0,
        stagger: () => gsap.utils.random(0, 0.2),
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => gsap.set(title.chars, { y: '-10px', opacity: 0, filter: 'blur(15px)' }), // 원래 상태로 복귀
      });

      gsap.to(text.chars, {
        y: '10px',
        filter: 'blur(10px)',
        opacity: 0,
        stagger: () => gsap.utils.random(0, 0.3),
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => gsap.set(text.chars, { y: '-5px', opacity: 0, filter: 'blur(15px)' }), // 원래 상태로 복귀
      });
    });
  });
}

// * =============== split nav ===============v *//
function splitNavEffect() {
  const menuItems = document.querySelectorAll('nav a');

  menuItems.forEach((item) => {
    // SplitText 적용
    let split = new SplitText(item, { type: 'chars' });

    // 기본 상태 설정 (처음에는 y: 0)
    gsap.set(split.chars, { y: 0, opacity: 1 });

    // 마우스 호버 이벤트
    item.addEventListener('mouseenter', () => {
      let tl = gsap.timeline();

      tl.to(split.chars, {
        y: -10,
        duration: 0.25,
        stagger: 0.05,
        ease: 'power2.out',
      }).to(split.chars, {
        y: 0,
        duration: 0.25,
        stagger: 0.05,
        ease: 'power2.inOut',
      });
    });
  });
}

// 실행
splitNavEffect();

// * =============== marquee text ===============v *//
function marqueeTextEffect() {
  const swiper = new Swiper('.marqueeSwiper', {
    slidesPerView: 'auto',
    speed: 4000,
    loop: true,
    spaceBetween: 20,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    freemode: false,
    allowTouchMove: false,
    disabledOnInteraction: true,
    loopAdditionalSlides: 1,
    // centeredSlides: true,
  });
}

// * =============== sticky scrolling card ===============v *//
function scrollCardsFunc() {
  const text = document.querySelector('.typo-wrap');
  const listItem = document.querySelector('.card-content ul');

  console.log('sticky card loaded!');
}

window.addEventListener('load', function () {
  cursorFunc();
  splitTextEffect();
  splitNavEffect();
  marqueeTextEffect();
  scrollCardsFunc();
});
