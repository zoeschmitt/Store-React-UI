import styled from 'styled-components'
import {MdKeyboardArrowRight, MdArrowForward} from 'react-icons/md'

export const HeroContainer = styled.div`
    background: #fafafa;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
    height: 800px;
    position: relative;
    z-index: 1;

    :before {
        content: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%,
        rgba(0,0,0,0.6) 100%), linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 100%);
        z-index: 2;
    }

`;

export const HeroBg = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

export const VideoBg = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
    //background: #232a34;
`;

export const HeroContent = styled.div`
    z-index: 3;
    max-width: 1200px;
    position: absolute;
    padding: 8px 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const SearchWrapper = styled.div`
    display: flex;
    min-width: 210px;
    width: 360px;
    color: blue;
`;

export const SearchIcon = styled.div`
    width: 100%;
    height: 100%;
`;

export const SearchInput = styled.input`
    border: none;
    border-radius: 10px;
    width: 99%;
    padding: ${({big}) => (big ? '14px 48px' : '12px 30px')};
    background-color: rgba(255,255,255, 0.6);;

    &:hover, &:focus {
        outline: none;
        border: none;
        border-radius: 13px;
        background-color: white;
    }
`;

export const ClearIcon = styled.image`
    position: absolute;
    cursor: pointer;
    visibility: hidden;
`;

export const HeroBtnWrapper = styled.div`
    //margin-top: 32px;
    display: flex;
    //flex-direction:column;
    align-items: center;
`;

export const ArrowForward = styled(MdArrowForward)`
    margin-left: 8px;
    font-size: 20px;
`;

export const ArrowRight = styled(MdKeyboardArrowRight)`
    margin-left: 8px;
    font-size: 20px;
`;
