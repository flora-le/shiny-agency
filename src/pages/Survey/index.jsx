import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/Atoms'
import { ErrorText } from '../../utils/style/Atoms'

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const QuestionTitle = styled.h2`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
`

const QuestionContent = styled.span`
  margin: 30px;
`

const LinkWrapper = styled.div`
  padding-top: 30px;
  & a {
    color: black;
  }
  & a:first-of-type {
    margin-right: 20px;
  }
`

function Survey() {
  const { questionNumber } = useParams()
  // let params = useParams()
  const questionNumberInt = parseInt(questionNumber)
  const prevQuestionNumber = questionNumberInt === 1 ? 1 : questionNumberInt - 1
  const nextQuestionNumber = questionNumberInt + 1
  const [questions, setQuestions] = useState({})
  const [isDataLoading, setDataLoading] = useState(false)
  const [error, setError] = useState(null)

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
          console.log('response body', data) //body response
          setQuestions(data.surveyData)
        })
        .catch((err) => {
          console.log('error', err)
          setError(true)
        })
        .finally(() => {
          setDataLoading(false)
        })
    }
    fetchQuestions() //call async function
  }, [])

  return (
    <SurveyContainer>
      <h1>Questionnaire</h1>
      {questionNumber ? (
        <QuestionTitle>Question {questionNumber}</QuestionTitle>
      ) : (
        <Link to="/survey/1">Begin questionnaire</Link>
      )}
      {isDataLoading ? (
        <Loader />
      ) : (
        <QuestionContent>{questions[questionNumber]}</QuestionContent>
      )}

      <LinkWrapper>
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

      {error && <ErrorText>An error occured !</ErrorText>}
      {/* <h2>Question {params.questionNumber}</h2> */}
    </SurveyContainer>
  )
}
export default Survey
