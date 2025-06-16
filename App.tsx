import React from 'react';
import {Text, View, SafeAreaView} from 'react-native';

export default function App() {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>StepLight</Text>
            </View>
        </SafeAreaView>
    );
}