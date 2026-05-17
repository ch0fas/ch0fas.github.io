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

birthday = new Date("2005-04-17");
const diffMs = Math.abs(fecha - birthday);
const diffDays = Math.floor(diffMs / (1000*60*60*24));

document.getElementById("num").innerHTML = "No. " + diffDays;
