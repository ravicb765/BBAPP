import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button } from 'react-native';

const poses = [
  {
    name: 'Tree Pose',
    description: 'Stand tall, bring one foot to your inner leg, and balance like a tree.',
    image: require('./assets/yoga_tree.jpg'),
  },
  {
    name: 'Butterfly Pose',
    description: 'Sit with feet together, knees out, and gently flap your legs like butterfly wings.',
    image: require('./assets/yoga_butterfly.jpg'),
  },
  {
    name: 'Cat-Cow Stretch',
    description: 'On hands and knees, arch and round your back gently.',
    image: require('./assets/yoga_catcow.jpg'),
  },
  {
    name: "Child's Pose",
    description: 'Kneel, sit back on your heels, and stretch arms forward for comfort.',
    image: require('./assets/yoga_child.jpg'),
  },
  {
    name: 'Downward Dog',
    description: 'Hands and feet on the floor, hips up, making a triangle shape.',
    image: require('./assets/yoga_downwarddog.jpg'),
  },
];

const YogaFriend = () => (
  <View style={styles.avatarContainer}>
    <Image source={require('./assets/yoga_friend.png')} style={styles.avatar} />
    <Text style={styles.avatarText}>Yoga Friend</Text>
  </View>
);

const YogaSequence = () => {
  // This could be expanded to play audio, show animations, or time each pose
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <YogaFriend />
      <Text style={styles.title}>Yoga for Calm & Focus</Text>
      <Text style={styles.subtitle}>Follow along with these gentle poses. Try a 3-5 minute sequence!</Text>
      {poses.map((pose, idx) => (
        <View key={pose.name} style={styles.poseCard}>
          <Image source={pose.image} style={styles.poseImage} resizeMode="contain" />
          <Text style={styles.poseName}>{pose.name}</Text>
          <Text style={styles.poseDesc}>{pose.description}</Text>
        </View>
      ))}
      <Button title="Start Sequence (3-5 min)" onPress={() => { /* Play sequence, voiceover, music, etc. */ }} color="#6366f1" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f9ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#2563eb',
  },
  subtitle: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 16,
    textAlign: 'center',
  },
  poseCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 18,
    alignItems: 'center',
    width: 280,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  poseImage: {
    width: 120,
    height: 120,
    marginBottom: 8,
  },
  poseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 4,
  },
  poseDesc: {
    fontSize: 15,
    color: '#374151',
    textAlign: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#e0e7ff',
  },
  avatarText: {
    fontSize: 16,
    color: '#6366f1',
    marginTop: 4,
  },
});

export default YogaSequence;
