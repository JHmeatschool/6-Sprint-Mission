import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/home.css";
import "../styles/auth.css";
import "../styles/global.css";

const LoginPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <main class="auth-container">
        <Link to="/" class="logo-home-link" aria-label="홈으로 이동">
          <img src="/images/home/pandamarket.png" alt="판다마켓 로고" />
        </Link>

        <form id="loginForm" method="post">
          <div class="input-item">
            <label for="email">이메일</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="이메일을 입력해 주세요"
              required
            />
            <span id="emailEmptyError" class="error-message">
              이메일을 입력해 주세요
            </span>
            <span id="emailInvalidError" class="error-message">
              잘못된 이메일 형식입니다
            </span>
          </div>

          <div class="input-item">
            <label for="password">비밀번호</label>
            <div class="input-wrapper">
              <input
                id="password"
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="비밀번호를 입력해 주세요"
                required
              />
              <button
                type="button"
                class="password-toggle-button"
                aria-label={
                  isPasswordVisible ? "비밀번호 숨기기" : "비밀번호 보기"
                }
                onClick={togglePasswordVisibility}
              >
                <img
                  class="password-toggle-icon"
                  src={
                    isPasswordVisible
                      ? "/images/home/openeyes.png"
                      : "/images/home/closeeyes.png"
                  }
                  alt={
                    isPasswordVisible
                      ? "비밀번호 표시 상태 아이콘"
                      : "비밀번호 숨김 상태 아이콘"
                  }
                />
              </button>
            </div>
            <span id="passwordEmptyError" class="error-message">
              비밀번호를 입력해 주세요
            </span>
            <span id="passwordInvalidError" class="error-message">
              비밀번호를 8자 이상 입력해 주세요
            </span>
          </div>

          <button type="submit" class="button pill-button full-width">
            로그인
          </button>
        </form>

        <div class="social-login-container">
          <h3>간편 로그인하기</h3>
          <div class="social-login-links-container">
            <a
              href="https://www.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="구글 로그인"
            >
              <img
                src="/images/social/google.png"
                alt="구글 로그인"
                width="42"
              />
            </a>
            <a
              href="https://www.kakaocorp.com/page/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="카카오톡 로그인"
            >
              <img
                src="/images/social/kakao.png"
                alt="카카오톡 로그인"
                width="42"
              />
            </a>
          </div>
        </div>

        <div class="auth-switch">
          판다마켓이 처음이신가요? <Link to="/SignUp">회원가입</Link>
        </div>
      </main>
    </>
  );
};

export default LoginPage;