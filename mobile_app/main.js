import Expo, {Notifications} from 'expo';
import React from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';
import {Provider} from 'react-redux';


import store from './store';
import AuthScreen from './screens/AuthScreen';
import GoalEntryScreen from './screens/GoalEntryScreen';


class App extends React.Component {
    componentDidMount() {

    }

    render() {
        const MainNavigator = TabNavigator({
            welcome: {screen: WelcomeScreen},
            auth: {screen: AuthScreen},
            main: {
                screen: TabNavigator({
                    goalEntry: {screen: GoalEntryScreen},
                    map: {screen: MapScreen},
                    deck: {screen: DeckScreen},
                    review: {
                        screen: StackNavigator({
                            review: {screen: ReviewScreen},
                            settings: {screen: SettingsScreen}
                        })
                    }
                }, {
                    tabBarPosition: 'bottom',
                    tabBarOptions: {
                        labelStyle: {fontSize: 12}
                    }
                })
            }
        }, {
            navigationOptions: {
                tabBarVisible: false,
            },
            lazyLoad: true
        });

        return (
            <Provider store={store}>
                <MainNavigator />
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

Expo.registerRootComponent(App);
