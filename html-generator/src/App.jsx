import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GeneratorForm from './assets/Form/GeneratorForm'


function App() {
  const [count, setCount] = useState(0)

  return (
   <>
    <GeneratorForm/>
   </>
  )
}

export default App
