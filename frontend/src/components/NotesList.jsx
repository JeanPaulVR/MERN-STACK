import axios from 'axios'
import React, { Component } from 'react'
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
export default class NotesList extends Component {
  
  state = {
    notes: []
  }

  componentDidMount() {
    this.getNotes()
  }

  leadingActions = (id) => (
    <LeadingActions>
      <SwipeAction 
        onClick={() => this.handleEditClick(id)}
      >
        Editar
      </SwipeAction>
    </LeadingActions>
  )

  trailingActions = (id) => (
    <TrailingActions>
      <SwipeAction
        onClick={() => this.deleteNote(id)}
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  getNotes = async () => {
    const res = await axios.get('http://localhost:4000/api/notes');
    this.setState({ notes: res.data });
  }

  deleteNote = async (id) => {
    await axios.delete('http://localhost:4000/api/notes/' + id)
    console.log(id)
  }

  handleEditClick = (id) => {
    const editPath = `/edit/${id}`;
    window.location.href = editPath
  };

  render() {
    return (
      <div className='listado-gastos contenedor'>
        <SwipeableList>
          {
            this.state.notes.map(note => (
              <SwipeableListItem
                key={note._id}
                leadingActions={this.leadingActions(note._id)}
                trailingActions={this.trailingActions(note._id)}
              >
                <div className='gasto sombra'>
                  <div className='contenido-gasto'>
                    <div className='descripcion-gasto'>
                      <p className='categoria'> {note.title} </p>
                      <p className='categoria'> {note.content} </p>
                      <p className='categoria'> {note.author} </p>
                      <p className='categoria'> {note.date} </p>
                    </div>
                  </div>
                </div>
              </SwipeableListItem>
            ))
          }
        </SwipeableList>
      </div>
    )
  }
}
