

document.addEventListener("DOMContentLoaded", function () {

  const safe = fn => {
    try { fn(); } catch (e) { console.warn('safe() caught', e); }
  };

  safe(() => {
    const themeBtn = document.getElementById("themeToggle");
    const stored = localStorage.getItem("pickme-theme");
    if (stored === "dark") document.body.classList.add("dark-mode");

    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const isDark = document.body.classList.contains("dark-mode");
        localStorage.setItem("pickme-theme", isDark ? "dark" : "light");
      });
    }
  });

  safe(() => {
const slides = Array.from(document.querySelectorAll(".carousel-slide"));
if (!slides.length) return;
let idx = slides.findIndex(s => s.classList.contains("active"));
if (idx < 0) idx = 0;

// добавляем плавный переход через opacity
slides.forEach(s => {
  s.style.position = "absolute";
  s.style.top = 0;
  s.style.left = 0;
  s.style.width = "100%";
  s.style.transition = "opacity 0.6s ease-in-out";
  s.style.opacity = 0;
  s.style.zIndex = 0;
});
slides[idx].style.opacity = 1;
slides[idx].style.zIndex = 1;

const show = i => {
  slides.forEach((s, j) => {
    s.style.opacity = j === i ? 1 : 0;
    s.style.zIndex = j === i ? 1 : 0;
    s.classList.toggle("active", j === i);
  });
};
show(idx);

const prevBtn = document.querySelector(".carousel-control.prev");
const nextBtn = document.querySelector(".carousel-control.next");
if (prevBtn) prevBtn.addEventListener("click", () => { idx = (idx - 1 + slides.length) % slides.length; show(idx); });
if (nextBtn) nextBtn.addEventListener("click", () => { idx = (idx + 1) % slides.length; show(idx); });

let auto = setInterval(() => { idx = (idx + 1) % slides.length; show(idx); }, 5000);
const hero = document.querySelector(".hero-carousel");
if (hero) {
  hero.addEventListener("mouseenter", () => clearInterval(auto));
  hero.addEventListener("mouseleave", () => { auto = setInterval(() => { idx = (idx + 1) % slides.length; show(idx); }, 5000); });
}
  });

  safe(() => {
    const modal = document.getElementById("productModal");
    if (!modal) return;
    const modalImg = document.getElementById("modalImg");
    const modalTitle = document.getElementById("modalTitle");
    const modalPrice = document.getElementById("modalPrice");
    const modalDesc = document.getElementById("modalDesc");
    const closeBtn = modal.querySelector(".modal-close");

    document.querySelectorAll(".read-more").forEach(btn => {
      btn.addEventListener("click", (e) => {
        if (modalImg && btn.dataset.img) modalImg.src = btn.dataset.img;
        if (modalTitle && btn.dataset.title) modalTitle.textContent = btn.dataset.title;
        if (modalPrice) modalPrice.textContent = (btn.dataset.price ? btn.dataset.price + " ₸" : "");
        if (modalDesc && btn.dataset.desc) modalDesc.textContent = btn.dataset.desc;
        modal.style.display = "flex";
        modal.setAttribute("aria-hidden", "false");
      });
    });

    if (closeBtn) closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
    });

    window.addEventListener("click", e => {
      if (e.target === modal) {
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
      }
    });
  });

  safe(() => {
    const clickSound = document.getElementById("clickSound");
    let toast = document.getElementById("pm-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "pm-toast";
      toast.style.position = "fixed";
      toast.style.left = "50%";
      toast.style.bottom = "30px";
      toast.style.transform = "translateX(-50%)";
      toast.style.background = "#f8b1b1";
      toast.style.color = "#2c2c2c";
      toast.style.padding = "10px 16px";
      toast.style.borderRadius = "6px";
      toast.style.boxShadow = "0 6px 18px rgba(0,0,0,0.25)";
      toast.style.zIndex = "1200";
      toast.style.transition = "opacity .3s";
      toast.style.opacity = "0";
      document.body.appendChild(toast);
    }

    const showToast = (text) => {
      toast.textContent = text;
      toast.style.opacity = "1";
      setTimeout(() => { toast.style.opacity = "0"; }, 1500);
    };

    document.querySelectorAll(".add-cart").forEach(btn => {
      btn.addEventListener("click", (e) => {
        if (clickSound) {
          try { clickSound.currentTime = 0; clickSound.play(); } catch (err) { /* ignore autoplay issues */ }
        }
        const card = btn.closest(".product-card, .menu-card, .menu-item");
        let name = "Item";
        if (card) {
          const h = card.querySelector("h3, h4, .product-title");
          if (h) name = h.textContent.trim();
        }
        showToast("Item added to cart: " + name);
      });
    });
  });

  safe(() => {
    const input = document.getElementById("searchInput");
    const suggestionsBox = document.getElementById("suggestions");
    const cards = Array.from(document.querySelectorAll(".product-card, .menu-item, .menu-card"));

    if (!input) return;

    const names = cards.map(c => (c.dataset.name || c.querySelector("h3, h4")?.textContent || "").trim()).filter(Boolean);

    let searchTimeout = null;
    input.addEventListener("input", function () {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        const q = this.value.trim().toLowerCase();
        cards.forEach(c => {
          const name = (c.dataset.name || c.querySelector("h3, h4")?.textContent || "").toLowerCase();
          c.style.display = (name.includes(q) || q === "") ? "" : "none";
        });

        if (suggestionsBox) {
          suggestionsBox.innerHTML = "";
          if (q.length >= 1) {
            const matched = [...new Set(names.filter(n => n.toLowerCase().includes(q)))].slice(0, 6);
            if (matched.length) {
              matched.forEach(m => {
                const div = document.createElement("div");
                div.className = "suggestion-item";
                div.textContent = m;
                div.addEventListener("click", () => {
                  input.value = m;
                  input.dispatchEvent(new Event('input', { bubbles: true }));
                  suggestionsBox.classList.remove("show");
                });
                suggestionsBox.appendChild(div);
              });
              suggestionsBox.classList.add("show");
              suggestionsBox.style.display = "block";
            } else {
              suggestionsBox.classList.remove("show");
              suggestionsBox.style.display = "none";
            }
          } else {
            suggestionsBox.classList.remove("show");
            suggestionsBox.style.display = "none";
          }
        }
      }, 180);
    });

    document.addEventListener("click", (e) => {
      if (suggestionsBox && !suggestionsBox.contains(e.target) && e.target !== input) {
        suggestionsBox.style.display = "none";
        suggestionsBox.classList.remove("show");
      }
    });
  });

  safe(() => {
    const counters = document.querySelectorAll(".counter[data-target]");
    counters.forEach(counter => {
      const target = +counter.dataset.target;
      let current = 0;
      const step = Math.max(1, Math.floor(target / 200));
      const update = () => {
        current += step;
        if (current >= target) {
          counter.textContent = target;
        } else {
          counter.textContent = current;
          requestAnimationFrame(update);
        }
      };

      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            update();
            io.disconnect();
          }
        });
      }, { threshold: 0.3 });
      io.observe(counter);
    });
  });

  safe(() => {
    const lazyImgs = Array.from(document.querySelectorAll("img.lazy"));
    if (!lazyImgs.length) return;

    const loadImg = (img) => {
      const src = img.dataset.src || img.getAttribute('data-src');
      if (!src) return;
      img.src = src;
      img.removeAttribute('data-src');
      img.classList.remove('lazy');
    };

    if ('IntersectionObserver' in window) {
      const lz = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            loadImg(img);
            obs.unobserve(img);
          }
        });
      }, { rootMargin: "200px 0px" });

      lazyImgs.forEach(img => lz.observe(img));
    } else {
      const onScrollLoad = () => {
        lazyImgs.forEach(img => {
          if (img.classList.contains('lazy')) {
            const rect = img.getBoundingClientRect();
            if (rect.top < window.innerHeight + 200) loadImg(img);
          }
        });
      };
      window.addEventListener('scroll', onScrollLoad);
      window.addEventListener('resize', onScrollLoad);
      onScrollLoad();
    }
  });

  safe(() => {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener("click", (e) => {
        const href = a.getAttribute('href');
        if (href === "#" || href === "#!") return; 
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  });

  safe(() => {
    const form = document.getElementById("contactForm");
    if (!form) return;
    const submitBtn = document.getElementById("submitBtn") || form.querySelector('button[type="submit"]');
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        const firstInvalid = form.querySelector(':invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }
      const original = submitBtn ? submitBtn.textContent : null;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = original;
        }
        form.reset();
        alert("Message sent — we will contact you within 24 hours.");
      }, 1400);
    });
  });

  safe(() => {
    const progress = document.getElementById("scrollProgress");
    if (!progress) return;
    window.addEventListener("scroll", () => {
      let scrollTop = window.scrollY || window.pageYOffset;
      let docHeight = document.documentElement.scrollHeight - window.innerHeight;
      let scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progress.style.width = Math.min(100, Math.max(0, scrollPercent)) + "%";
    });
  });

  safe(() => {
    const copyBtn = document.getElementById("copyBtn");
    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        const textEl = document.getElementById("copyText");
        if (!textEl) return;
        navigator.clipboard.writeText(textEl.textContent).then(() => {
          const prev = copyBtn.textContent;
          copyBtn.textContent = "Copied ✅";
          setTimeout(() => copyBtn.textContent = prev, 1800);
        });
      });
    }
  });

  safe(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const suggestionsBox = document.getElementById("suggestions");
        if (suggestionsBox) suggestionsBox.style.display = 'none';
        const modal = document.getElementById('productModal');
        if (modal && modal.getAttribute('aria-hidden') === 'false') {
          modal.style.display = 'none';
          modal.setAttribute('aria-hidden', 'true');
        }
      }
    });
  });
