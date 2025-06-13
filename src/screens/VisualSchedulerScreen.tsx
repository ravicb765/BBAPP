
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function VisualSchedulerScreen() {
  const [firstTask, setFirstTask] = useState({
    text: 'Brush teeth',
    icon: 'https://placehold.co/96x96/e0e7ff/6366f1?text=🦷'
  });

  const [thenTask, setThenTask] = useState({
    text: 'Get dressed',
    icon: 'https://placehold.co/96x96/fef3c7/f59e0b?text=👔'
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="schedule" size={48} color="white" />
        <Title style={styles.title}>Visual Scheduler</Title>
        <Paragraph style={styles.subtitle}>
          Create first-then boards to organize your day
        </Paragraph>
      </View>

      <View style={styles.content}>
        <Card style={styles.schedulerCard}>
          <Card.Content>
            <Title style={styles.boardTitle}>My First-Then Board</Title>
            <Paragraph style={styles.boardDescription}>
              Break down your activities into simple steps. Here's an example for starting the day!
            </Paragraph>

            <View style={styles.tasksContainer}>
              {/* First Task */}
              <View style={styles.taskSection}>
                <Card style={styles.taskCard}>
                  <Card.Content style={styles.taskContent}>
                    <Title style={styles.taskLabel}>First</Title>
                    <View style={styles.taskIconContainer}>
                      <Image 
                        source={{ uri: firstTask.icon }} 
                        style={styles.taskIcon}
                        resizeMode="cover"
                      />
                    </View>
                    <TextInput
                      value={firstTask.text}
                      onChangeText={(text) => setFirstTask({...firstTask, text})}
                      style={styles.taskInput}
                      mode="outlined"
                      dense
                    />
                  </Card.Content>
                </Card>
              </View>

              {/* Arrow */}
              <View style={styles.arrowContainer}>
                <Icon name="arrow-forward" size={32} color="#6366f1" />
              </View>

              {/* Then Task */}
              <View style={styles.taskSection}>
                <Card style={styles.taskCard}>
                  <Card.Content style={styles.taskContent}>
                    <Title style={styles.taskLabel}>Then</Title>
                    <View style={styles.taskIconContainer}>
                      <Image 
                        source={{ uri: thenTask.icon }} 
                        style={styles.taskIcon}
                        resizeMode="cover"
                      />
                    </View>
                    <TextInput
                      value={thenTask.text}
                      onChangeText={(text) => setThenTask({...thenTask, text})}
                      style={styles.taskInput}
                      mode="outlined"
                      dense
                    />
                  </Card.Content>
                </Card>
              </View>
            </View>

            <View style={styles.actions}>
              <Button 
                mode="contained" 
                style={styles.actionButton}
                icon="refresh"
              >
                Reset Board
              </Button>
              <Button 
                mode="outlined" 
                style={styles.actionButton}
                icon="save"
              >
                Save Schedule
              </Button>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.tipsCard}>
          <Card.Content>
            <Title style={styles.tipsTitle}>Tips for Using Visual Schedules</Title>
            <View style={styles.tip}>
              <Icon name="lightbulb" size={20} color="#f59e0b" />
              <Paragraph style={styles.tipText}>
                Use pictures that your child can easily recognize
              </Paragraph>
            </View>
            <View style={styles.tip}>
              <Icon name="lightbulb" size={20} color="#f59e0b" />
              <Paragraph style={styles.tipText}>
                Keep it simple with 2-3 steps maximum
              </Paragraph>
            </View>
            <View style={styles.tip}>
              <Icon name="lightbulb" size={20} color="#f59e0b" />
              <Paragraph style={styles.tipText}>
                Review the schedule together before starting
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
  schedulerCard: {
    elevation: 4,
    marginBottom: 16,
  },
  boardTitle: {
    fontSize: 24,
    color: '#6366f1',
    textAlign: 'center',
    marginBottom: 8,
  },
  boardDescription: {
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: 24,
  },
  tasksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  taskSection: {
    flex: 1,
  },
  taskCard: {
    elevation: 2,
    backgroundColor: '#fafafa',
  },
  taskContent: {
    alignItems: 'center',
    padding: 16,
  },
  taskLabel: {
    fontSize: 18,
    color: '#f59e0b',
    marginBottom: 12,
  },
  taskIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#f59e0b',
  },
  taskIcon: {
    width: '100%',
    height: '100%',
  },
  taskInput: {
    width: '100%',
    fontSize: 14,
  },
  arrowContainer: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
  },
  actionButton: {
    flex: 1,
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
