import { Keyboard, View, } from 'react-native'
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
  const { assignmentId, subjectId } = route.params
  const assignmentRef = doc(collection(FIREBASE_DB, 'assignments'), assignmentId)
  const subjectsRef = collection(FIREBASE_DB, 'subjects');
  const fetchSingleAssignment = async () => {
    const subscribe = onSnapshot( assignmentRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          setAssignment(docSnapshot.data())
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

  return (
    <View>
      <Text>{assignment.title}</Text>
    </View>
  )
}

export default AssignmentDetails