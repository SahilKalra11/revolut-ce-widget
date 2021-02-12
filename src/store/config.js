import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from '../reducers/index';

const configureStore = initialState => createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(thunk, reduxImmutableStateInvariant()),
    )
);
export default configureStore;
