export const seanPhase01Story = {
  seq_3_sean_start() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro01sean.jpg",
        effect: "cross-dissolve",
        wait: 1000,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "kayanya temen chloe buat masalah lagi di bar",
      },
      {
        type: "image",
        src: "assets/images/0003_intro02sean.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "{name}, sekarang apa yang kamu rasa?",
      },
      {
        type: "choice",
        choices: [
          {
            text: "kepalaku agak sedikit pusing",
            stats: { heart_sean: 1 },
            next: "seq_3_sean_branch1_pusing",
          },
          {
            text: "sedikit lemas, tapi aku akan baik-baik saja setelah istirahat ini",
            stats: { heart_sean: 5, cha: 2, wis: 3 },
            next: "seq_3_sean_branch1_pusing",
          },
          {
            text: "aku rasa aku jatuh cinta padamu sean",
            stats: { heart_sean: 5, cha: 5, wis: -5 },
            next: "seq_3_sean_branch1_cinta",
          },
        ],
      },
    ];
  },

  seq_3_sean_branch1_pusing() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro03sean.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "iya kamu memang butuh istirahat",
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "nanti jangan memaksakan diri lagi ya!",
      },
      {
        type: "action",
        action: () => GAME.logic.gotoSeq("seq_3_sean_intro03"),
      },
    ];
  },

  seq_3_sean_branch1_cinta() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro03sean.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "sepertinya kepala kamu terbentur keras saat pingsan",
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "istirahatlah {name}",
      },
      {
        type: "action",
        action: () => GAME.logic.gotoSeq("seq_3_sean_intro03"),
      },
    ];
  },

  seq_3_sean_intro03() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro03sean.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "choice",
        choices: [
          {
            text: "sean apa kamu dan chloe berpacaran?",
            stats: { heart_sean: -1, cha: -1, wis: -1 },
            next: "seq_3_sean_intro04",
          },
          {
            text: "sean berikan aku pelukan sebentar",
            stats: { heart_sean: 5, cha: 5, wis: -1 },
            next: "seq_3_sean_hug",
          },
          {
            text: "sean bibirmu indah sekali",
            stats: { heart_sean: -1, cha: 5, wis: -5 },
            next: "seq_3_sean_intro04",
          },
        ],
      },
    ];
  },

  seq_3_sean_hug() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro04seanhug01.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "ada apa {name}?",
      },
      {
        type: "image",
        src: "assets/images/0003_intro04seanhug02.jpg",
        effect: "cross-dissolve",
        wait: 2500,
        skippable: true,
      },
      {
        type: "image",
        src: "assets/images/0003_intro04seanhug03.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      { type: "dialogue", retainMedia: true, name: "Sean", text: "..." },
      {
        type: "choice",
        choices: [
          {
            text: "sedikit lebih lama sean",
            stats: { heart_sean: 5, cha: 5, wis: 1 },
            next: "seq_3_sean_hug_lama",
          },
          {
            text: "cium bibir sean",
            stats: { heart_sean: 2, cha: 1, wis: -1 },
            next: "seq_3_sean_intro05",
          },
        ],
      },
    ];
  },

  seq_3_sean_hug_lama() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro04seanhug04.jpg",
        effect: "blur-pulse-1",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "ada apa? kamu tiba-tiba jadi aneh begini",
      },
      {
        type: "image",
        src: "assets/images/0003_intro04seanhug05.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      { type: "dialogue", retainMedia: true, name: "Sean", text: "..." },
      {
        type: "choice",
        choices: [
          {
            text: "sepertinya kepalaku jadi aneh saat pingsan tadi",
            stats: { heart_sean: 1, cha: 1, wis: 5 },
            next: "seq_3_sean_hug_aneh",
          },
          {
            text: "pegang pantat sean",
            stats: { heart_sean: -3, cha: 1, wis: -5 },
            next: "seq_3_sean_hug_slap",
          },
        ],
      },
    ];
  },

  seq_3_sean_hug_aneh() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro04seanhug06.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      { type: "dialogue", retainMedia: true, name: "Sean", text: "..." },
      {
        type: "image",
        src: "assets/images/0003_intro04seanhug07.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      { type: "dialogue", retainMedia: true, name: "Sean", text: "..." },
      {
        type: "image",
        src: "assets/images/0003_intro04seanhug08.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "cukup {name}, ini jadi agak aneh",
      },
      {
        type: "action",
        action: () => GAME.logic.gotoSeq("seq_3_sean_intro05"),
      },
    ];
  },

  seq_3_sean_hug_slap() {
    return [
      { bg: "black", effect: "cross-dissolve", wait: 200, skippable: false },
      {
        type: "dialogue",
        retainMedia: true,
        name: "",
        text: "Plakkk!!! Sean menamparmu",
      },
      {
        type: "image",
        src: "assets/images/0003_intro04seanhug09.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "udah aku duga",
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "emang bajingan",
      },
      { type: "action", action: () => GAME.logic.gotoSeq("seq_3_sean_end") },
    ];
  },

  seq_3_sean_intro04() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro04sean.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "{name}, ada apa?",
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "kamu benar-benar ngebuat aku takut",
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "kamu serius ga apa-apa kan?",
      },
      {
        type: "action",
        action: () => GAME.logic.gotoSeq("seq_3_sean_intro05"),
      },
    ];
  },

  seq_3_sean_intro05() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro05sean.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "ok {name} sebelum menjadi makin aneh kamu harus benar-benar beristirahat",
      },
      {
        type: "image",
        src: "assets/images/0003_intro06sean.jpg",
        effect: "cross-dissolve",
        wait: 1000,
        skippable: true,
      },
      {
        type: "image",
        src: "assets/images/0003_intro06sean.jpg",
        effect: "cross-dissolve",
        wait: 200,
        skippable: true,
      },
      {
        type: "choice",
        choices: [
          {
            text: "sepertinya aku memang butuh istirahat",
            stats: { heart_sean: 1, wis: 1 },
            next: "seq_3_sean_end",
          },
          {
            text: "sean mau kah kamu menemaniku dulu?",
            stats: { heart_sean: 2, cha: 5, wis: 2 },
            next: "seq_3_sean_intro06",
          },
        ],
      },
    ];
  },

  seq_3_sean_intro06() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro06sean.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "ok, menemani untuk apa?",
      },
      {
        type: "choice",
        choices: [
          {
            text: "ga jadi sean, sepertinya memang kepalaku sedikit aneh",
            stats: { heart_sean: -1 },
            next: "seq_3_sean_end",
          },
          {
            text: "mungkin terdengar aneh, tapi sepertinya aku sedikit hilang ingatan sean",
            stats: { heart_sean: 2, cha: 5, wis: 5 },
            next: "seq_3_sean_amnesia",
          },
        ],
      },
    ];
  },

  seq_3_sean_amnesia() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro07sean.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "Haa? jangan bercanda {name}!",
      },
      {
        type: "image",
        src: "assets/images/0003_intro08sean.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "tapi kayanya makes sense kalo aku liat wajah kamu",
      },
      {
        type: "image",
        src: "assets/images/0003_intro09sean.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "oke kalau gitu, coba jawab pertanyaan aku",
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "aku yakin walaupun kamu pura-pura, aku pasti tau kamu bohong!",
      },
      {
        type: "image",
        src: "assets/images/0003_intro10sean.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "apa warna celana dalem aku sekarang?",
      },
      {
        type: "choice",
        choices: [
          {
            text: "putih?",
            stats: { heart_sean: 5, cha: 2, wis: 5 },
            next: "seq_3_sean_amnesia_merge1",
          },
          {
            text: "kamu ga pake celana dalem?",
            stats: { heart_sean: -5, cha: 4, wis: -5 },
            next: "seq_3_sean_amnesia_merge1",
          },
        ],
      },
    ];
  },

  seq_3_sean_amnesia_merge1() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro11sean.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      { type: "dialogue", retainMedia: true, name: "Sean", text: "....." },
      {
        type: "image",
        src: "assets/images/0003_intro12sean.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "{name}!! kamu beneran hilang ingatan?",
      },
      {
        type: "image",
        src: "assets/images/0003_intro12_1sean.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "{name}? ayo kita kerumah sakit!",
      },
      {
        type: "choice",
        choices: [
          {
            text: "apa aku sekarang separah itu?",
            stats: { heart_sean: -1, cha: -1, wis: -1 },
            next: "seq_3_sean_amnesia_merge2",
          },
          {
            text: "aku tebak dokter juga ga bakal tau kondisi aku ini apa",
            stats: { heart_sean: 1, cha: 3, wis: 3 },
            next: "seq_3_sean_amnesia_merge2",
          },
        ],
      },
    ];
  },

  seq_3_sean_amnesia_merge2() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro12_2sean.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      { type: "dialogue", retainMedia: true, name: "Sean", text: "....." },
      {
        type: "image",
        src: "assets/images/0003_intro12_3sean.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "choice",
        choices: [
          {
            text: "sean apakah kita berdua pacaran?",
            stats: { heart_sean: 5, cha: 2, wis: 1 },
            next: "seq_3_sean_amnesia_end",
          },
          {
            text: "apa chloe itu pacar kamu sean?",
            stats: { heart_sean: 1, cha: -1, wis: 1 },
            next: "seq_3_sean_amnesia_end",
          },
        ],
      },
    ];
  },

  seq_3_sean_amnesia_end() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro13sean.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "pfffft... apa kamu ngarepnya gitu?",
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "kamu beneran ga inget {name}?",
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "dan kayanya kamu ga perlu ke dokter.",
      },
      {
        type: "image",
        src: "assets/images/0003_intro14_1sean.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "ahhh.. sepertinya aku juga butuh istirahat.",
      },
      {
        type: "image",
        src: "assets/images/0003_intro14_2sean.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "gimana kalau aku nginep di sini dulu {name}?",
      },
      {
        type: "image",
        src: "assets/images/0003_intro15_1sean.jpg",
        effect: "cross-dissolve",
        wait: 2000,
        skippable: true,
      },
      {
        type: "image",
        src: "assets/images/0003_intro15_2sean.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "seengganya sampe kamu ga bingung lagi",
      },
      {
        type: "image",
        src: "assets/images/0003_intro15_3sean.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "biar aku nyalain tv",
      },
      {
        type: "image",
        src: "assets/images/0003_intro16sean.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      { type: "dialogue", retainMedia: true, name: "Sean", text: "...." },
      {
        type: "image",
        src: "assets/images/0003_intro17sean.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "{name}, apa kamu berharap aku jadi pacar kamu?",
      },
      {
        type: "image",
        src: "assets/images/0003_intro18sean.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      { type: "dialogue", retainMedia: true, name: "Sean", text: "..." },
      {
        type: "image",
        src: "assets/images/0003_intro19sean.jpg",
        effect: "cross-dissolve",
        wait: 1500,
        skippable: false,
      },
      {
        type: "image",
        src: "assets/images/0003_intro20sean.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "choice",
        choices: [
          {
            text: "tidur menghadap sean",
            stats: { heart_sean: 5 },
            next: "seq_3_sean_sleep_face",
          },
          {
            text: "tidur membelakangi sean",
            stats: { heart_sean: 1 },
            next: "seq_3_sean_sleep_back",
          },
        ],
      },
    ];
  },

  seq_3_sean_sleep_back() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro20seansleep01.jpg",
        effect: "cross-dissolve",
        wait: 1000,
        skippable: false,
      },
      {
        type: "image",
        src: "assets/images/0003_intro20seansleep02.jpg",
        effect: "cross-dissolve",
        wait: 1500,
        skippable: false,
      },
      { bg: "black", effect: "cross-dissolve", wait: 1000, skippable: false },
      {
        type: "action",
        action: () => GAME.logic.gotoSeq("seq_3_sean_wakeup"),
      },
    ];
  },

  seq_3_sean_sleep_face() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro21sean.jpg",
        effect: "blur-pulse-1",
        wait: 4000,
        skippable: false,
      },
      { type: "dialogue", retainMedia: true, name: "Sean", text: "..." },
      {
        type: "choice",
        choices: [
          {
            text: "cium bibir sean",
            stats: { heart_sean: 5 },
            next: "seq_3_sean_intimacy",
          },
          {
            text: "belai pinggang sean",
            stats: { heart_sean: -3 },
            next: "seq_3_sean_denied",
          },
        ],
      },
    ];
  },

  seq_3_sean_denied() {
    if (GAME.state.stats.cha < 90 && GAME.state.stats.heart_sean < 90) {
      return [
        {
          type: "image",
          src: "assets/images/0003_intro21seanDenied01.jpg",
          effect: "cross-dissolve",
          wait: 1000,
          skippable: false,
        },
        {
          type: "action",
          action: () => GAME.logic.gotoSeq("seq_3_sean_wakeup"),
        },
      ];
    } else {
      return [
        {
          type: "action",
          action: () => GAME.logic.gotoSeq("seq_3_sean_intimacy"),
        },
      ];
    }
  },

  seq_3_sean_intimacy() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro22sean.jpg",
        effect: "cross-dissolve",
        wait: 1000,
        skippable: false,
      },
      {
        type: "image",
        src: "assets/images/0003_intro23sean.jpg",
        effect: "cross-dissolve",
        wait: 1000,
        skippable: false,
      },
      { type: "dialogue", retainMedia: true, name: "Sean", text: "..." },
      {
        type: "image",
        src: "assets/images/0003_intro24sean.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "image",
        src: "assets/images/0003_intro25sean.jpg",
        effect: "cross-dissolve",
        wait: 1000,
        skippable: false,
      },
      { type: "action", action: () => GAME.logic.chloeMinigamePhase() },
    ];
  },

  chloeMinigamePhase(
    iteration = 1,
    lastImage = "assets/images/0003_intro25sean.jpg",
  ) {
    GAME.state.currentStorySeq = "seq_3_sean_intimacy";
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
    GAME.state.currentStorySeq = "seq_3_sean_intimacy";
    const seq = [
      {
        type: "image",
        src: `assets/images/0003_intro26sean${type}01.jpg`,
        effect: "cross-dissolve",
        wait: 800,
        skippable: false,
      },
      {
        type: "image",
        src: `assets/images/0003_intro26sean${type}02.jpg`,
        effect: "cross-dissolve",
        wait: 800,
        skippable: false,
      },
      {
        type: "image",
        src: `assets/images/0003_intro26sean${type}03.jpg`,
        effect: "cross-dissolve",
        wait: 800,
        skippable: false,
      },
      { type: "dialogue", retainMedia: true, name: "Sean", text: "..." },
      {
        type: "image",
        src: `assets/images/0003_intro26sean${type}04.jpg`,
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "action",
        action: () => {
          const lastImg = `assets/images/0003_intro26sean${type}04.jpg`;
          if (iteration === 1) {
            GAME.logic.chloeMinigamePhase(2, lastImg);
          } else {
            GAME.logic.gotoSeq("seq_3_sean_after_minigame");
          }
        },
      },
    ];
    GAME.logic.startStory(seq);
  },

  seq_3_sean_after_minigame() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro26sean.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "{name}, sebaiknya kita sudahi di sini dulu",
      },
      {
        type: "image",
        src: "assets/images/0003_intro27sean.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      { type: "dialogue", retainMedia: true, name: "Sean", text: "..." },
      {
        type: "image",
        src: "assets/images/0003_intro28sean.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "aku, chloe, dan kamu adalah sahabat yang tidak pernah menyimpan rahasia di belakang satu sama lain",
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "sebaiknya kita harus memberi tahu chloe dulu.",
      },
      {
        type: "image",
        src: "assets/images/0003_intro27sean.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      { type: "dialogue", retainMedia: true, name: "Sean", text: "..." },
      {
        type: "image",
        src: "assets/images/0003_intro28sean.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "chloe adalah tipikal kaka besar di persahabatan kita",
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "sedangkan kamu tipe orang bego yang kerjanya bengong mulu.",
      },
      {
        type: "image",
        src: "assets/images/0003_intro29sean.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      { type: "dialogue", retainMedia: true, name: "Sean", text: "..." },
      {
        type: "choice",
        choices: [
          {
            text: "oke sean (sambil memeluknya)",
            stats: {},
            action: () => GAME.logic.gotoSeq("seq_3_sean_finish1"),
          },
          {
            text: "aku yakin chloe akan mengerti sean",
            stats: {},
            action: () => {
              if (
                GAME.state.stats.heart_sean >= 80 &&
                GAME.state.stats.composure >= 70 &&
                GAME.state.stats.cha > 48
              ) {
                GAME.logic.gotoSeq("startWinScene");
              } else {
                GAME.logic.gotoSeq("seq_3_sean_finish_denied");
              }
            },
          },
        ],
      },
    ];
  },

  seq_3_sean_finish_denied() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro29sean.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "engga {name}, kita harus kasih tau chloe dulu",
      },
      {
        type: "image",
        src: "assets/images/0003_intro30sean.jpg",
        effect: "cross-dissolve",
        wait: 500,
        skippable: false,
      },
      { type: "dialogue", retainMedia: true, name: "Sean", text: "..." },
      {
        type: "action",
        action: () => GAME.logic.gotoSeq("seq_3_sean_finish1"),
      },
    ];
  },

  seq_3_sean_finish1() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro31sean.jpg",
        effect: "cross-dissolve",
        wait: 4000,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "makasih {name}",
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "aku bersyukur kamu hilang ingatan",
      },
      { bg: "black", effect: "cross-dissolve", wait: 2000, skippable: false },
      {
        type: "action",
        action: () => GAME.logic.gotoSeq("seq_3_sean_wakeup"),
      },
    ];
  },

  seq_3_sean_end() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro06seanEnd01.jpg",
        effect: "cross-dissolve",
        wait: 1000,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
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

  seq_3_sean_wakeup() {
    return [
      {
        type: "image",
        src: "assets/images/0003_intro32seanwakeup.jpg",
        effect: "blur-oscillate",
        wait: 3000,
        skippable: false,
      },
      {
        type: "image",
        src: "assets/images/0003_intro32seanwakeup01.jpg",
        effect: "cross-dissolve",
        wait: 1000,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "{name}, aku harus pulang dan kerja hari ini",
      },
      {
        type: "image",
        src: "assets/images/0003_intro32seanwakeup02.jpg",
        effect: "cross-dissolve",
        wait: 1000,
        skippable: false,
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
        text: "kalau ada apa-apa kamu bisa hubungi aku yaa..",
      },
      {
        type: "dialogue",
        retainMedia: true,
        name: "Sean",
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

