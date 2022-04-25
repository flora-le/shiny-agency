import { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/Atoms'
import { ErrorText } from '../../utils/style/Atoms'
import { SurveyContext } from '../../utils/context'
import { ThemeContext } from '../../utils/context'
import { useFetch } from '../../utils/hooks'

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const QuestionnaireTitle = styled.h1`
  color: ${({ isDarkMode }) => (isDarkMode ? colors.textPrimaryDark : 'black')};
`
const QuestionTitle = styled.h2`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
  color: ${({ isDarkMode }) => (isDarkMode ? colors.textPrimaryDark : 'black')};
`

const QuestionContent = styled.span`
  margin: 30px;
  color: ${({ isDarkMode }) => (isDarkMode ? colors.textPrimaryDark : 'black')};
`

const LinkWrapper = styled.div`
  padding-top: 30px;
  & a {
    color: ${({ isDarkMode }) =>
      isDarkMode ? colors.textPrimaryDark : 'black'};
  }
  & a:first-of-type {
    margin-right: 20px;
  }
`

const ReplyBox = styled.button`
  border: none;
  font-size: 20px;
  height: 100px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ isDarkMode }) =>
    isDarkMode ? 'rgba(255,255,255,0.8)' : colors.backgroundLight};
  border-radius: 30px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.isSelected ? `0px 0px 0px 2px ${colors.primary} inset` : 'none'};
  &:first-child {
    margin-right: 15px;
  }
  &:last-of-type {
    margin-left: 15px;
  }
`

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const defaultSurvey = {
  1: 'Default : Votre site doit-il sauvegarder des données entrées par vos utilisateurs ?',
  2: 'Default : Votre application doit-elle impérativement apparaître en premier dans les résultats de recherche ?',
  3: "Default :  Avez-vous déjà des maquettes pour l'application que vous voulez créer ?",
  4: "Default : Le site comporte-t-il une fonction d'authentification ?",
  5: 'Default : Souhaitez-vous avoir plusieurs types de comptes pour votre application (administrateur, visiteur, utilisateur, etc). ?',
  6: 'Default : Avez-vous prévu une version mobile à part entière ?',
}

function Survey() {
  const { questionNumber } = useParams()
  // let params = useParams()
  const questionNumberInt = parseInt(questionNumber)
  const prevQuestionNumber = questionNumberInt === 1 ? 1 : questionNumberInt - 1
  const nextQuestionNumber = questionNumberInt + 1
  const { answers, saveAnswers } = useContext(SurveyContext)
  
  const { theme } = useContext(ThemeContext)

  function saveReply(answer) {
    saveAnswers({ [questionNumber]: answer })
  }
const { data, isLoading, error } = useFetch(`http://localhost:8000/survey`)
  const { surveyData } = error ? defaultSurvey : data
  
  useEffect(() => {
    console.log('answers updated after render', answers)
  }, [answers])

  return (
    <SurveyContainer isDarkMode={theme === 'dark'}>
      <QuestionnaireTitle isDarkMode={theme === 'dark'}>
        Questionnaire
      </QuestionnaireTitle>
      {questionNumber ? (
        <QuestionTitle isDarkMode={theme === 'dark'}>
          Question {questionNumber}
        </QuestionTitle>
      ) : (
        <Link to="/survey/1">Begin questionnaire</Link>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <QuestionContent isDarkMode={theme === 'dark'}>
          {surveyData && surveyData[questionNumber]}
        </QuestionContent>
      )}

      {answers && !isLoading && (
        <ReplyWrapper>
          <ReplyBox
            isDarkMode={theme === 'dark'}
            onClick={() => {
              saveReply(true)
            }}
            isSelected={answers[questionNumber] === true}
          >
            Oui
          </ReplyBox>
          <ReplyBox
            isDarkMode={theme === 'dark'}
            onClick={() => {
              saveReply(false)
            }}
            isSelected={answers[questionNumber] === false}
          >
            Non
          </ReplyBox>
        </ReplyWrapper>
      )}

      {!isLoading && (
        <LinkWrapper isDarkMode={theme === 'dark'}>
          {questionNumberInt > 1 && (
            <Link to={'/survey/' + prevQuestionNumber}>Previous</Link>
          )}
          {data[questionNumberInt + 1] && (
            <Link to={'/survey/' + nextQuestionNumber}>Next</Link>
          )}
          {questionNumber && !data[questionNumberInt + 1] && (
            <Link to={'/results'}>Results</Link>
          )}
        </LinkWrapper>
      )}

      {error && (
        <ErrorText>An error occured ! (Default data displayed)</ErrorText>
      )}
      {/* <h2>Question {params.questionNumber}</h2> */}
    </SurveyContainer>
  )
}
export default Survey
