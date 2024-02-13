import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navigation from './components/Navigation'
import NotesList from './components/NotesList'
import CreateNote from './components/CreateNote'
import CreateUser from './components/CreateUser'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navigation/>
        <Routes>
          <Route path='/' exact Component = { NotesList } />
          <Route path='/edit/:id' Component = { CreateNote } />
          <Route path='/create' Component = { CreateNote } />
          <Route path='/user' Component = { CreateUser } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App