import {
  tableRoutes,
  btnCreateRoute,
  modalRoute,
  form,
  iconStops,
  viewButtons,
  modalStops
} from "./selectors.js";
import { postData } from "./functionsApiRest.js";
export function showRoutes(routes) {
    routes.forEach(route => {
        let rowHTML = `
          <tr>
            <th scope="row"><img class="img-route" src="/img/ruta.avif" alt="carIcon"></th>
            <td>${route.name}</td>
            <td><div class="iconStop"><i class="fa-solid fa-plus"></i></div></td>
            <td><button class="view-button" data-id="${route.id}">Ver más</button></td>
          </tr>`;
        tableRoutes.insertAdjacentHTML('afterbegin', rowHTML);
      });
      
      // Asignar eventos a cada botón y al icono
      viewButtons.forEach(button => {
        button.addEventListener('click', function() {
          const routeId = this.dataset.id;
          // Haz lo que necesites con el routeId
          console.log('ID de la ruta:', routeId);
        });
      });
      
      iconStops.forEach(iconStop => {
        iconStop.addEventListener('click', function() {
          const routeId = this.parentNode.nextElementSibling.firstChild.dataset.id;
          // Haz lo que necesites con el routeId
          console.log('ID de la ruta:', routeId);
        });
      });
      
}


btnCreateRoute.addEventListener("click", function (e) {
  e.preventDefault();
  const modal = new bootstrap.Modal(modalRoute);
  modal.show();

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const data = {
      name: nameInput.value,
    };

    postData(data, "routes");
    modal.hide();
  });
})
