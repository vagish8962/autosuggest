import { useEffect, useState } from "react"

function useDebounce(value, timeout) {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(value);
        }, [timeout])

        return () => clearTimeout(timer);
    }, [value]);

    return debounceValue;
}

export default useDebounce;