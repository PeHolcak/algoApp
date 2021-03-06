import React from 'react'
import { View, StyleSheet } from 'react-native'

const Container = ({children}) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

export default Container


const styles = StyleSheet.create({
    container:{
      flexDirection: "column",
      alignSelf: 'stretch',
      padding: 20
    },
  });
  