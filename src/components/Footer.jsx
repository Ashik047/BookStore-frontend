import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
    return (
        <footer className='bg-gray-900 text-white p-8 sm:grid sm:grid-cols-[1fr_1fr_1fr_0.1fr] sm:gap-8 gap-4 flex flex-col'>
            <section>
                <h2 className='mb-0.5 text-xl font-bold'>About Us</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus tempora possimus molestias enim voluptate expedita</p>
            </section>
            <section>
                <h2 className='sm:mb-4 mb-0.5 text-xl font-bold'>Newsletter</h2>
                <p className='mb-1'>Stay updated with our latest trends</p>
                <input type="email" className='bg-white sm:w-[80%] w-[50%] lg:w-[60%] xl:w-[40%] text-black rounded-s-sm py-0.5 px-2' placeholder='Email' />
                <button className='bg-yellow-400 py-0.5 sm:px-0.5 px-2 text-black rounded-e-sm'><FontAwesomeIcon icon={faArrowRight} /></button>
            </section>
            <section>
                <h2 className='mb-0.5 text-xl font-bold'>Follow Us</h2>
                <p>Let us be social</p>
                <div>
                    <a href="" target='_blank' className='me-2'><FontAwesomeIcon icon={faFacebook} /></a>
                    <a href="" target='_blank' className='me-2'><FontAwesomeIcon icon={faTwitter} /></a>
                    <a href="" target='_blank' className='me-2'><FontAwesomeIcon icon={faInstagram} /></a>
                </div>
            </section>

        </footer>
    )
}

export default Footer