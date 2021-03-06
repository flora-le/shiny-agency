import { Link } from 'react-router-dom'
import colors from './colors'
import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

export const Loader = styled.div`
  padding: 10px;
  border: 6px solid ${colors.primary};
  border-bottom-color: transparent;
  border-radius: 22px;
  animation: ${rotate} 1s infinite linear;
  height: 0;
  width: 0;
`
export const StyledLink = styled(Link)`
  padding: 10px 30px 10px 30px;
  color: ${({ isDarkMode }) =>
    isDarkMode ? colors.textPrimaryDark : colors.secondary};
  text-decoration: none;
  font-size: 18px;
  ${(props) =>
    props.$isFullLink &&
    `color: white !important;
    border-radius: 30px;
    background-color: ${colors.primary};`}
`

export const ErrorText = styled.p`
  color: ${colors.error};
  font-style: italic;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
`
