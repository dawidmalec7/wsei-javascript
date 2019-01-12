document.addEventListener('DOMContentLoaded', appStart);
const sounds = {
    KeyA: "boom",
    KeyS: "clap",
    KeyD: "hihat",
    KeyF: "kick",
    KeyG: "openhat",
    KeyH: "ride",
    KeyJ: "snare",
    KeyK: "tink",
    KeyL: "tom"
}

let activeChannels = [
  {
    name: 'channel1',
    sounds: [],
    isRecording: false,
    recStart: null
  }, 
  {
    name: 'channel2',
    sounds: [],
    isRecording: false,
    recStart: null
  },
  {
    name: 'channel3',
    sounds: [],
    isRecording: false,
    recStart: null
  },
  {
    name: 'channel4',
    sounds: [],
    isRecording: false,
    recStart: null
  },
];

/*
*
* Start aplikacji
*
*/
function appStart() {
    window.addEventListener('keypress', (e) => playSound(e));
    window.addEventListener('keydown', addPressClass);
    window.addEventListener('keyup', removePressClass);

    let channels = document.querySelectorAll('.channel');

    channels.forEach(function(channel, i){
      //Button startu nagrania
      channel.children[0].addEventListener('click', (e) => startRec(e, channel));
      //Button odtworzenia nagrania
      channel.children[1].addEventListener('click', () => playMusic(activeChannels[i].sounds));
      //Button czysczenia nagrania
      channel.children[2].addEventListener('click', () => clearMusic(i));
    });
}
/*
*
* Funkcja służy do odsłuchania nagranego utworu z wybranego kanału
*
*/
function playMusic(channelSounds){
  channelSounds.forEach(sound =>{
      setTimeout(
          ()=>{
              audioDOM = document.querySelector(`#${sound.sound}`);
              audioDOM.currentTime = 0;
              audioDOM.play();
          }, sound.time
      )
  })
}
/*
*
* Funkcja służy do startu nagrywania utworów 
*
*/
function startRec(e, channel){
  //pobranie nazwy kanału z DOM
  let channelName = channel.classList[1];
  // index kanału
  let channelIndex = activeChannels.findIndex(channel => (channel.name === channelName));
  activeChannels[channelIndex].isRecording = !activeChannels[channelIndex].isRecording;
  let channelNumber = channelIndex + 1;

  if(activeChannels[channelIndex].isRecording ){
    countDown(channelNumber);
    setTimeout(() => controlRec(e.target, activeChannels[channelIndex]), 3000);
  }else{
    controlRec(e.target, activeChannels[channelIndex].isRecording); 
  }
}
/*
* Funckcja służy do zmiany stanu buttona nagrywania i określenia startu nagrywania
*/
function controlRec(button, channel){
  channel.recStart = Date.now();
  button.innerHTML = channel.isRecording ? 'Zatrzymaj' : 'Nagrywaj';
}
/*
* Funkcja słyży do pobrania dzwieku z HTML DOM
*/
getAudioDOM = (e) => {
    const soundName = sounds[e.code];
    return audioDOM = document.querySelector(`#${soundName}`);
}
/*
* Funkcja słyży do czysczenia utworu
*/
function clearMusic(channelIndex){
  activeChannels[channelIndex].sounds.length = 0;
}
/*
* Funkcja słyży do odegrania danego dzwieku i nagranie je na kanał
*/
function playSound(e) {
    const soundName = sounds[e.code];
    let audioDOM = document.querySelector(`#${soundName}`);
    audioDOM.currentTime = 0;
    audioDOM.play();

    if (activeChannels[0].isRecording){
        activeChannels[0].sounds.push({
            sound: soundName,
            time: Date.now() - activeChannels[0].recStart
        });
    }

    if (activeChannels[1].isRecording){
        activeChannels[1].sounds.push({
            sound: soundName,
            time: Date.now() - activeChannels[1].recStart
        });
    }

    if (activeChannels[2].isRecording){
        activeChannels[2].sounds.push({
            sound: soundName,
            time: Date.now() - activeChannels[2].recStart
        });
    }

    if (activeChannels[3].isRecording){
        activeChannels[3].sounds.push({
            sound: soundName,
            time: Date.now() -activeChannels[3].recStart
        });
    }
}
/*
* Funkcja służy do nadania klasy jeśli dany dzwiek jest odgrywany
*/
function addPressClass(e) {
    let audioDOM = getAudioDOM(e);
    audioDOM.parentNode.classList.add('clicked');
}
/*
* Funkcja służy do usuwania klasy jeśli dany dzwiek już nie jest odgrywany
*/
function removePressClass(e) {
    let audioDOM = getAudioDOM(e);
    audioDOM.parentNode.classList.remove('clicked');
}
/*
* Funkcja służy odliczania przed nagrywaniem utworu
*/
function countDown(channelIndex){
  let timeleft = 4;
  let counterWraper = document.querySelector(".countingDownWrapper");
  let startChannel =  document.querySelector(".startChannel");
  let counter =  document.querySelector(".count");
  counterWraper.style.display = 'flex';
  startChannel.innerHTML = `Starting channel ${channelIndex} - `; 
  counter.innerHTML = 0 + --timeleft;
  let downloadTimer = setInterval(function(){
    startChannel.innerHTML = `Starting channel ${channelIndex} - `; 
    counter.innerHTML = 0 + --timeleft;
    if(timeleft <= 0){
      counterWraper.style.display = "none";
      clearInterval(downloadTimer);
    }
  },1000);
}