import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Rect, Circle, Path } from 'react-native-svg';
import { useTokens } from '../context/TokenContext';

const colors = ['#fbbf24', '#f472b6', '#60a5fa', '#34d399', '#f87171', '#fff'];

const areas = [
  { id: 1, type: 'rect', props: { x: 30, y: 60, width: 40, height: 30, rx: 6 } }, // Cake base
  { id: 2, type: 'rect', props: { x: 40, y: 50, width: 20, height: 12, rx: 4 } }, // Cake top
  { id: 3, type: 'circle', props: { cx: 50, cy: 46, r: 3 } }, // Candle flame
  { id: 4, type: 'rect', props: { x: 48, y: 38, width: 4, height: 8, rx: 2 } }, // Candle
  { id: 5, type: 'path', props: { d: 'M30 90 Q50 110 70 90', stroke: '#374151', strokeWidth: 2, fill: 'none' } }, // Table
];

const BirthdayPartyColoring: React.FC = () => {
  const { addToken } = useTokens();
  const [fillColors, setFillColors] = useState<string[]>(['#fff', '#fff', '#fbbf24', '#fff', 'none']);
  const [selected, setSelected] = useState<string>(colors[0]);
  const [completed, setCompleted] = useState(false);

  const handleFill = (idx: number) => {
    if (completed || areas[idx].type === 'path') return;
    const newColors = [...fillColors];
    newColors[idx] = selected;
    setFillColors(newColors);
    if (newColors.slice(0, 4).every(c => c !== '#fff')) {
      setCompleted(true);
      addToken();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Birthday Party Coloring</Text>
      <Svg width={100} height={120} style={styles.svg}>
        {areas.map((area, idx) => {
          if (area.type === 'rect') {
            return <Rect key={area.id} {...area.props} fill={fillColors[idx]} stroke="#374151" strokeWidth={2} onPress={() => handleFill(idx)} />;
          } else if (area.type === 'circle') {
            return <Circle key={area.id} {...area.props} fill={fillColors[idx]} stroke="#374151" strokeWidth={2} onPress={() => handleFill(idx)} />;
          } else if (area.type === 'path') {
            return <Path key={area.id} {...area.props} />;
          }
        })}
      </Svg>
      <View style={styles.palette}>
        {colors.map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.colorBtn, { backgroundColor: c, borderWidth: selected === c ? 3 : 1 }]}
            onPress={() => setSelected(c)}
          />
        ))}
      </View>
      {completed && <Text style={styles.reward}>🎂 Well done! +1 Token!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fef9c3',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fbbf24',
    marginBottom: 16,
  },
  svg: {
    marginBottom: 24,
  },
  palette: {
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 16,
  },
  colorBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginHorizontal: 6,
    borderColor: '#374151',
  },
  reward: {
    marginTop: 24,
    fontSize: 18,
    color: '#22c55e',
    fontWeight: 'bold',
  },
});

export default BirthdayPartyColoring;
