import styled from "@emotion/styled"

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

const Result = ({result}) => {

    const {PRICE, HIGHDAY, LOWDAY, LASTUPDATE, IMAGEURL, CHANGEDAY} = result

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
                <Text>Las update: <span>{LASTUPDATE}</span></Text>
            </div>
        </Container>
    )
}

export default Result
