export default {
    namespace: 'products',
    state: [],
    effects: {
        *fetch({ payload }, { call, put }) {  // eslint-disable-line
            yield call(delay, 1000);
            yield put({ type: 'save' }, {payload: id});
        },
    },
    reducers: {
        'delete'(state, { payload: id }) {
            return state.filter(item => item.id !== id);
        },
        'save'(state, { payload: id }) {
            return {...state}
        },
    },
};


function delay(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}