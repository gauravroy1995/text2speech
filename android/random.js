// import React from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   Dimensions,
//   TouchableOpacity,
//   Platform,
//   Image,
//   PanResponder,
//   Animated,
// } from 'react-native';

// import MapView, {
//   ProviderPropType,
//   Marker,
//   AnimatedRegion,
//   Polyline,
// } from 'react-native-maps';
// import carImage from './carImage.png';

// const screen = Dimensions.get('window');

// const ASPECT_RATIO = screen.width / screen.height;
// const LATITUDE = 37.78825;
// const LONGITUDE = -122.4324;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// class AnimatedMarkers extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       // coordinate: new AnimatedRegion({
//       //   latitude: 37.78825,
//       //   longitude: -122.4324,
//       // }),
//       coordinate: {
//         latitude: 37.78825,
//         longitude: -122.4324,
//       },
//       curPos: {latitude: 37.420814, longitude: -122.081949},
//       prevPos: null,
//       latitudeDelta: 0.0922,
//       longitudeDelta: 0.0421,
//       curAng: 45,
//       curPosArr: [{latitude: 37.420814, longitude: -122.081949}],
//       pan: new Animated.ValueXY(),
//     };
//   }

//   componentWillMount() {
//     this._panResp = PanResponder.create({
//       onMoveShouldSetPanResponder: () => true,
//       onPanResponderMove: Animated.event([
//         null,
//         {dx: this.state.pan.x, dy: this.state.pan.y},
//       ]),
//     });
//   }
//   // animate() {
//   //   const {coordinate} = this.state;
//   //   const newCoordinate = {
//   //     latitude: LATITUDE + (Math.random() - 0.5) * (LATITUDE_DELTA / 2),
//   //     longitude: LONGITUDE + (Math.random() - 0.5) * (LONGITUDE_DELTA / 2),
//   //   };

//   //   if (Platform.OS === 'android') {
//   //     if (this.marker) {
//   //       this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
//   //     }
//   //   } else {
//   //     coordinate.timing(newCoordinate).start();
//   //   }
//   // }

//   changePosition = (latOffset, lonOffset) => {
//     const latitude = this.state.curPos.latitude + latOffset;
//     const longitude = this.state.curPos.longitude + lonOffset;
//     let currPosArr = [...this.state.curPosArr];
//     currPosArr.push({latitude, longitude});
//     this.setState({
//       prevPos: this.state.curPos,
//       curPos: {latitude, longitude},
//       curPosArr: currPosArr,
//     });
//     this.updateMap();
//   };

//   getRotation = (prevPos, curPos) => {
//     if (!prevPos) {
//       return 0;
//     }
//     const xDiff = curPos.latitude - prevPos.latitude;
//     const yDiff = curPos.longitude - prevPos.longitude;
//     return (Math.atan2(yDiff, xDiff) * 180.0) / Math.PI;
//   };

//   updateMap = () => {
//     const {curPos, prevPos, curAng} = this.state;
//     const curRot = this.getRotation(prevPos, curPos);
//     this.map.animateCamera({heading: curRot, center: curPos, pitch: curAng});
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <MapView
//           provider={this.props.provider}
//           style={styles.map}
//           minZoomLevel={15}
//           initialRegion={{
//             ...this.state.curPos,
//             latitudeDelta: this.state.latitudeDelta,
//             longitudeDelta: this.state.longitudeDelta,
//           }}
//           ref={el => (this.map = el)}>
//           <MapView.Marker
//             coordinate={this.state.curPos}
//             anchor={{x: 0.5, y: 0.5}}>
//             <View>
//               <Image
//                 source={require('./carImage.png')}
//                 style={{height: 20, width: 20}}
//               />
//             </View>
//           </MapView.Marker>
//           <Polyline
//             coordinates={this.state.curPosArr}
//             strokeColor="#B24112" // fallback for when `strokeColors` is not supported by the map-provider
//             strokeColors={[
//               '#7F0000',
//               '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
//               '#B24112',
//               '#E5845C',
//               '#238C23',
//               '#7F0000',
//             ]}
//             strokeWidth={6}
//           />
//         </MapView>
//         <Animated.View
//           style={[
//             styles.buttonContainer,
//             {
//               transform: [
//                 {
//                   translateX: this.state.pan.x,
//                   translateY: this.state.pan.y,
//                 },
//               ],
//             },
//           ]}
//           {...this._panResp.panHandlers}>
//           <TouchableOpacity
//             onPress={() => this.changePosition(-0.0001, 0)}
//             style={[styles.bubble, styles.button]}>
//             <Text>Animate</Text>
//           </TouchableOpacity>
//         </Animated.View>
//       </View>
//     );
//   }
// }

// AnimatedMarkers.propTypes = {
//   provider: ProviderPropType,
// };

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   // map: {
//   //   ...StyleSheet.absoluteFillObject,
//   // },
//   bubble: {
//     flex: 1,
//     backgroundColor: 'rgba(255,255,255,1)',
//     paddingHorizontal: 18,
//     paddingVertical: 12,
//     borderRadius: 20,
//   },
//   latlng: {
//     width: 200,
//     alignItems: 'stretch',
//   },
//   button: {
//     width: 80,
//     paddingHorizontal: 12,
//     alignItems: 'center',
//     marginHorizontal: 10,
//     height: 200,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     marginVertical: 20,
//     backgroundColor: 'transparent',
//   },
//   map: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
// });

// export default AnimatedMarkers;
