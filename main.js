(function () {
  "use strict";

  var MOBILE_INITIAL_COUNT = 4;
  var MD_MIN_WIDTH = "(min-width: 768px)";

  /** Mobile: extra products are in #show-more-wrapper; expanded = visible with smooth max-height */
  var mobileExpanded = false;
  /** "desktop" | "mobile" | null — rebuild grid only when this flips */
  var lastLayout = null;

  var products = [
    {
      id: "p1",
      title: "Outside Vibes T-Shirt Sunshine",
      href: "#",
      price: 104.95,
      img1: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80&auto=format&fit=crop",
      img2: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80&auto=format&fit=crop",
      badges: [{ text: "Best Seller", position: "left" }, { text: "Save 15%", position: "right" }],
      rating: { value: 4.5, reviewsCount: 1234, label: "Rated 4.5 out of 5 stars, 1,234 reviews" },
    },
    {
      id: "p2",
      title: "Hike Bottle Outside Vibes Forest Green",
      href: "#",
      price: 104.95,
      img1: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80&auto=format&fit=crop",
      img2: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&q=80&auto=format&fit=crop",
      badges: [{ text: "Save 15%", position: "right" }],
      rating: { value: 4.5, reviewsCount: 1234, label: "Rated 4.5 out of 5 stars, 1,234 reviews" },
    },
    {
      id: "p3",
      title: "Rest in Nature T-Shirt Charcoal",
      href: "#",
      price: 104.95,
      img1: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80&auto=format&fit=crop",
      img2: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80&auto=format&fit=crop",
      badges: [{ text: "Best Seller", position: "left" }, { text: "Save 15%", position: "right" }],
      rating: { value: 4.5, reviewsCount: 1234, label: "Rated 4.5 out of 5 stars, 1,234 reviews" },
    },
    {
      id: "p4",
      title: "Outside Vibes Cap Forest Green",
      href: "#",
      price: 104.95,
      img1: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80&auto=format&fit=crop",
      img2: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&q=80&auto=format&fit=crop",
      badges: [{ text: "Save 15%", position: "right" }],
      rating: { value: 4.5, reviewsCount: 1234, label: "Rated 4.5 out of 5 stars, 1,234 reviews" },
    },
    {
      id: "p5",
      title: "Rest in Nature Fragrance",
      href: "#",
      price: 104.95,
      img1: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80&auto=format&fit=crop",
      img2: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      badges: [{ text: "Best Seller", position: "left" }],
      rating: { value: 4.5, reviewsCount: 1234, label: "Rated 4.5 out of 5 stars, 1,234 reviews" },
    },
    {
      id: "p6",
      title: "Rest in Nature T-Shirt Charcoal (Alternate View)",
      href: "#",
      price: 104.95,
      img1: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop",
      img2: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      badges: [{ text: "Best Seller", position: "left" }],
      rating: { value: 4.5, reviewsCount: 1234, label: "Rated 4.5 out of 5 stars, 1,234 reviews" },
    },
    {
      id: "p7",
      title: "Classic Watch Silver",
      href: "#",
      price: 104.95,
      img1: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80&auto=format&fit=crop",
      img2: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80&auto=format&fit=crop",
      badges: [{ text: "Best Seller", position: "left" }, { text: "Save 15%", position: "right" }],
      rating: { value: 4.5, reviewsCount: 892, label: "Rated 4.5 out of 5 stars, 892 reviews" },
    },
    {
      id: "p8",
      title: "Minimal Backpack Black",
      href: "#",
      price: 104.95,
      img1: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80&auto=format&fit=crop",
      img2: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop",
      badges: [{ text: "Best Seller", position: "left" }, { text: "Save 15%", position: "right" }],
      rating: { value: 4.5, reviewsCount: 567, label: "Rated 4.5 out of 5 stars, 567 reviews" },
    },
    {
      id: "p9",
      title: "Wireless Earbuds Pro",
      href: "#",
      price: 104.95,
      img1: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80&auto=format&fit=crop",
      img2: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80&auto=format&fit=crop",
      badges: [{ text: "Save 15%", position: "right" }],
      rating: { value: 4.5, reviewsCount: 2103, label: "Rated 4.5 out of 5 stars, 2,103 reviews" },
    },
    {
      id: "p10",
      title: "Leather Journal Brown",
      href: "#",
      price: 104.95,
      img1: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80&auto=format&fit=crop",
      img2: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80&auto=format&fit=crop",
      badges: [{ text: "Save 15%", position: "right" }, { text: "Best Seller", position: "left" }],
      rating: { value: 4.5, reviewsCount: 678, label: "Rated 4.5 out of 5 stars, 678 reviews" },
    },
  ];

  function escapeHtml(text) {
    var map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return String(text).replace(/[&<>"']/g, function (ch) {
      return map[ch];
    });
  }

  function escapeAttr(text) {
    return escapeHtml(text).replace(/`/g, "&#096;");
  }

  function formatReviewsCount(n) {
    return String(Number(n) || 0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function renderStars(rating) {
    var val = rating && typeof rating.value === "number" ? rating.value : 4.5;
    var full = Math.floor(val);
    var frac = val - full;
    var hasHalf = frac >= 0.25 && frac < 0.99;
    var i;
    var html = '<span class="inline-flex items-center gap-px text-[11px] sm:text-xs leading-none" aria-hidden="true">';
    for (i = 0; i < full; i++) {
      html += '<span class="text-gray-900">★</span>';
    }
    if (hasHalf) {
      html += '<span class="text-gray-900 opacity-50">★</span>';
    }
    var empty = 5 - full - (hasHalf ? 1 : 0);
    for (i = 0; i < empty; i++) {
      html += '<span class="text-gray-300">☆</span>';
    }
    html += "</span>";
    return html;
  }

  /** Mock: Best Seller = white + black border; Save = dark green + white text. Optional colorClass overrides. */
  function badgeStyles(b) {
    if (b.colorClass) return b.colorClass;
    var t = (b.text || "").toLowerCase();
    if (t.indexOf("save") !== -1) {
      return "bg-emerald-800 text-white uppercase tracking-widest font-semibold text-[10px] px-2 py-1";
    }
    return "bg-white text-gray-900 uppercase tracking-widest font-semibold text-[10px] px-2 py-1 border border-gray-900";
  }

  /**
   * Renders 0..n badges. position: "left" | "right".
   */
  function renderBadgesHtml(p) {
    var list = p.badges && p.badges.length ? p.badges : p.badge ? [p.badge] : [];
    var leftStack = 0;
    var rightStack = 0;
    var html = "";
    for (var i = 0; i < list.length; i++) {
      var b = list[i];
      var isRight = b.position === "right";
      var horiz = isRight ? "right-3" : "left-3";
      var stack = isRight ? rightStack++ : leftStack++;
      var topPx = 12 + stack * 36;
      var badgeText = escapeHtml(b.text);
      html +=
        '<span class="absolute z-[1] ' +
        horiz +
        " rounded-full font-sans " +
        badgeStyles(b) +
        '" style="top:' +
        topPx +
        'px">' +
        badgeText +
        "</span>";
    }
    return html;
  }

  function renderProductCard(p) {
    var title = escapeHtml(p.title);
    var ratingLabel = escapeAttr(p.rating.label);
    var href = escapeAttr(p.href || "#");
    var badgeHtml = renderBadgesHtml(p);
    var reviewsLine = formatReviewsCount(p.rating.reviewsCount) + " Reviews";
    var starsHtml = renderStars(p.rating);

    var mediaInner = "";
    if (p.img1) {
      var underlay = p.placeholderBg
        ? '<div class="absolute inset-0 ' + p.placeholderBg + ' z-0" aria-hidden="true"></div>'
        : "";
      mediaInner =
        underlay +
        '<img src="' +
        escapeAttr(p.img1) +
        '" alt="' +
        title +
        '" class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0 z-[1]" width="400" height="400" loading="lazy" />' +
        (p.img2
          ? '<img src="' +
            escapeAttr(p.img2) +
            '" alt="" class="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-[1]" width="400" height="400" loading="lazy" />'
          : "");
    } else if (p.placeholderBg) {
      mediaInner = '<div class="absolute inset-0 ' + p.placeholderBg + '" aria-hidden="true"></div>';
    } else {
      mediaInner = '<div class="absolute inset-0 bg-gray-200" aria-hidden="true"></div>';
    }

    return (
      '<div class="product-card min-w-0">' +
      '<article class="card-inner rounded-xl border border-gray-200 overflow-hidden bg-white h-full flex flex-col">' +
      '<a href="' +
      href +
      '" class="block relative aspect-square overflow-hidden group bg-gray-100">' +
      mediaInner +
      badgeHtml +
      "</a>" +
      '<div class="p-3 sm:p-4 flex-1 flex flex-col">' +
      '<h3 class="font-medium text-gray-900 mb-2 line-clamp-2">' +
      '<a href="' +
      href +
      '" class="product-title-link hover:underline">' +
      title +
      "</a></h3>" +
      '<div class="flex items-center gap-2 flex-wrap text-xs text-gray-500 mb-2" aria-label="' +
      ratingLabel +
      '">' +
      starsHtml +
      '<span aria-hidden="true" class="text-gray-400">·</span>' +
      '<span>' +
      escapeHtml(reviewsLine) +
      "</span></div>" +
      '<p class="text-gray-900 text-sm font-bold mt-auto pt-0.5"><span class="sr-only">Price </span>$' +
      p.price.toFixed(2) +
      "</p></div></article></div>"
    );
  }

  function getGrid() {
    return document.getElementById("product-grid");
  }

  function buildDesktopGrid() {
    var grid = getGrid();
    if (!grid) return;
    grid.innerHTML = products.map(renderProductCard).join("");
    requestAnimationFrame(updateCarouselThumb);
  }

  function buildMobileGrid() {
    var grid = getGrid();
    if (!grid) return;
    var head = products.slice(0, MOBILE_INITIAL_COUNT).map(renderProductCard).join("");
    var tail = products.slice(MOBILE_INITIAL_COUNT).map(renderProductCard).join("");
    grid.innerHTML =
      head +
      '<div id="show-more-wrapper" class="show-more-wrapper col-span-2 overflow-hidden transition-[max-height] duration-500 ease-out grid grid-cols-2 gap-4 md:contents" aria-hidden="true">' +
      tail +
      "</div>";
    applyMobilePanelHeight();
    bindWrapperLazyImages();
  }

  function bindWrapperLazyImages() {
    var w = document.getElementById("show-more-wrapper");
    if (!w) return;
    var imgs = w.querySelectorAll("img");
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].addEventListener("load", function () {
        if (mobileExpanded) refreshExpandedHeightIfNeeded();
      });
    }
  }

  /** Smooth open/close: CSS transitions max-height on #show-more-wrapper */
  function applyMobilePanelHeight() {
    var w = document.getElementById("show-more-wrapper");
    if (!w) return;
    if (mobileExpanded) {
      w.setAttribute("aria-hidden", "false");
      requestAnimationFrame(function () {
        w.style.maxHeight = w.scrollHeight + "px";
      });
    } else {
      w.style.maxHeight = "0";
      w.setAttribute("aria-hidden", "true");
    }
  }

  function refreshExpandedHeightIfNeeded() {
    if (!mobileExpanded) return;
    var w = document.getElementById("show-more-wrapper");
    if (!w) return;
    w.style.maxHeight = w.scrollHeight + "px";
  }

  function updateShowMoreButton() {
    var btn = document.getElementById("show-more-btn");
    if (!btn) return;
    var isDesktop = window.matchMedia(MD_MIN_WIDTH).matches;
    if (isDesktop) {
      btn.classList.add("hidden");
      btn.setAttribute("aria-expanded", "true");
    } else {
      btn.classList.remove("hidden");
      btn.textContent = mobileExpanded ? "Show Less" : "Show More";
      btn.setAttribute("aria-expanded", mobileExpanded ? "true" : "false");
    }
  }

  function syncLayout() {
    var isDesktop = window.matchMedia(MD_MIN_WIDTH).matches;
    var layout = isDesktop ? "desktop" : "mobile";

    if (layout !== lastLayout) {
      lastLayout = layout;
      if (isDesktop) {
        buildDesktopGrid();
      } else {
        buildMobileGrid();
      }
    } else if (!isDesktop) {
      refreshExpandedHeightIfNeeded();
    }

    updateShowMoreButton();
    if (isDesktop) {
      requestAnimationFrame(updateCarouselThumb);
    }
  }

  function updateCarouselThumb() {
    var grid = getGrid();
    var track = document.getElementById("carousel-scroll-track");
    var thumb = document.getElementById("carousel-scroll-thumb");
    if (!grid || !track || !thumb) return;
    if (!window.matchMedia(MD_MIN_WIDTH).matches) return;

    var cw = grid.clientWidth;
    var sw = grid.scrollWidth;
    var max = Math.max(0, sw - cw);
    var sl = grid.scrollLeft;

    if (max <= 0) {
      thumb.style.width = "100%";
      thumb.style.left = "0%";
      track.setAttribute("aria-valuemax", "0");
      track.setAttribute("aria-valuenow", "0");
      return;
    }

    var thumbW = Math.max((cw / sw) * 100, 10);
    var maxLeft = 100 - thumbW;
    var left = (sl / max) * maxLeft;

    thumb.style.width = thumbW + "%";
    thumb.style.left = left + "%";
    track.setAttribute("aria-valuemax", String(Math.round(max)));
    track.setAttribute("aria-valuenow", String(Math.round(sl)));
  }

  var carouselUiInitialized = false;

  function initCarouselScrollUi() {
    if (carouselUiInitialized) return;
    carouselUiInitialized = true;

    var grid = getGrid();
    var track = document.getElementById("carousel-scroll-track");
    var thumb = document.getElementById("carousel-scroll-thumb");
    if (!grid || !track || !thumb) return;

    grid.addEventListener("scroll", updateCarouselThumb);

    if (typeof ResizeObserver !== "undefined") {
      var ro = new ResizeObserver(function () {
        requestAnimationFrame(updateCarouselThumb);
      });
      ro.observe(grid);
    }

    track.addEventListener("click", function (e) {
      if (!window.matchMedia(MD_MIN_WIDTH).matches) return;
      if (e.target === thumb) return;
      var rect = track.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var t = rect.width > 0 ? x / rect.width : 0;
      var maxScroll = Math.max(0, grid.scrollWidth - grid.clientWidth);
      grid.scrollLeft = t * maxScroll;
    });

    thumb.addEventListener("pointerdown", function (e) {
      if (!window.matchMedia(MD_MIN_WIDTH).matches) return;
      e.preventDefault();
      e.stopPropagation();
      thumb.classList.add("is-dragging");

      var startX = e.clientX;
      var startScroll = grid.scrollLeft;
      var trackW = track.getBoundingClientRect().width;
      var maxScroll = Math.max(0, grid.scrollWidth - grid.clientWidth);

      function move(ev) {
        var dx = ev.clientX - startX;
        var deltaScroll = trackW > 0 ? (dx / trackW) * maxScroll : 0;
        grid.scrollLeft = startScroll + deltaScroll;
      }

      function up() {
        thumb.classList.remove("is-dragging");
        document.removeEventListener("pointermove", move);
        document.removeEventListener("pointerup", up);
      }

      document.addEventListener("pointermove", move);
      document.addEventListener("pointerup", up);
    });

    track.addEventListener("keydown", function (e) {
      if (!window.matchMedia(MD_MIN_WIDTH).matches) return;
      var step = grid.clientWidth * 0.35;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        grid.scrollBy({ left: -step, behavior: "smooth" });
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        grid.scrollBy({ left: step, behavior: "smooth" });
      } else if (e.key === "Home") {
        e.preventDefault();
        grid.scrollTo({ left: 0, behavior: "smooth" });
      } else if (e.key === "End") {
        e.preventDefault();
        grid.scrollTo({ left: grid.scrollWidth, behavior: "smooth" });
      }
    });
  }

  var showMoreBtn = document.getElementById("show-more-btn");
  if (showMoreBtn) {
    showMoreBtn.addEventListener("click", function () {
      if (window.matchMedia(MD_MIN_WIDTH).matches) return;
      mobileExpanded = !mobileExpanded;
      applyMobilePanelHeight();
      updateShowMoreButton();
    });
  }

  window.addEventListener("resize", syncLayout);
  initCarouselScrollUi();
  syncLayout();
})();
