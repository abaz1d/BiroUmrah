import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import { IconInvOn } from '../../assets'
import React from 'react'
import { WARNA_ORDER_COMPLETED, WARNA_ORDER_DELIIVERED, WARNA_ORDER_ON_PROCESS, WARNA_ORDER_PICKED, WARNA_ORDER_PLACED } from '../../utils/constant'

export default function PesananAktif({noinvoice, status}) {
  return (
    <TouchableOpacity style={styles.container}>
      <IconInvOn />
      <View style={styles.text}>
        <Text style={styles.invoice}>{noinvoice}</Text>
        <Text style={styles.status(status)}>{status}</Text>
      </View>
    </TouchableOpacity>
  )
}
const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 10,
    marginHorizontal: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 7,
    marginVertical: 0.005 * windowHeight,
    alignItems: 'center',
  },
  text: {
    marginLeft: windowWidth * 0.02,
  },
  invoice: {
    fontSize: 18,
    fontFamily: 'TitilliumWeb-SemiBold',
    color: '#000000',
    marginLeft: 10,
  },
  status: (status) => ({
    fontSize: 14,
    fontFamily: 'TitilliumWeb-Regular',
    marginLeft: 10,
    color: status === 'Order Completed' ? WARNA_ORDER_COMPLETED : 
    status === 'Order Delivered' ? WARNA_ORDER_DELIIVERED :
    status === 'Order Processing' ? WARNA_ORDER_ON_PROCESS :
    status === 'Order Picked' ? WARNA_ORDER_PICKED : WARNA_ORDER_PLACED,
  }),
})