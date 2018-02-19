import React, { Component } from 'react';
import { Button, View } from 'react-native';

export default class Tabs extends Component {
	render() {
		return (
			<View style={{
				backgroundColor: '#eeeeee',
				padding: 10,
				flexDirection: 'row',
				justifyContent: 'space-between'
			}}>
				<Button onPress={this.props.setScreen(1)} title="Tab 1" />
				<Button onPress={this.props.setScreen(2)} title="Tab 2" />
			</View>
		)
	}
}
