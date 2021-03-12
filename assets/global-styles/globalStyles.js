import {StyleSheet} from 'react-native';

 const globalStyles = StyleSheet.create({
    input: {
      width: 295,
      height: 40,
      borderWidth: 1,
      marginTop: 5,
      borderRadius: 3,
    },
    container: {
      display: "flex", justifyContent: "center",alignItems: "center",
      color: "white",
      backgroundColor: "#0f893b"
    },
  
    button: {
      width: 200,
      height: 50,
      backgroundColor: "#014732",
      color: "white",
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: 16,
      marginTop: 20,
      alignSelf: "center",
      borderRadius: 4,
  
    },
    text: {
      color: "white",
      fontSize: 16,
    },
    card: {
      borderRadius: 10,
      display: "flex",
      padding: 40,
      shadowOpacity: 0.48,
      shadowRadius: 11.95,
      elevation: 18,
    }
  })

  export default globalStyles;