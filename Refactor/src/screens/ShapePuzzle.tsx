import React, { useState } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated, TouchableOpacity } from 'react-native';
import Svg, { Rect, Circle, Polygon } from 'react-native-svg';
import { useTokens } from '../context/TokenContext';

const shapes = [
  { id: 1, type: 'rect', color: '#fbbf24', x: 20, y: 20 },
  { id: 2, type: 'circle', color: '#60a5fa', x: 120, y: 20 },
  { id: 3, type: 'triangle', color: '#34d399', x: 70, y: 100 },
];
const targets = [
  { id: 1, type: 'rect', x: 20, y: 200 },
  { id: 2, type: 'circle', x: 120, y: 200 },
  { id: 3, type: 'triangle', x: 70, y: 280 },
];

const ShapePuzzle: React.FC = () => {
  const { addToken } = useTokens();
  const [positions, setPositions] = useState([
    new Animated.ValueXY({ x: 20, y: 20 }),
    new Animated.ValueXY({ x: 120, y: 20 }),
    new Animated.ValueXY({ x: 70, y: 100 }),
  ]);
  const [placed, setPlaced] = useState([false, false, false]);
  const [completed, setCompleted] = useState(false);
  const [dragging, setDragging] = useState<number | null>(null);

  const panResponders = shapes.map((shape, idx) =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => !placed[idx],
      onPanResponderGrant: () => setDragging(idx),
      onPanResponderMove: Animated.event([
        null,
        { dx: positions[idx].x, dy: positions[idx].y },
      ], { useNativeDriver: false }),
      onPanResponderRelease: (e, gesture) => {
        const target = targets[idx];
        const dx = gesture.moveX - target.x;
        const dy = gesture.moveY - (target.y + 100); // adjust for header
        if (Math.abs(dx) < 40 && Math.abs(dy) < 40) {
          Animated.spring(positions[idx], {
            toValue: { x: target.x, y: target.y },
            useNativeDriver: false,
          }).start();
          const newPlaced = [...placed];
          newPlaced[idx] = true;
          setPlaced(newPlaced);
          if (newPlaced.every(Boolean) && !completed) {
            setCompleted(true);
            addToken();
          }
        } else {
          Animated.spring(positions[idx], {
            toValue: { x: shapes[idx].x, y: shapes[idx].y },
            useNativeDriver: false,
          }).start();
        }
        setDragging(null);
      },
    })
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shape Puzzle</Text>
      <Svg width={220} height={360} style={styles.svg}>
        {/* Targets */}
        {targets.map((t, idx) => {
          if (t.type === 'rect') return <Rect key={t.id} x={t.x} y={t.y} width={60} height={60} fill="#fff" stroke="#fbbf24" strokeWidth={3} rx={12} />;
          if (t.type === 'circle') return <Circle key={t.id} cx={t.x + 30} cy={t.y + 30} r={30} fill="#fff" stroke="#60a5fa" strokeWidth={3} />;
          if (t.type === 'triangle') return <Polygon key={t.id} points={`${t.x+30},${t.y} ${t.x},${t.y+60} ${t.x+60},${t.y+60}`} fill="#fff" stroke="#34d399" strokeWidth={3} />;
        })}
      </Svg>
      {/* Draggable shapes */}
      {shapes.map((shape, idx) => (
        <Animated.View
          key={shape.id}
          style={[styles.shape, { zIndex: dragging === idx ? 10 : 1, position: 'absolute', left: positions[idx].x, top: positions[idx].y }]}
          {...panResponders[idx].panHandlers}
        >
          <Svg width={60} height={60}>
            {shape.type === 'rect' && <Rect x={0} y={0} width={60} height={60} fill={shape.color} rx={12} />}
            {shape.type === 'circle' && <Circle cx={30} cy={30} r={30} fill={shape.color} />}
            {shape.type === 'triangle' && <Polygon points="30,0 0,60 60,60" fill={shape.color} />}
          </Svg>
        </Animated.View>
      ))}
      {completed && <Text style={styles.reward}>🎉 All shapes matched! +1 Token!</Text>}
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
    color: '#fbbf24',
    marginBottom: 16,
  },
  svg: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  shape: {
    width: 60,
    height: 60,
  },
  reward: {
    marginTop: 320,
    fontSize: 18,
    color: '#22c55e',
    fontWeight: 'bold',
  },
});

export default ShapePuzzle;
