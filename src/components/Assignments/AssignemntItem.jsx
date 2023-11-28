import { View, Alert } from 'react-native'
import { Text, Checkbox, Menu, IconButton, MD3Colors, Divider } from 'react-native-paper';
import React, { useState } from 'react'

const AssignemntItem = ({
  navigation,
  assignment
}) => {
  const [isChecked, setIsChecked] = useState(false)
  const [visible, setVisible] = useState(false);
  const openItemMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  return (
    <View style={{flex:1}}>
      <Divider/>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginHorizontal: 10, marginVertical: 5}}>
        <View style={{ paddingHorizontal: 8 }}>
          <Checkbox
            // status={ isChecked ? 'checked' : 'unchecked' }
            status={!isChecked}
            onPress={() => setIsChecked(!isChecked)}
            disabled={true}
          />
        </View>
        <View style={{ flex: 1, borderLeftWidth: 2, paddingLeft: 20, borderLeftColor: MD3Colors.primary50 }}>
          <Text variant='bodyMedium' style={{ marginRight: 10 }}>
            {/* {assignment.date} */}
            
          </Text>
          <Text numberOfLines={1} ellipsizeMode='tail' variant='bodyLarge' style={{ fontWeight: 'bold', color: MD3Colors.primary50 }}>
            {/* {assignment.title} */}
          </Text>
        </View>

        <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <IconButton
                    icon="dots-horizontal"
                    size={24}
                    onPress={ openItemMenu }
                    >
                </IconButton>
            }
            anchorPosition='bottom'
        >
            <Menu.Item 
                onPress={
                  () => {
                    navigation.navigate('Edit Assignment')
                    closeMenu();
                  }
                } 
                title="Edit" 
                leadingIcon={'circle-edit-outline'}
            />
            <Divider/>
            <Menu.Item 
                onPress={()=>{}} 
                title="Delete" 
                leadingIcon={'trash-can-outline'}
            />
            <Divider/>
            <Menu.Item 
                onPress={closeMenu} 
                title="Cancel" 
                leadingIcon={'arrow-left-bottom'}
            />
        </Menu>
      </View>
      <Divider/>
    </View>
  )
}

export default AssignemntItem