import React from 'react';
import { View, Text, StyleSheet, Animated, Easing, Image } from 'react-native';

const starImg = require('./assets/star.png'); // Place a star image in assets

const AnimatedStars: React.FC<{ visible: boolean }>
  = ({ visible }) => {
  const anim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.timing(anim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }).start(() => anim.setValue(0));
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.star,
        {
          opacity: anim,
          transform: [
            { scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1.5] }) },
            { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [40, -20] }) },
          ],
        },
      ]}
    >
      <Image source={starImg} style={{ width: 64, height: 64 }} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  star: {
    position: 'absolute',
    left: '50%',
    marginLeft: -32,
    top: 0,
    zIndex: 10,
  },
});

export default AnimatedStars;
