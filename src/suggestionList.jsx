function SuggestionList({ list, dataKey, highlight }) {

    const getHighlightedText = (currSuggestion) => {
        const parts = currSuggestion.split(new RegExp(`(${highlight})`, "gi"));
        return (
            <span> {
                parts.map((part => {
                    if (part.toLowerCase() === highlight.toLowerCase()) {
                        return <b>{part}</b>
                    } else {
                        return part
                    }
                }))
            }
            </span>
        )
    }

    return (
        <ul>
            {list.map((suggestion, index) => {
                const currSuggestion = dataKey ? suggestion[dataKey] : suggestion;
                return (
                    <li
                        key={index}
                        onClick={() => onSuggestionClick(suggestion)}
                        className="suggestion-item"
                        id={`suggestion-${index}`}
                    >
                        {getHighlightedText(currSuggestion)}
                    </li>
                );

            }

            )}
        </ul>
    )
}

export default SuggestionList