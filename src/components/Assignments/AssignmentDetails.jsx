import { Keyboard, View, StyleSheet } from 'react-native'
import { useEffect, useState} from 'react'
import { TextInput, Button, MD3Colors, HelperText, Text } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, parseISO } from 'date-fns';
import { Formik } from 'formik';
import { FIREBASE_DB } from '../../../firebaseConfig';
import { collection, serverTimestamp, doc, getDocs, updateDoc, onSnapshot } from 'firebase/firestore';
import { addAssignmentSchema } from '../../lib/form-schemas';
import DropDownPicker from 'react-native-dropdown-picker';



const AssignmentDetails = ({navigation, route}) => {

  const [date, setDate] = useState(new Date())

  const { assignmentId, subjectId } = route.params
  const assignmentRef = doc(collection(FIREBASE_DB, 'assignments'), assignmentId)
  const subjectsRef = collection(FIREBASE_DB, 'subjects');
  const fetchSingleAssignment = async () => {
    const subscribe = onSnapshot( assignmentRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          setAssignment(docSnapshot.data())
          setDate(new Date(docSnapshot.data().date.seconds * 1000 + docSnapshot.data().date.nanoseconds / 1000000))

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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchSingleAssignment()
    fetchSubjects()
  }, [])

  const [assignment, setAssignment] = useState([])
  const [subjects, setSubjects] = useState([{
    label: '',
    value: ''
  }]);


  const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', // Or any suitable color
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: MD3Colors.primary, // Or any suitable color
    marginBottom: 1,
  },
  subject: {
    fontSize: 18,
    fontWeight: 'bold',
    color: MD3Colors.primary, // Or any suitable color
    marginBottom: 15,
  },
  description: {
    fontSize: 15,
    color: MD3Colors.primary, // Or any suitable color
    marginBottom: 10,
  },
  DueDate: {
    fontSize: 12,
    fontFamily: 'monospace', // This sets the font to monospaced
    color: 'white', // Sets the font color to white
    marginBottom: 10,
    backgroundColor: 'gray', // Sets the background color to gray
    borderRadius: 10, // Rounds the corners
    paddingHorizontal: 10, // Adds horizontal padding
    paddingVertical: 5, // Adds vertical padding
  },
  Format:{
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white', // Sets the font color to white
    marginBottom: 10,
  },


});
  return (
  <View style={styles.container}>
    <Text style={styles.title}>{assignment.title}</Text>
    <Text style={styles.subject}>{assignment.subject}</Text>
      <Text style={styles.DueDate}>
        {format(date, 'MMMM dd, yyyy')}
        {assignment.paper ? ` - ` : ""}
      <Text style={styles.Format}>{assignment.paper ? assignment.paper : ""}</Text>
    </Text>

    <Text style={styles.description}>{assignment.description}</Text>
  </View>
  )
  
}

export default AssignmentDetails