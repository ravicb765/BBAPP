typescriptreact
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Animated } from 'react-native'; // Import Animated
import Icon from 'react-native-vector-icons/MaterialIcons'; // Replace with your icon library import
import { ScheduleItem } from '../types/ScheduleTypes';

interface ScheduleItemProps {
  scheduleItem: ScheduleItem;
  icon?: string;
  color?: string;
  isCompleted?: boolean; // Make isCompleted optional for now as the prop is not always passed
  onPress?: () => void;
}

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
const ScheduleItem: React.FC<ScheduleItemProps> = ({ scheduleItem, icon, color, isCompleted = false, onPress }) => {
 const scaleAnim = useRef(new Animated.Value(1)).current; // Animated value for scale

  const activityTextStyle = [
    styles.activityText,
    // Apply color prop to activity text if provided and not completed
    color && !isCompleted ? { color: color } : {},
    isCompleted ? { color: 'gray' } : {},
  ];

  const iconColor = isCompleted ? 'gray' : (color || '#333'); // Determine icon color

 const checkmarkColor = 'green'; // Define checkmark color
 const completedTextColor = 'gray'; // Define completed text color


  const timeTextStyle = [
    styles.timeText,
    isCompleted ? { color: 'gray' } : {},
  ];

  const containerStyle = [
    styles.container, // Apply base container styles
    {
      backgroundColor: isCompleted ? '#e0e0e0' : '#ffffff', // White background for active items
 borderColor: isCompleted ? '#e0e0e0' : (color || '#cccccc'), // Use color for border
      borderWidth: 1, // Add border
      shadowColor: "#000", // Add subtle shadow
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    }, // Enhanced completed background
 isCompleted ? { marginLeft: '100%' } : {}, // Attempting slide-out
  ];

  useEffect(() => {
    LayoutAnimation.easeInEaseOut();
  }, [isCompleted]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
 <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Animated.View style={[containerStyle, { transform: [{ scale: scaleAnim }] }]}>
 {/* Icon */}
 <View style={styles.leftContent}>
 {icon && (
 <View style={styles.iconContainer}>
 <Icon
 name={icon}
 size={24} // Slightly smaller icon
 color={iconColor} // Use calculated icon color
 />
 </View>
 )}
 {/* Time and Activity */}
 <View style={styles.textContainer}>
 <Text style={timeTextStyle}>{scheduleItem.time}</Text>
 <Text style={activityTextStyle} numberOfLines={1} ellipsizeMode="tail">{scheduleItem.activity}</Text>
 </View>
 </View>

 {/* Completion Indicators */}
 <View style={styles.rightContent}>
          {isCompleted && <Text style={[styles.checkmarkPlaceholder, { color: checkmarkColor }]}>✓ </Text>}
          {isCompleted && <Text style={[styles.completedText, { color: completedTextColor }]}>Completed</Text>}
 </View>
        </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12, // Increased padding for larger touch target
    paddingHorizontal: 15, // Keep horizontal padding
    marginVertical: 4, // Add vertical margin for separation
    borderRadius: 8, // Rounded corners
    // Removed borderBottom - using full border now
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8, // Reduced space
  },
  iconContainer: {
    marginRight: 12, // Increased space after icon
    justifyContent: 'center',
    alignItems: 'center',
  },
 textContainer: {
    flex: 1, // Allow text to take up remaining space
    flexDirection: 'row', // Arrange time and activity horizontally
    alignItems: 'center',
    overflow: 'hidden', // Hide overflowing text
  },
  leftContent: {
    flex: 1, // Allow left content to take available space
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10, // Add space between text and completion indicators
 },
  checkmarkPlaceholder: {
    fontSize: 20, // Checkmark size
    // Color is set dynamically
  },
  activityText: {
    fontSize: 16,
    flexShrink: 1, // Allow text to shrink if needed
  },
  completedText: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 5,
  },
});


export default ScheduleItem;