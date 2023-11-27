import useState from 'react'

export const forceUpdate = () => {
    const [value, setValue] = useState(0);
    return [() => setValue(value + 1), value];
}
