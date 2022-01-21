import {React, useState} from 'react'
import styled from '@emotion/styled'

const Label = styled.label`
    color: #0D2235;
    display: block; //pasarlo a la siguiente linea
    font-family: 'calibri', sans-serif;
    font-size: 17px;
    font-weight: 700;
    margin: 5px;
`

const Select = styled.select`
    width: 100%;
    font-size: 15px;
    padding: 7px;
    border-radius: 5px;
`

const useSelectCoins = (label, options) => {

    const [state, setState] = useState('')

    const selectCoins = () => (
        <>
            <Label>{label}</Label>
            <Select
                value={state}
                onChange={e => setState(e.target.value)}
            >
                <option value=''>Select</option>
                {options.map(option => (
                    <option 
                        key={option.id}
                        value={option.id}
                    >{option.name}</option>
                ))}

            </Select>
        </>
    )

    return [state,  selectCoins]
}

export default useSelectCoins
