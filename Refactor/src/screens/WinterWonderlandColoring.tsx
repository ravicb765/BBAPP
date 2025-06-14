import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Circle, Rect, Path } from 'react-native-svg';
import { useTokens } from '../context/TokenContext';

const colors = ['#fff', '#60a5fa', '#fbbf24', '#f87171', '#a7f3d0'];

const areas = [
  { id: 1, type: 'circle', props: { cx: 50, cy: 50, r: 30 } }, // Snowman body
  { id: 2, type: 'circle', props: { cx: 50, cy: 25, r: 15 } }, // Snowman head
  { id: 3, type: 'rect', props: { x: 40, y: 10, width: 20, height: 8, rx: 2 } }, // Hat
  { id: 4, type: 'rect', props: { x: 45, y: 18, width: 10, height: 4, rx: 2 } }, // Hat band
  { id: 5, type: 'path', props: { d: 'M35 80 Q50 100 65 80', stroke: '#374151', strokeWidth: 2, fill: 'none' } }, // Ground
];

const WinterWonderlandColoring: React.FC = () => {
  const { addToken } = useTokens();
  const [fillColors, setFillColors] = useState<string[]>(['#fff', '#fff', '#374151', '#fbbf24', 'none']);
  const [selected, setSelected] = useState<string>(colors[1]);
  const [completed, setCompleted] = useState(false);

  const handleFill = (idx: number) => {
    if (completed || areas[idx].type === 'path') return;
    const newColors = [...fillColors];
    newColors[idx] = selected;
    setFillColors(newColors);
    if (newColors.slice(0, 4).every(c => c !== '#fff' && c !== '#374151')) {
      setCompleted(true);
      addToken();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Winter Wonderland Coloring</Text>
      <Svg width={100} height={120} style={styles.svg}>
        {areas.map((area, idx) => {
          if (area.type === 'circle') {
            return <Circle key={area.id} {...area.props} fill={fillColors[idx]} stroke="#374151" strokeWidth={2} onPress={() => handleFill(idx)} />;
          } else if (area.type === 'rect') {
            return <Rect key={area.id} {...area.props} fill={fillColors[idx]} stroke="#374151" strokeWidth={2} onPress={() => handleFill(idx)} />;
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
      {completed && <Text style={styles.reward}>❄️ Great job! +1 Token!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0f2fe',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#60a5fa',
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

export default WinterWonderlandColoring;
