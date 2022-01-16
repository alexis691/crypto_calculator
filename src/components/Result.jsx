import styled from "@emotion/styled"
import {formatQuantity, dateFormat} from '../helpers'

const Container = styled.div`
    background-color: #FFF;
    color: #0D2235;
    box-shadow: 5px 12px 15px -10px rgb(255, 255, 255);
    -webkit-box-shadow: 5px 12px 15px -10px rgb(255, 255, 255);
    -moz-box-shadow: 5px 12px 15px -10px rgb(255, 255, 255);
    background-color: #FFF;
    border-radius: 1.2rem;
    font-family: 'Lato', sans-serif;
    display: flex;
    align-items: center;
    gap: 4rem;
    padding: 20px;
    margin-bottom: 15px;
`

const Imagen = styled.img`
    display: block;
    width: 110px;
`

const Price = styled.p`
    font-size: 25px;
    span{
        font-weight: 700;
    }
`

const Text = styled.p`
    font-size: 20px;
    span{
        font-weight: 700;
    }
`

const TextFuture = styled.p`
    font-size: 25px;
    color: #2578DC;
    font-weight: 600;
    span{
        font-weight: 700;
    }
`

const Buy = styled.input`
    background-color: #27d810;
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
        background-color: #3fec28;
        cursor: pointer;
    }
`

const Result = ({result, makeBuy}) => {

    const {PRICE, HIGHDAY, LOWDAY, CHANGEDAY, LASTUPDATE, IMAGEURL, coin, invest, profit, future} = result

    const handleBuy = () => {
        const answer = confirm(`Do you want buy with the pricie of: ${PRICE}`);

        if(answer){
            makeBuy();
        }
    }

    return (
        <Container>
            <Imagen
                src={`https://cryptocompare.com/${IMAGEURL}`}
                alt="Crypto Imagen"
            />
            <div>
                <Price>Price: <span>{PRICE}</span></Price>
                <Text>Highest day price: <span>{HIGHDAY}</span></Text>
                <Text>Lowest day price: <span>{LOWDAY}</span></Text>
                <Text>Change day: <span>{CHANGEDAY}</span></Text>
                <Text>Last Update: <span>{LASTUPDATE}</span></Text>
                <Text>Invest: <span>{formatQuantity(invest, coin)}</span></Text>
                <Text>Profit expected: <span>{formatQuantity(profit, coin)}</span></Text>
                <TextFuture>Price to reach: <span>{formatQuantity(future, coin)}</span></TextFuture>
                <Buy
                    type="button"
                    value="Buy"
                    onClick={handleBuy}
                />
            </div>
        </Container>
    )
}

export default Result
