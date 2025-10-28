import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { getAllBooksApi } from '../../services/allApi'
import { useContext } from 'react'
import { searchKeyContext } from '../../context/ContextSearch'

const AllBooks = () => {
    const [menuStatus, setMenuStatus] = useState(true);
    const [allBooks, setAllBooks] = useState([]);
    const [tempBooks, setTempBooks] = useState([]);
    const [token, setToken] = useState("");

    const { searchKey, setSearchKey } = useContext(searchKeyContext);
    // console.log(searchKey);


    const getAllBooks = async (searchKey, tok) => {
        const reqHeader = {
            "Authorization": `Bearer ${tok}`
        };
        // console.log(reqHeader);

        const result = await getAllBooksApi(searchKey, reqHeader);
        // console.log(result);
        if (result.status == "200") {
            setAllBooks(result.data);
            setTempBooks(result.data);
        }
    }
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            const tok = sessionStorage.getItem("token");
            // console.log(tok);
            setToken(tok);
            getAllBooks(searchKey, tok);
        }
    }, [searchKey]);

    const filter = (genre) => {
        if (genre == "all") {
            setAllBooks(tempBooks);
        } else {
            setAllBooks(tempBooks.filter(item => item.category.toLowerCase() == genre.toLowerCase()));
        }
    };
    return (
        <>
            <Header />
            {token ?
                /* When logged in */
                <main className='grow px-6 py-8'>

                    <div className='sm:grid grid-cols-[1fr_6fr]'>
                        <section className='relative'>
                            <div className='flex justify-between items-center mt-6'>
                                <h2 className='font-semibold text-2xl'>Filters</h2>
                                <span className='text-lg font-semibold sm:hidden cursor-pointer'><FontAwesomeIcon icon={faBars} onClick={() => setMenuStatus(!menuStatus)} /></span>
                            </div>
                            <ul className={menuStatus ? 'sm:static absolute top-[100%] w-full left-0 bg-white py-8  ' : "hidden sm:block"}>
                                <li className='mt-3' onClick={() => filter("all")}>
                                    <input type="radio" name="genre" id="all" defaultChecked />
                                    <label htmlFor="all" className='ms-2 font-medium'>All</label>
                                </li>
                                <li className='mt-3' onClick={() => filter("adventure")}>
                                    <input type="radio" name="genre" id="adventure" />
                                    <label htmlFor="adventure" className='ms-2 font-medium'>Adventure</label>
                                </li>
                                <li className='mt-3' onClick={() => filter("philosophy")}>
                                    <input type="radio" name="genre" id="philosophy" />
                                    <label htmlFor="philosophy" className='ms-2 font-medium'>Philosophy</label>
                                </li>
                                <li className='mt-3' onClick={() => filter("romance")}>
                                    <input type="radio" name="genre" id="romance" />
                                    <label htmlFor="romance" className='ms-2 font-medium'>Romance</label>
                                </li>
                                <li className='mt-3' onClick={() => filter("horror")}>
                                    <input type="radio" name="genre" id="horror" />
                                    <label htmlFor="horror" className='ms-2 font-medium'>Horror</label>
                                </li>
                                <li className='mt-3' onClick={() => filter("mystery")}>
                                    <input type="radio" name="genre" id="mystery" />
                                    <label htmlFor="mystery" className='ms-2 font-medium'>Mystery</label>
                                </li>
                            </ul>
                        </section>
                        <section >
                            <h1 className='font-bold text-4xl text-center'>Collections</h1>
                            <div className='text-center mt-4'>
                                <input value={searchKey} onChange={(e) => setSearchKey(e.target.value)} type="text" placeholder='Search Books by Title' className='border py-1 px-3 outline-0' />
                                <button className='bg-blue-700 py-1 px-3 hover:opacity-75 ms-2 text-white'>Search</button>
                            </div>
                            <div className='flex flex-wrap mt-6 justify-center p-4 gap-4 text-center'>
                                {allBooks.length ?
                                    allBooks.map(book => (
                                        <div key={book._id} className='w-[200px] pb-3 shadow aspect-5/6 rounded-lg' hidden={book?.status == "pending" || book?.status == "sold"}>
                                            <img src={book.imageUrl} alt={book.title} className='rounded-t-lg h-[275px] w-full' />
                                            <p className='mt-2 text-sm text-gray-600 font-medium'>{book.author}</p>
                                            <p className='mt-0.5 font-bold'>{book.title}</p>
                                            <Link to={`/view-book/${book._id}`} className='cursor-pointer'><button className='px-3 py-0.5 rounded-md hover:opacity-75 text-white mt-2 bg-blue-700 font-extrabold'>View Book</button></Link>
                                        </div>
                                    )) :
                                    <p className='mt-10 font-bold text-xl'>No books</p>
                                }
                                {/* <div className='w-[200px] pb-3 shadow aspect-5/6 rounded-lg'>
                            <img src="/book1.webp" alt="Harry Potter" className='rounded-t-lg h-[275px] w-full' />
                            <p className='mt-2 font-bold'>Harry Potter</p>
                            <button className='px-3 py-0.5 rounded-md hover:opacity-75 text-white mt-2 bg-blue-700 font-extrabold'>Buy - $ 20</button>
                        </div>
                        <div className='w-[200px] pb-3 shadow aspect-5/6 rounded-lg'>
                            <img src="/book2.webp" alt="Alchemist" className='rounded-t-lg h-[275px] w-full' />
                            <p className='mt-2 font-bold'>Alchemist</p>
                            <button className='px-3 py-0.5 rounded-md hover:opacity-75 text-white mt-2 bg-blue-700 font-extrabold'>Buy - $ 18</button>
                        </div>
                        <div className='w-[200px] pb-3 shadow aspect-5/6 rounded-lg'>
                            <img src="/book3.webp" alt="Gulliver's Travel" className='rounded-t-lg h-[275px] w-full' />
                            <p className='mt-2 font-bold'>Gulliver&apos;s Travel</p>
                            <button className='px-3 py-0.5 rounded-md hover:opacity-75 text-white mt-2 bg-blue-700 font-extrabold'>Buy - $ 24</button>
                        </div>
                        <div className='w-[200px] pb-3 shadow aspect-5/6 rounded-lg'>
                            <img src="/book4.jpg" alt="Mathilukal" className='rounded-t-lg h-[275px] w-full' />
                            <p className='mt-2 font-bold'>Mathilukal</p>
                            <button className='px-3 py-0.5 rounded-md hover:opacity-75 text-white mt-2 bg-blue-700 font-extrabold'>Buy - $ 14</button>
                        </div> */}
                            </div>
                        </section>
                    </div>
                </main> :

                /* When logged out */
                <main className='flex flex-col justify-center items-center grow p-8'>
                    <img src="https://i.pinimg.com/originals/b1/a4/a3/b1a4a397162d001d14bb41a137160d00.gif" alt="Not logged in" className='rounded-[50%] w-[300px] aspect-square' />
                    <p className='text-black font-semibold mt-6'>Please <Link to={"/login"} className='text-blue-700'>Login</Link> to explore more...</p>
                </main>
            }

            <Footer />
        </>
    )
}

export default AllBooks