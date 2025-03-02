document.getElementById("showSignUp").addEventListener("click", function () {
  document.getElementById("signUpFormContainer").style.display = "block";
  document.getElementById("signInFormContainer").style.display = "none";
});

document.getElementById("showSignIn").addEventListener("click", function () {
  document.getElementById("signUpFormContainer").style.display = "none";
  document.getElementById("signInFormContainer").style.display = "block";
});

var signupForm = document.getElementById("signupForm");
signupForm.addEventListener(
  "submit",
  function (event) {
    if (!signupForm.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      var userData = {
        username: document.getElementById("suName").value.trim(),
        password: document.getElementById("suPassword").value.trim(),
      };
      localStorage.setItem("signupData", JSON.stringify(userData));

      Swal.fire({
        title: "Sign up!",
        text: `Signed up successfully as ${userData.username}!`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        document.getElementById("signUpFormContainer").style.display = "none";
        document.getElementById("signInFormContainer").style.display = "block";
      }, 2000);
    }
    signupForm.classList.add("was-validated");
  },
  false
);

var signinForm = document.getElementById("signinForm");
var nameInput = document.getElementById("siName");
var passwordInput = document.getElementById("siPassword");

signinForm.addEventListener(
  "submit",
  function (event) {
    if (!signinForm.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      var username = nameInput.value.trim();
      var password = passwordInput.value.trim();
      var storedData = JSON.parse(localStorage.getItem("signupData"));

      if (
        storedData &&
        storedData.username === username &&
        storedData.password === password
      ) {
        Swal.fire({
          title: "Welcome!",
          text: `Signed in successfully as ${username}!`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = "index.html";
        });
      } else {
        passwordInput.setCustomValidity("Invalid credentials");
        signinForm.classList.add("was-validated");
      }
    }
  },
  false
);

nameInput.addEventListener("input", function () {
  passwordInput.setCustomValidity("");
});

passwordInput.addEventListener("input", function () {
  passwordInput.setCustomValidity("");
});
