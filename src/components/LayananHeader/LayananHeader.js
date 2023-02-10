import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import { IconSearch, Avatar } from '../../assets';
import React from 'react'

const LayananHeader = ({namaLayanan}) => {
    return (
        <View style={styles.container}>
            <IconSearch />
            <Text style={styles.title}>{namaLayanan}</Text>
            <Image source={Avatar} style={styles.avatar} />
        </View>
    )
}

export default LayananHeader

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
        width: windowWidth * 0.12,
        height: windowHeight * 0.061,
    },
})