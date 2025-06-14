import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, PanResponder, Animated, Dimensions } from 'react-native';
import { useTokens } from '../context/TokenContext';

const stickers = [
  { id: 1, name: 'Star', image: require('./assets/sticker_star.png'), cost: 2 },
  { id: 2, name: 'Happy Face', image: require('./assets/sticker_happy.png'), cost: 3 },
  { id: 3, name: 'Rainbow', image: require('./assets/sticker_rainbow.png'), cost: 4 },
  { id: 4, name: 'Animal', image: require('./assets/sticker_animal.png'), cost: 5 },
  { id: 5, name: 'Heart', image: require('./assets/sticker_heart.png'), cost: 2 },
  { id: 6, name: 'Flower', image: require('./assets/sticker_flower.png'), cost: 3 },
  { id: 7, name: 'Sun', image: require('./assets/sticker_sun.png'), cost: 4 },
];

const sceneBg = require('./assets/scene_bg.png');
const { width } = Dimensions.get('window');

const StickerBook: React.FC = () => {
  const { tokens, spendTokens } = useTokens();
  const [owned, setOwned] = useState<number[]>([]);
  const [placedStickers, setPlacedStickers] = useState<any[]>([]);
  const [draggingSticker, setDraggingSticker] = useState<any>(null);
  const dragPos = useRef(new Animated.ValueXY()).current;
  const [dragVisible, setDragVisible] = useState(false);

  const handleBuy = (id: number, cost: number) => {
    if (tokens >= cost && !owned.includes(id)) {
      spendTokens(cost);
      setOwned([...owned, id]);
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => dragVisible,
      onPanResponderMove: Animated.event([
        null,
        { dx: dragPos.x, dy: dragPos.y },
      ], { useNativeDriver: false }),
      onPanResponderRelease: (e, gesture) => {
        if (draggingSticker) {
          setPlacedStickers([
            ...placedStickers,
            {
              ...draggingSticker,
              x: gesture.moveX - 40,
              y: gesture.moveY - 250,
            },
          ]);
          setDraggingSticker(null);
          setDragVisible(false);
          dragPos.setValue({ x: 0, y: 0 });
        }
      },
    })
  ).current;

  const startDrag = (sticker: any) => {
    setDraggingSticker(sticker);
    setDragVisible(true);
    dragPos.setValue({ x: 0, y: 0 });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sticker Book</Text>
      <Text style={styles.tokenText}>Tokens: {tokens}</Text>
      <View style={styles.stickerGrid}>
        {stickers.map((sticker) => (
          <View key={sticker.id} style={styles.stickerCard}>
            <Image source={sticker.image} style={styles.stickerImg} />
            <Text style={styles.stickerName}>{sticker.name}</Text>
            {owned.includes(sticker.id) ? (
              <TouchableOpacity onPress={() => startDrag(sticker)} style={styles.placeBtn}>
                <Text style={styles.placeText}>Place</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.buyBtn, tokens < sticker.cost && { backgroundColor: '#d1d5db' }]}
                onPress={() => handleBuy(sticker.id, sticker.cost)}
                disabled={tokens < sticker.cost}
              >
                <Text style={styles.buyText}>Buy ({sticker.cost}⭐)</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
      <Text style={styles.sceneTitle}>Your Scene</Text>
      <View style={styles.sceneContainer}>
        <Image source={sceneBg} style={styles.sceneBg} />
        {placedStickers.map((sticker, idx) => (
          <Image
            key={idx}
            source={sticker.image}
            style={{
              position: 'absolute',
              left: sticker.x,
              top: sticker.y,
              width: 48,
              height: 48,
            }}
          />
        ))}
        {draggingSticker && dragVisible && (
          <Animated.View
            style={{
              position: 'absolute',
              left: dragPos.x,
              top: dragPos.y,
              zIndex: 10,
            }}
            {...panResponder.panHandlers}
          >
            <Image source={draggingSticker.image} style={{ width: 48, height: 48 }} />
          </Animated.View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f9ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 8,
  },
  tokenText: {
    fontSize: 16,
    color: '#f59e0b',
    marginBottom: 16,
  },
  stickerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  stickerCard: {
    width: 120,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    margin: 8,
    elevation: 2,
  },
  stickerImg: {
    width: 64,
    height: 64,
    marginBottom: 8,
  },
  stickerName: {
    fontSize: 15,
    color: '#374151',
    marginBottom: 4,
  },
  owned: {
    color: '#22c55e',
    fontWeight: 'bold',
    marginTop: 4,
  },
  buyBtn: {
    backgroundColor: '#6366f1',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginTop: 4,
  },
  buyText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  placeBtn: {
    backgroundColor: '#22c55e',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginTop: 4,
  },
  placeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sceneTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6366f1',
    marginTop: 24,
    marginBottom: 8,
  },
  sceneContainer: {
    width: width - 32,
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#e0e7ff',
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sceneBg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover',
  },
});

export default StickerBook;
