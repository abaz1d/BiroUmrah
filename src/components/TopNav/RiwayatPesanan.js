import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import { PesananAktif } from '../../components';
import axios from "axios";

const RiwayatPesanan = () => {
  const [order, setOrder] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const fetchData = async () => {
    try {
      const { data } = await axios.get("http://153.92.210.7:3001/produk")
      // const { data } = await request.get('/produk')

      if (data.success) {
        let response = await data.data;
        setOrder(response.filter(item => item.pulang));
        setRefreshing(false);
      } else {
        throw 'Error fetching users list'
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData();
  }, [order.length])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  return (
    <View style={styles.pesananAktif}>
      <FlatList refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
        data={order}
        renderItem={
          ({ item }) => <PesananAktif
            key={item.noid_produk}
            item={item} />
        }
      />
    </View>
  )
}

export default RiwayatPesanan
const styles = StyleSheet.create({
  pesananAktif: {
    flex: 1,
    marginTop: 30,
    marginBottom: 30,
  }
})