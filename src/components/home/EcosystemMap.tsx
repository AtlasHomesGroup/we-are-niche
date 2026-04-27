"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import {
  ecosystemMapData,
  type EcosystemBranch,
  type EcosystemBranchId,
  type EcosystemNode,
} from "@/lib/ecosystem-map-data";

const VB = 1000;
const HUB = VB / 2;
const BRANCH_CENTERS: Record<EcosystemBranchId, number> = {
  ecosystem: -90,
  community: 30,
  acquisitions: 150,
};
const TRANSITION_OVERSHOOT = "cubic-bezier(0.34, 1.2, 0.64, 1)";

const arcSpread = (n: number) => (n === 1 ? 0 : n === 2 ? 38 : 70);

interface LaidOutNode extends EcosystemNode {
  angle: number;
  branchId: EcosystemBranchId;
  indexInBranch: number;
}

interface LaidOutBranch extends EcosystemBranch {
  center: number;
  spread: number;
  start: number;
  end: number;
  nodes: LaidOutNode[];
}

export function EcosystemMap() {
  const [hovered, setHovered] = useState<EcosystemBranchId | null>(null);
  const [focused, setFocused] = useState<EcosystemBranchId | null>(null);
  const [drift, setDrift] = useState(0);
  const [viewport, setViewport] = useState({ w: 1200 });
  const [reduceMotion, setReduceMotion] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const branchRefs = useRef<Record<EcosystemBranchId, HTMLDivElement | null>>({
    ecosystem: null,
    community: null,
    acquisitions: null,
  });

  useEffect(() => {
    const update = () => {
      if (!stageRef.current) return;
      setViewport({ w: stageRef.current.getBoundingClientRect().width });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduceMotion(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (focused || reduceMotion) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      setDrift(((t - start) / 1000) * 1.2);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [focused, reduceMotion]);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" && focused) {
        setFocused(null);
        const ref = branchRefs.current[focused];
        ref?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focused]);

  const isMobile = viewport.w < 720;
  const R = isMobile ? 240 : 270;

  const layout: LaidOutBranch[] = useMemo(() => {
    return ecosystemMapData.branches.map((b) => {
      const center = BRANCH_CENTERS[b.id];
      const spread = arcSpread(b.nodes.length);
      const start = center - spread / 2;
      const end = center + spread / 2;
      const nodes: LaidOutNode[] = b.nodes.map((n, i) => {
        const t = b.nodes.length === 1 ? 0 : i / (b.nodes.length - 1);
        const angle = start + t * spread;
        return { ...n, angle, branchId: b.id, indexInBranch: i };
      });
      return { ...b, center, spread, start, end, nodes };
    });
  }, []);

  const focusedBranch = focused ? layout.find((b) => b.id === focused) ?? null : null;

  return (
    <section
      ref={stageRef}
      onClick={(e) => {
        if (e.target === e.currentTarget) setFocused(null);
      }}
      className="ecosystem-map relative overflow-hidden"
      style={{
        background: "var(--niche-paper)",
        color: "var(--niche-ink)",
        fontFamily: "var(--font-sans-body)",
        padding: isMobile ? "32px 0 80px" : "56px 0 100px",
      }}
    >
      <Header focused={!!focused} isMobile={isMobile} />

      <div
        className="relative mx-auto"
        style={{
          width: "100%",
          maxWidth: isMobile ? "100%" : 980,
          aspectRatio: "1 / 1",
          marginTop: isMobile ? 16 : 32,
        }}
      >
        <svg
          viewBox={`0 0 ${VB} ${VB}`}
          role="img"
          aria-labelledby="ecosystem-map-title ecosystem-map-desc"
          style={{ width: "100%", height: "100%", display: "block" }}
        >
          <title id="ecosystem-map-title">The Niche ecosystem map</title>
          <desc id="ecosystem-map-desc">
            One central Niche hub with three branches — Ecosystem, Community, and
            Acquisitions — connecting eight ventures around a single ring.
          </desc>

          <defs>
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--niche-coral-glow)" />
              <stop offset="60%" stopColor="var(--niche-coral-glow-mid)" />
              <stop offset="100%" stopColor="var(--niche-coral-glow-out)" />
            </radialGradient>
            <pattern id="dotgrid" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.7" fill="var(--niche-dot)" />
            </pattern>
          </defs>

          <rect width={VB} height={VB} fill="url(#dotgrid)" opacity="0.45" />
          <circle cx={HUB} cy={HUB} r={200} fill="url(#centerGlow)" />

          <g
            style={{
              transform: `rotate(${drift}deg)`,
              transformOrigin: `${HUB}px ${HUB}px`,
              opacity: focused ? 0.2 : 1,
              transition: "opacity 600ms ease",
            }}
          >
            <circle
              cx={HUB}
              cy={HUB}
              r={R}
              fill="none"
              stroke="var(--niche-line)"
              strokeWidth="0.8"
              strokeDasharray="1 5"
              opacity="0.7"
            />
          </g>

          {layout.map((b) => {
            const isFocus = focused === b.id;
            const isHover = hovered === b.id && !focused;
            const dim = !!focused && !isFocus;
            const start = b.start - 4;
            const end = b.end + 4;
            return (
              <g key={`arc-${b.id}`}>
                <path
                  d={describeArc(HUB, HUB, R, start, end)}
                  fill="none"
                  stroke="var(--niche-coral)"
                  strokeWidth={isFocus ? 2.5 : isHover ? 2 : 1.4}
                  opacity={dim ? 0.22 : isFocus ? 1 : 0.7}
                  strokeLinecap="round"
                  style={{ transition: "all 500ms ease" }}
                />
                <ArcCap angle={start} dim={dim} focus={isFocus} R={R} />
                <ArcCap angle={end} dim={dim} focus={isFocus} R={R} />
              </g>
            );
          })}

          {!reduceMotion &&
            layout.map((b) => {
              const isFocus = focused === b.id;
              const isHover = hovered === b.id && !focused;
              if (!isFocus && !isHover) return null;
              const rad = (b.center * Math.PI) / 180;
              const x2 = HUB + R * Math.cos(rad);
              const y2 = HUB + R * Math.sin(rad);
              const x1 = HUB + 168 * Math.cos(rad);
              const y1 = HUB + 168 * Math.sin(rad);
              return (
                <g key={`pulse-${b.id}`}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="var(--niche-coral)"
                    strokeWidth="1"
                    strokeDasharray={isFocus ? undefined : "2 4"}
                    opacity={isFocus ? 0.85 : 0.5}
                  />
                  <circle r={isFocus ? 4 : 3} fill="var(--niche-coral-deep)">
                    <animateMotion
                      dur={isFocus ? "1.4s" : "1.8s"}
                      repeatCount="indefinite"
                      path={`M ${x1} ${y1} L ${x2} ${y2}`}
                    />
                    <animate
                      attributeName="opacity"
                      values={isFocus ? "0;1;1;0" : "0;0.8;0.8;0"}
                      dur={isFocus ? "1.4s" : "1.8s"}
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              );
            })}

          <g
            onClick={(e) => {
              e.stopPropagation();
              if (focused) setFocused(null);
            }}
            style={{ cursor: focused ? "pointer" : "default" }}
          >
            <circle
              cx={HUB}
              cy={HUB}
              r={160}
              fill="var(--niche-paper)"
              stroke="var(--niche-coral)"
              strokeWidth="1"
              style={{
                opacity: focused ? 0.85 : 1,
                transition: "opacity 500ms ease",
              }}
            />
            <circle
              cx={HUB}
              cy={HUB}
              r={146}
              fill="none"
              stroke="var(--niche-coral)"
              strokeWidth="0.6"
              strokeDasharray="2 4"
              opacity="0.55"
            />
          </g>

          {!reduceMotion &&
            layout.flatMap((b) => {
              const isFocusBranch = focused === b.id;
              const isHoverBranch = hovered === b.id && !focused;
              const dim = !!focused && !isFocusBranch;
              const start = b.start - 6;
              const end = b.end + 6;
              const path = describeArc(HUB, HUB, R, start, end);
              const count = isFocusBranch ? 5 : 3;
              const baseDur = isFocusBranch ? 2.2 : isHoverBranch ? 3.6 : 5.4;
              return Array.from({ length: count }).map((_, i) => {
                const delay = -(i * baseDur) / count;
                return (
                  <g
                    key={`trav-${b.id}-${i}`}
                    style={{
                      opacity: dim ? 0 : isFocusBranch ? 1 : 0.85,
                      transition: "opacity 500ms ease",
                    }}
                  >
                    <circle
                      r={isFocusBranch ? 3.5 : 2.4}
                      fill="var(--niche-coral-deep)"
                      opacity={isFocusBranch ? 0.9 : 0.65}
                    >
                      <animateMotion
                        dur={`${baseDur}s`}
                        repeatCount="indefinite"
                        begin={`${delay}s`}
                        path={path}
                        rotate="auto"
                      />
                    </circle>
                    {isFocusBranch && (
                      <circle r="6" fill="var(--niche-coral)" opacity="0.18">
                        <animateMotion
                          dur={`${baseDur}s`}
                          repeatCount="indefinite"
                          begin={`${delay + 0.05}s`}
                          path={path}
                        />
                      </circle>
                    )}
                  </g>
                );
              });
            })}

          {layout.flatMap((b) =>
            b.nodes.map((n, i) => {
              const isFocusBranch = focused === b.id;
              const dim = !!focused && !isFocusBranch;
              const rad = (n.angle * Math.PI) / 180;
              const x = HUB + R * Math.cos(rad);
              const y = HUB + R * Math.sin(rad);
              return (
                <g
                  key={`vdot-${b.id}-${i}`}
                  style={{
                    opacity: dim ? 0.3 : 1,
                    transition: "opacity 500ms ease",
                  }}
                >
                  <circle
                    cx={x}
                    cy={y}
                    r={isFocusBranch ? 7 : 5}
                    fill="var(--niche-paper)"
                    stroke="var(--niche-coral)"
                    strokeWidth="1.4"
                    style={{ transition: "r 500ms ease" }}
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r={isFocusBranch ? 3.5 : 2.2}
                    fill="var(--niche-coral)"
                    style={{ transition: "r 500ms ease" }}
                  />
                </g>
              );
            }),
          )}
        </svg>

        <HubOverlay focused={!!focused} onClose={() => setFocused(null)} />

        {layout.map((b) => (
          <BranchLabel
            key={b.id}
            ref={(el) => {
              branchRefs.current[b.id] = el;
            }}
            branch={b}
            R={R}
            isFocus={focused === b.id}
            isHover={hovered === b.id && !focused}
            isDim={!!focused && focused !== b.id}
            onHover={(v) => setHovered(v ? b.id : null)}
            onClick={() => setFocused(focused === b.id ? null : b.id)}
            isMobile={isMobile}
          />
        ))}

        {layout.flatMap((b) =>
          b.nodes.map((n, i) => (
            <VentureCard
              key={`vc-${b.id}-${i}`}
              node={n}
              branch={b}
              indexInBranch={i}
              R={R}
              isFocus={focused === b.id}
              isDim={!!focused && focused !== b.id}
              isMobile={isMobile}
            />
          )),
        )}
      </div>

      <DescriptionPanel
        branch={focusedBranch}
        onClose={() => setFocused(null)}
        isMobile={isMobile}
      />
    </section>
  );
}

