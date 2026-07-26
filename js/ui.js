export const ui = {
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

    const daytimeStr = `${GAME.constants.timePhases[timePhaseIdx]}, Day ${day}`;
    document
      .querySelectorAll(".hud-ui-daytime")
      .forEach((el) => (el.innerText = daytimeStr));
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

    GAME.ui.updateBackground();
  },

  renderInventory() {
    const container = document.getElementById("kitchen-inventory");
    container.innerHTML = "";
    let hasItems = false;
    GAME.constants.shopItems.forEach((item) => {
      let count = GAME.state.inventory[item.id];
      if (count > 0) {
        hasItems = true;
        const el = document.createElement("div");
        el.className =
          "flex justify-between items-center bg-white/10 p-2.5 rounded-[16px] border border-white/20 shadow-inner";
        el.innerHTML = `
                            <div class="flex items-center gap-2.5">
                                <span class="text-2xl">${item.icon}</span>
                                <div>
                                    <div class="font-bold text-xs tracking-wide">${item.name} <span class="text-blue-300 ml-1">x${count}</span></div>
                                    <div class="text-[9px] text-gray-300 mt-0.5">+${item.h}% H ${item.e > 0 ? ", +" + item.e + "% E" : ""}</div>
                                </div>
                            </div>
                            <button class="glass-button glass-button-mini !mb-0 highlight-blue" onclick="GAME.logic.useItem('${item.id}')">Pakai</button>
                        `;
        container.appendChild(el);
      }
    });
    if (!hasItems)
      container.innerHTML =
        '<p class="text-center text-gray-400 mt-10 text-[10px] italic">Kulkas dan lemarimu kosong.</p>';
  },

  renderShop() {
    const container = document.getElementById("shop-list");
    container.innerHTML = "";
    GAME.constants.shopItems.forEach((item) => {
      const el = document.createElement("div");
      el.className =
        "flex justify-between items-center bg-white/10 p-2.5 rounded-[16px] border border-white/20 shadow-inner";
      el.innerHTML = `
                        <div class="flex items-center gap-2.5">
                            <span class="text-2xl">${item.icon}</span>
                            <div>
                                <div class="font-bold text-xs tracking-wide">${item.name} <span class="text-yellow-400 ml-1">$${item.price}</span></div>
                                <div class="text-[9px] text-gray-300 mt-0.5">+${item.h}% H ${item.e > 0 ? ", +" + item.e + "% E" : ""}</div>
                            </div>
                        </div>
                        <button class="glass-button glass-button-mini !mb-0 highlight-blue" onclick="GAME.logic.buyItem('${item.id}')">Beli</button>
                    `;
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
    if (profitLoss > 0) {
      profitEl.classList.add("text-green-400");
    } else if (profitLoss < 0) {
      profitEl.classList.add("text-red-400");
    } else {
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

    window.sahamChartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map(() => ""),
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
          x: { display: false },
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
