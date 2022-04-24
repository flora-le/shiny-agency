import { useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext } from '../../utils/context'
import colors from '../../utils/style/colors'

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 60px;
`

const NightModeButton = styled.button`
  background-color: transparent;
  border-color: ${colors.secondary};
  border-radius: 25px;
  cursor: pointer;
  color: ${({ isDarkMode }) =>
    isDarkMode ? colors.textPrimaryDark : colors.secondary};
  height: 50px;
  font-size: 20px;
`

function Footer() {
  const { toggleTheme, theme } = useContext(ThemeContext)

  return (
    <FooterContainer>
      <NightModeButton
        onClick={() => toggleTheme()}
        isDarkMode={theme === 'dark'}
      >
        Change mode : {theme === 'light' ? 'Light' : 'Dark'}
      </NightModeButton>
    </FooterContainer>
  )
}

export default Footer
