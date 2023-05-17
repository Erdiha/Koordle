import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  ToastAndroid,
  Alert,
} from 'react-native';
import Animated, {
  BounceIn,
  SlideInUp,
  SlideOutDown,
} from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';
import { MAX_ROUND, colors } from '../../utils/constants';

const Prompter = ({
  attempt,
  roundCount,
  type,
  secretWord,
  setShowInfo,
  handleNewGame,
  gameOver,
  score,
  resetRound,
  setAllGuesses,
  foundTheWord,
  setGiveup,
  setGameOver,
  handleRoundIsOver,
}) => {
  //handle backspace click to exit game

  const handleExitGame = () => {
    if (gameOver) {
      setGameOver(true);
      handleNewGame();
      BackHandler.exitApp();
    } else {
      Alert.alert('Confirmation', 'Are you sure you want to exit the game?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Exit',
          style: 'destructive',
          onPress: () => {
            setGameOver(true);
            handleNewGame();
            BackHandler.exitApp();
          },
        },
      ]);
    }
  };

  useEffect(() => {
    const backAction = () => {
      handleExitGame();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const handleButtonPress = () => {
    if (isGameOver && type === 'gameover') {
      handleNewGame();
    } else {
      if (type === '') {
        setGiveup(true);
        setShowInfo(true);
      } else if (type === 'info') {
        handleRoundIsOver();
      }
    }
  };

  //bollean to determine game over or not
  const isGameOver = roundCount.current === MAX_ROUND || gameOver;
  const texts = { header: '', body: {} };
  //check info type
  if (!isGameOver) {
    texts.header = 'INFO';
    texts.body['1'] = 'Round: ' + roundCount.current;
    texts.body['2'] = 'Attempts: ' + attempt;
    texts.body['3'] = 'Total Score: ' + score.current;
  } else {
    texts.header = 'LOST 😢';
    texts.body['1'] = 'Round: ' + roundCount.current;
    texts.body['2'] = 'Total Score: ' + score.current;
    texts.body['3'] = `Word was: ${secretWord.join('').toUpperCase()}`;
  }
  //determine render depending on the info type
  const infoText =
    type === 'info' || type === '' ? (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          width: '100%',
          alignItems: 'center',

          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontWeight: '800',
            fontSize: 20,
            color: colors.light,
            flex: 1 / 3,
            backgroundColor: colors.red,
            textAlign: 'center',
            padding: 5,
            position: 'absolute',
            left: -10,
          }}>
          {texts.header}
        </Text>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
          <View>
            <Text style={styles.bodyText}>{texts.body['1']}</Text>
            <Text style={styles.bodyText}>{texts.body['2']}</Text>
            <Text style={styles.bodyText}>{texts.body['3']}</Text>
          </View>
        </View>
      </View>
    ) : (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Animated.View entering={BounceIn.duration(3000)}>
            <Text
              style={{
                color: colors.light,
                fontSize: 24,
                fontWeight: '800',
              }}>
              GAME OVER!
            </Text>
          </Animated.View>
        </View>
        <View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Text style={{ color: colors.light, fontSize: 16 }}>
            Round: {roundCount.current - 1}
          </Text>
          <Text style={{ color: colors.light, fontSize: 16 }}>
            {' '}
            Score: {score.current}/150
          </Text>
        </View>
      </View>
    );

  return (
    <Animated.View
      style={styles.infoButton}
      entering={SlideInUp}
      exiting={SlideOutDown}>
      <View style={styles.closeButton}>
        <TouchableOpacity
          onPress={() => {
            setShowInfo((prev: boolean) => !prev);
          }}>
          <AntDesign color={colors.light} size={35} name='closecircleo' />
        </TouchableOpacity>
      </View>
      <View style={styles.scoreWrapper}>{infoText}</View>
      <View style={styles.controlContainer}>
        <TouchableOpacity onPress={handleExitGame}>
          <Text
            style={[
              styles.buttonText,
              { backgroundColor: colors.red, color: colors.light },
            ]}>
            EXIT GAME
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleButtonPress()}>
          <Text style={styles.buttonText}>{`${
            type === 'gameover'
              ? 'NEW GAME'
              : type === 'info'
              ? 'NEXT ROUND'
              : 'GIVE UP'
          }`}</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  infoButton: {
    position: 'absolute',
    alignSelf: 'center',
    width: '80%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '35%',
    backgroundColor: colors.lightDark,
    bottom: '35%',
    borderRadius: 10,
    borderColor: colors.lightDark,
    borderWidth: 2,
    gap: 10,
  },
  bodyText: { fontWeight: '500', fontSize: 18, color: colors.light, margin: 5 },
  closeButton: {
    position: 'absolute',
    backgroundColor: colors.lightDark,
    top: -10,
    right: -10,
    borderColor: colors.red,
    borderWidth: 3,
    borderRadius: 50,
    zIndex: 1000,
    elevation: 10,
  },
  scoreWrapper: {
    borderWidth: 1,
    borderColor: colors.light,
    width: '90%',
    padding: 10,
    borderRadius: 10,
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlContainer: {
    flex: 1 / 2,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: colors.gray,
    padding: 10,
    fontWeight: '500',
    backgroundColor: colors.light,
    borderRadius: 10,
  },
});

export default Prompter;
