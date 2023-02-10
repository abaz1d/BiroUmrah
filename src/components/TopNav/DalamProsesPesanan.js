import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import { PesananAktif } from '../../components';

const DalamProses = () => {
  const [order, setOrder] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch('http://localhost:3001/orders?email=coba@gmail.com');

        if (response.status === 200) {
          let data = await response.json();
          setOrder(data.filter(item => item.status !== 'Order Completed'));
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
    <View style={styles.pesananAktif}>
      <FlatList
        data={order}
        renderItem={
          ({ item }) =>
            <PesananAktif
              key={item._id}
              noinvoice={'Pesanan No.' + item.orderDetails}
              status={item.status} />
        }
      />
    </View>
  )
}

export default DalamProses

const styles = StyleSheet.create({
  pesananAktif: {
    flex: 1,
    marginTop: 30,
    marginBottom: 30,
  }
})