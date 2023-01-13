import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'

import './App.css'
import AOS from 'aos'
import 'aos/dist/aos.css'

import Header from './components/Header'
import MainSection from './components/MainSection'
import abi from './utils/WavePortal.json'


const getEthereumObject = () => window.ethereum

const findMetamaskWallet = async () => {
  const ethereum = getEthereumObject()

  if (!ethereum) {
    alert('Make sure that metamask is installed.')
    return null
  }

  const accounts = await ethereum.request({ method: 'eth_accounts' })
  const account = accounts[0]
  if (account.length > 0) {
    return account
  }
  else {
    console.log('No account found.')
    return null
  }
}

const App = () => {

  const [curentAccount, setCurentAccount] = useState()
  const [totalWaves, setTotalWaves] = useState()
  const [hash, setHash] = useState()
  const [isWaving, setIsWaving] = useState(false)

  const contractABI = abi.abi
  const contractAddress = '0x06034086AcFD579d47cB49Ba54d7003ff9440002'

  const getTotalWavesCount = async () => {
    const ethereum = getEthereumObject()

    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer)

    let count = await wavePortalContract.getTotalWaves()
    setTotalWaves(count.toNumber())
  }

  useEffect(() => {
    AOS.init({ duration: 2000 })
  })

  useEffect(() => {
    getTotalWavesCount()
    findMetamaskWallet()
      .then((account) => {
        if (account !== null) {
          setCurentAccount(account)
        }
      })
    // eslint-disable-next-line
  }, [])

  const connectWallet = async () => {
    try {
      const ethereum = getEthereumObject()

      if (!ethereum) {
        alert('Please install Metamask')
        return
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      const account = accounts[0]
      setCurentAccount(account)
    }
    catch (err) {
      console.log(err)
      return null
    }
  }

  const wave = async () => {
    try {
      const { ethereum } = window

      if (ethereum) {
        setIsWaving(true)
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer)

        let count = await wavePortalContract.getTotalWaves()
        console.log('Retrieved total wave count...', count.toNumber())

        const waveTxn = await wavePortalContract.waves()
        console.log('Mining...', waveTxn.hash)
        setHash(waveTxn.hash)

        await waveTxn.wait()
        console.log("Mined -- ", waveTxn.hash)

        count = await wavePortalContract.getTotalWaves()
        console.log("Retrieved total wave count...", count.toNumber())
        setTotalWaves(count.toNumber())
        setIsWaving(false)
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error)
      setIsWaving(false)
    }
  }

  return (
    <div className="App">

      <Header
        isWaving={isWaving}
        totalWaves={totalWaves}
        curentAccount={curentAccount}
        connectWallet={connectWallet} />

      <section className='main-upper-section'>
        <>
          <div className='wave-address'>
            {curentAccount === null || curentAccount === undefined ?
              'Hey Stranger!'
              : `Hey ${curentAccount}`}
          </div>
          <div className='wave-text'>
            I'm Neph, I make Web3 apps. Cool right ?! <br />
            Well, connect your wallet and wave at me.
          </div>
        </>

        <MainSection wave={wave} />

        {hash &&
          <div
            data-aos="fade-right"
            className='hash-container'>
            <a
              href={'https://goerli.etherscan.io/tx/' + hash}
              target='_blank'
              rel='noreferrer'
              className='hash'>
              # 0x733e3a154c64dbe8516486c04dcc484094ea002cd99af2f7caa2bc83adf7c9a5
            </a>
          </div>
        }
      </section>
    </div>
  )
}

export default App
