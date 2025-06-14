typescriptreact
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, FlatList, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppButton from '/home/user/BBAPP/Refactor/src/components/AppButton'; // Assuming the absolute path
import { ScheduleContext } from '/home/user/BBAPP/Refactor/src/context/ScheduleContext'; // Use absolute path
import { ScheduleItem } from '/home/user/BBAPP/Refactor/src/types/ScheduleTypes'; // Use absolute path


const ScheduleManagementScreen: React.FC = () => {
  const [time, setTime] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date()); // State for the time picker
  const [activity, setActivity] = useState('');
  const [icon, setIcon] = useState(''); // Placeholder
  const [color, setColor] = useState(''); // Placeholder
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);

  // Access schedule and functions from context
  const { schedule, editScheduleItem, deleteScheduleItem } = useContext(ScheduleContext);

  const clearForm = () => {
    setTime('');
    setSelectedDate(new Date());
    setActivity('');
    setIcon('');
    setColor('');
    setEditingItemId(null); // Also clear editing state
  };

  // Placeholder functions for now
  const handleAddItem = () => {
    if (!time || !activity) {
      // Basic validation
      console.log('Time and activity are required');
      return; // Stop if validation fails
    }
    const newItem: ScheduleItem = {
      id: Date.now().toString(), // Simple unique ID for now
      time: `${selectedDate.getHours().toString().padStart(2, '0')}:${selectedDate.getMinutes().toString().padStart(2, '0')}`, // Format time from Date
      activity,
      icon,
      color, isCompleted: false, // New items are not completed
    };
    // Assuming you have an addScheduleItem in your context or will add one
    // addScheduleItem(newItem); // Uncomment when addScheduleItem is available
    clearForm(); // Clear form after successful add
  };

  const handleSaveItem = () => {
    if (!editingItemId || !time || !activity) {
      console.log('Cannot save: no item ID or missing fields');
      return;
    }

    const updatedItem: ScheduleItem = {
      id: editingItemId,
      time: `${selectedDate.getHours().toString().padStart(2, '0')}:${selectedDate.getMinutes().toString().padStart(2, '0')}`, // Format time from Date
      activity,
      icon,
      color,
      // Keep the existing completion status
      isCompleted: schedule.find(item => item.id === editingItemId)?.isCompleted || false,
    };
    editScheduleItem(updatedItem); // Call the context function
    clearForm(); // Clear form after successful save
  };

  const handleEdit = (item: ScheduleItem) => {
    console.log('Editing item:', item.id);
    setEditingItemId(item.id);
    // Populate form for editing
    const [hours, minutes] = item.time.split(':').map(Number);
    setSelectedDate(new Date(0, 0, 0, hours, minutes)); // Set Date object for picker
    setActivity(item.activity);
    setIcon(item.icon || '');
    setColor(item.color || '');
  };

  const handleDelete = (itemId: string) => {
    console.log('Deleting item:', itemId);
    deleteScheduleItem(itemId);
  };

  const onChangeTimePicker = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || new Date();
    setIsTimePickerVisible(Platform.OS === 'ios'); // Keep picker visible on iOS
    setSelectedDate(currentDate);
    setTime(`${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`); // Update time state as string
  };

  const showTimePicker = () => { setIsTimePickerVisible(true); };

  // Render function for FlatList items
  const renderScheduleItem = ({ item }: { item: ScheduleItem }) => (
    <View style={styles.itemContainer}>
      <Text>{`${item.time} - ${item.activity}`}</Text>
      <View style={styles.actionButtonsContainer}>
        <Pressable onPress={() => handleEdit(item)} style={styles.actionButton}><Text style={styles.actionButtonText}>Edit</Text></Pressable>
        <Pressable onPress={() => handleDelete(item.id)} style={styles.actionButton}><Text style={styles.actionButtonText}>Delete</Text></Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add New Schedule Item</Text>
      <Pressable onPress={showTimePicker}>
 <Text style={styles.input}>{time || 'Select Time'}</Text>
 </Pressable>
 {isTimePickerVisible && (
 <DateTimePicker
 value={selectedDate}
 mode="time"
 display="default"
 onChange={onChangeTimePicker}
 />
 )}

      <View style={styles.inputGroup}>
 <Text style={styles.label}>Activity:</Text>
 <TextInput
        style={styles.input}
 placeholder="Activity Name"
        value={activity}
        onChangeText={setActivity}
      />
 </View>
 <View style={styles.inputGroup}>
 <Text style={styles.label}>Icon Name:</Text>
        style={styles.input}
 placeholder="Icon Name (Placeholder)"
        value={color}
        onChangeText={setColor}
      />
      <AppButton
        title={editingItemId ? 'Save Schedule Item' : 'Add Schedule Item'}
        onPress={editingItemId ? handleSaveItem : handleAddItem}
      />
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Color (e.g., #RRGGBB):</Text>
 <TextInput
 style={styles.input}
 placeholder="Color (Placeholder)"
 value={color}
 onChangeText={setColor}
 />
 </View>
        <TextInput


      <Text style={styles.heading}>Current Schedule</Text>
      <FlatList
        data={schedule}
        renderItem={renderScheduleItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    alignSelf: 'flex-start',
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    borderRadius: 5,
  },
  list: {
    width: '100%',
    marginTop: 20,
  },
  listContent: {
    paddingBottom: 20, // Add some padding at the bottom of the list
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: 10,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    paddingHorizontal: 10,
  },
  actionButtonText: {
    color: 'blue', // Or a more appropriate action color
  }
});

export default ScheduleManagementScreen;