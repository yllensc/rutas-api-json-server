import {tableRoutes,btnCreateRoute,modalRoute, nameRoute, bSave} from './selectors.js'
import {postData} from './functionsApiRest.js'
export function showRoutes(routes){
    routes.forEach(route => {

        let rowHTML = `
        <tr>
        <th scope="row"><img class="img-route" src="/img/ruta.avif" alt="carIcon"></th>
        <td>${route.name}</td>
        <td><i class="fa-solid fa-plus"></i></td>
        <td><button id="${route.id}">Ver más</button></td>
        </tr>`
        tableRoutes.insertAdjacentHTML('afterbegin', rowHTML);
    });

}

btnCreateRoute.addEventListener('click',function(e){
    e.preventDefault();
    const modal = new bootstrap.Modal(modalRoute);
    modal.show();
    bSave.addEventListener('click',function(){
        const data = {
            "name":nameRoute.value
        }
        postData(data,"routes")
        modal.hide();
    })
})