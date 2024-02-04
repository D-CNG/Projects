import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

// Screen used to display data of favourited locations
export function FavScreen(props) {

    const[apidata, setApi] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        (async() => {
            // API call
            await fetch(`http://api.weatherapi.com/v1/forecast.json?key=9c2171a0d096437db48101007230209&q=${props.props}&days=3`,{
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
            }).then((response) => response.json())
            .then((json) => {
                console.log('hometemplatedata fetched');
                setApi(json)
                
            })
            .catch((error) => {
                console.log('failed to fetch data')
                console.log(error);
            })
            
        })();
        }, []);
    
    if(apidata != null) {
        //console.log(apidata);
        
        const current = apidata.current;
        const date = new Date()
        const forecast = apidata.forecast.forecastday;
        const hourForecast = apidata.forecast.forecastday[0].hour;
        const location = apidata.location.country;
        const dayForecast = [];
        for (i=0;i<forecast.length;i++){
            dayForecast.push(apidata.forecast.forecastday[i].day);
        }
        
        const hourly = []
        for (i=0;i<hourForecast.length;i++){
            var time =  new Date(hourForecast[i].time) - new Date();
            if(time>0){
                hourly.push(hourForecast[i]);
            }
        }

        const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

        return (
            <View style={styles.container}>
            {/* <StatusBar style="light" /> */}
            <ImageBackground
                source={require('../assets/images/bg2.jpg')} 
                blurRadius={60}
                resizeMode="cover"
                style = {styles.background}>
            
            
                <View style={{flex:1 }}>
                    {/* current data */}
                    <View style = {{flex: 5, justifyContent:'center'}}>
                        <Text style = {{fontSize: 30, alignSelf:'center'}}>{location}</Text>
                        <View style ={{height:'65%', width:'100%'}}>
                            <Image
                            source={{uri: 'https:'+current.condition.icon}} 
                            resizeMode='contain'
                            style = {{width:'100%', height:"80%"}}
                            />
                            <Text style = {{fontSize: 60, alignSelf:'center'}}>{current.temp_c}</Text>
                        </View>
                    </View>
                    <Text>{'\n'}</Text>

                    <View style = {{flex: 3}}>
                        <Text style={{ fontWeight:'bold', alignSelf:'center', fontSize:17}}>Humidity: {current.humidity} %</Text>
                        <View style ={{height:'80%',width:'100%'}}>
                        {/* Hourly data */}
                        <ScrollView 
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle = {styles.contentContainer}
                        >
                            {
                                hourly.map((h,index)=>{
                                    const currentTime = new Date().getHours() +1+ index + ':00';
                                    return(
                                        <View 
                                        key = {index}
                                        style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor: 'rgba(119, 136, 140, 0.3)'}} >
                                            <Text style={{color:'rgb(222, 226, 227)'}}>{h.chance_of_rain} %</Text>
                                            <View style={{height:'60%', width:'100%',justifyContent:'center'}}>
                                            <Image
                                                source={{uri: 'https:'+h.condition.icon}} 
                                                resizeMode='contain'
                                                style = {{width:'100%', height:"100%"}}
                                                />
                                            </View>
                                            <Text style={{color:'rgb(222, 226, 227)'}}>{currentTime}</Text>
                                        </View>
                                        
                                        
                                    )
                                })
                            }
                        </ScrollView>
                        </View>
                    </View>
                    {/* Forecast data */}
                    <View style = {{flex:2, backgroundColor:'rgba(51, 60, 61,0.6)'}}>
                    <ScrollView 
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle = {styles.contentContainer}>
                            {
                                dayForecast.map((day,index)=>{
                                    var currentDay = new Date().getDay() +index
                                    if(currentDay == 7){
                                        currentDay = days[0]
                                    }
                                    else{
                                        currentDay =days[new Date().getDay()+index] 
                                    }
                                    return(
                                        <View 
                                        key = {index}
                                        style={{flex:1,alignItems:'center',justifyContent:'center'}} >
                                            <Text style={{color:'rgb(222, 226, 227)'}}>{currentDay} </Text>
                                            <View style={{height:'60%', width:'100%',justifyContent:'center'}}>
                                            <Image
                                                source={{uri: 'https:'+day.condition.icon}} 
                                                resizeMode='contain'
                                                style = {{width:'100%', height:"100%"}}
                                                />
                                            </View>
                                        </View>
                                        
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                </View>
                
                <Text>{'/n'}</Text>
                
            
            </ImageBackground>
            </View>
        );
    
    }else{
        return(
            <View style={styles.container}>
            <Text>Waiting...</Text>
            <StatusBar style="auto" />
        </View>
        )
    }

 }

 const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'100%'
    },

    background:{
        flex:1,
        justifyContent:'center'
    },
    menuBtn:{

    },
    currentIcon: {
        width:"50%",
        height:"50%"

    },
    contentContainer:{
        width:'150%',
        height:'100%',
    }
    });