function Header({ focused, isMobile }: { focused: boolean; isMobile: boolean }) {
  return (
    <div
      className="relative mx-auto text-center"
      style={{
        maxWidth: 880,
        padding: isMobile ? "0 24px 8px" : "0 48px 8px",
        zIndex: 2,
        opacity: focused ? 0.4 : 1,
        transition: "opacity 600ms ease",
        pointerEvents: focused ? "none" : "auto",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-sans-body)",
          fontWeight: 600,
          fontSize: isMobile ? 32 : "clamp(36px, 4.6vw, 56px)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          margin: 0,
          color: "var(--niche-ink)",
        }}
      >
        {ecosystemMapData.headlineLead}
        <span style={{ color: "var(--niche-coral-deep)" }}>
          {ecosystemMapData.headlineEmphasis}
        </span>
        {ecosystemMapData.headlineTrail}
      </h2>
    </div>
  );
}

function ArcCap({
  angle,
  dim,
  focus,
  R,
}: {
  angle: number;
  dim: boolean;
  focus: boolean;
  R: number;
}) {
  const rad = (angle * Math.PI) / 180;
  const inner = R - 8;
  const outer = R + 8;
  const x1 = HUB + inner * Math.cos(rad);
  const y1 = HUB + inner * Math.sin(rad);
  const x2 = HUB + outer * Math.cos(rad);
  const y2 = HUB + outer * Math.sin(rad);
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="var(--niche-coral-deep)"
      strokeWidth={focus ? 1.5 : 1}
      opacity={dim ? 0.2 : 0.55}
      style={{ transition: "all 500ms ease" }}
    />
  );
}

