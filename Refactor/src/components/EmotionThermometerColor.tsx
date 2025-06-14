import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const thermometerLevels = [
  { label: 'Calm', color: '#22c55e', icon: 'emoticon-neutral-outline' },
  { label: 'Sad', color: '#fde047', icon: 'emoticon-sad-outline' },
  { label: 'Frustrated', color: '#fbbf24', icon: 'emoticon-confused-outline' },
  { label: 'Angry', color: '#ef4444', icon: 'emoticon-angry-outline' },
];

const EmotionThermometerColor: React.FC<{
  selected?: string;
  onSelect?: (label: string) => void;
}> = ({ selected, onSelect }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Emotion Thermometer</Text>
    <View style={styles.thermometer}>
      {thermometerLevels.map((level, idx) => (
        <TouchableOpacity
          key={level.label}
          style={[
            styles.level,
            { backgroundColor: level.color, borderWidth: selected === level.label ? 3 : 0 },
            idx === 0 && styles.bottomLevel,
            idx === thermometerLevels.length - 1 && styles.topLevel,
          ]}
          onPress={() => onSelect && onSelect(level.label)}
        >
          <MaterialCommunityIcons name={level.icon as any} size={32} color="#222" />
          <Text style={styles.levelLabel}>{level.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#6366f1',
  },
  thermometer: {
    width: 120,
    borderRadius: 60,
    overflow: 'hidden',
    backgroundColor: '#e0e7ff',
    elevation: 2,
  },
  level: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderColor: '#6366f1',
  },
  bottomLevel: {
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  topLevel: {
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
  levelLabel: {
    fontSize: 16,
    marginLeft: 16,
    color: '#222',
    fontWeight: 'bold',
  },
});

export default EmotionThermometerColor;
