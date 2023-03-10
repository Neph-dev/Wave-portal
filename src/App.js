import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'

import './App.css'
import AOS from 'aos'
import 'aos/dist/aos.css'

import Header from './components/Header'
import MainSection from './components/MainSection'
import abi from './utils/WavePortal.json'
import TxnHistory from './components/TxnHistory'
import { TextAbstract } from './utils/textAbstract'
import Card from './components/Card'
import HashMessage from './components/HashMessage'


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
  const [allWaves, setAllWaves] = useState([])
  const [hash, setHash] = useState()
  const [isWaving, setIsWaving] = useState(false)
  const [message, setMessage] = useState('')

  const contractABI = abi.abi
  const contractAddress = '0xf98921bC4b2Cf26f510651d3C3934239E4D0Bfd4'

  const getTotalWavesCount = async () => {
    const ethereum = getEthereumObject()
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer)

    let count = await wavePortalContract.getTotalWaves()
    setTotalWaves(count.toNumber())
  }

  const getAllWaves = async () => {

    const ethereum = getEthereumObject()
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer)

    let waves = await wavePortalContract.getAllWaves()

    let wavesCleaned = []
    waves.forEach(wave => {
      wavesCleaned.push({
        address: wave.waver,
        timestamp: new Date(wave.timestamp * 1000),
        message: wave.message
      })
    })
    setAllWaves(wavesCleaned)
  }

  useEffect(() => {
    AOS.init({ duration: 2000 })
  })

  useEffect(() => {
    getTotalWavesCount()
    getAllWaves()
    findMetamaskWallet()
      .then((account) => {
        if (account !== null) {
          setCurentAccount(account)
        }
      })

    let wavePortalContract

    const onNewWave = (from, timestamp, message) => {
      console.log("NewWave", from, timestamp, message)
      setAllWaves(prevState => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message: message,
        },
      ])
    }

    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()

      wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer)
      wavePortalContract.on("NewWave", onNewWave)
    }

    return () => {
      if (wavePortalContract) {
        wavePortalContract.off("NewWave", onNewWave)
      }
    }
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
      window.location.reload(false)
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

        const waveTxn = await wavePortalContract.wave(message, { gasLimit: 300000 })
        console.log('Mining...', waveTxn.hash)
        setHash(waveTxn.hash)

        await waveTxn.wait()
        console.log("Mined -- ", waveTxn.hash)

        count = await wavePortalContract.getTotalWaves()
        console.log("Retrieved total wave count...", count.toNumber())

        setTotalWaves(count.toNumber())
        setMessage('')
        setIsWaving(false)
        setTimeout(() => {
          setHash()
        }, 4000)
      } else {
        console.log("Ethereum object doesn't exist!")
        setTimeout(() => {
          setHash()
        }, 4000)
      }
    } catch (error) {
      console.log(error)
      setIsWaving(false)
      setTimeout(() => {
        setHash()
      }, 4000)
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
        <Card
          TextAbstract={TextAbstract}
          curentAccount={curentAccount} />

        <MainSection
          message={message}
          setMessage={setMessage}
          wave={wave} />

        {hash && <HashMessage hash={hash} />}
      </section>

      <TxnHistory allWaves={allWaves} />

      <div className='medium-separator' />
    </div>
  )
}

export default App
