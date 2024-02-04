import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

export function Screen(props) {

    const[apidata, setApi] = useState(null);
    const navigation = useNavigation();

    
    useEffect(() => {
        (async() => {
            //api call
            await fetch(`http://api.weatherapi.com/v1/forecast.json?key=9c2171a0d096437db48101007230209&q=${(props.props.coords.latitude)},${(props.props.coords.longitude)}&days=3`,{
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
            }).then((response) => response.json())
            .then((json) => {
                console.log('hometemplatedata fetched');
                //set api to hook
                setApi(json)
                
            })
            .catch((error) => {
                console.log('failed to fetch data')
                console.log(error);
            })
            
        })();
        }, []);

        //if state hook has data, load page
        if(apidata != null){

        //parse data received from api
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
            <ImageBackground
                source={require('../assets/images/bg2.jpg')} 
                blurRadius={60}
                resizeMode="cover"
                style = {styles.background}>
            
            
                <View style={{flex:1 }}>
                    {/* Current Display */}
                    <View style = {styles.current}>
                        {/* Current location */}
                        <Text style = {styles.location}>{location}</Text>
                        {/* Curremt weather icon */}
                        <View style ={styles.iconContainer}>
                            <Image
                            source={{uri: 'https:'+current.condition.icon}} 
                            resizeMode='contain'
                            style = {styles.icon}
                            />
                        {/* Current Temperature */}
                            <Text style = {styles.hourlyTemp}>{current.temp_c}{'\u00b0'}c</Text>
                        </View>
                    </View>

                    <Text>{'\n'}</Text>

                    
                    <View style = {{flex: 3}}>
                        {/* Current Humidity */}
                        <Text style={{ fontWeight:'bold', alignSelf:'center', fontSize:17}}>Humidity: {current.humidity} %</Text>
                        {/* Hourly Display */}
                        <View style ={{height:'80%',width:'100%'}}>
                        <ScrollView 
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle = {styles.contentContainer}>

                        {
                            hourly.map((h,index)=>{
                                const currentTime = new Date().getHours() +1+ index + ':00';
                                return(
                                    <View 
                                    key = {index}
                                    style={styles.hourly} >
                                        <Text style={{color:'rgb(222, 226, 227)'}}>{h.chance_of_rain} %</Text>
                                        <View style={styles.hourlyIconContain}>
                                        <Image
                                            source={{uri: 'https:'+h.condition.icon}} 
                                            resizeMode='contain'
                                            style = {styles.hourlyIcon}
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

                    {/* Forecast Display */}
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
                                    style={styles.forecast} >
                                        <Text style={{color:'rgb(222, 226, 227)'}}>{currentDay} </Text>
                                        <View style={styles.forecastIconContain}>
                                        <Image
                                            source={{uri: 'https:'+day.condition.icon}} 
                                            resizeMode='contain'
                                            style = {styles.forecastIcon}
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
    }

    else{
        return(
            null
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
    },
    current: {
        flex: 5, 
        justifyContent:'center'
    },
    location:{
        fontSize: 30, 
        alignSelf:'center'
    },
    iconContainer:{
        height:'65%', 
        width:'100%'
    },
    icon:{
        width:'100%', 
        height:"80%"
    },
    hourly:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'rgba(119, 136, 140, 0.3)'
    },
    hourlyTemp:{
        fontSize: 60, 
        alignSelf:'center'
    },
    hourlyIconContain:{
        height:'60%', 
        width:'100%',
        justifyContent:'center'
    },
    hourlyIcon:{
        width:'100%', 
        height:"100%"
    },
    forecast:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    forecastIconContain:{
        height:'60%', 
        width:'100%',
        justifyContent:'center'
    },
    forecastIcon:{
        width:'100%', 
        height:"100%"}
    
    });
