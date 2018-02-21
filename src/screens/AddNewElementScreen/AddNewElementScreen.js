import React, { Component } from 'react';
import { Button, SafeAreaView, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { addElement, getApiCall } from '../../redux';

class AddNewElementScreen extends Component {
	state = { text: '' };

	async componentDidMount() {
		this.props.getApiCall();
	}

	setText = (text) => this.setState({ text });

	addElement = () => {
		this.props.addElement(this.state.text);
		this.setState({ text: '' });
	};

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

export default connect(state => state.example, { getApiCall, addElement })(AddNewElementScreen);
