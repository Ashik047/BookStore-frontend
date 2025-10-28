import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'

const Contact = () => {
    return (
        <>
            <Header />
            <main className='grow px-4 py-8 text-center'>
                <h1 className='font-bold text-4xl'>Contact Us</h1>
                <p className='text-justify text-sm mt-4'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet deleniti doloribus aliquam quaerat quod ratione, hic quos error ipsa unde eaque non officiis soluta quasi? Aliquid porro vitae neque deserunt!</p>
                <div className='flex justify-between items-center mt-6 flex-wrap'>
                    <div className='flex gap-2 items-center'>
                        <FontAwesomeIcon icon={faLocationDot} />
                        <address className='inline text-xs'>123 Main Street,<br />
                            Kochi, Kerala
                        </address>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <FontAwesomeIcon icon={faPhone} />
                        <address className='inline text-xs'>123456-654321
                        </address>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <FontAwesomeIcon icon={faEnvelope} />
                        <address className='inline text-xs'>123456@gmail.com
                        </address>
                    </div>
                </div>
                <div className='flex justify-center flex-wrap mt-6 gap-8'>
                    <form className='flex flex-col w-[400px] bg-gray-400 px-4 py-6 gap-3 rounded-md shadow-md shadow-black'>
                        <h2 className='font-bold text-xl'>Send me Message</h2>
                        <input type="text" placeholder='Name' id='name' name='name' className='text-black outline-0 bg-white border rounded-md px-2 py-0.5' />
                        <input type="email" placeholder='Email' id='email' name='email' className='text-black outline-0 bg-white border rounded-md px-2 py-0.5' />
                        <textarea name="message" id="message" rows={5} placeholder='Message' className='text-black outline-0 bg-white border rounded-md px-2 py-0.5' ></textarea>
                        <button className='bg-black block text-white py-1 rounded-md hover:opacity-75'>Send</button>
                    </form>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62861.98739750193!2d76.26694459431374!3d10.027237571437999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080dafbed183bf%3A0x5951f316ba13a37e!2sLuLu%20International%20Shopping%20Mall!5e0!3m2!1sen!2sin!4v1757653377194!5m2!1sen!2sin" width="400" height="350" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className='shadow-md shadow-black rounded-md'></iframe>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Contact