
import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function YogaZoneScreen() {
  const poses = [
    { name: 'Mountain Pose', difficulty: 'Beginner', duration: '30s', icon: 'landscape' },
    { name: 'Tree Pose', difficulty: 'Beginner', duration: '45s', icon: 'park' },
    { name: 'Cat-Cow Stretch', difficulty: 'Easy', duration: '1 min', icon: 'pets' },
    { name: 'Child\'s Pose', difficulty: 'Easy', duration: '1 min', icon: 'self-improvement' },
    { name: 'Butterfly Pose', difficulty: 'Beginner', duration: '45s', icon: 'nature' },
    { name: 'Sun Salutation', difficulty: 'Intermediate', duration: '3 min', icon: 'wb-sunny' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="self-improvement" size={48} color="white" />
        <Title style={styles.title}>Yoga Zone</Title>
        <Paragraph style={styles.subtitle}>
          Gentle movements for body and mind wellness
        </Paragraph>
      </View>

      <View style={styles.content}>
        <Card style={styles.introCard}>
          <Card.Content>
            <Title style={styles.introTitle}>Benefits of Yoga for Development</Title>
            <View style={styles.benefitsList}>
              <View style={styles.benefit}>
                <Icon name="fitness-center" size={20} color="#6366f1" />
                <Paragraph style={styles.benefitText}>Improves strength and flexibility</Paragraph>
              </View>
              <View style={styles.benefit}>
                <Icon name="psychology" size={20} color="#6366f1" />
                <Paragraph style={styles.benefitText}>Enhances focus and concentration</Paragraph>
              </View>
              <View style={styles.benefit}>
                <Icon name="favorite" size={20} color="#6366f1" />
                <Paragraph style={styles.benefitText}>Promotes emotional regulation</Paragraph>
              </View>
              <View style={styles.benefit}>
                <Icon name="spa" size={20} color="#6366f1" />
                <Paragraph style={styles.benefitText}>Reduces stress and anxiety</Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Title style={styles.sectionTitle}>Yoga Poses</Title>
        <Paragraph style={styles.sectionDescription}>
          Choose a pose to get started. Each pose includes visual guides and calming instructions.
        </Paragraph>

        {poses.map((pose, index) => (
          <TouchableOpacity key={index} style={styles.poseCard}>
            <Card style={styles.card}>
              <Card.Content style={styles.poseContent}>
                <View style={styles.poseHeader}>
                  <View style={styles.poseIcon}>
                    <Icon name={pose.icon} size={32} color="#6366f1" />
                  </View>
                  <View style={styles.poseInfo}>
                    <Title style={styles.poseName}>{pose.name}</Title>
                    <View style={styles.poseMeta}>
                      <Chip mode="outlined" style={styles.chip} textStyle={styles.chipText}>
                        {pose.difficulty}
                      </Chip>
                      <Chip mode="outlined" style={styles.chip} textStyle={styles.chipText}>
                        {pose.duration}
                      </Chip>
                    </View>
                  </View>
                  <Icon name="chevron-right" size={24} color="#9ca3af" />
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}

        <Card style={styles.quickStartCard}>
          <Card.Content>
            <Title style={styles.quickStartTitle}>Quick Start Session</Title>
            <Paragraph style={styles.quickStartDescription}>
              Not sure where to begin? Try our 5-minute guided session designed specifically for beginners.
            </Paragraph>
            <Button 
              mode="contained" 
              style={styles.quickStartButton}
              icon="play-arrow"
            >
              Start 5-Minute Session
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.tipsCard}>
          <Card.Content>
            <Title style={styles.tipsTitle}>Yoga Tips</Title>
            <View style={styles.tip}>
              <Icon name="info" size={20} color="#10b981" />
              <Paragraph style={styles.tipText}>
                Listen to your body and don't force any movements
              </Paragraph>
            </View>
            <View style={styles.tip}>
              <Icon name="info" size={20} color="#10b981" />
              <Paragraph style={styles.tipText}>
                Focus on your breathing throughout each pose
              </Paragraph>
            </View>
            <View style={styles.tip}>
              <Icon name="info" size={20} color="#10b981" />
              <Paragraph style={styles.tipText}>
                Use props like pillows or blankets for comfort
              </Paragraph>
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
    backgroundColor: '#8b5cf6',
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
  introCard: {
    elevation: 2,
    marginBottom: 24,
  },
  introTitle: {
    fontSize: 18,
    color: '#374151',
    marginBottom: 16,
  },
  benefitsList: {
    gap: 12,
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  benefitText: {
    marginLeft: 8,
    color: '#6b7280',
    flex: 1,
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
  poseCard: {
    marginBottom: 12,
  },
  card: {
    elevation: 2,
  },
  poseContent: {
    padding: 16,
  },
  poseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  poseIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ede9fe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  poseInfo: {
    flex: 1,
  },
  poseName: {
    fontSize: 18,
    color: '#374151',
    marginBottom: 8,
  },
  poseMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    height: 28,
  },
  chipText: {
    fontSize: 12,
  },
  quickStartCard: {
    elevation: 2,
    marginTop: 24,
    marginBottom: 16,
    backgroundColor: '#fef3c7',
  },
  quickStartTitle: {
    fontSize: 18,
    color: '#92400e',
    marginBottom: 8,
  },
  quickStartDescription: {
    color: '#a16207',
    marginBottom: 16,
  },
  quickStartButton: {
    backgroundColor: '#f59e0b',
  },
  tipsCard: {
    elevation: 2,
  },
  tipsTitle: {
    fontSize: 18,
    color: '#374151',
    marginBottom: 16,
  },
  tip: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipText: {
    marginLeft: 8,
    color: '#6b7280',
    flex: 1,
  },
});
