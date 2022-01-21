import styled from "@emotion/styled"
import {formatQuantity} from '../helpers'
import {Modal as ModalAntd} from 'antd';
import {DollarCircleOutlined} from '@ant-design/icons'

const {confirm} = ModalAntd;

const Container = styled.div`
    background-color: #FFF;
    color: #0D2235;
    box-shadow: 5px 12px 15px -10px rgb(255, 255, 255);
    -webkit-box-shadow: 5px 12px 15px -10px rgb(255, 255, 255);
    -moz-box-shadow: 5px 12px 15px -10px rgb(255, 255, 255);
    background-color: #FFF;
    border-radius: 1.2rem;
    font-family: 'calibri', sans-serif;
    display: flex;
    align-items: center;
    gap: 4rem;
    padding: 15px;
    margin-bottom: 15px;
`

const Imagen = styled.img`
    margin-left: 10px;
    width: 100px;
`

const Price = styled.p`
    font-size: 22px;
    span{
        font-weight: 700;
    }
`

const Text = styled.p`
    font-size: 15px;
    span{
        font-weight: 700;
    }
`

const TextFuture = styled.p`
    font-size: 22px;
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
    padding: 5px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3 ease;

    &:hover{
        background-color: #3fec28;
        cursor: pointer;
    }
`

const Result = ({result, makeBuy}) => {

    const {PRICE, HIGHDAY, LOWDAY, CHANGEDAY, IMAGEURL, coin, invest, profit, future} = result

    const handleBuy = () => {
        confirm({
            title: `Do you want buy ${formatQuantity(invest, coin)} ?`,
            content: `Current Price: ${formatQuantity(PRICE, coin)}`,
            icon: <DollarCircleOutlined style={{ fontSize: '23px', color: '#2ee72e' }}/>,
            okText: "Buy",
            cancelText: "Cancel",
            onOk() {
                makeBuy();
            }
        })
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
