import React, { Component } from 'react';
import { AsyncStorage, Button, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import styles from './AppStyle';
import Tabs from '../components/Tabs';

const ELEMENTS_VALUE_KEY = 'ELEMENTS_VALUE_KEY';

export default class App extends Component {
	state = {
		screen: 1,
		text: '',
		elements: []
	};

	async componentDidMount() {
		const elements = await AsyncStorage.getItem(ELEMENTS_VALUE_KEY);
		this.setState({ elements: JSON.parse(elements) || [] });
	}

	setScreen = (screen) => () => this.setState({ screen });

	removeElement = (element) => () => this.setState({ elements: this.state.elements.filter(elem => elem !== element) })

	setText = (text) => this.setState({ text });

	addElement = () => this.setState({ elements: [...this.state.elements, this.state.text] }, async () => {
		this.setState({ text: '' });
		await AsyncStorage.setItem(ELEMENTS_VALUE_KEY, JSON.stringify(this.state.elements));
	});

	renderContent() {
		switch (this.state.screen) {
			case 1:
				return (
					<View style={{ flex: 1, width: '100%' }}>
						<TextInput
							placeholder="Write your text"
							onChangeText={this.setText}
							value={this.state.text}
							style={{
								padding: 20,
								fontSize: 18,
								color: '#333',
								borderBottomColor: 'red',
								borderBottomWidth: 1,
								marginBottom: 20
							}}
						/>
						<Button onPress={this.addElement} title="Add" />
					</View>
				);

			case 2:
				return (
					<View style={{ flex: 1, width: '100%' }}>
						{this.state.elements.map((element, index) => (
							<View style={{
								padding: 10,
								paddingHorizontal: 40,
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between'
							}} key={index}>
								<Text style={{ fontSize: 20, color: '#1679bf' }}>{element}</Text>
								<TouchableOpacity onPress={this.removeElement(element)}>
									<Text>X</Text>
								</TouchableOpacity>
							</View>
						))}
					</View>
				);

			default:
				return null;
		}
	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.container}>
					{this.renderContent()}
				</View>
				<Tabs setScreen={this.setScreen} />
			</SafeAreaView>
		);
	}
}
