//contact ass 5
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

    
      if (name.length < 2) {
        errors.push("Name must be at least 2 characters long.");
      }

    
      const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!emailRegex.test(email)) {
        errors.push("Please enter a valid email address.");
      }

      if (message.length < 10) {
        errors.push("Message must be at least 10 characters long.");
      }


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


// index ass5
const popup = document.getElementById("popup");
const openBtn = document.getElementById("subscribeBtn");
const closeBtn = document.getElementById("closePopup");
const submitBtn = document.getElementById("submitPopup");

if (popup && openBtn && closeBtn && submitBtn) {

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
    const emailInput = document.getElementById("popupEmail").value.trim();
    if (emailInput === "" || !emailInput.includes("@")) {
      alert("Please enter a valid email address ☕");
    } else {
      alert("Thank you for subscribing! ❤️");
      popup.style.display = "none";
    }
  });
}


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
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const formatted = now.toLocaleString("en-US", options);

  dateElement.textContent = `Current time: ${formatted}`;
}


setInterval(updateDateTime, 1000);
updateDateTime();
