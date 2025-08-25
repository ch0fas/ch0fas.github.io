fecha = new Date();
year = fecha.getFullYear();
mes = fecha.getMonth() + 1;
dia = fecha.getDate();

if (mes < 10) {
    document.getElementById("eldia").innerHTML = dia + "/0" + mes + "/" + year
} else {
    document.getElementById("eldia").innerHTML = dia + "/" + mes + "/" + year
}