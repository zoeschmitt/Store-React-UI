import styled from 'styled-components'
import { Link as LinkS } from 'react-scroll'

export const FooterContainer = styled.footer`
    background-color: #1b1b1b;
`;

export const FooterWrap = styled.div`
    padding: 48px 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    max-width: 1100px;
    margin: 0 auto;
`;

export const ContactInfoWrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

export const ContactLink = styled(LinkS)`
    color: #fff;
    text-decoration: none;
    margin-bottom: 0.5rem;
    font-size: 14px;
    padding: 10px;
    cursor: pointer;

    &:hover {
        color: #48adf5;
        transition: 0.3s ease-out;
    }
`;

export const NavLogo = styled(LinkS)`
    color: #fff;
    justify-self: flex-start;
    cursor: pointer;
    font-size: 2rem;
    display: flex;
    align-items: center;
    margin-left: 24px;
    font-weight: bold;
    text-decoration: none;
`;