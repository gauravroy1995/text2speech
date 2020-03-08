import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
  Image,
  PanResponder,
  Animated,
  Button,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import Video from 'react-native-video';
import Voice from '@react-native-community/voice';

export default class VoiceNative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recognized: '',
      pitch: '',
      error: '',
      end: '',
      started: '',
      results: [],
      partialResults: [],
      buttonText: 'Search',
      videoUrls: [
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      ],
      videoIndex: 0,
    };

    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
  }
  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart = e => {
    console.log('onSpeechStart: ', e);
    this.setState({
      started: '√',
      buttonText: 'Listening...',
    });
  };

  onSpeechRecognized = e => {
    console.log('onSpeechRecognized: ', e);
    this.setState({
      recognized: '√',
    });
  };

  onSpeechEnd = e => {
    console.log('onSpeechEnd: ', this.state.partialResults);
    this.setState({
      end: '√',
      buttonText: 'Search Again',
    });
  };

  onSpeechError = e => {
    console.log('onSpeechError: ', e);
    this.setState({
      error: JSON.stringify(e.error),
    });
  };

  onSpeechResults = e => {
    console.log('onSpeechResults: ', e);
    this.setState({
      results: e.value,
    });
  };

  onSpeechPartialResults = e => {
    console.log('onSpeechPartialResults: ', e);
    let index = 0;
    let searchText = e.value[0].toLowerCase();
    if (searchText.includes('cat')) {
      index = 1;
    }
    if (searchText.includes('dog')) {
      index = 2;
    }
    this.setState({
      partialResults: e.value,
      videoIndex: index,
    });
  };

  onSpeechVolumeChanged = e => {
    console.log('onSpeechVolumeChanged: ', e);
    this.setState({
      pitch: e.value,
    });
  };

  _startRecognizing = async () => {
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });

    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });
  };
  render() {
    let {videoIndex, videoUrls} = this.state;
    return (
      <ScrollView style={{flex: 1}}>
        <Video
          source={{
            uri: videoUrls[videoIndex],
          }} // Can be a URL or a local file.
          ref={ref => {
            this.player = ref;
          }} // Store reference
          style={styles.backgroundVideo}
          controls={true}
          resizeMode="cover"
        />

        <Text style={styles.stat}>Your search results will appear here</Text>
        {this.state.partialResults.map((result, index) => {
          return (
            <Text key={`partial-result-${index}`} style={styles.stat}>
              {result}
            </Text>
          );
        })}

        <TouchableHighlight
          onPress={this._startRecognizing}
          style={{
            width: 100,
            backgroundColor: '#00FFFF',
            borderRadius: 10,
            alignSelf: 'center',
          }}>
          <Text
            style={{
              alignSelf: 'center',
              fontWeight: 'bold',
              color: '#fff',
              paddingVertical: 10,
            }}>
            {this.state.buttonText}{' '}
          </Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  transcript: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
    top: '400%',
    flex: 1,
  },
  backgroundVideo: {
    height: 500,
  },
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
});
