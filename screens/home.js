import React, {useContext} from 'react';
import { StyleSheet, Text } from 'react-native';
import HomeListItem from "../components/home-list-item";
import Container from "../hoc/container";
import Constants from 'expo-constants';
//import { AppContext } from '../appContext';

const INITIAL_COLUMN_COUNT = 5;


const DATA = [
  { id: 1, name: "Bubble sort", navigateTo: "AlgoDetail" },
  { id: 2,name: "Bogosort", navigateTo: "AlgoDetail" },
  { id: 3,name: "Nastavení", navigateTo: "AlgoDetail" }
]

export default function Home({ navigation }) {
  
  // const [context, setContext] = useContext(AppContext);

  const _getRandomValueWithStaticMaxMin = (max, min) => {
    return Math.round((Math.random() * (max - min + 1)) + min);
  }

  const _getInitialData = () => {
    const initialData = [];
    let position = 0;
    for (let i = 0; i < INITIAL_COLUMN_COUNT; i++) {
      initialData.push({position:position++,value:_getRandomValueWithStaticMaxMin(100, 0)})
    }
    return initialData;
  }

  const _getRow = () => {
    return (
      DATA.map((row) => {
        return (<HomeListItem key={row.id} name={row.name} style={styles.row} onPress={() =>
          {
            navigation.navigate(row.navigateTo,{data:_getInitialData(), content:row.id });
          }
        } />)
      })
    )
  }

  return (
    <Container style={styles.page}>
      {_getRow()}
      <Text>test</Text>
    </Container>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1
  },
  page: {
    marginTop: Constants.statusBarHeight
  },
});
