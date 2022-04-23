import PropTypes from 'prop-types'
import styled from 'styled-components'
import DefaultPicture from '../../assets/profile.png'
import colors from '../../utils/style/colors'

const CardLabel = styled.span`
  color: ${colors.primary};
  font-size: 22px;
  padding-left: 15px;
`
const CardImage = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 50%;
  align-self: center;
`
const CardTitle = styled.span`
  color: black;
  font-size: 22px;
  text-align: center;
`
const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px;
  background-color: ${colors.backgroundLight};
  border-radius: 30px;
  width: 300px;
  height: 300px;
  transition: 200ms;
  &:hover {
    cursor: pointer;
    box-shadow: 2px 2px 10px #e2e3e9;
  }
`

function Card({ label, title, picture }) {
  return (
    <CardWrapper>
      <CardLabel>{label}</CardLabel>
      <CardImage src={picture} alt="freelance" />
      <CardTitle>{title}</CardTitle>
    </CardWrapper>
  )
}

Card.propTypes = {
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
}

// default value of props
Card.defaultProps = {
  label: '',
  title: '',
  picture: DefaultPicture,
}

export default Card
