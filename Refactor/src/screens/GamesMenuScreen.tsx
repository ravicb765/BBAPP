import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const games = [
  { name: 'Monster Memory Match', screen: 'MonsterMemoryMatch' },
  { name: 'Feed the Shark', screen: 'FeedTheShark' },
  { name: 'Build a Monster', screen: 'BuildAMonster' },
  { name: 'Hidden Pictures', screen: 'HiddenPictures' },
  { name: 'Shape Puzzle', screen: 'ShapePuzzle' },
  { name: 'Animal Jigsaw', screen: 'AnimalJigsaw' },
  { name: 'Find the Farm Animals', screen: 'FindFarmAnimals' },
  { name: 'Feed the Firetruck', screen: 'FeedTheFiretruck' },
  { name: 'Ice Cream Coloring', screen: 'IceCreamColoring' },
  { name: 'Winter Wonderland Coloring', screen: 'WinterWonderlandColoring' },
  { name: 'Birthday Party Coloring', screen: 'BirthdayPartyColoring' },
];

const GamesMenuScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🎮 Fun Games & Puzzles</Text>
      {games.map((game) => (
        <TouchableOpacity
          key={game.screen}
          style={styles.gameBtn}
          onPress={() => navigation.navigate(game.screen as never)}
        >
          <Text style={styles.gameText}>{game.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f9ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 16,
  },
  gameBtn: {
    backgroundColor: '#a7f3d0',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    width: 260,
    alignItems: 'center',
  },
  gameText: {
    fontSize: 18,
    color: '#2563eb',
    fontWeight: 'bold',
  },
});

export default GamesMenuScreen;
