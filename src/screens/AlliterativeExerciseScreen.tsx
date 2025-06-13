
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, TextInput, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function AlliterativeExerciseScreen() {
  const [selectedLetter, setSelectedLetter] = useState('B');
  const [generatedRoutine, setGeneratedRoutine] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const letters = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'W'];
  
  const sampleRoutines = {
    B: ['Bounce like a Ball', 'Bend and Breathe', 'Balance on one Foot', 'Box with your hands', 'Butterfly your arms'],
    S: ['Stretch to the Sky', 'Stomp your feet Softly', 'Swing your arms Smoothly', 'Stand Still and Smile', 'Step Side to Side'],
    T: ['Touch your Toes', 'Twist your Torso', 'Take Tiny steps', 'Turn in a circle Twice', 'Tap your head Tenderly'],
  };

  const generateRoutine = async () => {
    setIsGenerating(true);
    // Simulate AI generation delay
    setTimeout(() => {
      const routine = sampleRoutines[selectedLetter as keyof typeof sampleRoutines] || [
        `${selectedLetter}ounce like a ball`,
        `${selectedLetter}end and stretch`,
        `${selectedLetter}alance on one foot`,
        `${selectedLetter}ox with your hands`,
        `${selectedLetter}reathe deeply`,
      ];
      setGeneratedRoutine(routine);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="fitness-center" size={48} color="white" />
        <Title style={styles.title}>Alliterative Exercise</Title>
        <Paragraph style={styles.subtitle}>
          Fun workouts that boost language, memory, and movement!
        </Paragraph>
      </View>

      <View style={styles.content}>
        <Card style={styles.generatorCard}>
          <Card.Content>
            <Title style={styles.generatorTitle}>Create Your Routine</Title>
            <Paragraph style={styles.generatorDescription}>
              Choose a letter to generate alliterative exercises that help with speech, coordination, and memory.
            </Paragraph>

            <View style={styles.letterSelection}>
              <Paragraph style={styles.selectionLabel}>Select a letter:</Paragraph>
              <View style={styles.letterGrid}>
                {letters.map((letter) => (
                  <Chip
                    key={letter}
                    mode={selectedLetter === letter ? 'flat' : 'outlined'}
                    selected={selectedLetter === letter}
                    onPress={() => setSelectedLetter(letter)}
                    style={styles.letterChip}
                    textStyle={styles.letterChipText}
                  >
                    {letter}
                  </Chip>
                ))}
              </View>
            </View>

            <Button
              mode="contained"
              onPress={generateRoutine}
              loading={isGenerating}
              style={styles.generateButton}
              icon="auto-awesome"
            >
              {isGenerating ? 'Generating...' : 'Generate Routine'}
            </Button>
          </Card.Content>
        </Card>

        {generatedRoutine.length > 0 && (
          <Card style={styles.routineCard}>
            <Card.Content>
              <Title style={styles.routineTitle}>
                Your "{selectedLetter}" Routine
              </Title>
              <Paragraph style={styles.routineDescription}>
                Follow these alliterative exercises in order:
              </Paragraph>

              {generatedRoutine.map((exercise, index) => (
                <View key={index} style={styles.exerciseItem}>
                  <View style={styles.exerciseNumber}>
                    <Paragraph style={styles.exerciseNumberText}>
                      {index + 1}
                    </Paragraph>
                  </View>
                  <View style={styles.exerciseContent}>
                    <Paragraph style={styles.exerciseText}>
                      {exercise}
                    </Paragraph>
                  </View>
                  <Icon name="check-circle-outline" size={24} color="#10b981" />
                </View>
              ))}

              <View style={styles.routineActions}>
                <Button
                  mode="outlined"
                  style={styles.routineActionButton}
                  icon="refresh"
                  onPress={generateRoutine}
                >
                  New Routine
                </Button>
                <Button
                  mode="contained"
                  style={styles.routineActionButton}
                  icon="play-arrow"
                >
                  Start Routine
                </Button>
              </View>
            </Card.Content>
          </Card>
        )}

        <Card style={styles.benefitsCard}>
          <Card.Content>
            <Title style={styles.benefitsTitle}>Benefits of Alliterative Exercise</Title>
            <View style={styles.benefitsList}>
              <View style={styles.benefit}>
                <Icon name="record-voice-over" size={20} color="#6366f1" />
                <Paragraph style={styles.benefitText}>
                  Improves speech and articulation
                </Paragraph>
              </View>
              <View style={styles.benefit}>
                <Icon name="memory" size={20} color="#10b981" />
                <Paragraph style={styles.benefitText}>
                  Enhances memory and recall
                </Paragraph>
              </View>
              <View style={styles.benefit}>
                <Icon name="directions-run" size={20} color="#f59e0b" />
                <Paragraph style={styles.benefitText}>
                  Promotes physical coordination
                </Paragraph>
              </View>
              <View style={styles.benefit}>
                <Icon name="school" size={20} color="#8b5cf6" />
                <Paragraph style={styles.benefitText}>
                  Supports language learning
                </Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.tipsCard}>
          <Card.Content>
            <Title style={styles.tipsTitle}>Exercise Tips</Title>
            <View style={styles.tip}>
              <Icon name="volume-up" size={20} color="#ef4444" />
              <Paragraph style={styles.tipText}>
                Say each action out loud as you do it
              </Paragraph>
            </View>
            <View style={styles.tip}>
              <Icon name="repeat" size={20} color="#ef4444" />
              <Paragraph style={styles.tipText}>
                Repeat each exercise 3-5 times
              </Paragraph>
            </View>
            <View style={styles.tip}>
              <Icon name="emoji-emotions" size={20} color="#ef4444" />
              <Paragraph style={styles.tipText}>
                Have fun and be creative with movements
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
    backgroundColor: '#f59e0b',
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
  generatorCard: {
    elevation: 4,
    marginBottom: 16,
  },
  generatorTitle: {
    fontSize: 20,
    color: '#374151',
    marginBottom: 8,
  },
  generatorDescription: {
    color: '#6b7280',
    marginBottom: 20,
  },
  letterSelection: {
    marginBottom: 20,
  },
  selectionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 12,
  },
  letterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  letterChip: {
    marginBottom: 8,
  },
  letterChipText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  generateButton: {
    backgroundColor: '#f59e0b',
    paddingVertical: 8,
  },
  routineCard: {
    elevation: 2,
    marginBottom: 16,
    backgroundColor: '#fef3c7',
  },
  routineTitle: {
    fontSize: 20,
    color: '#92400e',
    marginBottom: 8,
  },
  routineDescription: {
    color: '#a16207',
    marginBottom: 16,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  exerciseNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f59e0b',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  exerciseNumberText: {
    color: 'white',
    fontWeight: 'bold',
  },
  exerciseContent: {
    flex: 1,
  },
  exerciseText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  routineActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  routineActionButton: {
    flex: 1,
  },
  benefitsCard: {
    elevation: 2,
    marginBottom: 16,
  },
  benefitsTitle: {
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
