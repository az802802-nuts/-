/*
 * 路地珈琲（Roji Coffee）Webサイト共通スクリプト
 * ------------------------------------------------------------
 * ・JavaScriptが無効な環境でも全コンテンツが問題なく閲覧できることを前提に、
 *   あくまで「静けさ」を演出する控えめな表示アニメーションのみを付加する。
 * ・ナビゲーションやページ遷移などの必須機能はJSに依存しない。
 */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ヘッダー：スクロール時にごく薄い影を付ける（主張しすぎない程度） */
  var header = document.querySelector(".site-header");
  if (header) {
    var updateHeaderShadow = function () {
      if (window.scrollY > 8) {
        header.style.boxShadow = "0 2px 10px rgba(58, 46, 39, 0.08)";
      } else {
        header.style.boxShadow = "none";
      }
    };
    updateHeaderShadow();
    window.addEventListener("scroll", updateHeaderShadow, { passive: true });
  }

  /* セクションのゆっくりとしたフェードイン表示（対応ブラウザのみ・控えめに） */
  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    var revealTargets = document.querySelectorAll(
      ".feature-card, .preview-card, .split-section, .menu-item"
    );

    if (revealTargets.length) {
      revealTargets.forEach(function (el) {
        el.classList.add("is-reveal-ready");
      });

      var observer = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-revealed");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );

      revealTargets.forEach(function (el) {
        observer.observe(el);
      });
    }
  }
})();
