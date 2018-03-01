import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, SafeAreaView, Text, TextInput, View } from 'react-native';

import { addElement, getApiCall } from '../../redux';
import * as CustomModule from '../../../CustomModule';

import styles from './AddNewElementScreenStyle';

class AddNewElementScreen extends Component {
	state = {
		text: '',
		listCallback: [],
		listAsync: [],
		currentDate: ''
	};

	async componentDidMount() {
		this.props.getApiCall();

		this.moduleListener();
		CustomModule.startListening();
		this.getModuleList();
		this.getModuleListAsync();
	}

	setText = (text) => this.setState({ text });

	addElement = () => {
		this.props.addElement(this.state.text);
		this.setState({ text: '' });
	};

	getModuleList = () => {
		CustomModule.getModuleList((error, listCallback) => this.setState({ listCallback }))
	};

	getModuleListAsync = async () => {
		try {
			const listAsync = await CustomModule.getModuleListAsync();
			this.setState({ listAsync });
		} catch (err) {
			console.log(err);
		}
	};

	moduleListener = () => {
		CustomModule.addBasicListener(({ date }) => this.setState({ currentDate: date }))
	};

	render() {
		return (
			<SafeAreaView style={styles.container}>
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
				<View style={{ flexDirection: 'row' }}>
					{this.state.listCallback.map((elem, index) => <Text key={index}>{elem}</Text>)}
				</View>
				<View style={{ flexDirection: 'row' }}>
					{this.state.listAsync.map((elem, index) => <Text key={index}>{elem}</Text>)}
				</View>
				<Text>{this.state.currentDate}</Text>
			</SafeAreaView>
		);
	}
}

export default connect(state => state.example, { getApiCall, addElement })(AddNewElementScreen);
