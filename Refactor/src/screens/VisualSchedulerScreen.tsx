import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Text, Platform, Pressable, LayoutAnimation, UIManager, SectionList, TextStyle, ViewStyle } from 'react-native';
import { RenderItemParams } from 'react-native-draggable-flatlist'; // Keep import if you plan to re-integrate draggable later
import ScheduleItem from '../components/ScheduleItem'; // Import the ScheduleItem component
import { ScheduleItem as ScheduleItemType,  } from '../types/ScheduleTypes'; // Import the ScheduleItem interface
import { ScheduleContext } from '../context/ScheduleContext'; // Import ScheduleContext
import HapticFeedback from 'react-native-haptic-feedback';
import { HapticFeedbackTypes } from 'react-native-haptic-feedback';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android') {
  // @ts-ignore
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function VisualSchedulerScreen() {
  const { schedule, editScheduleItem, setSchedule } = useContext(ScheduleContext);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer); // Clean up the interval on unmount
  }, []);

  const handleToggleComplete = (item: ScheduleItemType) => {
    LayoutAnimation.configureNext({
      duration: 300, // Adjust duration as needed
      update: { type: LayoutAnimation.Types.easeInEaseOut },
    });
    const updatedItem = {
      ...item,
      isCompleted: !item.isCompleted,
    };
    editScheduleItem(updatedItem);
  };

  // Helper function to parse HH:mm time string into a Date object for today
  const parseTimeStringToDate = (timeString: string): Date => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const now = new Date();
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);
    return date;
  };

  // Sort schedule by time to easily determine current activity
  const sortedSchedule = [...schedule].sort((a, b) => {
    const timeA = parseTimeStringToDate(a.time).getTime();
    const timeB = parseTimeStringToDate(b.time).getTime();
    return timeA - timeB;
  });

  const renderItem = ({ item, index }: { item: ScheduleItemType, index: number }) => {
    // Determine if this is the current activity based on time
    const itemStartTime = parseTimeStringToDate(item.time);
    const nextItem = sortedSchedule[index + 1];
    const nextItemStartTime = nextItem ? parseTimeStringToDate(nextItem.time) : new Date(8640000000000000); // A date far in the future if it's the last item

    const isCurrentActivity = currentTime >= itemStartTime && currentTime < nextItemStartTime;

    // Trigger layout animation on completion status change (already in ScheduleItem)
    // useEffect(() => { // Moved this effect to ScheduleItem component
    //   LayoutAnimation.easeInEaseOut();
    // }, [item.isCompleted]);

    return (
      <View
        style={[
          styles.scheduleItemContainer,
          isCurrentActivity ? styles.currentActivityHighlight : null,
        ]}
      >
        {/* ScheduleItem component handles its own styling and completion animation */}
        <Pressable
          onPress={() => handleToggleComplete(item)}
          style={styles.scheduleItemContent}
        >
          <ScheduleItem scheduleItem={item} isCompleted={item.isCompleted} />
        </Pressable>
      </View>
    );
  };

  // Group schedule items by time of day
  const sections = React.useMemo(() => {
    const morning: ScheduleItemType[] = [];
    const afternoon: ScheduleItemType[] = [];
    const evening: ScheduleItemType[] = [];

    sortedSchedule.forEach(item => {
      const itemHour = parseTimeStringToDate(item.time).getHours();
      if (itemHour >= 6 && itemHour < 12) {
        morning.push(item);
      } else if (itemHour >= 12 && itemHour < 18) {
        afternoon.push(item);
      } else {
        evening.push(item);
      }
    });

    const sectionsData = [];
    if (morning.length > 0) {
      sectionsData.push({ title: 'Morning', data: morning });
    }
    if (afternoon.length > 0) {
      sectionsData.push({ title: 'Afternoon', data: afternoon });
    }
    if (evening.length > 0) {
      sectionsData.push({ title: 'Evening', data: evening });
    }

    return sectionsData;
  }, [sortedSchedule]); // Recalculate sections when sortedSchedule changes

  const renderSectionHeader = ({ section: { title } }: { section: { title: string } }) => (
    // You can add an icon here based on the title, e.g., using a mapping
    // const iconName = sectionIcons[title] || 'default-icon';
    // <Icon name={iconName} size={20} color="#333" style={{ marginRight: 8 }} />
    <View style={styles.sectionHeader}>
 {/* Optional: Add Icon here */}
 <Text style={styles.sectionTitle}>
        {title}
 </Text>
    </View>
  );

 // Ensure data is an array before passing to SectionList
 if (!Array.isArray(schedule)) {
  console.error("Schedule data is not an array:", schedule);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Error loading schedule data.</Text>
    </View>
  );
 }

   // Calculate time-based progress percentage
  const calculateTimeBasedProgress = (schedule: ScheduleItemType[], currentTime: Date): number => {
    if (!schedule || schedule.length === 0) {
      return 0; // No schedule, no progress
    }

    // Sort schedule by time (important for finding first and last)
    const sortedScheduleForProgress = [...schedule].sort((a, b) => {
      const timeA = parseTimeStringToDate(a.time).getTime();
      const timeB = parseTimeStringToDate(b.time).getTime();
      return timeA - timeB;
    });

    const firstItemTime = parseTimeStringToDate(sortedScheduleForProgress[0].time);
    const lastItemTime = parseTimeStringToDate(sortedScheduleForProgress[sortedScheduleForProgress.length - 1].time);

    // Handle schedules that span across midnight if necessary
    // For simplicity now, assuming schedules within a single day

    const scheduleDuration = lastItemTime.getTime() - firstItemTime.getTime(); // Duration in milliseconds
    const elapsedTime = currentTime.getTime() - firstItemTime.getTime(); // Elapsed time in milliseconds

    if (scheduleDuration <= 0) {
       return 0; // Handle cases with only one item or invalid times
    }

    let progress = (elapsedTime / scheduleDuration) * 100;
    progress = Math.max(0, Math.min(100, progress)); // Clamp progress between 0 and 100

    return progress;
  };

  const timeBasedProgressPercentage = calculateTimeBasedProgress(schedule, currentTime);

 return (
    // Removed GestureHandlerRootView as SectionList doesn't require it unless adding swiping or other gestures
    // <GestureHandlerRootView style={{ flex: 1 }}>
 <View style={styles.container}>
 {/* Progress Bar and Text Indicator */}
 <View style={styles.progressContainer}>
 {/* Progress bar based on completed items removed as requested to focus on sections// Pass scheduleItem and isCompleted*/}
           <View style={styles.progressBarContainer}>
             <View style={[styles.progressBar, { width: `${timeBasedProgressPercentage}%` }]} />
           </View>
           <Text style={styles.progressText}>
             {timeBasedProgressPercentage.toFixed(0)}%
           </Text>
 </View>

 <Text style={styles.heading}>My Daily Schedule</Text>

 {/* Replaced DraggableFlatList with SectionList */}
 <SectionList
        sections={sections} // Use the sections data
        renderItem={renderItem}
 renderSectionHeader={renderSectionHeader}
        keyExtractor={(item) => item.id.toString()} // Key extractor for items within sections
      />
 </View>
    // </GestureHandlerRootView>
 );
}

