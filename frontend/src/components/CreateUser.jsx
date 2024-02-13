import React, { Component } from 'react'
import axios from 'axios'
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'

export default class CreateUser extends Component {

  state = {
    users: [],
    username: ''
  }

  componentDidMount() {
    this.getUsers();
  }


  getUsers = async () => {
    const res = await axios.get('http://localhost:4000/api/users');
    this.setState({ users: res.data });
  }

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  onSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:4000/api/users', {
      username: this.state.username
    })
    this.setState({ username: '' });
    this.getUsers();
  }

  deleteUser = async (id) => {
    await axios.delete('http://localhost:4000/api/users/' + id)
  }

  /*
  leadingActions = (user) => (
    <LeadingActions>
      <SwipeAction >
        Editar
      </SwipeAction>
    </LeadingActions>
  )
  */

  trailingActions = (id) => (
    <TrailingActions>
      <SwipeAction
        onClick={() => this.deleteUser(id)}
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  render() {
    return (
      <>
        <div className='contenedor-presupuesto contenedor sombra'>
          <form className='formulario' onSubmit={this.onSubmit}>
            <div className='campo'>
              <label> Nuevo Usuario</label>
              <input type='text' className='nuevo-presupuesto' placeholder='Nombre de Usuario' value={this.state.username} onChange={this.onChangeUsername} />
            </div>
            <input type="submit" value='Registrar' />
          </form>
        </div>
        <div className='listado-gastos contenedor'>
          <h2> Usuarios </h2>
          <SwipeableList>
            {
              this.state.users.map(user => (
                <SwipeableListItem
                  key={user._id}
                  //leadingActions={this.leadingActions(user)}
                  trailingActions={this.trailingActions(user._id)}
                >
                  <div className='gasto sombra'>
                    <div className='contenido-gasto'>
                      <div className='descripcion-gasto'>
                        <p className='categoria'> {user.username} </p>
                      </div>
                    </div>
                  </div>
                </SwipeableListItem>
              ))
            }
          </SwipeableList>
        </div>
      </>
    )
  }
}
