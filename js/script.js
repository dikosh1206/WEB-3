

document.addEventListener("DOMContentLoaded", function () {


  const safe = fn => {
    try { fn(); } catch (e) { /* swallow to avoid breaking other pages */ }
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
    if (slides.length) {
      let idx = slides.findIndex(s => s.classList.contains("active"));
      if (idx < 0) idx = 0;
      const show = i => {
        slides.forEach((s, j) => {
          s.style.display = j === i ? "block" : "none";
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
      btn.addEventListener("click", () => {
        if (modalImg && btn.dataset.img) modalImg.src = btn.dataset.img;
        if (modalTitle && btn.dataset.title) modalTitle.textContent = btn.dataset.title;
        if (modalPrice) modalPrice.textContent = (btn.dataset.price ? btn.dataset.price + " ₸" : "");
        if (modalDesc && btn.dataset.desc) modalDesc.textContent = btn.dataset.desc;
        modal.style.display = "block";
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
      setTimeout(() => { toast.style.opacity = "0"; }, 1800);
    };

    document.querySelectorAll(".add-cart").forEach(btn => {
      btn.addEventListener("click", (e) => {
        if (clickSound) {
 
          try { clickSound.currentTime = 0; clickSound.play(); } catch (err) { /* ignore */ }
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
    const cards = Array.from(document.querySelectorAll(".product-card, .menu-item"));

    if (!input) return;


    const names = cards.map(c => (c.dataset.name || c.querySelector("h3, h4")?.textContent || "").trim()).filter(Boolean);

    input.addEventListener("input", function () {
      const q = this.value.trim().toLowerCase();
 
      cards.forEach(c => {
        const name = (c.dataset.name || c.querySelector("h3, h4")?.textContent || "").toLowerCase();
        c.style.display = name.includes(q) || q === "" ? "" : "none";
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
              div.style.padding = "6px 8px";
              div.style.cursor = "pointer";
              div.addEventListener("click", () => {
                input.value = m;
                input.dispatchEvent(new Event('input'));
                suggestionsBox.innerHTML = "";
              });
              suggestionsBox.appendChild(div);
            });
            suggestionsBox.style.display = "block";
          } else {
            suggestionsBox.style.display = "none";
          }
        } else {
          suggestionsBox.style.display = "none";
        }
      }
    });


    document.addEventListener("click", (e) => {
      if (suggestionsBox && !suggestionsBox.contains(e.target) && e.target !== input) suggestionsBox.style.display = "none";
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
    const lazy = document.querySelectorAll("img.lazy");
    if (lazy.length) {
      const lz = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove("lazy");
            obs.unobserve(img);
          }
        });
      }, { rootMargin: "200px 0px" });
      lazy.forEach(img => lz.observe(img));
    }
  });

  safe(() => {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener("click", (e) => {
        const target = document.querySelector(a.getAttribute("href"));
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
        return;
      }
      const original = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = original;
        form.reset();
        alert("Message sent — we will contact you within 24 hours.");
      }, 1400);
    });
  });

});

$(document).ready(function() {

$(window).on("scroll", function() {
  let scrollTop = $(window).scrollTop();
  let docHeight = $(document).height() - $(window).height();
  let scrollPercent = (scrollTop / docHeight) * 100;
  $("#scrollProgress").css("width", scrollPercent + "%");
});

  console.log("jQuery is ready!");


  const menuItems = ["Croissant", "Sourdough Bread", "Frapuccino Popcorn", "Ice Cappuccino", "Americano", "Chocolate Muffin"];
  $("#searchInput").on("keyup", function() {
    let value = $(this).val().toLowerCase();
    let suggestions = menuItems.filter(item => item.toLowerCase().includes(value));
    $("#suggestions").empty();
    if (value.length > 0) {
      suggestions.forEach(s => {
        $("#suggestions").append(`<div class='suggestion-item'>${s}</div>`);
      });
    }
  });
  $(document).on("click", ".suggestion-item", function() {
    $("#searchInput").val($(this).text());
    $("#suggestions").empty();
  });

  $("#searchInput").on("keyup", function() {
    let value = $(this).val().toLowerCase();
    $(".menu-card h4").each(function() {
      let text = $(this).text();
      if (value && text.toLowerCase().includes(value)) {
        let highlighted = text.replace(new RegExp(value, "gi"), match => `<mark>${match}</mark>`);
        $(this).html(highlighted);
      } else {
        $(this).html(text);
      }
    });
  });

$('.star').on('click', function() {
  const value = $(this).data('value'); 
  const stars = $(this).parent().find('.star');


  stars.removeClass('active');
  $(this).addClass('active');
  $(this).prevAll().addClass('active');


const clickSound = document.getElementById('clickSound');
if (clickSound) {
  clickSound.currentTime = 0;
  clickSound.play();
}


  console.log("User rated:", value); 
});


$(document).ready(function () {

  $(".star").on("click", function () {
    const value = $(this).data("value"); 
    const $container = $(this).parent(); 
    const clickSound = document.getElementById("clickSound");


    if (clickSound) {
      clickSound.currentTime = 0;
      clickSound.play();
    }


    $container.find(".star").removeClass("active");


    $container.find(`.star:lt(${value})`).addClass("active");


    $container.attr("data-selected", value);
  });


  $(".star").hover(
    function () {
      const value = $(this).data("value");
      const $container = $(this).parent();
      $container.find(".star").removeClass("hovered");
      $container.find(`.star:lt(${value})`).addClass("hovered");
    },
    function () {
      $(".star").removeClass("hovered");
    }
  );
});


});


$(".counter").each(function () {
  $(this).prop("Counter",0).animate({
    Counter: $(this).data("count")
  }, {
    duration: 2500,
    easing: "swing",
    step: function (now) {
      $(this).text(Math.ceil(now));
    }
  });
});

$("#submitBtn").on("click", function(e) {
  e.preventDefault();
  let btn = $(this);
  btn.prop("disabled", true).html('<span class="spinner-border spinner-border-sm"></span> Please wait...');
  
  setTimeout(() => {
    btn.prop("disabled", false).text("Submit");
    alert("Form submitted successfully!");
  }, 2000);
});


$("#copyBtn").on("click", function() {
  const text = $("#copyText").text();
  navigator.clipboard.writeText(text);
  $(this).text("Copied ✅");
  setTimeout(() => $(this).text("Copy"), 2000);
});

$(window).on("scroll", function() {
  $(".lazy").each(function() {
    if ($(this).offset().top < $(window).scrollTop() + $(window).height() + 100) {
      if (!$(this).attr("src")) {
        $(this).attr("src", $(this).data("src"));
      }
    }
  });
});


  $("#showTimeBtn").on("click", function() {

    $("#clickSound")[0].play();

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const timeString = `${hours}:${minutes}:${seconds}`;

    $("#currentTime").text("Current time: " + timeString);


    $("#currentTime").hide().fadeIn(400);
  });

$(".add-cart").on("click", function() {
  $("#toast").fadeIn(400).delay(1500).fadeOut(400);
});

$('#searchInput').on('keyup', function(){
  let value = $(this).val().toLowerCase();
  $('#productList li').filter(function(){
    $(this).toggle($(this).text().toLowerCase().includes(value));
  });
});
