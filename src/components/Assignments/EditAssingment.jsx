import { Keyboard, View, } from 'react-native'
import { useEffect, useState} from 'react'
import { TextInput, Button, MD3Colors, HelperText } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, parseISO } from 'date-fns';
import { Formik } from 'formik';
import { FIREBASE_DB } from '../../../firebaseConfig';
import { collection, serverTimestamp, doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { addAssignmentSchema } from '../../lib/form-schemas';

const EditAssignment = ({
  navigation,
  route
}) => {
  const [date, setDate] = useState(new Date)
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [assignment, setAssignment] = useState([])
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  
  
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDatePicker(false)
    setDate(currentDate);
  };
  const { assignmentId } = route.params
  
  
  const assignmentRef = doc(collection(FIREBASE_DB, 'assignments'), assignmentId)

  const fetchSingleAssignment = async () => {
    const subscribe = onSnapshot( assignmentRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          setAssignment(docSnapshot.data())
          setIsDataLoaded(true);
        } else {
          console.log('Assignment does not exist')
        }
      }
    )
    // got all data? then unsubscribe from the connection
    return  () => subscribe;
  }

  useEffect(() => {
    fetchSingleAssignment()
  }, [])

  const seconds = assignment.date?.seconds ?? 0
  const nanoseconds = assignment.date?.nanoseconds ?? 0
  const formattedDate = new Date(seconds * 1000 + nanoseconds / 1000000)
  console.log('F0rmatted date', new Date(formattedDate))
  console.log(assignment.notif_mins)

  const editAssignment = async (values) => {
    try {
      await updateDoc(doc(FIREBASE_DB, 'assignments', assignmentId), {
        title: values.title,
        description: values.description,
        notif_mins: values.notif_mins,
        date: values.date,
        status: values.status,
        updatedAt: values.updatedAt
      })
      
      
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = (values) => {
    console.log(values.title)
    // editAssignment(values)
    navigation.navigate('Assignment List');
  }
  
  return (
    <>
    {isDataLoaded && (
      <Formik
        initialValues={{
          title: assignment.title,
          description: assignment.description,
          notif_mins: assignment.notif_mins,
          date: formattedDate,
          status: assignment.status,
          updatedAt: new Date()
        }}
        onSubmit={onSubmit}
        validationSchema={addAssignmentSchema}
      >
        {({values, errors, handleChange, handleBlur, handleSubmit, isSubmitting,}) => (
          <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: 20 }}>
            <TextInput
              label="Assignment title (required)"
              placeholder="e.g. MOBCOM Lab 1"
              mode="outlined"
              value={values.title}
              onChangeText={handleChange('title')}
              right={<TextInput.Icon icon="clipboard-text-outline" />}
              style={{  }}
              onBlur={handleBlur('title')}
            />
            <HelperText type="error" visible={errors.title ? true : false}>
              {errors.title}
            </HelperText>
            <TextInput
              label="Assignment description"
              placeholder="e.g. Some description here..."
              mode="outlined"
              value={values.description}
              onChangeText={handleChange('description')}
              right={<TextInput.Icon icon="script-text-outline" />}
              style={{ marginBottom: 20 }}
              onBlur={handleBlur('description')}
            />
            <TextInput
              label="Due Date"
              mode="outlined"
              value={format(new Date(formattedDate), 'MMMM dd, yyyy')}
              right={<TextInput.Icon icon="calendar" color={'black'} onPress={() => setShowDatePicker(true)} />}
              style={{ marginBottom: 20 }}
              disabled={true}
            />
            {showDatePicker && (
              <DateTimePicker 
                mode="date" 
                display="calendar" 
                value={new Date(formattedDate)}
                onChange={onChangeDate}
                minimumDate={new Date()}
              />
            )}
            <TextInput
              label="Notify me before due date"
              placeholder="Enter time in minutes"
              mode="outlined"
              value={values.notif_mins}
              right={<TextInput.Icon icon="clock-outline" color={'black'} />}
              style={{ marginBottom: 20 }}
              keyboardType="numeric"
              onChangeText={handleChange('notif_mins')}
              onSubmitEditing={Keyboard.dismiss}
              onBlur={handleBlur('notif_mins')}
            />
            <HelperText type="error" visible={errors.notif_mins ? true : false}>
              {errors.notif_mins}
            </HelperText>

            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <Button onPress={ onSubmit } uppercase={false} mode="contained" style={{ borderRadius:5, backgroundColor: MD3Colors.primary50, width: 100, marginRight: 20 }}>
                  Save
              </Button>
              <Button onPress={() => {Keyboard.dismiss(); navigation.goBack()}} uppercase={false} mode="outlined" style={{ borderRadius:5, width: 100 }}>
                  Cancel
              </Button>
            </View>
          </View>
        )}
        
      </Formik>
      )}
    </>
  )
}

export default EditAssignment