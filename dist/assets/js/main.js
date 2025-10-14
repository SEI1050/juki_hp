// assets/js/main.js
// jukibu — スライダー & ヘッダー制御
(function () {
    function initMain() {
      // --- スライダー要素 ---
      const slider = document.querySelector('.slider');
      const slides = Array.from(document.querySelectorAll('.slide'));
      const indicatorsContainer = document.querySelector('.indicators');
      let dots = Array.from(document.querySelectorAll('.dot'));
      const totalSlides = slides.length;
      let currentIndex = 0;
      let autoSlideTimer = null;
      const SLIDE_INTERVAL = 3000;
  
      // safety: if no slider present on this page, still init header-related logic below
      // but we preserve early return for slider-specific logic
      if (!slider || totalSlides === 0 || !indicatorsContainer) {
        // Still ensure header behavior (header code later uses querySelector)
        // No return here — we want header init to run regardless.
      }
  
      // --- ドット（インジケーター）構築 ---
      function buildIndicators() {
        if (!indicatorsContainer) return;
        if (dots.length !== totalSlides) {
          indicatorsContainer.innerHTML = '';
          for (let i = 0; i < totalSlides; i++) {
            const span = document.createElement('span');
            span.className = 'dot' + (i === 0 ? ' active' : '');
            span.setAttribute('role', 'button');
            span.setAttribute('aria-label', `スライド ${i + 1}`);
            span.addEventListener('click', () => {
              stopAutoSlide();
              goTo(i);
              startAutoSlide();
            });
            indicatorsContainer.appendChild(span);
          }
          dots = Array.from(indicatorsContainer.querySelectorAll('.dot'));
        } else {
          dots.forEach((d, i) => {
            d.addEventListener('click', () => {
              stopAutoSlide();
              goTo(i);
              startAutoSlide();
            });
          });
        }
      }
  
      // --- スライド表示更新 ---
      function updateSlider() {
        if (!slider) return;
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
      }
  
      function goTo(index) {
        if (typeof totalSlides !== 'number' || totalSlides === 0) return;
        currentIndex = ((index % totalSlides) + totalSlides) % totalSlides;
        updateSlider();
      }
  
      function nextSlide() {
        goTo(currentIndex + 1);
      }
  
      function startAutoSlide() {
        stopAutoSlide();
        autoSlideTimer = setInterval(nextSlide, SLIDE_INTERVAL);
      }
  
      function stopAutoSlide() {
        if (autoSlideTimer) {
          clearInterval(autoSlideTimer);
          autoSlideTimer = null;
        }
      }
  
      // --- 初期化（スライダー関連） ---
      if (slider && totalSlides > 0 && indicatorsContainer) {
        buildIndicators();
        updateSlider();
        startAutoSlide();
      }
  
      // --- キーボード操作（左右矢印） ---
      window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          stopAutoSlide();
          goTo(currentIndex - 1);
          startAutoSlide();
        } else if (e.key === 'ArrowRight') {
          stopAutoSlide();
          goTo(currentIndex + 1);
          startAutoSlide();
        }
      });
  
      // --- タッチスワイプ（簡易） ---
      if (slider) {
        let startX = 0, deltaX = 0, isDragging = false;
        const SWIPE_THRESHOLD = 30;
  
        slider.addEventListener('touchstart', (e) => {
          if (!e.touches || e.touches.length > 1) return;
          stopAutoSlide();
          startX = e.touches[0].clientX;
          isDragging = true;
          slider.style.transition = 'none';
        }, { passive: true });
  
        slider.addEventListener('touchmove', (e) => {
          if (!isDragging || !e.touches || e.touches.length > 1) return;
          const cx = e.touches[0].clientX;
          deltaX = cx - startX;
          const percent = (deltaX / slider.clientWidth) * 100;
          slider.style.transform = `translateX(-${currentIndex * 100 - percent}%)`;
        }, { passive: true });
  
        slider.addEventListener('touchend', () => {
          slider.style.transition = '';
          isDragging = false;
          if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
            if (deltaX < 0) {
              goTo(currentIndex + 1);
            } else {
              goTo(currentIndex - 1);
            }
          } else {
            updateSlider();
          }
          deltaX = 0;
          startAutoSlide();
        }, { passive: true });
      }
  
      // --- ヘッダーのフェード（スクロールで隠す / 表示） ---
      (function initHeaderFade() {
        const header = document.querySelector('header');
        if (!header) return;
        let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
        const HIDE_THRESHOLD = 50;
  
        // ページ読み込み時はトップ扱い
        header.classList.add('top');
  
        window.addEventListener('scroll', () => {
          const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
          if (currentScroll <= 0) {
            header.classList.add('top');
            header.classList.remove('hide');
          } else {
            header.classList.remove('top');
            if (currentScroll > lastScrollY && currentScroll > HIDE_THRESHOLD) {
              header.classList.add('hide');
            } else {
              header.classList.remove('hide');
            }
          }
          lastScrollY = currentScroll;
        }, { passive: true });
      })();
    } // end initMain
  
    // ensure initMain runs whether or not DOMContentLoaded already fired
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initMain);
    } else {
      // DOMContentLoaded already fired — run immediately
      initMain();
    }
})();
  





