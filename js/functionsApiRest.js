

import  {showRoutes, showStops} from "./functions.js";

const URL = "http://localhost:3000"
const headers = new Headers ({'Content-Type': 'application/json'});

//metodo GET
export async function getRoutes(){
  try {
    let response = await(await fetch(`${URL}/routes`)).json();
    showRoutes(response);
  } catch (error) {
    console.log('Error de conexión:', error);
  }   
}
getRoutes();
export async function getStops(){
  try {
    debugger
    let response = await(await fetch(`${URL}/stops`)).json();
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }   
}
//Metodo POST
export async function postData(formData,nameJson){
  debugger
    let config = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(formData)
    }
    try {
      let response = await fetch(`${URL}/${nameJson}`,config);
      let responseJson = await response.json();
      getRoutes();
    } catch (error) {
      console.log('Error de conexión:', error);
    }

}

export async function deleteData(dataId, nameJson) {
  try {
    let config = {
           method: 'DELETE',
           headers: headers,
           body: JSON.stringify({ id: dataId })
       };
    let del = await(await fetch(`${URL}/${nameJson}/${dataId}`,config)).json();
  } catch (error) {
    console.log('Error de conexión:', error);
  }
}


export async function patchData(dataEdit,id,nameJson) {
  debugger
    let config = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(dataEdit)
    }
    let act = await (await fetch(`${URL}/${nameJson}/${id}`,config)).json();
}
