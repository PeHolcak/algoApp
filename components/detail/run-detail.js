import React, { useImperativeHandle, forwardRef, useRef } from "react";
import { View, Text, Animated, Dimensions } from "react-native";
import { styles } from "./styles";
import Column from "./column";
// import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { AppContext } from "../../appContext";

const RunDetail = forwardRef(({ data }, ref) => {
  const [numbers, setNumbers] = React.useState(data);

  //const progress = useSharedValue(1);

  // const raStyle = useAnimatedStyle(() => {
  //     // return {
  //     //   transform: [
  //     //     {
  //     //       translateX: 50
  //     //     },
  //     //     {
  //     //       translateY: 100
  //     //     }
  //     //   ]
  //     // }
  //     return{opacity:progress.value}
  // }
  console.log("numbers", numbers);
  useImperativeHandle(ref, () => ({
    chooseSelected(firstPosition, secondPosition) {
      console.log("Choosing selected");
      setActive(firstPosition, secondPosition);
    },

    clearPreviousChoose() {
      console.log("deSelecting..");
      clearPreviousChoose();
    },

    swap(firstPosition, secondPosition) {
      console.log("Swapping...", firstPosition, secondPosition);
      swap(firstPosition, secondPosition);
    },
    setDone() {
      clearPreviousChoose();
      //showDoneDialog
    },
  }));

  const setActive = (firstPosition, secondPosition) => {
    const actualNumbers = numbers.map((number) => {
      return number.position == firstPosition ||
        number.position == secondPosition
        ? { ...number, active: true }
        : { ...number, active: false };
    });
    setNumbers([...actualNumbers]);
  };

  const swap = (firstPosition, secondPosition) => {
    let fistNumber = numbers.find((number) => number.position == firstPosition);
    let secondNumber = numbers.find(
      (number) => number.position == secondPosition
    );
    const actualNumbers = numbers.map((number) => {
      return number.position == firstPosition
        ? secondNumber
        : number.position == secondPosition
        ? fistNumber
        : number;
    });

    setNumbers([...actualNumbers]);
  };

  const clearPreviousChoose = () => {
    const actualNumbers = numbers.map((number) => {
      return { ...number, active: false };
    });

    setNumbers([...actualNumbers]);
  };

  const find_dimesions = (layout) => {
    const { width } = layout;
  };

  const _getMaxValue = () => {
    let maxValue = 0;
    numbers.forEach(({ value }) => {
      value > maxValue && (maxValue = value);
    });
    return maxValue;
  };

  const _getColumns = (layout) => {
    const numbersLength = numbers && numbers.length;
    const margin = 15 / (numbersLength * 2);
    const width = 85 / numbersLength;
    return numbers.map((number) => {
      const height = Math.round(number.value / (_getMaxValue() / 100));
      const percentageHeight = height > 5 ? height : 10;
      return (
        <Column
          key={number.position}
          percentageHeight={percentageHeight}
          width={width}
          margin={margin}
          numbers={numbers}
          number={number}
        />
      );
    });
  };

  const window = Dimensions.get("window");
  const screen = Dimensions.get("screen");
  console.log("window, screen", window, screen);

  return (
      <View
        style={Object.assign({}, styles.visual, { height: "100%" })}
        onLayout={(event) => find_dimesions(event.nativeEvent.layout)}
      >
        {_getColumns()}
      </View>
  );
});

export default RunDetail;
