import React , { useRef, useContext } from 'react';
import { View, Text,  StyleSheet } from 'react-native';
import RunDetail from "../components/detail/run-detail";

import {bubbleSort, selectionSort, heapSort} from "../algorithms/sorting-algo";
import { IconButton, Button } from 'react-native-paper';

import * as ScreenOrientation from 'expo-screen-orientation';

import { AppContext } from '../appContext';

const AlgoRun = (props) => {
    const appContext = useContext(AppContext);
    const showModalRef = useRef(false);

    const numbers = (props.route&&
        props.route.params&&
        props.route.params.numbers)?
        props.route.params.numbers:
        [];
    
    const run = () => {

        let myPromise = new Promise(function(resolve) {
            console.log("appContext.content",appContext.content);
            switch(appContext.content){
                case 1:
                    bubbleSort(numbers, chooseSelected, clearPreviousChoose, swap);
                break;
                case 2:
                    selectionSort(numbers, chooseSelected, clearPreviousChoose, swap);
                break;
                default:
                    heapSort(numbers, chooseSelected, clearPreviousChoose, swap);
                break;
            }
            resolve()
          });
          
          myPromise.then(
            function(value) {showModalRef.current.setDone();},
            function(error) {console.log("fail")}
          );
    }

    const chooseSelected = (firstPosition,secondPosition) => {
        showModalRef.current.chooseSelected(firstPosition,secondPosition);
    }

    const clearPreviousChoose = () => {
        showModalRef.current.clearPreviousChoose();
    }

    const swap = (firstPosition, secondPosition) => {
        console.log("firstPosition, secondPosition) => {", firstPosition, secondPosition);
        showModalRef.current.swap(firstPosition, secondPosition);
    }

    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    return (
     
            <View>
                <RunDetail data={numbers} ref={showModalRef}/>
                <IconButton
                    style={styles.runButton}
                    icon="play"
                    color={"black"}
                    size={20}
                    onPress={run}
                /> 
            </View>
       
        )
}

const styles = StyleSheet.create({
    runButton: {
        backgroundColor: "#ff0000",
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1
    }
  });

export default AlgoRun;
