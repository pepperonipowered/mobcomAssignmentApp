import { View } from 'react-native'
import { Text, Menu, IconButton, MD3Colors, Divider } from 'react-native-paper';
import React, { useState } from 'react'
import { FIREBASE_DB } from '../../../firebaseConfig';
import { doc, deleteDoc } from 'firebase/firestore';

const SubjectItem = ({subject}) => {
  
  const [visible, setVisible] = useState(false);
  const openItemMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleDeleteSubject = async (subjectId) => {
    setTimeout(async () => await deleteDoc(doc(FIREBASE_DB, 'subjects', subjectId)), 1000)
  }
  
  
  return (
    <View style={{flex:1}}>
      <Divider/>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginHorizontal: 0, marginVertical: 5}}>
        <View style={{ flex: 1, borderLeftWidth: 20, paddingLeft: 20, borderLeftColor: MD3Colors.primary50, }}>
          <Text variant='bodyMedium' style={{ marginRight: 10 }}>
            {subject.item?.code}
          </Text>
          <Text numberOfLines={1} ellipsizeMode='tail' variant='bodyLarge' style={{ fontWeight: 'bold', color: MD3Colors.primary50 }}>
            {subject.item?.name}
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
                    
                    closeMenu();
                  }
                } 
                title="Edit" 
                leadingIcon={'circle-edit-outline'}
            />
            <Menu.Item 
              onPress={() => {
                handleDeleteSubject(subject.item.id)
              }
                
              } 
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

export default SubjectItem