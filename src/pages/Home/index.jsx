import { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import colors from '../../utils/style/colors'
import homePic from '../../assets/home-illustration.svg'

const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: ${colors.backgroundLight};
  padding: 5%;
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
const StyledLink = styled(Link)`
  padding: 10px 30px 10px 30px;
  color: ${colors.secondary};
  text-decoration: none;
  font-size: 18px;
  ${(props) =>
    props.$isFullLink &&
    `  width: 100px;color: white; border-radius: 30px; background-color: ${colors.primary};`}
`

const TitleStyle = styled.p`
  font-size: 3rem;
  font-weight: bold;
`

const ContentTextStyle = styled.div`
  padding: 10px;
`

function Home() {
  const [size, setSize] = useState(1)
  return (
    <HomeContainer>
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
