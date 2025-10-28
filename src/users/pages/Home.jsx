import React from 'react'
import Header from "../components/Header"
import Footer from "../../components/Footer"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"
import { useEffect } from 'react'
import { getHomeBooksApi } from '../../services/allApi'
import { useState } from 'react'
import { useContext } from 'react'
import { searchKeyContext } from '../../context/ContextSearch'

const Home = () => {

    const [homeBooks, setHomeBooks] = useState([]);
    const { searchKey, setSearchKey } = useContext(searchKeyContext);


    const getAllHomeBooks = async () => {
        const result = await getHomeBooksApi();
        // console.log(result);
        if (result.status == "200") {
            setHomeBooks(result.data);
        }
    }
    useEffect(() => {
        setSearchKey("");
        getAllHomeBooks();
    }, []);
    return (
        <>
            <Header />
            <main>
                <section className='home__container grow flex justify-center items-center h-[500px]'>
                    <div className='inner__container'>
                        <div className='text-white text-center'>
                            <h1 className='font-bold text-4xl'>Wonderful Gifts</h1>
                            <p className='mt-2 opacity-75'>Give your families and friends a book</p>
                        </div>
                        <div className='flex items-center justify-center mt-8'>
                            <input value={searchKey} onChange={(e) => setSearchKey(e.target.value)} type="text" className='bg-white rounded-s-lg px-2 py-1 mt-3 inline-block w-[250px] outline-0' placeholder='Search Books' id="animated-input" />
                            <Link to={"/all-books"}><FontAwesomeIcon icon={faSearch} className='bg-white p-2 font-bold rounded-e-lg mt-3 cursor-pointer' /></Link>
                        </div>
                    </div>
                </section>
                <section className='text-center mt-10 p-4'>
                    <h2 className='font-bold text-3xl'>New Arrivals</h2>
                    <p className='mt-2'>Explore our latest collections</p>
                    <div className='flex flex-wrap mt-6 justify-center p-4 gap-4'>
                        {
                            homeBooks.map(book => (
                                <div key={book._id} className='w-[200px] pb-3 shadow aspect-5/6 rounded-lg'>
                                    <img src={book.imageUrl} alt={book.title} className='rounded-t-lg h-[275px] w-full' />
                                    <p className='mt-2 text-sm text-gray-600 font-medium'>{book.author}</p>
                                    <p className='mt-0.5 font-bold'>{book.title}</p>
                                    <p className='text-red-700 font-extrabold text-xl'>$ {book.dPrice}</p>
                                </div>
                            ))
                        }
                        {/* <div className='w-[200px] pb-3 shadow aspect-5/6 rounded-lg'>
                            <img src="/book1.webp" alt="Harry Potter" className='rounded-t-lg h-[275px] w-full' />
                            <p className='mt-2 font-bold'>Harry Potter</p>
                            <p className='text-red-700 font-extrabold text-2xl'>$ 20</p>
                        </div>
                        <div className='w-[200px] pb-3 shadow aspect-5/6 rounded-lg'>
                            <img src="/book2.webp" alt="Alchemist" className='rounded-t-lg h-[275px] w-full' />
                            <p className='mt-2 font-bold'>Alchemist</p>
                            <p className='text-red-700 font-extrabold text-2xl'>$ 18</p>
                        </div>
                        <div className='w-[200px] pb-3 shadow aspect-5/6 rounded-lg'>
                            <img src="/book3.webp" alt="Gulliver's Travel" className='rounded-t-lg h-[275px] w-full' />
                            <p className='mt-2 font-bold'>Gulliver&apos;s Travel</p>
                            <p className='text-red-700 font-extrabold text-2xl'>$ 24</p>
                        </div>
                        <div className='w-[200px] pb-3 shadow aspect-5/6 rounded-lg'>
                            <img src="/book4.jpg" alt="Mathilukal" className='rounded-t-lg h-[275px] w-full' />
                            <p className='mt-2 font-bold'>Mathilukal</p>
                            <p className='text-red-700 font-extrabold text-2xl'>$ 14</p>
                        </div> */}
                    </div>
                    <Link to={"/all-books"} className='bg-blue-800 px-4 py-1 rounded-lg hover:opacity-75 text-white'>More</Link>
                </section>
                <section className='flex flex-col justify-center items-center p-4 mt-8'>
                    <div className='w-full'>
                        <h2 className='font-bold text-4xl text-center'>Featured Authors</h2>
                        <p className='text-center text-md mt-2'>Captivates with every word</p>
                        <div className='flex justify-center items-center gap-4 lg:p-4 lg:px-8'>
                            <div className=''>
                                <p className='text-sm mt-8 text-justify'>Authors in a bookstore application are the visionaries behind the books that fill the shelves, each contributing their own unique voice, creativity, and perspective to the world of literature. Whether writing fiction, non-fiction, poetry, or educational works, authors bring stories, ideas, and knowledge to life in ways that resonate with readers of all backgrounds.
                                </p>
                                <p className='text-sm mt-2 text-justify'>Their work spans a wide array of genres, from thrilling mysteries and heartwarming romances to thought-provoking memoirs and insightful self-help books. Through their words, authors not only entertain and inform but also inspire and challenge readers to think deeply, reflect, and grow. In a bookstore application, authors' works become accessible to readers everywhere, offering a diverse and rich tapestry of voices and experiences, all of which contribute to the evolving landscape of modern literature.</p>
                            </div>
                            <img src="/review1.jpg" alt="reviewer 1" className='w-[200px] aspect-auto rounded-lg shadow justify-self-center' />
                        </div>
                    </div>
                </section>
                <section className='flex justify-center items-center flex-col md:py-10 md:px-40 mt-8 p-4 mb-10'>
                    <h2 className='font-bold text-4xl text-center'>Testimonials</h2>
                    <p className='text-center text-md mt-2'>See what others are saying</p>
                    <img src="/review2.jpg" style={{ width: "150px", height: "150px", borderRadius: '50%' }} alt="reviewer 2" className='mt-6' />
                    <h6 className='mt-3'>Helen Thomas</h6>
                    <p className='mt-3 text-justify text-sm'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos eius assumenda consectetur nam ducimus perferendis sequi </p>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Home