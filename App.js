import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'

export default function App() {
  const[userNum, setUserNumber] = useState();
  const[rounds, setRounds] = useState(0);

  const configureNewGameHandler = () => {
    setRounds(0);
    setUserNumber(null);

  }


  const startGameHandler = (selectedNum) => {
    setUserNumber(selectedNum);
    setRounds(0);
  }

  const gameOverHandler = numRounds => {
    setRounds(numRounds)
  }

  let content = <StartGameScreen onStartGame={startGameHandler}/>;

  if (userNum && rounds <=0) {
    content = <GameScreen userChoice={userNum} onGameOver={gameOverHandler} onRestart={configureNewGameHandler}/>
  } else if (rounds > 0) {
    content = <GameOverScreen roundsNumber={rounds} userNumber={userNum} onRestart={configureNewGameHandler}/>
  }


  return (
    <View style={styles.container}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
