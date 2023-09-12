// Utilice el algoritmo Fisher-Yates shuffle para revolver las cartas
export const shuffleCards = (cartas) => {
    let m = cartas.length;
    let t;
    let i;

    // Mientras queden elementos para revolver
    while (m) {
        // Elije un elemento restante
        i = Math.floor(Math.random() * m--);

        // Y lo cambia con el elemento actual
        t = cartas[m];
        cartas[m] = cartas[i];
        cartas[i] = t;
    }

    return cartas;
};

// Forma un objeto de datos por imagen
export const getFormedData = (datos) => {
    return datos.map((imagen, indice) => ({
        id: indice,
        url: imagen,
        isShown: false,
        isFound: false,
    }));
};

// "Duplica" cada imagen obtenida
export const getPairedPics = (datos) => {
    return datos.reduce((imagenes, imagen) => imagenes.concat(imagen, imagen), []);
};

// Extiende la información existente con una clave uniqueId
export const addUniqueIds = (datos) => {
    return datos.map((entrada, indice) => ({
        ...entrada,
        uniqueId: indice,
    }));
};
