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
                <Appbar.Action icon="help-outline" onPress={() => {}} />
                <Appbar.Action icon="dots-vertical" onPress={openMenu} />
            </Appbar.Header>

            <MenuItems menuOpen={menuOpen} openMenu={openMenu} closeMenu={closeMenu} />
        </>
    )
}

const MenuItems = ({
    menuOpen, 
    openMenu, 
    closeMenu
}) => {
    
    return(
        <View
            style={{
                paddingTop: 50,
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
            <Menu
                visible={menuOpen}
                onDismiss={closeMenu}
                anchor={<Button onPress={openMenu}>Show menu</Button>}
            >
                <Menu.Item onPress={() => {}} title="Item 1" />
                <Menu.Item onPress={() => {}} title="Item 2" />
                <Divider />
                <Menu.Item onPress={() => {}} title="Item 3" />
            </Menu>
        </View>
    )
}

export default CustomTopBar
