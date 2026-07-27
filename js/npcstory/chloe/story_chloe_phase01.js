export const chloePhase01Story = {
  seq_3_chloe_start() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro01chloe.jpg",
        effect: "cross-dissolve",
        wait: 1000,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "kayanya temen sean buat masalah lagi di bar",
      },
      {
        type: "image",
        src: "assets/images/0003_intro02chloe.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "{name}, sekarang apa yang kamu rasa?",
      },
      {
        type: "choice",
        choices: [
          {
            text: "kepalaku agak sedikit pusing",
            stats: { heart_chloe: 1 },
            next: "seq_3_chloe_branch1_pusing",
          },
          {
            text: "sedikit lemas, tapi aku akan baik-baik saja setelah istirahat ini",
            stats: { heart_chloe: 5, cha: 2, wis: 3 },
            next: "seq_3_chloe_branch1_pusing",
          },
          {
            text: "aku rasa aku jatuh cinta padamu chloe",
            stats: { heart_chloe: 5, cha: 5, wis: -5 },
            next: "seq_3_chloe_branch1_cinta",
          },
        ],
      },
    ];
  },

  seq_3_chloe_branch1_pusing() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro03chloe.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "iya kamu memang butuh istirahat",
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "nanti jangan memaksakan diri lagi ya!",
      },
      {
        type: "action",
        action: () => GAME.logic.gotoSeq("seq_3_chloe_intro03"),
      },
    ];
  },

  seq_3_chloe_branch1_cinta() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro03chloe.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "sepertinya kepala kamu terbentur keras saat pingsan",
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "istirahatlah {name}",
      },
      {
        type: "action",
        action: () => GAME.logic.gotoSeq("seq_3_chloe_intro03"),
      },
    ];
  },

  seq_3_chloe_intro03() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro03chloe.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "choice",
        choices: [
          {
            text: "chloe apa kamu dan sean berpacaran?",
            stats: { heart_chloe: -1, cha: -1, wis: -1 },
            next: "seq_3_chloe_intro04",
          },
          {
            text: "chloe berikan aku pelukan sebentar",
            stats: { heart_chloe: 5, cha: 5, wis: -1 },
            next: "seq_3_chloe_hug",
          },
          {
            text: "chloe bibirmu indah sekali",
            stats: { heart_chloe: -1, cha: 5, wis: -5 },
            next: "seq_3_chloe_intro04",
          },
        ],
      },
    ];
  },

  seq_3_chloe_hug() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro04chloehug01.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "ada apa {name}?",
      },
      {
        type: "image",
        src: "assets/images/0003_intro04chloehug02.jpg",
        effect: "cross-dissolve",
        wait: 2500,
        skippable: true,
      },
      {
        type: "image",
        src: "assets/images/0003_intro04chloehug03.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      { type: "dialogue", retainMedia: true, name: "Chloe", text: "..." },
      {
        type: "choice",
        choices: [
          {
            text: "sedikit lebih lama chloe",
            stats: { heart_chloe: 5, cha: 5, wis: 1 },
            next: "seq_3_chloe_hug_lama",
          },
          {
            text: "cium bibir chloe",
            stats: { heart_chloe: 2, cha: 1, wis: -1 },
            next: "seq_3_chloe_intro05",
          },
        ],
      },
    ];
  },

  seq_3_chloe_hug_lama() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro04chloehug04.jpg",
        effect: "blur-pulse-1",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "ada apa? kamu tiba-tiba jadi aneh begini",
      },
      {
        type: "image",
        src: "assets/images/0003_intro04chloehug05.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      { type: "dialogue", retainMedia: true, name: "Chloe", text: "..." },
      {
        type: "choice",
        choices: [
          {
            text: "sepertinya kepalaku jadi aneh saat pingsan tadi",
            stats: { heart_chloe: 1, cha: 1, wis: 5 },
            next: "seq_3_chloe_hug_aneh",
          },
          {
            text: "pegang pantat chloe",
            stats: { heart_chloe: -3, cha: 1, wis: -5 },
            next: "seq_3_chloe_hug_slap",
          },
        ],
      },
    ];
  },

  seq_3_chloe_hug_aneh() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro04chloehug06.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      { type: "dialogue", retainMedia: true, name: "Chloe", text: "..." },
      {
        type: "image",
        src: "assets/images/0003_intro04chloehug07.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      { type: "dialogue", retainMedia: true, name: "Chloe", text: "..." },
      {
        type: "image",
        src: "assets/images/0003_intro04chloehug08.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "cukup {name}, ini jadi agak aneh",
      },
      {
        type: "action",
        action: () => GAME.logic.gotoSeq("seq_3_chloe_intro05"),
      },
    ];
  },

  seq_3_chloe_hug_slap() {
    return [
      { bg: "black", effect: "cross-dissolve", wait: 200, skippable: false },
      {
        type: "dialogue",
        retainMedia: true,
        name: "",
        text: "Plakkk!!! Chloe menamparmu",
      },
      {
        type: "image",
        src: "assets/images/0003_intro04chloehug09.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "udah aku duga",
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "emang bajingan",
      },
      { type: "action", action: () => GAME.logic.gotoSeq("seq_3_chloe_end") },
    ];
  },

  seq_3_chloe_intro04() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro04chloe.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "{name}, ada apa?",
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "kamu benar-benar ngebuat aku takut",
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "kamu serius ga apa-apa kan?",
      },
      {
        type: "action",
        action: () => GAME.logic.gotoSeq("seq_3_chloe_intro05"),
      },
    ];
  },

  seq_3_chloe_intro05() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro05chloe.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "ok {name} sebelum menjadi makin aneh kamu harus benar-benar beristirahat",
      },
      {
        type: "image",
        src: "assets/images/0003_intro06chloe.jpg",
        effect: "cross-dissolve",
        wait: 1000,
        skippable: true,
      },
      {
        type: "image",
        src: "assets/images/0003_intro06chloe.jpg",
        effect: "cross-dissolve",
        wait: 200,
        skippable: true,
      },
      {
        type: "choice",
        choices: [
          {
            text: "sepertinya aku memang butuh istirahat",
            stats: { heart_chloe: 1, wis: 1 },
            next: "seq_3_chloe_end",
          },
          {
            text: "chloe mau kah kamu menemaniku dulu?",
            stats: { heart_chloe: 2, cha: 5, wis: 2 },
            next: "seq_3_chloe_intro06",
          },
        ],
      },
    ];
  },

  seq_3_chloe_intro06() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro06chloe.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "ok, menemani untuk apa?",
      },
      {
        type: "choice",
        choices: [
          {
            text: "ga jadi chloe, sepertinya memang kepalaku sedikit aneh",
            stats: { heart_chloe: -1 },
            next: "seq_3_chloe_end",
          },
          {
            text: "mungkin terdengar aneh, tapi sepertinya aku sedikit hilang ingatan chloe",
            stats: { heart_chloe: 2, cha: 5, wis: 5 },
            next: "seq_3_chloe_amnesia",
          },
        ],
      },
    ];
  },

  seq_3_chloe_amnesia() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro07chloe.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "Haa? jangan bercanda {name}!",
      },
      {
        type: "image",
        src: "assets/images/0003_intro08chloe.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "tapi kayanya makes sense kalo aku liat wajah kamu",
      },
      {
        type: "image",
        src: "assets/images/0003_intro09chloe.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "oke kalau gitu, coba jawab pertanyaan aku",
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "aku yakin walaupun kamu pura-pura, aku pasti tau kamu bohong!",
      },
      {
        type: "image",
        src: "assets/images/0003_intro10chloe.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "apa warna celana dalem aku sekarang?",
      },
      {
        type: "choice",
        choices: [
          {
            text: "putih?",
            stats: { heart_chloe: 5, cha: 2, wis: 5 },
            next: "seq_3_chloe_amnesia_merge1",
          },
          {
            text: "kamu ga pake celana dalem?",
            stats: { heart_chloe: -5, cha: 4, wis: -5 },
            next: "seq_3_chloe_amnesia_merge1",
          },
        ],
      },
    ];
  },

  seq_3_chloe_amnesia_merge1() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro11chloe.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      { type: "dialogue", retainMedia: true, name: "Chloe", text: "....." },
      {
        type: "image",
        src: "assets/images/0003_intro12chloe.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "{name}!! kamu beneran hilang ingatan?",
      },
      {
        type: "image",
        src: "assets/images/0003_intro12_1chloe.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "{name}? ayo kita kerumah sakit!",
      },
      {
        type: "choice",
        choices: [
          {
            text: "apa aku sekarang separah itu?",
            stats: { heart_chloe: -1, cha: -1, wis: -1 },
            next: "seq_3_chloe_amnesia_merge2",
          },
          {
            text: "aku tebak dokter juga ga bakal tau kondisi aku ini apa",
            stats: { heart_chloe: 1, cha: 3, wis: 3 },
            next: "seq_3_chloe_amnesia_merge2",
          },
        ],
      },
    ];
  },

  seq_3_chloe_amnesia_merge2() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro12_2chloe.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      { type: "dialogue", retainMedia: true, name: "Chloe", text: "....." },
      {
        type: "image",
        src: "assets/images/0003_intro12_3chloe.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "choice",
        choices: [
          {
            text: "chloe apakah kita berdua pacaran?",
            stats: { heart_chloe: 5, cha: 2, wis: 1 },
            next: "seq_3_chloe_amnesia_end",
          },
          {
            text: "apa sean itu pacar kamu chloe?",
            stats: { heart_chloe: 1, cha: -1, wis: 1 },
            next: "seq_3_chloe_amnesia_end",
          },
        ],
      },
    ];
  },

  seq_3_chloe_amnesia_end() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro13chloe.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "pfffft... apa kamu ngarepnya gitu?",
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "kamu beneran ga inget {name}?",
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "dan kayanya kamu ga perlu ke dokter.",
      },
      {
        type: "image",
        src: "assets/images/0003_intro14_1chloe.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "ahhh.. sepertinya aku juga butuh istirahat.",
      },
      {
        type: "image",
        src: "assets/images/0003_intro14_2chloe.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "gimana kalau aku nginep di sini dulu {name}?",
      },
      {
        type: "image",
        src: "assets/images/0003_intro15_1chloe.jpg",
        effect: "cross-dissolve",
        wait: 2000,
        skippable: true,
      },
      {
        type: "image",
        src: "assets/images/0003_intro15_2chloe.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "seengganya sampe kamu ga bingung lagi",
      },
      {
        type: "image",
        src: "assets/images/0003_intro15_3chloe.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "biar aku nyalain tv",
      },
      {
        type: "image",
        src: "assets/images/0003_intro16chloe.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      { type: "dialogue", retainMedia: true, name: "Chloe", text: "...." },
      {
        type: "image",
        src: "assets/images/0003_intro17chloe.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "{name}, apa kamu berharap aku jadi pacar kamu?",
      },
      {
        type: "image",
        src: "assets/images/0003_intro18chloe.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      { type: "dialogue", retainMedia: true, name: "Chloe", text: "..." },
      {
        type: "image",
        src: "assets/images/0003_intro19chloe.jpg",
        effect: "cross-dissolve",
        wait: 1500,
        skippable: false,
      },
      {
        type: "image",
        src: "assets/images/0003_intro20chloe.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "choice",
        choices: [
          {
            text: "tidur menghadap chloe",
            stats: { heart_chloe: 5 },
            next: "seq_3_chloe_sleep_face",
          },
          {
            text: "tidur membelakangi chloe",
            stats: { heart_chloe: 1 },
            next: "seq_3_chloe_sleep_back",
          },
        ],
      },
    ];
  },

  seq_3_chloe_sleep_back() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro20chloesleep01.jpg",
        effect: "cross-dissolve",
        wait: 1000,
        skippable: false,
      },
      {
        type: "image",
        src: "assets/images/0003_intro20chloesleep02.jpg",
        effect: "cross-dissolve",
        wait: 1500,
        skippable: false,
      },
      { bg: "black", effect: "cross-dissolve", wait: 1000, skippable: false },
      {
        type: "action",
        action: () => GAME.logic.gotoSeq("seq_3_chloe_wakeup"),
      },
    ];
  },

  seq_3_chloe_sleep_face() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro21chloe.jpg",
        effect: "blur-pulse-1",
        wait: 4000,
        skippable: false,
      },
      { type: "dialogue", retainMedia: true, name: "Chloe", text: "..." },
      {
        type: "choice",
        choices: [
          {
            text: "cium bibir chloe",
            stats: { heart_chloe: 5 },
            next: "seq_3_chloe_intimacy",
          },
          {
            text: "belai pinggang chloe",
            stats: { heart_chloe: -3 },
            next: "seq_3_chloe_denied",
          },
        ],
      },
    ];
  },

  seq_3_chloe_denied() {
    if (GAME.state.stats.cha < 90 && GAME.state.stats.heart_chloe < 90) {
      return [
        {
          type: "image",
          src: "assets/images/0003_intro21chloeDenied01.jpg",
          effect: "cross-dissolve",
          wait: 1000,
          skippable: false,
        },
        {
          type: "action",
          action: () => GAME.logic.gotoSeq("seq_3_chloe_wakeup"),
        },
      ];
    } else {
      return [
        {
          type: "action",
          action: () => GAME.logic.gotoSeq("seq_3_chloe_intimacy"),
        },
      ];
    }
  },

  seq_3_chloe_intimacy() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro22chloe.jpg",
        effect: "cross-dissolve",
        wait: 1000,
        skippable: false,
      },
      {
        type: "image",
        src: "assets/images/0003_intro23chloe.jpg",
        effect: "cross-dissolve",
        wait: 1000,
        skippable: false,
      },
      { type: "dialogue", retainMedia: true, name: "Chloe", text: "..." },
      {
        type: "image",
        src: "assets/images/0003_intro24chloe.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "image",
        src: "assets/images/0003_intro25chloe.jpg",
        effect: "cross-dissolve",
        wait: 1000,
        skippable: false,
      },
      { type: "action", action: () => GAME.logic.chloeMinigamePhase() },
    ];
  },

  chloeMinigamePhase(
    iteration = 1,
    lastImage = "assets/images/0003_intro25chloe.jpg",
  ) {
    GAME.state.currentStorySeq = "seq_3_chloe_intimacy";
    GAME.logic.startStory([
      {
        type: "image",
        src: lastImage,
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "choice",
        choices: [
          {
            text: "AGAG",
            stats: {},
            action: () => GAME.logic.playMiniSeq("A", iteration),
          },
          {
            text: "BGBG",
            stats: {},
            action: () => GAME.logic.playMiniSeq("B", iteration),
          },
          {
            text: "CGCG",
            stats: {},
            action: () => GAME.logic.playMiniSeq("C", iteration),
          },
        ],
      },
    ]);
  },

  playMiniSeq(type, iteration) {
    GAME.state.currentStorySeq = "seq_3_chloe_intimacy";
    const seq = [
      {
        type: "image",
        src: `assets/images/0003_intro26chloe${type}01.jpg`,
        effect: "cross-dissolve",
        wait: 800,
        skippable: false,
      },
      {
        type: "image",
        src: `assets/images/0003_intro26chloe${type}02.jpg`,
        effect: "cross-dissolve",
        wait: 800,
        skippable: false,
      },
      {
        type: "image",
        src: `assets/images/0003_intro26chloe${type}03.jpg`,
        effect: "cross-dissolve",
        wait: 800,
        skippable: false,
      },
      { type: "dialogue", retainMedia: true, name: "Chloe", text: "..." },
      {
        type: "image",
        src: `assets/images/0003_intro26chloe${type}04.jpg`,
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "action",
        action: () => {
          const lastImg = `assets/images/0003_intro26chloe${type}04.jpg`;
          if (iteration === 1) {
            GAME.logic.chloeMinigamePhase(2, lastImg);
          } else {
            GAME.logic.gotoSeq("seq_3_chloe_after_minigame");
          }
        },
      },
    ];
    GAME.logic.startStory(seq);
  },

  seq_3_chloe_after_minigame() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro26chloe.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "{name}, sebaiknya kita sudahi di sini dulu",
      },
      {
        type: "image",
        src: "assets/images/0003_intro27chloe.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      { type: "dialogue", retainMedia: true, name: "Chloe", text: "..." },
      {
        type: "image",
        src: "assets/images/0003_intro28chloe.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "aku, sean, dan kamu adalah sahabat yang tidak pernah menyimpan rahasia di belakang satu sama lain",
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "sebaiknya kita harus memberi tahu sean dulu.",
      },
      {
        type: "image",
        src: "assets/images/0003_intro27chloe.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      { type: "dialogue", retainMedia: true, name: "Chloe", text: "..." },
      {
        type: "image",
        src: "assets/images/0003_intro28chloe.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "sean adalah tipikal kaka besar di persahabatan kita",
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "sedangkan kamu tipe orang bego yang kerjanya bengong mulu.",
      },
      {
        type: "image",
        src: "assets/images/0003_intro29chloe.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      { type: "dialogue", retainMedia: true, name: "Chloe", text: "..." },
      {
        type: "choice",
        choices: [
          {
            text: "oke chloe (sambil memeluknya)",
            stats: {},
            action: () => GAME.logic.gotoSeq("seq_3_chloe_finish1"),
          },
          {
            text: "aku yakin sean akan mengerti chloe",
            stats: {},
            action: () => {
              if (
                GAME.state.stats.heart_chloe >= 80 &&
                GAME.state.stats.composure >= 70 &&
                GAME.state.stats.cha > 48
              ) {
                GAME.logic.gotoSeq("startWinScene");
              } else {
                GAME.logic.gotoSeq("seq_3_chloe_finish_denied");
              }
            },
          },
        ],
      },
    ];
  },

  seq_3_chloe_finish_denied() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro29chloe.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "engga {name}, kita harus kasih tau sean dulu",
      },
      {
        type: "image",
        src: "assets/images/0003_intro30chloe.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      { type: "dialogue", retainMedia: true, name: "Chloe", text: "..." },
      {
        type: "action",
        action: () => GAME.logic.gotoSeq("seq_3_chloe_finish1"),
      },
    ];
  },

  seq_3_chloe_finish1() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro31chloe.jpg",
        effect: "cross-dissolve",
        wait: 4000,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "makasih {name}",
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "aku bersyukur kamu hilang ingatan",
      },
      { bg: "black", effect: "cross-dissolve", wait: 2000, skippable: false },
      {
        type: "action",
        action: () => GAME.logic.gotoSeq("seq_3_chloe_wakeup"),
      },
    ];
  },

  seq_3_chloe_end() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro06chloeEnd01.jpg",
        effect: "cross-dissolve",
        wait: 1000,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "Bye {name}, beristirahatlah",
      },
      {
        type: "image",
        src: "assets/images/0002_intro10.jpg",
        effect: "cross-dissolve",
        wait: 1000,
        skippable: false,
      },
      {
        type: "image",
        src: "assets/images/0002_intro01.jpg",
        effect: "cross-dissolve",
        wait: 1500,
        skippable: false,
      },
      { bg: "black", effect: "cross-dissolve", wait: 1000, skippable: false },
      {
        type: "action",
        action: () => {
          GAME.logic.advanceTime(1);
          GAME.logic.startGameReal();
        },
      },
    ];
  },

  seq_3_chloe_wakeup() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro32chloewakeup.jpg",
        effect: "blur-oscillate",
        wait: 3000,
        skippable: false,
      },
      {
        type: "image",
        src: "assets/images/0003_intro32chloewakeup01.jpg",
        effect: "cross-dissolve",
        wait: 1000,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "{name}, aku harus pulang dan kerja hari ini",
      },
      {
        type: "image",
        src: "assets/images/0003_intro32chloewakeup02.jpg",
        effect: "cross-dissolve",
        wait: 1000,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "kalau ada apa-apa kamu bisa hubungi aku yaa..",
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Chloe",
        text: "bye... {name}",
      },
      { bg: "black", effect: "cross-dissolve", wait: 1500, skippable: false },
      {
        type: "action",
        action: () => {
          GAME.state.stats.energy = 100;
          GAME.logic.advanceTime(3);
          GAME.logic.startGameReal();
        },
      },
    ];
  },

};
