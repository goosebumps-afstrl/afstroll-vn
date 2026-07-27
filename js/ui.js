export const ui = {
  showConfirm(title, message, onConfirm) {
      document.getElementById('general-confirm-title').innerText = title;
      document.getElementById('general-confirm-text').innerText = message;
      document.getElementById('general-confirm-btn').onclick = () => {
          GAME.ui.toggleModal('modal-general-confirm');
          onConfirm();
      };
      GAME.ui.toggleModal('modal-general-confirm');
  },

  showToast(msg) {
    const isComposureWarning = msg.startsWith("⚠️");
    if (!isComposureWarning && GAME.state.stats.composure <= 20) {
      return;
    }

    const toast = document.getElementById("toast");
    toast.innerText = msg;
    toast.style.opacity = "1";
    toast.style.transform = "translate(-50%, 10px)";
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translate(-50%, 0)";
    }, 2500);
  },

  fadeBlackTransition(callback, duration = 800) {
    const fader = document.getElementById("screen-fader");
    if (!fader) {
      if (callback) callback();
      return;
    }
    fader.style.pointerEvents = "auto";
    fader.style.transition = `opacity ${duration / 2}ms ease-in-out`;
    fader.style.opacity = "1";

    setTimeout(() => {
      if (callback) callback();
      
      setTimeout(() => {
        fader.style.opacity = "0";
        setTimeout(() => {
          fader.style.pointerEvents = "none";
        }, duration / 2);
      }, 100);
    }, duration / 2);
  },

  changeScene(sceneId, transitionType = "fade-black") {
    const oldScene = document.querySelector(".scene.active");
    const target = document.getElementById(sceneId);

    if (oldScene && oldScene.id === sceneId) {
      return;
    }

    if (transitionType === "cross-blur" && oldScene) {
      oldScene.style.zIndex = "10";
      target.style.zIndex = "15";
      target.classList.add("active", "animate-blur-in");
      oldScene.classList.add("animate-blur-out");
      this.updateSceneAudio(sceneId, oldScene.id);

      setTimeout(() => {
        oldScene.classList.remove("active", "animate-blur-out");
        oldScene.style.zIndex = "";
        target.classList.remove("animate-blur-in");
        target.style.zIndex = "";
      }, 800);
    } else if (transitionType === "cross-dissolve" && oldScene) {
      oldScene.style.zIndex = "10";
      target.style.zIndex = "15";
      target.classList.add("active", "animate-cross-in");
      oldScene.classList.add("animate-cross-out");
      this.updateSceneAudio(sceneId, oldScene.id);

      setTimeout(() => {
        oldScene.classList.remove("active", "animate-cross-out");
        oldScene.style.zIndex = "";
        target.classList.remove("animate-cross-in");
        target.style.zIndex = "";
      }, 800);
    } else if (transitionType === "fade-black" && oldScene) {
      this.fadeBlackTransition(() => {
        oldScene.classList.remove("active", "animate-fade-in", "animate-blur-in", "animate-cross-in");
        target.classList.add("active");
        this.updateSceneAudio(sceneId, oldScene.id);
      }, 800);
    } else {
      if (oldScene) {
        oldScene.classList.remove(
          "active",
          "animate-fade-in",
          "animate-blur-in",
          "animate-cross-in",
        );
      }
      target.classList.add("active", "animate-fade-in");
      this.updateSceneAudio(sceneId, oldScene ? oldScene.id : null);
    }

    const globalTopUI = document.getElementById("global-top-ui");
    if (globalTopUI) {
      if (sceneId === "scene-maingame" || sceneId === "scene-story") {
        globalTopUI.classList.remove("opacity-0");
        globalTopUI.classList.add("opacity-100");
      } else {
        globalTopUI.classList.remove("opacity-100");
        globalTopUI.classList.add("opacity-0");
      }
    }
  },

  updateSceneAudio(sceneId, oldSceneId) {
    if (!GAME.audio.bgm || !GAME.audio.intro) return;

    if (sceneId === "scene-intro") {
      GAME.audio.intro.pause();
      GAME.audio.fadeInAndPlay(GAME.audio.bgm);
    } else if (sceneId === "scene-story") {
      GAME.audio.bgm.pause();
      if (GAME.state.storyPhase === 1) {
        GAME.audio.fadeInAndPlay(GAME.audio.intro);
      } else {
        GAME.audio.intro.pause();
      }
    } else if (sceneId === "scene-maingame") {
      if (GAME.state.storyPhase === 2) {
        GAME.audio.bgm.pause();
        GAME.audio.intro.pause();
      } else {
        GAME.audio.intro.pause();
        GAME.audio.fadeInAndPlay(GAME.audio.bgm);
      }
    } else if (sceneId === "scene-gameover") {
      GAME.audio.bgm.pause();
      GAME.audio.intro.pause();
    } else if (oldSceneId === "scene-gameover") {
      GAME.audio.intro.pause();
      GAME.audio.fadeInAndPlay(GAME.audio.bgm);
    }
  },

  toggleModal(modalId) {
    const modal = document.getElementById(modalId);

    if (modal.classList.contains("hidden")) {
      modal.classList.remove("hidden");
      modal.classList.add("flex", "animate-fade-in");
    } else {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }

    const doorExit = document.getElementById("door-exit-area");
    if (doorExit) {
      const anyModalOpen =
        !document.getElementById("modal-phone").classList.contains("hidden") ||
        !document.getElementById("modal-option").classList.contains("hidden") ||
        !document.getElementById("modal-saveload").classList.contains("hidden") ||
        !document.getElementById("modal-confirm-overwrite").classList.contains("hidden");

      if (anyModalOpen) {
        doorExit.classList.add("opacity-0");
        setTimeout(() => doorExit.classList.add("hidden"), 300);
      } else {
        if (GAME.state.currentView === "view-apartment") {
          const wrapper = document.getElementById("view-apartment");
          if (wrapper && wrapper.classList.contains("minimized")) {
            doorExit.classList.remove("hidden");
            setTimeout(() => doorExit.classList.remove("opacity-0"), 10);
          }
        }
      }
    }
  },

  changeView(viewId, useTransition = true) {
    const doChange = () => {
      const container = document.getElementById("dynamic-content");
      Array.from(container.children).forEach((child) => {
        child.classList.add("hidden");
        child.classList.remove("flex");
      });

      const viewCity = document.getElementById("view-city");
      if (viewCity) {
        if (viewId === "view-city") {
          viewCity.classList.remove("hidden");
          viewCity.classList.add("flex");
        } else {
          viewCity.classList.add("hidden");
          viewCity.classList.remove("flex");
        }
      }
      const target = document.getElementById(viewId);
      target.classList.remove("hidden");
      target.classList.add("flex");

      const doorExit = document.getElementById("door-exit-area");
      if (doorExit) {
        if (viewId === "view-apartment") {
          const wrapper = document.getElementById("view-apartment");
          if (wrapper && wrapper.classList.contains("minimized")) {
            doorExit.classList.remove("hidden");
            setTimeout(() => doorExit.classList.remove("opacity-0"), 10);
          } else {
            doorExit.classList.add("opacity-0");
            doorExit.classList.add("hidden");
          }
        } else {
          doorExit.classList.add("opacity-0");
          doorExit.classList.add("hidden");
        }
      }

      if (viewId === "view-kitchen") GAME.ui.renderInventory();

      const previousView = GAME.state.currentView;
      if (
        viewId === "view-city" &&
        (previousView === "view-minimarket" ||
          previousView === "view-jobs" ||
          previousView === "view-story-location")
      ) {
        // Waktu tidak lagi berjalan otomatis di sini. Waktu hanya berjalan melalui callback VN event.
      }

      if (viewId === "view-minimarket") GAME.ui.renderShop();
      if (viewId === "view-jobs") {
          if (GAME.ui.renderJobCards) GAME.ui.renderJobCards();
      }
      if (viewId === "view-saveload") GAME.ui.renderSaveLoadList();
      if (viewId === "view-saham") GAME.ui.renderSahamList();

      if (viewId === "view-city") {
        const mapLabels = document.querySelectorAll("#view-city .map-label");
        mapLabels.forEach((label) => (label.style.opacity = "1"));
      }
      GAME.state.currentView = viewId;
    };

    if (useTransition) {
      this.fadeBlackTransition(doChange);
    } else {
      doChange();
    }
  },

  updateBackground() {
    const bgElement = document.getElementById("background-layer");
    const videoBg = document.getElementById("maingame-bg-video");
    const isDay = GAME.state.timePhaseIdx >= 1 && GAME.state.timePhaseIdx <= 3;

    if (GAME.state.storyPhase === 2) {
      bgElement.style.backgroundImage = "none";
      if (videoBg) videoBg.classList.remove("hidden");
    } else {
      if (videoBg) videoBg.classList.add("hidden");
      if (GAME.state.currentLocation === "apartment") {
        bgElement.style.backgroundImage = isDay
          ? "url('assets/images/apartment-day-bg.jpg')"
          : "url('assets/images/apartment-night-bg.jpg')";
      } else if (GAME.state.currentLocation === "city") {
        bgElement.style.backgroundImage = isDay
          ? "url('assets/images/city-day-bg.jpg')"
          : "url('assets/images/city-night-bg.jpg')";
      }
    }
  },

  updateHUD() {
    const { stats, day, timePhaseIdx, money } = GAME.state;
    stats.energy = GAME.clamp(stats.energy, 0, 100);
    stats.hunger = GAME.clamp(stats.hunger, 0, 100);
    stats.composure = GAME.clamp(stats.composure, 0, 100);

    document
      .querySelectorAll(".hud-bar-energy")
      .forEach((el) => (el.style.width = stats.energy + "%"));
    document
      .querySelectorAll(".hud-text-energy")
      .forEach((el) => (el.innerText = Math.round(stats.energy) + "%"));

    document
      .querySelectorAll(".hud-bar-hunger")
      .forEach((el) => (el.style.width = stats.hunger + "%"));
    document
      .querySelectorAll(".hud-text-hunger")
      .forEach((el) => (el.innerText = Math.round(stats.hunger) + "%"));

    document
      .querySelectorAll(".hud-bar-composure")
      .forEach((el) => (el.style.width = stats.composure + "%"));
    document
      .querySelectorAll(".hud-text-composure")
      .forEach((el) => (el.innerText = Math.round(stats.composure) + "%"));

    const timePhaseStr = GAME.constants.timePhases[timePhaseIdx];
    const isNight = timePhaseIdx === 0 || timePhaseIdx === 4 || timePhaseIdx === 5;
    const timeIcon = isNight ? '🌙' : '☀️';

    document
      .querySelectorAll(".hud-ui-daytime-day")
      .forEach((el) => (el.innerText = `Day ${day}`));
      
    document
      .querySelectorAll(".hud-ui-daytime-phase")
      .forEach((el) => (el.innerText = timePhaseStr));

    document
      .querySelectorAll(".hud-ui-daytime-icon")
      .forEach((el) => (el.innerText = timeIcon));
    document
      .querySelectorAll(".hud-ui-money")
      .forEach((el) => (el.innerText = money));

    const dayNameStr = GAME.constants.days[day % 7];
    document
      .querySelectorAll(".hud-ui-dayname")
      .forEach((el) => (el.innerText = dayNameStr));

    document.getElementById("phone-time").innerText =
      `${dayNameStr}, Day ${day}`;
    
    GAME.ui.renderPhoneStats();
    
    // Notifikasi Red Dot
    const unreadMessages = GAME.state.messages ? GAME.state.messages.filter(m => !m.isRead).length : 0;
    const dotMain = document.getElementById("phone-notif-dot");
    const dotApp = document.getElementById("phone-app-message-dot");
    
    if (dotMain) {
        if (unreadMessages > 0) dotMain.classList.remove("hidden");
        else dotMain.classList.add("hidden");
    }
    if (dotApp) {
        if (unreadMessages > 0) dotApp.classList.remove("hidden");
        else dotApp.classList.add("hidden");
    }
    
    GAME.ui.updateBackground();
  },

  renderInventory() {
    const container = document.getElementById("kitchen-inventory");
    const previewContainer = document.getElementById("kitchen-preview");
    container.innerHTML = "";
    if(previewContainer) previewContainer.classList.add("hidden");
    
    let hasItems = false;
    
    GAME.constants.shopItems.filter(i => i.type === 'food').forEach((item) => {
      let count = GAME.state.inventory[item.id];
      if (count > 0) {
        hasItems = true;
        const el = document.createElement("div");
        el.className = "relative bg-black/40 rounded-xl border border-white/10 shadow-lg flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors aspect-square group";
        el.innerHTML = `
            <div class="w-full h-full p-2 flex flex-col items-center justify-center relative overflow-hidden">
                <span class="absolute text-3xl opacity-40 group-hover:opacity-10 transition-opacity">${item.icon || '📦'}</span>
                <img src="assets/images/item_${item.id}.png" class="w-full h-full object-contain z-10 drop-shadow-md" 
                     onerror="this.style.display='none'; this.previousElementSibling.classList.replace('opacity-40', 'opacity-100'); this.previousElementSibling.classList.replace('group-hover:opacity-10', 'group-hover:opacity-100');">
            </div>
            <div class="absolute top-1 right-1 bg-blue-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-md z-20">x${count}</div>
        `;
        
        el.onclick = () => {
            if(!previewContainer) return;
            previewContainer.classList.remove("hidden");
            const img = document.getElementById("kitchen-preview-img");
            img.src = `assets/images/item_${item.id}.png`;
            img.style.display = 'block';
            document.getElementById("kitchen-preview-fallback").innerText = item.icon || '📦';
            
            document.getElementById("kitchen-preview-name").innerText = item.name;
            
            const hText = item.h !== 0 ? (item.h > 0 ? `+${item.h} H` : `${item.h} H`) : "";
            const eText = item.e !== 0 ? (item.e > 0 ? `+${item.e} E` : `${item.e} E`) : "";
            const sep = hText && eText ? ", " : "";
            document.getElementById("kitchen-preview-stats").innerText = `${hText}${sep}${eText}`;
            
            const btn = document.getElementById("kitchen-preview-btn");
            btn.onclick = () => {
                GAME.logic.useItem(item.id);
            };
        };
        
        container.appendChild(el);
      }
    });
    
    if (!hasItems) {
      container.innerHTML = '<p class="col-span-4 text-center text-gray-400 mt-10 text-[10px] italic">Kulkas dan lemarimu kosong.</p>';
    }
  },

  renderPhoneInventory(filterType = 'food') {
    const container = document.getElementById("phone-inventory-list");
    const previewContainer = document.getElementById("phone-inventory-preview");
    
    // Update Tab UI
    document.getElementById("tab-phone-inv-food").classList.remove("highlight-blue", "text-white");
    document.getElementById("tab-phone-inv-nonfood").classList.remove("highlight-blue", "text-white");
    document.getElementById("tab-phone-inv-food").classList.add("text-gray-400");
    document.getElementById("tab-phone-inv-nonfood").classList.add("text-gray-400");
    
    if (filterType === 'food') {
        document.getElementById("tab-phone-inv-food").classList.add("highlight-blue", "text-white");
        document.getElementById("tab-phone-inv-food").classList.remove("text-gray-400");
    } else {
        document.getElementById("tab-phone-inv-nonfood").classList.add("highlight-blue", "text-white");
        document.getElementById("tab-phone-inv-nonfood").classList.remove("text-gray-400");
    }
    
    container.innerHTML = "";
    if (previewContainer) previewContainer.classList.add("hidden");
    
    let hasItems = false;
    
    GAME.constants.shopItems.filter(i => i.type === filterType).forEach((item) => {
      let count = GAME.state.inventory[item.id];
      if (count > 0) {
        hasItems = true;
        const el = document.createElement("div");
        el.className = "relative bg-black/40 rounded-xl border border-white/10 shadow-lg flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors aspect-square group";
        el.innerHTML = `
            <div class="w-full h-full p-2 flex flex-col items-center justify-center relative overflow-hidden">
                <span class="absolute text-2xl opacity-40 group-hover:opacity-10 transition-opacity">${item.icon || '📦'}</span>
                <img src="assets/images/item_${item.id}.png" class="w-full h-full object-contain z-10 drop-shadow-md" 
                     onerror="this.style.display='none'; this.previousElementSibling.classList.replace('opacity-40', 'opacity-100'); this.previousElementSibling.classList.replace('group-hover:opacity-10', 'group-hover:opacity-100');">
            </div>
            <div class="absolute top-1 right-1 bg-blue-500 text-white text-[8px] font-bold px-1 py-0.5 rounded-full shadow-md z-20 leading-none">x${count}</div>
        `;
        
        el.onclick = () => {
            if(!previewContainer) return;
            previewContainer.classList.remove("hidden");
            const img = document.getElementById("phone-inventory-img");
            img.src = `assets/images/item_${item.id}.png`;
            img.style.display = 'block';
            document.getElementById("phone-inventory-fallback").innerText = item.icon || '📦';
            
            document.getElementById("phone-inventory-name").innerText = item.name;
            
            let statsHtml = "";
            const btn = document.getElementById("phone-inventory-btn");
            
            if (item.type === 'food') {
                const hText = item.h !== 0 ? (item.h > 0 ? `+${item.h} H` : `${item.h} H`) : "";
                const eText = item.e !== 0 ? (item.e > 0 ? `+${item.e} E` : `${item.e} E`) : "";
                const sep = hText && eText ? ", " : "";
                statsHtml = `${hText}${sep}${eText}`;
                
                btn.classList.remove("hidden");
                btn.onclick = () => {
                    GAME.logic.useItem(item.id);
                    GAME.ui.renderPhoneInventory(filterType);
                };
            } else {
                statsHtml = item.desc || "Item Spesial";
                btn.classList.add("hidden");
            }
            document.getElementById("phone-inventory-stats").innerText = statsHtml;
        };
        
        container.appendChild(el);
      }
    });
    
    if (!hasItems) {
      container.innerHTML = '<p class="col-span-3 text-center text-gray-400 mt-6 text-[9px] italic">Tidak ada item.</p>';
    }
  },

  renderShop() {
    const container = document.getElementById("shop-list");
    container.innerHTML = "";
    // Change grid to 3 columns to make items more square-like and less stretched
    container.className = "overflow-y-auto flex-1 grid grid-cols-3 gap-2 pb-2 content-start";
    
    GAME.constants.shopItems.forEach((item) => {
      const el = document.createElement("div");
      // Flexible frame design with minimum height to prevent squishing
      el.className = "relative bg-black/40 p-2 rounded-xl border border-white/10 shadow-lg flex flex-col items-center justify-between overflow-hidden group min-h-[130px]";
      
      let statsHtml = "";
      if (item.type === 'food') {
          const hText = item.h !== 0 ? (item.h > 0 ? `+${item.h} H` : `${item.h} H`) : "";
          const eText = item.e !== 0 ? (item.e > 0 ? `+${item.e} E` : `${item.e} E`) : "";
          const sep = hText && eText ? " | " : "";
          statsHtml = `<div class="text-[8px] bg-green-900/40 border border-green-500/30 text-green-300 rounded px-1 font-medium tracking-wide leading-none mt-1 text-center">${hText}${sep}${eText}</div>`;
      }

      el.innerHTML = `
          <!-- Gambar Item / Fallback -->
          <div class="w-full h-12 bg-white/5 rounded-lg mb-1 flex items-center justify-center relative overflow-hidden shrink-0">
              <span class="absolute text-2xl opacity-30 group-hover:opacity-10 transition-opacity">${item.icon || '📦'}</span>
              <img src="assets/images/item_${item.id}.png" class="w-full h-full object-contain z-10 transition-transform duration-300 group-hover:scale-110 drop-shadow-md" 
                   onerror="this.style.display='none'; this.previousElementSibling.classList.replace('opacity-30', 'opacity-100'); this.previousElementSibling.classList.replace('group-hover:opacity-10', 'group-hover:opacity-100');">
          </div>
          
          <!-- Info Item -->
          <div class="w-full flex flex-col items-center justify-end flex-1 text-center mt-1 pb-1">
              <div class="font-bold text-[10px] tracking-wide text-white leading-tight line-clamp-1 w-full" title="${item.name}">${item.name}</div>
              <div class="text-[11px] font-bold text-yellow-400 mt-0.5 bg-black/40 px-1.5 rounded">$${item.price}</div>
              ${statsHtml}
          </div>

          <!-- Tombol Beli Kecil (Kanan Atas) -->
          <button class="absolute top-1 right-1 w-5 h-5 rounded-full bg-blue-500/80 hover:bg-blue-400 text-white flex items-center justify-center border border-white/20 shadow-md backdrop-blur-sm transition-all active:scale-90 z-20"
                  onclick="GAME.logic.buyItem('${item.id}')" title="Beli">
              <span class="text-[10px] font-bold leading-none">+</span>
          </button>
      `;
      container.appendChild(el);
    });
  },

  renderJobCards() {
    const container = document.getElementById("job-cards-container");
    if (!container) return;
    container.innerHTML = "";
    
    if (!GAME.ui.currentJobCards) {
        GAME.ui.currentJobCards = [...GAME.constants.jobList];
    }
    
    const cards = GAME.ui.currentJobCards;
    
    // Render top 3 for performance
    for (let i = Math.min(cards.length - 1, 2); i >= 0; i--) {
        const job = cards[i];
        const el = document.createElement("div");
        el.className = "absolute inset-0 m-auto w-4/5 h-4/5 bg-black/60 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl flex flex-col items-center justify-center p-4 transition-transform duration-300 transform";
        el.style.zIndex = cards.length - i;
        
        const scale = 1 - (i * 0.05);
        const translateY = i * 15;
        el.style.transform = `scale(${scale}) translateY(${translateY}px)`;
        
        el.innerHTML = `
            <div class="text-6xl mb-6">${job.icon}</div>
            <h3 class="text-lg font-bold text-white tracking-wide text-center leading-tight mb-3">${job.title}</h3>
            <div class="text-sm font-bold text-yellow-400 mb-3">${job.hours} Jam | $${job.pay}</div>
            <div class="text-[10px] text-red-300 text-center font-medium leading-relaxed bg-red-900/30 px-3 py-1.5 rounded-lg border border-red-500/20">
                ${job.energy}% E, ${job.hunger}% H
                ${job.composure !== 0 ? (job.composure > 0 ? ', +'+job.composure+'% C' : ', '+job.composure+'% C') : ''}
            </div>
        `;
        container.appendChild(el);
    }
  },

  swipeJobLeft() {
    if (!GAME.ui.currentJobCards || GAME.ui.currentJobCards.length === 0) return;
    const container = document.getElementById("job-cards-container");
    const cards = container.children;
    if (cards.length === 0) return;
    
    const topCard = cards[cards.length - 1]; // DOM order is reversed z-index
    topCard.style.transform = "translateX(-150%) rotate(-15deg)";
    topCard.style.opacity = "0";
    
    setTimeout(() => {
        const job = GAME.ui.currentJobCards.shift();
        GAME.ui.currentJobCards.push(job);
        GAME.ui.renderJobCards();
    }, 300);
  },
  
  swipeJobRight() {
    if (!GAME.ui.currentJobCards || GAME.ui.currentJobCards.length === 0) return;
    const container = document.getElementById("job-cards-container");
    const cards = container.children;
    if (cards.length === 0) return;
    
    const topCard = cards[cards.length - 1];
    topCard.style.transform = "translateX(150%) rotate(15deg)";
    topCard.style.opacity = "0";
    
    const job = GAME.ui.currentJobCards[0];
    
    setTimeout(() => {
        GAME.ui.showToast(`Mengambil pekerjaan ${job.title}...`);
        GAME.logic.work(job.id);
    }, 300);
  },

  renderMessageApp() {
      const container = document.getElementById("phone-message-list");
      container.innerHTML = "";
      
      if (!GAME.state.messages || GAME.state.messages.length === 0) {
          container.innerHTML = '<p class="text-center text-gray-400 mt-6 text-[9px] italic">Tidak ada pesan.</p>';
          return;
      }
      
      GAME.state.messages.forEach(msg => {
          const el = document.createElement("div");
          el.className = `p-2 rounded-xl border flex items-center gap-2 cursor-pointer transition-colors ${msg.isRead ? 'bg-black/40 border-white/10' : 'bg-white/10 border-blue-400/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]'}`;
          
          el.innerHTML = `
              <div class="relative w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center shrink-0 border border-white/20 overflow-hidden">
                  <span class="text-white text-xs font-bold z-10">${msg.sender.charAt(0).toUpperCase()}</span>
                  ${!msg.isRead ? '<div class="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border border-black z-20"></div>' : ''}
              </div>
              <div class="flex-1 min-w-0">
                  <div class="flex justify-between items-baseline mb-0.5">
                      <h4 class="text-[10px] font-bold text-white truncate pr-2">${msg.sender}</h4>
                      <span class="text-[8px] text-gray-400 shrink-0">Day ${msg.day}</span>
                  </div>
                  <p class="text-[9px] text-gray-300 truncate">${msg.text}</p>
              </div>
          `;
          
          el.onclick = () => GAME.logic.openMessageDetail(msg.id);
          container.appendChild(el);
      });
  },

  renderMessageDetail(msg) {
      document.getElementById("msg-detail-sender").innerText = msg.sender;
      document.getElementById("msg-detail-text").innerText = msg.text;
      
      const imgSlot = document.getElementById("msg-detail-image-slot");
      const img = document.getElementById("msg-detail-img");
      if (msg.img) {
          imgSlot.classList.remove("hidden");
          img.src = msg.img;
      } else {
          imgSlot.classList.add("hidden");
      }
      
      const actionContainer = document.getElementById("msg-detail-actions");
      actionContainer.innerHTML = "";
      
      if (msg.action && msg.action.type === 'pay_bill') {
          actionContainer.classList.remove("hidden");
          const btn = document.createElement("button");
          btn.className = "glass-button highlight-blue justify-center w-full !mb-0";
          btn.innerText = `Bayar $${msg.action.amount}`;
          btn.onclick = () => {
              GAME.logic.payBill(msg.id, msg.action.amount, msg.action.loanId);
          };
          actionContainer.appendChild(btn);
      } else {
          actionContainer.classList.add("hidden");
      }
  },

  renderPinjolApp() {
      const container = document.getElementById("phone-pinjol-list");
      container.innerHTML = "";
      
      if (!GAME.state.loans) GAME.state.loans = [];
      
      GAME.constants.pinjolOptions.forEach(loan => {
          const el = document.createElement("div");
          el.className = "bg-black/60 rounded-xl p-3 border border-red-500/20 shadow-md relative overflow-hidden group shrink-0";
          
          const activeLoan = GAME.state.loans.find(l => l.loanId === loan.id);
          
          if (activeLoan) {
              el.innerHTML = `
                  <div class="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500"></div>
                  <div class="flex justify-between items-center mb-1 pl-2">
                      <h4 class="text-xs font-bold text-white">$${loan.amount}</h4>
                      <span class="text-[8px] px-1.5 py-0.5 bg-yellow-500/20 text-yellow-300 rounded border border-yellow-500/30">AKTIF</span>
                  </div>
                  <div class="text-[9px] text-gray-300 mb-2 pl-2">
                      Sisa Tenor: ${activeLoan.maxTenor - activeLoan.paidTenor}x<br>
                      Tagihan Berikut: $${activeLoan.billAmount} dalam ${activeLoan.daysUntilNextBill} Hari
                  </div>
              `;
          } else {
              el.innerHTML = `
                  <div class="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></div>
                  <div class="flex justify-between items-center mb-1 pl-2">
                      <h4 class="text-xs font-bold text-white">$${loan.amount}</h4>
                  </div>
                  <div class="text-[9px] text-gray-300 mb-2 pl-2">
                      Cicilan: $${loan.billAmount} per ${loan.billInterval} hari<br>
                      Tenor: ${loan.maxTenor}x bayar
                  </div>
                  <button class="glass-button glass-button-mini w-full !mb-0 bg-green-600/30 text-green-100 border-green-500/50 hover:bg-green-600/50" onclick="GAME.logic.borrowPinjol('${loan.id}')">Ajukan Sekarang</button>
              `;
          }
          container.appendChild(el);
      });
  },

  renderSaveLoadList() {
    const container = document.getElementById("saveload-list");
    container.innerHTML = "";
    for (let i = 0; i < GAME.constants.saveSlotCount; i++) {
      const el = document.createElement("div");
      el.className =
        "flex justify-between items-center bg-white/10 p-2.5 rounded-[16px] border border-white/20 shadow-inner gap-2";

      const savedDataRaw = localStorage.getItem(`afterstroll_save_${i}`);
      let contentHTML = "";

      if (savedDataRaw) {
        const savedData = JSON.parse(savedDataRaw);
        const timeName = GAME.constants.timePhases[savedData.timePhaseIdx];
        contentHTML = `
                            <div class="flex-1">
                                <div class="font-bold text-xs tracking-wide text-green-300">Slot ${i + 1}</div>
                                <div class="text-[9px] text-gray-300 mt-0.5">Day ${savedData.day} - ${timeName}</div>
                            </div>
                            <button class="glass-button glass-button-mini !mb-0 highlight" onclick="GAME.logic.loadGame(${i})">Muat</button>
                        `;
      } else {
        contentHTML = `
                            <div class="flex-1">
                                <div class="font-bold text-xs tracking-wide text-gray-400">Slot ${i + 1} - Kosong</div>
                            </div>
                        `;
      }

      el.innerHTML = `
                        ${contentHTML}
                        <button class="glass-button glass-button-mini !mb-0 highlight-blue" onclick="GAME.logic.handleSaveClick(${i})">Simpan</button>
                    `;
      container.appendChild(el);
    }
  },

  renderSahamList() {
    const container = document.getElementById("saham-list");
    if (!container) return;
    container.innerHTML = "";

    GAME.constants.stocks.forEach((stock) => {
      const data = GAME.state.stockPrices[stock.id];
      const owned =
        (GAME.state.portfolio[stock.id] &&
          GAME.state.portfolio[stock.id].quantity) ||
        0;
      const diff = data.current - data.prev;
      const percent = data.prev > 0 ? ((diff / data.prev) * 100).toFixed(2) : 0;

      let trendColor = "text-gray-400";
      let trendIcon = "-";
      if (diff > 0) {
        trendColor = "text-green-400";
        trendIcon = "▲";
      } else if (diff < 0) {
        trendColor = "text-red-400";
        trendIcon = "▼";
      }

      const el = document.createElement("div");
      el.className =
        "bg-white/10 p-3 rounded-[24px] border border-white/20 shadow-inner cursor-pointer hover:bg-white/20 transition-all";
      el.onclick = () => GAME.logic.openSahamDetail(stock.id);
      el.innerHTML = `
                        <div class="flex justify-between items-center">
                            <div class="flex-1">
                                <div class="font-bold text-sm tracking-wide">${stock.id} <span class="text-[11px] text-gray-300 font-normal ml-1">${stock.name}</span></div>
                                <div class="text-[11px] text-gray-400 mt-1">Owned: <span class="${owned > 0 ? "text-blue-300 font-bold" : ""}">${owned}</span></div>
                            </div>
                            <div class="text-right w-16">
                                <div class="font-bold text-base text-white">$${Math.floor(data.current)}</div>
                                <div class="text-[11px] font-bold ${trendColor} mt-0.5">${trendIcon} ${Math.abs(percent)}%</div>
                            </div>
                        </div>
                    `;
      container.appendChild(el);
    });
  },

  renderSahamDetail() {
    const id = GAME.state.activeStockId;
    if (!id) return;
    const stock = GAME.constants.stocks.find((s) => s.id === id);
    const data = GAME.state.stockPrices[id];
    const portfolioData = GAME.state.portfolio[id] || {
      quantity: 0,
      totalCost: 0,
    };
    const owned = portfolioData.quantity;

    document.getElementById("saham-detail-title").innerText =
      `${stock.id} - ${stock.name}`;
    document.getElementById("saham-detail-price").innerText =
      `$${Math.floor(data.current)}`;
    document.getElementById("saham-detail-owned").innerText = `${owned} Lembar`;

    let avgBuyPrice = 0;
    let profitLoss = 0;
    const profitEl = document.getElementById("saham-detail-profit");

    if (owned > 0 && portfolioData.totalCost > 0) {
      avgBuyPrice = portfolioData.totalCost / owned;
      profitLoss = (data.current - avgBuyPrice) * owned;
    }

    document.getElementById("saham-detail-avg-buy").innerText =
      `$${avgBuyPrice.toFixed(2)}`;
    profitEl.innerText = `${profitLoss >= 0 ? "+" : ""}$${profitLoss.toFixed(2)}`;
  
    profitEl.classList.remove(
      "text-green-400",
      "text-red-400",
      "text-gray-400",
    );

    const totalValEl = document.getElementById("saham-detail-total-value");
    if (owned > 0) {
      const totalValue = owned * data.current;
      totalValEl.innerText = `$${Math.floor(totalValue)}`;
      totalValEl.classList.remove("hidden", "text-green-400", "text-red-400", "text-gray-400");
      
      if (profitLoss > 0) {
        profitEl.classList.add("text-green-400");
        totalValEl.classList.add("text-green-400");
      } else if (profitLoss < 0) {
        profitEl.classList.add("text-red-400");
        totalValEl.classList.add("text-red-400");
      } else {
        profitEl.classList.add("text-gray-400");
        totalValEl.classList.add("text-gray-400");
      }
    } else {
      totalValEl.classList.add("hidden");
      profitEl.classList.add("text-gray-400");
    }
    this.renderStockChart(id, "saham-chart");
  },

  renderStockChart(stockId, canvasId) {
    if (window.sahamChartInstance) {
      window.sahamChartInstance.destroy();
    }

    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const data = GAME.state.stockPrices[stockId].history || [];
    if (data.length < 2) return;

    const isUp = data.length >= 2 
      ? data[data.length - 1] >= data[data.length - 2]
      : data[data.length - 1] >= data[0];
    const lineColor = isUp ? "#4ade80" : "#f87171";
    const gradientStartColor = isUp
      ? "rgba(74, 222, 128, 0.5)"
      : "rgba(248, 113, 113, 0.5)";

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.clientHeight);
    gradient.addColorStop(0, gradientStartColor);
    gradient.addColorStop(1, "rgba(0,0,0,0.0)");

    const timeLabels = ["00.00", "04.00", "08.00", "12.00", "16.00", "20.00"];
    const labels = data.map((_, i) => {
      if (data.length <= 1) return "";
      const step = (data.length - 1) / 5;
      for (let j = 0; j < 6; j++) {
        if (Math.round(j * step) === i) {
          return timeLabels[j];
        }
      }
      return "";
    });

    window.sahamChartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            borderColor: lineColor,
            backgroundColor: gradient,
            borderWidth: 2.5,
            pointRadius: 0,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: {
          x: { 
            display: true,
            grid: {
              color: (context) => context.tick && context.tick.label ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              drawBorder: false
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.5)',
              font: { size: 7 },
              maxRotation: 0,
              autoSkip: false
            }
          },
          y: { display: false, beginAtZero: false, grace: "20%" },
        },
        animation: { duration: 500, easing: "easeInOutQuad" },
      },
    });
  },

  renderChoices(choices) {
    const container = document.getElementById("story-choices-container");
    const dialogueUI = document.getElementById("story-dialogue-ui");
    container.innerHTML = "";
    container.classList.remove("hidden");

    choices.forEach((choice, index) => {
      const btn = document.createElement("button");
      btn.className = "story-choice-btn animate-choice-in";
      btn.style.animationDelay = `${index * 0.1}s`;
      btn.innerText = choice.text;
      btn.onclick = (e) => {
        e.stopPropagation();
        GAME.logic.handleStoryChoice(choice);
      };
      container.appendChild(btn);
    });

    requestAnimationFrame(() => {
      if (dialogueUI) {
        const choicesHeight = container.offsetHeight;
        dialogueUI.style.transform = `translateY(-${choicesHeight + 15}px)`;
      }
    });
  },

  hideChoices() {
    const container = document.getElementById("story-choices-container");
    const dialogueUI = document.getElementById("story-dialogue-ui");
    container.innerHTML = "";
    container.classList.add("hidden");

    if (dialogueUI) {
      dialogueUI.style.transform = "translateY(0)";
    }
  },

  initWinBars() {
    GAME.state.winState = { wg: 5, wb: 0, clicks: 0, active: true };
    document.getElementById("win-bar-blue").style.opacity = "1";
    document.getElementById("win-bar-orange").style.opacity = "1";
    this.updateWinBars();
  },

  updateWinBars() {
    const { wb, wg } = GAME.state.winState;
    document.getElementById("win-fill-blue").style.height =
      `${GAME.clamp(wb, 0, 100)}%`;
    document.getElementById("win-fill-orange").style.height =
      `${GAME.clamp(wg, 0, 100)}%`;
  },

  hideWinBars() {
    GAME.state.winState.active = false;
    document.getElementById("win-bar-blue").style.opacity = "0";
    document.getElementById("win-bar-orange").style.opacity = "0";
  },

  renderPhoneStats() {
    const { stats, npcs, gender } = GAME.state;
    const container = document.getElementById("phone-stats-container");
    if (!container) return;

    if (!GAME.state.npcs) {
      GAME.state.npcs = {
        chloe: {
          id: "chloe",
          name: "Chloe",
          isMet: true,
          heart: stats.heart_chloe || 50,
          storyPhase: 1,
          maxPhase: 20,
          lastChange: 0,
        },
        sean: {
          id: "sean",
          name: "Sean",
          isMet: true,
          heart: 50,
          storyPhase: 0,
          maxPhase: 20,
          lastChange: 0,
        },
      };
    }

    GAME.state.npcs.chloe.heart = stats.heart_chloe;

    const formatChange = (val) => {
      if (val > 0) return `<span class="text-blue-400">+${val}</span>`;
      if (val < 0) return `<span class="text-red-400">${val}</span>`;
      return `<span class="text-gray-400">0</span>`;
    };

    let html = "";
    let panelCount = 0;

    html += `
                    <div class="w-full shrink-0 snap-center px-0.5">
                        <div class="glass-hud flex flex-col p-2.5">
                            <div class="flex justify-between items-center pb-1.5 border-b border-white/10 mb-1.5">
                                <div class="text-center w-full">
                                    <div class="text-gray-300 text-[8px] mb-0.5 uppercase tracking-wider">Wisdom</div>
                                    <div class="text-sm font-bold">${stats.wis}%</div>
                                </div>
                                <div class="w-[1px] h-6 bg-white/20"></div>
                                <div class="text-center w-full">
                                    <div class="text-gray-300 text-[8px] mb-0.5 uppercase tracking-wider">Charisma</div>
                                    <div class="text-sm font-bold">${stats.cha}%</div>
                                </div>
                            </div>
                            <div class="text-center text-[7px] text-gray-300 uppercase tracking-widest font-medium">
                                History: Wis ${formatChange(stats.last_wis_change || 0)} | Cha ${formatChange(stats.last_cha_change || 0)}
                            </div>
                        </div>
                    </div>
                `;
    panelCount++;

    Object.values(GAME.state.npcs).forEach((npc) => {
      if (npc.isMet) {
        let statName = "";
        let statValue = npc.heart;
        let icon = "";

        if (npc.id === "chloe") {
          statName = gender === "Pria" ? "Heart" : "Friendship";
          icon = gender === "Pria" ? "❤️" : "🤝";
        } else if (npc.id === "sean") {
          statName = gender === "Pria" ? "Friendship" : "Heart";
          icon = gender === "Pria" ? "🤝" : "❤️";
        }

        html += `
                            <div class="w-full shrink-0 snap-center px-0.5">
                                <div class="glass-hud flex flex-col p-2.5">
                                    <div class="flex justify-between items-center pb-1.5 border-b border-white/10 mb-1.5">
                                        <div class="text-left w-full pl-1">
                                            <div class="text-white text-[10px] font-bold uppercase tracking-wider mb-0.5">${npc.name}</div>
                                            <div class="text-[7px] text-gray-400">Story Phase: <span class="text-white">${npc.storyPhase}/${npc.maxPhase}</span></div>
                                        </div>
                                        <div class="text-right w-full pr-1">
                                            <div class="text-gray-300 text-[7px] mb-0.5 uppercase tracking-wider">${statName}</div>
                                            <div class="text-sm font-bold flex items-center justify-end gap-1.5">${statValue} <span class="text-[10px]">${icon}</span></div>
                                        </div>
                                    </div>
                                    <div class="text-center text-[7px] text-gray-300 uppercase tracking-widest font-medium">
                                        History: Last Seq ${formatChange(npc.lastChange || 0)}
                                    </div>
                                </div>
                            </div>
                        `;
        panelCount++;
      }
    });

    container.innerHTML = html;

    const dotsContainer = document.getElementById("phone-stats-dots");
    if (dotsContainer) {
      let dotsHtml = "";
      for (let i = 0; i < panelCount; i++) {
        dotsHtml += `<div class="w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === 0 ? "bg-white" : "bg-white/30"}"></div>`;
      }
      dotsContainer.innerHTML = dotsHtml;
    }
  },

  scrollPhoneStats(dir) {
    const container = document.getElementById("phone-stats-container");
    if (!container) return;
    const width = container.offsetWidth;
    container.scrollBy({ left: dir * width, behavior: "smooth" });
  },

  updateCarouselDots() {
    const container = document.getElementById("phone-stats-container");
    const dotsContainer = document.getElementById("phone-stats-dots");
    if (!container || !dotsContainer) return;

    const index = Math.round(container.scrollLeft / container.offsetWidth);
    const dots = dotsContainer.children;

    for (let i = 0; i < dots.length; i++) {
      if (i === index) {
        dots[i].classList.replace("bg-white/30", "bg-white");
      } else {
        dots[i].classList.replace("bg-white", "bg-white/30");
      }
    }
  },
};
