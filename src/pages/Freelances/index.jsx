import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../../utils/context'

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
  color: ${({ isDarkMode }) => (isDarkMode ? colors.textPrimaryDark : 'black')};
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

const defaultFreelances = [
  {
    id: '1',
    name: 'Julien Brun',
    job: 'Développeur mobile',
    picture: DefaultPicture,
  },
  {
    id: '2',
    name: 'Arielle Gautier',
    job: 'Développeuse fullstack',
    picture: DefaultPicture,
  },
  {
    id: '3',
    name: 'Marine Carpentier',
    job: 'Développeuse frontend',
    picture: DefaultPicture,
  },
  {
    id: '4',
    name: 'Lucille Barre',
    job: 'Product Designer',
    picture: DefaultPicture,
  },
  {
    id: '5',
    name: 'Clément Rolland',
    job: 'Développeur mobile',
    picture: DefaultPicture,
  },
  {
    id: '6',
    name: 'Grégoire Chevalier',
    job: 'Développeur backend',
    picture: DefaultPicture,
  },
  {
    id: '7',
    name: 'Raphaël Rodriguez',
    job: 'Designer',
    picture: DefaultPicture,
  },
  {
    id: '8',
    name: 'Hugo Vysa',
    job: 'Développeur frontend',
    picture: DefaultPicture,
  },
  {
    id: '9',
    name: 'Mina Toman',
    job: 'Développeuse Mobile',
    picture: DefaultPicture,
  },
  {
    id: '10',
    name: 'Amélie Leroy',
    job: 'Développeuse backend',
    picture: DefaultPicture,
  },
  {
    id: '11',
    name: 'Maxime Lebrun',
    job: 'Intégrateur SEO',
    picture: DefaultPicture,
  },
]

function Freelances() {
  const { theme } = useContext(ThemeContext)

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
          setFreelanceProfiles(defaultFreelances) //show this if error (for demo purpose)
        })
        .finally(() => {
          setDataLoading(false)
        })
    }
    fetchFreelances() //call async function
  }, [])

  return (
    <div>
      <PageTitle isDarkMode={theme === 'dark'}>Find your partner</PageTitle>
      <PageSubtitle>
        At Shiny, we gather the best profiles for you.
      </PageSubtitle>
      {error && (
        <ErrorText>An error occured ! (Default data displayed)</ErrorText>
      )}
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
