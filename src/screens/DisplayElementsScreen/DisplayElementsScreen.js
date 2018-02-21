import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import Icon from '../../components/Icon';
import { removeElement } from '../../redux';


const ELEMENTS_VALUE_KEY = 'ELEMENTS_VALUE_KEY';

class DisplayElementsScreen extends Component {
	navigateTo = (name) => () => this.props.navigation.navigate('ElementInfo', { name });

	removeElement = (element) => () => {
		this.props.removeElement(element);
	};

	render() {
		return (
			<View style={{ flex: 1, width: '100%', backgroundColor: 'white' }}>
				{this.props.elements.map((element, index) => (
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

export default connect(state => state.example, { removeElement })(DisplayElementsScreen);
