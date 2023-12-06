import { Keyboard, View, } from 'react-native'
import { useEffect, useState} from 'react'
import { TextInput, Button, MD3Colors, HelperText } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, parseISO } from 'date-fns';
import { Formik } from 'formik';
import { FIREBASE_DB } from '../../../firebaseConfig';
import { collection, serverTimestamp, doc, getDocs, updateDoc, onSnapshot } from 'firebase/firestore';
import { addAssignmentSchema } from '../../lib/form-schemas';
import DropDownPicker from 'react-native-dropdown-picker';

const EditAssignment = ({
  navigation,
  route
}) => {

  const { assignmentId, subjectId } = route.params
  console.log(assignmentId, subjectId)
  const assignmentRef = doc(collection(FIREBASE_DB, 'assignments'), assignmentId)
  const subjectsRef = collection(FIREBASE_DB, 'subjects');


  const fetchSingleAssignment = async () => {
    const subscribe = onSnapshot( assignmentRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          setAssignment(docSnapshot.data())
          setLoading(true);
        } else {
          console.log('Assignment does not exist')
        }
      }
    )
    // got all data? then unsubscribe from the connection
    return  () => subscribe;
  }

  const fetchSubjects = async () => {
    try {
      const snapshot = await getDocs(subjectsRef);
      const subjects = snapshot.docs.map((doc) => ({
        label: doc.data().code,
        value: doc.id
      }));
      setSubjects(subjects);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchSingleAssignment()
    fetchSubjects()
  }, [])

  const [assignment, setAssignment] = useState([])
  const formattedDate = new Date(assignment.date?.seconds * 1000 + assignment.date?.nanoseconds / 1000000)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [notifMins, setNotifMins] = useState('')

  const [date, setDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDatePicker(false)
    setDate(currentDate);
  };
  
  const [openSubject, setOpenSubject] = useState(false);
  const [subject, setSubject] = useState(subjectId)
  const [subjects, setSubjects] = useState([{
    label: '',
    value: ''
  }]);
  
  const [openPaper, setOpenPaper] = useState(false)
  const [paper, setPaper] = useState('')
  const [papers, setPapers] = useState([
    {label: '1/4', value: 'one-fourth'},
    {label: '1/2', value: 'one-half'},
    {label: '1 whole', value: 'one-whole'},
    {label: 'Short bond paper', value: 'short-bond-paper'},
    {label: 'Long bond paper', value: 'long-bond-paper'},
  ]);
  
  const [loading, setLoading] = useState(true);

  const editAssignment = async () => {
    try {
      await updateDoc(doc(FIREBASE_DB, 'assignments', assignmentId), {
        title: title,
        description: description,
        notif_mins: notifMins,
        date: date,
        status: status,
        updatedAt: serverTimestamp()
      })
      
      
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = () => {
    // editAssignment(values)
    // navigation.navigate('Assignment List');
  }
  
  return (
    <>
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <View style={{ marginTop: 20 }}>

        <DropDownPicker
            open={openSubject}
            value={subject}
            items={subjects}
            setOpen={setOpenSubject}
            setValue={setSubject}
            placeholder={`Select a subject`}
            onOpen={() => setOpenSubject(!openSubject)}
            style={{ borderRadius: 3, backgroundColor: MD3Colors.primary99, marginBottom: 20 }}
            />
        </View>
        <TextInput
          label="Assignment title (required)"
          placeholder="e.g. MOBCOM Lab 1"
          mode="outlined"
          value={assignment.title}
          onChangeText={(text) => {setTitle(text)}}
          right={<TextInput.Icon icon="clipboard-text-outline" />}
          style={{ marginBottom: 20 }}
        />

        <TextInput
          label="Assignment description"
          placeholder="e.g. Some description here..."
          mode="outlined"
          value={assignment.description}
          onChangeText={(text) => {setDescription(text)}}
          right={<TextInput.Icon icon="script-text-outline" />}
          style={{ marginBottom: 20 }}
        />

        <TextInput
          label="Due Date"
          mode="outlined"
          value={format(date, 'MMMM dd, yyyy')}
          right={<TextInput.Icon icon="calendar" color={'black'} onPress={() => setShowDatePicker(true)} />}
          style={{ marginBottom: 20 }}
          disabled={true}
        />

        {showDatePicker && (
          <DateTimePicker 
            mode="date" 
            display="calendar" 
            value={assignment.date?.toDate()}
            onChange={onChangeDate}
            minimumDate={new Date()}
          />
        )}
        
        <TextInput
          label="Notify me before due date"
          placeholder="Enter time in minutes"
          mode="outlined"
          value={assignment.notif_mins}
          right={<TextInput.Icon icon="clock-outline" color={'black'} />}
          style={{ marginBottom: 20 }}
          keyboardType="numeric"
          onChangeText={(text) => {setNotifMins(text)}}
          onSubmitEditing={Keyboard.dismiss}
        />

        <View>
          <DropDownPicker
            open={openPaper}
            value={assignment.paper}
            items={papers}
            setOpen={setOpenPaper}
            setValue={setPaper}
            setItems={setPapers}
            placeholder='Select the format'
            onOpen={() => setOpenPaper(!openPaper)}
            style={{ borderRadius: 3, backgroundColor: MD3Colors.primary99, marginBottom: 20 }}
          />
        </View>

        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <Button onPress={ onSubmit } uppercase={false} mode="contained" style={{ borderRadius:5, backgroundColor: MD3Colors.primary50, width: 100, marginRight: 20 }}>
              Save
          </Button>
          <Button onPress={() => {Keyboard.dismiss(); navigation.goBack()}} uppercase={false} mode="outlined" style={{ borderRadius:5, width: 100 }}>
              Cancel
          </Button>
        </View>
      </View>
    </>
  )
}

export default EditAssignment