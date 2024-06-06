import React, { useEffect, useState } from 'react';
import { StyleSheet, Pressable, Image, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedView } from '../components/ThemedView';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';

const API_URL = 'https://api-radioverso-pswfcmgo6q-uc.a.run.app/api/audios';
const GENRE_API_URL = 'https://api-radioverso-pswfcmgo6q-uc.a.run.app/api/audios/genre';
const NEXT_API_URL = 'https://api-radioverso-pswfcmgo6q-uc.a.run.app/api/next_audio';

const { width, height } = Dimensions.get('window');

interface SocialMedia {
  instagram?: string;
  spotify?: string;
  whatsapp?: string;
  youtube?: string;
}

interface Artist {
  name: string;
  photo: string;
  social: SocialMedia;
}

interface Mp3File {
  author: string;
  description: string;
  filename: string;
  image_url: string;
  social_media: SocialMedia;
  title: string;
  uri: string;
  artist: Artist;
}

export default function HomeScreen() {
  const [mp3Files, setMp3Files] = useState<Mp3File[]>([]);
  const [loading, setLoading] = useState(true);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Estado para el mute
  const [currentArtist, setCurrentArtist] = useState<Artist | null>(null);
  const [currentFile, setCurrentFile] = useState<Mp3File | null>(null);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Usa los tipos

  useEffect(() => {
    fetchMp3Files();
  }, []);

  useEffect(() => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.isLoaded && status.didJustFinish) {
          await playNextSound();
        }
      });
    }
  }, [sound]);

  async function fetchMp3Files(genre = '', autoPlay = false) {
    try {
      const url = genre ? `${GENRE_API_URL}/${genre}` : API_URL;
      console.log(`Fetching URL: ${url}`); // Verifica la URL en la consola
      const response = await fetch(url, {
        headers: {
          Accept: 'application/json',
        },
      });
      const data = await response.json();
      console.log('Fetched MP3 Files:', data); // Verifica los datos en la consola
      const mp3FilesWithUri = data.map((item: any): Mp3File => ({
        ...item,
        uri: `https://api-radioverso-pswfcmgo6q-uc.a.run.app/api/audio/${item.filename}`,
        artist: {
          name: item.author,
          photo: `https://storage.googleapis.com/radioverso-images/${item.image_url.split('/').pop()}`,
          social: item.social_media,
        },
      }));
      setMp3Files(mp3FilesWithUri);
      if (autoPlay && mp3FilesWithUri.length > 0) {
        playSelectedSound(mp3FilesWithUri[0]);
      }
    } catch (error) {
      console.error('Error al obtener los archivos MP3:', error);
    } finally {
      setLoading(false);
    }
  }

  async function playSelectedSound(selectedMp3: Mp3File) {
    if (sound) {
      await sound.unloadAsync();
    }
    try {
      const signedUrlResponse = await fetch(selectedMp3.uri);
      if (!signedUrlResponse.ok) {
        throw new Error(`Error fetching audio from URL: ${signedUrlResponse.status}`);
      }
      const signedUrlData = await signedUrlResponse.json();
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: signedUrlData.url });
      setSound(newSound);
      setIsPlaying(true);
      setCurrentArtist(selectedMp3.artist);
      setCurrentFile(selectedMp3);
      console.log('Artist information set:', selectedMp3.artist);
      await newSound.playAsync();
    } catch (error) {
      console.error('Error loading sound:', error);
    }
  }

  async function playSound() {
    if (mp3Files.length > 0) {
      playSelectedSound(mp3Files[0]);
    }
  }

  async function playNextSound() {
    if (currentFile) {
      try {
        const response = await fetch(`${NEXT_API_URL}/${currentFile.filename}`);
        if (!response.ok) {
          throw new Error(`Error fetching next song: ${response.status}`);
        }
        const nextMp3 = await response.json();
        console.log('Next MP3 file:', nextMp3);
        const nextMp3WithUri = {
          ...nextMp3,
          uri: `https://api-radioverso-pswfcmgo6q-uc.a.run.app/api/audio/${nextMp3.filename}`,
          artist: {
            name: nextMp3.author,
            photo: `https://storage.googleapis.com/radioverso-images/${nextMp3.image_url.split('/').pop()}`,
            social: nextMp3.social_media,
          },
        };
        console.log('Next MP3 file with URI:', nextMp3WithUri);
        if (sound) {
          await sound.unloadAsync();
        }
        const signedUrlResponse = await fetch(nextMp3WithUri.uri);
        if (!signedUrlResponse.ok) {
          throw new Error(`Error fetching audio from URL: ${signedUrlResponse.status}`);
        }
        const signedUrlData = await signedUrlResponse.json();
        const { sound: newSound } = await Audio.Sound.createAsync({ uri: signedUrlData.url });
        setSound(newSound);
        setIsPlaying(true);
        setCurrentArtist(nextMp3WithUri.artist);
        setCurrentFile(nextMp3WithUri);
        console.log('Next artist information set:', nextMp3WithUri.artist);
        await newSound.playAsync();
      } catch (error) {
        console.error('Error fetching next song:', error);
      }
    }
  }

  async function toggleMute() {
    if (sound) {
      await sound.setVolumeAsync(isMuted ? 1.0 : 0.0); // Mute or unmute
      setIsMuted(!isMuted); // Toggle mute state
    }
  }

  function openLink(url: string) {
    // Lógica para abrir enlaces en el navegador
  }

  return (
    <ThemedView style={styles.container}>
      <Image source={require('../assets/images/Fondo.png')} style={styles.backgroundImage} />
      <Image source={require('../assets/images/Galaxia.png')} style={styles.galaxyImage} />
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0)']}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0.7 }}
        style={styles.gradientOverlay}
      />
      <View style={styles.header}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Account')}>
            <Text style={styles.menuItem}>Mi cuenta</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Genres')}>
            <Text style={styles.menuItem}>Géneros</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Tickets')}>
            <Text style={styles.menuItem}>Entradas</Text>
          </TouchableOpacity>
        </View>
      </View>
      {currentArtist ? (
        <View style={styles.content}>
          <View style={styles.artistPhotoContainer}>
            <Image source={{ uri: currentArtist.photo }} style={styles.artistPhoto} />
          </View>
          <Text style={styles.artistName}>{currentArtist.name}</Text>
          <View style={styles.socialIconsContainer}>
            {currentArtist.social && currentArtist.social.whatsapp && (
              <Pressable style={styles.whatsappIcon} onPress={() => openLink(currentArtist.social.whatsapp!)}>
                <Image source={require('../assets/images/Whatsapp.png')} style={styles.socialIcon} />
              </Pressable>
            )}
            {currentArtist.social && currentArtist.social.spotify && (
              <Pressable style={styles.spotifyIcon} onPress={() => openLink(currentArtist.social.spotify!)}>
                <Image source={require('../assets/images/Spotify.png')} style={styles.socialIcon} />
              </Pressable>
            )}
            {currentArtist.social && currentArtist.social.youtube && (
              <Pressable style={styles.youtubeIcon} onPress={() => openLink(currentArtist.social.youtube!)}>
                <Image source={require('../assets/images/Youtube.png')} style={styles.socialIcon} />
              </Pressable>
            )}
            {currentArtist.social && currentArtist.social.instagram && (
              <Pressable style={styles.instagramIcon} onPress={() => openLink(currentArtist.social.instagram!)}>
                <Image source={require('../assets/images/Instagram.png')} style={styles.socialIcon} />
              </Pressable>
            )}
          </View>
          <View>
            <Pressable onPress={toggleMute}>
              <Image source={require('../assets/images/audio.png')} style={styles.audioIcon} />
            </Pressable>
          </View>
          <View style={styles.planetsContainer}>
            <Pressable onPress={() => fetchMp3Files('Rock', true)}>
              <Image source={require('../assets/images/Recurso1.png')} style={styles.planetIcon} />
            </Pressable>
            <Pressable onPress={() => fetchMp3Files('Indie', true)}>
              <Image source={require('../assets/images/Recurso2.png')} style={styles.planetIcon} />
            </Pressable>
            <Pressable onPress={() => fetchMp3Files('Romantico', true)}>
              <Image source={require('../assets/images/Recurso3.png')} style={styles.planetIcon} />
            </Pressable>
            <Pressable onPress={() => fetchMp3Files('Pop', true)}>
              <Image source={require('../assets/images/Recurso4.png')} style={styles.planetIcon} />
            </Pressable>
            <Pressable onPress={() => fetchMp3Files('Salsa', true)}>
              <Image source={require('../assets/images/Recurso5.png')} style={styles.planetIcon} />
            </Pressable>
            <Pressable onPress={() => fetchMp3Files('Urbano', true)}>
              <Image source={require('../assets/images/Recurso6.png')} style={styles.planetIcon} />
            </Pressable>
          </View>

        </View>
      ) : (
        <View style={styles.content}>
          <Pressable onPress={() => playSound()} style={styles.playButton}>
            <Image source={require('../assets/images/Play.png')} style={styles.playButtonImage} />
          </Pressable>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    position: 'absolute',
    width: width,
    height: height,
    zIndex: 1,
  },
  galaxyImage: {
    position: 'absolute',
    width: width,
    height: height,
    zIndex: 2,
  },
  gradientOverlay: {
    position: 'absolute',
    width: width,
    height: height,
    zIndex: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    zIndex: 4,
  },
  logo: {
    marginTop: 40,
    marginLeft: 10,
    width: 40,
    height: 40,
  },
  logoTextContainer: {
    marginTop: 50,
    marginLeft: 10,
  },
  logoText: {
    color: '#D3F22A',
    fontSize: 20,
    textAlign: 'center',
  },
  menuContainer: {
    marginTop: 40,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItem: {
    color: '#D3F22A',
    fontSize: 18,
    marginLeft: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 4,
  },
  playButton: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 250,
  },
  playButtonImage: {
    width: 80,
    height: 80,
  },
  artistPhotoContainer: {
    width: 270,
    height: 270,
    borderRadius: 135,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  artistPhoto: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#FFF',
  },
  artistName: {
    color: '#FFF',
    fontSize: 18,
    marginTop: -80,
    textAlign: 'center',
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  instagramIcon: {
    position: 'absolute',
    top: -200,
    right: -150,
  },
  spotifyIcon: {
    position: 'absolute',
    top: -200,
    left: -150,
  },
  youtubeIcon: {
    position: 'absolute',
    top: -40,
    left: -150,
    width: 60,
  },
  whatsappIcon: {
    position: 'absolute',
    top: -40,
    right: -150,
  },
  socialIconsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
  },
  socialIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
  },
  youtubesocialIcon: {
    width: 45,
    height: 35,
    marginHorizontal: 5,
  },
  audioIcon: {
    width: 40,
    height: 25,
  },
  planetsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  planetIcon: {
    width: 70,
    height: 70,
    marginVertical: -15,
  },
});
