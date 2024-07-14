import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [receivedMessage, setReceivedMessage] = useState<string>('')
  useEffect(() => {
    const listener = window.addEventListener('message', (event) => {
      if (event?.data?.type === 'parent') {
        setReceivedMessage(event?.data.data)
      }
    })

    return () => {
      window.removeEventListener('message', listener)
    }
  }, [])

  return (
    <div>
      <h1>Child</h1>
      <div>{receivedMessage}</div>
      <button
        onClick={() => {
          window.parent.postMessage({ type: 'child', data: 'Hello from child ' + Math.random() }, '*')
        }}
      >
        send
      </button>
    </div>
  )
}

export default App
