import React from 'react';
import { Animated, SafeAreaView } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import AddNewElementScreen from './screens/AddNewElementScreen/AddNewElementScreen';
import DisplayElementsScreen from './screens/DisplayElementsScreen/DisplayElementsScreen';
import Icon from './components/Icon';

const ElementInformatioNavigator = StackNavigator({
	MainList: {
		screen: DisplayElementsScreen,
		navigationOptions: () => ({
			title: 'Main List'
		})
	},
	ElementInfo: {
		screen: DisplayElementsScreen,
		navigationOptions: ({ navigation }) => ({
			title: `${navigation.state.params.name}'s Info`
		})
	}
}, {
	initialRouteName: 'MainList',
	navigationOptions: {
		headerStyle: {
			backgroundColor: 'white'
		}
	}
});

const MainNavigator = TabNavigator({
	AddNewElement: {
		screen: AddNewElementScreen,
		navigationOptions: {
			tabBarLabel: 'New',
			tabBarIcon: ({ tintColor, focused }) => (
				<Icon
					nameAndroid={focused ? 'ios-list' : 'ios-list-box-outline'}
					nameIos={focused ? 'ios-add' : 'ios-add-circle-outline'}
					size={26}
					style={{ color: tintColor }}
				/>
			)
		}
	},
	ListScreen: {
		screen: ElementInformatioNavigator,
		navigationOptions: {
			tabBarLabel: 'List',
			tabBarIcon: ({ tintColor, focused }) => (
				<Icon
					nameAndroid={focused ? 'ios-list' : 'ios-list-box-outline'}
					nameIos={focused ? 'ios-list' : 'ios-list-box-outline'}
					size={26}
					style={{ color: tintColor }}
				/>
			)
		}
	}
}, {
	initialRouteName: 'AddNewElement',
	animationEnabled: true,
	configureTransition: () => ({
		timing: Animated.spring,
		tension: 1,
		friction: 25
	}),
	swipeEnabled: true,
	activeTintColor: 'red'
});

export const App = () => (
	<SafeAreaView style={{ flex: 1 }}>
		<MainNavigator />
	</SafeAreaView>
);

