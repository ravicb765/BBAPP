import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, PanResponder } from 'react-native';
import { useTokens } from '../context/TokenContext';

const items = [
  { id: 1, name: 'Fish', image: require('../components/assets/sticker_animal.png'), edible: true },
  { id: 2, name: 'Ice Cream', image: require('../components/assets/sticker_heart.png'), edible: false },
  { id: 3, name: 'Boot', image: require('../components/assets/sticker_flower.png'), edible: false },
  { id: 4, name: 'Starfish', image: require('../components/assets/sticker_star.png'), edible: true },
];
const sharkImg = require('../components/assets/sticker_happy.png');

const FeedTheShark: React.FC = () => {
  const { addToken } = useTokens();
  const [fed, setFed] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);
  const [dragging, setDragging] = useState<number | null>(null);
  const [dragPos] = useState(new Animated.ValueXY({ x: 0, y: 0 }));

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => dragging !== null,
    onPanResponderMove: Animated.event([
      null,
      { dx: dragPos.x, dy: dragPos.y },
    ], { useNativeDriver: false }),
    onPanResponderRelease: (e, gesture) => {
      if (dragging !== null) {
        // Shark area: y > 200, x between 100 and 220
        if (gesture.moveY > 200 && gesture.moveX > 100 && gesture.moveX < 220) {
          if (items[dragging].edible && !fed.includes(dragging)) {
            setFed([...fed, dragging]);
            if (fed.length + 1 === items.filter(i => i.edible).length) {
              setCompleted(true);
              addToken();
            }
          }
        }
        setDragging(null);
        dragPos.setValue({ x: 0, y: 0 });
      }
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feed the Shark</Text>
      <Image source={sharkImg} style={styles.shark} />
      <View style={styles.itemsRow}>
        {items.map((item, idx) => (
          <TouchableOpacity
            key={item.id}
            disabled={fed.includes(idx) || completed}
            onPressIn={() => setDragging(idx)}
            style={styles.itemBtn}
          >
            <Image source={item.image} style={styles.itemImg} />
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {dragging !== null && (
        <Animated.View
          style={[styles.dragItem, { transform: dragPos.getTranslateTransform() }]}
          {...panResponder.panHandlers}
        >
          <Image source={items[dragging].image} style={styles.itemImg} />
        </Animated.View>
      )}
      {completed && <Text style={styles.reward}>🎉 Shark is full! +1 Token!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0f7fa',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0284c7',
    marginBottom: 16,
  },
  shark: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  itemsRow: {
    flexDirection: 'row',
    marginTop: 16,
  },
  itemBtn: {
    alignItems: 'center',
    marginHorizontal: 12,
  },
  itemImg: {
    width: 48,
    height: 48,
    marginBottom: 4,
  },
  itemText: {
    fontSize: 14,
    color: '#374151',
  },
  dragItem: {
    position: 'absolute',
    zIndex: 10,
    left: 0,
    top: 0,
  },
  reward: {
    marginTop: 32,
    fontSize: 18,
    color: '#22c55e',
    fontWeight: 'bold',
  },
});

export default FeedTheShark;
