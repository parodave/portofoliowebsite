"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";

// Types
type DragonMood = "happy" | "tired" | "sleeping" | "energetic" | "curious";

interface DragonState {
  mood: DragonMood;
  xp: number;
  level: number;
  energy: number;
  lastVisit: number;
  birthDate: number;
}

// --- Dragon SVG ---
const DragonSVG: React.FC<{
  mood: DragonMood;
  level: number;
  isDark: boolean;
}> = ({ mood, level, isDark }) => {
  const scale = 1 + level * 0.1;
  const hue = 0; // blanc/noir neutre

  const eyeVariants = { open: { scaleY: 1 }, blink: { scaleY: 0.1 } };
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(true);
      const to = setTimeout(() => setIsBlinking(false), 150);
      return () => clearTimeout(to);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <svg
      width={80 * scale}
      height={80 * scale}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Corps */}
      <ellipse
        cx="50"
        cy="55"
        rx="25"
        ry="20"
        fill={`hsl(${hue}, 0%, ${isDark ? "70%" : "30%"})`}
      />
      {/* Tête */}
      <circle
        cx="50"
        cy="35"
        r="18"
        fill={`hsl(${hue}, 0%, ${isDark ? "75%" : "40%"})`}
      />
      {/* Cornes */}
      <path d="M 42 25 L 40 15 L 44 23 Z" fill={`hsl(${hue}, 0%, 45%)`} />
      <path d="M 58 25 L 60 15 L 56 23 Z" fill={`hsl(${hue}, 0%, 45%)`} />

      {/* Ailes */}
      <motion.ellipse
        cx="35"
        cy="50"
        rx="12"
        ry="18"
        fill={`hsl(${hue}, 0%, ${isDark ? "60%" : "50%"})`}
        opacity="0.8"
        animate={{
          rotate: mood === "energetic" ? [-5, 5, -5] : [0, 0, 0],
          y: mood === "energetic" ? [-2, 2, -2] : [0, 0, 0],
        }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.ellipse
        cx="65"
        cy="50"
        rx="12"
        ry="18"
        fill={`hsl(${hue}, 0%, ${isDark ? "60%" : "50%"})`}
        opacity="0.8"
        animate={{
          rotate: mood === "energetic" ? [5, -5, 5] : [0, 0, 0],
          y: mood === "energetic" ? [-2, 2, -2] : [0, 0, 0],
        }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Yeux */}
      <motion.ellipse
        cx="44"
        cy="32"
        rx="3"
        ry="4"
        fill={isDark ? "#1a1a1a" : "#2a2a2a"}
        variants={eyeVariants}
        animate={isBlinking || mood === "sleeping" ? "blink" : "open"}
        transition={{ duration: 0.1 }}
      />
      <motion.ellipse
        cx="56"
        cy="32"
        rx="3"
        ry="4"
        fill={isDark ? "#1a1a1a" : "#2a2a2a"}
        variants={eyeVariants}
        animate={isBlinking || mood === "sleeping" ? "blink" : "open"}
        transition={{ duration: 0.1 }}
      />

      {/* Reflets */}
      {mood !== "sleeping" && (
        <>
          <circle cx="44.5" cy="31" r="1" fill="white" opacity="0.8" />
          <circle cx="56.5" cy="31" r="1" fill="white" opacity="0.8" />
        </>
      )}

      {/* Bouche */}
      <path
        d={
          mood === "happy" || mood === "energetic"
            ? "M 44 40 Q 50 44 56 40"
            : mood === "tired"
            ? "M 44 40 Q 50 39 56 40"
            : "M 44 40 Q 50 40 56 40"
        }
        stroke={isDark ? "#1a1a1a" : "#2a2a2a"}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Queue */}
      <path
        d="M 70 60 Q 85 65 88 75"
        stroke={`hsl(${hue}, 0%, ${isDark ? "70%" : "30%"})`}
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />

      {/* Pattes */}
      <circle cx="40" cy="72" r="4" fill={`hsl(${hue}, 0%, 45%)`} />
      <circle cx="60" cy="72" r="4" fill={`hsl(${hue}, 0%, 45%)`} />
    </svg>
  );
};

