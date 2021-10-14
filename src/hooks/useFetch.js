import axios from 'axios';
import {
    useCallback,
    useEffect,
    useReducer,
    useState
} from 'react';

const initialState = {
    data: {},
    isLoading: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'GET_REQUEST':
            return {
                ...state,
                isLoading: true
            };
        case 'SET_RESPONSE':
            return {
                ...state,
                data: action.payload,
                isLoading: false
            };
        default:
            throw new Error();
    }
}

export const useFetch = (url, defaultParams) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [params, setParams] = useState(defaultParams)

    const getParams = useCallback(() => {
        return { ...params }
    }, [params])

    const fetchData = useCallback(() => {
        dispatch({ type: 'GET_REQUEST' })
        axios.get(url, { params: getParams() })
            .then(function (response) {
                dispatch({ type: 'SET_RESPONSE', payload: response?.data })
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [url, getParams]);

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return { ...state, params, setParams }
}
