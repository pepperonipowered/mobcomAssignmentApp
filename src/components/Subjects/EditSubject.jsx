import { Keyboard, View } from "react-native";
import { useState, useEffect} from "react";
import { TextInput, Button, MD3Colors } from "react-native-paper";
import { getDoc, doc, updateDoc, serverTimestamp, collection } from "firebase/firestore";import { FIREBASE_DB } from "../../../firebaseConfig";

const EditSubject = ({ navigation, route }) => {
  const { subjectId } = route.params;
  const subjectRef = doc(collection(FIREBASE_DB, "subjects"), subjectId);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const fetchSubject = async () => {
    try {
      const docSnap = await getDoc(subjectRef);
  
      if (docSnap.exists()) {
        setName(docSnap.data().name);
        setCode(docSnap.data().code);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("Error getting document:", error);
    }
  };

  const editSubject = async () => {
    try {
      await updateDoc(subjectRef, {
        name: name,
        code: code,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = () => {
    editSubject();
    navigation.navigate("Subjects List");
  };

  useEffect(() => {
    fetchSubject();
  }, []);
  return (
    <View style={{ flex: 1, marginHorizontal: 20 }}>
      <TextInput
        label="Subject Name"
        placeholder="e.g. MOBCOM Lab 1"
        mode="outlined"
        value={name}
        onChangeText={(text) => {
          setName(text);
        }}
        right={<TextInput.Icon icon="clipboard-text-outline" />}
        style={{ marginBottom: 20 }}
      />

      <TextInput
        label="Subject Code"
        placeholder="e.g. Some description here..."
        mode="outlined"
        value={code}
        onChangeText={(text) => {
          setCode(text);
        }}
        right={<TextInput.Icon icon="script-text-outline" />}
        style={{ marginBottom: 20 }}
      />

      <View style={{ alignItems: "center", flexDirection: "row" }}>
        <Button
          onPress={onSubmit}
          uppercase={false}
          mode="contained"
          style={{
            borderRadius: 5,
            backgroundColor: MD3Colors.primary50,
            width: 100,
            marginRight: 20,
          }}
        >
          Save
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
  );
};

export default EditSubject;
