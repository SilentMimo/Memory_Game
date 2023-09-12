import React, { useEffect, useState, useMemo } from 'react';

const useGetImages = ({ cardsCount }) => {
  const [images, setImages] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  // Función para construir la URL de la API de imágenes
  const buildUrl = () => {
    let url = new URL('https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries');
    url.search = new URLSearchParams({
      per_page: cardsCount / 2, // Número de imágenes a obtener por que luego se duplican en la funcion getPairedPics de utils (la mitad del número de cartas)
    });
    return url;
  };

  // Función asincrónica para obtener las imágenes de la API
  const fetchData = async () => {
    try {
      const response = await fetch(buildUrl());
      if (!response.ok) {
        console.log(response);
        throw new Error('Network response was not ok'); // Manejo de error en caso de respuesta incorrecta
      }
      const data = await response.json();
      const imageUrls = data.entries.map((entry) => entry.fields.image.url); // Extraer las URL de las imágenes
      setImages(imageUrls); // Actualizar el estado con las imágenes
      setLoading(false); // Indicar que la carga ha finalizado
    } catch (error) {
      console.error('Error fetching images:', error);
      setError(error); 
      setLoading(false); 
    }
  };

  // Utilizar useMemo para memorizar la función fetchData y evitar llamadas innecesarias
  const memoizedFetchData = useMemo(() => fetchData, [cardsCount]);

  // Efecto que se ejecuta cuando cambia memoizedFetchData (cardsCount)
  useEffect(() => {
    memoizedFetchData(); 
  }, [memoizedFetchData]);

  // Devolver un objeto con las imágenes, estado de carga y posibles errores
  return { images, loading, error };
};

export default useGetImages;
