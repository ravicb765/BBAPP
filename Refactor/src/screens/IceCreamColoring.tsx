import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTokens } from '../context/TokenContext';

const colors = ['#fbbf24', '#f472b6', '#60a5fa', '#34d399', '#f87171'];

const areas = [
  { id: 1, d: 'M40 20 Q50 0 60 20 Q70 40 60 60 Q50 80 40 60 Q30 40 40 20 Z' }, // Ice cream scoop
  { id: 2, d: 'M45 80 L55 80 L60 120 L40 120 Z' }, // Cone
];

const IceCreamColoring: React.FC = () => {
  const { addToken } = useTokens();
  const [fillColors, setFillColors] = useState<string[]>(['#fff', '#fff']);
  const [selected, setSelected] = useState<string>(colors[0]);
  const [completed, setCompleted] = useState(false);

  const handleFill = (idx: number) => {
    if (completed) return;
    const newColors = [...fillColors];
    newColors[idx] = selected;
    setFillColors(newColors);
    if (newColors.every(c => c !== '#fff')) {
      setCompleted(true);
      addToken();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ice Cream Coloring</Text>
      <Svg width={100} height={140} style={styles.svg}>
        {areas.map((area, idx) => (
          <Path
            key={area.id}
            d={area.d}
            fill={fillColors[idx]}
            stroke="#374151"
            strokeWidth={2}
            onPress={() => handleFill(idx)}
          />
        ))}
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
      {completed && <Text style={styles.reward}>🎉 Beautiful! +1 Token!</Text>}
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
    color: '#f472b6',
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

export default IceCreamColoring;
