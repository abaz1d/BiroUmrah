import { StyleSheet, Text, View, Dimensions, Image, Pressable } from 'react-native'
import { IconSearch, Avatar } from '../../assets';
import { useNavigation } from '@react-navigation/native';
import React from 'react'

export default function PesananHeader() {
    const [search, onChangeSearch] = React.useState('');
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <IconSearch />
            <Text style={styles.title}>Daftar Keberangkatan</Text>
            <Pressable onPress={() => navigation.navigate("Akun")}>
                <Image source={Avatar} style={styles.avatar} />
            </Pressable>
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
        fontSize: windowWidth * 0.045,
        fontFamily: 'TitilliumWeb-Bold',
        color: 'black',
    },
    avatar: {
        width: windowWidth * 0.11,
        height: windowWidth * 0.11,
    },
})