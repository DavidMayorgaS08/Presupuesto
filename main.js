function registrar() {
    let gasto = document.getElementById("gasto").value;
    let cant = document.getElementById("cant").value;

    let informacion = [];
    let gastos = {
        gasto: gasto,
        cant: cant,
    }

    informacion.push(gastos);

    informacion.forEach((item, index) => {
        let card_container = document.getElementById("cont_cards");
        card_container.innerHTML = "";

        let card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
        <div class="art"><p>${item.gasto}</p></div>
        <div class="precio"><p>${item.cant}</p></div>
        <button class="boton_card">Eliminar</button>
    `;
        card_container.appendChild(card);
    })
}