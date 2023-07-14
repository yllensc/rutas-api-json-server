import {
  tableRoutes,
  btnCreateRoute,
  modalRoute,
  form,
  modalStops,
  formStop,
} from "./selectors.js";
import { postData, patchData } from "./functionsApiRest.js";
export function showRoutes(routes) {
  routes.forEach((route) => {
    let rowHTML = `
          <tr>
            <th scope="row"><img class="img-route" src="/img/ruta.avif" alt="carIcon"></th>
            <td class="nameRoute">${route.name}</td>
            <td><div class="iconStop"><i class="fa-solid fa-plus"></i></div></td>
            <td><button class="viewButton" data-id="${route.id}">Ver más</button></td>
          </tr>`;
    tableRoutes.insertAdjacentHTML("afterbegin", rowHTML);
  });

  const viewButtons = document.querySelectorAll(".viewButton");
  const iconStops = document.querySelectorAll(".iconStop");
  // Asignar eventos a cada botón y al icono
  viewButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const routeId = this.dataset.id;
      // Haz lo que necesites con el routeId
      console.log("ID de la ruta:", routeId);
    });
  });

  iconStops.forEach((iconStop) => {
    iconStop.addEventListener("click", function () {
      debugger
      const routeId = this.parentNode.nextElementSibling.firstChild.dataset.id;
      // Haz lo que necesites con el routeId
      console.log("ID de la ruta:", routeId);
      const modalStop = new bootstrap.Modal(modalStops);
      modalStop.show();
      formStop.addEventListener("submit", function (e) {
        e.preventDefault();

        const data = {
          name: nameInputStop.value,
          routeId: routeId,
          image: imageInputStop.value,
        };

        postData(data, "stops");
        modal.hide();
      });
    });
  });

  const editRoute = document.querySelectorAll(".nameRoute");
  editRoute.forEach((route) => {
    route.addEventListener("dblclick", function (e) {
      route.setAttribute("contentEditable", true);
    });

    route.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        debugger
        const routeId = this;
        console.log(routeId);
        route.setAttribute("contentEditable", false);
        const dataName = {
          name:route.innerText
        }
        console.log(route.innerText);
        patchData(dataName,routeId,'routes');
      }
    });
  });
}

btnCreateRoute.addEventListener("click", function (e) {
  e.preventDefault();
  const modal = new bootstrap.Modal(modalRoute);
  modal.show();

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
      name: nameInput.value,
    };

    postData(data, "routes");
    modal.hide();
  });
});
