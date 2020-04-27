import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import image from './cryptomonedas.png';
import axios from 'axios'

import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

const Container = styled.div`
  max-width:900px;
  margin: 0 auto;
  @media (min-width:992px){
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Image = styled.img`
  max-width:100%;
  margin-top:5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color:#fff;
  text-align: center;
  font-weight:bold;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top:80px;
  &::after{
    content:'';
    width:150px;
    height:6px;
    background-color: #66A2FE;
    display:block;
  }
`;

function App() {

  const [moneda, setMoneda] = useState('');
  const [cripto, setCripto] = useState('');
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
      const cotizarCriptoMoneda = async () =>{
        if(moneda === '') return;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;
        const res = await axios.get(url);

        setCargando(true);

        setTimeout(()=>{
          setCargando(false);
          setResultado(res.data.DISPLAY[cripto][moneda])
        },2500)
      }
      cotizarCriptoMoneda()
  }, [moneda, cripto]);

  const componente = (cargando) ? <Spinner/> :  <Cotizacion resultado={resultado}/>

  return (
   <Container>
     <div>
        <Image
          src={image}
          alt="crypto"
        />
     </div>
     <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario
          setMoneda={setMoneda}
          setCripto={setCripto}
        />

        {componente}
     </div>
   </Container>
  );
}

export default App;
