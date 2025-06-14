import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTokens } from '../context/TokenContext';

const cards = [
  { id: 1, image: require('../components/assets/sticker_animal.png') },
  { id: 2, image: require('../components/assets/sticker_star.png') },
  { id: 3, image: require('../components/assets/sticker_happy.png') },
  { id: 4, image: require('../components/assets/sticker_rainbow.png') },
];
const shuffled = () => {
  const arr = [...cards, ...cards].map((c, i) => ({ ...c, key: i + 1 }));
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const MonsterMemoryMatch: React.FC = () => {
  const [deck, setDeck] = useState(shuffled());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const { addToken } = useTokens();
  const [completed, setCompleted] = useState(false);

  const handleFlip = (idx: number) => {
    if (flipped.length === 2 || flipped.includes(idx) || matched.includes(idx)) return;
    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      const [i1, i2] = newFlipped;
      if (deck[i1].id === deck[i2].id) {
        setMatched([...matched, i1, i2]);
        setTimeout(() => {
          setFlipped([]);
          if (matched.length + 2 === deck.length) {
            setCompleted(true);
            addToken();
            addToken(); // +2 tokens
          }
        }, 800);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monster Memory Match</Text>
      <View style={styles.grid}>
        {deck.map((card, idx) => (
          <TouchableOpacity
            key={card.key}
            style={styles.card}
            onPress={() => handleFlip(idx)}
            disabled={flipped.includes(idx) || matched.includes(idx) || completed}
          >
            {(flipped.includes(idx) || matched.includes(idx)) ? (
              <Image source={card.image} style={styles.img} />
            ) : (
              <View style={styles.cardBack} />
            )}
          </TouchableOpacity>
        ))}
      </View>
      {completed && <Text style={styles.reward}>🎉 You matched all! +2 Tokens!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f9ff',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 240,
    justifyContent: 'center',
  },
  card: {
    width: 56,
    height: 56,
    margin: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  cardBack: {
    width: 48,
    height: 48,
    backgroundColor: '#a7f3d0',
    borderRadius: 6,
  },
  img: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  reward: {
    marginTop: 24,
    fontSize: 18,
    color: '#22c55e',
    fontWeight: 'bold',
  },
});

export default MonsterMemoryMatch;
