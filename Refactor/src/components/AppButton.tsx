import React from 'react';
import { Pressable, Text, StyleSheet, View, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface AppButtonProps {
  onPress: () => void;
  title: string;
  color?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const AppButton: React.FC<AppButtonProps> = ({ onPress, title, color, disabled, style, textStyle }) => {
  const buttonStyles: StyleProp<ViewStyle>[] = [
    styles.button,
    color ? { backgroundColor: color } : {},
    disabled ? styles.disabledButton : {},
    style,
  ];

  const textStyles: StyleProp<TextStyle>[] = [
    styles.buttonText,
    disabled ? styles.disabledText : {},
    textStyle,
  ];

  return (
    <Pressable
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled}
      android_ripple={{ color: '#ccc' }} // Optional: Add ripple effect for Android
    >
      <Text style={textStyles}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor: '#007BFF', // Default color
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.6,
  },
  disabledText: {
    color: '#A9A9A9',
  },
});

export default AppButton;