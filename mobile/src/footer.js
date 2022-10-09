import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const footer = ({newItemAdd}) => {
  return (
    <View style={styles.main}>
      <Text style={styles.name}>powered by msfsgl58</Text>
      <TouchableOpacity
        onPress={() => {
          newItemAdd();
        }}>
        <View style={styles.btn}>
          <Text>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default footer;

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#66BB6A',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 120,
    width: '100%',
  },
  btn: {
    borderWidth: 2,
    borderColor: '#0b6209',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 28,
    width: 28,
    margin: 5,
    marginRight: 10,
  },
  name: {
    fontSize: 10,
    margin: 8,
  }
});
