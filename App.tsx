import React, {useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {Provider as PaperProvider, MD3LightTheme, Appbar, BottomNavigation} from 'react-native-paper';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {
    useFonts,
    BricolageGrotesque_400Regular,
    BricolageGrotesque_500Medium,
    BricolageGrotesque_700Bold
} from '@expo-google-fonts/bricolage-grotesque';
import {SpaceGrotesk_400Regular, SpaceGrotesk_700Bold} from '@expo-google-fonts/space-grotesk';
import {colors, spacing, typography} from './src/lib/Theme';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';


import HomeScreen from './src/screens/HomeScreen';
import AboutScreen from './src/screens/AboutScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';


const paperTheme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: colors.primary,
        secondary: colors.secondary,
        error: colors.error,
        background: colors.background,
        surface: colors.surface,
        secondaryContainer: '#FFB3B3',
        onSecondaryContainer: '#6F0000',
    },
    fonts: {
        ...MD3LightTheme.fonts,
        labelLarge: {
            fontFamily: typography.fontFamily.bodyBold,
            fontSize: typography.fontSize.sm,
        },
        labelMedium: {
            fontFamily: typography.fontFamily.body,
            fontSize: typography.fontSize.sm,
        }
    }
};

function MainApp() {
    // First-time user state
    const [firstLaunch, setFirstLaunch] = useState(true);

    // Bottom navigation state
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        {key: 'home', title: 'Home', icon: 'home'},
        {key: 'scanner', title: 'Scanner', icon: 'camera'},
        {key: 'about', title: 'About', icon: 'information'},
        {key: 'settings', title: 'Settings', icon: 'cog'},
    ]);

    const renderIcon = ({route, focused, color}: {
        route: { icon: string },
        focused: boolean,
        color: string
    }) => {
        return (
            <MaterialCommunityIcons
                name={route.icon as any}
                size={24}
                color={color}
            />
        );
    };

    const renderScene = BottomNavigation.SceneMap({
        home: HomeScreen,
        scanner: HomeScreen, // Using HomeScreen as placeholder
        about: AboutScreen,
        settings: SettingsScreen,
    });


    const completeOnboarding = () => {
        setFirstLaunch(false);
    };


    const [fontsLoaded] = useFonts({
        BricolageGrotesque_400Regular,
        BricolageGrotesque_500Medium,
        BricolageGrotesque_700Bold,
        SpaceGrotesk_400Regular,
        SpaceGrotesk_700Bold
    });

    if (!fontsLoaded) {
        return null;
    }


    if (firstLaunch) {
        return (
            <PaperProvider theme={paperTheme}>
                <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content"/>
                <OnboardingScreen onComplete={completeOnboarding}/>
            </PaperProvider>
        );
    }

    return (
        <PaperProvider
            theme={paperTheme}
            settings={{
                icon: props => <MaterialCommunityIcons {...props as any} />
            }}
        >
            <StatusBar backgroundColor={colors.primary} barStyle="light-content" translucent={false}/>
            <View style={styles.container}>
                <Appbar.Header style={styles.header}>
                    <Appbar.Content
                        title="StepLight"
                        titleStyle={styles.headerTitle}
                    />
                </Appbar.Header>

                <View style={styles.content}>
                    {renderScene({
                        route: routes[index], jumpTo: () => {
                        }
                    })}
                </View>

                <View style={styles.bottomNavWrapper}>
                    <SafeAreaView edges={['bottom']} style={styles.bottomNavContainer}>
                        <BottomNavigation
                            navigationState={{index, routes}}
                            onIndexChange={setIndex}
                            renderScene={() => null}
                            renderIcon={renderIcon}
                            barStyle={styles.bottomNav}
                            activeColor="#6F0000" // Dark red for active tab text
                            inactiveColor={colors.textSecondary}
                            labeled={true}
                            shifting={true}
                            theme={{
                                colors: {
                                    secondaryContainer: '#FFB3B3',
                                    onSecondaryContainer: '#6F0000'
                                }
                            }}
                        />
                    </SafeAreaView>
                </View>
            </View>
        </PaperProvider>
    );
}

export default function App() {
    return (
        <SafeAreaProvider>
            <MainApp/>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
        marginBottom: 70,
    },
    header: {
        backgroundColor: colors.primary,
        elevation: 4,
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    headerTitle: {
        fontFamily: typography.fontFamily.heading,
        fontSize: typography.fontSize.lg,
        color: '#fff',
        textAlign: 'center',
        opacity: 1, // Ensure full opacity
    },
    bottomNavWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#F5F5F7',
    },
    bottomNavContainer: {
        backgroundColor: '#F5F5F7',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.1)',
    },
    bottomNav: {
        backgroundColor: '#F5F5F7',
        height: 70,
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: -2},
        shadowOpacity: 0.1,
        shadowRadius: 3,
    }
});