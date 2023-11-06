import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import React from 'react'

export default function SafeAreaWrapper({ children, styles }) {
    const insets = useSafeAreaInsets();
    return (
        <View
            style={[
                    {
                        paddingTop: insets.top,
                        paddingBottom: insets.bottom,
                        paddingLeft: insets.left,
                        paddingRight: insets.right,
                    },
                    styles
                ]}
        >
            { children }
        </View>
    )
}