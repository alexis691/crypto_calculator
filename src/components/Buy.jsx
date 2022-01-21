import {React, useState, useEffect} from 'react'
import styled from '@emotion/styled'
import {Skeleton } from 'antd';
import { formatQuantity, dateFormat } from '../helpers'
import { PresetColorTypes } from 'antd/lib/_util/colors';

const Content = styled.div`
    background-color: #FFF;
    color: #0D2235;
    box-shadow: 5px 12px 15px -10px rgb(255, 255, 255);
    -webkit-box-shadow: 5px 12px 15px -10px rgb(255, 255, 255);
    -moz-box-shadow: 5px 12px 15px -10px rgb(255, 255, 255);
    background-color: #FFF;
    padding: 1rem;
    border-radius: 1.2rem;
    margin: 2%;

    @media (min-width: 768px) {
        float:left;
        width: 46%;
    }
    @media (max-width: 768px) {
        margin: 2%;
    }
    
`

const Imagen = styled.img`
    width: 80px;
    margin-left: 25%;
    padding-bottom: 12px;
`

const Delete = styled.input`
    background-color: #0D2235;
    border: none;
    width: 40%;
    padding: 7px;
    margin-left: 30%;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 15px;
    border-radius: 5px;
    transition: background-color .3 ease;

    &:hover{
        background-color: #092642;
        cursor: pointer;
    }
`

const PriceBuy = styled.p`
    font-size: 19px;
    color: '#0D2235';
    font-weight: 700;
`

const TextData = styled.p`
    font-size: 16px;
    color: '#0D2235';
    font-weight: 500;
`

const TextDate = styled.p`
    font-size: 13px;
    color: gray;
    font-weight: 500;
    text-align: right;
    margin-right: 4%;
`

const Table = styled.table`
    width: 100%;
    margin: 5px;
    tr{
        td{
            width: 50%;
        }
    }
`
const Profit = styled.div`
    font-size: 25px;
    color: ${props => props.calcProfit > 0? props.calcProfit > props.profit?  '#4d58ec' : '#57df45' : '#ee3434'};
    font-weight: 700;
`

const Buy = ({buy, deletePurcahse}) => {

    const {id, imagen, invest, cryptoBuy, price, profit, future, date, coin, crypto} = buy
    const [loading, setLoading] = useState(true);
    const [currentPrice, setCurrentPrice] = useState('');
    const [calcProfit, setCalProfit] = useState('');
    
    useEffect(() => {
        const getCurrentPrice = async () => {
            const url = `https://min-api.cryptocompare.com/data/price?fsym=${crypto}&tsyms=${coin}`

            const answer = await fetch(url)
            const result = await answer.json()

            const profit = (cryptoBuy * result[coin]) - invest;

            setCalProfit(profit)
            setCurrentPrice(result[coin])
            setLoading(false)
        }

        getCurrentPrice();
      }, [])
   

    //Delete Crypto
    const handleDelete = () => {
        const answer = confirm(`Do you want to delete this purchase?`);

        if(answer){
            deletePurcahse(id);
        }
    }

    return (
        <>
        {loading? (
            <Skeleton active avatar />
        ):(
            <Content>
            
                <Table>
                    <tbody>
                        <tr>
                            <td>
                                <Imagen
                                    src={`https://cryptocompare.com/${imagen}`}
                                    alt="Crypto Imagen"
                                />
                            </td>
                            <td><PriceBuy>Purchase: {formatQuantity(invest, coin)} = {`${cryptoBuy.toFixed(10)} ${crypto}`}</PriceBuy></td>
                        </tr>
                        <tr>
                            <td><TextData>Purchase price: {formatQuantity(price, coin)}</TextData></td>
                            <td><TextData>Current Price: {formatQuantity(currentPrice, coin)}</TextData></td>
                        </tr>
                        <tr>
                            <td><TextData>Profit expected: {formatQuantity(profit, coin)}</TextData></td>
                            <td><TextData>Price to reach: {formatQuantity(future, coin)}</TextData></td>
                        </tr>
                        <tr>
                            <td colSpan={2}><Profit calcProfit={calcProfit} profit={profit}>Profit: {formatQuantity(calcProfit, coin)}</Profit></td>
                        </tr>
                        <tr>
                            <td colSpan={2}><TextDate>Date: {dateFormat(date)}</TextDate></td>
                        </tr>
                    </tbody>                       
                </Table>                                                        
                <Delete
                    type='button'
                    value='Delete'
                    onClick={handleDelete}
                />
            </Content>
        )}
        </>
    )
}

export default Buy
