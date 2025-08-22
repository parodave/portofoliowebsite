import React from "react";

type SkillCardProps = {
  name: string;
  icon: React.ReactNode; // emoji, SVG, icône lucide
};

const SkillCard: React.FC<SkillCardProps> = ({ name, icon }) => {
  return (
    <div
      tabIndex={0}
      aria-label={name}
      className="
        group relative select-none
        rounded-xl border border-black/5 dark:border-white/10
        bg-white/80 dark:bg-white/5 backdrop-blur
        shadow-sm hover:shadow-md transition
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 dark:focus-visible:ring-white/40
        w-[120px] h-[120px] p-3
        flex flex-col items-center justify-center text-center
      "
    >
      <div className="mb-2 flex items-center justify-center">
        <div className="
          h-10 w-10 rounded-full
          bg-black/5 dark:bg-white/10
          flex items-center justify-center
          transition-transform motion-safe:group-hover:scale-105
        ">
          <span className="text-xl leading-none">{icon}</span>
        </div>
      </div>
      <div
        className="
          text-[13px] font-medium text-gray-800 dark:text-gray-200
          leading-tight line-clamp-2
        "
        title={name}
      >
        {name}
      </div>

      {/* halo subtil au hover */}
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-black/0 
                      group-hover:ring-2 group-hover:ring-black/10 dark:group-hover:ring-white/15 transition" />
    </div>
  );
};

export default SkillCard;
