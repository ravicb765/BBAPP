import React, { useContext, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { MoodContext } from '../context/MoodContext';
import MoodAnimation from '../components/MoodAnimation';
import EmotionThermometer from '../components/EmotionThermometer';
import EmotionThermometerColor from '../components/EmotionThermometerColor';
import { useTokens } from '../context/TokenContext';
import AnimatedStars from '../components/AnimatedStars';
import TokenBoard from '../components/TokenBoard';
import StickerBook from '../components/StickerBook';

const moodOptions = [
  { label: 'Happy', value: 'happy' },
  { label: 'Sad', value: 'sad' },
  { label: 'Angry', value: 'angry' },
  { label: 'Upset', value: 'upset' },
  { label: 'Calm', value: 'calm' },
];

const MoodScreen: React.FC = () => {
  const { addMoodEntry } = useContext(MoodContext)!;
  const { tokens, addToken } = useTokens();
  const [selectedMood, setSelectedMood] = useState<'happy' | 'sad' | 'angry' | 'upset' | 'calm'>('happy');
  const [selectedThermo, setSelectedThermo] = useState<string>('Calm');
  const [showStars, setShowStars] = useState(false);

  const handleSaveMood = () => {
    // Map mood string to a number for MoodEntry
    const moodMap: Record<string, number> = {
      happy: 1,
      sad: 2,
      angry: 3,
      upset: 4,
      calm: 5,
    };
    addMoodEntry({
      id: Date.now().toString(),
      mood: moodMap[selectedMood],
      timestamp: new Date().toISOString(),
    });
    addToken();
    setShowStars(true);
    setTimeout(() => setShowStars(false), 1500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling?</Text>
      <EmotionThermometer selectedMood={selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)} onSelectMood={(mood) => setSelectedMood(mood.toLowerCase())} />
      <EmotionThermometerColor selected={selectedThermo} onSelect={setSelectedThermo} />
      <MoodAnimation mood={selectedMood} />
      <AnimatedStars visible={showStars} />
      <Text style={styles.tokenText}>Tokens: {tokens}</Text>
      <View style={styles.options}>
        {moodOptions.map((option) => (
          <Button
            key={option.value}
            title={option.label}
            onPress={() => setSelectedMood(option.value as any)}
            color={selectedMood === option.value ? '#6366f1' : 'gray'}
          />
        ))}
      </View>
      <Button title="Save Mood" onPress={handleSaveMood} color="#22c55e" />
      <TokenBoard onReward={() => {
        // You can open a modal or navigate to a video screen here
        // Example: Linking.openURL('https://www.youtube.com/results?search_query=dance+videos+for+kids');
      }} />
      <StickerBook />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  options: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 8,
  },
  tokenText: {
    fontSize: 18,
    color: '#f59e0b',
    marginVertical: 8,
    fontWeight: 'bold',
  },
});

export default MoodScreen;
