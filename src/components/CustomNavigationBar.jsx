import React from 'react';
import { Appbar } from 'react-native-paper';
import { Menu } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';

export default function CustomNavigationBar({ 
    navigation, 
    route, 
    options, 
    back 
})
{
    const [visibleFirst, setVisibleFirst] = React.useState(false);
    const [visibleSecond, setVisibleSecond] = React.useState(false);
    const openFirstMenu = () => setVisibleFirst(true);
    const closeFirstMenu = () => setVisibleFirst(false);
    const openSecondMenu = () => setVisibleSecond(true);
    const closeSecondMenu = () => setVisibleSecond(false);
    const title = getHeaderTitle(options, route.name);

    return (
        <>
            <Appbar.Header>
                {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
                    <Appbar.Content title={title} />
                {!back ? (
                    <>
                        <Menu
                            visible={visibleFirst}
                            onDismiss={closeFirstMenu}
                            anchor={
                                <Appbar.Action
                                    icon="help-circle-outline"
                                    onPress={openFirstMenu}
                                />
                            }
                            anchorPosition='bottom'
                        >
                                <Menu.Item
                                    onPress={() => {
                                        navigation.navigate('Help');
                                        closeFirstMenu();
                                    }}
                                    title={'Help'}
                                />
                        </Menu>
                        <Menu
                            visible={visibleSecond}
                            onDismiss={closeSecondMenu}
                            anchor={
                                <Appbar.Action
                                    icon="dots-vertical"
                                    onPress={openSecondMenu}
                                />
                            }
                            anchorPosition='bottom'
                        >
                            <Menu.Item
                                onPress={() => {
                                    navigation.navigate('Assignment List');
                                    closeSecondMenu();
                                }}
                                title={'Assignment List'}
                            />
                            <Menu.Item
                                onPress={() => {
                                    navigation.navigate('AnalyticScreen');
                                    closeSecondMenu();
                                }}
                                title={'Analytics'}
                            />
                            <Menu.Item
                                onPress={() => {
                                    navigation.navigate('SettingScreen');
                                    closeSecondMenu();
                                }}
                                title={'Settings'}
                            />
                        </Menu>
                    </>
                    
                ) : null}
            </Appbar.Header>
        </>
    );
}