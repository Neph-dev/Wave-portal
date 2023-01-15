import React from 'react'
import copy from 'copy-to-clipboard'

import { TextAbstract } from '../../utils/textAbstract'

import { FiCopy } from 'react-icons/fi'
import '../../styles/txnHistoryStyles.css'


const TxnHistory = ({ ...props }) => {

    const { allWaves } = props
    // const goerliEtherscan_BaseURL = 'https://goerli.etherscan.io/tx/'

    return (
        <section id='TxnHistory'>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <div className='txn-title'>Transaction History</div>
            </div>

            <div className='small-separator' />

            <div className='trx-history-ele-container-title'>
                <div className='trx-history-ele-title'>Waver</div>
                <div className='trx-history-ele-title'>Message</div>
                <div className='trx-history-ele-title'>Timestamp</div>
                <div style={{ width: '5%' }}></div>
            </div>
            {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <div className='txn-sending'> Loading...</div>
            </div> */}
            {allWaves?.map((wave, index) => (
                <div key={index} className='trx-history-ele-container'>
                    <div className='trx-history-ele'>
                        {TextAbstract(wave?.address, 20)}
                        <FiCopy
                            className='copy-icon'
                            onClick={() => copy(wave?.address)}
                            size={20}
                            color='#fff' />
                    </div>
                    <div className='trx-history-ele'>
                        {TextAbstract(wave?.message, 20)}
                        <FiCopy
                            className='copy-icon'
                            onClick={() => copy(wave?.message)}
                            size={20}
                            color='#fff' />
                    </div>
                    <div className='trx-history-ele'>
                        {TextAbstract(wave?.timestamp.toString(), 20)}
                        <FiCopy
                            className='copy-icon'
                            onClick={() => copy(wave?.timestamp.toString())}
                            size={20}
                            color='#fff' />
                    </div>
                </div>
            ))}
        </section>
    )
}

export default TxnHistory