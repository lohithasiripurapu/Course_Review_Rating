(function ($) {
  const $form = document.getElementById('adminlogin_form');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const error = document.getElementById('error-msg');

  let validateEmail = (email) => {
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!emailRegex.test(email))
      return false;
    return true
  };

  let validatePassword = (password) => {
    const passwordRegex = new RegExp('^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$')
    if (!passwordRegex.test(password))
      return false;
    return true
  };
  if ($form) {
    $form.addEventListener("submit", function admin(event) {
      event.preventDefault();
      var valid = false;
      var emailVal = email.value;
      var passwordVal = password.value;
      if (emailVal.trim().length == 0) {
        emailError.style.display = "block";
        emailError.innerHTML = "Please enter email"
        emailError.show().fadeOut(12000);
        valid = true;
      } else if (!validateEmail(emailVal)) {
        emailError.style.display = "block";
        emailError.innerHTML = "Please enter valid email"
        emailError.show().fadeOut(12000);
        valid = true;
      }

      if (passwordVal.trim().length == 0) {
        passwordError.style.display = "block";
        passwordError.innerHTML = "Please enter password"
        passwordError.show().fadeOut(12000);
        valid = true;
      } else if (passwordVal.length < 8) {
        passwordError.innerHTML = "Password should be atleast 8 characters long"
        passwordError.show().fadeOut(12000);
        valid = true;
      } else if (!validatePassword(passwordVal)) {
        passwordError.innerHTML = "Password should contain one uppercase, one lower case, one special character and one number"
        passwordError.show().fadeOut(12000);
        valid = true;
      }

      if (valid) {
        return;
      } else {
        emailError.style.display = "none";
        passwordError.style.display = "none";
      }

      $.ajax({
        type: "Post",
        url: "/courses/admin",
        contentType: "application/json",
        data: JSON.stringify({
          email: emailVal,
          password: passwordVal,
        }),
        dataType: "text",
        success: function (responseMessage) {
          window.location.replace("/");
        },
        error: function (responseError) {
          error.innerHTML = responseError.responseText
          error.show();
        },
      });
    });
  }
})(window.jQuery);