function HubOverlay({ focused, onClose }: { focused: boolean; onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        if (focused) onClose();
      }}
      aria-label={focused ? "Back to map overview" : "Niche hub"}
      tabIndex={focused ? 0 : -1}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(-50%, -50%) scale(${focused ? 0.88 : 1})`,
        width: 220,
        background: "transparent",
        border: 0,
        textAlign: "center",
        cursor: focused ? "pointer" : "default",
        pointerEvents: focused ? "auto" : "none",
        opacity: focused ? 0.7 : 1,
        transition: `transform 500ms ${TRANSITION_OVERSHOOT}, opacity 500ms ease`,
        padding: 0,
      }}
    >
      <Image
        src="/brand/niche-stacked-logo.png"
        alt="Niche"
        width={356}
        height={355}
        priority
        style={{ width: 180, height: "auto", display: "block", margin: "0 auto" }}
      />
      {focused && (
        <span
          style={{
            display: "block",
            marginTop: 14,
            fontFamily: "var(--font-mono-display)",
            fontSize: 9,
            letterSpacing: "0.26em",
            color: "var(--niche-coral-deep)",
            textTransform: "uppercase",
          }}
        >
          ← back to map
        </span>
      )}
    </button>
  );
}

interface BranchLabelProps {
  branch: LaidOutBranch;
  R: number;
  isFocus: boolean;
  isHover: boolean;
  isDim: boolean;
  isMobile: boolean;
  onHover: (v: boolean) => void;
  onClick: () => void;
  ref?: (el: HTMLDivElement | null) => void;
}

function BranchLabel({
  branch,
  R,
  isFocus,
  isHover,
  isDim,
  isMobile,
  onHover,
  onClick,
  ref,
}: BranchLabelProps) {
  const rad = (branch.center * Math.PI) / 180;
  const labelR = R + (isMobile ? 130 : 175);
  const x = HUB + labelR * Math.cos(rad);
  const y = HUB + labelR * Math.sin(rad);
  const xPct = (x / VB) * 100;
  const yPct = (y / VB) * 100;

  const cosA = Math.cos(rad);
  const sinA = Math.sin(rad);
  let translate = "translate(-50%, -50%)";
  let textAlign: CSSProperties["textAlign"] = "center";
  if (Math.abs(cosA) > 0.7) {
    if (cosA > 0) {
      translate = "translate(0, -50%)";
      textAlign = "left";
    } else {
      translate = "translate(-100%, -50%)";
      textAlign = "right";
    }
  } else if (sinA > 0.5) {
    translate = "translate(-50%, 0%)";
  } else if (sinA < -0.5) {
    translate = "translate(-50%, -100%)";
  }

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      aria-pressed={isFocus}
      aria-label={`${branch.label} branch — ${branch.tagline}`}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onFocus={() => onHover(true)}
      onBlur={() => onHover(false)}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onKeyDown={onKey}
      className="niche-focus-ring"
      style={{
        position: "absolute",
        left: `${xPct}%`,
        top: `${yPct}%`,
        transform: `${translate} scale(${isFocus ? 1.25 : isHover ? 1.05 : 1})`,
        transformOrigin: "center",
        width: isMobile ? 200 : 230,
        textAlign,
        cursor: "pointer",
        userSelect: "none",
        opacity: isDim ? 0.3 : 1,
        transition: `all 600ms ${TRANSITION_OVERSHOOT}`,
        zIndex: isFocus ? 10 : 5,
        pointerEvents: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 10,
          justifyContent:
            textAlign === "center"
              ? "center"
              : textAlign === "left"
                ? "flex-start"
                : "flex-end",
          marginBottom: 4,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-sans-body)",
            fontWeight: 600,
            fontSize: isMobile ? 22 : 26,
            color: "var(--niche-coral-deep)",
            lineHeight: 1,
            letterSpacing: "-0.01em",
          }}
        >
          {branch.number}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono-display)",
            fontSize: isMobile ? 10 : 11,
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: "var(--niche-coral-deep)",
            fontWeight: 500,
          }}
        >
          {branch.label}
        </span>
      </div>

      <div
        style={{
          fontFamily: "var(--font-sans-body)",
          fontWeight: 500,
          fontSize: isMobile ? 13 : 14.5,
          lineHeight: 1.3,
          color: "var(--niche-ink)",
          opacity: isHover || isFocus ? 1 : 0.8,
          transition: "opacity 300ms ease",
        }}
      >
        {branch.tagline}
      </div>

      {!isFocus && (
        <div
          style={{
            marginTop: 6,
            fontFamily: "var(--font-mono-display)",
            fontSize: 9,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--niche-ink-faint)",
            opacity: isHover ? 1 : 0,
            transform: `translateY(${isHover ? 0 : -3}px)`,
            transition: "all 300ms ease",
          }}
        >
          Click to explore →
        </div>
      )}
    </div>
  );
}

function VentureCard({
  node,
  branch,
  indexInBranch,
  R,
  isFocus,
  isDim,
  isMobile,
}: {
  node: LaidOutNode;
  branch: LaidOutBranch;
  indexInBranch: number;
  R: number;
  isFocus: boolean;
  isDim: boolean;
  isMobile: boolean;
}) {
  const rad = (node.angle * Math.PI) / 180;
  const cardR = R + (isMobile ? 50 : 62);
  const x = HUB + cardR * Math.cos(rad);
  const y = HUB + cardR * Math.sin(rad);
  const xPct = (x / VB) * 100;
  const yPct = (y / VB) * 100;

  const cosA = Math.cos(rad);
  const sinA = Math.sin(rad);
  let translate = "translate(-50%, -50%)";
  let textAlign: CSSProperties["textAlign"] = "center";
  if (Math.abs(cosA) > Math.abs(sinA)) {
    if (cosA > 0) {
      translate = "translate(0, -50%)";
      textAlign = "left";
    } else {
      translate = "translate(-100%, -50%)";
      textAlign = "right";
    }
  } else {
    if (sinA > 0) {
      translate = "translate(-50%, 0)";
    } else {
      translate = "translate(-50%, -100%)";
    }
  }

  return (
    <Link
      href={node.route}
      onClick={(e) => e.stopPropagation()}
      className="niche-focus-ring"
      style={{
        position: "absolute",
        left: `${xPct}%`,
        top: `${yPct}%`,
        transform: `${translate} scale(${isFocus ? 1.15 : isDim ? 0.92 : 1})`,
        width: isMobile ? 110 : 138,
        textAlign,
        opacity: isDim ? 0.32 : 1,
        transition: `all 500ms ${TRANSITION_OVERSHOOT}`,
        zIndex: isFocus ? 8 : 3,
        textDecoration: "none",
        color: "inherit",
        display: "block",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono-display)",
          fontSize: isMobile ? 7.5 : 8.5,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: isFocus ? "var(--niche-coral-deep)" : "var(--niche-ink-faint)",
          marginBottom: 3,
          transition: "color 400ms ease",
        }}
      >
        {branch.number}.{String(indexInBranch + 1).padStart(2, "0")}
      </div>
      <div
        style={{
          fontFamily: "var(--font-sans-body)",
          fontWeight: 600,
          fontSize: isMobile ? 13 : 14.5,
          lineHeight: 1.2,
          color: "var(--niche-ink)",
          marginBottom: 2,
          letterSpacing: "-0.005em",
        }}
      >
        {node.name}
      </div>
      <div
        style={{
          fontFamily: "var(--font-sans-body)",
          fontSize: isMobile ? 9.5 : 10.5,
          color: "var(--niche-ink-soft)",
          lineHeight: 1.3,
        }}
      >
        {node.role}
      </div>
    </Link>
  );
}

function DescriptionPanel({
  branch,
  onClose,
  isMobile,
}: {
  branch: LaidOutBranch | null;
  onClose: () => void;
  isMobile: boolean;
}) {
  const visible = !!branch;
  const [shown, setShown] = useState<LaidOutBranch | null>(branch);

  // Sync truthy branch into local state during render (React's "store info from
  // previous renders" pattern). Keep stale value visible during the exit animation.
  if (branch && branch !== shown) setShown(branch);

  useEffect(() => {
    if (branch) return;
    const t = window.setTimeout(() => setShown(null), 500);
    return () => window.clearTimeout(t);
  }, [branch]);

  if (!shown) return null;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="false"
      aria-label={`${shown.label} branch detail`}
      style={{
        position: "fixed",
        left: "50%",
        bottom: isMobile ? 16 : 32,
        transform: `translate(-50%, ${visible ? 0 : 20}px)`,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        width: "calc(100% - 32px)",
        maxWidth: isMobile ? 420 : 560,
        background: "var(--niche-paper-warm)",
        border: "1px solid var(--niche-coral)",
        borderRadius: 4,
        padding: isMobile ? "18px 22px" : "22px 28px",
        boxShadow: "var(--niche-shadow-panel)",
        transition: `all 500ms ${TRANSITION_OVERSHOOT}`,
        zIndex: 30,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 14,
          marginBottom: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <span
            style={{
              fontFamily: "var(--font-sans-body)",
              fontWeight: 600,
              fontSize: 22,
              color: "var(--niche-coral-deep)",
              lineHeight: 1,
              letterSpacing: "-0.01em",
            }}
          >
            {shown.number}
          </span>
          <span style={eyebrowStyle()}>{shown.label}</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{
            background: "transparent",
            border: "1px solid var(--niche-line)",
            borderRadius: 999,
            width: 26,
            height: 26,
            cursor: "pointer",
            color: "var(--niche-ink-soft)",
            fontSize: 14,
            fontFamily: "var(--font-mono-display)",
            lineHeight: 1,
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          ×
        </button>
      </div>

      <div
        style={{
          fontFamily: "var(--font-sans-body)",
          fontWeight: 600,
          fontSize: isMobile ? 20 : 22,
          lineHeight: 1.2,
          color: "var(--niche-ink)",
          letterSpacing: "-0.012em",
          marginBottom: 10,
        }}
      >
        {shown.tagline}
      </div>

      <p
        style={{
          fontSize: isMobile ? 13.5 : 14.5,
          lineHeight: 1.55,
          color: "var(--niche-ink-soft)",
          margin: 0,
        }}
      >
        {shown.description}
      </p>

      <ul
        style={{
          marginTop: 14,
          paddingTop: 12,
          borderTop: "1px dotted var(--niche-line)",
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          listStyle: "none",
          paddingLeft: 0,
        }}
      >
        {shown.nodes.map((n) => (
          <li key={n.slug}>
            <Link
              href={n.route}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 10px",
                borderRadius: 999,
                border: "1px solid var(--niche-line)",
                background: "var(--niche-paper)",
                fontSize: 12,
                color: "var(--niche-ink)",
                textDecoration: "none",
                fontFamily: "var(--font-sans-body)",
              }}
            >
              {n.name}
              <span aria-hidden style={{ color: "var(--niche-coral-deep)" }}>
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div
        style={{
          marginTop: 12,
          display: "flex",
          justifyContent: "space-between",
          gap: 10,
          fontFamily: "var(--font-mono-display)",
          fontSize: 9,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--niche-ink-faint)",
        }}
      >
        <span>{shown.nodes.length} ventures</span>
        <span style={{ opacity: 0.7 }}>esc · click hub to close</span>
      </div>
    </div>
  );
}

function eyebrowStyle(extra: CSSProperties = {}): CSSProperties {
  return {
    fontFamily: "var(--font-mono-display)",
    fontSize: 11,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "var(--niche-coral-deep)",
    fontWeight: 500,
    display: "inline-block",
    ...extra,
  };
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const a = (angleDeg * Math.PI) / 180.0;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
) {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArc = endAngle - startAngle <= 180 ? "0" : "1";
  return ["M", start.x, start.y, "A", r, r, 0, largeArc, "1", end.x, end.y].join(" ");
}
