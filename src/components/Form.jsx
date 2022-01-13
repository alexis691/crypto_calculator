import {React, useState} from 'react'
import Error from './Error'
import useSelectCoins from '../hooks/useSelectCoins'
import {coins, cryptoCoins} from '../data/coins'
import styled from '@emotion/styled'

const InputSubmit = styled.input`
    background-color: #0D2235;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3 ease;
    margin-top: 30px;

    &:hover{
        background-color: #092642;
        cursor: pointer;
    }
`

const Form = ({setPairCoins}) => {

    const [error, setError] = useState(false)

    //Calling to personalize hook
    const [coin, SelectCoin] = useSelectCoins('Select a coin', coins)
    const [crypto, SelectCrypto] = useSelectCoins('Select a crypto', cryptoCoins)

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if([coin, crypto].includes('')){
            setError(true);
            return
        }

        setError(false);
        setPairCoins({coin, crypto});

    }

    return (
        <>
            {error && <Error message='All fields are required' />}
            <form
                onSubmit={handleSubmit}
            >
                <SelectCoin/>
                <SelectCrypto/>

                <InputSubmit
                    type='submit'
                    value='Show Data'
                />
            </form>
        </>
    )
}

export default Form
