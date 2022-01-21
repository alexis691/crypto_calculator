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
    font-size: 15px;
    border-radius: 5px;
    transition: background-color .3 ease;
    margin-top: 15px;

    &:hover{
        background-color: #092642;
        cursor: pointer;
    }
`

const Label = styled.label`
    color: #0D2235;
    display: block; //pasarlo a la siguiente linea
    font-family: 'Calibri', sans-serif;
    font-size: 17px;
    font-weight: 700;
    margin: 5px;
`

const Input = styled.input`
    width: 100%;
    font-size: 15px;
    padding: 7px;
    border-radius: 5px;
`

const Form = ({setPairCoins}) => {

    const [error, setError] = useState(false)

    //Calling to personalize hook
    const [coin, SelectCoin] = useSelectCoins('Select a coin', coins)
    const [crypto, SelectCrypto] = useSelectCoins('Select a crypto', cryptoCoins)

    const [invest, setInvest] = useState('')
    const [profit, setProfit] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if([coin, crypto, invest, profit].includes('')){
            setError(true);
            return
        }

        setError(false);
        setPairCoins({coin, crypto, invest, profit});

        setInvest('')
        setProfit('')
    }

    return (
        <>
            {error && <Error message='All fields are required' />}
            <form
                onSubmit={handleSubmit}
            >
                <SelectCoin/>
                <SelectCrypto/>
                
                <Label>Investment</Label>
                <Input
                    id='invest'
                    type='number'
                    placeholder='$'
                    value={invest}
                    onChange={e => setInvest(Number(e.target.value))}
                />
                <Label>Profit Expected</Label>
                <Input
                    id='profit'
                    type='number'
                    placeholder='$'
                    value={profit}
                    onChange={e => setProfit(Number(e.target.value))}
                />

                <InputSubmit
                    type='submit'
                    value='Show Data'
                />
            </form>
        </>
    )
}

export default Form
