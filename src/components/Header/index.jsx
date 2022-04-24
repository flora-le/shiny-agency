import { useContext } from 'react'
import styled from 'styled-components'

import { StyledLink } from '../../utils/style/Atoms'
import { ThemeContext } from '../../utils/context'
import logoShiny from '../../assets/dark-logo.png'
// import colors from '../../utils/style/colors'

const NavbarStyle = styled.nav`
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
`
const LogoImage = styled.img`
  height: 100%;
  width: 100px;
  object-fit: cover;
  background-color: ${({ isDarkMode }) =>
    isDarkMode && 'rgba(255, 255, 255, 0.20);'};
  border-radius: 15px;
`

// const navLinks = [
//   { to: '/', name: 'home', content: 'Home' },
//   { to: '/freelances', name: 'freelances', content: 'Profiles' },
//   { to: '/survey/1', name: 'survey', content: 'Begin test' },
// ]

function Header() {
  const { theme } = useContext(ThemeContext)

  return (
    <NavbarStyle>
      <LogoImage
        src={logoShiny}
        alt="logo-shiny"
        isDarkMode={theme === 'dark'}
      />
      <div>
        {/* {navLinks.map((navLink, index) =>
          navLink.name !== 'survey' ? (
            <StyledLink
              key={`${navLink.name}-${index}`}
              to={navLink.to}
              $isDarkMode={theme === 'dark'}
            >
              {navLink.content}
            </StyledLink>
          ) : (
            <StyledLink
              key={`${navLink.name}-${index}`}
              to={navLink.to}
              $isDarkMode={theme === 'dark'}
              $isFullLink
            >
              {navLink.content}
            </StyledLink>
          )
        )} */}

        <StyledLink to="/" isDarkMode={theme === 'dark'}>
          Home
        </StyledLink>
        <StyledLink to="/freelances" isDarkMode={theme === 'dark'}>
          Profiles
        </StyledLink>
        <StyledLink to="/survey/1" $isFullLink $isDarkMode={theme === 'dark'}>
          Test
        </StyledLink>
      </div>
    </NavbarStyle>
  )
}

export default Header
