import React, { Component } from 'react';
import { AsyncStorage, Text, TouchableOpacity, View } from 'react-native';
import Icon from '../../components/Icon';

const ELEMENTS_VALUE_KEY = 'ELEMENTS_VALUE_KEY';

export default class DisplayElementsScreen extends Component {
	state = {
		elements: []
	};

	async componentDidMount() {
		const elements = await AsyncStorage.getItem(ELEMENTS_VALUE_KEY);
		this.setState({ elements: JSON.parse(elements) || [] });
	}

	navigateTo = (name) => () => this.props.navigation.navigate('ElementInfo', { name });

	removeElement = (element) => () => this.setState({ elements: this.state.elements.filter(elem => elem !== element) })

	render() {
		return (
			<View style={{ flex: 1, width: '100%', backgroundColor: 'white' }}>
				{this.state.elements.map((element, index) => (
					<View style={{
						padding: 10,
						paddingHorizontal: 40,
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between'
					}} key={index}>
						<TouchableOpacity onPress={this.navigateTo(element)}>
							<Text style={{ fontSize: 20, color: '#1679bf' }}>{element}</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={this.removeElement(element)}>
							<Icon nameIos='ios-remove-circle-outline' nameAndroid='remove' size={20} />
						</TouchableOpacity>
					</View>
				))}
			</View>
		);
	}
}
