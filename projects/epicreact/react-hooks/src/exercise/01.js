// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

// I should go with the object syntax more often, and handle empty values better
// The solution
function Greeting(props) {
  const [name, setName] = React.useState(props.initialName)
  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" value={name} />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="friend"/>
}

export default App
