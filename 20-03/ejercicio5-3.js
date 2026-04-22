let saldo = 1000;
while (saldo > 0) {
    saldo -= 150;
    if (saldo < 0) saldo = 0; // Para no mostrar saldos negativos
    console.log("Saldo actual: " + saldo);
}
console.log("Saldo agotado");