import * as React from 'react'
import QuestionBase from '../components/QuestionBase'

const options = [
  'happy',
  'sad',
  'sehnsucht',
  'defeat',
  'enthused!',
]

interface Props {
  navigation: any
}
const Mood = (props: Props) => {
  const onSelect = () => props.navigation.navigate('IntensityQuestion')
  return <QuestionBase
    onSelect={onSelect}
    navigation={props.navigation}
    questionOptions={options}
    questionName='mood'
  />
}

export default Mood
