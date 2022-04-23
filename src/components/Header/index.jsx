import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import logoShiny from '../../assets/dark-logo.png'

const StyledLink = styled(Link)`
  margin: 10px;
  padding: 15px;
  color: ${colors.secondary};
  text-decoration: none;
  font-size: 18px;
  ${(props) =>
    props.$isFullLink &&
    `color: white; border-radius: 30px; background-color: ${colors.primary};`}
`
const NavbarStyle = styled.nav`
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
`
const LogoImage = styled.img`
  height: 100%;
  width: 100px;
  object-fit: cover;
`

// ${({ props }) =>
//   props.$isFullLink &&
//   `color: white; border-radius: 30px; background-color: #5843E4;`}

function Header() {
  return (
    <NavbarStyle>
      <LogoImage src={logoShiny} alt="logo-shiny" />
      <div>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/freelances">Profiles</StyledLink>
        <StyledLink to="/survey/1" $isFullLink>
          Test
        </StyledLink>
      </div>
    </NavbarStyle>
  )
}

export default Header
