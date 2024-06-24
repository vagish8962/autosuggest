import React, { useReducer } from 'react';
import SuggestionList from "./suggestionList";

const intialState = {
    inputVal: "",
    suggestions: [],
    loading: false,
    error: ""
};

const reducer = (state, action) => {
    switch (action.type) {
        case "input":
            return { ...state, inputVal: action.value };
        case "suggestions":
            return { ...state, suggestions: action.value };
        case "loading":
            return { ...state, loading: action.value };
        case "error":
            return { ...state, error: action.value };
    }

};

function AutoSuggest(
    {
        placeholder,
        fetchSuggestion,
        onChange,
        onFocus,
        onBlur,
        loadingIcon,
        staticSuggestions,
        dataKey
    }
) {
    const [state, dispatch] = useReducer(reducer, intialState)

    const onInputChange = async (value) => {
        dispatch({
            type: 'input',
            value: value
        });
        onChange(value);
        if (value.length > 0) {
            const result = await getSuggestions();
            dispatch({ type: "suggestions", value: result });

        } else {
            dispatch({ type: "suggestions", value: [] });
        }
    }

    const getSuggestions = async () => {
        if (staticSuggestions) {
            const filteredSuggestions = staticSuggestions.filter(suggestion => suggestion.toLowerCase().includes(state.inputVal));
            return filteredSuggestions;
        } else {
            try {
                dispatch({
                    type: 'loading',
                    value: true
                });
                const result = await fetchSuggestion(state.inputVal);
                return result;
            } catch (err) {
                dispatch({
                    type: 'error',
                    value: "An error occurred while"
                });
                return [];
            } finally {
                dispatch({
                    type: 'loading',
                    value: false
                });
            }

        }
    }

    return <>
        <input value={state.inputVal} onChange={(e) => onInputChange(e.target.value)} placeholder={placeholder} />
        <SuggestionList list={state.suggestions} dataKey={dataKey} highlight={state.inputVal} />
    </>
}
export default AutoSuggest;