import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTokens } from '../context/TokenContext';

// For demo: 2x2 jigsaw of a single animal image (use sticker_animal.png)
const pieces = [
  { id: 1, src: require('../components/assets/sticker_animal.png'), style: { left: 0, top: 0 } },
  { id: 2, src: require('../components/assets/sticker_animal.png'), style: { left: 60, top: 0 } },
  { id: 3, src: require('../components/assets/sticker_animal.png'), style: { left: 0, top: 60 } },
  { id: 4, src: require('../components/assets/sticker_animal.png'), style: { left: 60, top: 60 } },
];

const shuffledOrder = () => [2, 4, 1, 3].sort(() => Math.random() - 0.5);

const AnimalJigsaw: React.FC = () => {
  const { addToken } = useTokens();
  const [order, setOrder] = useState<number[]>(shuffledOrder());
  const [selected, setSelected] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);

  const handleSelect = (idx: number) => {
    if (selected === null) {
      setSelected(idx);
    } else {
      // Swap
      const newOrder = [...order];
      [newOrder[selected], newOrder[idx]] = [newOrder[idx], newOrder[selected]];
      setOrder(newOrder);
      setSelected(null);
      if (JSON.stringify(newOrder) === JSON.stringify([1,2,3,4])) {
        setCompleted(true);
        addToken();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Animal Jigsaw</Text>
      <View style={styles.jigsawBox}>
        {order.map((pieceId, idx) => (
          <TouchableOpacity
            key={pieceId}
            style={[styles.piece, pieces[pieceId-1].style, selected === idx && styles.selected]}
            onPress={() => handleSelect(idx)}
            disabled={completed}
          >
            <Image source={pieces[pieceId-1].src} style={styles.img} />
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.instructions}>Tap two pieces to swap them and complete the animal!</Text>
      {completed && <Text style={styles.reward}>🧩 Great job! +1 Token!</Text>}
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
    color: '#34d399',
    marginBottom: 16,
  },
  jigsawBox: {
    width: 120,
    height: 120,
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'relative',
    marginBottom: 16,
  },
  piece: {
    width: 60,
    height: 60,
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 8,
    backgroundColor: '#e0f2fe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    borderColor: '#34d399',
    borderWidth: 3,
  },
  img: {
    width: 56,
    height: 56,
    resizeMode: 'contain',
  },
  instructions: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },
  reward: {
    marginTop: 16,
    fontSize: 18,
    color: '#22c55e',
    fontWeight: 'bold',
  },
});

export default AnimalJigsaw;
