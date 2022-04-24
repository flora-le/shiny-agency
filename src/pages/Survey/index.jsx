import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/Atoms'
import { ErrorText } from '../../utils/style/Atoms'
import { SurveyContext } from '../../utils/context'
import { ThemeContext } from '../../utils/context'

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
  height: 100px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ isDarkMode }) =>
    isDarkMode ? colors.secondary : colors.backgroundLight};
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
  const [isDataLoading, setDataLoading] = useState(false)
  const [questions, setQuestions] = useState({})
  const { answers, saveAnswers } = useContext(SurveyContext)
  const [error, setError] = useState(null)
  const { theme } = useContext(ThemeContext)

  /*
  // Cette syntaxe permet aussi bien de faire des calls API.
  // Mais pour utiliser await dans une fonction, il faut que celle-ci soit async (pour asynchrone).
  // Comme la fonction passée à useEffect ne peut pas être asynchrone,
  // il faut utiliser une fonction qui est appelée dans useEffect et déclarée en dehors, comme ici 👇.
  // Essayez de commenter le code créé dans le chapitre et de décommenter fetchData pour voir.

  // async function fetchData() {
  //   try {
  //     const response = await fetch(`http://localhost:8000/survey`)
  //     const { surveyData } = await response.json()
  //     setSurveyData(surveyData)
  //   } catch (error) {
  // console.log('===== error =====', error)
  // setError(true)
  //   }
  // }
  // useEffect(() => {
  //   // fetchData()
  //   setDataLoading(true) //css loading
  //   fetch(`http://localhost:8000/survey`).then((response) =>
  //     response
  //       .json()
  //       .then(({ surveyData }) => {
  //         console.log(surveyData)
  //         setQuestions(surveyData)
  //         setDataLoading(false) //stop loading css
  //       })
  //       .catch((error) => console.log('error', error))
  //   )
  // }, [])
  */

  function saveReply(answer) {
    saveAnswers({ [questionNumber]: answer })
  }
  useEffect(() => {
    async function fetchQuestions() {
      /*
      try {
        setDataLoading(true)
        const response = await fetch(`http://localhost:8000/survey`)
        //destructure because surveyData is a property of returned object
         const { surveyData } = await response.json()
         setQuestions(surveyData)
      } catch (err) {
        console.log('error', err)
        setError(true)
      } finally {
        setDataLoading(false)
      }
      */

      //2nd way
      setDataLoading(true)
      setError(false)
      await fetch(`http://localhost:8000/survey`)
        .then((response) => response.json()) //return promise with json response
        .then((data) => {
          //console.log('response body', data) //body response
          setQuestions(data.surveyData)
        })
        .catch((err) => {
          console.log('error', err)
          setError(true)
          setQuestions(defaultSurvey)
        })
        .finally(() => {
          setDataLoading(false)
        })
    }
    fetchQuestions() //call async function

    //console.log('my answers', answers)
  }, [])

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
      {isDataLoading ? (
        <Loader />
      ) : (
        <QuestionContent isDarkMode={theme === 'dark'}>
          {questions[questionNumber]}
        </QuestionContent>
      )}

      {answers && !isDataLoading && (
        <ReplyWrapper>
          <ReplyBox
            onClick={() => {
              saveReply(true)
            }}
            isSelected={answers[questionNumber] === true}
          >
            Oui
          </ReplyBox>
          <ReplyBox
            onClick={() => {
              saveReply(false)
            }}
            isSelected={answers[questionNumber] === false}
          >
            Non
          </ReplyBox>
        </ReplyWrapper>
      )}

      {!isDataLoading && (
        <LinkWrapper isDarkMode={theme === 'dark'}>
          {questionNumberInt > 1 && (
            <Link to={'/survey/' + prevQuestionNumber}>Previous</Link>
          )}
          {questions[questionNumberInt + 1] && (
            <Link to={'/survey/' + nextQuestionNumber}>Next</Link>
          )}
          {questionNumber && !questions[questionNumberInt + 1] && (
            <Link to={'/results'}>Results</Link>
          )}
        </LinkWrapper>
      )}

      {error && <ErrorText>An error occured !</ErrorText>}
      {/* <h2>Question {params.questionNumber}</h2> */}
    </SurveyContainer>
  )
}
export default Survey
