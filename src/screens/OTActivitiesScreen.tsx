
import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function OTActivitiesScreen() {
  const activities = [
    {
      title: 'Fine Motor Skills',
      description: 'Improve hand-eye coordination and dexterity',
      icon: 'touch-app',
      difficulty: 'Beginner',
      duration: '10-15 min'
    },
    {
      title: 'Gross Motor Skills',
      description: 'Build strength and balance',
      icon: 'directions-run',
      difficulty: 'Intermediate',
      duration: '15-20 min'
    },
    {
      title: 'Sensory Integration',
      description: 'Process and respond to sensory input',
      icon: 'sensors',
      difficulty: 'Beginner',
      duration: '5-10 min'
    },
    {
      title: 'Cognitive Skills',
      description: 'Enhance memory and problem-solving',
      icon: 'psychology',
      difficulty: 'Advanced',
      duration: '20-30 min'
    },
  ];

  const appFeatures = [
    { name: "Visual Step-by-Step Guides", description: "Clear, sequential instructions with optional audio narration." },
    { name: "Video Modeling & Animations", description: "Demonstrations of tasks by real people or engaging animations." },
    { name: "Repeatable Routines", description: "Set tasks to appear daily, weekly, or as needed." },
    { name: "Progress Tracking", description: "Monitor task streaks, mastery levels, and overall improvement." },
    { name: "Sensory Mode Adjustments", description: "Customize brightness, sound levels, and haptic feedback." },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="psychology" size={48} color="white" />
        <Title style={styles.title}>OT Skill Builders</Title>
        <Paragraph style={styles.subtitle}>
          Build independence in daily living and enhance motor skills
        </Paragraph>
      </View>

      <View style={styles.content}>
        <Title style={styles.sectionTitle}>Activity Categories</Title>
        {activities.map((activity, index) => (
          <TouchableOpacity key={index} style={styles.activityCard}>
            <Card style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <View style={styles.activityHeader}>
                  <Icon name={activity.icon} size={32} color="#6366f1" />
                  <View style={styles.activityInfo}>
                    <Title style={styles.activityTitle}>{activity.title}</Title>
                    <Paragraph style={styles.activityDescription}>
                      {activity.description}
                    </Paragraph>
                  </View>
                </View>
                <View style={styles.activityMeta}>
                  <Chip mode="outlined" style={styles.chip}>
                    {activity.difficulty}
                  </Chip>
                  <Chip mode="outlined" style={styles.chip}>
                    {activity.duration}
                  </Chip>
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}

        <Card style={styles.featuresCard}>
          <Card.Content>
            <Title style={styles.featuresTitle}>App Features to Support OT Tasks</Title>
            <Paragraph style={styles.featuresSubtitle}>
              Our app enhances the OT experience with these supportive features:
            </Paragraph>
            
            {appFeatures.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Icon name="check-circle" size={20} color="#10b981" />
                <View style={styles.featureText}>
                  <Paragraph style={styles.featureName}>{feature.name}</Paragraph>
                  <Paragraph style={styles.featureDescription}>
                    {feature.description}
                  </Paragraph>
                </View>
              </View>
            ))}
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
    backgroundColor: '#6366f1',
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
  sectionTitle: {
    marginBottom: 16,
    color: '#374151',
    fontSize: 20,
  },
  activityCard: {
    marginBottom: 12,
  },
  card: {
    elevation: 2,
  },
  cardContent: {
    padding: 16,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  activityInfo: {
    flex: 1,
    marginLeft: 12,
  },
  activityTitle: {
    fontSize: 18,
    color: '#374151',
  },
  activityDescription: {
    color: '#6b7280',
    marginTop: 4,
  },
  activityMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    marginRight: 8,
  },
  featuresCard: {
    marginTop: 24,
    elevation: 2,
  },
  featuresTitle: {
    fontSize: 20,
    color: '#374151',
    marginBottom: 8,
  },
  featuresSubtitle: {
    color: '#6b7280',
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  featureText: {
    flex: 1,
    marginLeft: 8,
  },
  featureName: {
    fontWeight: 'bold',
    color: '#374151',
  },
  featureDescription: {
    color: '#6b7280',
    fontSize: 12,
  },
});
