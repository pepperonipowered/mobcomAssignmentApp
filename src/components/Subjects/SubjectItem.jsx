import { View, Text } from 'react-native'

const SubjectItem = (subject) => {
  console.log(subject)
  
  return (
    <View>
      <Text>{subject.item?.name}</Text>
    </View>
  )
}

export default SubjectItem