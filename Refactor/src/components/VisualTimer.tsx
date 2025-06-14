import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// If you see this error, install react-native-svg:
// npm install react-native-svg

const TIMER_DURATION = 15 * 60; // 15 minutes in seconds
const RADIUS = 45;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const VisualTimer: React.FC = () => {
  const [secondsLeft, setSecondsLeft] = useState(TIMER_DURATION);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (running && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (!running && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  useEffect(() => {
    if (secondsLeft === 0 && intervalRef.current) {
      clearInterval(intervalRef.current);
      setRunning(false);
    }
  }, [secondsLeft]);

  const resetTimer = () => {
    setSecondsLeft(TIMER_DURATION);
    setRunning(false);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const percent = 1 - secondsLeft / TIMER_DURATION;
  const strokeDashoffset = CIRCUMFERENCE * (1 - percent);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Visual Timer</Text>
      <View style={styles.visuals}>
        <MaterialCommunityIcons name="timer-sand" size={48} color="#f59e0b" style={{ marginRight: 24 }} />
        <View style={styles.clockContainer}>
          <Svg width={110} height={110}>
            <Circle
              cx={55}
              cy={55}
              r={RADIUS}
              stroke="#f3f4f6"
              strokeWidth={8}
              fill="none"
            />
            <Circle
              cx={55}
              cy={55}
              r={RADIUS}
              stroke="#f59e0b"
              strokeWidth={8}
              fill="none"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              rotation="-90"
              origin="55,55"
            />
          </Svg>
          <Text style={styles.clockText}>{minutes}:{seconds.toString().padStart(2, '0')}</Text>
          <Text style={styles.clockLabel}>15 MIN</Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={() => setRunning(!running)}>
          <Text style={styles.buttonText}>{running ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resetTimer}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 24,
    backgroundColor: '#fff7ed',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f59e0b',
    marginBottom: 12,
  },
  visuals: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  clockContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  clockText: {
    position: 'absolute',
    top: 38,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  clockLabel: {
    position: 'absolute',
    top: 68,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 12,
    color: '#6b7280',
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  button: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default VisualTimer;
