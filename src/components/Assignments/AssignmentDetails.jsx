import { Keyboard, View, StyleSheet } from 'react-native'
import { useEffect, useState} from 'react'
import { TextInput, Button, MD3Colors, HelperText, Text } from 'react-native-paper'
import { format, parseISO } from 'date-fns';
import { FIREBASE_DB } from '../../../firebaseConfig';
import { collection, serverTimestamp, doc, getDocs, updateDoc, onSnapshot, getDoc } from 'firebase/firestore';


const AssignmentDetails = ({ route }) => {
  const [date, setDate] = useState(new Date());
  const [assignment, setAssignment] = useState([]);
  const [subject, setSubject] = useState(null);

  const { assignmentId } = route.params;
  const assignmentRef = doc(collection(FIREBASE_DB, 'assignments'), assignmentId);

  const fetchSingleAssignment = async () => {
    const subscribe = onSnapshot(assignmentRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const assignmentData = docSnapshot.data();
        setAssignment(assignmentData);
        setDate(new Date(assignmentData.date.seconds * 1000 + assignmentData.date.nanoseconds / 1000000));
        fetchSubject(assignmentData.subject); // Fetch the subject
      } else {
        console.log('Assignment does not exist');
      }
    });

    return () => subscribe();
  };

  const fetchSubject = async (subjectId) => {
    if (subjectId) {
      const subjectRef = doc(collection(FIREBASE_DB, 'subjects'), subjectId);
      const subjectSnapshot = await getDoc(subjectRef);
      if (subjectSnapshot.exists()) {
        setSubject(subjectSnapshot.data());
      } else {
        console.log('Subject does not exist');
      }
    }
  };

  useEffect(() => {
    fetchSingleAssignment();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: MD3Colors.primary,
      marginBottom: 10,
    },
    subject: {
      fontSize: 18,
      fontWeight: 'bold',
      color: MD3Colors.primary,
      marginBottom: 15,
    },
    description: {
      fontSize: 15,
      color: MD3Colors.primary,
      marginBottom: 10,
    },
    DueDate: {
      fontSize: 12,
      fontFamily: 'monospace',
      color: 'white',
      marginBottom: 10,
      backgroundColor: 'gray',
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    Format: {
      fontSize: 12,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 10,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{assignment.title}</Text>
      <Text style={styles.subject}>{subject ? subject.name : 'Loading...'}</Text>
      <Text style={styles.DueDate}>
        {format(date, 'MMMM dd, yyyy')}
        {assignment.paper ? ` - ` : ""}
        <Text style={styles.Format}>{assignment.paper ? assignment.paper : ""}</Text>
      </Text>
      <Text style={styles.description}>{assignment.description}</Text>
    </View>
  );
};

export default AssignmentDetails;

