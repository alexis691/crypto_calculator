import {React, useState, useEffect} from 'react'
import styled from '@emotion/styled'
import {Skeleton, Modal as ModalAntd} from 'antd';
import { formatQuantity, dateFormat } from '../helpers'
import {DeleteOutlined} from '@ant-design/icons'

const {confirm} = ModalAntd;

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
    width: 90px;
    margin-left: 25%;
    padding-bottom: 12px;
`

const Delete = styled.input`
    background-color: #0D2235;
    border: none;
    width: 92%;
    padding: 7px;
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

const PriceBuy = styled.h1`
    font-size: 19px;
    color: '#0D2235';
    font-weight: 700;
`

const TextData = styled.h1`
    font-size: 17px;
    color: '#0D2235';
    font-weight: 500;
`

const TextDate = styled.p`
    font-size: 12px;
    color: gray;
    font-weight: 500;
`

const Table = styled.table`
    width: 100%;
    margin: 5px;
    tr{
        td{
            width: 50%;
            padding-left: 5%;
        }
    }
`
const Profit = styled.div`
    font-size: 21px;
    color: white;
    font-weight: 700;
    background-color: ${props => props.calcProfit > 0? props.calcProfit > props.profit?  '#4d58ec' : '#57df45' : '#ee3434'};
    border-radius: 5px;
    padding: 2px;
    text-align: center;
    width: 92%;
`

const Data = styled.p`
    font-size: 13px;
    color: gray;
    font-weight: 500;

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
        confirm({
            title: "Do you want to delete this purchase?",
            content: `${formatQuantity(invest, coin)}`,
            icon: <DeleteOutlined  style={{ fontSize: '23px', color: '#f13b3b' }}/>,
            okText: "Delete",
            okType: "danger",
            cancelText: "Cancel",
            onOk() {
                deletePurcahse(id);
            }
        })
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
                            <td><PriceBuy>{formatQuantity(invest, coin)} <br/>{`${crypto} ${cryptoBuy.toFixed(10)}`}<br/><TextDate>{dateFormat(date)}</TextDate></PriceBuy></td>
                        </tr>
                        <tr>
                            <td><TextData>{formatQuantity(price, coin)}<Data>Purchase Price</Data></TextData></td>
                            <td><TextData>{formatQuantity(currentPrice, coin)}<Data>Current Price </Data></TextData></td>
                        </tr>
                        <tr>
                            <td><TextData>{formatQuantity(profit, coin)}<Data>Profit Expected</Data></TextData></td>
                            <td><TextData>{formatQuantity(future, coin)}<Data>Price to Reach</Data></TextData></td>
                        </tr>
                        <tr>
                            <td><Profit calcProfit={calcProfit} profit={profit}>Profit: {formatQuantity(calcProfit, coin)}</Profit></td>
                            <td><Delete
                                    type='button'
                                    value='Delete'
                                    onClick={handleDelete}
                                />
                            </td>
                        </tr>
                    </tbody>                       
                </Table>                                                        
             
            </Content>
        )}
        </>
    )
}

export default Buy
