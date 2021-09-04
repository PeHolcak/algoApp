import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-paper';

export default function HomeListItem(props) {

  return (
    <View style={styles.container}>
      <Button style={styles.button} onPress={props.onPress}>{props.name}</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
  button: {
    backgroundColor: "red"
  }
});