export const chloeWinStory = {
  startWinScene() {
    GAME.ui.initWinBars();
    return [
      {
        type: "image",
        src: "assets/images/000Z_ChloeWIN01.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      { type: "dialogue", retainMedia: true, name: "Chloe", text: "..." },
      {
        type: "image",
        src: "assets/images/000Z_ChloeWIN02.jpg",
        effect: "cross-dissolve",
        wait: 800,
        skippable: false,
      },
      {
        type: "image",
        src: "assets/images/000Z_ChloeWIN03.jpg",
        effect: "cross-dissolve",
        wait: 800,
        skippable: false,
      },
      {
        type: "image",
        src: "assets/images/000Z_ChloeWIN02.jpg",
        effect: "cross-dissolve",
        wait: 800,
        skippable: false,
      },
      {
        type: "image",
        src: "assets/images/000Z_ChloeWIN03.jpg",
        effect: "cross-dissolve",
        wait: 800,
        skippable: false,
      },
      { type: "action", action: () => GAME.logic.gotoSeq("winPhase1Menu") },
    ];
  },

  winPhase1Menu() {
    let choices = [
      {
        text: "FG",
        action: () =>
          GAME.logic.playWinAnim("fg", 3, () =>
            GAME.logic.gotoSeq("winPhase1Menu"),
          ),
      },
      {
        text: "SP",
        action: () =>
          GAME.logic.playWinAnim("sp", 2, () =>
            GAME.logic.gotoSeq("winPhase1Menu"),
          ),
      },
      {
        text: "EP",
        action: () =>
          GAME.logic.playWinAnim("ep", 4, () =>
            GAME.logic.gotoSeq("winPhase1Menu"),
          ),
      },
    ];
    if (GAME.state.winState.clicks >= 4) {
      choices.push({
        text: "TP",
        action: () => GAME.logic.gotoSeq("winPhase2Menu"),
      });
    }
    return [
      {
        type: "image",
        src: "assets/images/000Z_ChloeWIN02.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      { type: "choice", choices: choices },
    ];
  },

  playWinAnim(type, wgAdd, callbackMenu) {
    GAME.state.winState.clicks++;
    let seq = [];
    const repeats = type === "ep" ? 5 : 4;
    seq.push({
      type: "image",
      src: `assets/images/000Z_ChloeWIN04${type}00.jpg`,
      effect: "cross-dissolve",
      wait: 400,
      skippable: false,
    });

    for (let i = 0; i < repeats; i++) {
      seq.push({
        type: "image",
        src: `assets/images/000Z_ChloeWIN04${type}01.jpg`,
        effect: "cross-dissolve",
        wait: 300,
        skippable: false,
      });
      seq.push({
        type: "image",
        src: `assets/images/000Z_ChloeWIN04${type}02.jpg`,
        effect: "cross-dissolve",
        wait: 300,
        skippable: false,
        action: () => GAME.audio.playVoice("assets/voice/0Z_VOG01fg.mp3"),
      });
    }

    seq.push({
      type: "action",
      action: () => {
        GAME.logic.updateWinState(0, wgAdd, callbackMenu);
      },
    });

    GAME.logic.startStory(seq);
  },

  winPhase2Menu() {
    return [
      {
        type: "image",
        src: "assets/images/000Z_ChloeWIN04.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "choice",
        choices: [
          { text: "GS", action: () => GAME.logic.playWinAnimGS() },
          { text: "TSF", action: () => GAME.logic.gotoSeq("winPhase3Menu") },
        ],
      },
    ];
  },

  playWinAnimGS() {
    let seq = [];
    seq.push({
      type: "image",
      src: `assets/images/000Z_ChloeWIN04gs00.jpg`,
      effect: "cross-dissolve",
      wait: 400,
      skippable: false,
    });
    for (let i = 0; i < 4; i++) {
      seq.push({
        type: "image",
        src: `assets/images/000Z_ChloeWIN04gs01.jpg`,
        effect: "cross-dissolve",
        wait: 300,
        skippable: false,
        action: () => {
          const wg = GAME.state.winState.wg;
          let voice = "VOGF01_low.mp3";
          if (wg > 60 && wg < 85) voice = "VOGF01_med.mp3";
          if (wg >= 95) voice = "VOGF01_hig.mp3";
          GAME.audio.playVoice(`assets/voice/${voice}`);
        },
      });
      seq.push({
        type: "image",
        src: `assets/images/000Z_ChloeWIN04gs02.jpg`,
        effect: "cross-dissolve",
        wait: 200,
        skippable: false,
      });
      seq.push({
        type: "image",
        src: `assets/images/000Z_ChloeWIN04gs03.jpg`,
        effect: "cross-dissolve",
        wait: 200,
        skippable: false,
      });
    }
    seq.push({
      type: "action",
      action: () =>
        GAME.logic.updateWinState(2, 4, () =>
          GAME.logic.gotoSeq("winPhase2Menu"),
        ),
    });
    GAME.logic.startStory(seq);
  },

  winPhase3Menu() {
    return [
      {
        type: "image",
        src: "assets/images/000Z_ChloeWIN05.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "choice",
        choices: [
          { text: "MS", action: () => GAME.logic.playWinAnimTSF("ms", 4, 4) },
          { text: "CG", action: () => GAME.logic.playWinAnimTSF("cg", 4, 4) },
          { text: "DS", action: () => GAME.logic.playWinAnimTSF("ds", 4, 5) },
        ],
      },
    ];
  },

  playWinAnimTSF(type, wbAdd, wgAdd) {
    let seq = [];
    seq.push({
      type: "image",
      src: `assets/images/000Z_ChloeWIN05${type}00.jpg`,
      effect: "cross-dissolve",
      wait: 400,
      skippable: false,
    });

    const repeats = type === "ds" ? 10 : 8;
    for (let i = 0; i < repeats; i++) {
      seq.push({
        type: "image",
        src: `assets/images/000Z_ChloeWIN05${type}01.jpg`,
        effect: "cross-dissolve",
        wait: 200,
        skippable: false,
        action: () => GAME.audio.playVoice("assets/voice/VOGF01.mp3"),
      });
      seq.push({
        type: "image",
        src: `assets/images/000Z_ChloeWIN05${type}02.jpg`,
        effect: "cross-dissolve",
        wait: 200,
        skippable: false,
      });
    }

    seq.push({
      type: "action",
      action: () =>
        GAME.logic.updateWinState(wbAdd, wgAdd, () =>
          GAME.logic.gotoSeq("winPhase3Menu"),
        ),
    });
    GAME.logic.startStory(seq);
  },

  updateWinState(wbAdd, wgAdd, continueCallback) {
    GAME.state.winState.wb = Math.min(100, GAME.state.winState.wb + wbAdd);
    GAME.state.winState.wg = Math.min(100, GAME.state.winState.wg + wgAdd);
    GAME.ui.updateWinBars();

    if (GAME.state.winState.wg >= 100) {
      GAME.logic.startStory([
        {
          type: "image",
          src: "assets/images/000Z_ChloeWIN06ejk01.jpg",
          effect: "cross-dissolve",
          wait: 600,
          skippable: false,
        },
        {
          type: "image",
          src: "assets/images/00Z_ChloeWIN06ejk02.jpg",
          effect: "cross-dissolve",
          wait: 600,
          skippable: false,
        },
        {
          type: "image",
          src: "assets/images/00Z_ChloeWIN06ejk03.jpg",
          effect: "cross-dissolve",
          wait: 600,
          skippable: false,
        },
        {
          type: "image",
          src: "assets/images/00Z_ChloeWIN06ejk04.jpg",
          effect: "cross-dissolve",
          wait: 1000,
          skippable: false,
        },
        {
          type: "action",
          action: () => {
            GAME.state.winState.wg = 0;
            GAME.ui.updateWinBars();
            continueCallback();
          },
        },
      ]);
    } else if (GAME.state.winState.wb >= 100) {
      GAME.ui.hideWinBars();
      GAME.logic.startStory([
        {
          type: "image",
          src: "assets/images/00Z_ChloeWIN07endF01.jpg",
          effect: "cross-dissolve",
          wait: 800,
          skippable: false,
        },
        {
          type: "image",
          src: "assets/images/00Z_ChloeWIN07endF02.jpg",
          effect: "cross-dissolve",
          wait: 800,
          skippable: false,
        },
        {
          type: "image",
          src: "assets/images/00Z_ChloeWIN07endF03.jpg",
          effect: "cross-dissolve",
          wait: 800,
          skippable: false,
        },
        {
          type: "image",
          src: "assets/images/00Z_ChloeWIN07endF04.jpg",
          effect: "cross-dissolve",
          wait: 1000,
          skippable: false,
        },
        {
          type: "image",
          src: "assets/images/00Z_ChloeWIN08end01.jpg",
          effect: "cross-dissolve",
          wait: 1000,
          skippable: false,
        },
        { type: "dialogue", retainMedia: true, name: "Chloe", text: "..." },
        {
          type: "image",
          src: "assets/images/00Z_ChloeWIN08end02.jpg",
          effect: "cross-dissolve",
          wait: 1500,
          skippable: false,
        },
        { bg: "black", effect: "cross-dissolve", wait: 1500, skippable: false },
        {
          type: "action",
          action: () => GAME.logic.gotoSeq("seq_3_chloe_wakeup"),
        },
      ]);
    } else {
      continueCallback();
    }
  },
};
