import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { Button, Provider } from 'react-native-paper';

import styled from 'styled-components/native';

import ColumnRow from '../components/column-row';

import MiniDetail from "../components/detail/mini-detail";

import GenerateRandomNumbersModal from '../components/generate-random-numbers-modal';
import { AppContext } from '../appContext';

export default function AlgoDetail({ navigation, route }) {

  const [numbers, setNumbers] = useState((route && route.params && route.params.data) ? route.params.data : []);
  const [showAddMenu, setShowAddMenu] = useState(false);

  const showModalRef = useRef(false);

  const _remove = (position) => {
    setNumbers([...numbers.filter(number => number.position != position)]);
  }

  const _update = (position, value) => {
    const updatedNumbers = numbers.map((number) => {
      return (number.position == position) ?
        { position: position, value: value } :
        number;
    })
    setNumbers([...updatedNumbers]);
  }

  const _getUpdateNumberRows = () => {
    return numbers.map(number => {
      return (
        <ColumnRow canBeDeleted
          number={number}
          key={number.position}
          execute={_update}
          remove={_remove} />
      )
    })
  }

  const _getLastPosition = () => {
    let maxPosition = 0;
    numbers.forEach(number => {
      (number.position > maxPosition) && (maxPosition = number.position)
    });
    return ++maxPosition;
  }

  const _addNew = (position, value) => {
    setNumbers([...numbers, { position: position, value: Number(value) }])
  }

  const _toggleShowAddMenu = () => {
    setShowAddMenu(!showAddMenu);
  }

  const _getMaxValue = () => {
    let maxValue = 0;
    numbers.forEach(({ value }) => {
      (value > maxValue) && (maxValue = value);
    })
    return maxValue;
  }

  const _getMinValue = () => {
    if (numbers && numbers.length) {
      let minValue = numbers[0].value;
      numbers.forEach(({ value }) => {
        (value < minValue) && (minValue = value);
      })
      return minValue;
    }
    return 0;
  }

  const _getRandomValueWithContentMaxMin = () => {
    return Math.round((Math.random() * (_getMaxValue() - _getMinValue() + 1)) + _getMinValue());
  }

  const _setRandomNumber = () => {
    setNumbers([...numbers, { position: _getLastPosition(), value: _getRandomValueWithContentMaxMin() }])
  }


  const _generateRandomNumbers = (columns, maxValue, minValue, deleteExistingNumbers) => {

    const maxPosition = (deleteExistingNumbers) ? 0 : (_getLastPosition() + 1);

    let generatedNumbers = []
    for (let i = maxPosition; i < (columns + maxPosition); i++) {
      generatedNumbers.push(
        { position: i, value: (Math.round((Math.random() * (maxValue - minValue + 1)) + minValue)) })
    }

    (deleteExistingNumbers) ? setNumbers([...generatedNumbers]) : setNumbers([...numbers, ...generatedNumbers])
  }

  return (

    <AppContext.Provider value={{ content:  (route && route.params && route.params.content)?route.params.content:1}}>
      <Provider>
        <GenerateRandomNumbersModal execute={_generateRandomNumbers} ref={showModalRef} currentNumbersCount={numbers && numbers.length} />
        <Button
          icon="play"
          style={styles.runButton}
          onPress={() =>
            navigation.navigate("AlgoRun", { numbers })
          }
        >Spustit</Button>
        <View style={styles.pageContainer}>
          <MiniDetail numbers={numbers} maxVaulueCallBack={_getMaxValue} />
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.updateTextInputContainer}>
              {_getUpdateNumberRows()}
            </View>
            <View style={styles.buttonStyle}>
              <ActionButton onPress={_toggleShowAddMenu}>
                {showAddMenu ? "Hide" : "Show"}
              </ActionButton>
              {showAddMenu && (<><ActionButton onPress={_setRandomNumber}>
                Random number
              </ActionButton>
                <ActionButton onPress={() => (showModalRef.current.show())}>
                  Random numbers
                </ActionButton>
              </>
              )
              }
            </View>
            <View style={styles.addNewStyle}>
              {showAddMenu && (<ColumnRow
                execute={_addNew}
                getLastPosition={_getLastPosition} />)}
            </View>
          </ScrollView>
        </View>
      </Provider>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flexDirection: "column",
    flex: 1,
    padding: 20
  },
  scrollContainer: {
    flexDirection: "column",
    flex: 1
  },
  visual: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    alignSelf: 'stretch',
    backgroundColor: "green",
    height: 200
  },
  scrollViewContainer: {
    flexDirection: "column",
  },
  buttonStyle: {
    flexDirection: "row"
  },
  closeButton: {
    margin: 0
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  modalContent: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 10
  },
  runButton: {
    backgroundColor: "#ff0000",
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1
  }
});

const ActionButton = styled(Button)`
  background-color: red;
`;