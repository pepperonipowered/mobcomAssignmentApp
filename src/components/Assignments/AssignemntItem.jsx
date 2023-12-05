import { View, Alert } from 'react-native'
import { Text, Checkbox, Menu, IconButton, MD3Colors, Divider } from 'react-native-paper';
import React, { useState } from 'react'
import { format } from 'date-fns';
import { updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../../firebaseConfig';

const AssignemntItem = ({
  navigation,
  assignment
}) => {
  const { item } = assignment

  const [isChecked, setIsChecked] = useState(item.status)
  const [visible, setVisible] = useState(false);

  const openItemMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const assignment_date = new Date(item.date.seconds * 1000 + item.date.nanoseconds / 1000000)

  
  const handleCheckbox = async (assignmentId, newStatus) => {
    setTimeout(async () => await updateDoc(doc(FIREBASE_DB, 'assignments', assignmentId), { status: newStatus }),1000)
    setIsChecked(newStatus)
  }

  const handleDeleteAssignment = async (assignmentId) => {
    setTimeout(async () => await deleteDoc(doc(FIREBASE_DB, 'assignments', assignmentId)),1000)
  }
  

  return (
    <View style={{flex:1}}>
      <Divider/>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginHorizontal: 0, marginVertical: 5}}>
        <View style={{ paddingHorizontal: 8 }}>
          <Checkbox
            status={ isChecked ? 'checked' : 'unchecked' }
            onPress={() => handleCheckbox(assignment.item.id, !isChecked)}
            disabled={false}
          />
        </View>
        <View style={{ flex: 1, borderLeftWidth: 2, paddingLeft: 20, borderLeftColor: MD3Colors.primary50 }}>
          <Text variant='bodyMedium' style={{ marginRight: 10 }}>
            {format(assignment_date, "MMMM dd, yyyy")}
            
          </Text>
          <Text numberOfLines={1} ellipsizeMode='tail' variant='bodyLarge' style={{ fontWeight: 'bold', color: MD3Colors.primary50 }}>
            {item.title}
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
                  }
                } 
                title="View" 
                leadingIcon={'eye'}
            />
            <Menu.Item 
                onPress={
                  () => {
                    navigation.navigate('Edit Assignment', { assignmentId: assignment.item.id})
                    closeMenu();
                  }
                } 
                title="Edit" 
                leadingIcon={'circle-edit-outline'}
            />
            <Divider/>
            {
              assignment.item.status ? (
                <Menu.Item 
                  onPress={() => {
                    handleDeleteAssignment(assignment.item.id)
                  }
                    
                  } 
                  title="Delete" 
                  leadingIcon={'trash-can-outline'}
                />
              ) : (
                ''
              )
            }
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