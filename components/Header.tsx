import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const GlobalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  height: 70px;
  border-bottom: 1px solid #dfdfdf;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderLogo = styled.div`
  margin-left: 16px;
  margin-right: 16px;

  @media (min-width: 768px) {
    margin-left: 24px;
    margin-right: 35px;
  }

  @media (min-width: 1280px) {
    margin-left: 200px;
    margin-right: 47px;
  }
`;

const HeaderLoginLogo = styled.div`
  margin-right: 16px;

  @media (min-width: 768px) {
    margin-right: 24px;
  }

  @media (min-width: 1280px) {
    margin-right: 200px;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 8px;
  font-weight: bold;
  font-size: 16px;

  @media (min-width: 768px) {
    gap: 36px;
    font-size: 18px;
  }
`;

const NavItem = styled.li`
  a {
    color: #4b5563;
    text-decoration: none;

    &:hover {
      color: #1967d6;
    }
  }
`;

const Header: React.FC = () => {
  return (
    <GlobalHeader>
      <HeaderLeft>
        <HeaderLogo>
          <Link href="/" passHref>
            <Image
              src="/images/logo.svg"
              alt="판다마켓 로고"
              width={153}
              height={51}
            />
          </Link>
        </HeaderLogo>

        <nav>
          <NavList>
            <NavItem>
              <Link href="/boards">자유게시판</Link>
            </NavItem>
            <NavItem>
              <Link href="/items">중고마켓</Link>
            </NavItem>
          </NavList>
        </nav>
      </HeaderLeft>

      <HeaderLoginLogo>
        <Link href="/login" passHref>
          <Image
            src="/images/mylogin.svg"
            alt="마이페이지 로고"
            width={40}
            height={40}
          />
        </Link>
      </HeaderLoginLogo>
    </GlobalHeader>
  );
};

export default Header;
