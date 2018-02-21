import Reactotron, {
	asyncStorage,
	networking,
	openInEditor,
	overlay,
	trackGlobalErrors
} from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

Reactotron
	.configure({ name: 'RN Academy Course' })
	.use(trackGlobalErrors())
	.use(openInEditor())
	.use(overlay())
	.use(asyncStorage())
	.use(networking())
	.use(reactotronRedux())
	.use(sagaPlugin())
	.useReactNative()
	.connect();

Reactotron.clear();