// --- DragonPet ---
const DragonPet: React.FC = () => {
  const [dragonState, setDragonState] = useState<DragonState>({
    mood: "happy",
    xp: 0,
    level: 1,
    energy: 100,
    lastVisit: Date.now(),
    birthDate: Date.now(),
  });

  const [isDark, setIsDark] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState("");
  const controls = useAnimation();

  // Dark mode (matchMedia + cleanup cross-browser)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setIsDark(mq.matches);
    handler();
    mq.addEventListener?.("change", handler);
    // @ts-ignore (Safari old)
    mq.addListener?.(handler);
    return () => {
      mq.removeEventListener?.("change", handler);
      // @ts-ignore
      mq.removeListener?.(handler);
    };
  }, []);

  // Load state
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("dragonPetState");
    if (stored) {
      const parsed: DragonState = JSON.parse(stored);
      const timeDiff = Date.now() - parsed.lastVisit;
      const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      let newEnergy = parsed.energy - Math.floor(timeDiff / (1000 * 60 * 5));
      newEnergy = Math.max(0, Math.min(100, newEnergy));
      let newMood: DragonMood = parsed.mood;
      if (newEnergy < 20) newMood = "sleeping";
      else if (newEnergy < 50) newMood = "tired";
      const bonusXP = daysPassed > 0 ? daysPassed * 10 : 0;
      const newXP = parsed.xp + bonusXP;
      const newLevel = Math.floor(newXP / 100) + 1;

      setDragonState({
        ...parsed,
        energy: newEnergy,
        mood: newMood,
        xp: newXP,
        level: newLevel,
        lastVisit: Date.now(),
      });

      if (daysPassed > 0) showMessage(`Je t'ai manqué ! +${bonusXP} XP`);
    } else {
      const initialState: DragonState = {
        mood: "happy",
        xp: 0,
        level: 1,
        energy: 100,
        lastVisit: Date.now(),
        birthDate: Date.now(),
      };
      setDragonState(initialState);
      localStorage.setItem("dragonPetState", JSON.stringify(initialState));
    }
  }, []);

  // Auto-save
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saveInterval = setInterval(() => {
      localStorage.setItem("dragonPetState", JSON.stringify(dragonState));
    }, 5000);
    return () => clearInterval(saveInterval);
  }, [dragonState]);

  // Inactivité => dodo
  useEffect(() => {
    if (typeof window === "undefined") return;
    let inactivityTimer: ReturnType<typeof setTimeout>;
    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => updateMood("sleeping"), 60_000);
    };
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);
    resetTimer();
    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
    };
  }, []);

  // Régénération d’énergie
  useEffect(() => {
    const energyInterval = setInterval(() => {
      setDragonState((prev) => {
        const energy = Math.min(100, prev.energy + 1);
        let mood = prev.mood;
        if (energy > 80 && prev.mood === "tired") mood = "happy";
        if (energy > 50 && prev.mood === "sleeping") mood = "tired";
        return { ...prev, energy, mood };
      });
    }, 10_000);
    return () => clearInterval(energyInterval);
  }, []);

  const updateMood = useCallback((m: DragonMood) => {
    setDragonState((p) => ({ ...p, mood: m }));
  }, []);

  const updateXP = useCallback(
    (amount: number) => {
      setDragonState((prev) => {
        const newXP = prev.xp + amount;
        const newLevel = Math.floor(newXP / 100) + 1;
        const leveledUp = newLevel > prev.level;
        if (leveledUp) {
          showMessage(`Niveau ${newLevel} ! 🎉`);
          controls.start({
            scale: [1, 1.3, 1],
            rotate: [0, 360, 0],
            transition: { duration: 0.8 },
          });
        }
        return { ...prev, xp: newXP, level: newLevel };
      });
    },
    [controls]
  );

  const showMessage = (text: string) => {
    setTooltipText(text);
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  };

  const handleClick = () => {
    if (dragonState.energy < 10) {
      showMessage("Zzz... trop fatigué");
      return;
    }
    updateMood("happy");
    updateXP(5);
    setDragonState((prev) => ({ ...prev, energy: Math.max(0, prev.energy - 2) }));
    controls.start({ y: [0, -20, 0], transition: { duration: 0.5 } });
    showMessage("+5 XP ! 💜");
  };

  const handleHover = () => {
    if (dragonState.mood !== "sleeping") updateMood("curious");
  };
  const handleHoverEnd = () => {
    if (dragonState.mood === "curious") {
      updateMood(
        dragonState.energy > 70 ? "energetic" : dragonState.energy > 40 ? "happy" : "tired"
      );
    }
  };

  const getMoodAnimation = () =>
    dragonState.mood === "happy"
      ? { y: [0, -5, 0] }
      : dragonState.mood === "energetic"
      ? { y: [0, -10, 0], x: [0, 3, -3, 0] }
      : dragonState.mood === "tired"
      ? { y: [0, 2, 0] }
      : dragonState.mood === "sleeping"
      ? { y: [0, 3, 0] }
      : { y: 0 };

  // Reset via console
  useEffect(() => {
    if (typeof window === "undefined") return;
    (window as any).resetDragon = () => {
      const initial: DragonState = {
        mood: "happy",
        xp: 0,
        level: 1,
        energy: 100,
        lastVisit: Date.now(),
        birthDate: Date.now(),
      };
      setDragonState(initial);
      localStorage.setItem("dragonPetState", JSON.stringify(initial));
      console.log("🐉 Dragon réinitialisé !");
    };
  }, []);

  const daysOld = Math.floor((Date.now() - dragonState.birthDate) / (1000 * 60 * 60 * 24));

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      {/* Tooltip */}
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-full mb-2 right-0 bg-purple-600 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap shadow-lg"
        >
          {tooltipText}
        </motion.div>
      )}

      {/* Dragon Container (accessible) */}
      <motion.div
        role="button"
        aria-label="Dragon virtuel"
        tabIndex={0}
        animate={controls}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative cursor-pointer outline-none"
        onClick={handleClick}
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverEnd}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleClick()}
      >
        <motion.div
          animate={getMoodAnimation()}
          transition={{
            duration: dragonState.mood === "energetic" ? 0.5 : 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative"
          style={{ filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.15))" }}
        >
          <DragonSVG mood={dragonState.mood} level={dragonState.level} isDark={isDark} />
        </motion.div>

        {/* Barre d'énergie */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${Math.max(0, Math.min(100, dragonState.energy))}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Stats : visibles au survol du conteneur via group-hover */}
      <div className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-3 text-xs space-y-1 min-w-[140px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="font-semibold text-purple-600 dark:text-purple-400">
          Niveau {dragonState.level}
        </div>
        <div className="text-gray-600 dark:text-gray-300">XP: {dragonState.xp % 100}/100</div>
        <div className="text-gray-600 dark:text-gray-300">Énergie: {dragonState.energy}%</div>
        <div className="text-gray-500 dark:text-gray-400 text-[10px]">
          {daysOld} jour{daysOld > 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
};

export default DragonPet;
