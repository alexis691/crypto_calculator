import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import {AiFillCalculator} from 'react-icons/ai'
import Form from './components/Form'
import Result from './components/Result'
import Spinner from './components/Spinner'

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

  useEffect(() => {
    if(Object.keys(pairCoins).length > 0){

      const getPrice = async () => {
        setLoading(true)
        setResult({})
        const {coin, crypto} = pairCoins

        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${coin}`

        const answer = await fetch(url)
        const result = await answer.json()

        setResult(result.DISPLAY[crypto][coin]);      
        setLoading(false)
      }
  
      getPrice();
    }

  }, [pairCoins])

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
          />
        )}
      </Content>
    </>
  )
}

export default App
