import { useState, useEffect, useContext  } from 'react'
import { ThemeContext } from '../context'


export function useFetch(url) {
const [data, setData] = useState({})
const [isLoading, setLoading] = useState(true)
const [error, setError] = useState(false)
 

useEffect(() => {

if (!url) return

async function fetchData() {
await fetch(url)
        .then((response) => response.json()) //return promise with json response
        .then((data) => {
          //console.log('response body', data) //body response
          setData(data)
        })
        .catch((err) => {
          console.log('error', err)
          setError(true)
        })
        .finally(() => {
          setLoading(false)
        })
}

setLoading(true)
setError(false)

fetchData()

}, [url])

return { isLoading, data,error }

}

export function useTheme() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  return { theme, toggleTheme }
}