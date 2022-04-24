import { useContext } from 'react'
import { ThemeContext } from '../../utils/context'
import styled from 'styled-components'

import colors from '../../utils/style/colors'
import homePic from '../../assets/home-illustration.svg'
import { StyledLink } from '../../utils/style/Atoms'

const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: ${({ isDarkMode }) =>
    isDarkMode ? 'rgba(255,255,255,0.2)' : colors.backgroundLight};
  color: ${({ isDarkMode }) =>
    isDarkMode ? 'rgba(255,255,255,0.9)' : 'black'};
  padding: 5%;
  width: fit-content;
  margin: auto;
`
// const Balloon = styled.div`
//   height: 100px;
//   width: 100px;
//   border-radius: 50px;
//   background-color: #e20202;
//   transform: scale(${({ size }) => size});
// `

const HomePic = styled.img`
  width: 50%;
`
const TitleStyle = styled.p`
  font-size: 3rem;
  font-weight: bold;
`

const ContentTextStyle = styled.div`
  padding: 10px;
`

function Home() {
  // const [size, setSize] = useState(1)
  const { theme } = useContext(ThemeContext)

  return (
    <HomeContainer isDarkMode={theme === 'dark'}>
      {/* <Balloon size={size}></Balloon> */}
      <ContentTextStyle>
        <TitleStyle>
          Know your needs,
          <br />
          we take care of the rest,
          <br />
          with the best talents
        </TitleStyle>
        <StyledLink to="/survey/1" $isFullLink>
          Begin the test
        </StyledLink>
      </ContentTextStyle>
      <HomePic src={homePic}></HomePic>
    </HomeContainer>
  )
}

export default Home
