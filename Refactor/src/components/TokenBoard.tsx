import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTokens } from '../context/TokenContext';
import { MaterialIcons } from '@expo/vector-icons';

const MAX_TOKENS = 5;

const TokenBoard: React.FC<{ onReward?: () => void }> = ({ onReward }) => {
  const { tokens, spendTokens } = useTokens();
  const filled = Math.min(tokens, MAX_TOKENS);
  const empty = MAX_TOKENS - filled;
  const canReward = filled === MAX_TOKENS;

  const handleReward = () => {
    if (canReward) {
      spendTokens(MAX_TOKENS);
      onReward && onReward();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Token Board</Text>
      <View style={styles.tokenRow}>
        {[...Array(filled)].map((_, i) => (
          <MaterialIcons key={i} name="star" size={36} color="#f59e0b" style={styles.star} />
        ))}
        {[...Array(empty)].map((_, i) => (
          <MaterialIcons key={i} name="star-border" size={36} color="#fbbf24" style={styles.star} />
        ))}
        <MaterialIcons name="auto-awesome" size={36} color="#6366f1" style={styles.star} />
      </View>
      {canReward && (
        <TouchableOpacity style={styles.rewardBtn} onPress={handleReward}>
          <Text style={styles.rewardText}>You earned a video break! Watch a dance video for a few minutes 🎉</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 24,
    backgroundColor: '#f0f9ff',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 8,
  },
  tokenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  star: {
    marginHorizontal: 2,
  },
  rewardBtn: {
    backgroundColor: '#22c55e',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  rewardText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default TokenBoard;
