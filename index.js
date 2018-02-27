import { AppRegistry, UIManager } from 'react-native';
import './src/config/ReactotronConfig';
import App from './src';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

AppRegistry.registerComponent('RNAcademyCourse', () => App);
