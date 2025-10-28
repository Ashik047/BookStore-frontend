import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
    return (
        <main className='grow text-center py-4 grid place-content-center'>
            <img src="https://www.chainreaction.ae/wp-content/themes/chainreaction_new2021/assets/404.gif" alt="page not found" className='w-full mx-auto block' />
            <h1 className='font-extrabold text-6xl mb-8'>Page Not Found</h1>
            <p className='mb-8 text-2xl'>The page that you are looking for is not available</p>
            <Link to={"/"} className=" w-[200px] bg-blue-700 p-2 block text-center text-white rounded-lg font-bold hover:bg-blue-500 mx-auto" >Back to Home</Link>
        </main>
    )
}

export default PageNotFound