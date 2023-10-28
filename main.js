let presupuesto = "";
let presupuesto_final = 0;
let presupuesto_flotante = 0;
let gastos = [];

function formatearMoneda(valor) {
    return valor.toLocaleString('es-ES', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function iniciar() {
    let presupuestoInput = document.getElementById("presupuesto");
    let mensajePresupuesto = document.querySelector(".text_cont1");

    presupuesto = parseFloat(presupuestoInput.value);

    if (isNaN(presupuesto) || presupuesto <= 0) {
        mensajePresupuesto.textContent = "Ingresa un presupuesto";
        mensajePresupuesto.style.color = "red";
        mensajePresupuesto.style.fontWeight = "bold";

        setTimeout(function () {
            mensajePresupuesto.textContent = "Registra el presupuesto";
            mensajePresupuesto.style.color = "#595c5c";
            mensajePresupuesto.style.fontWeight = "normal";
        }, 2000);
    } else {
        document.getElementById("text_cant_presu").textContent = formatearMoneda(presupuesto);
        presupuesto_final = presupuesto;
        document.getElementById("text_cant_rest").textContent = formatearMoneda(presupuesto);
        mensajePresupuesto.textContent = "Añade tus gastos";
        document.querySelector(".cont_gasto").style.display = "block";
        document.querySelector(".cont_cant").style.display = "block";
        document.querySelector(".pre_cont").style.display = "none";
        document.querySelector(".cont_boton_p").style.display = "none";
        document.querySelector(".cont_boton_s").style.display = "block";
        document.querySelector(".cont_rest").style.backgroundColor = "#01ad04";
    }
}

function registrar() {
    let gasto = document.getElementById("gasto").value;
    let cantInput = document.getElementById("cant").value;
    let mensajePresupuesto = document.querySelector(".text_cont1");
    let mensajeSecundario = document.querySelector(".text_listado");

    cantN = parseFloat(cantInput);

    if (!isNaN(cantN) && cantN > 0) {
        if (cantN > presupuesto_final) {
            mensajePresupuesto.textContent = "No tienes suficiente presupuesto para este gasto";
            mensajePresupuesto.style.color = "red";
            mensajePresupuesto.style.fontWeight = "bold";

            setTimeout(function () {
                mensajePresupuesto.textContent = "Añade tus gastos";
                mensajePresupuesto.style.color = "#595c5c";
                mensajePresupuesto.style.fontWeight = "normal";
            }, 2000);
            return;
        }
        cantFor = formatearMoneda(cantN);

        gastos.push({
            nombre: gasto,
            cantidad: cantInput,
        });

        let card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
        <div class="art"><p>${gasto}</p></div>
        <div class="precio"><p>${cantFor}</p></div>
        <button class="boton_card">Eliminar</button>
    `;

        let card_container = document.getElementById("cont_cards");
        card_container.appendChild(card);

        let botonesEliminar = document.querySelectorAll(".boton_card");
        botonesEliminar.forEach(function (boton) {
            boton.addEventListener("click", function () {
                if (boton.parentElement.parentElement) {
                    boton.parentElement.parentElement.removeChild(boton.parentElement);
                }
                let index = Array.from(botonesEliminar).indexOf(boton);
                let cantidadEliminada = parseFloat(gastos[index].cantidad);       
                presupuesto_final = presupuesto + gastos.reduce((total, gasto) => total + parseFloat(gasto.cantidad), 0);
                presupuesto_final -= cantidadEliminada;
                
                document.getElementById("text_cant_rest").textContent = formatearMoneda(presupuesto_final);
                gastos.splice(index, 1);
            });
        });

        presupuesto_final = presupuesto_final - cantN;
        document.getElementById("text_cant_rest").textContent = formatearMoneda(presupuesto_final);

        document.getElementById("gasto").value = "";
        document.getElementById("cant").value = "";
    } else {
        mensajePresupuesto.textContent = "La cantidad debe ser mayor que 0";
        mensajePresupuesto.style.color = "red";

        setTimeout(function () {
            mensajePresupuesto.textContent = "Añade tus gastos";
            mensajePresupuesto.style.color = "#595c5c";
            mensajePresupuesto.style.fontWeight = "normal";
        }, 2000);
    }

    if (presupuesto_final === 0) {
        document.querySelector(".cont_boton_s").style.display = "none";
        document.querySelector(".cont_rest").style.backgroundColor = "#f26d5f";
        mensajeSecundario.textContent = "Te quedaste sin presupuesto";
        mensajeSecundario.style.color = "red";
    }
}