import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { WebView } from 'react-native-webview';

const famousSongs = [
  { title: 'Baby Shark', url: 'https://www.youtube.com/embed/XqZsoesa55w' },
  { title: 'Let It Go (Frozen)', url: 'https://www.youtube.com/embed/L0MK7qz13bU' },
  { title: 'Happy (Pharrell Williams)', url: 'https://www.youtube.com/embed/ZbZSe6N_BXs' },
  { title: 'Can’t Stop the Feeling!', url: 'https://www.youtube.com/embed/ru0K8uYEZWw' },
  { title: 'Dance Monkey', url: 'https://www.youtube.com/embed/q0hyYWKXF0Q' },
];

const VideoBreakReward: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎵 Video Break Reward!</Text>
      {!selected ? (
        <FlatList
          data={famousSongs}
          keyExtractor={item => item.url}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.songBtn} onPress={() => setSelected(item.url)}>
              <Text style={styles.songText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.videoContainer}>
          <WebView
            source={{ uri: selected }}
            style={styles.webview}
            allowsFullscreenVideo
          />
          <TouchableOpacity style={styles.closeBtn} onPress={() => setSelected(null)}>
            <Text style={styles.closeText}>Back to Songs</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f0f9ff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 16,
  },
  songBtn: {
    backgroundColor: '#a7f3d0',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    width: 260,
    alignItems: 'center',
  },
  songText: {
    fontSize: 16,
    color: '#2563eb',
    fontWeight: 'bold',
  },
  videoContainer: {
    width: 320,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webview: {
    width: 320,
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
  },
  closeBtn: {
    marginTop: 12,
    backgroundColor: '#6366f1',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  closeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default VideoBreakReward;
