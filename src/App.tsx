import PopularMoviesCarousel from '@/components/PopularMoviesCarousel'
import './App.css'
import { useEffect } from 'react'




function App() {
  useEffect(()=>{
    document.documentElement.classList.add("dark")
  },[])




  return (
    <div className='flex gap-4 m-24'>
      <PopularMoviesCarousel/>
    </div>
  )
}

export default App
