import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Pressable, Text } from 'react-native';
import { Card, Title, Paragraph, Button, SegmentedButtons } from 'react-native-paper';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Assuming you are using MaterialIcons

export default function BreathingExercisesScreen() {  
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale'); // Added 'pause' phase
  const scaleValue = useRef(new Animated.Value(1)).current; // Use useRef for Animated value
  const [timeLeft, setTimeLeft] = useState(4);
  const [selectedTechnique, setSelectedTechnique] = useState('box'); // State for selected technique
  const soundInstances = useRef<{ inhale?: Sound, hold?: Sound, exhale?: Sound }>({});
  const [bubbles, setBubbles] = useState<any[]>([]); // State to manage bubbles

  // Load sounds when component mounts
  useEffect(() => {
    Sound.setCategory('Playback');

    const inhaleSound = new Sound('inhale.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the inhale sound', error);
        return;
      }
      soundInstances.current.inhale = inhaleSound;
    });

    const holdSound = new Sound('hold.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) console.log('failed to load the hold sound', error);
      soundInstances.current.hold = holdSound;
    });

    const exhaleSound = new Sound('exhale.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) console.log('failed to load the exhale sound', error);
      soundInstances.current.exhale = exhaleSound;
    });

    return () => {
      // Release sounds when component unmounts
      Object.values(soundInstances.current).forEach(sound => sound?.release());
    };
  }, []); // Empty dependency array means this effect runs once on mount

  // Function to add a new bubble
  const addBubble = () => {
    const newBubble = {
      id: Date.now() + Math.random(), // Unique ID
      translateY: new Animated.Value(0), // Start at current position
      opacity: new Animated.Value(1), // Start fully visible
    };
    setBubbles(prevBubbles => [...prevBubbles, newBubble]);

    // Start bubble animation
    Animated.parallel([
      Animated.timing(newBubble.translateY, {
        toValue: -300, // Move upwards
        duration: 6000, // Animation duration
        useNativeDriver: true,
      }),
      Animated.timing(newBubble.opacity, { toValue: 0, duration: 5000, useNativeDriver: true, delay: 1000 }), // Fade out
    ]).start(() => { setBubbles(prevBubbles => prevBubbles.filter(bubble => bubble.id !== newBubble.id)); }); // Remove bubble after animation
  };

  // Breathing cycle logic
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isActive) {
      timer = setTimeout(() => {
        // Move to the next phase after the current time is up
        let nextPhase: 'inhale' | 'hold' | 'exhale' | 'pause';
        let nextTime: number;

        if (selectedTechnique === 'box') {
          if (phase === 'inhale') {
            nextPhase = 'hold';
            nextTime = 4;
          } else if (phase === 'hold') {
            nextPhase = 'exhale';
            nextTime = 4;
          } else if (phase === 'exhale') {
            nextPhase = 'pause'; // Add a pause between cycles for box breathing
            nextTime = 4;
          } else { // phase === 'pause'
            nextPhase = 'inhale';
            nextTime = 4;
          }
        } else if (selectedTechnique === '478') {
           if (phase === 'inhale') {
             nextPhase = 'hold';
             nextTime = 7;
           } else if (phase === 'hold') {
             nextPhase = 'exhale';
             nextTime = 8;
           } else { // phase === 'exhale'
             nextPhase = 'inhale';
             nextTime = 4;
           }
        } else { // selectedTechnique === 'bubble' (simplified for now)
           if (phase === 'exhale' && isActive) addBubble(); // Generate bubble on exhale
          if (phase === 'inhale') {
            nextPhase = 'exhale';
            nextTime = 6; // Longer exhale for bubble
          } else { // phase === 'exhale'
             nextPhase = 'inhale';
             nextTime = 4;
           }
        }

        setPhase(nextPhase);
        setTimeLeft(nextTime);

        // Play sound based on the next phase
        if (soundInstances.current[nextPhase]) {
          soundInstances.current[nextPhase]?.play();
        }
      }, timeLeft * 1000); // Timer based on time left in the current phase
    }

    return () => clearTimeout(timer);
  }, [isActive, phase, timeLeft, selectedTechnique]); // Added selectedTechnique to dependencies

  // Countdown timer
  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;

    if (isActive && phase !== 'pause') { // Don't countdown during pause
      countdownInterval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval); // Clear countdown when done
            return 0; // Reset time left for next phase
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(countdownInterval);
  }, [isActive, phase]);

  // Animation logic
  useEffect(() => {
    if (isActive) {
      if (selectedTechnique === 'box' || selectedTechnique === '478') {
        if (phase === 'inhale') {
          Animated.timing(scaleValue, {
            toValue: selectedTechnique === 'box' ? 1.5 : 1.3, // Slightly smaller scale for 4-7-8
            duration: selectedTechnique === 'box' ? 4000 : 4000,
            useNativeDriver: true,
          }).start();
        } else if (phase === 'exhale') {
          Animated.timing(scaleValue, {
            toValue: 1,
            duration: selectedTechnique === 'box' ? 4000 : 8000, // Longer exhale for 4-7-8
            useNativeDriver: true,
          }).start();
        } else if (phase === 'hold' || phase === 'pause') { // Hold animation (no scaling)
           Animated.timing(scaleValue, {
 toValue: scaleValue._value, // Keep current scale
 duration: 0, // No animation
 useNativeDriver: true,
           }).start();
        }
      } else if (selectedTechnique === 'bubble') {
         // Implement bubble animation logic here (more complex, might need a separate component)
         // For now, maybe a subtle pulsing or just instructions
      }
    } else { // Reset animation when not active
      scaleValue.setValue(1);
    }
  }, [phase, isActive, selectedTechnique]); // Added selectedTechnique to dependencies


  const startExercise = () => {
    setIsActive(true);
    // Initialize phase and time based on the selected technique
    if (selectedTechnique === 'box') {
 setSelectedPhase('inhale');
 setTimeLeft(4);
    } else if (selectedTechnique === '478') {
      setPhase('inhale');
      setTimeLeft(4);
    } else if (selectedTechnique === 'bubble') {  
       setPhase('inhale'); // Start with inhale for bubble
       setTimeLeft(4);
    }
  };

  const stopExercise = () => {
    setIsActive(false);
    setPhase('inhale');
    setTimeLeft(selectedTechnique === 'box' || selectedTechnique === '478' ? 4 : 4); // Reset time based on technique start
    scaleValue.setValue(1); // Reset animation
  };

  const getInstructionText = () => {
    if (!isActive && selectedTechnique === 'box') return 'Start Box Breathing';
     if (!isActive && selectedTechnique === '478') return 'Start 4-7-8 Breathing';
      if (!isActive && selectedTechnique === 'bubble') return 'Start Bubble Breathing';

    switch (phase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
      case 'pause':
         return 'Pause'; // Instruction for pause phase
 default:
 return 'Ready';
    }
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale':
        return '#3b82f6'; // Blue
      case 'hold':
        return '#f59e0b'; // Yellow/Orange
      case 'exhale':
        return '#10b981'; // Green
      case 'pause':
         return '#6b7280'; // Gray for pause
 default:
 return '#6b7280';
    }
  };

  const getBreathingShape = () => {
    if (selectedTechnique === 'box') {
      return (
         <Animated.View
           style={[
             styles.breathingShape, // Use a common style name
             styles.breathingSquare, // Specific style for square
             {
               backgroundColor: getPhaseColor(),
               transform: [{ scale: scaleValue }]
             }
           ]}
         >
           {/* You might add a number or text inside later */}
         </Animated.View>
      );
    } else if (selectedTechnique === '478') {
      return (
         <Animated.View
           style={[
             styles.breathingShape, // Use a common style name
             styles.breathingCircle, // Specific style for circle
             {
               backgroundColor: getPhaseColor(),
               transform: [{ scale: scaleValue }]
             }
           ]}
         >
           {/* You might add a number or text inside later */}
         </Animated.View>
      );
    } else if (selectedTechnique === 'bubble') {
      return (
         <View style={styles.bubblePlaceholder}>
           {bubbles.map(bubble => (
              <Animated.View
                 key={bubble.id}
                 style={[
                   styles.bubble,
                   {
                     transform: [{ translateY: bubble.translateY }],
                     opacity: bubble.opacity,
                   },
                 ]}
              />
           ))}
           {/* You might add a static image or guide here */}
           <Paragraph style={styles.bubbleText}>Imagine blowing bubbles slowly and evenly</Paragraph>

         </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {/* Technique Selection */}
      <View style={styles.techniqueSelectionContainer}>
        <SegmentedButtons
          value={selectedTechnique}
          onValueChange={(value) => {
            setSelectedTechnique(value);
            stopExercise(); // Stop current exercise when changing technique
          }}
          buttons={[
            { value: 'box', label: 'Box' },
            { value: '478', label: '4-7-8' },
            { value: 'bubble', label: 'Bubble' },
          ]}
        />
      </View>
      <View style={styles.header}>
        <Icon name="air" size={48} color="white" />
        <Title style={styles.title}>Breathing Exercises</Title>
        <Paragraph style={styles.subtitle}>
          Calm your mind with guided breathing
        </Paragraph>
      </View>

      <View style={styles.content}>
        {/* Exercise Card */}
        <Card style={styles.exerciseCard}>
          <Card.Content style={styles.exerciseContent}>
            <Title style={styles.exerciseTitle}>
              {selectedTechnique === 'box' ? 'Box Breathing (4-4-4-4)' : 
               selectedTechnique === '478' ? '4-7-8 Breathing' :
               'Bubble Breathing'}
            </Title>
            <Paragraph style={styles.exerciseDescription}>
              {selectedTechnique === 'box' ? 'Breathe in for 4, hold for 4, breathe out for 4, hold for 4' : 
               selectedTechnique === '478' ? 'Breathe in for 4, hold for 7, breathe out for 8' :
               'Imagine blowing bubbles slowly and evenly'}
            </Paragraph>

            <View style={styles.breathingContainer}>
              {getBreathingShape()}

              <View style={styles.instructionContainer}>
                <Title style={[styles.instruction, { color: getPhaseColor() }]}>
                  {getInstructionText()}
                </Title>
                {isActive && phase !== 'pause' && ( // Only show timer during active phases (not pause)
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

        {/* Benefits Card */}
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

        {/* Tips Card */}
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
  techniqueSelectionContainer: {
    paddingHorizontal: 16,
 marginTop: 16, // Adjust spacing as needed
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
  breathingShape: { // Common style for breathing shapes
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
     shadowOpacity: 0.3,
     shadowRadius: 6,
     elevation: 8,
  },
  breathingSquare: { // Specific style for the square
    width: 120,
    height: 120,
    borderRadius: 10, // Slightly rounded corners for the square
  },
  breathingCircle: { // Specific style for the circle (4-7-8)
    width: 120,
 height: 120,
 borderRadius: 60,
  },
  bubblePlaceholder: { // Style for bubble placeholder
    alignItems: 'center',
    marginBottom: 24,
  },
  bubbleText: {
    position: 'absolute', // Position text over bubbles
    bottom: -40, // Adjust as needed
    left: 0,
    right: 0,
    zIndex: 1, // Ensure text is above bubbles
    backgroundColor: 'transparent', // Make text background transparent

    marginTop: 8,
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
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
  bubble: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(59, 130, 246, 0.5)', // Semi-transparent blue
    position: 'absolute', // Position bubbles absolutely
    bottom: 0, // Start from the bottom
  },
});

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Pressable, Text } from 'react-native';
import { Card, Title, Paragraph, Button, SegmentedButtons } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function BreathingExercisesScreen() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [scaleValue] = useState(new Animated.Value(1));
  const [timeLeft, setTimeLeft] = useState(4);
  const [selectedTechnique, setSelectedTechnique] = useState('box'); // State for selected technique

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
      {/* Technique Selection */}
      <View style={styles.techniqueSelectionContainer}>
        <SegmentedButtons
          value={selectedTechnique}
          onValueChange={setSelectedTechnique}
          buttons={[
            { value: 'box', label: 'Box' },
            { value: '478', label: '4-7-8' },
            { value: 'bubble', label: 'Bubble' },
          ]}
        />
      </View>
      <View style={styles.header}>
        <Icon name="air" size={48} color="white" />
        <Title style={styles.title}>Breathing Exercises</Title>
        <Paragraph style={styles.subtitle}>
          Calm your mind with guided breathing
        </Paragraph>
      </View>

      <View style={styles.content}>
        {/* Conditional Rendering based on selectedTechnique */}
        {selectedTechnique === 'box' && (
          <Card style={styles.exerciseCard}>
            <Card.Content style={styles.exerciseContent}>
              <Title style={styles.exerciseTitle}>Box Breathing (4-4-4-4)</Title>
              <Paragraph style={styles.exerciseDescription}>
                Breathe in for 4 seconds, hold for 4, breathe out for 4, hold for 4
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
                  <Icon name="square" size={40} color="white" /> {/* Changed icon to square */}
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
                  </Paragraph>
                )}
              </View>
            </Card.Content>
          </Card>
        )}

        {/* Placeholder for 4-7-8 Breathing */}
        {selectedTechnique === '478' && (
          <View><Text>4-7-8 Breathing UI and Logic Here</Text></View>
        )}

        {/* Placeholder for Bubble Breathing */}
        {selectedTechnique === 'bubble' && (
          <View><Text>Bubble Breathing UI and Logic Here</Text></View>
        )}

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
  techniqueSelectionContainer: {
    paddingHorizontal: 16,
    marginTop: 16, // Adjust spacing as needed
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
