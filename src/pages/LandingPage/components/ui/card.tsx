import React from "react";

// Card genérico seguindo o layout enviado (cores, títulos e mockups)
const Card = ({
  title,
  desc,
  tone,
  img,
  alt,
  imgPosition,
  cardStyle,
}: {
  title: string;
  desc: string;
  tone: "pink" | "lilac" | "purple" | "dark";
  img?: string;
  alt?: string;
  imgPosition?: { bottom: number; right: number; width: number; rotate: number };
  cardStyle: { minHeight: number; borderRadius: number; width?: number };
}) => {

  const isGlass = !img;

  const toneMap = {
    pink: { solid: "bg-surface-pink", glass: "bg-surface-pink/30" },
    lilac: { solid: "bg-surface-indigo", glass: "bg-surface-indigo/30" },
    purple: { solid: "bg-surface-purple", glass: "bg-surface-purple/30" },
    dark: { solid: "bg-card", glass: "bg-card/30" },
  };

  const baseClasses = "relative p-6 md:p-8 text-foreground/95";
  const toneClass = isGlass ? toneMap[tone].glass : toneMap[tone].solid;
  const effectClasses = isGlass ? "backdrop-blur-lg border border-white/10" : "";

  return (
    <article
      className={`${baseClasses} ${toneClass} ${effectClasses}`}
      style={{
        minHeight: `${cardStyle.minHeight}px`,
        borderRadius: `${cardStyle.borderRadius}px`,
        width: `${cardStyle.width || 100}%`,
      }}
    >
      <div className="max-w-prose relative z-10">
        <h3 className="text-lg md:text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm md:text-base opacity-90 leading-relaxed">{desc}</p>
      </div>

      {img && alt && (
        <>
          {/* Wrapper de Recorte para a imagem desktop */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ borderRadius: `${cardStyle.borderRadius}px`, overflow: 'hidden' }}>
            <img
              src={img}
              alt={alt}
              loading="lazy"
              width={900}
              height={1900}
              className="hidden md:block absolute object-contain pointer-events-none select-none drop-shadow-2xl"
              style={{
                bottom: `${imgPosition?.bottom}px`,
                right: `${imgPosition?.right}px`,
                width: `${imgPosition?.width}%`,
                maxHeight: '85%',
                transform: `rotate(${imgPosition?.rotate}deg)`,
              }}
            />
          </div>

          {/* Versão mobile: mockup abaixo do texto */}
          <img
            src={img}
            alt={alt}
            loading="lazy"
            width={900}
            height={1900}
            className="block md:hidden mt-5 w-full object-contain pointer-events-none select-none drop-shadow-2xl"
          />
        </>
      )}
    </article>
  );
};

export default Card;
