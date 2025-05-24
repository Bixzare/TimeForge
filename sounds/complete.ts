import { Howl } from 'howler';


export function test (){
    console.log("test");
}
const timerCompleteSound = new Howl({
    src: ['complete.mp3'],
    volume: 0.7,
    preload: true,
});

// Function to play the timer completion sound
export const playTimerCompleteSound = () => {
    console.log("Playing timer complete sound");
    timerCompleteSound.play();
  };
  
  // Optional: Function to stop the sound if needed
  export const stopTimerCompleteSound = () => {
    timerCompleteSound.stop();
  };
  
  // Optional: Function to adjust volume if needed
  export const setTimerSoundVolume = (volume: number) => {
    // Ensure volume is between 0 and 1
    const safeVolume = Math.max(0, Math.min(1, volume));
    timerCompleteSound.volume(safeVolume);
  };