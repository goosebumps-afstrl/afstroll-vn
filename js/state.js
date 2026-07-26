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
        proteinBar: 5, roti: 0, daging: 0, soda: 0, kopi: 0,
        },
    portfolio: { FLE: { quantity: 0, totalCost: 0 }, MAZ: { quantity: 0, totalCost: 0 }, ECL: { quantity: 0, totalCost: 0 }, BGY: { quantity: 0, totalCost: 0 }, LSC: { quantity: 0, totalCost: 0 } },
    stockPrices: {
        FLE: { current: 10, prev: 10 },
        MAZ: { current: 50, prev: 50 },
        ECL: { current: 25, prev: 25 },
        BGY: { current: 15, prev: 15 },
        LSC: { current: 30, prev: 30 }
        },
    currentView: 'view-apartment', 
    composureWarned: false, 
    previousView: null,
    activeStockId: null,
    storyPhase: 0,
    winState: {
        wg: 5,
        wb: 0,
        clicks: 0,
        active: false
    }
};

export const constants = {
    shopItems: [
        { id: 'proteinBar', name: 'Protein Bar', price: 5, h: 50, e: 0, icon: '🍫' },
        { id: 'roti', name: 'Roti Gandum', price: 6, h: 80, e: 0, icon: '🍞' },
        { id: 'daging', name: 'Daging Ayam', price: 7, h: 90, e: 0, icon: '🍗' },
        { id: 'soda', name: 'Kaleng Soda', price: 3, h: 10, e: 5, icon: '🥤' },
        { id: 'kopi', name: 'Kopi Hitam', price: 4, h: 10, e: 30, icon: '☕' },
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