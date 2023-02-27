import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Keberangkatan, Akun, Splash,
CuciKering,
CuciKomplit,
PaketBulanan,
PaketTahunan,
PaketUrgent,
SetrikaAja
} from '../pages';
import { BottomNavBox } from '../components';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
    return (
        <Tab.Navigator tabBar={props => <BottomNavBox {...props} />} ScreenOptions={{ tabBarHideOnKeyboard: true, tabBarStyle: [{ display: "flex" }, null]}}>
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }}/>
            <Tab.Screen name="Keberangkatan" component={Keberangkatan} options={{ headerShown: false }}/>
            <Tab.Screen name="Akun" component={Akun} options={{ headerShown: false }}/>
        </Tab.Navigator>
    )
}

const Router = () => {
    return (
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
            <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
            <Stack.Screen name="Umrah Plus" component={CuciKering} options={{ headerShown: false }} />
            <Stack.Screen name="Haji Plus" component={CuciKomplit} options={{ headerShown: false }} />
            <Stack.Screen name="Umrah Reguler" component={PaketBulanan} options={{ headerShown: false }} />
            <Stack.Screen name="Umrah Ramadhan" component={PaketTahunan} options={{ headerShown: false }} />
            <Stack.Screen name="Terpopuler" component={PaketUrgent} options={{ headerShown: false }} />
            <Stack.Screen name="Haji Reguler" component={SetrikaAja} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default Router

const styles = StyleSheet.create({})