import { View } from 'react-native'
import { Portal, FAB } from 'react-native-paper'
import React, { useState } from 'react'
import useKeyboardOpen from '../lib/useKeyboardOpen'


const FloatingActionButton = ({navigation}) => {
    const [fab, setFab] = useState(false);
    const isKeyboardOpen = useKeyboardOpen();
    return (
        <View>
        {
            isKeyboardOpen ? (
                ''
                ) : (
                    <Portal>
                    <FAB.Group
                    style={{ position: 'absolute', bottom: 0, right: 0, paddingBottom: 80, paddingRight: 5 }}
                    open={fab}
                    visible
                    icon={fab ? 'close' : 'plus'}
                    label='Add an item'
                    actions={[
                        { 
                            icon: 'format-list-bulleted', 
                            label: 'Add an assignment',
                            onPress: () => {navigation.navigate("Add Assignment")} 
                        },
                        {
                            icon: 'book',
                            label: 'Add a subject',
                            onPress: () => {navigation.navigate("Add Subject")},
                        },
                    ]}
                    onStateChange={() => setFab(!fab)}
                    onPress={() => {
                        if (fab) {
                        // do something if the speed dial is open
                        }
                    }}
                    />
                </Portal>
                )
            }
        </View>
    )
}

export default FloatingActionButton