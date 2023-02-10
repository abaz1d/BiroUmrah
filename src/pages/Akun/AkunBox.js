import { ImageBackground, StyleSheet, Text, View, Dimensions, Image, ScrollView } from 'react-native'
import React from 'react'
import { ImageHeaderAkun, Avatar } from '../../assets'
import { ButtonIcon, LogOut, PesananAktif, SearchBox } from '../../components'
import { WARNA_ABU_ABU } from '../../utils/constant'

const Akun = () => {
  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={ImageHeaderAkun} style={styles.header}>
          <Image source={Avatar} style={styles.avatar} />
          <View style={styles.greet}>
            <Text style={styles.username}>Username</Text>
            <Text style={styles.noEmail}>+62 8923623737</Text>
            <Text style={styles.noEmail}>example@gmail.com</Text>
          </View>
        </ImageBackground>
        <SearchBox />
        <View style={styles.layanan}>
          <Text style={styles.label}>Pengaturan Akun</Text>
          <LogOut title="Log Out" />
        </View>
      </ScrollView>
    </View>
  )
}

export default Akun

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    width: windowWidth,
    height: windowHeight * 0.3,
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  avatar: {
    width: windowWidth * 0.11,
    height: windowHeight * 0.061,
  },
  greet: {
    marginTop: 20,
  },
  noEmail: {
    fontSize: windowWidth * 0.03,
    color: '#000000',
    fontFamily: 'TitilliumWeb-Regular',
  },
  username: {
    fontSize: windowWidth * 0.05,
    color: '#000000',
    fontFamily: 'TitilliumWeb-Bold',
  },
  layanan: {
    flex: 1,
  },
  label: {
    fontSize: windowWidth * 0.03,
    color: '#000000',
    fontFamily: 'TitilliumWeb-Bold',
    marginLeft: 30,
    paddingTop: 15,
  },
  iconLayanan: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginTop: 10,
  },
})