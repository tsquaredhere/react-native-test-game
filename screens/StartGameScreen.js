import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Colors from '../constants/colors';
import Card from '../components/Card'
import Input from '../components/Input'
import NumContainer from '../components/NumContainer'

const StartGameScreen = props => { 
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [number, setNumber] = useState();

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }
    const confirmInputHandler = () => {
        const chosenNum = parseInt(enteredValue);
        if (isNaN(chosenNum) || chosenNum <= 0 || chosenNum > 99) {
            Alert.alert('Invalid Number!', 'Number must be between 1-99.', [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}])
            return;
        }
        setConfirmed(true);
        setNumber(chosenNum)
        setEnteredValue('');
        Keyboard.dismiss();
    }

    let confirmedOutput;
    if(confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}> 
                <Text> You Chose: </Text>
                <NumContainer>{number}</NumContainer>
                <Button title='Start Game'onPress={() => props.onStartGame(number)}/>
            </Card>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={()=>{
            Keyboard.dismiss();
        }}> 
        <View style={styles.gameScreen}>
            <Text style={styles.title}> {"Start a New Game!"} </Text>

            <Card style={styles.inputContainer}>
                <Text> Enter a Number </Text>
                <Input 
                    blurOnSubmit 
                    autoCapitalize='none' 
                    autoCorrect={false} 
                    keyboardType="number-pad" 
                    maxLength={2} 
                    style={styles.input}
                    value={enteredValue}
                    onChangeText={numberInputHandler}
                />
                <View style={styles.buttonContainer}> 
                    <View style={styles.button}> 
                        <Button title="Reset" onPress={resetInputHandler} color={Colors.accent} />
                        
                    </View>
                    <View style={styles.button}>
                        <Button title="Confirm"onPress={confirmInputHandler} color={Colors.primary}/>
                    </View>

                </View>
            </Card>
            {confirmedOutput}

        </View>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    gameScreen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        marginBottom: 10
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 100
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
});

export default StartGameScreen;