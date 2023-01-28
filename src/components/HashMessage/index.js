import React from 'react'


const HashMessage = ({ ...props }) => {

    const goerliEtherscan_BaseURL = 'https://goerli.etherscan.io/tx/'

    const { hash } = props

    return (
        <div
            data-aos="fade-right"
            className='hash-container'>
            <a
                href={`${goerliEtherscan_BaseURL}${hash}`}
                target='_blank'
                rel='noreferrer'
                className='hash'>
                # {hash}
            </a>
        </div>
    )
}

export default HashMessage