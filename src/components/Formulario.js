import React, {useState,useEffect} from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import Error from './Error';
import PropTypes from 'prop-types'

import useMonedas from '../hooks/useMonedas';
import useCriptomoneda from '../hooks/useCriptomoneda';

const Button = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    background-color: #66a2fe;
    text-align: center;
    transition: background-color .3s ease;

    &:hover{
        background-color:#326ac0;
        cursor:pointer;
    }
`;

const Formulario = ({setMoneda, setCripto}) =>{

    const [listaCripto, setListacripto] = useState([]);

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
        { codigo: 'MXN', nombre: 'Peso Mexicano' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' }
    ];

    const [SelectMoneda , moneda] = useMonedas('Elige tu moneda', '', MONEDAS);
    const [SelectCripto, cripto] = useCriptomoneda('Elige tu criptomoneda', '', listaCripto );
    const [error, setError] = useState(false);

useEffect(()=>{
    const consultaApi = async () => {
        const URL = process.env.REACT_APP_URL;
        const resultado = await axios.get(URL);
        setListacripto(resultado.data.Data);
    }
    consultaApi()
},[]);

const cotizarMoneda= e =>{
    e.preventDefault();

    if(moneda === '' || cripto === '') {
        setError(true);
        return;
    }

    setError(false)
    setMoneda(moneda);
    setCripto(cripto);
    
}

    return(
        <form
            onSubmit={cotizarMoneda}
        >
         {error ? <Error message='Todos los campos son obligatorios'/> : null}   
            <SelectMoneda/>
            <SelectCripto/>
            <Button
                type="submit"
                value="Calcular"
            />
            
        </form>
    );
}

Formulario.propTypes={
    setMoneda: PropTypes.func.isRequired,
    setCripto: PropTypes.func.isRequired
}

export default Formulario;