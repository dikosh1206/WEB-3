
const clickSound = new Audio("sounds/click.mp3");


const popup = document.getElementById("popup");
const openBtn = document.getElementById("subscribeBtn");
const closeBtn = document.getElementById("closePopup");
const submitBtn = document.getElementById("submitPopup");

if (popup && openBtn && closeBtn && submitBtn) {
  openBtn.addEventListener("click", () => {
    clickSound.play();
    popup.style.display = "flex";
  });

  closeBtn.addEventListener("click", () => {
    clickSound.play();
    popup.style.display = "none";
  });

  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      clickSound.play();
      popup.style.display = "none";
    }
  });

  submitBtn.addEventListener("click", () => {
    clickSound.play();
    const emailInput = document.getElementById("popupEmail").value.trim();
    if (emailInput === "" || !emailInput.includes("@")) {
      alert("Please enter a valid email address ☕");
    } else {
      alert("Thank you for subscribing! ❤️");
      popup.style.display = "none";
    }
  });
}


document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const messageBox = document.getElementById("formMessage");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      let errors = [];

      if (name.length < 2) errors.push("Name must be at least 2 characters long.");
      const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!emailRegex.test(email)) errors.push("Please enter a valid email address.");
      if (message.length < 10) errors.push("Message must be at least 10 characters long.");

      if (errors.length > 0) {
        messageBox.innerHTML = errors.join("<br>");
        messageBox.style.color = "red";
      } else {
        messageBox.style.color = "green";
        messageBox.textContent = "Your message has been sent successfully!";
        form.reset();
      }
    });
  }
});


const colorBtn = document.getElementById("colorChangeBtn");
const colors = ["#fffaf5", "#f3e8dd", "#f0dfd1", "#e8d3c2", "#d9bfa9", "#c9b396"];
if (colorBtn) {
  let index = 0;
  colorBtn.addEventListener("click", () => {
    clickSound.play();
    index = (index + 1) % colors.length;
    document.body.style.backgroundColor = colors[index];
    colorBtn.innerText = `Background: ${index + 1}`;
  });
}


function updateDateTime() {
  const dateElement = document.getElementById("dateTime");
  if (!dateElement) return;
  const now = new Date();
  const formatted = now.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  dateElement.textContent = `Current time: ${formatted}`;
}
setInterval(updateDateTime, 1000);
updateDateTime();

document.querySelectorAll(".read-more-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    clickSound.play();
    const moreText = btn.previousElementSibling;
    if (moreText.style.display === "none" || !moreText.style.display) {
      moreText.style.display = "block";
      btn.textContent = "Read Less";
    } else {
      moreText.style.display = "none";
      btn.textContent = "Read More";
    }
  });
});


const readMoreBtn = document.getElementById("readMoreBtn");
const moreText = document.getElementById("moreText");
if (readMoreBtn && moreText) {
  readMoreBtn.addEventListener("click", () => {
    clickSound.play();
    if (moreText.style.display === "none" || !moreText.style.display) {
      moreText.style.display = "block";
      readMoreBtn.textContent = "Read Less";
    } else {
      moreText.style.display = "none";
      readMoreBtn.textContent = "Read More";
    }
  });
}


const showTimeBtn = document.getElementById("showTimeBtn");
const timeOutput = document.getElementById("timeOutput");
if (showTimeBtn && timeOutput) {
  showTimeBtn.addEventListener("click", () => {
    clickSound.play();
    const now = new Date();
    timeOutput.textContent = now.toLocaleTimeString();
    timeOutput.style.transform = "scale(1.3)";
    setTimeout(() => (timeOutput.style.transform = "scale(1)"), 300);
  });
}

document.querySelectorAll(".star").forEach((star, index, allStars) => {
  star.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play();
    allStars.forEach((s, i) => {
      s.style.color = i <= index ? "#FFD700" : "#ccc";
    });
    const ratingText = document.getElementById("ratingText");
    if (ratingText) ratingText.textContent = `You rated us ${index + 1} stars!`;
  });
});


document.querySelectorAll("#themeToggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    clickSound.play();
    document.body.classList.toggle("night-mode");
    if (document.body.classList.contains("night-mode")) {
      document.body.style.backgroundColor = "#061148";
      document.body.style.color = "#f5f5f5";
      btn.textContent = "☀️ Day Mode";
      btn.classList.replace("btn-outline-dark", "btn-outline-light");
    } else {
      document.body.style.backgroundColor = "#fffaf5";
      document.body.style.color = "#212529";
      btn.textContent = "🌙 Night Mode";
      btn.classList.replace("btn-outline-light", "btn-outline-dark");
    }
  });
});


document.querySelectorAll(".menu-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    clickSound.currentTime = 0;
    clickSound.play();
    card.style.transform = "scale(1.05)";
    card.style.transition = "transform 0.3s ease";
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "scale(1)";
  });
});
