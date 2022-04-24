import { useEffect, useContext } from 'react'
import styled from 'styled-components'

import { ThemeContext } from '../../utils/context'
import { SurveyContext } from '../../utils/context'
import colors from '../../utils/style/colors'

const ResultsTitle = styled.h1`
  color: ${({ isDarkMode }) => (isDarkMode ? colors.textPrimaryDark : 'black')};
  text-align: center;
`
function Results() {
  const { answers } = useContext(SurveyContext)
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    console.log('Results', answers)
  }, [answers])
  return (
    <div>
      <ResultsTitle isDarkMode={theme === 'dark'}>Results</ResultsTitle>
    </div>
  )
}
export default Results
