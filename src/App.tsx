import './App.css'
import MovieCard from "../components/MovieCard"
import {getPopularMovies} from "@/api/movies"

import { useEffect } from 'react'

const response =await getPopularMovies()
const movies =response.results

function App() {
  useEffect(()=>{
    document.documentElement.classList.add("dark")
  },[])

  return (
    <div className='flex gap-4'>
      {movies.map((el)=><MovieCard movie={el}/>)}      
    </div>
  )
}

export default App
