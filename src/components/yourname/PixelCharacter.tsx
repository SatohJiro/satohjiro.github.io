"use client";

/**
 * PixelCharacter — two chibi pixel-art characters, hand-crafted as inline SVG
 * rect grids (crisp pixels, no AI imagery).
 *
 * Redesigned 2026-10-12 to match the user's reference images: a tousled
 * brown-haired schoolboy in white shirt + green striped tie, and a black-bob
 * schoolgirl with red cord hair-ties, white blouse + red bow and pleated skirt.
 *
 * Poses: "idle" | "wave".
 */

import React from "react";

export type CharacterId = "boy" | "girl";
export type CharacterPose = "idle" | "wave";

const PALETTE: Record<string, string> = {
  H: "#6e4a2f", // boy hair (brown)
  D: "#4a2f1d", // boy hair dark
  h: "#a07a4e", // boy hair light
  K: "#26232e", // girl hair (near-black)
  k: "#4a4458", // girl hair light
  d: "#17141d", // girl hair dark
  S: "#ffd9b3", // skin
  s: "#e8a06a", // skin shade / blush
  M: "#b65a4a", // mouth
  E: "#2b2b38", // boy eyes
  N: "#6b4226", // girl eyes (brown)
  W: "#ffffff", // eye shine
  T: "#f7f4ec", // shirt / blouse white
  t: "#d9d2c0", // shirt shade
  G: "#2f8f5b", // tie green
  g: "#e8e4d8", // tie stripe
  R: "#d8364f", // red (cord / bow)
  P: "#3b3f4b", // boy trousers
  B: "#26262c", // boy shoes
  V: "#2e3444", // skirt navy
  v: "#232837", // skirt pleat shade
  O: "#4a3320", // girl shoes
};

type Sprite = string[];

const BOY_IDLE: Sprite = [
  ".....HHHHHHHHHH.....",
  "...HHHHHHHHHHHHHH...",
  "..HHhHHHHHHHHHhHHH..",
  ".HHHHHHHHHHHHHHHHHH.",
  ".HDHHHHHHHHHHHHHHDH.",
  "..HHHHHHHHHHHHHHHH..",
  "..HHHHHHHHHHHHHHHH..",
  "..HHHSSSSSSSSSSHHH..",
  "..HHHSSSSSSSSSSHHH..",
  "..HHHSEWSSSSEWSHHH..",
  "..HHHSEESSSSEESHHH..",
  "..HHHsSSSSSSSSsHHH..",
  "..HHHSSSSMMSSSSHHH..",
  "...HHSSSSSSSSSSHH...",
  ".....SSSSSS.........",
  "....TTTTTTTTTTTT....",
  "....TTTTTGgTTTTT....",
  "....TTTTTGGTTTTT....",
  "....TTTTTGGTTTTT....",
  "....TTTTTGGTTTTT....",
  "....TTTTTGGTTTTT....",
  "..sTTTTTTTTTTTTTTs..",
  "..sTTTTTTTTTTTTTTs..",
  "....PPPPPPPPPPPP....",
  "....PPPPPPPPPPPP....",
  "....PPPPP..PPPPP....",
  "....PPPPP..PPPPP....",
  "....BBBBB..BBBBB....",
];

const BOY_WAVE: Sprite = [
  ".....HHHHHHHHHH.....",
  "...HHHHHHHHHHHHHH...",
  "..HHhHHHHHHHHHhHHH..",
  ".HHHHHHHHHHHHHHHHHH.",
  ".HDHHHHHHHHHHHHHHDH.",
  "..HHHHHHHHHHHHHHHH..",
  "..HHHHHHHHHHHHHHHH..",
  "..HHHSSSSSSSSSSHHH..",
  "..HHHSSSSSSSSSSHHH..",
  "..HHHSEWSSSSEWSHHH..",
  "..HHHSEESSSSEESHHH..",
  "..HHHsSSSSSSSSsHHH..",
  "..HHHSSSSMMSSSSHHH..",
  "...HHSSSSSSSSSSHH...",
  ".....SSSSSS.........",
  "....TTTTTTTTTTTT....",
  "....TTTTTGGTTTTT....",
  "....TTTTTGGTTTTT....",
  "....TTTTTGGTTTTTs...",
  "....TTTTTGGTTTTs....",
  "....TTTTTGTTTTs.....",
  "....TTTTTTTTTTs.....",
  "..sTTTTTTTTTTTTT....",
  "....PPPPPPPPPPPP....",
  "....PPPPPPPPPPPP....",
  "....PPPPP..PPPPP....",
  "....PPPPP..PPPPP....",
  "....BBBBB..BBBBB....",
];

