import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      nombrePokemon: "",
      pokemon: {}
    }
    this.obtenerPokemon = this.obtenerPokemon.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  //Se ejecuta cuando se renderiza este componente
  componentDidMount(){
    //Primer argumento -> url de la petición que queremos realizar
    //Segundo argumento -> opciones para la petición (headers, body, method)
    let url = 'https://pokeapi.co/api/v2/pokemon/ditto';
    fetch(url)
    .then((response) => {
      return response.json(); //Regresa una promesa para poder transformar/interpretar esos datos en formato json      
    })
    .then((myJson) => {
      this.setState({pokemon: myJson}); //Respuesta de la petición que ya podremos manejar con javascript
    })
    .catch(error => console.log(error));
  }

  obtenerPokemon(event){
    event.preventDefault(); //Para evitar el comportamiendo del formulario cuando se envían datos
    let url = 'https://pokeapi.co/api/v2/pokemon/'+this.state.nombrePokemon;
    fetch(url)
    .then((response) => {
      return response.json(); //Regresa una promesa para poder transformar/interpretar esos datos en formato json      
    })
    .then((myJson) => {
      this.setState({pokemon: myJson}); //Respuesta de la petición que ya podremos manejar con javascript
    })
    .catch(error => console.log(error));
  }

  handleInput(event){
    this.setState({nombrePokemon: event.target.value});
  }

  render(){
    return (
      <div className="App">    
        <form onSubmit={this.obtenerPokemon}>
          <input type="text" placeholder="Nombre del pokemon" onChange={this.handleInput} />
          <input type="submit"/>
        </form> 
        <div>
          <h1>{this.state.pokemon.name}</h1> 
          {this.state.pokemon.sprites ? <img src={this.state.pokemon.sprites.front_default} alt="pokemon" /> : <></>}    
          <p>Peso: {this.state.pokemon.weight}</p>                
        </div> 
      </div>
    );
  }
}

export default App;
