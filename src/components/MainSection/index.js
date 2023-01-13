import React from 'react'

import '../../styles/mainSectionStyles.css'
import { MdWavingHand } from 'react-icons/md'


const MainSection = ({ ...props }) => {

    const { wave } = props

    return (
        <div id='mainSection'>
            <div className='hexagon' onClick={wave}>
                <div className='wave-button'>
                    <MdWavingHand size={40} color='#964B00' />
                </div>
            </div>
        </div>
    )
}

export default MainSection