import React, { Component } from 'react';
import { Animated, Button, LayoutAnimation, SafeAreaView, ScrollView, Text, View } from 'react-native';

export default class AnimationsScreen extends Component {
	state = {
		showButton: false,
		isAnimatedVisible: false,
		value: 0,
		intervalWidth: 0,
		showBackground: false
	};

	_transform = new Animated.Value(0);

	_opacity = new Animated.Value(0);

	benchmark = () => {
		this.interval = setInterval(() => {
			for (let i = 0; i < 100; i++) {
				this.setState({ value: i });
			}
		}, 10)
	};

	clearBenchmark = () => {
		clearInterval(this.interval);
		this.interval = null
	};

	showBottom = () => {
		const CustomAnimation = {
			duration: 1000,
			create: {
				type: LayoutAnimation.Types.spring,
				property: LayoutAnimation.Properties.scaleXY,
				springDamping: 0.5
			},
			update: {
				type: LayoutAnimation.Types.spring,
				springDamping: 0.5
			}
		};

		LayoutAnimation.configureNext(CustomAnimation);
		this.setState({ showBottom: !this.state.showBottom });
	};

	showHideAnimated = () => {
		this.benchmark();
		Animated.spring(this._transform, {
			toValue: !this.state.isAnimatedVisible ? 1 : 0,
			friction: 1,
			useNativeDriver: true
		}).start(() => {
			this.setState({ isAnimatedVisible: !this.state.isAnimatedVisible });
			this.clearBenchmark();
		});
	};

	showInterval = () => {
		this.benchmark();
		if (this.state.intervalWidth === 0) {
			let interval = setInterval(() => {
				this.setState({ intervalWidth: this.state.intervalWidth + 1 });

				if (this.state.intervalWidth > 150) {
					clearInterval(interval);
					interval = null;
					this.clearBenchmark();
				}
			}, 10)
		} else {
			let interval = setInterval(() => {
				this.setState({ intervalWidth: this.state.intervalWidth - 1 });

				if (this.state.intervalWidth === 0) {
					clearInterval(interval);
					interval = null;

					this.clearBenchmark();
				}
			}, 10)
		}
	};

	renderAnimated() {
		return (
			<Animated.View style={[{ backgroundColor: 'red', width: 50, height: 50 },
				{ transform: [{ scaleX: this._transform }] }]}>
			</Animated.View>
		)
	}

	renderSetInterval() {
		return (
			<View style={{ backgroundColor: 'pink', width: this.state.intervalWidth, height: 50 }} />
		)
	}

	showButtonBackground = () => {
		Animated.timing(this._opacity, {
			duration: 1000,
			toValue: this.state.showBackground ? 0 : 1,
			useNativeDriver: true
		}).start(() => this.setState({ showBackground: !this.state.showBackground }));
	};

	renderButton() {
		return (
			<View>
				<Button onPress={this.showButtonBackground} title="Cookies" />
				<View style={{
					top: 0,
					left: 0,
					height: 50,
					width: 50,
					position: 'absolute',
					backgroundColor: 'red'
				}}></View>
				<Animated.View style={[{
					top: 0,
					left: 0,
					height: 50,
					width: 50,
					position: 'absolute',
					backgroundColor: 'black'
				}, { opacity: this._opacity }]} />
			</View>
		)
	}

	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<ScrollView>
					<Text style={{ textAlign: 'center', fontSize: 26, marginTop: 20 }}>{this.state.value}</Text>
					<Block>
						<Button onPress={this.showBottom} title="Show/Hide Bottom" />
						<View style={{ backgroundColor: 'red', height: 50 }} />
						{this.state.showBottom && <View style={{ backgroundColor: 'black', height: 50 }} />}
						<View style={{ backgroundColor: 'red', height: 50 }} />
					</Block>
					<Block style={{ alignItems: 'center' }}>
						<Button onPress={this.showHideAnimated} title="Show/Hide Animated API" />
						{this.renderAnimated()}
					</Block>
					<Block style={{ alignItems: 'center' }}>
						<Button onPress={this.showInterval} title="Show/Hide Animated API" />
						{this.renderSetInterval()}
					</Block>
					<Block>
						{this.renderButton()}
					</Block>
				</ScrollView>
			</SafeAreaView>
		)
	}
}

class Block extends Component {
	render() {
		return (
			<View style={[{ flex: 1, marginVertical: 20 }, this.props.style]}>
				{this.props.children}
			</View>
		);
	}
}
