import { Button, Menu, Divider, Appbar } from 'react-native-paper';
import React, { useState } from 'react'

const CustomTopBar = ({
    title,
}) => {

    const [menuOpen, setMenuOpen] = useState(false)

    const openMenu = () => {
        setMenuOpen(true)
    }
    const closeMenu = () => {
        setMenuOpen(false)
    }

    return (
        <>
            <Appbar.Header>
                <Appbar.Content title={title} />
                <Menu
                    visible={menuOpen}
                    onDismiss={closeMenu}
                    anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}
                    anchorPosition='bottom'
                >
                    <Menu.Item onPress={() => {
                        navigation.navigate('Assignment List');
                        closeSecondMenu();
                    }} 
                    title="Assignment List" />
                    <Menu.Item onPress={() => {
                        navigation.navigate('AnalyticsScreen');
                        closeSecondMenu();
                    }} title="Analytics" />
                    <Divider />
                    <Menu.Item onPress={() => {
                        navigation.navigate('SubjectsScreen');
                        closeSecondMenu();
                    }} title="Subject" />
                </Menu>
            </Appbar.Header>

           
        </>
    )
}

export default CustomTopBar
