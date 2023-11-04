let presupuestoInicial = 0;
let saldoRestante = 0;

function formatearMoneda(valor) {
    return valor.toLocaleString('es-ES', {
        style: 'currency',
        currency: 'COL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function iniciar() {
    presupuestoInicial = parseFloat(document.getElementById("presupuesto").value);
    let mensajePresupuesto = document.querySelector(".text_cont1");

    if (presupuestoInicial > 0) {
        document.querySelector(".cont1").classList.add("cont1_disabled");
        document.querySelector(".pre_cont").style.display = "none";
        document.querySelector(".cont_gasto").style.display = "block";
        document.querySelector(".cont_cant").style.display = "block";
        document.querySelector(".cont_boton_p").style.display = "none";
        document.querySelector(".cont_boton_s").style.display = "block";
        document.getElementById("text_cant_presu").textContent = formatearMoneda(presupuestoInicial);
        saldoRestante = presupuestoInicial;
        document.getElementById("text_cant_rest").textContent = formatearMoneda(saldoRestante);
        mensajePresupuesto.textContent = "Añade tus gastos";
        document.querySelector(".cont_rest").style.backgroundColor = "#01ad04";
    } else {
        mensajePresupuesto.textContent = "Registre un presupuesto mayor a cero";
        mensajePresupuesto.style.color = "red";
        mensajePresupuesto.style.fontWeight = "bold";

        setTimeout(function () {
            mensajePresupuesto.textContent = "Registra el presupuesto";
            mensajePresupuesto.style.color = "#595c5c";
            mensajePresupuesto.style.fontWeight = "normal";
        }, 2000);
    };
};

function registrar() {
    const nombreGasto = document.getElementById("gasto").value;
    const cantidadGasto = parseFloat(document.getElementById("cant").value);
    let mensajePresupuesto = document.querySelector(".text_cont1");
    let mensajeSecundario = document.querySelector(".text_titulo")

    if (nombreGasto !== "" && cantidadGasto > 0) {
        if (cantidadGasto <= saldoRestante) {
            const contCards = document.getElementById("cont_cards");
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <div class="art">${nombreGasto}</div>
                <div class="precio">${formatearMoneda(cantidadGasto)}</div>
                <div class="boton_card">
                    <button class="btn" onclick="borrarGasto(this, ${cantidadGasto})">Borrar</button>
                </div>
            `;
            contCards.appendChild(card);
            saldoRestante -= cantidadGasto;
            document.getElementById("text_cant_rest").textContent = formatearMoneda(saldoRestante);
            document.getElementById("gasto").value = "";
            document.getElementById("cant").value = "";

            if (saldoRestante < presupuestoInicial * 0.2) {
                document.querySelector(".cont_rest").style.backgroundColor = "#FF0000";
            }

            if (saldoRestante <= 0) {
                document.querySelector(".cont_boton_s button").disabled = true;
                mensajeSecundario.textContent = "Sin presupuesto";
                mensajeSecundario.style.color = "red";
                setTimeout(function () {
                    mensajeSecundario.textContent = "Gasto Semanal";
                    mensajeSecundario.style.color = "#000000";
                }, 2000);
            } else {
                document.querySelector(".cont_boton_s button").disabled = false;
            }
        } else {
            mensajePresupuesto.textContent = "No cuenta con el presupuesto suficiente para este gasto";
            mensajePresupuesto.style.color = "red";
            mensajePresupuesto.style.fontWeight = "bold";

            setTimeout(function () {
                mensajePresupuesto.textContent = "Añade tus gastos";
                mensajePresupuesto.style.color = "#595c5c";
                mensajePresupuesto.style.fontWeight = "normal";
            }, 2000);
        }
    }else if(nombreGasto === ""){
        mensajePresupuesto.textContent = "Por favor, ingrese un nombre";
        mensajePresupuesto.style.color = "red";
        mensajePresupuesto.style.fontWeight = "bold";

        setTimeout(function () {
            mensajePresupuesto.textContent = "Añade tus gastos";
            mensajePresupuesto.style.color = "#595c5c";
            mensajePresupuesto.style.fontWeight = "normal";
        }, 2000);
    }else{
        mensajePresupuesto.textContent = "Por favor, ingrese una cantidad válida";
        mensajePresupuesto.style.color = "red";
        mensajePresupuesto.style.fontWeight = "bold";

        setTimeout(function () {
            mensajePresupuesto.textContent = "Añade tus gastos";
            mensajePresupuesto.style.color = "#595c5c";
            mensajePresupuesto.style.fontWeight = "normal";
        }, 2000);
    
    }
};

function borrarGasto(button, cantidad) {
    button.parentElement.parentElement.remove();
    saldoRestante += cantidad;
    document.getElementById("text_cant_rest").textContent = formatearMoneda(saldoRestante);
    if (saldoRestante <= 0) {
        document.querySelector(".cont_boton_s button").disabled = true;
    } else {
        document.querySelector(".cont_boton_s button").disabled = false;
    }

    if (saldoRestante < presupuestoInicial * 0.2) {
        document.querySelector(".cont_rest").style.backgroundColor = "#FF0000";
    } else {
        document.querySelector(".cont_rest").style.backgroundColor = "#01ad04";
    };
};