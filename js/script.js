// =========================
// Custom alert (toast)
// =========================
function showAlert(message, type = "info") {
  const alertEl = document.getElementById("custom-alert");
  if (!alertEl) return;

  alertEl.textContent = message;
  alertEl.className = "custom-alert show";

  // remove old types
  alertEl.classList.remove("success", "error");

  // add type
  if (type === "success") alertEl.classList.add("success");
  if (type === "error") alertEl.classList.add("error");

  setTimeout(() => {
    alertEl.classList.remove("show");
  }, 3000);
}

// =========================
// Mobile menu toggle
// =========================
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-links");

if (toggle && nav) {
  let open = false;

  toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
    open = !open;
    toggle.innerHTML = open ? "x" : "☰";
  });
}

// =========================
// Password show/hide
// =========================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".toggle-password").forEach((span) => {
    span.addEventListener("click", () => {
      const inputId = span.getAttribute("data-target");
      const input = document.getElementById(inputId);
      if (!input) return;

      const icon = span.querySelector("i");

      if (input.type === "password") {
        input.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
      } else {
        input.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
      }
    });
  });
});

// =========================
// Signup form
// =========================
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("signup-username")?.value.trim();
    const email = document.getElementById("signup-email")?.value.trim();
    const sport = document.getElementById("signup-sport")?.value.trim();
    const password = document.getElementById("signup-password")?.value;
    const confirmPassword = document.getElementById("signup-confirm-password")?.value;

    if (!username || !email || !sport || !password || !confirmPassword) {
      showAlert("Please fill all signup fields.", "error");
      return;
    }

    if (password !== confirmPassword) {
      showAlert("Passwords do not match!", "error");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (users[email]) {
      showAlert("This email is already registered.", "error");
      return;
    }

    users[email] = { username, email, sport, password };
    localStorage.setItem("users", JSON.stringify(users));

    console.log("Signup Data:", { username, email, sport });

    showAlert("Signup successful!", "success");

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);
  });
}

// =========================
// Login form
// =========================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email")?.value.trim();
    const password = document.getElementById("password")?.value;

    if (!email || !password) {
      showAlert("Please fill all login fields.", "error");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "{}");
    const user = users[email];

    if (!user || user.password !== password) {
      showAlert("Invalid email or password.", "error");
      return;
    }

    console.log("Login Data:", { email });

    showAlert("Login successful!", "success");

    loginForm.reset();
  });
}

// =========================
// Contact form + EmailJS
// =========================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validation
    if (!name || !email || !message) {
      showAlert("Please fill all fields.", "error");
      return;
    }

    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
    };

    // Send email using EmailJS
    emailjs
      .send(
        "service_o7enw87", // Your Service ID
        "template_b8hwvda", // Your Template ID
        templateParams
      )
      .then(() => {
        showAlert("Message sent successfully!", "success");
        contactForm.reset();
      })
      .catch((error) => {
        console.log("FAILED...", error);
        showAlert("Failed to send message.", "error");
      });
  });
}