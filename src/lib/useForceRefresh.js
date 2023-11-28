import { useState } from 'react'

// use this to refresh the component since a component re-renders whenever state changes
// we are just using a simple counter to force that change to the UI
const useForceRrefresh = () => {
    const [value, setValue] = useState(0);
    return [() => setValue(value + 1), value];
}

export { useForceRrefresh }