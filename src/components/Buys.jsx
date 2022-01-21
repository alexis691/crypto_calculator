import Buy from './Buy'
import styled from '@emotion/styled'

const Content = styled.div`
    max-width: 90%;
    margin: 0 auto;
`

const Title = styled.h1`
    color: #FFF;
    font-size: 35px;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    text-align: center;
    width: 100%;
    padding-top: 15px;
`

const Buys = ({buys, deletePurcahse}) => {

    return (
        <Content>
            <Title>{buys.length > 0 ? `Your Purchases` : `You don't have Purchases yet` }</Title>
            {buys.map(buy => (
                <Buy
                    key={buy.id}
                    buy={buy}
                    deletePurcahse={deletePurcahse}
                />
            ))}
            <div><br></br>.</div>
        </Content>
    )
}

export default Buys
