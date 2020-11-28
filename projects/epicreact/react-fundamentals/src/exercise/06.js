// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

// Extra Credit 1
// Did not understand how to use ref without looking at the solution
// I get it now.

// function UsernameForm({onSubmitUsername}) {
//   const usernameRef = React.useRef()
//
//   function handleSubmit(event) {
//     console.log(usernameRef)
//     const username = usernameRef.current.value.trim();
//     onSubmitUsername(username);
//     event.preventDefault()
//   }
//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="username">Username:</label>
//         <input id="username" type="text" ref={usernameRef}/>
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   )
// }

// Extra Credit 2
// function UsernameForm({onSubmitUsername}) {
//
//   const [errorState, setState] = React.useState(null);
//
//   function handleSubmit(event) {
//     const username = event.target.elements.username.value.trim();
//     onSubmitUsername(username);
//     event.preventDefault()
//   }
//
//   function handleChange(e) {
//     const username = e.target.value.trim();
//     if (username !== username.toLowerCase()) {
//       setState('Username must be lowercase')
//     } else {
//       // Is this the correct use of setState. Will it trigger an extra re-render
//       // every time??? Should we be checking the current state to make sure it's
//       // not already null?
//       setState(null);
//     }
//   }
//
//   let error = null;
//   if (errorState !== null) {
//     error = <p role="alert" style={{'color': 'red'}}>{errorState}</p>
//   }
//
//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="username">Username:</label>
//         <input id="username" type="text" onChange={handleChange}/>
//         {error}
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   )
// }

// Extra Credit 3
function UsernameForm({onSubmitUsername}) {

  const [username, setUsername] = React.useState('')

  function handleSubmit(event) {
    event.preventDefault()
    onSubmitUsername(username)
  }

  function handleChange(e) {
    setUsername(e.target.value.trim().toLowerCase())
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input id="username" type="text" onChange={handleChange}
               value={username} />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

function App() {
  const onSubmitUsername = username => alert(`You entered: ${username}`)
  return <UsernameForm onSubmitUsername={onSubmitUsername} />
}

export default App
