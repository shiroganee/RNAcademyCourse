import React, { Component } from 'react';
import {
	AsyncStorage,
	Button,
	KeyboardAvoidingView,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	textInput: {
		padding: 20,
		fontSize: 20,
		borderBottomWidth: 1,
		borderBottomColor: 'black',
		marginBottom: 20
	},
	tabs: {
		backgroundColor: '#efefee',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	tab: {
		flex: 1,
		padding: 10,
		margin: 5
	},
	tabText: {
		textAlign: 'center',
		fontSize: 18,
		color: 'blue'
	},
	separator: {
		width: 1,
		backgroundColor: 'blue'
	},
	elementRow: {
		padding: 20,
		marginBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: 'black',
		fontSize: 18
	}
});

export default class MainScreen extends Component {
	state = {
		screen: 1,
		newValue: '',
		elements: []
	};

	async componentDidMount() {
		const value = await AsyncStorage.getItem("elements");
		this.setState({ elements: JSON.parse(value) || [] });
	};

	setText = (text) => {
		this.setState({ newValue: text });
	};

	addNewText = () => {
		this.setState({ elements: [...this.state.elements, this.state.newValue] }, async () => {
			this.setState({ newValue: '' });
			await AsyncStorage.setItem("elements", JSON.stringify(this.state.elements));
		});
	};

	renderContent() {
		switch (this.state.screen) {
			case 1:
				return (
					<View>
						<TextInput placeholder="New value" onChangeText={this.setText} value={this.state.newValue}
								   style={styles.textInput} />
						<Button onPress={this.addNewText} title="Add" />
					</View>
				);

			case 2:
				return (
					<ScrollView>
						{this.state.elements.map((element, index) => (
							<Text style={styles.elementRow} key={index}>{element}</Text>
						))}
					</ScrollView>
				);

			default:
				return null;
		}
	}

	setScreen = (screen) => () => this.setState({ screen });

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<KeyboardAvoidingView style={styles.container} behavior="padding">
					<View style={styles.container}>
						{this.renderContent()}
					</View>
					<View style={styles.tabs}>
						<TouchableOpacity style={styles.tab} onPress={this.setScreen(1)}>
							<Text style={styles.tabText}>Tab 1</Text>
						</TouchableOpacity>
						<View style={styles.separator} />
						<TouchableOpacity style={styles.tab} onPress={this.setScreen(2)}>
							<Text style={styles.tabText}>Tab 2</Text>
						</TouchableOpacity>
					</View>
				</KeyboardAvoidingView>
			</SafeAreaView>
		)
	}
}
