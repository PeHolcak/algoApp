import React, { useImperativeHandle, forwardRef } from 'react';
import { View, StyleSheet } from 'react-native';

import Slider from '@react-native-community/slider';

import { Modal, Portal, Text, IconButton, Headline, Button, Checkbox } from 'react-native-paper';

const GenerateRandomNumbersModal = forwardRef((props, ref) => {

    const [visible, setVisible] = React.useState(false);

    const [columns, setColumns] = React.useState(0);

    const [maxValue, setMaxValue] = React.useState(0);

    const [minValue, setMinValue] = React.useState(0);

    const [deleteExistingNumbers, setDeleteExistingNumbers] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', margin: 20 };


    useImperativeHandle(ref, () => ({
        close() {
            hideModal();
        },

        show() {
            showModal();
        }

    }));

    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <View style={styles.modalBar}>
                    <Headline style={styles.modalHeader}>Generování čísel</Headline>
                    <View style={styles.modalButtons}>
                        <IconButton
                            icon={"window-close"}
                            size={20}
                            onPress={hideModal}
                            style={styles.closeButton}
                        />
                    </View>
                </View>
                <View style={styles.modalContent}>
                    <Slider
                        style={styles.slider}
                        value={columns}
                        minimumValue={1}
                        maximumValue={(deleteExistingNumbers)?200:(200-props.currentNumbersCount)}
                        minimumTrackTintColor="#000000"
                        maximumTrackTintColor="#FFFFFF"
                        onSlidingComplete={(value) => setColumns(Math.round(value))}
                    />
                    <Text>Počet sloupců: {columns}</Text>

                    <Slider
                        style={styles.slider}
                        minimumValue={1}
                        maximumValue={999}
                        value={maxValue}
                        minimumTrackTintColor="#000000"
                        maximumTrackTintColor="#FFFFFF"
                        onSlidingComplete={(value) => setMaxValue(Math.round(value))}
                    />
                    <Text>Maximální hodnota: {maxValue}</Text>

                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={100}
                        value={minValue}
                        minimumTrackTintColor="#000000"
                        maximumTrackTintColor="#FFFFFF"
                        onSlidingComplete={(value) => setMinValue(Math.round(value))}
                    />
                    <Text>Minimální hodnota: {minValue}</Text>
                    <View style={styles.checkBoxContainer}>
                        <Checkbox
                            status={deleteExistingNumbers ? 'checked' : 'unchecked'}
                            label="dsadadas"
                            onPress={() => {
                                setDeleteExistingNumbers(!deleteExistingNumbers);
                            }}
                        />
                            <Text>Smazat předchozí sloupce</Text>
                    </View>
                    <Button onPress={() => { ref.current.close();props.execute(columns, maxValue, minValue, deleteExistingNumbers)}}>Generovat</Button>
                </View>
            </Modal>
        </Portal>
    )
})

const styles = StyleSheet.create({
    checkBoxContainer:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center"
    },  
    closeButton: {
        margin: 0
    },
    modalHeader: {
        paddingLeft: 10
    },
    modalBar: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    modalContent: {
        padding: 20,
        paddingTop: 0,
        paddingBottom: 10
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    slider:{
        height: 40
    }
});

export default GenerateRandomNumbersModal
