import {React, useState, useEffect } from 'react'
import styled from '@emotion/styled'
import {AiFillCalculator} from 'react-icons/ai'
import Form from './components/Form'
import Result from './components/Result'
import Spinner from './components/Spinner'
import { generateId } from './helpers'
import {notification} from 'antd'
import 'antd/dist/antd.css';
import Buys from './components/Buys'

const Content = styled.div`
  max-width: 90%;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Heading = styled.h1`
  color: #FFF;
  text-align: center;
  font-family: 'Lato', sans-serif;
  font-size: 45px;
`

const Data = styled.div`
  background-color: #FFF;
  color: #0D2235;
  box-shadow: 5px 12px 15px -10px rgb(255, 255, 255);
  -webkit-box-shadow: 5px 12px 15px -10px rgb(255, 255, 255);
  -moz-box-shadow: 5px 12px 15px -10px rgb(255, 255, 255);
  background-color: #FFF;
  padding: 1rem;
  border-radius: 1.2rem;
  margin-bottom: 15px;
`

function App() {

  const [pairCoins, setPairCoins] = useState({})
  const [result, setResult] = useState({})
  const [loading, setLoading] = useState(false)

  const [currentPrice, setCurrentPrice] = useState({})
  const [buys, setBuys] = useState([])

  useEffect(() => {
    if(Object.keys(pairCoins).length > 0){

      const getPrice = async () => {
        setLoading(true)
        setResult({})
        const {coin, crypto, invest, profit} = pairCoins

        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${coin}`

        const answer = await fetch(url)
        const result = await answer.json()

        const actualValue = invest / result.RAW[crypto][coin].PRICE
        const futureValue = (invest + profit) / actualValue;

        const objectBuy = {
          id: generateId(),
          date: Date.now(),
          crypto: crypto,
          coin: coin,
          invest: invest,
          cryptoBuy: actualValue,
          profit: profit,
          price: result.RAW[crypto][coin].PRICE,
          imagen: result.DISPLAY[crypto][coin].IMAGEURL,
          future: futureValue
        }

        const {PRICE, HIGHDAY, LOWDAY, CHANGEDAY, LASTUPDATE, IMAGEURL} = result.DISPLAY[crypto][coin];

        const objectShow = {
          PRICE,
          HIGHDAY, 
          LOWDAY,
          CHANGEDAY, 
          LASTUPDATE,
          IMAGEURL,
          coin: coin,
          invest: invest,
          profit: profit,
          future: futureValue
        }

        setResult(objectShow);   
        setCurrentPrice(objectBuy)   
        setLoading(false)
      }
  
      getPrice();
    }

  }, [pairCoins])

  //Local storage
  useEffect(() => {
    const getLocalStorage = () => {
      const buysLS = JSON.parse(localStorage.getItem('buys')) ?? [];
      setBuys(buysLS)
    }

    getLocalStorage()
  }, [])

  //Set buys in local Storage
  useEffect(() => {
    localStorage.setItem('buys', JSON.stringify(buys));
  }, [buys])

  const makeBuy = () => {
    setBuys([...buys, currentPrice]);
    notification.success({
      message: 'Buy completed!',
      description: `Did you buy ${currentPrice.invest} ${currentPrice.coin} in ${currentPrice.crypto}`,
    });

    setCurrentPrice({})
    setResult({})  
  }

  //Delete purchases
  const deletePurcahse = (id) => {
    console.log(id);
    const buyUpdate = buys.filter(buy => buy.id !== id)
    setBuys(buyUpdate);
    console.log(buys);

    notification.success({
      message: 'Purchase Deleted!',
    });
  }

  return (
    <>
      <Heading>Crypto Calculator <AiFillCalculator /></Heading>    
      <Content>
        <Data>
          <Form
            setPairCoins={setPairCoins}
          />
        </Data>
        {loading && <Spinner/>}
        {result.PRICE && (
          <Result
            result={result}
            makeBuy={makeBuy}
          />
        )}
      </Content>
      <Buys
        buys={buys}
        deletePurcahse={deletePurcahse}
      />
    </>
  )
}

export default App
