import { SafeAreaView, ImageBackground, StyleSheet, Text, View, Dimensions, Image, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import { ImageHeader, Avatar } from '../../assets'
import { ButtonIcon, PesananAktif, SearchBox } from '../../components'
import { WARNA_ABU_ABU, WARNA_UTAMA } from '../../utils/constant'

const Home = () => {
  const [order, setOrder] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch('http://localhost:3001/orders?email=coba@gmail.com');

        if (response.status === 200) {
          let data = await response.json();
          setOrder(data);
        } else {
          throw 'Error fetching users list'
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
    setLoading(false);

  }, [order.length])

  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled' style={styles.scroll}>
        <ImageBackground source={ImageHeader} style={styles.header}>
          <Image source={Avatar} style={styles.avatar} />
          <View style={styles.greet}>
            <Text style={styles.hai}>Hai, <Text style={styles.username}>Kamu</Text></Text>
            <Text style={styles.datang}>Assalamu'alaikum</Text>
          </View>
        </ImageBackground>
        <SearchBox />
        <View style={styles.layanan}>
        <Text style={styles.label}>Paket Layanan Kami</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.iconLayanan}>
              <ButtonIcon title="Haji Plus" type="layanan" />
              <ButtonIcon title="Umrah Plus" type="layanan" />
              <ButtonIcon title="Haji Reguler" type="layanan" />
              <ButtonIcon title="Umrah Reguler" type="layanan" />
              <ButtonIcon title="Umrah Ramadhan" type="layanan" />
              <ButtonIcon title="Terpopuler" type="layanan" />
            </View>
          </ScrollView>
        </View>
        <View style={styles.pesananAktif}>
          <Text style={styles.label}>Keberangkatan Aktif</Text>
          {/* <FlatList
            data={order}
            renderItem={
              ({ item }) => <PesananAktif
                key={item._id}
                noinvoice={'Pesanan No.' + item.orderDetails}
                status={item.status} />
            }
          /> */}
        </View>
      </ScrollView>
    </View>
  )
}

export default Home

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    width: windowWidth,
    height: windowHeight * 0.3,
    paddingHorizontal: 30,
    paddingTop: 30,
    backgroundColor: WARNA_UTAMA
  },
  avatar: {
    width: windowWidth * 0.11,
    height: windowHeight * 0.061,
  },
  greet: {
    marginTop: 20,
  },
  hai: {
    fontSize: windowWidth * 0.03,
    color: '#000000',
    fontFamily: 'TitilliumWeb-Regular',
  },
  username: {
    fontSize: windowWidth * 0.04,
    color: '#000000',
    fontFamily: 'TitilliumWeb-SemiBold',
  },
  datang: {
    fontSize: windowWidth * 0.04,
    color: '#000000',
    fontFamily: 'TitilliumWeb-Bold',
  },
  layanan: {
    marginLeft: 5,
    paddingTop: 5,
  },
  label: {
    fontSize: windowWidth * 0.04,
    color: '#000000',
    fontFamily: 'TitilliumWeb-Bold',
    marginLeft: 30,
    paddingTop: 15,
  },
  iconLayanan: {
    flex: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
  },
  item: {
    marginHorizontal: 10,
  },
  pesananAktif: {
    backgroundColor: WARNA_ABU_ABU,
    margin: 5,
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    fontSize: windowWidth * 0.04,
  }
})