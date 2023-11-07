import { View, Text } from 'react-native'
import {useState} from 'react'
import { TextInput, Button, MD3Colors } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker';

const EditAssingment = ({  
    navigation
}) => {
  const [title, setTitle] = useState('')
  const [description, setdescription] = useState('')
  const [date, setDate] = useState(new Date)
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [mins, setMins] = useState('')

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDatePicker(false)
    setDate(currentDate);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: 20 }}>
        <TextInput
            label="Assignment title"
            placeholder="e.g. MOBCOM Lab 1"
            mode="outlined"
            value={title}
            onChangeText={(text) => setTitle(text)}
            right={<TextInput.Icon icon="clipboard-text-outline" />}
            style={{ marginBottom: 20 }}
        />
        <TextInput
            label="Assignment description"
            placeholder="e.g. Some description here..."
            mode="outlined"
            value={description}
            onChangeText={(text) => setdescription(text)}
            right={<TextInput.Icon icon="clipboard-text-outline" />}
            style={{ marginBottom: 20 }}
        />
        <TextInput
            label="Due Date"
            mode="outlined"
            value={date.toLocaleDateString()}
            right={<TextInput.Icon icon="calendar" color={'black'} onPress={() => setShowDatePicker(true)} />}
            style={{ marginBottom: 20 }}
            disabled={true}
        />
        {showDatePicker && (
            <DateTimePicker 
                mode="date" 
                display="calendar" 
                value={date}
                onChange={onChangeDate}
            />
        )}
        <TextInput
            label="Notify me some minutes before due"
            placeholder="Enter time in minutes"
            mode="outlined"
            value={mins}
            right={<TextInput.Icon icon="clock" color={'black'} />}
            style={{ marginBottom: 20 }}
            keyboardType="numeric"
            onChangeText={(text) => {setMins(text)}}
        />

        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <Button onPress={() => {}} uppercase={false} mode="contained" style={{ borderRadius:5, backgroundColor: MD3Colors.primary50, width: 100, marginRight: 20 }}>
                Add
            </Button>
            <Button onPress={() => {navigation.goBack()}} uppercase={false} mode="outlined" style={{ borderRadius:5, width: 100 }}>
                Cancel
            </Button>
        </View>
    </View>
    )
}

export default EditAssingment