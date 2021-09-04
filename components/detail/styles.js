import { StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
    visual: {
        flexDirection: "row",
        alignItems: "flex-end",
        alignSelf: 'stretch',
        backgroundColor: "green"
    },
    column: {
        justifyContent:"flex-end",
        backgroundColor: "blue"
    },
    text: {
        textAlign: "center"
    },  
    moveStyle: {
        position: "absolute",
        zIndex: 1
    }
});