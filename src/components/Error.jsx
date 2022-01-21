import React from 'react'
import styled from '@emotion/styled'
import {AiFillCloseCircle} from 'react-icons/ai'

const Texto = styled.div`
    background-color: #ee2218;
    color: #FFF;
    padding: 7px;
    font-size: 15px;
    text-transform: uppercase;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    text-align: center;
    border-radius: 5px;
`

const Error = ({message}) => {
    return (
        <Texto>{message} <AiFillCloseCircle/> </Texto>
    )
}

export default Error
