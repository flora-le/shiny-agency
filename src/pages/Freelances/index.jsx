import { useState, useEffect } from 'react'

import DefaultPicture from '../../assets/profile.png'
import Card from '../../components/Card'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/Atoms'
import { ErrorText } from '../../utils/style/Atoms'

const CardsContainer = styled.div`
  display: grid;
  gap: 24px;
  justify-content: center;
  align-content: center;
  grid-template-columns: repeat(3, 1fr);
  width: fit-content;
  margin: auto;
  text-align: center;
  justify-items: center;
  align-items: center;
`

const PageTitle = styled.h1`
  font-size: 30px;
  color: black;
  text-align: center;
  padding-bottom: 30px;
`

const PageSubtitle = styled.h2`
  font-size: 20px;
  color: ${colors.secondary};
  font-weight: 300;
  text-align: center;
  padding-bottom: 30px;
`
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
`

function Freelances() {
  const [isDataLoading, setDataLoading] = useState(false)
  const [freelanceProfiles, setFreelanceProfiles] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchFreelances() {
      setDataLoading(true)
      setError(false)
      await fetch(`http://localhost:8000/freelances`)
        .then((response) => response.json()) //return promise with json response
        .then((data) => {
          console.log('response body', data) //body response
          setFreelanceProfiles(data.freelancersList)
        })
        .catch((err) => {
          console.log('error', err)
          setError(true)
        })
        .finally(() => {
          setDataLoading(false)
        })
    }
    fetchFreelances() //call async function
  }, [])

  return (
    <div>
      <PageTitle>Find your partner</PageTitle>
      <PageSubtitle>
        At Shiny, we gather the best profiles for you.
      </PageSubtitle>
      {error && <ErrorText>An error occured !</ErrorText>}
      {isDataLoading ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <CardsContainer>
          {freelanceProfiles.map((profile, index) => (
            <Card
              key={`${profile.name}-${index}`}
              label={profile.job}
              picture={profile.picture ? profile.picture : DefaultPicture}
              title={profile.name}
            />
          ))}
        </CardsContainer>
      )}
    </div>
  )
}

export default Freelances
