document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const passwordToggle = document.getElementById('passwordToggle');
    const loginButton = document.querySelector('.Login__submit');
    const emailError = document.querySelector('.email-error');
    const passwordError = document.querySelector('.password-error');

    emailInput.addEventListener('blur', evaluateEmail);
    passwordInput.addEventListener('blur', evaluatePassword);

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function evaluateEmail() {
        const emailValue = emailInput.value.trim();
        if (emailValue === '') {
            emailInput.classList.add('error');
            emailError.innerText = '이메일을 입력해주세요.';
            return false;
        } else if (!isValidEmail(emailValue)) {
            emailInput.classList.add('error');
            emailError.innerText = '잘못된 이메일 형식입니다.';
            return false;
        } else {
            emailInput.classList.remove('error');
            emailError.innerText = '';
            return true;
        }
    }

    function evaluatePassword() {
        const passwordValue = passwordInput.value.trim();
        if (passwordValue === '') {
            passwordError.innerText = '비밀번호를 입력해주세요.';
            return false;
        } else if (passwordValue.length < 8) {
            passwordError.innerText = '비밀번호를 8자 이상 입력해주세요.';
            return false;
        } else {
            passwordError.innerText = '';
            return true;
        }
    }

    function toggleButtonState() {
        const emailValid = evaluateEmail();
        const passwordValid = evaluatePassword();

        if (emailValid && passwordValid) {
            return true;
        } else {
            return false;
        }
    }

    loginButton.addEventListener('click', function(event) {
        event.preventDefault();
        if (toggleButtonState()) {
            window.location.href = "/items";
        }
    });

    emailInput.addEventListener('input', toggleButtonState);
    passwordInput.addEventListener('input', toggleButtonState);

    passwordToggle.src = "images/home/눈.png";

    passwordToggle.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        if (type === 'password') {
            passwordToggle.src = "images/home/눈.png";
        } else {
            passwordToggle.src = "images/home/사없눈.png";
        }
    });
});
