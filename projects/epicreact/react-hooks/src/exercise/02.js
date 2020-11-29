// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(key, initial) {
  function getFromLocalStorage() {
    const value = window.localStorage.getItem(key)
    // I wasn't sure how serialize/deserialize should work so I peaked at
    // the answer.
    if (value) {
      try {
        return JSON.parse(value)
      } catch (e) {
        localStorage.removeItem(key)
      }
    }
    return initial
  }

  // Oh, I didn't even think about removing the old key...
  // That's bad...

  const [value, setValue] = React.useState(getFromLocalStorage)
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, initial, value])

  return [value, setValue]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)
  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}


function App() {
  return <Greeting initialName="Sam Sepiol" />
}

export default App
