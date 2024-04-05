document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.querySelector('input[name="userEmail"]');
    const nicknameInput = document.querySelector('input[name="nickname"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const passwordToggle1 = document.getElementById('passwordToggle1');
    const confirmPasswordInput = document.querySelector('input[name="confirmPassword"]');
    const passwordToggle2 = document.getElementById('passwordToggle2');
    const signupButton = document.querySelector('.Login__submit');

    emailInput.addEventListener('blur', evaluateEmail);
    nicknameInput.addEventListener('blur', evaluateNickname);
    passwordInput.addEventListener('blur', evaluatePassword);
    confirmPasswordInput.addEventListener('blur', evaluateConfirmPassword);

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPassword(password) {
        return password.length >= 8;
    }

    function evaluateEmail() {
        const emailValue = emailInput.value.trim();
        const emailError = document.querySelector('.email-error');
        
        if (emailValue === '') {
            emailInput.classList.add('error');
            emailError.innerText = '이메일을 입력해주세요.';
            return false;
        } else if (!isValidEmail(emailValue)) {
            emailInput.classList.add('error');
            emailError.innerText = '올바른 형식의 이메일이 아닙니다.';
            return false;
        } else {
            emailInput.classList.remove('error');
            emailError.innerText = '';
            return true;
        }
    }

    function evaluateNickname() {
        const nicknameValue = nicknameInput.value.trim();
        const nicknameError = document.querySelector('.nickname-error');
    
        if (nicknameValue === '') {
            nicknameInput.classList.add('error');
            nicknameError.innerText = '닉네임을 입력해주세요.';
            return false;
        } else {
            nicknameInput.classList.remove('error');
            nicknameError.innerText = '';
            return true;
        }
    }

    function evaluatePassword() {
        const passwordValue = passwordInput.value.trim();
        const passwordError = document.querySelector('.password-error');

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

    function evaluateConfirmPassword() {
        const confirmPasswordValue = confirmPasswordInput.value.trim();
        const confirmPasswordError = document.querySelector('.confirmPassword-error');
        const passwordValue = passwordInput.value.trim();

        if (confirmPasswordValue === '') {
            confirmPasswordError.innerText = '비밀번호를 다시 입력해주세요.';
            return false;
        } else if (confirmPasswordValue !== passwordValue) {
            confirmPasswordError.innerText = '비밀번호가 일치하지 않습니다.';
            return false;
        } else {
            confirmPasswordError.innerText = '';
            return true;
        }
    }

    function toggleButtonState() {
        const emailValid = evaluateEmail();
        const nicknameValid = evaluateNickname();
        const passwordValid = evaluatePassword();
        const confirmPasswordValid = evaluateConfirmPassword();

        if (emailValid && nicknameValid && passwordValid && confirmPasswordValid) {
            return true;
        } else {
            return false;
        }
    }

    signupButton.addEventListener('click', function(event) {
        event.preventDefault();
        if (toggleButtonState()) {
            window.location.href = "/signin";
        }
    });

    passwordToggle1.src = "images/home/눈.png";

    passwordToggle1.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        if (type === 'password') {
            passwordToggle1.src = "images/home/눈.png";
        } else {
            passwordToggle1.src = "images/home/사없눈.png";
        }
    });

    passwordToggle2.src = "images/home/눈.png";

    passwordToggle2.addEventListener('click', function () {
        const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPasswordInput.setAttribute('type', type);
        
        if (type === 'password') {
            passwordToggle2.src = "images/home/눈.png";
        } else {
            passwordToggle2.src = "images/home/사없눈.png";
        }
    });
});
