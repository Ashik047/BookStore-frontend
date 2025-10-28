import './App.css'
import Home from "./users/pages/Home"
import { Routes, Route } from "react-router-dom"
import PageNotFound from "./pages/PageNotFound"
import Auth from "./pages/Auth"
import Preloader from './components/Preloader'
import { useState } from 'react'
import { useEffect } from 'react'
import AllBooks from './users/pages/AllBooks'
import Career from './users/pages/Career'
import Contact from './users/pages/Contact'
import Profile from './users/pages/Profile'
import AdminHome from './admin/pages/AdminHome'
import AdminAllBooks from './admin/pages/AdminAllBooks'
import AdminCareers from './admin/pages/AdminCareers'
import AdminSettings from './admin/pages/AdminSettings'
import ViewBook from './users/pages/ViewBook'
import PaymentSuccess from './users/pages/PaymentSuccess'
import PaymentCancel from './users/pages/PaymentCancel'

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={isLoading ? <Preloader /> : <Home />} />
        <Route path="/login" element={<Auth hasAccount />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/career" element={<Career />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/view-book/:id" element={<ViewBook />} />
        <Route path="/admin-home" element={isLoading ? <Preloader /> : <AdminHome />} />
        <Route path="/admin-allbooks" element={<AdminAllBooks />} />
        <Route path="/admin-careers" element={<AdminCareers />} />
        <Route path="/admin-settings" element={<AdminSettings />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-error" element={<PaymentCancel />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
