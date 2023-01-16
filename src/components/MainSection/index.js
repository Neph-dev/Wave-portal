import React from 'react'

import '../../styles/mainSectionStyles.css'
import { MdWavingHand } from 'react-icons/md'


const MainSection = ({ ...props }) => {

    const { wave, message, setMessage } = props

    return (
        <div id='mainSection'>
            <div style={{ width: '50%' }}>
                <div className='input-txn-container'>
                    <div className='input-txn-label'>Message</div>
                    <input
                        onChange={(e) => setMessage(e.target.value)}
                        name='message'
                        value={message}
                        className='input-txn'
                        style={{ color: '#a4c639' }}
                        maxLength={100}
                        placeholder='Type a message. It will be sent when you wave... 100 characters max' />
                </div>
                <div style={{ color: '#b2beb5', fontSize: 13 }}>
                    Wave at me and you might receive some ETH.
                </div>
                <div className='hexagon-container'>
                    <div className='hexagon' onClick={wave}>
                        <div className='wave-button'>
                            <MdWavingHand size={40} color='#964B00' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainSection