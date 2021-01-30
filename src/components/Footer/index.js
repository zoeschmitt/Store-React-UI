import React from 'react'
import { FooterContainer, NavLogo, ContactLink, ContactInfoWrap, FooterWrap } from './FooterElements'
import { animateScroll as scroll } from 'react-scroll';

const Footer = () => {
    const toggleHome = () => {
        scroll.scrollToTop();
    };
    return (
        <FooterContainer>
            <FooterWrap>
                <NavLogo to='/' onClick={toggleHome}>Z</NavLogo>
                <ContactInfoWrap>
                    <ContactLink as="a" target="_blank" href="mailto:zoeschmitt@hotmail.com">Email</ContactLink>
                    <ContactLink as="a" target="_blank" href="https://www.linkedin.com/in/zmschmitt/">LinkedIn</ContactLink>
                    <ContactLink as="a" target="_blank" href="https://github.com/zoeschmitt">Github</ContactLink>
                </ContactInfoWrap>
            </FooterWrap>
        </FooterContainer>
    )
}

export default Footer
