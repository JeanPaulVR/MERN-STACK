import React, { Component } from 'react'
import axios from 'axios';

export default class CreateNote extends Component {
  state = {
    users: [],
    title: '',
    content: '',
    author: '',
    date: '',
    editing: false,
    _id:''
  }

  componentDidMount = async () => {
    this.getUsers()
    if (this.props && this.props.params) {
      const idNote = this.props.params.id;

      if (idNote) {
        const res = await axios.get(
          "http://localhost:4000/api/notes/" + idNote
        );
        console.log(res.data)
        this.setState({
          title: res.data.title,
          content: res.data.content,
          autor: res.data.autor,
          date: new Date(res.data.date),
          editing: true,
          _id: idNote,
        });
      }
    }

  }

  onSubmit = async (e) => {
    e.preventDefault();

    const newNote = {
      title: this.state.title,
      content: this.state.content,
      author: this.state.author,
      date: this.state.date
    }

    if (this.state.editing) {
      await axios.put(
        "http://localhost:4000/api/notes/" + this.state._id, newNote);

    } else {
      await axios.post('http://localhost:4000/api/notes', newNote)

    }

    window.location.href = '/'
  }

  onChangeValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  getUsers = async () => {
    const res = await axios.get('http://localhost:4000/api/users')
    this.setState({ users: res.data.map(e => e.username) })
  }

  render() {
    return (
      <div className='contenedor-presupuesto contenedor sombra'>
        <form className='formulario' onSubmit={this.onSubmit}>
          <div className='campo'>
            <label> Nueva Nota</label>
            <select name='author' onChange={this.onChangeValue} value={this.state.author} >
              <option value='' key=''>Seleccionar</option>
              {
                this.state.users.map(user => (
                  <option value={user} key={user}>{user}</option>
                ))
              }
            </select>
            <input type='text' className='nuevo-presupuesto' placeholder='Título' name='title' onChange={this.onChangeValue} value={this.state.title} />
            <textarea type='text' className='nuevo-presupuesto' placeholder='Descripción' name='content' onChange={this.onChangeValue} value={this.state.content}/>
            <input type="date" className="appearance-none bg-white border border-gray-400 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='date' onChange={this.onChangeValue} value={this.state.date} />
          </div>
          <input type="submit" value='Registrar' />
        </form>
      </div>
    )
  }
}
