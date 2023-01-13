import React from 'react'
import owl from '../../assets/owl.jpg'
import '../../styles/headerStyles.css'
// import { FaPowerOff } from 'react-icons/fa'


const Header = ({ ...props }) => {

    const { connectWallet, curentAccount, totalWaves, isWaving } = props

    return (
        <div id='header'>
            <div className='header-container'>
                <img
                    src={owl}
                    alt='avatar'
                    className='header-avatar' />
                <div className='header-username'>Total Waves: 0{totalWaves}</div>
                {isWaving && <div className='txn-sending'>Sending</div>}
            </div>
            <div>
                {curentAccount === null || curentAccount === undefined ?
                    <button onClick={connectWallet} className='connect-btn'>
                        <div className='btn-label'>Connect</div>
                    </button>
                    : []
                }
                {/* <FaPowerOff
                    onClick={() => { }}
                    size={25}
                    color={'#fff'}
                    className='header-logoff' /> */}
            </div>
        </div>
    )
}

export default Header