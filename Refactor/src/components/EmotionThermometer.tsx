import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const moods = [
  { label: 'Angry', color: '#ef4444', icon: 'emoticon-angry-outline' },
  { label: 'Frustrated', color: '#f87171', icon: 'emoticon-confused-outline' },
  { label: 'Sad', color: '#fbbf24', icon: 'emoticon-sad-outline' },
  { label: 'Calm', color: '#fde047', icon: 'emoticon-neutral-outline' },
  { label: 'Happy', color: '#38bdf8', icon: 'emoticon-happy-outline' },
];

const EmotionThermometer = ({ selectedMood, onSelectMood }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Emotion Thermometer</Text>
    <View style={styles.thermometer}>
      {moods.map((mood, idx) => (
        <TouchableOpacity
          key={mood.label}
          style={[
            styles.level,
            { backgroundColor: mood.color, borderWidth: selectedMood === mood.label ? 3 : 0 },
            idx === moods.length - 1 && styles.bottomLevel,
          ]}
          onPress={() => onSelectMood && onSelectMood(mood.label)}
        >
          <MaterialCommunityIcons name={mood.icon as any} size={32} color="#222" />
          <Text style={styles.levelLabel}>{mood.label}</Text>
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderColor: '#6366f1',
  },
  bottomLevel: {
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  levelLabel: {
    fontSize: 16,
    marginLeft: 16,
    color: '#222',
    fontWeight: 'bold',
  },
});

export default EmotionThermometer;
