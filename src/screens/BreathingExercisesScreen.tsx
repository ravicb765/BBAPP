
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function BreathingExercisesScreen() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [scaleValue] = useState(new Animated.Value(1));
  const [timeLeft, setTimeLeft] = useState(4);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Move to next phase
            if (phase === 'inhale') {
              setPhase('hold');
              return 2; // Hold for 2 seconds
            } else if (phase === 'hold') {
              setPhase('exhale');
              return 4; // Exhale for 4 seconds
            } else {
              setPhase('inhale');
              return 4; // Inhale for 4 seconds
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, phase]);

  useEffect(() => {
    if (isActive) {
      if (phase === 'inhale') {
        Animated.timing(scaleValue, {
          toValue: 1.5,
          duration: 4000,
          useNativeDriver: true,
        }).start();
      } else if (phase === 'exhale') {
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }).start();
      }
    }
  }, [phase, isActive]);

  const startExercise = () => {
    setIsActive(true);
    setPhase('inhale');
    setTimeLeft(4);
  };

  const stopExercise = () => {
    setIsActive(false);
    setPhase('inhale');
    setTimeLeft(4);
    scaleValue.setValue(1);
  };

  const getInstructionText = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
      default:
        return 'Ready to Begin';
    }
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale':
        return '#3b82f6';
      case 'hold':
        return '#f59e0b';
      case 'exhale':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="air" size={48} color="white" />
        <Title style={styles.title}>Breathing Exercises</Title>
        <Paragraph style={styles.subtitle}>
          Calm your mind with guided breathing
        </Paragraph>
      </View>

      <View style={styles.content}>
        <Card style={styles.exerciseCard}>
          <Card.Content style={styles.exerciseContent}>
            <Title style={styles.exerciseTitle}>4-2-4 Breathing</Title>
            <Paragraph style={styles.exerciseDescription}>
              Breathe in for 4 seconds, hold for 2 seconds, breathe out for 4 seconds
            </Paragraph>

            <View style={styles.breathingContainer}>
              <Animated.View 
                style={[
                  styles.breathingCircle,
                  { 
                    backgroundColor: getPhaseColor(),
                    transform: [{ scale: scaleValue }]
                  }
                ]}
              >
                <Icon name="favorite" size={40} color="white" />
              </Animated.View>
              
              <View style={styles.instructionContainer}>
                <Title style={[styles.instruction, { color: getPhaseColor() }]}>
                  {getInstructionText()}
                </Title>
                {isActive && (
                  <Paragraph style={styles.timer}>
                    {timeLeft}
                  </Paragraph>
                )}
              </View>
            </View>

            <View style={styles.controls}>
              {!isActive ? (
                <Button 
                  mode="contained" 
                  style={[styles.controlButton, { backgroundColor: '#3b82f6' }]}
                  onPress={startExercise}
                  icon="play-arrow"
                >
                  Start Exercise
                </Button>
              ) : (
                <Button 
                  mode="contained" 
                  style={[styles.controlButton, { backgroundColor: '#ef4444' }]}
                  onPress={stopExercise}
                  icon="stop"
                >
                  Stop Exercise
                </Button>
              )}
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.benefitsCard}>
          <Card.Content>
            <Title style={styles.benefitsTitle}>Benefits of Breathing Exercises</Title>
            <View style={styles.benefitsList}>
              <View style={styles.benefit}>
                <Icon name="psychology" size={20} color="#6366f1" />
                <Paragraph style={styles.benefitText}>
                  Reduces anxiety and stress
                </Paragraph>
              </View>
              <View style={styles.benefit}>
                <Icon name="favorite" size={20} color="#ef4444" />
                <Paragraph style={styles.benefitText}>
                  Lowers heart rate and blood pressure
                </Paragraph>
              </View>
              <View style={styles.benefit}>
                <Icon name="visibility" size={20} color="#10b981" />
                <Paragraph style={styles.benefitText}>
                  Improves focus and concentration
                </Paragraph>
              </View>
              <View style={styles.benefit}>
                <Icon name="bedtime" size={20} color="#8b5cf6" />
                <Paragraph style={styles.benefitText}>
                  Promotes better sleep quality
                </Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.tipsCard}>
          <Card.Content>
            <Title style={styles.tipsTitle}>Tips for Better Breathing</Title>
            <View style={styles.tip}>
              <Icon name="info" size={20} color="#f59e0b" />
              <Paragraph style={styles.tipText}>
                Find a comfortable, quiet place to practice
              </Paragraph>
            </View>
            <View style={styles.tip}>
              <Icon name="info" size={20} color="#f59e0b" />
              <Paragraph style={styles.tipText}>
                Breathe through your nose when possible
              </Paragraph>
            </View>
            <View style={styles.tip}>
              <Icon name="info" size={20} color="#f59e0b" />
              <Paragraph style={styles.tipText}>
                Practice regularly for best results
              </Paragraph>
            </View>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 24,
    backgroundColor: '#3b82f6',
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
    flex: 1,
    padding: 16,
  },
  exerciseCard: {
    elevation: 4,
    marginBottom: 16,
  },
  exerciseContent: {
    alignItems: 'center',
    padding: 24,
  },
  exerciseTitle: {
    fontSize: 24,
    color: '#374151',
    marginBottom: 8,
  },
  exerciseDescription: {
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: 32,
  },
  breathingContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  breathingCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  instructionContainer: {
    alignItems: 'center',
  },
  instruction: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  timer: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#374151',
    marginTop: 8,
  },
  controls: {
    width: '100%',
  },
  controlButton: {
    paddingVertical: 8,
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
