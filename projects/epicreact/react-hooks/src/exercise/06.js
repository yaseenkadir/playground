// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {
  fetchPokemon,
  PokemonDataView,
  PokemonForm,
  PokemonInfoFallback,
} from '../pokemon'
import {ErrorBoundary} from 'react-error-boundary'

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({status: 'idle'})
  const {status, pokemon, error} = state;

  React.useEffect(() => {
      if (!pokemonName) {
        setState({status: 'idle'})
        return
      }
      setState({status: 'pending'})
      fetchPokemon(pokemonName)
      .then(data => setState({status: 'resolved', pokemon: data}))
      .catch(e => setState({status: 'rejected', error: e}))
    },
    // Only need to make a request when the pokemon name changes
    [pokemonName])

  switch (status) {
    case 'idle':
      return <p>Submit a pokemon</p>
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />
    case 'resolved':
      return <PokemonDataView pokemon={pokemon} />
    case 'rejected':
      throw error
    default:
      throw new Error('Unreachable')
  }
}

// Renamed since we're using the one from the lib
class MyErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {error: null}
  }

  static getDerivedStateFromError(error) {
    return {error: error}
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log({error, errorInfo})
  }

  render() {
    if (!this.state.error) {
      return <>{this.props.children}</>
    }
    return <ErrorDisplay error={this.state.error} />
  }
}

function ErrorDisplay({error, resetErrorBoundary}) {
  return <div>
    <strong>Unable to load pokemon</strong>
    <p>{error.message}</p>
    <button onClick={e => resetErrorBoundary()}>Try Again</button>
  </div>
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        {/* Omg error boundary's respect keys. So good! */}
        <ErrorBoundary FallbackComponent={ErrorDisplay}
                       onReset={e => setPokemonName('')}
                       resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