const GIRL_IDLE: Sprite = [
  ".....KKKKKKKKKK.....",
  "...KKKKKKKKKKKKKK...",
  "..KKkKKKKKKKKKKkKK..",
  ".KKKKKKKKKKKKKKKKKK.",
  ".KKKKKKKKKKKKKKKKKK.",
  ".KKKKKKKKKKKKKKKKKK.",
  ".KKKKKKKKKKKKKKKKKK.",
  "RRKKKSSSSSSSSSSKKKRR",
  "RRKKKSSSSSSSSSSKKKRR",
  ".RKKKSNWSSSSNWSKKKR.",
  ".RKKKSNNSSSSNNSKKKR.",
  "..KKKsSSSSSSSSsKKK..",
  "..KKKSSSSMMSSSSKKK..",
  "..KKKSSSSSSSSSSKKK..",
  ".....SSSSSS.........",
  "....TTTTTTTTTTTT....",
  "...TTTRRRRRRTTTTT...",
  ".....TTTTRRTTTTTT...",
  "....TTTTTTTTTTTT....",
  "....TTTTTTTTTTTT....",
  "..sTTTTTTTTTTTTTTs..",
  "..sTTTTTTTTTTTTTTs..",
  "...VVVVVVVVVVVVVV...",
  "...VVvVVVVVVVVvVV...",
  "...VVVVVVVVVVVVVV...",
  "....SSSSS..SSSSS....",
  "....TTTTT..TTTTT....",
  "....OOOOO..OOOOO....",
];

const GIRL_WAVE: Sprite = [
  ".....KKKKKKKKKK.....",
  "...KKKKKKKKKKKKKK...",
  "..KKkKKKKKKKKKKkKK..",
  ".KKKKKKKKKKKKKKKKKK.",
  ".KKKKKKKKKKKKKKKKKK.",
  ".KKKKKKKKKKKKKKKKKK.",
  ".KKKKKKKKKKKKKKKKKK.",
  "RRKKKSSSSSSSSSSKKKRR",
  "RRKKKSSSSSSSSSSKKKRR",
  ".RKKKSNWSSSSNWSKKKR.",
  ".RKKKSNNSSSSNNSKKKR.",
  "..KKKsSSSSSSSSsKKK..",
  "..KKKSSSSMMSSSSKKK..",
  "..KKKSSSSSSSSSSKKK..",
  ".....SSSSSS.........",
  "....TTTTTTTTTTTT....",
  "...TTTRRRRRRTTTTT...",
  ".....TTTTRRTTTTTT...",
  "...sTTTTTTTTTTTT....",
  "....sTTTTTTTTTT.....",
  ".....sTTTTTTTT......",
  "......sTTTTTT.......",
  "...VVVVVVVVVVVVVV...",
  "...VVvVVVVVVVVvVV...",
  "...VVVVVVVVVVVVVV...",
  "....SSSSS..SSSSS....",
  "....TTTTT..TTTTT....",
  "....OOOOO..OOOOO....",
];

const SPRITES: Record<CharacterId, Record<CharacterPose, Sprite>> = {
  boy: { idle: BOY_IDLE, wave: BOY_WAVE },
  girl: { idle: GIRL_IDLE, wave: GIRL_WAVE },
};

export const SPRITE_WIDTH = 20;
export const SPRITE_HEIGHT = 28;

export interface PixelCharacterProps {
  id: CharacterId;
  pose?: CharacterPose;
  /** bounceKey: change to re-trigger the bounce animation (e.g. on beat) */
  bounceKey?: number | string;
  className?: string;
  label: string;
}

/** Render one sprite as crisp SVG rects. Exported for tests/QA tooling. */
export function SpriteSvg({ sprite }: { sprite: Sprite }) {
  const rects: React.ReactNode[] = [];
  sprite.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const ch = row[x];
      if (ch === ".") continue;
      const fill = PALETTE[ch];
      if (!fill) continue;
      rects.push(
        <rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill={fill} />,
      );
    }
  });
  return (
    <svg
      viewBox={`0 0 ${SPRITE_WIDTH} ${SPRITE_HEIGHT}`}
      shapeRendering="crispEdges"
      role="img"
      aria-hidden="true"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      {rects}
    </svg>
  );
}

export function PixelCharacter({
  id,
  pose = "idle",
  bounceKey,
  className = "",
  label,
}: PixelCharacterProps) {
  return (
    <div
      className={`yn-pixel-character ${className}`}
      style={{ imageRendering: "pixelated" }}
      title={label}
      aria-label={label}
      role="img"
    >
      {/* key change re-triggers the bounce animation */}
      <div key={String(bounceKey ?? pose)} className="yn-bounce">
        <SpriteSvg sprite={SPRITES[id][pose]} />
      </div>
    </div>
  );
}

/** Exposed for QA tooling: validate every row is exactly SPRITE_WIDTH wide. */
export function validateSprites(): string[] {
  const errors: string[] = [];
  (Object.keys(SPRITES) as CharacterId[]).forEach((id) => {
    (Object.keys(SPRITES[id]) as CharacterPose[]).forEach((pose) => {
      const sprite = SPRITES[id][pose];
      if (sprite.length !== SPRITE_HEIGHT) {
        errors.push(`${id}/${pose}: height ${sprite.length}, expected ${SPRITE_HEIGHT}`);
      }
      sprite.forEach((row, i) => {
        if (row.length !== SPRITE_WIDTH) {
          errors.push(`${id}/${pose} row ${i}: width ${row.length}`);
        }
        for (const ch of row) {
          if (ch !== "." && !PALETTE[ch]) errors.push(`${id}/${pose} row ${i}: unknown key '${ch}'`);
        }
      });
    });
  });
  return errors;
}
