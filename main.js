fecha = new Date();
year = fecha.getFullYear();
mes = fecha.getMonth() + 1;
dia = fecha.getDate();

if (mes < 10 && dia < 10) {
    document.getElementById("eldia").innerHTML = "0" + dia + "/0" + mes + "/" + year
} else if (mes > 10 && dia < 10)  {
    document.getElementById("eldia").innerHTML = "0" + dia + "/" + mes + "/" + year
} else if (mes < 10 && dia >= 10) {
    document.getElementById("eldia").innerHTML = dia + "/0" + mes + "/" + year
} else {
    document.getElementById("eldia").innerHTML = dia + "/" + mes + "/" + year
}
// Light-Dark Mode 