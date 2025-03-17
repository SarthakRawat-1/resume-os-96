
/**
 * Sound utilities for ResumeOS
 */

// Sound effect mapping
const SOUNDS = {
  BOOT: '/sounds/boot-chime.mp3',
  CLICK: '/sounds/click.mp3',
  HOVER: '/sounds/hover.mp3',
  TYPING: '/sounds/typing.mp3',
  ERROR: '/sounds/error.mp3',
  SUCCESS: '/sounds/success.mp3',
  MUSIC: '/sounds/background-music.mp3',
};

// Sound instances (to avoid recreating audio objects)
const soundInstances: {[key: string]: HTMLAudioElement} = {};

// Initialize sounds (preload them)
export const initSounds = () => {
  Object.entries(SOUNDS).forEach(([key, src]) => {
    try {
      const audio = new Audio(src);
      audio.preload = 'auto';
      audio.volume = key === 'MUSIC' ? 0.4 : 0.2; // Lower volume for music
      soundInstances[key] = audio;
    } catch (e) {
      console.warn(`Failed to load sound: ${key}`, e);
    }
  });
};

// Play a sound effect
export const playSound = (sound: keyof typeof SOUNDS) => {
  try {
    const audio = soundInstances[sound];
    if (!audio) {
      console.warn(`Sound ${sound} not loaded`);
      return;
    }

    // For the typing sound, we want to make sure we don't create too many overlapping sounds
    if (sound === 'TYPING') {
      // Just restart it if it's already playing
      audio.currentTime = 0;
    } else {
      // Clone the audio element for simultaneous sounds
      const clone = audio.cloneNode() as HTMLAudioElement;
      clone.volume = audio.volume;
      clone.play().catch(e => console.warn(`Error playing sound ${sound}:`, e));
      return;
    }

    // Play the original audio (for typing sounds)
    audio.play().catch(e => console.warn(`Error playing sound ${sound}:`, e));
  } catch (e) {
    console.warn(`Error playing sound ${sound}:`, e);
  }
};

// Background music controller
let musicPlaying = false;

export const toggleMusic = (): { status: string } => {
  try {
    const music = soundInstances['MUSIC'];
    if (!music) return { status: 'error' };
    
    if (musicPlaying) {
      music.pause();
      musicPlaying = false;
      return { status: 'paused' };
    } else {
      music.loop = true;
      music.play().catch(e => console.warn('Error playing music:', e));
      musicPlaying = true;
      return { status: 'playing' };
    }
  } catch (e) {
    console.warn('Error toggling music:', e);
    return { status: 'error' };
  }
};

export const setMusicVolume = (level: number): { status: string } => {
  try {
    const music = soundInstances['MUSIC'];
    if (!music) return { status: 'error' };
    
    const volume = Math.min(Math.max(level / 10, 0), 1);
    music.volume = volume;
    return { status: `volume set to ${level}/10` };
  } catch (e) {
    console.warn('Error setting music volume:', e);
    return { status: 'error' };
  }
};

export const stopMusic = (): { status: string } => {
  try {
    const music = soundInstances['MUSIC'];
    if (!music) return { status: 'error' };
    
    music.pause();
    music.currentTime = 0;
    musicPlaying = false;
    return { status: 'stopped' };
  } catch (e) {
    console.warn('Error stopping music:', e);
    return { status: 'error' };
  }
};