safe(() => {
  const display = document.getElementById("currentTime");
  const clickSound = document.getElementById("clickSound");

  if (!display) return;

  const updateGreeting = () => {
    const now = new Date();
    const hh = now.getHours();
    const mm = now.getMinutes().toString().padStart(2, "0");
    const ss = now.getSeconds().toString().padStart(2, "0");

    let greeting = "Hello";
    if (hh < 12) greeting = "Good morning";
    else if (hh < 18) greeting = "Good afternoon";
    else greeting = "Good evening";

    display.textContent = `${greeting}! Current time: ${hh}:${mm}:${ss}`;
    display.style.transition = "opacity 0.35s ease";
    display.style.opacity = "0";
    requestAnimationFrame(() => {
      display.style.opacity = "1";
    });
  };

  updateGreeting();

  setInterval(updateGreeting, 60000);

  if (clickSound) {
    try { clickSound.currentTime = 0; clickSound.play(); } catch(e) {}
  }
});

  });

if (window.jQuery) (function ($) {
  $(function () {
    try { console.log("jQuery ready — script loaded"); } catch (e) {}

    const menuItems = ["Croissant", "Sourdough Bread", "Frapuccino Popcorn", "Ice Cappuccino", "Americano", "Chocolate Muffin"];
    $("#searchInput").on("keyup", function () {
      const value = $(this).val().toLowerCase();
      const suggestions = menuItems.filter(item => item.toLowerCase().includes(value));
      const $box = $("#suggestions").empty();
      if (value.length > 0 && suggestions.length) {
        suggestions.forEach(s => $box.append(`<div class='suggestion-item'>${s}</div>`));
        $box.show();
      } else {
        $box.hide();
      }
    });

    $(document).on("click", ".suggestion-item", function () {
      $("#searchInput").val($(this).text()).trigger('input');
      $("#suggestions").empty().hide();
    });

    $("#searchInput").on("keyup", function () {
      const value = $(this).val().toLowerCase();
      $(".menu-card h4").each(function () {
        const text = $(this).text();
        if (value && text.toLowerCase().includes(value)) {
          const highlighted = text.replace(new RegExp(value, "gi"), match => `<mark>${match}</mark>`);
          $(this).html(highlighted);
        } else {
          $(this).html(text);
        }
      });
    });

    $(window).on("scroll", function () {
      const $lazy = $(".lazy");
      if ($lazy.length) {
        $lazy.each(function () {
          const $img = $(this);
          if ($img.offset().top < $(window).scrollTop() + $(window).height() + 100) {
            if (!$img.attr("src")) $img.attr("src", $img.data("src"));
          }
        });
      }
    });

    $(document).on('click', '.rating .star', function () {
      const $star = $(this);
      const value = parseInt($star.data('value') || 0, 10);
      const $container = $star.closest('.rating');
      const clickSound = document.getElementById('clickSound');

      if (clickSound) {
        try { clickSound.currentTime = 0; clickSound.play(); } catch (e) {}
      }

      $container.find('.star').removeClass('active');
      $container.find('.star').each(function (i) {
        if (i < value) $(this).addClass('active');
      });
      $container.attr('data-selected', value);
    });

    $(document).on('mouseenter', '.rating .star', function () {
      const val = parseInt($(this).data('value') || 0, 10);
      const $container = $(this).closest('.rating');
      $container.find('.star').each(function (i) {
        $(this).toggleClass('hovered', i < val);
      });
    });
    $(document).on('mouseleave', '.rating', function () {
      $(this).find('.star').removeClass('hovered');
    });

    $(".counter").each(function () {
      const $el = $(this);
      const count = +$el.data("count") || +$el.data("target") || 0;
      $({ Counter: 0 }).animate({ Counter: count }, {
        duration: 2000,
        easing: 'swing',
        step: function (now) {
          $el.text(Math.ceil(now));
        }
      });
    });

    $("#submitBtn").on("click", function (e) {
      e.preventDefault();
      const $btn = $(this);
      $btn.prop("disabled", true).html('<span class="spinner-border spinner-border-sm"></span> Please wait...');
      setTimeout(() => {
        $btn.prop("disabled", false).text("Submit");
        alert("Form submitted successfully!");
      }, 2000);
    });

    $("#copyBtn").on("click", function () {
      const text = $("#copyText").text();
      if (!navigator.clipboard) return alert("Copy not supported");
      navigator.clipboard.writeText(text).then(() => {
        $(this).text("Copied ✅");
        setTimeout(() => $(this).text("Copy"), 1600);
      });
    });

    $(".add-cart").on("click", function () {
      $("#toast").fadeIn(400).delay(1500).fadeOut(400);
    });

  }); 
})(jQuery); 


safe(() => {
  const btn = document.getElementById("showTimeBtn");
  const output = document.getElementById("currentTime");
  const clickSound = document.getElementById("clickSound");

  if (btn && output) {
    btn.addEventListener("click", () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString();
      output.textContent = "Current time: " + formatted;
      if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play();
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const ham = document.getElementById("hamburger");
  const nav = document.querySelector(".main-nav");

  ham.addEventListener("click", () => {
    nav.classList.toggle("show");
    ham.classList.toggle("active");
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("show");
      ham.classList.remove("active");
    });
  });
});



