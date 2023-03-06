import { StyleSheet, Text, View, Dimensions, Image, Pressable } from 'react-native'
import { IconSearch, Avatar } from '../../assets';
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const LayananHeader = ({ namaLayanan }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <IconSearch />
            <Text style={styles.title}>{namaLayanan}</Text>
            <Pressable onPress={() => navigation.navigate("Akun")}>
                <Image source={Avatar} style={styles.avatar} />
            </Pressable>
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
        width: windowWidth * 0.11,
        height: windowWidth * 0.11,
    },
})