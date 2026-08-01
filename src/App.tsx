import { MovieCategoryCarousel } from '@/components/MovieCategoryCarousel'
import './App.css'
import { useEffect } from 'react'
import { usePopularMovies } from '@/hooks/usePopularMovies'




function App() {
  useEffect(()=>{
    document.documentElement.classList.add("dark")
  },[])




  return (
    <div className='flex gap-4 m-24'>
      <MovieCategoryCarousel title="Popular Movies" useMovies={usePopularMovies}/>
    </div>
  )
}

export default App
