import { Keyboard, View, } from 'react-native'
import { useState} from 'react'
import { TextInput, Button, MD3Colors, HelperText } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { Formik } from 'formik';
import { FIREBASE_DB } from '../../../firebaseConfig';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { addSubjectSchema } from '../../lib/form-schemas';

const AddAssignment = ({
  navigation
}) => {

  const addSubject = async (values) => {
    try {
      await addDoc(collection(FIREBASE_DB, 'subjects'), {
        name: values.name,
        code: values.code,
        createdAt: values.createdAt,
        updatedAt: values.updatedAt
      })

    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = (values) => {
    addSubject(values)
    navigation.navigate('Subjects List');
  }

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          code: '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        }}
        onSubmit={onSubmit}
        validationSchema={addSubjectSchema}
      >
        {({values, errors, handleChange, handleBlur, handleSubmit, isSubmitting,}) => (
          <View style={{ flex: 1, marginHorizontal: 20, marginVertical: 20 }}>
            <TextInput
              label="Subject name (required)"
              placeholder="e.g. Operating Systems"
              mode="outlined"
              value={values.name}
              onChangeText={handleChange('name')}
              right={<TextInput.Icon icon="clipboard-text-outline" />}
              onBlur={handleBlur('name')}
            />
            <HelperText type="error" visible={errors.name ? true : false}>
              {errors.name}
            </HelperText>

            <TextInput
              label="Subject code (required)"
              placeholder="e.g. MOBCOM"
              mode="outlined"
              value={values.code}
              onChangeText={handleChange('code')}
              right={<TextInput.Icon icon="clipboard-text-outline" />}
              onBlur={handleBlur('code')}
            />
            <HelperText type="error" visible={errors.code ? true : false}>
              {errors.code}
            </HelperText>

            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <Button onPress={ handleSubmit } uppercase={false} mode="contained" style={{ borderRadius:5, backgroundColor: MD3Colors.primary50, width: 100, marginRight: 20 }}>
                  Submit
              </Button>
              <Button onPress={() => {Keyboard.dismiss(); navigation.goBack()}} uppercase={false} mode="outlined" style={{ borderRadius:5, width: 100 }}>
                  Cancel
              </Button>
            </View>
          </View>
        )}
        
      </Formik>
      
    </>
  )
}

export default AddAssignment