const styles = StyleSheet.create({
 container: {
 flex: 1,
 padding: 16,
 backgroundColor: '#fff', // Or any background color you prefer
  },
 heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressBarContainer: {
 flex: 1, // Allow the container to take up available space
 height: 12, // Reduced height
    backgroundColor: '#e0e0e0', // Light gray background
    borderRadius: 6, // Half of height for rounded ends
 overflow: 'hidden', // Ensure the progress bar stays within the container bounds
  },
 scheduleItemContainer: {
    marginBottom: 12, // Add margin to the bottom of each item container
  },
   scheduleItemContent: {
       flex: 1, // Ensure the content takes up available space within the Pressable
       padding: 12, // Add some padding inside the pressable area
       backgroundColor: '#f9f9f9', // Default background color for items
       borderRadius: 8,
        ...Platform.select({ // Add shadow for depth
           ios: {
             shadowColor: '#000',
             shadowOffset: { width: 0, height: 2 },
             shadowOpacity: 0.1,
             shadowRadius: 2,
           },
           android: { elevation: 2 },
         }),
   },
 progressBar: {
    height: '100%',
 backgroundColor: '#4CAF50', // Green progress bar
  },
  currentActivityHighlight: {
    borderColor: '#007BFF', // Example highlight color
    borderWidth: 2,
    // backgroundColor: '#e7f3ff', // Lighter background
    backgroundColor: '#e7f3ff', // Lighter background
  },
  draggedItemStyle: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
      },
      android: { elevation: 8 },
    }),
  },
  progressText: {
    marginLeft: 10, // Space between the progress bar and text
    fontSize: 16, // Increased font size
    fontWeight: 'bold',
    color: '#000', // Black color for readability
  },
  sectionHeader: {
    backgroundColor: '#f0f0f0', // Slightly darker background
    paddingVertical: 12, // Increased padding
    paddingHorizontal: 16, // Keep padding
    marginBottom: 8, // Space below each section
    borderRadius: 6,
  },
 sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
 },
  // Keep other styles if they are used elsewhere or remove unused ones
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

