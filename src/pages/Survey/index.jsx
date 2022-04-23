import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Survey() {
  const { questionNumber } = useParams()
  // let params = useParams()
  const questionNumberInt = parseInt(questionNumber)
  const prevQuestionNumber = questionNumberInt === 1 ? 1 : questionNumberInt - 1
  const nextQuestionNumber = questionNumberInt + 1

  return (
    <div>
      <h1>Questionnaire</h1>
      {questionNumber ? (
        <h2>Question {questionNumber}</h2>
      ) : (
        <Link to="/survey/1">Begin questionnaire</Link>
      )}

      {questionNumberInt > 1 && (
        <Link to={'/survey/' + prevQuestionNumber}>Previous</Link>
      )}
      {questionNumberInt >= 1 && questionNumberInt < 10 && (
        <Link to={'/survey/' + nextQuestionNumber}>Next</Link>
      )}
      {questionNumber && questionNumberInt === 10 && (
        <Link to={'/results'}>Results</Link>
      )}

      {/* <h2>Question {params.questionNumber}</h2> */}
    </div>
  )
}
export default Survey
