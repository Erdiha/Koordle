import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Vibration,
} from 'react-native';
import { colors } from '../../utils/colors';
import { keyRows, backspace, enter } from '../../utils/constants';
import Animated, { BounceIn } from 'react-native-reanimated';

const Keyboard = ({
  onPress,
  foundTheWord,
  keyboardColors,
  gameOver,
  roundIsOver,
}: any) => {
  const enterJSX = <Text style={styles.enter}>ENTER</Text>;

  const restJSX = (letter: string | any) => (
    <Text style={styles.text}>{letter}</Text>
  );

  const keyColors = (key: any) => {
    if (keyboardColors[colors.green]?.includes(key)) {
      return colors.green;
    }
    if (keyboardColors[colors.yellow]?.includes(key)) {
      return colors.yellow;
    }
    if (keyboardColors[colors.gray]?.includes(key)) {
      return colors.gray;
    }
    return colors.light;
  };

  const handlePress = (letter: any) => {
    Vibration.vibrate(10);
    if (letter === backspace) {
      onPress('backspace');
    } else {
      onPress(letter);
    }
  };

  return (
    <View style={styles.container}>
      {keyRows.map((row, rowIndex) => (
        <View style={styles.row} key={rowIndex}>
          {row.map((letter, letterIndex) => (
            <Animated.View
              entering={BounceIn.delay(letterIndex * 200)}
              key={letterIndex}>
              <TouchableOpacity
                activeOpacity={0.3}
                disabled={foundTheWord || gameOver || roundIsOver}
                style={[
                  styles.button,
                  letter === backspace && styles.backspace,
                  letter === enter && styles.enterButton,
                  { backgroundColor: keyColors(letter) },
                ]}
                key={letterIndex}
                onPress={() => handlePress(letter)}>
                {letter === 'ENTER' ? enterJSX : restJSX(letter)}
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F0',
    padding: 8,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.light,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    width: 35,
    height: 60,
    borderRadius: 3,
    borderColor: colors.lightDark,
    borderWidth: 0.2,
    elevation: 5,
  },
  text: {
    fontSize: 30,
    fontWeight: '400',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: colors.lightDark,
  },
  backspace: {
    width: 45,
    paddingHorizontal: 8,
  },
  enterButton: {
    backgroundColor: colors.lightDark,
    width: 78,
    height: 60,
    borderColor: colors.lightDark,
    borderWidth: 1,
    elevation: 6,
  },
  enter: {
    fontSize: 22,

    textAlign: 'center',
    textAlignVertical: 'center',
    color: colors.red,
    letterSpacing: 1,
    fontWeight: '900',
    fontFamily: 'sans-serif-condensed',
  },
});

export default Keyboard;