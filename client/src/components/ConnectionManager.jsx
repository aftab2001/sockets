import React from 'react'
import { socket } from '../socket'

export const ConnectionManager = () => {
    const connect = ()=>{
        socket.connect()
    }
    const disconnect = ()=>{
        socket.disconnect();
    }
  return (
    <div>
        <button onClick={connect}>Connect</button>
        <button onClick={disconnect}>Disconnect</button>

    </div>
  )
}

