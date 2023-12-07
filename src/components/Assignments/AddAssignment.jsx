import { Keyboard, View, ViewComponent } from "react-native";
import { useEffect, useState, useCallback } from "react";
import {
  TextInput,
  Button,
  MD3Colors,
  HelperText,
  Text,
  Divider,
  ActivityIndicator,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { Formik } from "formik";
import { FIREBASE_DB } from "../../../firebaseConfig";
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { addAssignmentSchema } from "../../lib/form-schemas";
import DropDownPicker from "react-native-dropdown-picker";
import * as Notifications from "expo-notifications";

const subjectsRef = collection(FIREBASE_DB, "subjects");


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const AddAssignment = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [openSubject, setOpenSubject] = useState(false);
  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState([
    {
      label: "",
      value: "",
    },
  ]);

  const [openPaper, setOpenPaper] = useState(false);
  const [paper, setPaper] = useState("");
  const [papers, setPapers] = useState([
    { label: "1/4", value: "one-fourth" },
    { label: "1/2", value: "one-half" },
    { label: "1 whole", value: "one-whole" },
    { label: "Short bond paper", value: "short-bond-paper" },
    { label: "Long bond paper", value: "long-bond-paper" },
  ]);

  const [loading, setLoading] = useState(true);
  const [scheduledNotifications, setScheduledNotifications] = useState([]);
  const [notificationsScheduled, setNotificationsScheduled] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);
    setDate(currentDate);
  };
  const onChangeTime = (event, selectedTime) => {
    if (selectedTime) {
      setShowTimePicker(false);
      setTime(selectedTime);
    }
  };



//Notification
// async function scheduleNotification(title, seconds, isTimeUp = false, identifier) {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: isTimeUp ? `Your assignment ${title} is due today.`: "Your assignment is almost due.",
//       body: isTimeUp ? "Due today" : "Almost due",
//       data: { data: "goes here" },
//     },
//     trigger: { seconds },
//   });
//   setScheduledNotifications([...scheduledNotifications, identifier]);
// }

// async function fetchAndScheduleNotification() {
//   const q = query(collection(FIREBASE_DB, "notifications"));
//   const querySnapshot = await getDocs(q);
  
//   for (const doc of querySnapshot.docs) {
//     const data = doc.data();
//     const dateTime = data.date.toDate();
//     const name = data.name;
//     const diffInSeconds = (dateTime.getTime() - new Date().getTime()) / 1000;
//     const identifierGoodDay = `${name}-${dateTime.getTime()}-goodday`;
//     const identifierTimesUp = `${name}-${dateTime.getTime()}-timesup`;

