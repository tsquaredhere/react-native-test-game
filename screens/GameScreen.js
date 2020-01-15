import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Card from '../components/Card'
import NumContainer from '../components/NumContainer'

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randNum = Math.floor(Math.random() * (max - min) ) + min;
    if (randNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return randNum
    }
 }
const GameScreen = (props) => {
    const [guess, setGuess] = useState(generateRandomBetween(1, 100, props.userChoice))
    const [rounds, setRounds] = useState(0);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const { userChoice, onGameOver } = props
    useEffect(() => {
        if(guess === userChoice) {
            onGameOver(rounds);
        }
    }, [guess, userChoice, onGameOver])

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && guess < props.userChoice) || 
            (direction === 'higher' && guess > props.userChoice)) {
            Alert.alert('No Cheating!', 'You know this is wrong...', [{text: 'Sorry!', style: 'cancel'}]);
            return;
        } 
        if (direction === 'lower') {
            currentHigh.current = guess;
        } else{
            currentLow.current = guess;
        }
        const nextNum = generateRandomBetween(currentLow.current, currentHigh.current, guess)
        setGuess(nextNum);
        setRounds(rounds => rounds + 1)
    }

    return (
        <View style={styles.screen}>
            <Text> Opponent's Guess </Text>
            <NumContainer>{guess}</NumContainer>
            <Card style={styles.buttonContainer}>
                <Button title='LOWER'  onPress={nextGuessHandler.bind(this, 'lower')}/>
                <Button title='HIGHER'  onPress={nextGuessHandler.bind(this, 'higher')}/>
            </Card>
            <Card style={styles.buttonContainer}>
                <Button title='Restart'  onPress={props.onRestart}/>
     
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }

})

export default GameScreen;

