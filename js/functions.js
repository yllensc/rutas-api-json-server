import {
  tableRoutes,
  btnCreateRoute,
  modalRoute,
  form,
  modalStops,
  formStop,
  modalDetails,
  modalContentDetail,
  formEditStop,
  bSaveEditStop
} from "./selectors.js";
import { postData, patchData, getStops, deleteData } from "./functionsApiRest.js";
export function showRoutes(routes) {
  routes.forEach((route) => {
    let rowHTML = `
          <tr>
            <th scope="row"><img class="img-route" src="/img/ruta.avif" alt="carIcon"></th>
            <td class="nameRoute" data-route-id=${route.id}>${route.name}</td>
            <td><div class="iconStop"><i class="fa-solid fa-plus"></i></div></td>
            <td><button class="viewButton" data-id="${route.id}">Ver más</button></td>
            <td><button class="editButtonRoute" data-id-edit="${route.id}">Editar Ruta</button></td>
            <td><button class="delButtonRoute" data-id-del="${route.id}">Eliminar ruta</button></td>
          </tr>`;
    tableRoutes.insertAdjacentHTML("afterbegin", rowHTML);
  });

  const viewButtons = document.querySelectorAll(".viewButton");
  const iconStops = document.querySelectorAll(".iconStop");
  // Asignar eventos a cada botón y al icono
  viewButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const routeId = this.dataset.id;
      // Haz lo que necesites con el routeId
      console.log("ID de la ruta:", routeId);
      showStops(routeId);
    });
  });

  iconStops.forEach((iconStop) => {
    iconStop.addEventListener("click", function () {
      debugger;
      const routeId = this.parentNode.nextElementSibling.firstChild.dataset.id;
      // Haz lo que necesites con el routeId
      console.log("ID de la ruta:", routeId);
      formEditStop.style.display = "none";
      formStop.style.display = "block";
      const modalStop = new bootstrap.Modal(modalStops);
      modalStop.show();
     
      formStop.addEventListener("submit", function (e) {
        e.preventDefault();

        const data = {
          nameStop: nameInputStop.value,
          routeId: parseInt(routeId),
          image: imageInputStop.value,
        };

        postData(data, "stops");
        modal.hide();
      });
    });
  });

  const editRouteBtn = document.querySelectorAll(".editButtonRoute");
  editRouteBtn.forEach((routeBtn) => {
  routeBtn.addEventListener("click", function (e) {
    const row = routeBtn.closest("tr");
    const nameCell = row.querySelector(".nameRoute");
    nameCell.setAttribute("contentEditable", true);

    nameCell.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        const routeId = nameCell.getAttribute("data-route-id");
        console.log(routeId);
        nameCell.setAttribute("contentEditable", false);
        const dataName = {
          name: nameCell.innerText,
        };
        console.log(nameCell.innerText);
        patchData(dataName, routeId, "routes");
      }
    });
  });
});

const delRouteBtns = document.querySelectorAll(".delButtonRoute");
delRouteBtns.forEach((delBtn) => {
  delBtn.addEventListener("click", function() {
    debugger
    const routeId = this.getAttribute("data-id-del");
    deleteData(routeId, "routes");
  });
});

  
}

export async function showStops(routeId) {
  debugger;
  const dataStops = await getStops();
  debugger;
  if (dataStops.length > 0) {
    let html = "";
    dataStops.forEach((stop) => {
      if (stop.routeId == routeId) {
        html += `
          <div class="container-stops-route">
            <h2>Información del Stop</h2>
            <div class="stopInfo">
              <p>${stop.nameStop}</p>
              <img src="${stop.image}" alt="">
              <!-- Otros campos de información del stop -->
            </div>
            <div class="buttons">
              <button class="editBtnStops" id="editButton" data-edit="${stop.id}" data-routeId="${stop.routeId}">Editar</button>
              <button class="delBtnStops" id="deleteButton" data-delete="${stop.id}">Eliminar</button>
            </div>
          </div>
        `;
      }
    });

    // Actualiza el contenido del modal con los stops encontrados
    modalContentDetail.innerHTML = html;
  } else {
    // Muestra un mensaje en el modal indicando que no hay paradas todavía
    modalContentDetail.innerHTML = "<p>No hay paradas disponibles</p>";
  }

  const modalDetail = new bootstrap.Modal(modalDetails);
  modalDetail.show();

  const editBtnStops = document.querySelectorAll(".editBtnStops");
  editBtnStops.forEach((editBtn) => {
    editBtn.addEventListener("click", function() {
      const container = this.parentNode.parentNode;
      const nameStop = container.querySelector(".stopInfo p").textContent;
      const image = container.querySelector(".stopInfo img").getAttribute("src");

      // Mostrar los datos del stop en el modal
      const nameEditStop = document.getElementById("nameInputStopEdit");
      const imageEditStop = document.getElementById("imageInputStopEdit");
      nameEditStop.value = nameStop;
      imageEditStop.value = image;

      // Mostrar el modal
      modalDetail.hide();
      formStop.style.display = "none";
      formEditStop.style.display = "block";
      
      const modalStop = new bootstrap.Modal(modalStops);
      modalStop.show();

      const editId = editBtn.getAttribute("data-edit"); // Almacenar el valor de data-edit en una variable
      const editRouteId = editBtn.getAttribute("data-routeId");
debugger
      bSaveEditStop.addEventListener("click", function(e) {
        e.preventDefault();
        // Obtener los nuevos valores editados del formulario
        const newName = nameEditStop.value;
        const newImage = imageEditStop.value;

        const dataStop = {
          nameStop: newName,
          routeId: parseInt(editRouteId),
          image: newImage
        };
        patchData(dataStop,editId,"stops");
      });
    });
  });

  const delBtnStops = document.querySelectorAll(".delBtnStops");
delBtnStops.forEach((delBtn) => {
  delBtn.addEventListener("click", function() {
    const container = this.parentNode.parentNode;
    const stopId = container.querySelector(".editBtnStops").getAttribute("data-edit");
    deleteData(stopId, "stops");
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


function handleEditStop(event) {
  const stopId = event.target.dataset.edit;
  const stop = dataStops.find((stop) => stop.id === stopId);

  // Mostrar los datos del stop en el modal
  const nameEditStop = document.getElementById("nameInputStop");
  const imageEditStop = document.getElementById("imageInputStop");
  nameEditStop.value = stop.nameStop;
  imageEditStop.value = stop.image;

  console.log(imageEditStop.value);
  console.log(nameEditStop.value);

  // Mostrar el modal
  const modalStop = new bootstrap.Modal(modalStops);
  modalStop.show();
}
