// src/screens/HomeScreen.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, spacing, typography } from '../lib/Theme';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Home Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    text: {
        fontFamily: typography.fontFamily.heading,
        fontSize: typography.fontSize.lg,
        color: colors.text,
    }
});

export default HomeScreen;