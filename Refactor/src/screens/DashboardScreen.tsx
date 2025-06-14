
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function DashboardScreen() {
  const navigation = useNavigation();

  const quickActions = [
    { title: 'Visual Scheduler', subtitle: 'Plan your day', screen: 'Scheduler' },
    { title: 'Calm Corner', subtitle: 'Relax and unwind', screen: 'Calm Corner' },
    { title: 'OT Activities', subtitle: 'Skill building tasks', screen: 'OT Activities' },
    { title: 'Yoga Zone', subtitle: 'Mindful movement', screen: 'Yoga Zone' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Welcome Back!</Title>
        <Paragraph style={styles.subtitle}>
          Ready for today's activities?
        </Paragraph>
      </View>

      <View style={styles.quickActions}>
        <Title style={styles.sectionTitle}>Quick Actions</Title>
        {quickActions.map((action, index) => (
          <Card key={index} style={styles.actionCard}>
            <Card.Content>
              <Title style={styles.cardTitle}>{action.title}</Title>
              <Paragraph>{action.subtitle}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button 
                mode="contained" 
                onPress={() => navigation.navigate(action.screen as never)}
              >
                Open
              </Button>
            </Card.Actions>
          </Card>
        ))}
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
    padding: 20,
    backgroundColor: '#6366f1',
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'white',
    opacity: 0.9,
  },
  quickActions: {
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 16,
    color: '#374151',
  },
  actionCard: {
    marginBottom: 12,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    color: '#374151',
  },
});
