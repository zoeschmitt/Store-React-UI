import React, {useState} from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import HeroSection from '../components/HeroSection'
import AuthPage from '../components/AuthPage'

const Home = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [jwt, setJWT] = useState('')
    const [userId, setUserId] = useState('')
    const [cartId, setCartId] = useState('')
    const toggleSideBar = () => {
        setIsOpen(!isOpen)
    }
    const toggleLoggedIn = (loggedInState) => {
        setIsLoggedIn(loggedInState)
    }
    const setNewJWT = (newJWT) => {
        setJWT(newJWT)
    }
    const setNewCartId = (newCartId) => {
        setCartId(newCartId)
    }
    const setNewUserId = (newUserId) => {
        setUserId(newUserId)
    }
    if (isLoggedIn) {
        return (
            <>
                <SideBar isOpen={isOpen} toggle={toggleSideBar} isLoggedIn={isLoggedIn}/>
                <NavBar toggle={toggleSideBar} isLoggedIn={isLoggedIn}/>
                <HeroSection jwt={jwt} userId={userId} cartId={cartId}/>
            </>
        )
    } else {
        return (
            <>
                <SideBar isOpen={isOpen} toggle={toggleSideBar} isLoggedIn={isLoggedIn}/>
                <NavBar toggle={toggleSideBar} isLoggedIn={isLoggedIn}/>
                <AuthPage toggleLoggedIn={toggleLoggedIn} setNewJWT={setNewJWT} setNewUserId={setNewUserId} setNewCartId={setNewCartId}/>
            </>
        )
    }
}

export default Home
