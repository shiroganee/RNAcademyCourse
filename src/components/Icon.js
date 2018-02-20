import React, { Component } from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import IconIOS from 'react-native-vector-icons/Ionicons';
import IconAndroid from 'react-native-vector-icons/MaterialIcons';

export default class Icon extends Component {
	static propTypes = {
		nameIos: PropTypes.string.isRequired,
		nameAndroid: PropTypes.string.isRequired,
		size: PropTypes.number.isRequired,
		style: PropTypes.object
	};

	static defaultProps = {
		style: null
	};

	render() {
		if (Platform.OS === 'ios') {
			return (
				<IconIOS
					name={this.props.nameIos}
					size={this.props.size}
					style={this.props.style}
				/>
			)
		}

		if (Platform.OS === 'android') {
			return (
				<IconAndroid
					name={this.props.nameAndroid}
					size={this.props.size}
					style={this.props.style}
				/>
			)
		}

		return null;
	}
}

