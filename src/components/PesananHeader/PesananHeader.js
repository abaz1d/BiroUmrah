import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import { IconSearch, Avatar } from '../../assets';
import React from 'react'

export default function PesananHeader() {
    const [search, onChangeSearch] = React.useState('');
    return (
        <View style={styles.container}>
            <IconSearch />
            <Text style={styles.title}>Daftar Pesanan</Text>
            <Image source={Avatar} style={styles.avatar} />
        </View>
    )
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontFamily: 'TitilliumWeb-Bold',
        color: 'black',
    },
    avatar: {
        width: windowWidth * 0.11,
        height: windowHeight * 0.061,
    },
})