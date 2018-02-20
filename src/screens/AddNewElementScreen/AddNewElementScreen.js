import React, { Component } from 'react';
import { AsyncStorage, Button, TextInput, SafeAreaView } from 'react-native';

const ELEMENTS_VALUE_KEY = 'ELEMENTS_VALUE_KEY';

export default class AddNewElementScreen extends Component {
	state = {
		text: '',
		elements: []
	};

	async componentDidMount() {
		const elements = await AsyncStorage.getItem(ELEMENTS_VALUE_KEY);
		this.setState({ elements: JSON.parse(elements) || [] });
	}

	setText = (text) => this.setState({ text });

	addElement = () => this.setState({ elements: [...this.state.elements, this.state.text] }, async () => {
		this.setState({ text: '' });
		await AsyncStorage.setItem(ELEMENTS_VALUE_KEY, JSON.stringify(this.state.elements));
	});

	render() {
		return (
			<SafeAreaView style={{ flex: 1, width: '100%' }}>
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
			</SafeAreaView>
		);
	}
}
