<<<<<<< HEAD
//contact ass 5
=======
// contact page ass 5
>>>>>>> 3fc3834 (Updated index.html and scripts for Assignment 6 improvements)
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const messageBox = document.getElementById("formMessage");

  if (form) {
    form.addEventListener("submit", function (event) {
<<<<<<< HEAD
      event.preventDefault(); 
=======
      event.preventDefault();
>>>>>>> 3fc3834 (Updated index.html and scripts for Assignment 6 improvements)

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      let errors = [];

<<<<<<< HEAD
    
=======
>>>>>>> 3fc3834 (Updated index.html and scripts for Assignment 6 improvements)
      if (name.length < 2) {
        errors.push("Name must be at least 2 characters long.");
      }

<<<<<<< HEAD
    
=======
>>>>>>> 3fc3834 (Updated index.html and scripts for Assignment 6 improvements)
      const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!emailRegex.test(email)) {
        errors.push("Please enter a valid email address.");
      }

      if (message.length < 10) {
        errors.push("Message must be at least 10 characters long.");
      }

<<<<<<< HEAD

=======
>>>>>>> 3fc3834 (Updated index.html and scripts for Assignment 6 improvements)
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

<<<<<<< HEAD

// index ass5
=======
// global sounds 5 
const clickSound = new Audio("sounds/click.mp3");

// popup index ass 5
>>>>>>> 3fc3834 (Updated index.html and scripts for Assignment 6 improvements)
const popup = document.getElementById("popup");
const openBtn = document.getElementById("subscribeBtn");
const closeBtn = document.getElementById("closePopup");
const submitBtn = document.getElementById("submitPopup");

if (popup && openBtn && closeBtn && submitBtn) {
<<<<<<< HEAD

  openBtn.addEventListener("click", () => {
    popup.style.display = "flex";
  });


  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });


  popup.addEventListener("click", (e) => {
    if (e.target === popup) popup.style.display = "none";
  });


  submitBtn.addEventListener("click", () => {
=======
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
>>>>>>> 3fc3834 (Updated index.html and scripts for Assignment 6 improvements)
    const emailInput = document.getElementById("popupEmail").value.trim();
    if (emailInput === "" || !emailInput.includes("@")) {
      alert("Please enter a valid email address ☕");
    } else {
      alert("Thank you for subscribing! ❤️");
      popup.style.display = "none";
    }
  });
}

<<<<<<< HEAD

//menu ass5

const colorBtn = document.getElementById("colorChangeBtn");
const colors = ["#fffaf5", "#f3e8dd", "#f0dfd1", "#e8d3c2", "#d9bfa9", "#c9b396"];

if (colorBtn) {
  let index = 0;

  colorBtn.addEventListener("click", () => {
    index = (index + 1) % colors.length;
    document.body.style.backgroundColor = colors[index];
    colorBtn.innerText = `Background: ${index + 1}`;
  });
}

//time ass 5

function updateDateTime() {
  const dateElement = document.getElementById("dateTime");
  if (!dateElement) return;

  const now = new Date();
  const options = {
=======
// time display ass 5 
function updateDateTime() {
  const dateElement = document.getElementById("dateTime");
  if (!dateElement) return;
  const now = new Date();
  const formatted = now.toLocaleString("en-US", {
>>>>>>> 3fc3834 (Updated index.html and scripts for Assignment 6 improvements)
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
<<<<<<< HEAD
  };
  const formatted = now.toLocaleString("en-US", options);

  dateElement.textContent = `Current time: ${formatted}`;
}


setInterval(updateDateTime, 1000);
updateDateTime();
=======
  });
  dateElement.textContent = `Current time: ${formatted}`;
}
setInterval(updateDateTime, 1000);
updateDateTime();

// read more index,about ass 6
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

// show time button ass 6
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

// rating star ass 6
document.querySelectorAll(".star").forEach((star, index, allStars) => {
  star.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play();
    allStars.forEach((s, i) => {
      s.style.color = i <= index ? "#FFD700" : "#ccc";
    });
    const ratingText = document.getElementById("ratingText");
    if (ratingText) {
      ratingText.textContent = `You rated us ${index + 1} stars!`;
    }
  });
});

// color change button, index ass 6
const colorChangeBtn = document.getElementById("colorChangeBtn");
if (colorChangeBtn) {
  colorChangeBtn.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play();
    const colors = ["#fffaf5", "#f7e7ce", "#e8f0ff", "#e0ffe5", "#ffe4e1"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
  });
}

// night mode ass 6
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play();
    document.body.classList.toggle("night-mode");
    if (document.body.classList.contains("night-mode")) {
      document.body.style.backgroundColor = "#061148";
      document.body.style.color = "#f5f5f5";
      themeToggle.textContent = "☀️ Day Mode";
    } else {
      document.body.style.backgroundColor = "#fffaf5";
      document.body.style.color = "#5a3e2b";
      themeToggle.textContent = "🌙 Night Mode";
    }
  });
}

// menu cards animation ass 6
document.querySelectorAll(".menu-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "scale(1.05)";
    card.style.transition = "transform 0.3s ease";
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "scale(1)";
  });
});

// according sounds, about ass 6
document.querySelectorAll(".accordion-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play();
  });
});
>>>>>>> 3fc3834 (Updated index.html and scripts for Assignment 6 improvements)
