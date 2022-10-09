import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const header = () => {
  return (
    <View style={styles.main}>
      <Text style={styles.text}>Sozluk v.1</Text>
    </View>
  );
};

export default header;

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#66BB6A',
    width: '100%',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
});
