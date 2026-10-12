"use client";

/**
 * PixelCharacter — two ORIGINAL chibi pixel-art characters, hand-crafted as
 * inline SVG rect grids (crisp pixels, no AI imagery, no film likenesses).
 *
 * - "boy": city schoolboy archetype — tousled ink-navy hair, amber scarf,
 *   steel-blue blazer. Original design, original uniform colors.
 * - "girl": small-town schoolgirl archetype — chestnut hair with a side braid
 *   tied by a red cord, moss-green uniform. Original design, original colors.
 *
 * Poses: "idle" | "wave". They evoke two people connected across distance
 * without reproducing any film character.
 */

import React from "react";

export type CharacterId = "boy" | "girl";
export type CharacterPose = "idle" | "wave";

const PALETTE: Record<string, string> = {
  H: "#2e3a52", // boy hair (ink navy)
  h: "#5a6f96", // boy hair highlight
  S: "#ffd9b3", // skin
  s: "#eba671", // skin shade
  E: "#33302e", // eyes
  J: "#31435f", // boy blazer (steel blue)
  W: "#f4efe4", // shirt
  P: "#3c4048", // trousers
  B: "#23262d", // boy shoes
  A: "#e8a13c", // amber scarf
  G: "#6b4a33", // girl hair (chestnut)
  g: "#9a7350", // girl hair highlight
  R: "#d8364f", // red cord
  U: "#3f6b52", // girl uniform (moss green)
  C: "#f2ead8", // collar cream
  K: "#7a5a3a", // skirt
  L: "#4a3a2c", // girl shoes
};

type Sprite = string[];

const BOY_IDLE: Sprite = [
  "....HHHHHH....",
  "..HHHHHHHHHH..",
  "..HhhHHHHHHH..",
  "..HHHHHHHHHH..",
  "..HHHHHHHHHH..",
  "...SSSSSSSS...",
  "...SESSSSES...",
  "...SSSSSSSS...",
  "...SSAAAASS...",
  "..JJJJJJJJJJ..",
  "..JJJWWWWJJJ..",
  "..sJJWWWWJJs..",
  "..sJJWWWWJJs..",
  "....PPPPPP....",
  "....PPP.PPP...",
  "....BBB.BBB...",
];

const BOY_WAVE: Sprite = [
  "....HHHHHH....",
  "..HHHHHHHHHH..",
  "..HhhHHHHHHH..",
  "..HHHHHHHHHH..",
  "..HHHHHHHHHH..",
  "...SSSSSSSSss.",
  "...SESSSSESJJ.",
  "...SSSSSSJJJ..",
  "...SSAAAJJJJ..",
  "..JJJJJJJJJJ..",
  "..JJJWWWWJJJ..",
  "..sJJWWWWJJJ..",
  "..sJJWWWWJJJ..",
  "....PPPPPP....",
  "....PPP.PPP...",
  "....BBB.BBB...",
];

const GIRL_IDLE: Sprite = [
  "....GGGGGG....",
  "..GGGGGGGGGG..",
  "..GggGGGGGGG..",
  "..GGGGGGGGGG..",
  "..GGGGGGGGGG..",
  "...SSSSSSSS...",
  "...SESSSSES...",
  "...SSSSSSSS...",
  "GG.SSSSSSSS.GG",
  "RG.SSSSSSSS.GG",
  "GGGUUUUUUUUGGG",
  "RGUUCCCCCCUUGG",
  "GGGUUUUUUUUGGG",
  "RGUUUUUUUUUUGG",
  "..KKKKKKKKKK..",
  "..SLL....LLS..",
];

const GIRL_WAVE: Sprite = [
  "....GGGGGG....",
  "..GGGGGGGGGG..",
  "..GggGGGGGGG..",
  "..GGGGGGGGGG..",
  "..GGGGGGGGGG..",
  "...SSSSSSSS.s.",
  "...SESSSSESUU.",
  "...SSSSSSSUU..",
  "GG.SSSSSSUUUGG",
  "RG.SSSSSSUUGGG",
  "GGGUUUUUUUUGGG",
  "RGUUCCCCCCUUGG",
  "GGGUUUUUUUUGGG",
  "RGUUUUUUUUUUGG",
  "..KKKKKKKKKK..",
  "..SLL....LLS..",
];

const SPRITES: Record<CharacterId, Record<CharacterPose, Sprite>> = {
  boy: { idle: BOY_IDLE, wave: BOY_WAVE },
  girl: { idle: GIRL_IDLE, wave: GIRL_WAVE },
};

export const SPRITE_WIDTH = 14;
export const SPRITE_HEIGHT = 16;

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
      SPRITES[id][pose].forEach((row, i) => {
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
