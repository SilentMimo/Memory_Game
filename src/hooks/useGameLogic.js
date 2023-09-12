// useGameLogic.js
import { useEffect, useState } from "react";
import { addUniqueIds, getFormedData, getPairedPics, shuffleCards } from "../utils";

const MAX_VISIBLE_CARDS = 2;

const useGameLogic = (images) => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [turn, setTurn] = useState(1);
    const [matchedPairs, setMatchedPairs] = useState(0);
    const [failedAttempts, setFailedAttempts] = useState(0);
    const [isGameWon, setIsGameWon] = useState(false);

    const prepareCards = () => {
        const a = getFormedData(images);
        const b = getPairedPics(a);
        const c = addUniqueIds(b);
        const d = shuffleCards(c);
        setCards(d);
    }

    const flipCard = (clickedCardId) => {
        if (flippedCards.length >= MAX_VISIBLE_CARDS) {
            return; // No se pueden voltear más cartas mientras dos estén visibles
        }

        const updatedCards = cards.map((card) => {
            if (card.uniqueId === clickedCardId && !card.isFound && !card.isShown) {
                card.isShown = true;
                setFlippedCards((oldFlippedCards) => [...oldFlippedCards, card]);
            }
            return card;
        });

        setCards(updatedCards);
    }

    const checkMatch = () => {
        if (flippedCards.length === MAX_VISIBLE_CARDS) {
            const [firstCard, secondCard] = flippedCards;

            if (firstCard.id === secondCard.id) {
                // Las cartas coinciden, márcalas como encontradas
                const updatedCards = cards.map((card) => {
                    if (flippedCards.some((flippedCard) => flippedCard.uniqueId === card.uniqueId)) {
                        card.isFound = true;
                    }
                    return card;
                });

                setCards(updatedCards);
                setMatchedPairs(matchedPairs + 1);
            } else {
                // Las cartas no coinciden, voltea ambas de nuevo después de 1 segundo
                setTimeout(() => {
                    const updatedCards = cards.map((card) => {
                        if (flippedCards.some((flippedCard) => flippedCard.uniqueId === card.uniqueId)) {
                            card.isShown = false;
                        }
                        return card;
                    });

                    setCards(updatedCards);
                    setFailedAttempts(failedAttempts + 1); // Aumenta los intentos fallidos
                }, 1000);
            }

            setFlippedCards([]); // Limpia las cartas volteadas después de comparar
        }
    }

    const onCardClick = (clickedCardId) => {
        if (flippedCards.length < MAX_VISIBLE_CARDS) {
            flipCard(clickedCardId);
        }
    }

    const checkWinCondition = () => {
        const allCardsMatched = cards.every(card => card.isFound);
        if (allCardsMatched) {
          setIsGameWon(true); // Establece isGameWon en true cuando todas las cartas estén emparejadas
        }
      }
      
      useEffect(() => {
        if (images.length > 0) {
          prepareCards();
        }
      }, [images]);
      
      useEffect(() => {
        if (flippedCards.length === MAX_VISIBLE_CARDS) {
          checkMatch();
          checkWinCondition(); // Verifica la condición de victoria después de cada comparación
        }
      }, [flippedCards]);

    return { cards, onCardClick, flipCard, turn, matchedPairs, failedAttempts, isGameWon };
}

export default useGameLogic;
