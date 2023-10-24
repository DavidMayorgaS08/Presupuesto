function registrar(){
    let presupuesto = document.getElementById("presupuesto").value;
    const numeroCompleto = presupuesto.toLocaleString('es', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
    console.log(numeroCompleto);
}