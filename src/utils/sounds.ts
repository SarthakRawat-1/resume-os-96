
/**
 * Sound utilities for ResumeOS
 * 
 * Note: This is now a dummy implementation that does nothing after sound functionality was removed
 */

// Initialize sounds
export const initSounds = () => {
  // No-op function after sounds were removed
};

// Play a sound effect (now a no-op function)
export const playSound = (sound: string) => {
  // No-op function after sounds were removed
};

// Background music controller (no-op functions)
export const toggleMusic = (): { status: string } => {
  return { status: 'error' };
};

export const setMusicVolume = (level: number): { status: string } => {
  return { status: 'error' };
};

export const stopMusic = (): { status: string } => {
  return { status: 'error' };
};