//     if (diffInSeconds > notifyMinutes * 60 && !scheduledNotifications.includes(identifierGoodDay)) {
//       await scheduleNotification(name, diffInSeconds - notifyMinutes * 60, false, identifierGoodDay); 
//       setScheduledNotifications([...scheduledNotifications, identifierGoodDay]);
//     } else if (diffInSeconds > 0 && !scheduledNotifications.includes(identifierTimesUp)) {
//       await scheduleNotification(name, diffInSeconds, true, identifierTimesUp); 
//       setScheduledNotifications([...scheduledNotifications, identifierTimesUp]);
//     }
//   }
// }

  const addAssignment = async (values) => {
    try {
      await addDoc(collection(FIREBASE_DB, "assignments"), {
        title: values.title,
        description: values.description,
        subject: subject,
        notif_mins: values.notif_mins,
        date: date,
        time: time,
        status: values.status,
        paper: paper,
        createdAt: values.createdAt,
        updatedAt: values.updatedAt,
      });

      await Notifications.scheduleNotificationAsync({
        content: {
          title: `Notification scheduled for ${values.title}`,
          body:
            "You have created a schedule due on " +
            format(date, 'MMMM dd, yyyy'),
          data: { data: "goes here" },
        },
        trigger: { seconds: 1 },
      });

      // fetchAndScheduleNotification();

    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const snapshot = await getDocs(subjectsRef);
      const subjects = snapshot.docs.map((doc) => ({
        label: doc.data().code,
        value: doc.id,
      }));
      setSubjects(subjects);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(()=>{
    fetchSubjects();
  },[])
  // useEffect(() => {
  //   fetchSubjects();
  //   if (!notificationsScheduled) {
  //     fetchAndScheduleNotification();
  //     setNotificationsScheduled(true);
  //   }
  // }, [notificationsScheduled]);

  console.log(subjects);
  const onSubmit = (values) => {
    addAssignment(values);
    navigation.navigate("Assignment List");
  };

  return (
    <>
      {loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator
            animating={true}
            color={MD3Colors.primary50}
            size={"large"}
            style={{ marginBottom: 5 }}
          />
          <Text variant="titleMedium">Loading the form please wait...</Text>
        </View>
      ) : (
        <Formik
          initialValues={{
            title: "",
            description: "",
            notif_mins: "",
            date: date,
            status: false,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          }}
          onSubmit={onSubmit}
          validationSchema={addAssignmentSchema}
        >
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <View style={{ flex: 1, marginHorizontal: 20, marginTop: 20 }}>
              <View>
                <DropDownPicker
                  open={openSubject}
                  value={subject}
                  items={subjects}
                  setOpen={setOpenSubject}
                  setValue={setSubject}
                  placeholder={`Select a subject`}
                  onOpen={() => setOpenSubject(!openSubject)}
                  style={{
                    borderRadius: 3,
                    backgroundColor: MD3Colors.primary99,
                  }}
                />
              </View>
              <HelperText type="error" visible={errors.subject ? true : false}>
                {errors.subject}
              </HelperText>

              <TextInput
                label="Assignment title (required)"
                placeholder="e.g. MOBCOM Lab 1"
                mode="outlined"
                value={values.title}
                onChangeText={handleChange("title")}
                right={<TextInput.Icon icon="clipboard-text-outline" />}
                onBlur={handleBlur("title")}
              />
              <HelperText type="error" visible={errors.title ? true : false}>
                {errors.title}
              </HelperText>

              <TextInput
                label="Assignment description"
                placeholder="e.g. Some description here..."
                mode="outlined"
                value={values.description}
                onChangeText={handleChange("description")}
                right={<TextInput.Icon icon="script-text-outline" />}
                onBlur={handleBlur("description")}
              />
              <HelperText
                type="error"
                visible={errors.description ? true : false}
              >
                {errors.description}
              </HelperText>
              <TextInput
                label="Due Date (Click the calendar icon)"
                mode="outlined"
                value={format(date, "MMMM dd, yyyy")}
                right={
                  <TextInput.Icon
                    icon="calendar"
                    color={"black"}
                    onPress={() => setShowDatePicker(true)}
                  />
                }
                style={{ marginBottom: 20 }}
                disabled={true}
              />
              {showDatePicker && (
                <DateTimePicker
                  mode="date"
                  display="calendar"
                  value={date}
                  onChange={onChangeDate}
                  minimumDate={new Date()}
                />
              )}
              <TextInput
                label="Due Time"
                mode="outlined"
                value={format(time, "hh:mm a")}
                right={
                  <TextInput.Icon
                    icon="clock"
                    color={"black"}
                    onPress={() => setShowTimePicker(true)}
                  />
                }
                style={{ marginBottom: 20 }}
                disabled={true}
              />

              {showTimePicker && (
                <DateTimePicker
                  mode="time"
                  display="clock"
                  value={time}
                  onChange={onChangeTime}
                />
              )}
              <TextInput
                label="Notify me before due date"
                placeholder="Enter time in minutes"
                mode="outlined"
                value={values.notif_mins}
                right={<TextInput.Icon icon="clock-outline" color={"black"} />}
                keyboardType="numeric"
                onChangeText={handleChange("notif_mins")}
                onSubmitEditing={Keyboard.dismiss}
                onBlur={handleBlur("notif_mins")}
              />
              <HelperText
                type="error"
                visible={errors.notif_mins ? true : false}
              >
                {errors.notif_mins}
              </HelperText>

              <View>
                <DropDownPicker
                  open={openPaper}
                  value={paper}
                  items={papers}
                  setOpen={setOpenPaper}
                  setValue={setPaper}
                  setItems={setPapers}
                  placeholder="Select the format"
                  onOpen={() => setOpenPaper(!openPaper)}
                  style={{
                    borderRadius: 3,
                    backgroundColor: MD3Colors.primary99,
                  }}
                />
              </View>
              <HelperText type="error" visible={errors.paper ? true : false}>
                {errors.paper}
              </HelperText>

              <View style={{ alignItems: "center", flexDirection: "row" }}>
                <Button
                  onPress={handleSubmit}
                  uppercase={false}
                  mode="contained"
                  style={{
                    borderRadius: 5,
                    backgroundColor: MD3Colors.primary50,
                    width: 100,
                    marginRight: 20,
                  }}
                >
                  Submit
                </Button>
                <Button
                  onPress={() => {
                    Keyboard.dismiss();
                    navigation.goBack();
                  }}
                  uppercase={false}
                  mode="outlined"
                  style={{ borderRadius: 5, width: 100 }}
                >
                  Cancel
                </Button>
              </View>
            </View>
          )}
        </Formik>
      )}
    </>
  );
};

export default AddAssignment;
