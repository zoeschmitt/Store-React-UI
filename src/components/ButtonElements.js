import { Link as LinkS } from 'react-scroll'
import styled from 'styled-components'

export const Button = styled(LinkS)`
    border-radius: 16px;
    background: #48adf5;
    white-space: nowrap;
    padding: ${({big}) => (big ? '14px 48px' : '12px 30px')};
    color: #fff;
    font-size: ${({fontBig}) => (fontBig ? '20px' : '16px')};
    outline: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: ${({primary}) => (primary ? '#E0E0E0' : '#48adf5')};
        color: ${({dark}) => (dark ? '#1b1b1b' : '#fff')};
    }
`