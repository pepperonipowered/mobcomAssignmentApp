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
                <Appbar.Action icon="help-circle-outline" onPress={() => {}} />
                <Menu
                    visible={menuOpen}
                    onDismiss={closeMenu}
                    anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}
                    anchorPosition='bottom'
                >
                    <Menu.Item onPress={() => {}} title="Item 1" />
                    <Menu.Item onPress={() => {}} title="Item 2" />
                    <Divider />
                    <Menu.Item onPress={() => {}} title="Item 3" />
                </Menu>
            </Appbar.Header>

           
        </>
    )
}

export default CustomTopBar
