import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface MoodAnimationProps {
  mood: 'happy' | 'sad' | 'angry' | 'upset' | 'calm';
}

const moodImages = {
  happy: require('./assets/mood_happy.gif'),
  sad: require('./assets/mood_sad.gif'),
  angry: require('./assets/mood_angry.gif'),
  upset: require('./assets/mood_upset.gif'),
  calm: require('./assets/mood_calm.gif'),
};

const MoodAnimation: React.FC<MoodAnimationProps> = ({ mood }) => {
  return (
    <View style={styles.container}>
      <Image source={moodImages[mood]} style={styles.image} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  image: {
    width: 120,
    height: 120,
  },
});

export default MoodAnimation;
