import { chloePhase01Story } from './npcstory/chloe/story_chloe_phase01.js';
import { chloeWinStory } from './winscene/chloe_win01.js';
import { seanPhase01Story } from './npcstory/sean/story_sean_phase01.js';
import { seanWinStory } from './winscene/sean_win01.js';

export const logic = {
  ...chloePhase01Story,
  ...chloeWinStory,
  ...seanPhase01Story,
  ...seanWinStory,
  storyState: {
    step: 0,
    sequence: [],
    onComplete: null,
    isTyping: false,
    typingTimeout: null,
    waitTimeout: null,
    textCompleted: false,
    currentMediaEl: null,
    pausedForChoice: false,
  },

  // Helper Animasi Stat
  animateStat(statName, startVal, endVal, duration) {
    const startTime = performance.now();
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentVal = startVal + (endVal - startVal) * progress;

      GAME.state.stats[statName] = currentVal;
      GAME.ui.updateHUD(); // Render animasi ke DOM

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        GAME.state.stats[statName] = endVal;
        GAME.ui.updateHUD();
      }
    };
    requestAnimationFrame(animate);
  },

  getStorySequence1() {
    return [
      { type: "video", src: "assets/videos/party_intro.m3u8", skippable: false },
      {
        type: "image",
        src: "assets/images/0001_party_intro01.jpg",
        wait: 3000,
      },
      {
        type: "image",
        src: "assets/images/0001_party_intro02.jpg",
        wait: 3000,
      },
      {
        type: "dialogue",
        src: "assets/images/0001_party_intro03.jpg",
        name: "Chloe",
        text: "come on {name}...!!",
      },
      {
        type: "image",
        src: "assets/images/0001_party_intro04.jpg",
        wait: 1000,
        skippable: false,
      },
      {
        type: "image",
        src: "assets/images/0000_blank.jpg",
        wait: 1000,
        skippable: false,
      },
      {
        type: "image",
        src: "assets/images/0001_party_intro05.jpg",
        wait: 1000,
        skippable: false,
      },
      {
        type: "image",
        src: "assets/images/0000_blank.jpg",
        wait: 1000,
        skippable: false,
      },
      {
        type: "image",
        src: "assets/images/0001_party_intro06.jpg",
        wait: 1000,
        skippable: false,
      },
      { type: "dialogue", bg: "black", name: "Sean", text: "{name}..??" },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "{name}? {name} kamu ga apa-apa..??",
      },
    ];
  },

  getStorySequence2Part1() {
    return [
      { bg: "black", wait: 1000, skippable: false },
      {
        type: "action",
        action: () => {
          // Animasi naiknya energi saat player siuman (dari 0 ke 30 dalam 2 detik)
          GAME.logic.animateStat("energy", 0, 30, 2000);
        },
      },
      {
        type: "image",
        src: "assets/images/0002_intro01.jpg",
        effect: "blur-pulse-1",
        wait: 2000,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "Chloe!! kamu menumpahkan semua kuahnya ke baju ku!!",
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "Sean maaf, aku kaget kuahnya sangat panas.",
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "iya sekarang kulit gue juga panas melepuh chloe!",
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "maaf sean..",
      },
      {
        type: "image",
        src: "assets/images/0002_intro02.jpg",
        effect: "blur-pulse-2",
        wait: 1500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "ayo masukan sundubu yang lain ke mangkuk chloe.",
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "sebentar, biar aku cuci piring bekas makan kamu dulu.",
      },
    ];
  },

  getStorySequence2Part2() {
    const gender = GAME.state.gender;
    let sequence = [
      {
        type: "image",
        src: "assets/images/0002_intro03.jpg",
        effect: "cross-dissolve",
        skippable: false,
        wait: 500,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "{name}, lo udah bangun?",
      },
      {
        type: "image",
        src: "assets/images/0002_intro04.jpg",
        effect: "cross-dissolve",
        skippable: false,
        wait: 500,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "{name}, kamu ga apa-apakan?",
      },
      {
        type: "image",
        src: "assets/images/0002_intro05.jpg",
        effect: "cross-dissolve",
        skippable: false,
        wait: 500,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "lo tiba-tiba tumbang di dance floor. kayanya lo kecapean {name}.",
      },
      {
        type: "image",
        src: "assets/images/0002_intro06.jpg",
        effect: "cross-dissolve",
        skippable: false,
        wait: 500,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "kamu harusnya jangan berlebihan {name}! kamu harus tau batasan energi kamu sampai mana!",
      },
      { bg: "black", effect: "cross-dissolve", skippable: false, wait: 1000 },
    ];

    if (gender === "Wanita") {
      sequence.push(
        {
          type: "image",
          src: "assets/images/0002_intro07chloe.jpg",
          effect: "cross-dissolve",
          skippable: false,
          wait: 500,
        },
        {
          type: "dialogue",
          retainMedia: true,
          name: "Chloe",
          text: "tapi syukur itu bukan sesuatu yang parah.",
        },
        {
          type: "image",
          src: "assets/images/0002_intro08chloe.jpg",
          effect: "cross-dissolve",
          skippable: false,
          wait: 500,
        },
        {
          type: "dialogue",
          retainMedia: true,
          name: "Chloe",
          text: "sory {name}, kayanya aku harus buru-buru cabut.",
        },
        {
          type: "image",
          src: "assets/images/0002_intro09chloe.jpg",
          effect: "cross-dissolve",
          skippable: false,
          wait: 500,
        },
        {
          type: "dialogue",
          retainMedia: true,
          name: "Chloe",
          text: "bye {name}!",
        },
      );
    } else {
      sequence.push(
        {
          type: "image",
          src: "assets/images/0002_intro07sean.jpg",
          effect: "cross-dissolve",
          skippable: false,
          wait: 500,
        },
        {
          type: "dialogue",
          retainMedia: true,
          name: "Sean",
          text: "tapi syukur itu bukan sesuatu yang parah.",
        },
        {
          type: "image",
          src: "assets/images/0002_intro08sean.jpg",
          effect: "cross-dissolve",
          skippable: false,
          wait: 500,
        },
        {
          type: "dialogue",
          retainMedia: true,
          name: "Sean",
          text: "sory {name}, kayanya gue harus buru-buru cabut.",
        },
        {
          type: "image",
          src: "assets/images/0002_intro09sean.jpg",
          effect: "cross-dissolve",
          skippable: false,
          wait: 500,
        },
        {
          type: "dialogue",
          retainMedia: true,
          name: "Sean",
          text: "bye {name}!",
        },
      );
    }

    sequence.push({
      type: "image",
      src: "assets/images/0002_intro10.jpg",
      effect: "cross-dissolve",
      wait: 2000,
      skippable: true,
    });
    return sequence;
  },

  startInputScene() {
    GAME.ui.changeScene("scene-input", "fade-black");
    ["gender", "name", "condition", "tutorial"].forEach((step) => {
      const el = document.getElementById(`input-step-${step}`);
      if (el) {
        el.classList.add("hidden");
        el.classList.remove("animate-motion-in", "animate-motion-out", "flex");
      }
    });
    setTimeout(() => {
      this.changeInputStep(null, "input-step-gender");
    }, 2000);
  },

  changeInputStep(oldStepId, newStepId) {
    const oldEl = oldStepId ? document.getElementById(oldStepId) : null;
    const newEl = newStepId ? document.getElementById(newStepId) : null;
    if (oldEl) {
      oldEl.classList.remove("animate-motion-in");
      oldEl.classList.add("animate-motion-out");
      setTimeout(() => {
        oldEl.classList.add("hidden");
        oldEl.classList.remove("flex", "animate-motion-out");
        if (newEl) {
          newEl.classList.remove("hidden");
          newEl.classList.add("flex", "animate-motion-in");
        }
      }, 500);
    } else if (newEl) {
      newEl.classList.remove("hidden");
      newEl.classList.add("flex", "animate-motion-in");
    }
  },

  setGender(gender) {
    GAME.state.gender = gender;
    const helperText = document.getElementById("name-helper-text");
    if (gender === "Pria") {
      helperText.innerText = "Kosongkan untuk menggunakan nama default 'James'";
    } else {
      helperText.innerText =
        "Kosongkan untuk menggunakan nama default 'Evelyn'";
    }
    this.changeInputStep("input-step-gender", "input-step-name");
  },

  setName() {
    const input = document.getElementById("input-name").value.trim();
    if (input !== "") {
      GAME.state.name = input;
    } else {
      GAME.state.name = GAME.state.gender === "Pria" ? "James" : "Evelyn";
    }
    this.changeInputStep("input-step-name", "input-step-condition");
  },

  setCondition(cond) {
    if (cond === "good") {
      GAME.state.stats.cha = 70;
      GAME.state.stats.wis = 30;
    } else {
      GAME.state.stats.cha = 30;
      GAME.state.stats.wis = 70;
    }
    this.startTutorial();
  },

  async startTutorial() {
    this.changeInputStep("input-step-condition", "input-step-tutorial");
    await new Promise((resolve) => setTimeout(resolve, 600));

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const hud = document.getElementById("tutorial-hud");
    const textBox = document.getElementById("tutorial-text-box");
    const textEl = document.getElementById("tutorial-text");
    const tapIndicator = document.getElementById("tutorial-tap-indicator");
    const barE = document.getElementById("tut-bar-energy");
    const barH = document.getElementById("tut-bar-hunger");
    const barC = document.getElementById("tut-bar-composure");
    const txtE = document.getElementById("tut-text-energy");
    const txtH = document.getElementById("tut-text-hunger");
    const txtC = document.getElementById("tut-text-composure");

    let isTransitioning = false;
    const waitForTap = () =>
      new Promise((resolve) => {
        const scene = document.getElementById("input-step-tutorial");
        const handler = () => {
          if (isTransitioning) return;
          scene.removeEventListener("click", handler);
          resolve();
        };
        scene.addEventListener("click", handler);
      });

    const showStep = async (text, setupAction) => {
      isTransitioning = true;
      if (setupAction) setupAction();
      textEl.innerHTML = text;
      tapIndicator.classList.add("opacity-0");
      textBox.classList.remove("opacity-0");
      textBox.classList.add("opacity-100");
      await sleep(500);
      isTransitioning = false;
      tapIndicator.classList.remove("opacity-0");
      await waitForTap();
      isTransitioning = true;
      tapIndicator.classList.add("opacity-0");
      textBox.classList.remove("opacity-100");
      textBox.classList.add("opacity-0");
      await sleep(500);
    };

    await sleep(500);
    hud.classList.remove("opacity-0");
    hud.classList.add("opacity-100");

    await showStep(
      "Selama permainan, kondisi kamu akan ditentukan oleh 3 indikator.",
      () => {
        barE.style.width = "0%";
        txtE.innerText = "0%";
        barH.style.width = "0%";
        txtH.innerText = "0%";
        barC.style.width = "0%";
        txtC.innerText = "0%";
      },
    );

    await showStep(
      "Indikator bar energi untuk menjaga agar kamu dapat bekerja dan melakukan aktifitas berat, energi akan berkurang saat kamu melakukan pekerjaan dan kamu dapat mengisinya kembali dengan tidur di apartemen.",
      () => {
        barE.style.width = "100%";
        txtE.innerText = "100%";
      },
    );

    await showStep(
      "Indikator bar hungry untuk menjaga rasa lapar dan composure kamu tidak turun. Kamu dapat memakan item dari mini market di tab item kamu pada bagian dapur atau tas item di handphone.",
      () => {
        barE.style.width = "0%";
        txtE.innerText = "0%";
        barH.style.width = "100%";
        txtH.innerText = "100%";
      },
    );

    await showStep(
      "Indikator bar composure untuk menjaga kamu agar tetap hidup di dalam game. Composure akan turun bila kamu secara terus menerus menahan rasa lapar dan mendapatkan kejadian buruk di dalam game. Bila bar composure menyentuh angka 0 maka game akan otomatis selesai.",
      () => {
        barH.style.width = "0%";
        txtH.innerText = "0%";
        barC.style.width = "100%";
        txtC.innerText = "100%";
      },
    );

    hud.classList.remove("opacity-100");
    hud.classList.add("opacity-0");

    const bgOverlay = document.createElement("div");
    bgOverlay.className =
      "absolute inset-0 bg-black z-50 transition-opacity duration-1000 opacity-0 pointer-events-none";
    document.getElementById("scene-input").appendChild(bgOverlay);

    await sleep(100);
    bgOverlay.classList.remove("opacity-0");
    bgOverlay.classList.add("opacity-100");
    await sleep(2000);

    GAME.ui.updateHUD();
    this.initStoryIntro();
  },

  initStoryIntro() {
    GAME.state.storyPhase = 1;
    GAME.state.currentStorySeq = "getStorySequence1";
    GAME.logic.startStory(GAME.logic.getStorySequence1(), () => {
      GAME.state.storyPhase = 1.5;
      GAME.audio.fadeOutAndPause(GAME.audio.intro);
      GAME.state.currentStorySeq = "getStorySequence2Part1";

      GAME.logic.startStory(GAME.logic.getStorySequence2Part1(), () => {
        GAME.logic.startStory2Interactive();
      });
    });
  },

  startStory(sequence, onComplete) {
    this.storyState.step = 0;
    this.storyState.sequence = sequence;
    this.storyState.onComplete = onComplete || null;

    const sceneStory = document.getElementById("scene-story");
    if (!sceneStory.classList.contains("active")) {
      document.getElementById("story-media-layer").innerHTML = "";
      this.storyState.currentMediaEl = null;
      GAME.ui.changeScene("scene-story");
    }

    this.storyState.pausedForChoice = false;
    GAME.ui.hideChoices();

    this.playStoryStep();
  },

  async playIntroNarration() {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const dialogueEl = document.getElementById("story-intro-dialogue");
    const textEl = document.getElementById("story-intro-text");
    const playerName = GAME.state.name || "James";

    const typeText = (text) => {
      return new Promise((resolve) => {
        let i = 0;
        textEl.innerHTML = "";
        dialogueEl.classList.remove("opacity-0");

        const typingInterval = setInterval(() => {
          textEl.innerHTML += text.charAt(i);
          i++;
          if (i >= text.length) {
            clearInterval(typingInterval);
            resolve();
          }
        }, 40);
      });
    };

    await sleep(2000);
    await typeText(`Hi ${playerName}`);
    await sleep(3000);
    dialogueEl.classList.add("opacity-0");

    // Animasi bar energi turun di pertengahan intro video (Selama 4 detik)
    GAME.logic.animateStat("energy", 30, 0, 4000);

    await sleep(500);
    await typeText(
      `Dalam game ini kamu dituntut untuk menemukan berbagai momen yang bisa kamu nikmati.`,
    );
    await sleep(3000);
    dialogueEl.classList.add("opacity-0");

    await sleep(2000);
    await typeText("Let's enjoy the game!!");
    await sleep(1500);
    dialogueEl.classList.add("opacity-0");
  },

  playStoryStep() {
    if (this.storyState.pausedForChoice) return;

    const stepIdx = this.storyState.step;
    const sequence = this.storyState.sequence;

    if (!sequence || stepIdx >= sequence.length) {
      const onCompleteCb = this.storyState.onComplete;
      this.storyState.sequence = null;
      this.storyState.onComplete = null;
      if (typeof onCompleteCb === "function") {
        onCompleteCb();
      }
      return;
    }

    const stepData = sequence[stepIdx];
    const playerName = GAME.state.name || "James";

    if (this.storyState.waitTimeout) clearTimeout(this.storyState.waitTimeout);
    if (this.storyState.typingTimeout)
      clearInterval(this.storyState.typingTimeout);

    this.storyState.isTyping = false;
    this.storyState.textCompleted = false;

    const dialogueUI = document.getElementById("story-dialogue-ui");
    const gradient = document.getElementById("story-gradient");
    const tapIndicator = document.getElementById("story-tap-indicator");

    if (stepData.type === "action") {
      if (stepData.action) stepData.action();
      if (
        this.storyState.sequence === sequence &&
        this.storyState.step === stepIdx
      ) {
        this.nextStoryStep();
      }
      return;
    }

    if (stepData.type === "choice") {
      this.storyState.pausedForChoice = true;
      GAME.ui.renderChoices(stepData.choices);
      return;
    }

    if (stepData.type === "dialogue") {
      dialogueUI.classList.remove("opacity-0");
      gradient.classList.remove("opacity-0");
      tapIndicator.classList.add("opacity-0");

      const npcNameEl = document.getElementById("story-npc-name");
      const npcBorderEl = document.getElementById("story-npc-border");
      npcNameEl.innerText = stepData.name;

      if (stepData.color) {
        npcNameEl.style.color = stepData.color;
        npcBorderEl.style.borderColor = stepData.color;
      } else if (stepData.name === "Sean") {
        npcNameEl.style.color = "#60a5fa";
        npcBorderEl.style.borderColor = "#60a5fa";
      } else if (stepData.name === "Chloe") {
        npcNameEl.style.color = "#e69b35";
        npcBorderEl.style.borderColor = "#e69b35";
      } else {
        npcNameEl.style.color = "#ffffff";
        npcBorderEl.style.borderColor = "#ffffff";
      }

      document.getElementById("story-text").innerHTML = "";
    } else {
      dialogueUI.classList.add("opacity-0");
      gradient.classList.add("opacity-0");
    }

    if (!stepData.retainMedia) {
      const mediaLayer = document.getElementById("story-media-layer");
      let newMediaEl = null;

      if (stepData.type === "video") {
        newMediaEl = document.createElement("video");
        newMediaEl.autoplay = true;
        newMediaEl.muted = true;
        newMediaEl.playsInline = true;
        newMediaEl.className =
          "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 opacity-0 z-10";
          
        if (stepData.src.includes(".m3u8") && window.Hls && Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(stepData.src);
          hls.attachMedia(newMediaEl);
        } else {
          newMediaEl.src = stepData.src;
        }
        newMediaEl.onended = () => this.nextStoryStep();
        if (stepData.src === "assets/videos/party_intro.m3u8") {
          this.playIntroNarration();
        }
      } else if (
        (stepData.type === "image" || stepData.type === "dialogue") &&
        stepData.src
      ) {
        newMediaEl = document.createElement("img");
        newMediaEl.src = stepData.src;
        // If it's a character dialogue, add breathing animation
        let extraClasses = stepData.type === "dialogue" ? " animate-breathing" : "";
        newMediaEl.className =
          "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 opacity-0 z-10" + extraClasses;
      } else if (stepData.bg === "black") {
        newMediaEl = document.createElement("div");
        newMediaEl.className =
          "absolute inset-0 w-full h-full bg-black transition-opacity duration-1000 opacity-0 z-10";
      }

      if (newMediaEl) {
        mediaLayer.appendChild(newMediaEl);

        const applyTransition = () => {
          void newMediaEl.offsetWidth;

          if (stepData.effect === "wake-up") {
            newMediaEl.classList.remove("opacity-0");
            newMediaEl.classList.add("opacity-100", "animate-wake-up");
          } else if (stepData.effect === "blur-shake") {
            newMediaEl.classList.remove("opacity-0");
            newMediaEl.classList.add("opacity-100", "animate-blur-shake");
          } else if (stepData.effect === "blur-pulse-1") {
            newMediaEl.classList.remove("opacity-0");
            newMediaEl.classList.add("opacity-100", "animate-blur-pulse-1");
          } else if (stepData.effect === "blur-pulse-2") {
            newMediaEl.classList.remove("opacity-0");
            newMediaEl.classList.add("opacity-100", "animate-blur-pulse-2");
          } else if (stepData.effect === "blur-oscillate") {
            newMediaEl.classList.remove("opacity-0");
            newMediaEl.classList.add("opacity-100", "animate-blur-oscillate");
          } else {
            newMediaEl.classList.remove("opacity-0");
            newMediaEl.classList.add("opacity-100");
          }

          if (this.storyState.currentMediaEl) {
            const oldMedia = this.storyState.currentMediaEl;
            oldMedia.classList.remove("opacity-100");
            oldMedia.classList.add("opacity-0");
            oldMedia.classList.replace("z-10", "z-0");
            setTimeout(() => {
              if (oldMedia.parentNode) oldMedia.parentNode.removeChild(oldMedia);
            }, 1500);
          }
          this.storyState.currentMediaEl = newMediaEl;
        };

        if (stepData.type === "video") {
          let hasTransitioned = false;
          const doTransition = () => {
            if (hasTransitioned) return;
            hasTransitioned = true;
            applyTransition();
          };
          newMediaEl.addEventListener('canplay', doTransition, { once: true });
          // Fallback just in case canplay doesn't fire
          setTimeout(doTransition, 2000);
        } else {
          applyTransition();
        }
      }
    }

    if (
      (stepData.type === "image" || stepData.bg === "black") &&
      stepData.wait
    ) {
      this.storyState.waitTimeout = setTimeout(() => {
        this.nextStoryStep();
      }, stepData.wait);
    } else if (stepData.type === "dialogue" && stepData.text) {
      const fullText = stepData.text.replace(/\{name\}/g, playerName);
      this.typeStoryText(fullText);
    }
  },

  typeStoryText(text) {
    this.storyState.isTyping = true;
    const textEl = document.getElementById("story-text");
    const tapIndicator = document.getElementById("story-tap-indicator");
    textEl.innerHTML = "";

    let i = 0;
    this.storyState.typingTimeout = setInterval(() => {
      textEl.innerHTML += text.charAt(i);
      i++;
      if (i >= text.length) {
        clearInterval(this.storyState.typingTimeout);
        this.storyState.isTyping = false;
        this.storyState.textCompleted = true;
        tapIndicator.classList.remove("opacity-0");
      }
    }, 40);
  },

  handleStoryTap() {
    if (this.storyState.pausedForChoice) return;

    const stepIdx = this.storyState.step;
    const sequence = this.storyState.sequence;

    if (!sequence || stepIdx >= sequence.length) return;
    const stepData = sequence[stepIdx];

    if (stepData.type !== "dialogue") {
      if (stepData.skippable !== false) {
        this.nextStoryStep();
      }
    } else {
      if (this.storyState.isTyping) {
        clearInterval(this.storyState.typingTimeout);
        this.storyState.isTyping = false;
        this.storyState.textCompleted = true;

        const playerName = GAME.state.name || "James";
        const fullText = stepData.text.replace(/\{name\}/g, playerName);

        document.getElementById("story-text").innerHTML = fullText;
        document
          .getElementById("story-tap-indicator")
          .classList.remove("opacity-0");
      } else if (this.storyState.textCompleted) {
        this.nextStoryStep();
      }
    }
  },

  nextStoryStep() {
    if (this.storyState.waitTimeout) clearTimeout(this.storyState.waitTimeout);
    this.storyState.step++;
    this.playStoryStep();
  },

  handleStoryChoice(choiceObj) {
    GAME.ui.hideChoices();
    this.storyState.pausedForChoice = false;

    if (choiceObj.stats) {
      if (choiceObj.stats.heart_chloe !== undefined) {
        GAME.state.stats.heart_chloe += choiceObj.stats.heart_chloe;
        if (GAME.state.npcs && GAME.state.npcs.chloe)
          GAME.state.npcs.chloe.lastChange = choiceObj.stats.heart_chloe;
      }
      if (choiceObj.stats.cha !== undefined) {
        GAME.state.stats.cha += choiceObj.stats.cha;
        GAME.state.stats.last_cha_change = choiceObj.stats.cha;
      }
      if (choiceObj.stats.wis !== undefined) {
        GAME.state.stats.wis += choiceObj.stats.wis;
        GAME.state.stats.last_wis_change = choiceObj.stats.wis;
      }
      GAME.state.stats.cha = GAME.clamp(GAME.state.stats.cha, 0, 100);
      GAME.state.stats.wis = GAME.clamp(GAME.state.stats.wis, 0, 100);

      GAME.ui.updateHUD();
    }

    if (choiceObj.action) {
      choiceObj.action();
    } else if (choiceObj.next) {
      GAME.logic.gotoSeq(choiceObj.next);
    } else {
      this.nextStoryStep();
    }
  },

  gotoSeq(seqName, onComplete = null) {
    if (typeof seqName === "string") {
      GAME.state.currentStorySeq = seqName;
    }
    const seq = typeof seqName === "string" ? GAME.logic[seqName]() : seqName;
    GAME.logic.startStory(seq, onComplete);
  },

  startStory2Interactive() {
    GAME.state.storyPhase = 2;
    GAME.ui.updateHUD();
    GAME.state.currentView = "view-apartment";
    GAME.ui.changeScene("scene-maingame", "fade-black");

    const videoBg = document.getElementById("maingame-bg-video");
    if (videoBg) {
      videoBg.classList.remove("hidden");
      videoBg.play().catch((e) => {});
    }

    const uiElements = [
      document.getElementById("global-top-ui"),
      document.getElementById("dynamic-content"),
      document.getElementById("global-bottom-ui"),
    ];

    uiElements.forEach((el) => {
        if (!el) return;
        el.style.opacity = "0";
        if (el.id === "global-bottom-ui") {
          Array.from(el.querySelectorAll("button")).forEach(b => b.style.pointerEvents = "none");
        }
        el.style.pointerEvents = "none";
        el.style.transition = "opacity 1s ease-in-out";
      });

    const wrapper = document.getElementById("view-apartment");
    const icon = document.getElementById("apartment-toggle-icon");
    const doorExit = document.getElementById("door-exit-area");

    if (!wrapper.classList.contains("minimized")) {
      wrapper.classList.add("minimized");
      icon.classList.add("rotate-180");
    }
    
    if (doorExit) {
      doorExit.classList.remove("hidden");
      setTimeout(() => doorExit.classList.remove("opacity-0"), 10);
    }

    setTimeout(() => {
      uiElements.forEach((el) => {
        if (!el) return;
        el.style.opacity = "1";
        if (el.id === "global-bottom-ui") {
          Array.from(el.querySelectorAll("button")).forEach(b => b.style.pointerEvents = "auto");
        }
        el.style.pointerEvents = (el.id === "dynamic-content" || el.id === "global-bottom-ui" || el.id === "global-top-ui") ? "none" : "";
      });
    }, 2000);
  },

  triggerStory2Part2() {
    GAME.state.storyPhase = 3;
    const videoBg = document.getElementById("maingame-bg-video");
    if (videoBg) videoBg.pause();

    GAME.ui.changeScene("scene-story", "fade-black");
    GAME.state.currentStorySeq = "getStorySequence2Part2";

    GAME.logic.startStory(GAME.logic.getStorySequence2Part2(), () => {
      if (GAME.state.gender === "Pria") {
        GAME.logic.gotoSeq("seq_3_chloe_start");
      } else {
        GAME.logic.gotoSeq("seq_3_sean_start");
      }
    });
  },


  // ==========================================
  // LOGIC UTAMA (Waktu, Kerja, Tidur, dll)
  // ==========================================
  startGameReal() {
    GAME.state.storyPhase = 4;
    GAME.ui.updateHUD();
    GAME.state.currentView = "view-apartment";
    GAME.ui.changeScene("scene-maingame", "fade-black");

    const videoBg = document.getElementById("maingame-bg-video");
    if (videoBg) {
      videoBg.classList.add("hidden");
      videoBg.pause();
    }
    GAME.ui.updateBackground();

    const uiElements = [
      document.getElementById("global-top-ui"),
      document.getElementById("dynamic-content"),
      document.getElementById("global-bottom-ui"),
    ];
    uiElements.forEach((el) => {
      if (el) {
        el.style.opacity = "1";
        if (el.id === "global-bottom-ui") {
          Array.from(el.querySelectorAll("button")).forEach(b => b.style.pointerEvents = "auto");
        }
        el.style.pointerEvents = (el.id === "dynamic-content" || el.id === "global-bottom-ui" || el.id === "global-top-ui") ? "none" : "";
      }
    });

    const wrapper = document.getElementById("view-apartment");
    if (wrapper && !wrapper.classList.contains("minimized")) {
      GAME.logic.toggleApartmentView();
    }
  },

  triggerGameOver() {
    GAME.ui.changeScene("scene-gameover");
  },

  toggleApartmentView() {
    const wrapper = document.getElementById("view-apartment");
    const icon = document.getElementById("apartment-toggle-icon");
    const doorExit = document.getElementById("door-exit-area");
    wrapper.classList.toggle("minimized");

    if (wrapper.classList.contains("minimized")) {
      icon.classList.add("rotate-180");
      if (doorExit) {
        doorExit.classList.remove("hidden");
        setTimeout(() => doorExit.classList.remove("opacity-0"), 10);
      }
    } else {
      icon.classList.remove("rotate-180");
      if (doorExit) {
        doorExit.classList.add("opacity-0");
        setTimeout(() => doorExit.classList.add("hidden"), 300);
      }
    }
  },

  performTransition(actionCallback) {
    const fader = document.getElementById("screen-fader");
    fader.style.transition = "opacity 0.4s ease-in";
    fader.style.opacity = "1";
    setTimeout(() => {
      if (typeof actionCallback === "function") {
        actionCallback();
      }
      setTimeout(() => {
        fader.style.transition = "opacity 0.6s ease-out";
        fader.style.opacity = "0";
      }, 100);
    }, 400);
  },

  advanceTime(phases) {
    let totalPhases = GAME.state.timePhaseIdx + phases;
    const daysPassed = Math.floor(totalPhases / 6);
    GAME.state.day += daysPassed;
    GAME.state.timePhaseIdx = totalPhases % 6;
    
    // Daily Pinjol Update
    if (daysPassed > 0 && GAME.state.loans) {
        GAME.state.loans.forEach(loan => {
            loan.daysUntilNextBill -= daysPassed;
            if (loan.daysUntilNextBill <= 0) {
                GAME.logic.addMessage({
                    sender: "Greg",
                    text: `Waktunya bayar hutangmu! Segera bayar cicilan $${loan.billAmount} dari pinjaman $${loan.amount} sekarang juga, atau aku akan datang mencarimu!`,
                    day: GAME.state.day,
                    action: { type: 'pay_bill', amount: loan.billAmount, loanId: loan.id },
                    img: "assets/images/Greg_0Z0hutang02.png"
                });
                loan.daysUntilNextBill = loan.billInterval; 
            }
        });
    }

    for (let i = 0; i < phases; i++) {
      this.updateStockPrices();
    }
    let hungerLoss = phases * 5;
    GAME.state.stats.hunger = GAME.clamp(
      GAME.state.stats.hunger - hungerLoss,
      0,
      100,
    );
    if (GAME.state.stats.hunger === 0) {
      GAME.state.stats.composure = GAME.clamp(
        GAME.state.stats.composure - phases * 5,
        0,
        100,
      );
      if (GAME.state.stats.composure <= 0) {
        this.triggerGameOver();
        return;
      } else if (
        GAME.state.stats.composure > 0 &&
        GAME.state.stats.composure <= 20
      ) {
        GAME.ui.showToast("Ã¢Å¡Â Ã¯Â¸Â Sangat lapar, mentalmu mulai goyah!");
        GAME.state.composureWarned = true;
      }
    } else if (GAME.state.composureWarned && GAME.state.stats.composure > 20) {
      GAME.state.composureWarned = false;
    }
    GAME.ui.updateHUD();
  },

  sleep(durationType) {
    if (GAME.state.storyPhase === 2) {
      GAME.logic.triggerStory2Part2();
      return;
    }
    this.performTransition(() => {
      if (durationType === 1) {
        GAME.state.stats.energy += 30;
        GAME.logic.advanceTime(1);
        GAME.ui.showToast("Tidur sebentar meregangkan otot.");
      } else {
        GAME.state.stats.energy += 100;
        GAME.logic.advanceTime(3);
        GAME.ui.showToast("Tidur panjang yang nyenyak.");
      }
      this.saveGame("autosave");
      GAME.ui.changeView("view-apartment", false);
    });
  },

  takeBath() {
    if (GAME.state.storyPhase === 2) {
      GAME.logic.triggerStory2Part2();
      return;
    }
    this.performTransition(() => {
      GAME.state.stats.composure += 10;
      GAME.logic.advanceTime(1);
      GAME.ui.showToast("Mandi air dingin, terasa segar.");
      GAME.ui.changeView("view-apartment", false);
    });
  },

  work(jobId) {
    const job = GAME.constants.jobList.find(j => j.id === jobId);
    if (!job) {
        GAME.ui.showToast("Pekerjaan tidak ditemukan.");
        return;
    }

    if (GAME.state.stats.energy < Math.abs(job.energy)) {
      GAME.ui.showToast("Energy tidak cukup untuk bekerja!");
      GAME.ui.renderJobCards(); // Put card back
      return;
    }

    this.performTransition(() => {
      GAME.state.stats.energy += job.energy;
      GAME.state.stats.hunger += job.hunger;
      if (job.composure) GAME.state.stats.composure += job.composure;
      
      GAME.state.money += job.pay;
      GAME.logic.advanceTime(job.hours);
      
      GAME.ui.showToast(`Bekerja sebagai ${job.title} menghasilkan $${job.pay}.`);
      this.saveGame("autosave");
      
      GAME.ui.renderJobCards();
    });
  },

  // ==========================================
  // MAP VN EVENTS
  // ==========================================
  
  openCityMap() {
    if (GAME.state.storyPhase === 2) {
      GAME.logic.triggerStory2Part2();
      return;
    }
    const seq = [
      { type: "image", src: "assets/images/0Z0keluargedung01.jpg", wait: 500, skippable: true },
      { type: "image", src: "assets/images/0Z0keluargedung02.jpg", effect: "cross-dissolve", wait: 500, skippable: true },
      { type: "image", src: "assets/images/0Z0keluargedung03.jpg", effect: "cross-dissolve", wait: 500, skippable: true }
    ];
    GAME.logic.startStory(seq, () => {
      GAME.ui.changeScene("scene-maingame");
      GAME.state.currentLocation = "city";
      GAME.ui.updateHUD();
      GAME.ui.changeView("view-city", false);
    });
  },

  enterMinimarket() {
    const isNight = GAME.state.timePhaseIdx === 0 || GAME.state.timePhaseIdx >= 4;
    let seq = [];
    if (!isNight) {
      seq = [
        { type: "image", src: "assets/images/00Z0minimarket01.jpg", wait: 500, skippable: true },
        { type: "image", src: "assets/images/0Z0minimarket02_1.jpg", effect: "cross-dissolve", wait: 500, skippable: true },
        { type: "dialogue", retainMedia: true, name: "Erika", color: "pink", text: "selamat datang diminimarket selamat berbelanja." }
      ];
    } else {
      seq = [
        { type: "image", src: "assets/images/0Z0minimarket02_1.jpg", wait: 500, skippable: true },
        { type: "dialogue", retainMedia: true, name: "Shia", color: "purple", text: "selamat datang, selamat berbelanja." },
        { type: "image", src: "assets/images/0Z0minimarket03.jpg", effect: "cross-dissolve", wait: 500, skippable: true }
      ];
    }
    GAME.logic.startStory(seq, () => {
      GAME.ui.changeScene("scene-maingame");
      GAME.ui.changeView("view-minimarket");
    });
  },

  closeMinimarket() {
    const seq = [
      { type: "image", src: "assets/images/0Z0minimarket04.jpg", wait: 500, skippable: true },
      { type: "image", src: "assets/images/0Z0minimarket05.jpg", effect: "cross-dissolve", wait: 500, skippable: true }
    ];
    GAME.logic.startStory(seq, () => {
      GAME.ui.changeScene("scene-maingame");
      GAME.ui.changeView("view-city");
      GAME.logic.advanceTime(1);
    });
  },

  enterJobs() {
    const isLateNight = GAME.state.timePhaseIdx === 4 || GAME.state.timePhaseIdx === 5 || GAME.state.timePhaseIdx === 0;
    if (isLateNight) {
      const seq = [
        { type: "image", src: "assets/images/0Z0pusatpekerjaantutup.jpg", wait: 500, skippable: true },
        { type: "dialogue", retainMedia: true, name: "", text: "maaf pusat pekerjaan tutup, kembali lagi saat pagi hari" }
      ];
      GAME.logic.startStory(seq, () => {
        GAME.ui.changeScene("scene-maingame");
        GAME.ui.changeView("view-city");
      });
    } else {
      const playerName = GAME.state.name || "Player";
      const seq = [
        { type: "image", src: "assets/images/00Z0pusatpekerjaan01.jpg", wait: 500, skippable: true },
        { type: "image", src: "assets/images/0Z0pusatpekerjaan02.jpg", effect: "cross-dissolve", wait: 500, skippable: true },
        { type: "dialogue", retainMedia: true, name: "Lidya", color: "lightblue", text: `hallo ${playerName}, kamu ingin mengambil pekerjaan apa hari ini?` }
      ];
      GAME.logic.startStory(seq, () => {
        GAME.ui.changeScene("scene-maingame");
        GAME.ui.changeView("view-jobs");
        const bg = document.getElementById("background-layer");
        if (bg) bg.style.backgroundImage = "url('assets/images/0Z0pusatpekerjaan03.jpg')";
      });
    }
  },

  work(jobType) {
    let eCost = 0, hCost = 0, cGain = 0, timeCost = 0, income = 0;
    let seqPrefix = "";
    
    if (jobType === "layanan") {
      eCost = 50; hCost = 30; cGain = 5; timeCost = 3; income = 30;
      seqPrefix = "0Z0laymas";
    } else if (jobType === "buruh") {
      eCost = 80; hCost = 60; cGain = -20; timeCost = 6; income = 80;
      seqPrefix = "0Z0buruh";
    } else if (jobType === "kurir") {
      eCost = 60; hCost = 40; cGain = -10; timeCost = 4; income = 45;
      seqPrefix = "0Z0kurir";
    }

    if (GAME.state.stats.energy < eCost) {
      GAME.ui.showToast("Ã¢ÂÅ’ Energi tidak cukup untuk bekerja!");
      return;
    }

    const playerName = GAME.state.name || "Player";
    const seq = [
      { type: "image", src: `assets/images/${seqPrefix}01.jpg`, wait: 500, skippable: true },
      { type: "image", src: `assets/images/${seqPrefix}02.jpg`, effect: "cross-dissolve", wait: 500, skippable: true },
      { type: "image", src: "assets/images/0Z0pusatpekerjaan04.jpg", wait: 500, skippable: true },
      { type: "image", src: "assets/images/0Z0pusatpekerjaan05.jpg", effect: "cross-dissolve", wait: 500, skippable: true },
      { type: "dialogue", retainMedia: true, name: "Lidya", color: "lightblue", text: `terimakasih atas kerja kerasnya ${playerName}.` }
    ];

    GAME.logic.startStory(seq, () => {
      GAME.ui.changeScene("scene-maingame");
      GAME.state.stats.energy -= eCost;
      GAME.state.stats.hunger -= hCost;
      GAME.state.stats.composure += cGain;
      GAME.state.money += income;
      GAME.logic.advanceTime(timeCost);
      GAME.ui.showToast(`Mendapat $${income}`);
      GAME.ui.changeView("view-city", false);
    });
  },

  enterTamanKota() {
    const isNight = GAME.state.stats.time >= 3;
    const timeSuffix = isNight ? "malam" : "siang";
    const seq = [
      { type: "image", src: `assets/images/0Z0tamkot01${timeSuffix}.jpg`, wait: 500, skippable: true },
      { type: "image", src: `assets/images/0Z0tamkot02${timeSuffix}.jpg`, effect: "cross-dissolve", wait: 500, skippable: true },
      { type: "dialogue", retainMedia: true, name: "", text: "kamu berada di taman kota, apa yang akan kamu lakukan?" },
      {
        type: "choice",
        choices: [
          {
            text: "duduk menikmati suasana",
            action: () => {
              const enjoySeq = [
                { type: "image", src: `assets/images/0Z0enjoytamkot01${timeSuffix}.jpg`, wait: 500, skippable: true },
                { type: "image", src: `assets/images/0Z0enjoytamkot02${timeSuffix}.jpg`, effect: "cross-dissolve", wait: 500, skippable: true },
                { type: "image", src: `assets/images/0Z0enjoytamkot03${timeSuffix}.jpg`, effect: "cross-dissolve", wait: 500, skippable: true },
                {
                  type: "choice",
                  choices: [
                    {
                      text: "kembali",
                      action: () => {
                        GAME.ui.changeScene("scene-maingame");
                        GAME.state.stats.composure += 3;
                        GAME.logic.advanceTime(1);
                        GAME.ui.changeView("view-city");
                      }
                    }
                  ]
                }
              ];
              GAME.logic.startStory(enjoySeq);
            }
          },
          {
            text: "kembali",
            action: () => {
              GAME.ui.changeScene("scene-maingame");
              GAME.ui.changeView("view-city");
            }
          }
        ]
      }
    ];
    GAME.logic.startStory(seq);
  },

  enterExclusiveApt() {
    const playerName = GAME.state.name || "Player";
    const title = GAME.state.gender === 'Wanita' ? "nona" : "tuan";
    
    const seq = [
      { type: "image", src: "assets/images/00Z0Apaxluf01.jpg", wait: 500, skippable: true },
      { type: "image", src: "assets/images/00Z0Apaxluf02.jpg", effect: "cross-dissolve", wait: 500, skippable: true },
      { type: "dialogue", retainMedia: true, name: "Louis", color: "green", text: `Halo ${title}, apakah sudah ada janji temu?` },
      {
        type: "choice",
        choices: [
          {
            text: "maaf tidak ada, saya akan kembali",
            action: () => {
              GAME.ui.changeScene("scene-maingame");
              GAME.state.stats.composure -= 1;
              GAME.ui.changeView("view-city");
            }
          }
        ]
      }
    ];
    GAME.logic.startStory(seq);
  },

  enterGudangKota() {
    const isLateNight = GAME.state.timePhaseIdx === 0 || GAME.state.timePhaseIdx >= 4;
    if (isLateNight) {
      const seq = [
        { type: "image", src: "assets/images/0Z0gudkottutup.jpg", wait: 500, skippable: true },
        { type: "dialogue", retainMedia: true, name: "", text: "maaf gerbang gudang kota ditutup" }
      ];
      GAME.logic.startStory(seq, () => {
        GAME.ui.changeScene("scene-maingame");
        GAME.ui.changeView("view-city");
      });
    } else {
      const playerName = GAME.state.name || "Player";
      const seq = [
        { type: "image", src: "assets/images/00Z0gudkot01.jpg", wait: 500, skippable: true },
        { type: "image", src: "assets/images/0Z0gudkot02.jpg", effect: "cross-dissolve", wait: 500, skippable: true },
        { type: "dialogue", retainMedia: true, name: "Sean", color: "blue", text: `heyy ${playerName}!!` },
        { type: "image", src: "assets/images/00Z0gudkot03.jpg", effect: "cross-dissolve", wait: 500, skippable: true }
      ];
      GAME.logic.startStory(seq, () => {
        GAME.ui.changeScene("scene-maingame");
        GAME.logic.advanceTime(1);
        GAME.ui.changeView("view-city");
      });
    }
  },

  enterBar() {
    const isDay = GAME.state.timePhaseIdx >= 1 && GAME.state.timePhaseIdx <= 3;
    if (isDay) {
      const seq = [
        { type: "image", src: "assets/images/0Z0bartutup.jpg", wait: 500, skippable: true },
        { type: "dialogue", retainMedia: true, name: "", text: "maaf ambrosia room tutup, kembali lagi saat malam hari" }
      ];
      GAME.logic.startStory(seq, () => {
        GAME.ui.changeScene("scene-maingame");
        GAME.ui.changeView("view-city");
      });
    } else {
      const playerName = GAME.state.name || "Player";
      const seq = [
        { type: "image", src: "assets/images/0Z0bar01.jpg", wait: 500, skippable: true },
        { type: "image", src: "assets/images/0Z0bar02.jpg", effect: "cross-dissolve", wait: 500, skippable: true },
        { type: "dialogue", retainMedia: true, name: "Hannah", color: "purple", text: `Hai ${playerName}...` },
        {
          type: "choice",
          choices: [
            {
              text: "pesan minum",
              action: () => {
                if (GAME.state.money < 20) {
                  GAME.ui.showToast("Uang tidak cukup!");
                  GAME.ui.changeView("view-city");
                  return;
                }
                const drinkSeq = [
                  { type: "image", src: "assets/images/0Z0bar03.jpg", wait: 500, skippable: true },
                  { type: "image", src: "assets/images/0Z0bar04.jpg", effect: "cross-dissolve", wait: 500, skippable: true },
                  { type: "image", src: "assets/images/0Z0bar05.jpg", effect: "cross-dissolve", wait: 500, skippable: true }
                ];
                GAME.logic.startStory(drinkSeq, () => {
                  GAME.ui.changeScene("scene-maingame");
                  GAME.state.money -= 20;
                  GAME.state.stats.composure += 3;
                  GAME.state.stats.hunger += 5;
                  GAME.logic.advanceTime(1);
                  GAME.ui.changeView("view-city");
                });
              }
            },
            {
              text: "kembali",
              action: () => {
                GAME.ui.changeScene("scene-maingame");
                GAME.ui.changeView("view-city");
              }
            }
          ]
        }
      ];
      GAME.logic.startStory(seq);
    }
  },

  // ==========================================
  // LOGIC EKONOMI & SAHAM
  // ==========================================
  returnHome() {
    GAME.state.currentLocation = "apartment";
    GAME.ui.updateBackground();
    const wrapper = document.getElementById("view-apartment");
    const icon = document.getElementById("apartment-toggle-icon");
    if (wrapper.classList.contains("minimized")) {
      wrapper.classList.remove("minimized");
      icon.classList.remove("rotate-180");
    }
    GAME.ui.changeView("view-apartment");
  },

  showStoryLocation(locName) {
    document.getElementById("story-loc-title").innerText = locName;
    GAME.ui.changeView("view-story-location");
  },

  transitionToLocation(clickedElement, actionCallback) {
    const bgElement = document.getElementById("background-layer");
    const mapLabels = document.querySelectorAll("#view-city .map-label");
    mapLabels.forEach((label) => {
      label.style.transition = "opacity 0.5s ease";
      label.style.opacity = "0";
    });
    const rect = clickedElement.getBoundingClientRect();
    const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
    const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
    bgElement.style.transformOrigin = `${x}% ${y}%`;
    setTimeout(() => {
      bgElement.classList.add("map-transition-zoom");
    }, 200);
    setTimeout(() => {
      actionCallback();
      bgElement.style.removeProperty("transform");
      bgElement.style.removeProperty("filter");
      bgElement.classList.remove("map-transition-zoom");
    }, 1300);
  },

  updateStockPrices() {
    if (!GAME.state.stockPrices) return;
    GAME.constants.stocks.forEach((stock) => {
      if (!GAME.state.stockPrices[stock.id]) {
        GAME.state.stockPrices[stock.id] = {
          current: stock.base,
          prev: stock.base,
          history: [stock.base],
        };
      }
      const data = GAME.state.stockPrices[stock.id];
      data.prev = data.current;
      const changePercent = Math.random() * (stock.vol * 2) - stock.vol;
      let newPrice = data.current * (1 + changePercent);
      if (newPrice > stock.base * 4) newPrice *= 0.9;
      if (newPrice < stock.base * 0.2) newPrice *= 1.1;
      newPrice = Math.max(1, newPrice);
      data.current = newPrice;
      if (!data.history) data.history = [data.prev];
      data.history.push(newPrice);
      if (data.history.length > 20) data.history.shift();
    });
  },

  openInventoryFromPhone() {
    GAME.ui.toggleModal('modal-phone');
    GAME.ui.renderPhoneInventory('food');
    GAME.ui.toggleModal('modal-phone-inventory');
  },

  openPinjolApp() {
    GAME.ui.toggleModal('modal-phone');
    GAME.ui.renderPinjolApp();
    GAME.ui.toggleModal('modal-phone-pinjol');
  },

  borrowPinjol(loanId) {
    const loan = GAME.constants.pinjolOptions.find(l => l.id === loanId);
    if (!loan) return;
    GAME.ui.showConfirm(
        "Konfirmasi Pinjaman",
        `Ajukan pinjaman sebesar $${loan.amount} dengan cicilan $${loan.billAmount}/${loan.billInterval} hari selama ${loan.maxTenor}x?`,
        () => {
            GAME.state.money += loan.amount;
            GAME.state.loans.push({
                id: 'loan_' + Date.now(),
                loanId: loan.id,
                amount: loan.amount,
                billAmount: loan.billAmount,
                billInterval: loan.billInterval,
                daysUntilNextBill: loan.billInterval,
                paidTenor: 0,
                maxTenor: loan.maxTenor
            });
            
            GAME.logic.addMessage({
                sender: "Greg",
                text: `Terima kasih telah menggunakan layanan Pinjol Cepat. Pinjaman $${loan.amount} Anda telah cair. Jangan telat bayar cicilan $${loan.billAmount} dalam ${loan.billInterval} hari, atau Anda berurusan dengan saya!`,
                day: GAME.state.day,
                action: null,
                img: "assets/images/Greg_0Z0hutang01.png"
            });
            
            GAME.ui.renderPinjolApp();
            GAME.ui.updateHUD();
        }
    );
  },

  openMessageApp() {
    GAME.ui.toggleModal('modal-phone');
    GAME.ui.renderMessageApp();
    GAME.ui.toggleModal('modal-phone-message');
  },
  
  openMessageDetail(msgId) {
    const msg = GAME.state.messages.find(m => m.id === msgId);
    if (!msg) return;
    msg.isRead = true;
    GAME.ui.renderMessageApp();
    GAME.ui.updateHUD();
    GAME.ui.renderMessageDetail(msg);
    GAME.ui.toggleModal('modal-message-detail');
  },
  
  payBill(msgId, amount, loanId) {
      if (GAME.state.money < amount) {
          GAME.ui.showToast("Uang Anda tidak cukup untuk membayar tagihan ini!");
          return;
      }
      
      GAME.state.money -= amount;
      
      if (loanId) {
          const loan = GAME.state.loans.find(l => l.id === loanId);
          if (loan) {
              loan.paidTenor++;
              loan.daysUntilNextBill = loan.billInterval;
              GAME.ui.showToast(`Cicilan ke-${loan.paidTenor} sebesar $${amount} berhasil dibayar.`);
              
              if (loan.paidTenor >= loan.maxTenor) {
                  GAME.state.loans = GAME.state.loans.filter(l => l.id !== loanId);
                  GAME.ui.showToast("Pinjaman telah lunas!");
              }
          }
      } else {
          GAME.ui.showToast(`Tagihan sebesar $${amount} berhasil dibayar.`);
      }
      
      const msg = GAME.state.messages.find(m => m.id === msgId);
      if (msg) {
          msg.action = null;
      }
      
      GAME.ui.updateHUD();
      GAME.ui.toggleModal('modal-message-detail');
  },

  addMessage(msgData) {
      if (!GAME.state.messages) GAME.state.messages = [];
      const newMsg = {
          id: 'msg_' + Date.now() + Math.floor(Math.random() * 1000),
          sender: msgData.sender || "Unknown",
          text: msgData.text || "",
          day: msgData.day || GAME.state.day,
          isRead: false,
          action: msgData.action || null,
          img: msgData.img || null
      };
      // Put at the beginning
      GAME.state.messages.unshift(newMsg);
      GAME.ui.updateHUD();
  },

  openSahamApp() {
    GAME.state.previousView = GAME.state.currentView;
    if (!GAME.state.portfolio) {
      GAME.state.portfolio = {};
      GAME.constants.stocks.forEach(
        (s) => (GAME.state.portfolio[s.id] = { quantity: 0, totalCost: 0 }),
      );
    }
    if (!GAME.state.stockPrices) {
      GAME.state.stockPrices = {};
      GAME.constants.stocks.forEach(
        (s) =>
          (GAME.state.stockPrices[s.id] = {
            current: s.base,
            prev: s.base,
            history: [s.base],
          }),
      );
    }
    Object.values(GAME.state.stockPrices).forEach((sp) => {
      if (!sp.history || sp.history.length < 20) {
        const history = [sp.current];
        let lastVal = sp.current;
        for (let i = 0; i < 19; i++) {
          const change = lastVal * (Math.random() * 0.1 - 0.05);
          lastVal = Math.max(1, lastVal - change);
          history.unshift(lastVal);
        }
        sp.history = history;
        sp.prev = history[history.length - 2];
      }
    });
    GAME.ui.toggleModal("modal-phone");
    GAME.ui.changeView("view-saham");
  },

  closeSahamApp() {
    if (GAME.state.previousView) {
      GAME.ui.changeView(GAME.state.previousView, false);
      GAME.ui.toggleModal("modal-phone");
      GAME.state.previousView = null;
    } else {
      GAME.ui.changeView("view-apartment", false);
    }
  },

  openSahamDetail(id) {
    GAME.state.activeStockId = id;
    document.getElementById("saham-amount").value = 1;
    GAME.ui.changeView("view-saham-detail", false);
    GAME.ui.renderSahamDetail();
  },

  setSahamAmount(amount) {
    const id = GAME.state.activeStockId;
    if (!id) return;
    const stockData = GAME.state.stockPrices[id];
    const price = Math.floor(stockData.current);
    const maxShares = Math.floor(GAME.state.money / price);
    const inputEl = document.getElementById("saham-amount");
    
    let currentVal = parseInt(inputEl.value);
    if (isNaN(currentVal)) currentVal = 0;
    
    let newVal = currentVal + amount;
    if (newVal > maxShares) {
      newVal = maxShares;
    }
    inputEl.value = newVal;
  },

  clampSahamAmount() {
    const id = GAME.state.activeStockId;
    if (!id) return;
    const stockData = GAME.state.stockPrices[id];
    const price = Math.floor(stockData.current);
    const maxShares = Math.floor(GAME.state.money / price);
    const inputEl = document.getElementById("saham-amount");
    
    let val = parseInt(inputEl.value);
    if (!isNaN(val) && val > maxShares) {
      inputEl.value = maxShares;
    }
  },

  buyStock() {
    const id = GAME.state.activeStockId;
    const stockData = GAME.state.stockPrices[id];
    const price = Math.floor(stockData.current);
    let amountStr = document.getElementById("saham-amount").value;
    let amount = 0;
    if (amountStr === "MAX") {
      amount = Math.floor(GAME.state.money / price);
    } else {
      amount = parseInt(amountStr);
    }
    if (isNaN(amount) || amount <= 0) {
      GAME.ui.showToast("Masukkan jumlah yang valid");
      return;
    }
    const cost = price * amount;
    if (GAME.state.money >= cost) {
      GAME.state.money -= cost;
      if (!GAME.state.portfolio[id]) {
        GAME.state.portfolio[id] = { quantity: 0, totalCost: 0 };
      }
      GAME.state.portfolio[id].quantity += amount;
      GAME.state.portfolio[id].totalCost += cost;
      GAME.ui.updateHUD();
      GAME.ui.renderSahamDetail();
      GAME.ui.showToast(`Berhasil membeli ${amount} lembar saham ${id}`);
      document.getElementById("saham-amount").value = "1";
    } else {
      GAME.ui.showToast(`Uang tidak cukup! Butuh $${cost}`);
    }
  },

  sellStock() {
    const id = GAME.state.activeStockId;
    const stockData = GAME.state.stockPrices[id];
    const price = Math.floor(stockData.current);
    const portfolioData = GAME.state.portfolio[id] || {
      quantity: 0,
      totalCost: 0,
    };
    const owned = portfolioData.quantity;
    let amountStr = document.getElementById("saham-amount").value;
    let amount = 0;
    if (amountStr === "MAX") {
      amount = owned;
    } else {
      amount = parseInt(amountStr);
    }
    if (isNaN(amount) || amount <= 0) {
      GAME.ui.showToast("Masukkan jumlah yang valid");
      return;
    }
    if (owned >= amount) {
      const avgCost = portfolioData.totalCost / owned;
      const costOfSoldShares = avgCost * amount;
      portfolioData.quantity -= amount;
      portfolioData.totalCost -= costOfSoldShares;
      if (portfolioData.quantity <= 0) {
        portfolioData.totalCost = 0;
      }
      const profit = price * amount;
      GAME.state.money += profit;
      GAME.ui.updateHUD();
      GAME.ui.renderSahamDetail();
      GAME.ui.showToast(`Menjual ${amount} lembar saham (+$${profit})`);
      document.getElementById("saham-amount").value = "1";
    } else {
      GAME.ui.showToast(`Kamu hanya memiliki ${owned} lembar saham`);
    }
  },

  // ==========================================
  // LOGIC APLIKASI HP & INVENTORY
  // ==========================================


  closeInventory() {
    if (GAME.state.previousView) {
      GAME.ui.changeView(GAME.state.previousView, false);
      GAME.ui.toggleModal("modal-phone");
      GAME.state.previousView = null;
    } else {
      if (GAME.state.currentLocation === "apartment") {
        GAME.ui.changeView("view-apartment", false);
      } else if (GAME.state.currentLocation === "city") {
        GAME.ui.changeView("view-city", false);
      }
    }
  },

  useItem(id) {
    if (GAME.state.storyPhase === 2) {
      GAME.logic.triggerStory2Part2();
      return;
    }
    if (GAME.state.inventory[id] > 0) {
      GAME.state.inventory[id]--;
      const item = GAME.constants.shopItems.find((i) => i.id === id);
      GAME.state.stats.hunger += item.h;
      GAME.state.stats.energy += item.e;
      GAME.ui.updateHUD();
      GAME.ui.renderInventory();
      GAME.ui.showToast(`Mengkonsumsi ${item.name}`);
    }
  },

  buyItem(id) {
    const item = GAME.constants.shopItems.find((i) => i.id === id);
    if (GAME.state.money >= item.price) {
      GAME.state.money -= item.price;
      GAME.state.inventory[id]++;
      GAME.ui.updateHUD();
      GAME.ui.showToast(`Berhasil membeli ${item.name}`);
    } else {
      GAME.ui.showToast("Ã¢ÂÅ’ Uang tidak cukup!");
    }
  },

  // ==========================================
  // LOGIC SAVE & LOAD
  // ==========================================
  openSaveLoadMenu() {
    const phoneModal = document.getElementById("modal-phone");
    if (!phoneModal.classList.contains("hidden")) {
      GAME.ui.toggleModal("modal-phone");
    }
    GAME.ui.toggleModal("modal-saveload");
    GAME.ui.renderSaveLoadList();
  },

  closeSaveLoadMenu() {
    GAME.ui.toggleModal("modal-saveload");
  },

  handleSaveClick(slotIndex) {
    const existingSave = localStorage.getItem(`afterstroll_save_${slotIndex}`);
    if (existingSave) {
      const confirmBtn = document.getElementById("confirm-overwrite-btn");
      confirmBtn.setAttribute("data-slot", slotIndex);
      GAME.ui.toggleModal("modal-confirm-overwrite");
    } else {
      this.saveGame(slotIndex);
    }
  },

  confirmOverwrite() {
    const confirmBtn = document.getElementById("confirm-overwrite-btn");
    const slotIndex = confirmBtn.getAttribute("data-slot");
    this.saveGame(parseInt(slotIndex, 10));
    GAME.ui.toggleModal("modal-confirm-overwrite");
  },

  saveGame(slotIndex) {
    const isAutosave = slotIndex === "autosave";
    const stateToSave = { ...GAME.state, saveTimestamp: Date.now() };
    localStorage.setItem(
      `afterstroll_save_${slotIndex}`,
      JSON.stringify(stateToSave),
    );
    if (stateToSave.composureWarned) delete stateToSave.composureWarned;
    if (!isAutosave) {
      GAME.ui.showToast(`Progres disimpan di Slot ${slotIndex + 1}`);
      GAME.ui.renderSaveLoadList();
    }
  },

  getLatestSaveSlot() {
    let latestSlot = null;
    let maxTimestamp = 0;
    const slots = ["autosave", 0, 1, 2];
    
    slots.forEach(slot => {
      const dataStr = localStorage.getItem(`afterstroll_save_${slot}`);
      if (dataStr) {
        try {
          const data = JSON.parse(dataStr);
          // Fallback timestamp for legacy saves: 1 so it beats no-save, but loses to new saves
          const ts = data.saveTimestamp || 1;
          if (ts >= maxTimestamp) {
            maxTimestamp = ts;
            latestSlot = slot;
          }
        } catch(e) {}
      }
    });
    return latestSlot;
  },

  loadLatestGame() {
    const slot = this.getLatestSaveSlot();
    if (slot !== null) {
      this.loadGame(slot);
    }
  },

  loadGame(slotIndex) {
    const fader = document.getElementById("screen-fader");
    const savedStateJSON = localStorage.getItem(
      `afterstroll_save_${slotIndex}`,
    );
    if (!savedStateJSON) return false;

    fader.style.transition = "opacity 0.4s ease-in";
    fader.style.opacity = "1";

    setTimeout(() => {
      [
        "modal-phone",
        "modal-option",
        "modal-saveload",
        "modal-confirm-overwrite",
      ].forEach((id) => {
        const modal = document.getElementById(id);
        if (modal) {
          modal.classList.add("hidden");
          modal.classList.remove("flex", "animate-fade-in");
        }
      });

      const doorExit = document.getElementById("door-exit-area");
      if (doorExit) {
        doorExit.style.display = "";
      }

      GAME.state = JSON.parse(savedStateJSON);

      if (GAME.logic.storyState.waitTimeout) clearTimeout(GAME.logic.storyState.waitTimeout);
      if (GAME.logic.storyState.typingTimeout) clearInterval(GAME.logic.storyState.typingTimeout);
      GAME.logic.storyState.sequence = null;
      GAME.logic.storyState.step = 0;

      if (GAME.state.storyPhase === undefined) {
        GAME.state.storyPhase = 4;
      }

      if (
        GAME.state.portfolio &&
        typeof GAME.state.portfolio.FLE === "number"
      ) {
        const oldPortfolio = { ...GAME.state.portfolio };
        GAME.state.portfolio = {};
        GAME.constants.stocks.forEach((stock) => {
          const quantity = oldPortfolio[stock.id] || 0;
          GAME.state.portfolio[stock.id] = {
            quantity: quantity,
            totalCost: quantity > 0 ? quantity * stock.base : 0,
          };
        });
      }

      if (!GAME.state.stockPrices) {
        GAME.state.stockPrices = {};
        GAME.constants.stocks.forEach(
          (s) =>
            (GAME.state.stockPrices[s.id] = {
              current: s.base,
              prev: s.base,
              history: [s.base],
            }),
        );
      } else {
        GAME.constants.stocks.forEach((stock) => {
          const stockData = GAME.state.stockPrices[stock.id];
          if (
            stockData &&
            (!stockData.history || stockData.history.length < 2)
          ) {
            stockData.history = [stockData.prev, stockData.current];
          }
        });
      }

      if (slotIndex !== "autosave") {
        GAME.ui.showToast(`Progres dari Slot ${slotIndex + 1} dimuat`);
      }
      GAME.ui.updateHUD();

      if (GAME.state.winState && GAME.state.winState.active) {
        document.getElementById("win-bar-blue").style.opacity = "1";
        document.getElementById("win-bar-orange").style.opacity = "1";
        GAME.ui.updateWinBars();
      } else {
        document.getElementById("win-bar-blue").style.opacity = "0";
        document.getElementById("win-bar-orange").style.opacity = "0";
      }

      if (GAME.state.storyPhase < 4) {
        if (GAME.state.storyPhase === 2) {
          GAME.ui.changeView("view-apartment");
          GAME.logic.startStory2Interactive();
          GAME.ui.updateSceneAudio("scene-maingame");
        } else {
          GAME.ui.changeScene("scene-story", "none");
          GAME.ui.updateSceneAudio("scene-story");
          if (GAME.state.currentStorySeq) {
            if (GAME.state.currentStorySeq === "getStorySequence1") {
              GAME.logic.initStoryIntro();
            } else if (
              GAME.state.currentStorySeq === "getStorySequence2Part1"
            ) {
              GAME.state.storyPhase = 1.5;
              GAME.logic.startStory(GAME.logic.getStorySequence2Part1(), () => {
                GAME.logic.startStory2Interactive();
                GAME.ui.updateSceneAudio("scene-maingame");
              });
            } else if (
              GAME.state.currentStorySeq === "getStorySequence2Part2"
            ) {
              GAME.logic.triggerStory2Part2();
            } else if (
              GAME.state.currentStorySeq === "chloeMinigamePhase" ||
              GAME.state.currentStorySeq === "seq_3_chloe_intimacy" ||
              GAME.state.currentStorySeq === "seanMinigamePhase" ||
              GAME.state.currentStorySeq === "seq_3_sean_intimacy"
            ) {
              if (GAME.state.currentStorySeq.includes("chloe")) {
                GAME.logic.gotoSeq("seq_3_chloe_intimacy");
              } else {
                GAME.logic.gotoSeq("seq_3_sean_intimacy");
              }
            } else if (GAME.logic[GAME.state.currentStorySeq]) {
              GAME.logic.gotoSeq(GAME.state.currentStorySeq);
            } else {
              GAME.logic.initStoryIntro();
            }
          } else {
            if (GAME.state.storyPhase === 1 || GAME.state.storyPhase === 1.5)
              GAME.logic.initStoryIntro();
            else if (GAME.state.storyPhase === 3)
              GAME.logic.triggerStory2Part2();
          }
        }
      } else {
        GAME.ui.changeScene("scene-maingame", "none");
        GAME.ui.updateSceneAudio("scene-maingame");
        GAME.ui.changeView(GAME.state.currentView || "view-apartment", false);
        
        const uiElements = [
          document.getElementById("global-top-ui"),
          document.getElementById("dynamic-content"),
          document.getElementById("global-bottom-ui"),
        ];
        uiElements.forEach((el) => {
          if (el) {
            el.style.opacity = "1";
            if (el.id === "global-bottom-ui") {
          Array.from(el.querySelectorAll("button")).forEach(b => b.style.pointerEvents = "auto");
        }
        el.style.pointerEvents = (el.id === "dynamic-content" || el.id === "global-bottom-ui" || el.id === "global-top-ui") ? "none" : "";
          }
        });
      }

      if (GAME.state.storyPhase === 2) {
        const videoBg = document.getElementById("maingame-bg-video");
        if (videoBg) {
          videoBg.classList.remove("hidden");
          videoBg.play().catch((e) => {});
        }
      }

      setTimeout(() => {
        fader.style.transition = "opacity 0.6s ease-out";
        fader.style.opacity = "0";
      }, 100);
    }, 400);
  },
};
