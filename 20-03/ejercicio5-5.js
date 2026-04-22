for (let i = 1; i <= 20; i++) {
    if (i === 17) break; // Se detiene totalmente
    if (i % 3 === 0) continue; // Salta a la siguiente vuelta
    console.log(i);
}