import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const Header = props => { 
    return (
        <View style={styles.headerContainer}>
            <Text placeHolder="number"  style={styles.title}>{props.title}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    headerContainer: {
        width: "100%",
        height: 90,
        paddingTop: 36,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center'

    },

    title: {
        color: 'black',
        fontSize: 18
    }
});

export default Header;

