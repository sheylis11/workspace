// =====================================
// CALCULADORA CON FUNCIONES
// =====================================

// Función suma
function sumar(a, b) {
    suma=a+b;
    return suma;
}

// Función resta
function restar(a, b) {
    resta=a-b;
    return resta;
}

// Función multiplicación
function multiplicar(a, b) {
    multiplicacion=a*b;
    return multiplicacion;
}

// Función división
function dividir(a, b) {
    dividir=a/b;
    return dividir;
}
function potencia(a, b) {
    potencia=a**b;
    return potencia;
}
function mayor(a, b) {
    mayor=a > b 
    return mayor;
}
function dividir(a, b) {
    if (b === 0) {
        return "no se puede dividir por cero";
    }
}
// =====================================
// LLAMADO DE FUNCIONES
// =====================================

console.log("Resultado suma:");
console.log(sumar(10,5));

console.log("----------------");

console.log("Resultado resta:");
console.log(restar(10-5));

console.log("----------------");

console.log("Resultado multiplicación:");
console.log(multiplicar(10, 5));

console.log("----------------");

console.log("Resultado división:");
console.log(dividir(10, 5));

console.log("----------------");


console.log("Resultado potencia:");
console.log(potencia(10, 5));

console.log("----------------");

console.log("Resultado mayor:");
console.log(mayor(10, 5));

console.log("----------------");

console.log("Resultado división por cero:");
console.log(dividir(10, 0));

console.log("----------------");