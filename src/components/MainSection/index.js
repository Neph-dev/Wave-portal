import React from 'react'

import '../../styles/mainSectionStyles.css'
import { MdWavingHand } from 'react-icons/md'


const MainSection = ({ ...props }) => {

    const { wave, setMessage } = props

    return (
        <div id='mainSection'>
            <div style={{ width: '50%' }}>
                <div className='input-txn-container'>
                    <div className='input-txn-label'>Message</div>
                    <input
                        onChange={(e) => setMessage(e.target.value)}
                        name='message'
                        className='input-txn'
                        style={{ color: '#a4c639' }}
                        maxLength={100}
                        placeholder='Keep it short... 100 characters max' />
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