import { useEffect, useState } from 'react';
import './App.css';
import PageWrapper from './PageWrapper';
import Paginacion from './Paginacion';
import Pelicula from './Pelicula';


function ListadoPeliculas() {
  const [paginaActual, setPaginaActual] = useState(1);
  const [peliculas, setPeliculas] = useState([]);
  const TOTAL_POR_PAGINA = 7;

  useEffect(() => {
    buscarPeliculas();
  }, [peliculas]);
  const buscarPeliculas = async () => {
    let url = 'https://cors-anywhere.herokuapp.com/https://lucasmoy.dev/data/react/peliculas.json'

    let respuesta = await fetch(url, {
      "method": "GET",
      "headers": {
        "Accept": 'application/json',
        "Content-Type": 'application/json',
        "Origin": 'https://lucasmoy.dev/data/react/peliculas.json'
      }
    });
    let json = await respuesta.json();
    setPeliculas(json);
    
  }


  let peliculasPorPagina = peliculas.slice(
    (paginaActual - 1) * TOTAL_POR_PAGINA,
    paginaActual * TOTAL_POR_PAGINA
  );

  const getTotalPaginas = () => {
    let cantidadTotalDePeliculas = peliculas.length;
    return Math.ceil(cantidadTotalDePeliculas / TOTAL_POR_PAGINA);
  }




  return (
    <PageWrapper>

      {peliculasPorPagina.map(pelicula => 
        <Pelicula titulo={pelicula.titulo} calificion={pelicula.calificion}
          director={pelicula.director} actores={pelicula.actores}
          fecha={pelicula.fecha}
          duracion={pelicula.duracion}
          img={pelicula.img}>
          {pelicula.descripcion}
        </Pelicula>

      )}
      <Paginacion pagina={paginaActual} total={getTotalPaginas()} onChange={(pagina) => {
        setPaginaActual(pagina)
      }} />

  
    </PageWrapper>
  );
}

export default ListadoPeliculas;
