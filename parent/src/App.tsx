import React, { useState, useRef, useEffect } from 'react'

function App() {
  const iframeRef = useRef()
  const [receivedMessage, setReceivedMessage] = useState('')

  useEffect(() => {
    const listener = window.addEventListener('message', (event) => {
      console.log('event = ', event)
      if (event.data.type === 'child') {
        setReceivedMessage(event.data.data)
        console.log('event.data.data = ', event.data.data)
      }
    })

    return () => {
      iframeRef.current?.contentWindow.removeEventListener('message', listener)
    }
  }, [])

  return (
    <div className="container flex justify-center items-center gap-3">
      <div className="counter flex justify-center items-center">
        <div style={{ width: '300px', height: '200px', border: '1px solid red' }}>
          <h1>Parent</h1>
          <div>{receivedMessage}</div>
          <button
            onClick={() => {
              iframeRef.current?.contentWindow?.postMessage(
                {
                  type: 'parent',
                  data: 'Hello from parent ' + Math.random(),
                },
                '*',
              )
            }}
          >
            send
          </button>
        </div>
      </div>

      <iframe ref={iframeRef} src={'http://localhost:3000'} width={'600px'}></iframe>
    </div>
  )
}

export default App
