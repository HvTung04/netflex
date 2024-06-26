import { useState, useEffect } from 'react'
import React from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { UserAuth } from '../context/AuthContext'
import {db} from '../firebase'
import { updateDoc, doc, onSnapshot } from 'firebase/firestore'
import { AiOutlineClose } from 'react-icons/ai'

// import
import axios from 'axios'

const SavedShow = () => {
    const [movies, setMovies] = useState([])
    const[similarMovies, setSimilarMovies] = useState([]); //them state de luu phim tuong tu
    const { user } = UserAuth()

    const slideLeft = () => {
        var slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft - 500
    }

    const slideRight = () => {
        var slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft + 500
    }

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            setMovies(doc.data()?.savedShows) })
    }, [user?.email])

    //them dieu kien
    useEffect(() => {
        if(movies.length > 0){
            fetchSimilarMovies(movies);
        }
    }, [movies])

    const fetchSimilarMovies = async (favoriteMovies) => {
    const allSimilarMovies = [];
    for (let movie of favoriteMovies) {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/similar?api_key=e60c03141f761a4e7f52438632c4d471`);
        allSimilarMovies.push(...response.data.results);
        }
        setSimilarMovies(allSimilarMovies);
    };


    const movieRef = doc(db, 'users', `${user?.email}`)
    const deleteShow = async (passedID) => {
        try {
            const result = movies.filter((item) => item.id !== passedID)
            await updateDoc(movieRef, {
                savedShows: result,
            })
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
    <h2 className='text-white font-bold md:text-xl p-4'>Chương trình yêu thích</h2>
        <div className='relative flex items-center group'>
            <div id={'slider' } className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
                {movies.map((item, id) => (
                    <div key = {id} className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
                    <img className='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${item?.img}`} alt={item.title} />
                    <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'> 
                        <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>{item?.title}</p>
                        <p onClick={() => deleteShow(item.id)} className='absolute text-gray-300 top-4 right-4'><AiOutlineClose/></p>
                    </div>
                </div>
                ))}
            </div>
            <MdChevronLeft onClick={slideLeft} className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer group-hover:block' size={40}/>
            <MdChevronRight onClick={slideRight} className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer group-hover:block' size={40}/>
        </div>

    {/* phim tuong tu */}
    {movies.length > 0 &&
        <>
        <h2 className='text-white font-bold md:text-xl p-4'>Phim tương tự</h2>
            <div className='relative flex items-center group'>
            <div id={'similarSlider'} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
                {similarMovies.map((item, id) => (
                <div key={id} className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
                    <img className='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt={item.title} />
                    <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                    <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>{item?.title}</p>
                    </div>
                </div>
                ))}
            </div>
            <MdChevronLeft onClick={() => document.getElementById('similarSlider').scrollLeft -= 500} className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer group-hover:block' size={40} />
            <MdChevronRight onClick={() => document.getElementById('similarSlider').scrollLeft += 500} className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer group-hover:block' size={40} />
            </div>
        </>
    };
    
    </>
  )
}

export default SavedShow
