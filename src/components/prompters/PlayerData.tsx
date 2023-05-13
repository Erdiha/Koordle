import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React, { useEffect, useMemo, useRef } from 'react';

import { colors } from '../../utils/colors';
import Animated, {
  BounceInLeft,
  BounceOutRight,
} from 'react-native-reanimated';
import { clearAsyncStorage, retrieveData } from '../../utils/Helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
const PlayerData = ({ player, setShowProfile, setPlayer }) => {
  // Example usage within an async function

  // Example usage within an async function
  // Example usage within an async function
  async function clearStorage() {
    try {
      await AsyncStorage.clear();
      ToastAndroid.show('Data cleared successfully', ToastAndroid.SHORT);
      console.log('AsyncStorage cleared successfully.');
      // Clear player info after clearing AsyncStorage
      setPlayer((prevPlayer: object) => ({
        ...prevPlayer,
        info: [],
      }));
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
      // Handle error
    }
  }

  // Call the clearStorage function

  console.log('playerdata', player);
  return (
    <Animated.View
      entering={BounceInLeft}
      exiting={BounceOutRight}
      style={styles.container}>
      <View style={styles.blurBackground} />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Player Data</Text>

        <Text style={styles.playerInfoName}>
          Name:{''}
          <Text
            style={{
              backgroundColor: colors.light,
              margin: 2,
              display: 'flex',
              color: colors.lightDark,
              padding: 2,
            }}>
            {' '}
            {player?.name}
          </Text>
        </Text>

        <ScrollView style={styles.scoresContainer}>
          <Text style={styles.scoresTitle}>Scores:</Text>
          {player?.info?.map(
            (item: any, index: number) =>
              item && (
                <Text
                  key={index}
                  style={[
                    styles.scoreText,
                    index === 0 ? styles.firstScoreText : {},
                  ]}>
                  {`#${index + 1} - Score: ${item.score}, Date:${item.date} `}
                </Text>
              ),
          )}
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => clearStorage()}
            style={styles.clearButton}>
            <Text style={styles.clearButtonText}>CLEAR DATA</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowProfile((prev: boolean) => !prev)}
            style={styles.button}>
            <Text style={styles.buttonText}>DONE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: -1,
  },
  innerContainer: {
    alignSelf: 'center',
    flex: 1,
    borderRadius: 10,
    borderColor: colors.lightDark,
    borderWidth: 2,
    display: 'flex',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: colors.light,
    margin: 20,
    width: '90%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
    gap: 10,
  },

  button: {
    backgroundColor: colors.lightDark,
    flex: 1 / 2,
    borderRadius: 10,
    elevation: 5,
  },

  buttonText: {
    color: colors.light,
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    fontWeight: '800',
  },

  firstScoreText: {
    fontSize: 16,
  },

  clearButton: {
    backgroundColor: colors.light,
    borderWidth: 2,
    borderColor: colors.lightDark,
    flex: 1 / 2,
    borderRadius: 10,
    elevation: 5,
  },
  clearButtonText: {
    backgroundColor: colors.light,
    color: colors.red,
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    fontWeight: '800',
    borderRadius: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 10,
    width: '100%',
    borderBottomColor: colors.lightDark,
    borderBottomWidth: 2,
    backgroundColor: colors.lightDark,
    color: colors.light,
    flex: 1 / 15,
    borderRadius: 10,
  },

  playerInfoName: {
    fontSize: 20,
    marginBottom: 5,
    padding: 10,
    justifyContent: 'space-evenly',
    color: '#B7B7B7',
    width: '100%',
    display: 'flex',
  },
  scoresContainer: {
    borderWidth: 1,
    padding: 10,
    flex: 5 / 6,
    width: '100%',
    borderRadius: 10,
  },
  scoresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scoreText: {
    marginBottom: 5,
    color: '#000',
    fontSize: 16,
  },
});

export default PlayerData;