import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { Audio } from 'expo-av';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function CalmCornerScreen() {
  const [playingSound, setPlayingSound] = useState<string | null>(null);

  const sounds = [
    { id: 'ocean', name: 'Ocean Waves', icon: 'waves', color: '#3b82f6' },
    { id: 'rain', name: 'Gentle Rain', icon: 'grain', color: '#6366f1' },
    { id: 'forest', name: 'Forest Birds', icon: 'nature', color: '#10b981' },
    { id: 'wind', name: 'Soft Wind', icon: 'air', color: '#8b5cf6' },
    { id: 'white-noise', name: 'White Noise', icon: 'blur-on', color: '#6b7280' },
    { id: 'meditation', name: 'Meditation Bell', icon: 'self-improvement', color: '#f59e0b' },
  ];

  const handleSoundPress = async (soundId: string) => {
    if (playingSound === soundId) {
      setPlayingSound(null);
      // Stop sound logic would go here
    } else {
      setPlayingSound(soundId);
      // Play sound logic would go here
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="spa" size={48} color="white" />
        <Title style={styles.title}>Calm Corner</Title>
        <Paragraph style={styles.subtitle}>
          Find your peaceful space with soothing sounds and calming activities
        </Paragraph>
      </View>

      <View style={styles.content}>
        {/* Calm Down Tools for Emotional Regulation */}
        <Card style={{ marginBottom: 24 }}>
          <Card.Content>
            <Title>Calm Down Tools</Title>
            <Paragraph>Try these strategies if you feel upset or overwhelmed:</Paragraph>
            <View style={{ marginTop: 12 }}>
              {/* Import and use the CalmDownTools component */}
              {/* @ts-ignore */}
              {require('../components/CalmDownTools').default()}
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.soundsCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Calming Sounds</Title>
            <Paragraph style={styles.sectionDescription}>
              Tap a sound to play or pause. These sounds can help with relaxation and focus.
            </Paragraph>
            
            <View style={styles.soundGrid}>
              {sounds.map((sound) => (
                <TouchableOpacity
                  key={sound.id}
                  style={[
                    styles.soundButton,
                    { backgroundColor: sound.color },
                    playingSound === sound.id && styles.soundButtonActive
                  ]}
                  onPress={() => handleSoundPress(sound.id)}
                >
                  <Icon 
                    name={sound.icon} 
                    size={32} 
                    color="white" 
                  />
                  <Paragraph style={styles.soundName}>
                    {sound.name}
                  </Paragraph>
                  {playingSound === sound.id && (
                    <Icon name="pause" size={16} color="white" style={styles.playIcon} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.breathingCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Breathing Exercise</Title>
            <Paragraph style={styles.sectionDescription}>
              Follow the circle to practice deep breathing
            </Paragraph>
            
            <View style={styles.breathingContainer}>
              <View style={styles.breathingCircle}>
                <Icon name="favorite" size={40} color="#ef4444" />
              </View>
              <Paragraph style={styles.breathingInstruction}>
                Breathe in... and out...
              </Paragraph>
            </View>
            
            <Button 
              mode="contained" 
              style={styles.breathingButton}
              icon="play-arrow"
            >
              Start Breathing Exercise
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.activitiesCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Calming Activities</Title>
            
            <View style={styles.activityList}>
              <TouchableOpacity style={styles.activityItem}>
                <Icon name="brush" size={24} color="#6366f1" />
                <View style={styles.activityText}>
                  <Paragraph style={styles.activityName}>Digital Coloring</Paragraph>
                  <Paragraph style={styles.activityDescription}>
                    Relaxing coloring pages
                  </Paragraph>
                </View>
                <Icon name="chevron-right" size={24} color="#9ca3af" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.activityItem}>
                <Icon name="self-improvement" size={24} color="#10b981" />
                <View style={styles.activityText}>
                  <Paragraph style={styles.activityName}>Guided Meditation</Paragraph>
                  <Paragraph style={styles.activityDescription}>
                    5-minute mindfulness session
                  </Paragraph>
                </View>
                <Icon name="chevron-right" size={24} color="#9ca3af" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.activityItem}>
                <Icon name="psychology" size={24} color="#f59e0b" />
                <View style={styles.activityText}>
                  <Paragraph style={styles.activityName}>Emotion Check-in</Paragraph>
                  <Paragraph style={styles.activityDescription}>
                    How are you feeling today?
                  </Paragraph>
                </View>
                <Icon name="chevron-right" size={24} color="#9ca3af" />
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 24,
    backgroundColor: '#10b981',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  subtitle: {
    color: 'white',
    opacity: 0.9,
    textAlign: 'center',
    marginTop: 8,
  },
  content: {
    padding: 16,
  },
  soundsCard: {
    elevation: 2,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#374151',
    marginBottom: 8,
  },
  sectionDescription: {
    color: '#6b7280',
    marginBottom: 16,
  },
  soundGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  soundButton: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    position: 'relative',
  },
  soundButtonActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  soundName: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
    fontWeight: 'bold',
  },
  playIcon: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  breathingCard: {
    elevation: 2,
    marginBottom: 16,
  },
  breathingContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  breathingCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fef3c7',
    borderWidth: 3,
    borderColor: '#f59e0b',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  breathingInstruction: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  breathingButton: {
    marginTop: 16,
  },
  activitiesCard: {
    elevation: 2,
  },
  activityList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  activityText: {
    flex: 1,
    marginLeft: 12,
  },
  activityName: {
    fontWeight: 'bold',
    color: '#374151',
  },
  activityDescription: {
    color: '#6b7280',
    fontSize: 12,
  },
});
