import React from 'react';
import { View, Text } from 'react-native';
import { styles } from "./styles";

const MiniDetail = ({ numbers, maxVaulueCallBack }) => {

    const find_dimesions = (layout) => {
        const { width } = layout;
        console.log("find_dimesions", width);
    }

    const _getColumns = (layout) => {
        return numbers.map(number => {
            const height = Math.round((number.value / (maxVaulueCallBack() / 100)));
            const percentageHeight = ((height > 5) ? height : 10) + "%";
            console.log(numbers, numbers.length, Array.isArray(numbers), (numbers.lenght > 15))
            const numbersLength = numbers && numbers.length;
            const margin = 15 / (numbersLength * 2);
            const width = ((85) / numbersLength) + "%";
            return (
                <View key={number.position}
                    style={{
                        ...{
                            height: percentageHeight, width: width, marginRight: (margin + "%"), marginLeft: (margin + "%"),
                            alignItems: "center"
                        }, ...styles.column
                    }}
                >
                    {Array.isArray(numbers) && (numbers.length < 10) && <Text style={styles.text}>
                        {number.value}
                    </Text>}
                </View>
            )
        }
        )
    }

    return (
        <View style={Object.assign({}, styles.visual, { height: 200 })} onLayout={(event) => find_dimesions(event.nativeEvent.layout)}>
            {_getColumns()}
        </View>
    )
}

export default MiniDetail;
