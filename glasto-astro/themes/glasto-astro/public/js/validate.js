function validateForm(event) {
      event.preventDefault(); // Prevent form from submitting immediately

      // Get input values
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const emailError = document.getElementById("emailError");
      const passwordError = document.getElementById("passwordError");

      let isValid = true;

      // Validate email
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        emailError.classList.remove("hidden");
        isValid = false;
      } else {
        emailError.classList.add("hidden");
      }

      // Validate password (minimum 6 characters)
      if (password.length < 6) {
        passwordError.classList.remove("hidden");
        isValid = false;
      } else {
        passwordError.classList.add("hidden");
      }

      // If everything is valid, submit the form
      if (isValid) {
        event.target.submit();
      }
}
