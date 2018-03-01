import { NativeModules, NativeEventEmitter} from 'react-native';

const CustomModule = NativeModules.CustomModule;
const CustomModuleEmitter = new NativeEventEmitter(CustomModule);

const BASIC_LISTENER = 'BASIC_LISTENER';

export const startListening = () => CustomModule.startListening();
export const getModuleList = (callback) => CustomModule.getModuleList(callback) ;
export const getModuleListAsync = () => CustomModule.getModuleListAsync();
export const addBasicListener = (callback) => CustomModuleEmitter.addListener(BASIC_LISTENER, callback);
export const removeAllListners = () => CustomModuleEmitter.removeAllListeners();
