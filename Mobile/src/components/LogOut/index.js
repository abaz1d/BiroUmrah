import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import { IconLogOut } from '../../assets'
import React from 'react'
import { WARNA_ORDER_COMPLETED, WARNA_ORDER_DELIIVERED, WARNA_ORDER_ON_PROCESS, WARNA_ORDER_PICKED, WARNA_ORDER_PLACED } from '../../utils/constant'

export default function PesananAktif({ title, }) {
  return (
    <TouchableOpacity style={styles.container}>
      <IconLogOut />
      <View style={styles.text}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}
const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 10,
    marginHorizontal: 30,
    borderBottomWidth: 1,
    borderColor: 'Black',
    marginVertical: 0.005 * windowHeight,
    alignItems: 'center',
  },
  text: {
    marginLeft: windowWidth * 0.02,
  },
  text: {
    fontSize: 18,
    fontFamily: 'TitilliumWeb-SemiBold',
    color: '#000000',
    marginLeft: windowWidth * 0.02,
  },
})