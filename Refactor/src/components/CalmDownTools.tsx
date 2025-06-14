import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Easing } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const tools = [
  { icon: <MaterialCommunityIcons name="cup-water" size={32} color="#3b82f6" />, label: 'Drink Water' },
  { icon: <MaterialIcons name="edit" size={32} color="#f59e0b" />, label: 'Write about Your Feelings' },
  { icon: <FontAwesome5 name="sort-numeric-up" size={32} color="#6366f1" />, label: 'Count to 10' },
  { icon: <MaterialIcons name="emoji-emotions" size={32} color="#10b981" />, label: 'Think about Good Things' },
  { icon: <MaterialCommunityIcons name="beach" size={32} color="#06b6d4" />, label: 'Imagine a Nice Place' },
  { icon: <MaterialCommunityIcons name="book-open-page-variant" size={32} color="#ef4444" />, label: 'Read a Book' },
  { icon: <MaterialIcons name="access-time" size={32} color="#6366f1" />, label: 'Take a Break' },
  { icon: <MaterialIcons name="music-note" size={32} color="#f472b6" />, label: 'Listen to Music' },
  { icon: <MaterialIcons name="help-outline" size={32} color="#f59e0b" />, label: 'Ask for Help' },
  { icon: <MaterialCommunityIcons name="weather-windy" size={32} color="#10b981" />, label: 'Take Deep Breath (Breathing Exercise)' },
  { icon: <MaterialIcons name="directions-walk" size={32} color="#3b82f6" />, label: 'Go for a Walk' },
  { icon: <MaterialIcons name="celebration" size={32} color="#eab308" />, label: 'Dance or Fun Activity' },
];

const BreathingGuide: React.FC = () => {
  const [phase, setPhase] = useState<'inhale' | 'exhale'>('inhale');
  const anim = useRef(new Animated.Value(1)).current;
  const [running, setRunning] = useState(false);

  const startBreathing = () => {
    setRunning(true);
    Animated.sequence([
      Animated.timing(anim, {
        toValue: 1.5,
        duration: 3000,
        useNativeDriver: false,
        easing: Easing.inOut(Easing.ease),
      }),
      Animated.timing(anim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
        easing: Easing.inOut(Easing.ease),
      }),
    ]).start(() => {
      setPhase(phase === 'inhale' ? 'exhale' : 'inhale');
      setRunning(false);
    });
  };

  return (
    <View style={styles.breathingContainer}>
      <Text style={styles.breathingTitle}>Breathing Guide</Text>
      <TouchableOpacity onPress={startBreathing} disabled={running}>
        <Animated.View
          style={[
            styles.breathingCircle,
            { transform: [{ scale: anim }] },
            running && { backgroundColor: phase === 'inhale' ? '#a7f3d0' : '#fef08a' },
          ]}
        />
      </TouchableOpacity>
      <Text style={styles.breathingText}>{phase === 'inhale' ? 'Inhale... (Tap the circle)' : 'Exhale... (Tap the circle)'}</Text>
    </View>
  );
};

const CalmDownTools: React.FC = () => (
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>Calm Down Tools</Text>
    <BreathingGuide />
    <View style={styles.grid}>
      {tools.map((tool, idx) => (
        <View key={idx} style={styles.toolCard}>
          {tool.icon}
          <Text style={styles.label}>{tool.label}</Text>
        </View>
      ))}
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#e0f2fe',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2563eb',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  toolCard: {
    width: 120,
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  label: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 15,
    color: '#374151',
  },
  breathingContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  breathingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 8,
  },
  breathingCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#bae6fd',
    marginBottom: 12,
  },
  breathingText: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 8,
  },
});

export default CalmDownTools;
