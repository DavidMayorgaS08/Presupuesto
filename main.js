let presupuesto = "";
let presupuesto_final = 0;
let presupuesto_flotante = 0;

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

    cantN = parseFloat(cantInput);

    if (cantN > presupuesto_final) {
        alert("¡No tienes suficiente presupuesto para este gasto!");
        return;
    }

    cantFor = formatearMoneda(cantN);

    let nuevoGasto = {
        gasto: gasto,
        cant: cantFor,
    };

    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <div class="art"><p>${nuevoGasto.gasto}</p></div>
        <div class="precio"><p>${nuevoGasto.cant}</p></div>
        <button class="boton_card">Eliminar</button>
    `;

    let card_container = document.getElementById("cont_cards");
    card_container.appendChild(card);

    let botonesEliminar = document.querySelectorAll(".boton_card");
    botonesEliminar.forEach(function (boton) {
        boton.addEventListener("click", function () {
            card_container.removeChild(boton.parentElement);
        });
    });

    presupuesto_final = presupuesto_final - cantN;
    document.getElementById("text_cant_rest").textContent = formatearMoneda(presupuesto_final);

    document.getElementById("gasto").value = "";
    document.getElementById("cant").value = "";

    if(presupuesto_final === 0){
        document.querySelector(".cont_boton_s").style.display = "none";
        document.querySelector(".cont_rest").style.backgroundColor = "#f26d5f";
    }
}