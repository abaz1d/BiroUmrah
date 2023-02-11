import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import { IconAirplane, IconAirplaneOff, IconAirplaneOn, IconInvOn, IconMecca, IconMedina } from '../../assets'
import React from 'react'
import moment from "moment";
import { WARNA_ORDER_COMPLETED, WARNA_ORDER_DELIIVERED, WARNA_ORDER_ON_PROCESS, WARNA_ORDER_PICKED, WARNA_ORDER_PLACED } from '../../utils/constant'

export default function PesananAktif({ item }) {
  let Icon
  let Waktu
  if (item.flag_md == 1 && item.flag_mk == 1) {
    if (item.pulang) {
      Icon = <IconAirplaneOff />
      Waktu = "KEPULANGAN " + "|" + moment(item.pulang).format("DD MMM YYYY HH:SS")
    } else {
      Icon = <IconMedina />
      Waktu = "MADINAH " + "|" + moment(item.in_md).format("DD MMM") + " - " + moment(item.out_md).format("DD MMM YYYY")
    }
  } else if (item.flag_md == 0 && item.flag_mk == 1) {
    Icon = <IconMecca />
    Waktu = "MEKKAH " + "|" + moment(item.in_mk).format("DD MMM") + " - " + moment(item.out_mk).format("DD MMM YYYY")
  } else {
    Icon = <IconAirplaneOn />
    Waktu = "KEBERANGKATAN " + "|" + moment(item.tanggal).format("DD MMM YYYY HH:SS")
  }
  return (
    <TouchableOpacity style={styles.container}>
      {Icon}
      <View style={styles.text}>
        <Text style={styles.invoice}>{item.nama_travel}</Text>
        <Text style={styles.status(item.pulang)}>{Waktu}</Text>
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
    marginHorizontal: 20,
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
    fontSize: windowWidth * 0.03,
    fontFamily: 'TitilliumWeb-Regular',
    marginLeft: 10,
    color: '#000000',
    // color: status === 'Order Completed' ? WARNA_ORDER_COMPLETED : 
    // status === 'Order Delivered' ? WARNA_ORDER_DELIIVERED :
    // status === 'Order Processing' ? WARNA_ORDER_ON_PROCESS :
    // status === 'Order Picked' ? WARNA_ORDER_PICKED : WARNA_ORDER_PLACED,
  }),
})