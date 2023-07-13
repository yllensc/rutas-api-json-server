//metodo GET
//metodo POST
//metodo PATCH
//metodo DELETE

import  {showRoutes} from "./functions.js";

const URL = "http://localhost:3000"
//const headers = new Headers ({'Content-Type': 'application/json'});

//metodo GET
export async function getRoutes(){
  try {
    let response = await(await fetch(`${URL}/routes`)).json();
    console.log(response);
    showRoutes(response);
  } catch (error) {
    console.log('Error de conexión:', error);
  }   
}
getRoutes();

//Metodo POST
//export async function postMovie(formData){
//    let config = {
//        method: 'POST',
//        headers: headers,
//        body: JSON.stringify(formData)
//    }
//    try {
//      let response = await fetch(`${URL}/peliculas`,config);
//      let moviesPost = await response.json();
//      getMovies();
//    } catch (error) {
//      console.log('Error de conexión:', error);
//    }
//
//}
//
//export async function deleteMovie(movieId) {
//  try {
//    let config = {
//           method: 'DELETE',
//           headers: headers,
//           body: JSON.stringify({ id: movieId })
//       };
//    let del = await(await fetch(`${URL}/peliculas/${movieId}`,config)).json();
//  } catch (error) {
//    console.log('Error de conexión:', error);
//  }
//}
//
//
//export async function patchMovie(movieData) {
//    let config = {
//        method: 'PUT',
//        headers: headers,
//        body: JSON.stringify(movieData)
//    }
//    let act = await (await fetch(`${URL}/peliculas/${movie.id}`,config)).json();
//}