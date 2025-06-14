const handleDelete = (id: string) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => console.log('Deletion cancelled'), // Optional: Add a log or other action
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteScheduleItem(id);
            if (editingItemId === id) {
              setEditingItemId(null);
              clearForm();
            }
          },
        },
      ],
      { cancelable: true }
    );
  };