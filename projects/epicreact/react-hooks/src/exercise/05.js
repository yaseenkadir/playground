// useRef and useEffect: DOM interaction
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react'
// eslint-disable-next-line no-unused-vars
import VanillaTilt from 'vanilla-tilt'

function Tilt({children}) {
  const tiltRef = React.useRef()

  React.useEffect(() => {
    const tiltNode = tiltRef.current
    VanillaTilt.init(tiltNode, {
      max: 25,
      speed: 100,
      glare: true,
      'max-glare': 0.1,
    })
    return () => {
      tiltNode.vanillaTilt.destroy()
    }
  },
    // Because of the tilt effect does not change depending on state we don't
    // pass any deps because that could trigger a re-render when the state
    // changes. We explicitly pass an empty deps list so that React knows it
    // only needs to apply on mount and unmount.
    [])

  return (
    <div className="tilt-root" ref={tiltRef}>
      <div className="tilt-child">{children}</div>
    </div>
  )
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}

export default App
