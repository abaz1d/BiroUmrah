import { ImageBackground, StyleSheet, View, Dimensions, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { ImagePesananHeader } from '../../assets'
import { ButtonIcon, PesananAktif, SearchBox, PesananHeader, TopNavBox } from '../../components'
import DalamProses from '../../components/TopNav/DalamProsesPesanan'
import RiwayatPesanan from '../../components/TopNav/RiwayatPesanan'
import { WARNA_UTAMA } from '../../utils/constant'

const Pesanan = () => {
  const [selectPesanan, setSelectPesanan] = useState('Riwayat');
  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground  style={styles.header}>
          <PesananHeader />
        </ImageBackground>
        <TopNavBox selectPesanan={selectPesanan} setSelectPesanan={setSelectPesanan} />
        {selectPesanan !== 'Riwayat' ? (
          <DalamProses />
        ) : (
          <RiwayatPesanan />
        )}
      </ScrollView>
    </View>
  )
}

export default Pesanan

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    width: windowWidth,
    height: windowHeight * 0.17,
    paddingHorizontal: 30,
    paddingTop: 30,
    backgroundColor: WARNA_UTAMA
  },
  avatar: {
    width: windowWidth * 0.12,
    height: windowHeight * 0.061,
  },
  greet: {
    marginTop: 20,
  },
  hai: {
    fontSize: 20,
    color: '#000000',
    fontFamily: 'TitilliumWeb-Regular',
  },
  username: {
    fontSize: 24,
    color: '#000000',
    fontFamily: 'TitilliumWeb-SemiBold',
  },
  datang: {
    fontSize: 30,
    color: '#000000',
    fontFamily: 'TitilliumWeb-Bold',
  },
  layanan: {
    marginLeft: 5,
    paddingTop: 5,
  },
  iconLayanan: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginTop: 10,
  },
  pesananAktif: {
    flex: 1,
    marginTop: 30,
    marginBottom: 30,
  }
})