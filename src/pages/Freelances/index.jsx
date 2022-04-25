import DefaultPicture from '../../assets/profile.png'
import Card from '../../components/Card'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/Atoms'
import { ErrorText } from '../../utils/style/Atoms'
import { useFetch, useTheme } from '../../utils/hooks'

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
  const { theme } = useTheme()

  const { data, isLoading, error } = useFetch(
    `http://localhost:8000/freelances`
  )
  
  const { freelancersList } = error ? defaultFreelances : data

  return (
    <div>
      <PageTitle isDarkMode={theme === 'dark'}>Find your partner</PageTitle>
      <PageSubtitle>
        At Shiny, we gather the best profiles for you.
      </PageSubtitle>
      {error && (
        <ErrorText>An error occured ! (Default data displayed)</ErrorText>
      )}
      {isLoading ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <CardsContainer>
          {freelancersList.map((profile, index) => (
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
