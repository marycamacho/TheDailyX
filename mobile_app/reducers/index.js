import {persistCombineReducers} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


import userReducer from './user_reducer';

const config = {
    key: 'primary',
    storage
}
export default persistCombineReducers(config, {
    userReducer
});
