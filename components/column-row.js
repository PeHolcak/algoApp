import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { IconButton, TextInput } from 'react-native-paper';

const ColumnRow = ({number = {value:0}, canBeDeleted, getLastPosition, execute, remove, update}) => {

    const [value, setValue] = useState(number.value);
    const [error, setError] = useState(0);

    const position = number.position?number.position:(getLastPosition&&getLastPosition());

    console.log(getLastPosition&&getLastPosition());

    if(!position)
       return <View></View>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 

    const setNumericValue = (value) => {
        if(!isNaN(value)){
            setError(0)
            setValue(value)
        }
        else{
            setError(1)
        }
        
    }

    const _execute = (position, value) => {
      position&&execute(position,value)
    }

    return (
        <View style={styles.updateNumberRow}>
            <TextInput
              label={error&&"Value has to be a number"}
              underlineColor={"red"}
              style={styles.input}
              value={value.toString()}
              keyboardType="numeric"
              onChangeText={(value)=>setNumericValue(value)}
            />
            <IconButton
              icon={canBeDeleted?"lead-pencil":"plus-circle"}
              size={20}
              onPress={() => _execute(position,value)}
            />
            {canBeDeleted &&(
              <IconButton
              icon="delete"
              size={20}
              onPress={() => remove(position)}
            />)}
        </View>
    )
}

const styles = StyleSheet.create({
    updateNumberRow:{
      flexDirection: "row",
      alignItems:"center",
      marginTop: 10,
      marginBottom: 10,
    },
    input:{
        flex:1,
      },
  });
  

export default ColumnRow
