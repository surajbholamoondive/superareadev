import React, { createContext, useContext, useMemo } from 'react'
import { io } from 'socket.io-client'

const SocketContext = createContext(null)

export const useSocket = () => {
  const socket = useContext(SocketContext)
  return socket
}

export const SocketProvider = (props) => {
  const socket = useMemo(
    () => io(process.env.NEXT_PUBLIC_BACKEND_API, { path: '/api/v1/socket' }),
    []
  )
  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  )
}