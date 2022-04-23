import styled from 'styled-components'
import colors from '../../utils/style/colors'

const TextError = styled.h1`
  color: black;
  font-size: 30px;
`

const Text404 = styled.h1`
  color: ${colors.primary};
  font-size: 6rem;
`

const ErrorWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  background-color: ${colors.backgroundLight};
  padding: 10px;
  margin: 10px;
`

function Error() {
  return (
    <ErrorWrapper>
      <TextError>Oops !</TextError>
      <Text404>
        404 <br />
        Not found
      </Text404>
      <TextError>This page doesn't exist</TextError>
    </ErrorWrapper>
  )
}

export default Error
