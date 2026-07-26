export const audio = {
  bgm: null,
  intro: null,
  tap: null,
  voice: null,
  musicVolume: 0.3,
  sfxVolume: 0.5,
  activeFades: new Map(),

  init() {
    this.bgm = document.getElementById("audio-bgm");
    this.intro = document.getElementById("audio-intro");
    this.tap = document.getElementById("audio-tap");
    this.voice = document.getElementById("audio-voice");

    if (this.bgm) this.bgm.volume = this.musicVolume;
    if (this.intro) this.intro.volume = this.musicVolume;
    if (this.tap) this.tap.volume = this.sfxVolume;
    if (this.voice) this.voice.volume = this.sfxVolume;

    document.body.addEventListener(
      "click",
      (e) => {
        if (
          e.target.closest(
            "button, .map-label, input[type=range], .story-choice-btn",
          )
        ) {
          this.playTap();
        }
      },
      true,
    );
  },

  playTap() {
    if (!this.tap) return;
    this.tap.currentTime = 0;
    this.tap.play().catch((e) => {});
  },

  playVoice(src) {
    if (!this.voice) return;
    this.voice.src = src;
    this.voice.currentTime = 0;
    this.voice.play().catch((e) => {});
  },

  fadeOutAndPause(audioElement, duration = 800) {
    if (!audioElement || audioElement.paused) return;
    if (this.activeFades.has(audioElement)) {
      clearInterval(this.activeFades.get(audioElement));
    }

    const initialVolume = audioElement.volume;
    const steps = 20;
    const stepTime = duration / steps;
    const volumeStep = initialVolume / steps;

    const fadeInterval = setInterval(() => {
      audioElement.volume = Math.max(0, audioElement.volume - volumeStep);
      if (audioElement.volume <= 0) {
        clearInterval(fadeInterval);
        audioElement.pause();
        audioElement.volume = this.musicVolume;
        this.activeFades.delete(audioElement);
      }
    }, stepTime);
    this.activeFades.set(audioElement, fadeInterval);
  },

  fadeInAndPlay(audioElement, duration = 1000) {
    if (!audioElement) return;
    if (this.activeFades.has(audioElement)) {
      clearInterval(this.activeFades.get(audioElement));
    }

    audioElement.volume = 0;
    audioElement.play().catch((e) => {});

    const targetVolume = this.musicVolume;
    const steps = 20;
    const stepTime = duration / steps;
    const volumeStep = targetVolume / steps;

    const fadeInterval = setInterval(() => {
      audioElement.volume = Math.min(
        targetVolume,
        audioElement.volume + volumeStep,
      );
      if (audioElement.volume >= targetVolume) {
        clearInterval(fadeInterval);
        this.activeFades.delete(audioElement);
      }
    }, stepTime);
    this.activeFades.set(audioElement, fadeInterval);
  },

  setMusicVolume(value) {
    this.musicVolume = value;
    if (this.bgm) this.bgm.volume = value;
    if (this.intro) this.intro.volume = value;
  },

  setSfxVolume(value) {
    this.sfxVolume = value;
    if (this.tap) this.tap.volume = value;
    if (this.voice) this.voice.volume = value;
  },
};