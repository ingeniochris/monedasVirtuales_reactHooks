import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const Msg = styled.p`
    background-color: #b7233c;
    padding: 1rem;
    color: #fff;
    font-size: 30px;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    font-family: 'Bebas Neue', cursive;
`;

const Error = ({message}) => {
    return(
    <Msg>{message}</Msg>
    );
};

Error.propTypes = {
    message: PropTypes.string.isRequired
}


export default Error;
