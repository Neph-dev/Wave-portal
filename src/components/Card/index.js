import React from 'react'

import { FaEthereum } from 'react-icons/fa'


const Card = ({ ...props }) => {

    return (
        <div
            data-aos="fade-right"
            className='txnSection-card'>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <FaEthereum className='FaEthereum' color={'#d3d3d3'} />
                <div
                    style={{ color: (props.curentAccount === undefined || props.curentAccount === null) && '#d3d3d3' }}
                    className='txnSection-card-account'>
                    {props.TextAbstract(props.curentAccount, 23)}
                    {(props.curentAccount === null || props.curentAccount === undefined) && '0x........................................'}
                </div>
                <div
                    title='Please make sure of using the Goerli testnet.'
                    className='txnSection-card-name'>
                    NETWORK_ <b>GOERLI TESTNET</b>
                </div>
            </div>
        </div>
    )
}

export default Card