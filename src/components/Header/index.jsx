import { useContext } from 'react'
import styled from 'styled-components'

import colors from '../../utils/style/colors'
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

const LinkWrapper = styled.div`
  padding-top: 30px;
  & a {
    color: ${({ isDarkMode }) =>
      isDarkMode ? colors.textPrimaryDark : colors.secondary};
  }
  & a:first-of-type {
    margin-right: 20px;
  }
`

const navLinks = [
  { to: '/shiny-agency', name: 'home', content: 'Home' },
  { to: '/freelances', name: 'freelances', content: 'Profiles' },
  { to: '/survey/1', name: 'survey', content: 'Begin test' },
]

function Header() {
  const { theme } = useContext(ThemeContext)

  return (
    <NavbarStyle>
      <LogoImage
        src={logoShiny}
        alt="logo-shiny"
        isDarkMode={theme === 'dark'}
      />
      <LinkWrapper isDarkMode={theme === 'dark'}>
        {navLinks.map((navLink, index) =>
          navLink.name !== 'survey' ? (
            <StyledLink key={`${navLink.name}-${index}`} to={navLink.to}>
              {navLink.content}
            </StyledLink>
          ) : (
            <StyledLink
              key={`${navLink.name}-${index}`}
              to={navLink.to}
              $isFullLink
            >
              {navLink.content}
            </StyledLink>
          )
        )}
        {/* 
        <StyledLink to="/shiny-agency" isDarkMode={theme === 'dark'}>
          Home
        </StyledLink>
        <StyledLink to="/freelances" isDarkMode={theme === 'dark'}>
          Profiles
        </StyledLink>
        <StyledLink to="/survey/1" $isFullLink $isDarkMode={theme === 'dark'}>
          Test
        </StyledLink> */}
      </LinkWrapper>
    </NavbarStyle>
  )
}

export default Header
