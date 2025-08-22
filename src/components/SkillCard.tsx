import React from "react";

type SkillCardProps = {
  name: string;
  icon: React.ReactNode; // emoji, <svg>, icône Lucide…
};

const SkillCard: React.FC<SkillCardProps> = ({ name, icon }) => {
  return (
    <div
      tabIndex={0}
      aria-label={name}
      className="
        group relative rounded-2xl p-[2px]
        transition-transform duration-300 hover:scale-[1.02]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40
      "
    >
      {/* Anneau stories en niveaux de gris */}
      <div
        className="
          pointer-events-none absolute inset-0 rounded-2xl
          before:content-[''] before:absolute before:inset-0 before:rounded-2xl
          before:bg-[conic-gradient(at_50%_50%,#f3f4f6,#9ca3af,#4b5563,#111827,#4b5563,#9ca3af,#f3f4f6)]
          before:opacity-90
          after:content-[''] after:absolute after:inset-[2px] after:rounded-2xl
          after:bg-card-light dark:after:bg-card-dark
        "
        aria-hidden="true"
      />
      {/* Carte verre dépoli */}
      <div
        className="
          relative rounded-2xl
          bg-card-light dark:bg-card-dark
          backdrop-blur-md shadow-lg
          border border-border-light dark:border-border-dark
          px-5 py-6 flex flex-col items-center text-center
        "
      >
        {/* Icône avec micro-impulsion au hover (motion-safe) */}
        <div className="relative mb-3 motion-safe:group-hover:animate-pulse-subtle">
          <span className="
            absolute inset-0 rounded-full
            bg-[conic-gradient(at_50%_50%,#f3f4f6,#9ca3af,#4b5563,#111827,#4b5563,#9ca3af,#f3f4f6)]
            animate-spin-slow opacity-70
          " />
          <div className="relative m-[3px] h-12 w-12 rounded-full bg-white dark:bg-black
                          flex items-center justify-center text-black dark:text-white shadow-sm">
            <span className="text-2xl leading-none select-none">{icon}</span>
          </div>
        </div>
        {/* Label: lift + glow discret (motion-safe) */}
        <div className="
          text-sm font-medium text-gray-700 dark:text-gray-200
          motion-safe:group-hover:animate-lift
          group-hover:drop-shadow-glow transition-[filter] duration-200
        ">
          {name}
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
