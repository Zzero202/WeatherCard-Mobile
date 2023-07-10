/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import backgroundImage from './card-bg.png';
import React from 'react';
import type { Node } from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  ImageBackground,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({ children, title }): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const [location, setLocation] = useState('');
  const [forecastDayIcon, setForecastIcon] = useState('');
  const [avgTemp, setTemp] = useState('');
  const [lowTemp, setLow] = useState('');
  const [highTemp, setHigh] = useState('');
  const [humidity, setHumidity] = useState('');
  const [Rain, setRain] = useState('');
  const [FeelsLike, setFeels] = useState('');
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    // localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODA4OTZiYmY3Zjg0YjA2N2FmNGZiOSIsInJvbGUiOiIyIiwiZW1haWwiOiJoZXNzZW4uY2FyZHNAdGVzdC5jb20iLCJpYXQiOjE2ODYxNDU3NzUsImV4cCI6MTcxNzY4MTc3NX0.4wlqDkixeB1OAvOp07KH_xkRM8kY1y9sZUTcP2MXNqU")
    axios
      .get(
        'https://api.weatherapi.com/v1/forecast.json?q=Cairo,eg&key=8dc044ecf2904dd9bc9180950202210',
      )
      .then(res => {
        const data = res.data;
        console.log(data.current.condition.icon);
        setLow(data.forecast.forecastday[0].day.mintemp_c);
        setHumidity(data.current.humidity);
        setFeels(data.current.feelslike_c);
        setRain(data.current.precip_in);
        setHigh(data.forecast.forecastday[0].day.maxtemp_c);
        setLocation(data.location.name);
        setForecastIcon(data.current.condition.icon);
        setTemp(data.current.temp_c);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.mainDegree}>
        <View style={styles.todayDeg}>
          {forecastDayIcon ? (
            <Image
              source={{ uri: 'https://' + forecastDayIcon }}
              style={{
                width: 140,
                height: 140,
              }}
            />
          ) : (
            <Text>Loading image...</Text>
          )}
          <Text style={styles.todayDegH2}>{avgTemp}&deg;c</Text>
        </View>
        <Text style={styles.todayDegH1}>{location}</Text>
        <View style={styles.avgTemps}>
          <View style={styles.avgTempsRow}>
            <View style={styles.avgTempsRow1}>
              <Text style={styles.avgTempsP}>
                {lowTemp} / {highTemp}&deg;c
              </Text>
              <Text style={styles.avgTempsP}>Lowhigh</Text>
            </View>
            <View style={styles.avgTempsRow1}>
              <Text style={styles.avgTempsP}>{FeelsLike}&deg;c</Text>
              <Text style={styles.avgTempsP}>FeelsLike</Text>
            </View>
          </View>
          <View style={styles.avgTempsRow}>
            <View style={styles.avgTempsRow1}>
              <Text style={styles.avgTempsP}>{humidity}%</Text>
              <Text style={styles.avgTempsP}>Humidity</Text>
            </View>
            <View style={styles.avgTempsRow1}>
              <Text style={styles.avgTempsP}>{Rain}%</Text>
              <Text style={styles.avgTempsP}>Precipitation</Text>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  mainDegree: {
    height: '100%',
  },
  todayDeg: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  todayDegImg: {
    paddingRight: 1,
    width: 64,
    height: 64,
  },
  todayDegH1: {
    paddingLeft: 20,
    fontSize: 35,
    color: '#FFF',
    textAlign: 'center',
  },
  todayDegH2: {
    paddingRight: 20,
    fontSize: 40,
    color: '#FFF',
  },
  avgTemps: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
  },
  avgTempsP: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  avgTempsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
  },
  avgTempsRow1: {
    paddingRight: 50,
    paddingLeft: 50,
  },
});
export default App;
