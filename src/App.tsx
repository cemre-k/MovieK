import './App.css'
import MovieCard from "../components/MovieCard"
import { useEffect } from 'react'

function App() {
  useEffect(()=>{
    document.documentElement.classList.add("dark")
  },[])

  return (
    <>
      <MovieCard/>
    </>
  )
}

export default App
