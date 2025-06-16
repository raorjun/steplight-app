// src/screens/OnboardingScreen.tsx
import React, {useRef, useEffect} from 'react';
import {StyleSheet, View, Animated, Dimensions} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {colors, spacing, typography} from '../lib/Theme';
import {MaterialCommunityIcons} from '@expo/vector-icons';

const {width, height} = Dimensions.get('window');

type OnboardingScreenProps = {
    onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({onComplete}) => {
    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;

    // Exit animation values
    const exitOpacity = useRef(new Animated.Value(1)).current;
    const exitScale = useRef(new Animated.Value(1)).current;

    // Pattern animation values
    const pattern1Rotate = useRef(new Animated.Value(0)).current;
    const pattern2Translate = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Entrance animation sequence
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            })
        ]).start();

        // Subtle continuous pattern animations
        Animated.loop(
            Animated.sequence([
                Animated.timing(pattern1Rotate, {
                    toValue: 1,
                    duration: 12000,
                    useNativeDriver: true
                }),
                Animated.timing(pattern1Rotate, {
                    toValue: 0,
                    duration: 12000,
                    useNativeDriver: true
                })
            ])
        ).start();

        Animated.loop(
            Animated.sequence([
                Animated.timing(pattern2Translate, {
                    toValue: 1,
                    duration: 8000,
                    useNativeDriver: true
                }),
                Animated.timing(pattern2Translate, {
                    toValue: 0,
                    duration: 8000,
                    useNativeDriver: true
                })
            ])
        ).start();
    }, []);

    const handleGetStarted = () => {
        // Exit animation sequence
        Animated.parallel([
            Animated.timing(exitOpacity, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.timing(exitScale, {
                toValue: 1.1,
                duration: 600,
                useNativeDriver: true,
            }),
        ]).start(() => {
            onComplete();
        });
    };

    // Calculate pattern rotation and movement
    const rotation = pattern1Rotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    const translateY = pattern2Translate.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 20]
    });

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    opacity: exitOpacity,
                    transform: [{scale: exitScale}]
                }
            ]}
        >
            {/* Decorative patterns */}
            <Animated.View style={[styles.patternTopRight, {transform: [{rotate: rotation}]}]}>
                <MaterialCommunityIcons name="hexagon-outline" size={120} color={`${colors.primary}20`} />
            </Animated.View>

            <Animated.View style={[styles.patternBottomLeft, {transform: [{translateY}]}]}>
                <MaterialCommunityIcons name="circle-outline" size={140} color={`${colors.primary}15`} />
            </Animated.View>

            <View style={styles.patternDots}>
                {[...Array(5)].map((_, i) => (
                    <View key={i} style={[styles.dot, {left: i * 20, top: i % 2 === 0 ? 0 : 10}]} />
                ))}
            </View>

            <View style={styles.patternDots2}>
                {[...Array(5)].map((_, i) => (
                    <View key={i} style={[styles.dot, {right: i * 20, bottom: i % 2 === 0 ? 0 : 10}]} />
                ))}
            </View>

            <View style={styles.logoContainer}>
                <Animated.View
                    style={[
                        styles.logo,
                        {
                            opacity: fadeAnim,
                            transform: [{scale: scaleAnim}]
                        }
                    ]}
                >
                    <MaterialCommunityIcons name="walk" size={80} color={colors.primary}/>
                </Animated.View>
            </View>

            <Animated.View
                style={[
                    styles.textContainer,
                    {
                        opacity: fadeAnim,
                        transform: [
                            {translateY: slideAnim},
                            {scale: scaleAnim}
                        ]
                    }
                ]}
            >
                <Text style={styles.appName}>StepLight</Text>
                <Text style={styles.subtitle}>Navigate with confidence</Text>

                <View style={styles.creditsContainer}>
                    <Text style={styles.creditMain}>A project by Arjun Rao</Text>
                    <Text style={styles.creditSecondary}>With support from Armaan Gera</Text>
                </View>
            </Animated.View>

            <Animated.View
                style={[
                    styles.buttonContainer,
                    {
                        opacity: fadeAnim,
                        transform: [
                            {translateY: slideAnim},
                            {scale: scaleAnim}
                        ]
                    }
                ]}
            >
                <Button
                    mode="contained"
                    onPress={handleGetStarted}
                    style={styles.button}
                    labelStyle={styles.buttonLabel}
                >
                    Get Started
                </Button>
            </Animated.View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
        overflow: 'hidden', // Keep patterns from extending outside container
    },
    logoContainer: {
        marginBottom: spacing.xl,
        alignItems: 'center',
        zIndex: 2, // Make sure content appears above patterns
    },
    logo: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: spacing.xl,
        zIndex: 2,
    },
    appName: {
        fontFamily: typography.fontFamily.headingBold,
        fontSize: typography.fontSize.xxl,
        color: colors.primary,
        marginBottom: spacing.xs,
    },
    subtitle: {
        fontFamily: typography.fontFamily.heading,
        fontSize: typography.fontSize.md,
        color: colors.textSecondary,
        marginBottom: spacing.xl,
    },
    creditsContainer: {
        alignItems: 'center',
        marginTop: spacing.xl,
    },
    creditMain: {
        fontFamily: typography.fontFamily.bodyBold,
        fontSize: typography.fontSize.md,
        color: colors.text,
        marginBottom: spacing.xs,
    },
    creditSecondary: {
        fontFamily: typography.fontFamily.body,
        fontSize: typography.fontSize.sm,
        color: colors.textSecondary,
    },
    buttonContainer: {
        width: '80%',
        marginTop: spacing.xl,
        zIndex: 2,
    },
    button: {
        paddingVertical: spacing.xs,
        borderRadius: 30,
    },
    buttonLabel: {
        fontFamily: typography.fontFamily.bodyBold,
        fontSize: typography.fontSize.md,
        paddingVertical: spacing.xs,
    },
    // Decorative patterns
    patternTopRight: {
        position: 'absolute',
        top: -40,
        right: -40,
        opacity: 0.6,
        zIndex: 1,
    },
    patternBottomLeft: {
        position: 'absolute',
        bottom: -60,
        left: -60,
        opacity: 0.6,
        zIndex: 1,
    },
    patternDots: {
        position: 'absolute',
        top: height * 0.15,
        left: width * 0.1,
        zIndex: 1,
    },
    patternDots2: {
        position: 'absolute',
        bottom: height * 0.15,
        right: width * 0.1,
        zIndex: 1,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.primary,
        opacity: 0.2,
        position: 'absolute',
    }
});

export default OnboardingScreen;