import React, { useEffect, useState } from "react";
import { Text, Animated, View, Easing } from "react-native";
import { styles } from "./styles";

const column = ({ percentageHeight, width, margin, numbers, number }) => {
  //const [xPosition, setXPosition] = useState((number.position+1)*width);

  let opacity = new Animated.Value((number.position + 1) * width);
  // useEffect(() => {
  //     Animated.timing(
  //         raStyle,
  //         {
  //           toValue: 100,
  //           duration: 1000
  //         }
  //       ).start();
  // }, [raStyle])

  const backgroundColor = number.active ? "grey" : "blue";

  // let moveStyle={};
  // if(number.active){
  //     Animated.timing(xPosition, {
  //         toValue: 100,
  //         easing: Easing.bounce,
  //         duration: 2000
  //       }).start();
  // }

  // const animate = easing => {
  //     opacity.setValue(0);
  //     Animated.timing(opacity, {
  //       toValue: 1,
  //       duration: 1200,
  //       easing
  //     }).start();
  //   };

  // const animatedStyles = [
  //   styles.box,
  //   {
  //     opacity
  //   }
  // ];
  // animate()
  return (
    // <Animated.View style={[{
    //     ...{
    //         height: percentageHeight + "%", width: width + "%", marginRight: (margin + "%"), marginLeft: (margin + "%"),
    //         alignItems: "center" }, ...styles.column, ...{backgroundColor}
    // }, {marginRight:xPosition}, animatedStyles]} key={number.position} >
    //     {Array.isArray(numbers) && (numbers.length < 10) && <Text style={styles.text}>
    //         {number.value}
    //     </Text>}
    // </Animated.View>
    <View
      style={[
        {
          ...{
            height: percentageHeight + "%",
            width: width + "%",
            marginRight: margin + "%",
            marginLeft: margin + "%",
            alignItems: "center",
          },
          ...styles.column,
          ...{ backgroundColor },
        },
      ]}
      key={number.position}
    >
      {Array.isArray(numbers) && numbers.length < 10 && (
        <Text style={styles.text}>{number.value}</Text>
      )}
    </View>
  );
};

export default column;
