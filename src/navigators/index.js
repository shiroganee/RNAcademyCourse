import React from 'react';
import { Animated } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import AnimationsScreen from '../screens/AnimationsScreen/AnimationsScreen';
import AddNewElementScreen from '../screens/AddNewElementScreen/AddNewElementScreen';
import DisplayElementsScreen from '../screens/DisplayElementsScreen/DisplayElementsScreen';
import Icon from '../components/Icon';

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

export const MainNavigator = TabNavigator({
	Animations: {
		screen: AnimationsScreen,
		navigationOptions: {
			tabBarLabel: 'Animations'
		}
	},
	AddNewElement: {
		screen: AddNewElementScreen,
		navigationOptions: {
			tabBarLabel: 'New',
			tabBarIcon: ({ tintColor, focused }) => (
				<Icon
					nameAndroid={focused ? 'add' : 'add-circle-outline'}
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
					nameAndroid={focused ? 'format-list-bulleted' : 'list'}
					nameIos={focused ? 'ios-list' : 'ios-list-box-outline'}
					size={26}
					style={{ color: tintColor }}
				/>
			)
		}
	}
}, {
	initialRouteName: 'Animations',
	animationEnabled: true,
	tabBarPosition: 'bottom',
	configureTransition: () => ({
		timing: Animated.spring,
		tension: 1,
		friction: 25
	}),
	swipeEnabled: true,
	activeTintColor: 'red'
});
