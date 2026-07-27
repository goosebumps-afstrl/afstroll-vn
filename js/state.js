export const state = {
    name: "James",
    gender: "Pria",
    day: 0,
    timePhaseIdx: 4, 
    money: 150,
    currentLocation: 'apartment',
    stats: {
        wis: 30, cha: 70, 
        energy: 30,
        hunger: 90,
        composure: 75,
        heart_chloe: 50,
        last_wis_change: 0,
        last_cha_change: 0
    },
    npcs: {
        chloe: { id: 'chloe', name: 'Chloe', isMet: true, heart: 50, storyPhase: 1, maxPhase: 20, lastChange: 0 },
        sean: { id: 'sean', name: 'Sean', isMet: true, heart: 50, storyPhase: 0, maxPhase: 20, lastChange: 0 }
    },
    inventory: {
        proteinBar: 5, roti: 0, daging: 0, soda: 0, kopi: 0, permen: 0, mieInstan: 0, rokok: 0, 
        airMineralKecil: 0, airMineralGalon: 0, cikiSnack: 0, donat: 0, lolipop: 0, keju: 0,
        lipBalm: 0, senter: 0, selang: 0, kondom: 0, rubik: 0, sabunMandi: 0, parfum: 0, lotion: 0, pelembab: 0, tali: 0
    },
    portfolio: { FLE: { quantity: 0, totalCost: 0 }, MAZ: { quantity: 0, totalCost: 0 }, ECL: { quantity: 0, totalCost: 0 }, BGY: { quantity: 0, totalCost: 0 }, LSC: { quantity: 0, totalCost: 0 } },
    stockPrices: {
        FLE: { current: 10, prev: 10 },
        MAZ: { current: 50, prev: 50 },
        ECL: { current: 25, prev: 25 },
        BGY: { current: 15, prev: 15 },
        LSC: { current: 30, prev: 30 }
    },
    loans: [],
    messages: [
        { id: 'm1', sender: 'Dev', type: 'system', text: 'Selamat datang di Afterstroll VN! Anda dapat menggunakan handphone ini untuk berbagai keperluan.', isRead: false, time: 'Day 0' }
    ],
    currentView: 'view-apartment', 
    composureWarned: false, 
    previousView: null,
    activeStockId: null,
    storyPhase: 0,
    winState: { wg: 5, wb: 0, clicks: 0, active: false }
};

export const constants = {
    shopItems: [
        { id: 'proteinBar', type: 'food', name: 'Protein Bar', price: 5, h: 50, e: 0, icon: '🍫' },
        { id: 'roti', type: 'food', name: 'Roti Gandum', price: 6, h: 80, e: 0, icon: '🍞' },
        { id: 'daging', type: 'food', name: 'Daging Ayam', price: 7, h: 90, e: 0, icon: '🍗' },
        { id: 'soda', type: 'food', name: 'Kaleng Soda', price: 3, h: 10, e: 5, icon: '🥤' },
        { id: 'kopi', type: 'food', name: 'Kopi Hitam', price: 4, h: 10, e: 30, icon: '☕' },
        { id: 'permen', type: 'food', name: 'Permen', price: 1, h: 5, e: 0, icon: '🍬' },
        { id: 'mieInstan', type: 'food', name: 'Mie Instan Cup', price: 4, h: 40, e: 0, icon: '🍜' },
        { id: 'rokok', type: 'food', name: 'Rokok', price: 10, h: -5, e: -10, icon: '🚬' },
        { id: 'airMineralKecil', type: 'food', name: 'Air Mineral (S)', price: 2, h: 5, e: 10, icon: '💧' },
        { id: 'airMineralGalon', type: 'food', name: 'Air Mineral (L)', price: 8, h: 20, e: 40, icon: '🚰' },
        { id: 'cikiSnack', type: 'food', name: 'Ciki Snack', price: 3, h: 15, e: 0, icon: '🍟' },
        { id: 'donat', type: 'food', name: 'Donat', price: 4, h: 25, e: 5, icon: '🍩' },
        { id: 'lolipop', type: 'food', name: 'Lolipop', price: 1, h: 2, e: 2, icon: '🍭' },
        { id: 'keju', type: 'food', name: 'Keju', price: 6, h: 20, e: 5, icon: '🧀' },
        { id: 'lipBalm', type: 'non-food', name: 'Lip Balm', price: 5, icon: '💄', desc: 'Pelembab bibir agar tidak kering.' },
        { id: 'senter', type: 'non-food', name: 'Senter', price: 15, icon: '🔦', desc: 'Berguna untuk tempat gelap.' },
        { id: 'selang', type: 'non-food', name: 'Selang', price: 12, icon: '🪱', desc: 'Selang air karet.' },
        { id: 'kondom', type: 'non-food', name: 'Kondom', price: 8, icon: '🎈', desc: 'Barang penting di malam hari.' },
        { id: 'rubik', type: 'non-food', name: 'Rubik', price: 10, icon: '🎲', desc: 'Mainan teka-teki kotak.' },
        { id: 'sabunMandi', type: 'non-food', name: 'Sabun Mandi', price: 4, icon: '🧼', desc: 'Untuk membersihkan badan.' },
        { id: 'parfum', type: 'non-food', name: 'Parfum', price: 25, icon: '✨', desc: 'Wangi yang memikat hati.' },
        { id: 'lotion', type: 'non-food', name: 'Lotion', price: 10, icon: '🧴', desc: 'Merawat kulit agar halus.' },
        { id: 'pelembab', type: 'non-food', name: 'Pelembab Kulit', price: 12, icon: '🧴', desc: 'Menjaga kelembapan kulit.' },
        { id: 'tali', type: 'non-food', name: 'Tali', price: 8, icon: '🪢', desc: 'Bisa digunakan untuk mengikat barang.' }
    ],
    pinjolOptions: [
        { id: 'p10k', amount: 10000, maxTenor: 10, billAmount: 1300, billInterval: 20 },
        { id: 'p5k', amount: 5000, maxTenor: 5, billAmount: 1200, billInterval: 20 },
        { id: 'p3k', amount: 3000, maxTenor: 3, billAmount: 1050, billInterval: 20 },
        { id: 'p2k', amount: 2000, maxTenor: 2, billAmount: 1050, billInterval: 15 },
        { id: 'p1k', amount: 1000, maxTenor: 2, billAmount: 550, billInterval: 15 }
    ],
    jobList: [
        { id: 'layanan', title: 'Layanan Masyarakat', icon: '🧹', hours: 3, pay: 30, energy: -50, hunger: -30, composure: 5 },
        { id: 'kurir', title: 'Kurir Paket', icon: '📦', hours: 4, pay: 45, energy: -60, hunger: -40, composure: -10 },
        { id: 'buruh', title: 'Buruh Pabrik', icon: '🏭', hours: 2, pay: 25, energy: -40, hunger: -20, composure: -5 }
    ],
    stocks: [
        { id: 'FLE', name: 'Fleeca Bank', base: 10, vol: 0.08 },
        { id: 'MAZ', name: 'Maze Bank', base: 50, vol: 0.12 },
        { id: 'ECL', name: 'eCola', base: 25, vol: 0.18 },
        { id: 'BGY', name: 'Burger Shot', base: 15, vol: 0.10 },
        { id: 'LSC', name: 'LS Customs', base: 30, vol: 0.05 }
    ],
    timePhases: ['Dini Hari', 'Pagi', 'Siang', 'Sore', 'Malam', 'Tengah Malam'],
    days: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
    saveSlotCount: 15
};