// document.addEventListener('DOMContentLoaded', () => {
//     // --- スライダー要素 ---
//     const slider = document.querySelector('.slider');
//     const slides = Array.from(document.querySelectorAll('.slide'));
//     const indicatorsContainer = document.querySelector('.indicators');
//     let dots = Array.from(document.querySelectorAll('.dot'));
//     const totalSlides = slides.length;
//     let currentIndex = 0;
//     let autoSlideTimer = null;
//     const SLIDE_INTERVAL = 3000;
    
    
//     if (!slider || totalSlides === 0 || !indicatorsContainer) return; // 安全策
    
    
//     // --- ドット（インジケーター）を実際のスライド数に合わせて作り直す ---
//     function buildIndicators() {
//         if (dots.length !== totalSlides) {
//             indicatorsContainer.innerHTML = '';
//             for (let i = 0; i < totalSlides; i++) {
//                 const span = document.createElement('span');
//                 span.className = 'dot' + (i === 0 ? ' active' : '');
//                 span.setAttribute('role', 'button');
//                 span.setAttribute('aria-label', `スライド ${i + 1}`);
//                 span.addEventListener('click', () => {
//                     stopAutoSlide();
//                     goTo(i);
//                     startAutoSlide();
//                 });
//                 indicatorsContainer.appendChild(span);
//             }
//             dots = Array.from(indicatorsContainer.querySelectorAll('.dot'));
//         }   else {
//         // 既存のドットがあればイベントを付与
//             dots.forEach((d, i) => {
//                 d.addEventListener('click', () => {
//                     stopAutoSlide();
//                     goTo(i);
//                     startAutoSlide();
//                 });
//             });
//         }
//     }

//         // --- スライド表示更新 ---

//         function updateSlider() {
//             slider.style.transform = `translateX(-${currentIndex * 100}%)`;
//             dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
//             }

//         function goTo(index) {
//             currentIndex = ((index % totalSlides) + totalSlides) % totalSlides;
//             updateSlider();
//         }


//         function nextSlide() {
//             goTo(currentIndex + 1);
//         }


//         function startAutoSlide() {
//             stopAutoSlide();
//             autoSlideTimer = setInterval(nextSlide, SLIDE_INTERVAL);
//         }


//         function stopAutoSlide() {
//             if (autoSlideTimer) {
//                 clearInterval(autoSlideTimer);
//                 autoSlideTimer = null;
//         }
//         }

//         // --- 初期化 ---
//         buildIndicators();
//         updateSlider();
//         startAutoSlide();


//         // --- キーボード操作（左右矢印） ---
//         window.addEventListener('keydown', (e) => {
//             if (e.key === 'ArrowLeft') {
//                 stopAutoSlide();
//                 goTo(currentIndex - 1);
//                 startAutoSlide();
//             }   else if (e.key === 'ArrowRight') {
//                 stopAutoSlide();
//                 goTo(currentIndex + 1);
//                 startAutoSlide();
//             }
//         });


//         // --- ヘッダーのフェード（スクロールで隠す / 表示） ---
//         const header = document.querySelector('header');
//         let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
//         const HIDE_THRESHOLD = 50;


//         // ページ読み込み時はトップ扱いにしておく
//         if (header) header.classList.add('top');


//         window.addEventListener('scroll', () => {
//             if (!header) return;
//             const currentScroll = window.pageYOffset || document.documentElement.scrollTop;


//             if (currentScroll <= 0) {
//                 header.classList.add('top');
//                 header.classList.remove('hide');
//             }   else {
//                 header.classList.remove('top');
//                 if (currentScroll > lastScrollY && currentScroll > HIDE_THRESHOLD) {
//         // 下スクロール → 隠す
//                 header.classList.add('hide');
//             }   else {
//         // 上スクロール → 表示
//                 header.classList.remove('hide');
//             }
//         }
//         lastScrollY = currentScroll;
//     }, { passive: true });
// });




