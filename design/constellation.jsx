// Orbital Constellation — interactive
// All 8 ventures live on the ring permanently, grouped into 3 branch arcs
// with visible gap dividers + branch labels in the gaps.
// Click a branch label to focus: that branch's arc + ventures emphasize,
// other branches dim. A 2-sentence description fades in below.
// Return: click hub, click outside, or Esc.

const { useState, useEffect, useRef, useMemo } = React;

const Constellation = ({ data }) => {
  const [hovered, setHovered] = useState(null);
  const [focused, setFocused] = useState(null);
  const [drift, setDrift] = useState(0);
  const [viewport, setViewport] = useState({ w: 1200, h: 800 });
  const stageRef = useRef(null);

  // Track viewport for responsive scaling
  useEffect(() => {
    const update = () => {
      if (stageRef.current) {
        const r = stageRef.current.getBoundingClientRect();
        setViewport({ w: r.width, h: Math.max(r.height, window.innerHeight) });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Ambient drift
  useEffect(() => {
    if (focused) return;
    let raf, start = performance.now();
    const tick = (t) => {
      setDrift(((t - start) / 1000) * 1.2);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [focused]);

  // Esc to close
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setFocused(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isMobile = viewport.w < 720;

  // Square SVG viewbox
  const VB = 1000;
  const cx = VB / 2, cy = VB / 2;
  const R = isMobile ? 240 : 270;

  // ── Geometry: branches at 120° apart with clear gaps between ─
  // -90 = top, 30 = bottom-right, 150 = bottom-left
  const branchCenters = {
    ecosystem:    -90,  // top
    community:     30,  // bottom-right
    acquisitions: 150,  // bottom-left
  };

  // Arc spread per branch — keep small enough to leave visible gaps
  const arcSpread = (n) => n === 1 ? 0 : n === 2 ? 38 : 70;

  const layout = useMemo(() => {
    const branches = data.branches.map((b) => {
      const center = branchCenters[b.id];
      const spread = arcSpread(b.nodes.length);
      const start = center - spread / 2;
      const end   = center + spread / 2;
      const nodes = b.nodes.map((n, i) => {
        const t = b.nodes.length === 1 ? 0 : i / (b.nodes.length - 1);
        const angle = start + t * spread;
        return { ...n, angle, branchId: b.id, indexInBranch: i };
      });
      return { ...b, center, spread, start, end, nodes };
    });
    return branches;
  }, [data]);

  const focusedBranch = focused ? layout.find(b => b.id === focused) : null;

  // Branch label positions live in the GAPS between branches' arcs.
  // Gap centers: between ecosystem (180) and community (90) → 135 ; between community (90) and acquisitions (0) → 45 ; between acquisitions and ecosystem (wrapping through top) → -90 (top).
  // We put labels at three positions corresponding to each branch:
  //   ecosystem label at top-left gap (~225 = bottom-left? no — let's be explicit)
  // Simpler: place each branch label in the gap BEFORE its arc start (clockwise)
  //   ecosystem starts at 180 - 47 = 133. Gap before it spans from prev branch end.
  // Easier mental model: label at branch.center, but moved further OUT and rotated to be readable.
  // Actually best approach: put each branch's label at its OWN center, beyond the ring.
  // The gap between branches still exists visually because each branch arc is short (95° max < 120°).

  return (
    <div
      ref={stageRef}
      onClick={(e) => {
        if (e.target === e.currentTarget) setFocused(null);
      }}
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "var(--paper)",
        position: "relative",
        overflow: "hidden",
        padding: isMobile ? "32px 0 80px" : "56px 0 100px",
      }}
    >
      {/* Header */}
      <div style={{
        maxWidth: 880,
        margin: "0 auto",
        padding: isMobile ? "0 24px 8px" : "0 48px 8px",
        textAlign: "center",
        position: "relative",
        zIndex: 2,
        opacity: focused ? 0.4 : 1,
        transition: "opacity 600ms ease",
        pointerEvents: focused ? "none" : "auto",
      }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>
          <span style={{ display: "inline-block", width: 28, height: 1, background: "var(--coral-deep)", verticalAlign: "middle", marginRight: 14, opacity: 0.6 }}></span>
          The Map · Index 00
          <span style={{ display: "inline-block", width: 28, height: 1, background: "var(--coral-deep)", verticalAlign: "middle", marginLeft: 14, opacity: 0.6 }}></span>
        </div>
        <h1 style={{
          fontFamily: "var(--serif)",
          fontWeight: 400,
          fontSize: isMobile ? 32 : "clamp(36px, 4.6vw, 60px)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          margin: "0 0 14px",
          color: "var(--ink)",
        }}>
          One ecosystem. <em style={{ color: "var(--coral-deep)", fontStyle: "italic" }}>Three</em> connected branches.
        </h1>
        <p style={{
          fontSize: isMobile ? 14 : 15.5,
          lineHeight: 1.55,
          color: "var(--ink-soft)",
          maxWidth: 520,
          margin: "0 auto",
          fontWeight: 400,
        }}>
          {data.lede}
        </p>
      </div>

      {/* Diagram */}
      <div style={{
        position: "relative",
        width: "100%",
        maxWidth: isMobile ? "100%" : 980,
        aspectRatio: "1 / 1",
        margin: isMobile ? "16px auto 0" : "32px auto 0",
      }}>
        <svg viewBox={`0 0 ${VB} ${VB}`} style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}>
          <defs>
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="oklch(0.72 0.16 40 / 0.16)" />
              <stop offset="60%" stopColor="oklch(0.72 0.16 40 / 0.04)" />
              <stop offset="100%" stopColor="oklch(0.72 0.16 40 / 0)" />
            </radialGradient>
            <pattern id="dotgrid" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.7" fill="oklch(0.78 0.012 80)" />
            </pattern>
          </defs>

          <rect width={VB} height={VB} fill="url(#dotgrid)" opacity="0.45" />
          <circle cx={cx} cy={cy} r={200} fill="url(#centerGlow)" />

          {/* Faint full ring — drifts when idle */}
          <g style={{
            transform: `rotate(${drift}deg)`,
            transformOrigin: `${cx}px ${cy}px`,
            opacity: focused ? 0.2 : 1,
            transition: "opacity 600ms ease",
          }}>
            <circle cx={cx} cy={cy} r={R}
              fill="none"
              stroke="var(--line)"
              strokeWidth="0.8"
              strokeDasharray="1 5"
              opacity="0.7"
            />
          </g>

          {/* Branch arcs — draw a SOLID coral arc spanning each branch's nodes.
              These are the visible "branches" of the orbit, with gaps between. */}
          {layout.map((b) => {
            const isFocus = focused === b.id;
            const isHover = hovered === b.id && !focused;
            const dim = focused && !isFocus;
            // Pad arc 4° on each side past first/last node
            const start = b.start - 4;
            const end = b.end + 4;
            return (
              <g key={"arc-" + b.id}>
                {/* Outer track — slightly outside ring */}
                <path
                  d={describeArc(cx, cy, R, start, end)}
                  fill="none"
                  stroke="var(--coral)"
                  strokeWidth={isFocus ? 2.5 : isHover ? 2 : 1.4}
                  opacity={dim ? 0.22 : isFocus ? 1 : 0.7}
                  strokeLinecap="round"
                  style={{ transition: "all 500ms ease" }}
                />
                {/* End-cap perpendiculars — small tick marks at arc edges to make
                    the gap dividers feel intentional */}
                <ArcCap cx={cx} cy={cy} r={R} angle={start} dim={dim} focus={isFocus} />
                <ArcCap cx={cx} cy={cy} r={R} angle={end} dim={dim} focus={isFocus} />
              </g>
            );
          })}

          {/* Hub-to-arc-midpoint hairlines — only when hovered or focused */}
          {layout.map((b) => {
            const isFocus = focused === b.id;
            const isHover = hovered === b.id && !focused;
            if (!isFocus && !isHover) return null;
            const rad = (b.center * Math.PI) / 180;
            const x2 = cx + R * Math.cos(rad);
            const y2 = cy + R * Math.sin(rad);
            const x1 = cx + 168 * Math.cos(rad);
            const y1 = cy + 168 * Math.sin(rad);
            return (
              <g key={"pulse-" + b.id}>
                <line
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="var(--coral)"
                  strokeWidth="1"
                  strokeDasharray={isFocus ? "none" : "2 4"}
                  opacity={isFocus ? 0.85 : 0.5}
                />
                <circle r={isFocus ? 4 : 3} fill="var(--coral-deep)">
                  <animateMotion dur={isFocus ? "1.4s" : "1.8s"} repeatCount="indefinite"
                    path={`M ${x1} ${y1} L ${x2} ${y2}`} />
                  <animate attributeName="opacity"
                    values={isFocus ? "0;1;1;0" : "0;0.8;0.8;0"}
                    dur={isFocus ? "1.4s" : "1.8s"}
                    repeatCount="indefinite" />
                </circle>
              </g>
            );
          })}

          {/* Hub circle */}
          <g
            onClick={(e) => { e.stopPropagation(); if (focused) setFocused(null); }}
            style={{ cursor: focused ? "pointer" : "default" }}
          >
            <circle cx={cx} cy={cy} r={160}
              fill="var(--paper)"
              stroke="var(--coral)"
              strokeWidth="1"
              style={{
                opacity: focused ? 0.85 : 1,
                transition: "opacity 500ms ease",
              }}
            />
            <circle cx={cx} cy={cy} r={146}
              fill="none"
              stroke="var(--coral)"
              strokeWidth="0.6"
              strokeDasharray="2 4"
              opacity="0.55"
            />
          </g>

          {/* TRAVELER DOTS — small dots that roll along each branch's arc.
              When a branch is focused, its travelers speed up and converge
              toward the branch center, while others fade out. */}
          {layout.flatMap((b) => {
            const isFocusBranch = focused === b.id;
            const isHoverBranch = hovered === b.id && !focused;
            const dim = focused && !isFocusBranch;
            // Pad arc slightly past nodes so dots have travel room
            const start = b.start - 6;
            const end = b.end + 6;
            const path = describeArc(cx, cy, R, start, end);
            // Number of travelers per branch — more for focused, fewer otherwise
            const count = isFocusBranch ? 5 : 3;
            const baseDur = isFocusBranch ? 2.2 : isHoverBranch ? 3.6 : 5.4;
            return Array.from({ length: count }).map((_, i) => {
              const delay = -(i * baseDur) / count; // stagger so they're spaced out
              return (
                <g key={"trav-" + b.id + "-" + i} style={{
                  opacity: dim ? 0 : isFocusBranch ? 1 : 0.85,
                  transition: "opacity 500ms ease",
                }}>
                  <circle r={isFocusBranch ? 3.5 : 2.4}
                    fill="var(--coral-deep)"
                    opacity={isFocusBranch ? 0.9 : 0.65}>
                    <animateMotion
                      dur={baseDur + "s"}
                      repeatCount="indefinite"
                      begin={delay + "s"}
                      path={path}
                      rotate="auto"
                    />
                  </circle>
                  {/* Trailing soft halo for focused state */}
                  {isFocusBranch && (
                    <circle r="6" fill="var(--coral)" opacity="0.18">
                      <animateMotion
                        dur={baseDur + "s"}
                        repeatCount="indefinite"
                        begin={delay + 0.05 + "s"}
                        path={path}
                      />
                    </circle>
                  )}
                </g>
              );
            });
          })}

          {/* Venture node dots on the ring */}
          {layout.flatMap((b) => b.nodes.map((n, i) => {
            const isFocusBranch = focused === b.id;
            const dim = focused && !isFocusBranch;
            const rad = (n.angle * Math.PI) / 180;
            const x = cx + R * Math.cos(rad);
            const y = cy + R * Math.sin(rad);
            return (
              <g key={"vdot-" + b.id + "-" + i} style={{
                opacity: dim ? 0.3 : 1,
                transition: "opacity 500ms ease",
              }}>
                <circle cx={x} cy={y} r={isFocusBranch ? 7 : 5}
                  fill="var(--paper)"
                  stroke="var(--coral)"
                  strokeWidth="1.4"
                  style={{ transition: "r 500ms ease" }}
                />
                <circle cx={x} cy={y} r={isFocusBranch ? 3.5 : 2.2}
                  fill="var(--coral)"
                  style={{ transition: "r 500ms ease" }}
                />
              </g>
            );
          }))}
        </svg>

        {/* Center hub overlay — JUST THE LOGO */}
        <HubOverlay focused={!!focused} onClick={() => setFocused(null)} />

        {/* Branch labels — placed BEYOND the cluster of venture cards.
            Anchored at branch.center, far from hub. */}
        {layout.map((b) => (
          <BranchLabel
            key={b.id}
            branch={b}
            R={R}
            VB={VB}
            isFocus={focused === b.id}
            isHover={hovered === b.id && !focused}
            isDim={focused && focused !== b.id}
            onHover={(v) => setHovered(v ? b.id : null)}
            onClick={() => setFocused(focused === b.id ? null : b.id)}
            isMobile={isMobile}
          />
        ))}

        {/* Venture cards — always visible, around the ring */}
        {layout.flatMap((b) =>
          b.nodes.map((n, i) => (
            <VentureCard
              key={"vc-" + b.id + "-" + i}
              node={n}
              branch={b}
              indexInBranch={i}
              R={R}
              VB={VB}
              isFocus={focused === b.id}
              isHover={hovered === b.id && !focused}
              isDim={focused && focused !== b.id}
              isMobile={isMobile}
            />
          ))
        )}
      </div>

      {/* Description panel */}
      <DescriptionPanel
        branch={focusedBranch}
        onClose={() => setFocused(null)}
        isMobile={isMobile}
      />

      {/* Footer legend */}
      <div style={{
        maxWidth: 1100,
        margin: "20px auto 0",
        padding: isMobile ? "0 24px" : "0 64px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        borderTop: "1px solid var(--line)",
        paddingTop: 22,
        opacity: focused ? 0.4 : 1,
        transition: "opacity 500ms ease",
        flexWrap: "wrap",
        gap: 10,
      }}>
        <div className="micro">Fig. 01 — Niche Group · Operating Map</div>
        <div className="micro">Revision 04 · 2026</div>
      </div>
    </div>
  );
};

// ─── ARC CAP — small tick at arc edges so gaps between branches read as intentional dividers ──
const ArcCap = ({ cx, cy, r, angle, dim, focus }) => {
  const rad = (angle * Math.PI) / 180;
  const inner = r - 8;
  const outer = r + 8;
  const x1 = cx + inner * Math.cos(rad);
  const y1 = cy + inner * Math.sin(rad);
  const x2 = cx + outer * Math.cos(rad);
  const y2 = cy + outer * Math.sin(rad);
  return (
    <line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="var(--coral-deep)"
      strokeWidth={focus ? 1.5 : 1}
      opacity={dim ? 0.2 : 0.55}
      style={{ transition: "all 500ms ease" }}
    />
  );
};

// ─── HUB OVERLAY — JUST THE LOGO ─────────────────────────────────────────────
const HubOverlay = ({ focused, onClick }) => (
  <div
    onClick={(e) => { e.stopPropagation(); if (focused) onClick(); }}
    style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: `translate(-50%, -50%) scale(${focused ? 0.88 : 1})`,
      textAlign: "center",
      width: 220,
      pointerEvents: focused ? "auto" : "none",
      cursor: focused ? "pointer" : "default",
      transition: "transform 500ms cubic-bezier(0.34, 1.2, 0.64, 1), opacity 500ms ease",
      opacity: focused ? 0.7 : 1,
    }}
  >
    <img src="assets/niche-logo.png" alt="Niche"
         style={{ width: 130, height: "auto", display: "block", margin: "0 auto" }} />
    {focused && (
      <div style={{
        marginTop: 14,
        fontFamily: "var(--mono)",
        fontSize: 9,
        letterSpacing: "0.26em",
        color: "var(--coral-deep)",
        textTransform: "uppercase",
      }}>
        ← back to map
      </div>
    )}
  </div>
);

// ─── BRANCH LABEL — sits in the gap, beyond the venture cards ────────────────
const BranchLabel = ({ branch, R, VB, isFocus, isHover, isDim, onHover, onClick, isMobile }) => {
  const cx = VB / 2, cy = VB / 2;
  const rad = (branch.center * Math.PI) / 180;
  // Position outside the ring by enough to clear venture cards
  const labelR = R + (isMobile ? 130 : 175);
  const x = cx + labelR * Math.cos(rad);
  const y = cy + labelR * Math.sin(rad);
  const xPct = (x / VB) * 100;
  const yPct = (y / VB) * 100;

  // Alignment: which side of hub is this on?
  const cosA = Math.cos(rad);
  const sinA = Math.sin(rad);

  let translate = "translate(-50%, -50%)";
  let textAlign = "center";
  if (Math.abs(cosA) > 0.7) {
    if (cosA > 0) { translate = "translate(0, -50%)"; textAlign = "left"; }
    else          { translate = "translate(-100%, -50%)"; textAlign = "right"; }
  } else if (sinA > 0.5) {
    translate = "translate(-50%, 0%)";
    textAlign = "center";
  } else if (sinA < -0.5) {
    translate = "translate(-50%, -100%)";
    textAlign = "center";
  }

  return (
    <div
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
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
        transition: "all 600ms cubic-bezier(0.34, 1.2, 0.64, 1)",
        zIndex: isFocus ? 10 : 5,
        pointerEvents: "auto",
      }}
    >
      <div style={{
        display: "flex",
        alignItems: "baseline",
        gap: 10,
        justifyContent: textAlign === "center" ? "center" : (textAlign === "left" ? "flex-start" : "flex-end"),
        marginBottom: 4,
      }}>
        <span style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: isMobile ? 26 : 32,
          color: "var(--coral-deep)",
          lineHeight: 1,
        }}>
          {branch.number}
        </span>
        <span style={{
          fontFamily: "var(--mono)",
          fontSize: isMobile ? 10 : 11,
          letterSpacing: "0.26em",
          textTransform: "uppercase",
          color: "var(--coral-deep)",
          fontWeight: 500,
        }}>
          {branch.label}
        </span>
      </div>

      {/* Tagline — italic preview */}
      <div style={{
        fontFamily: "var(--serif)",
        fontStyle: "italic",
        fontSize: isMobile ? 13 : 14.5,
        lineHeight: 1.3,
        color: "var(--ink)",
        opacity: isHover || isFocus ? 1 : 0.8,
        transition: "opacity 300ms ease",
      }}>
        {branch.tagline}
      </div>

      {/* Hover hint chip */}
      {!isFocus && (
        <div style={{
          marginTop: 6,
          fontFamily: "var(--mono)",
          fontSize: 9,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--ink-faint)",
          opacity: isHover ? 1 : 0,
          transform: `translateY(${isHover ? 0 : -3}px)`,
          transition: "all 300ms ease",
        }}>
          Click to explore →
        </div>
      )}
    </div>
  );
};

// ─── VENTURE CARD — small label outside the ring at each node ────────────────
const VentureCard = ({ node, branch, indexInBranch, R, VB, isFocus, isHover, isDim, isMobile }) => {
  const cx = VB / 2, cy = VB / 2;
  const rad = (node.angle * Math.PI) / 180;
  const cardR = R + (isMobile ? 50 : 62);
  const x = cx + cardR * Math.cos(rad);
  const y = cy + cardR * Math.sin(rad);
  const xPct = (x / VB) * 100;
  const yPct = (y / VB) * 100;

  // Anchor card so it doesn't overlap the ring
  const cosA = Math.cos(rad);
  const sinA = Math.sin(rad);
  let translate = "translate(-50%, -50%)";
  let textAlign = "center";
  if (Math.abs(cosA) > Math.abs(sinA)) {
    if (cosA > 0) { translate = "translate(0, -50%)"; textAlign = "left"; }
    else          { translate = "translate(-100%, -50%)"; textAlign = "right"; }
  } else {
    if (sinA > 0) { translate = "translate(-50%, 0)"; textAlign = "center"; }
    else          { translate = "translate(-50%, -100%)"; textAlign = "center"; }
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "absolute",
        left: `${xPct}%`,
        top: `${yPct}%`,
        transform: `${translate} scale(${isFocus ? 1.15 : isDim ? 0.92 : 1})`,
        width: isMobile ? 110 : 138,
        textAlign,
        opacity: isDim ? 0.32 : 1,
        transition: "all 500ms cubic-bezier(0.34, 1.2, 0.64, 1)",
        zIndex: isFocus ? 8 : 3,
        pointerEvents: "auto",
      }}
    >
      <div style={{
        fontFamily: "var(--mono)",
        fontSize: isMobile ? 7.5 : 8.5,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: isFocus ? "var(--coral-deep)" : "var(--ink-faint)",
        marginBottom: 3,
        transition: "color 400ms ease",
      }}>
        {branch.number}.{String(indexInBranch + 1).padStart(2, "0")}
      </div>
      <div style={{
        fontFamily: "var(--serif)",
        fontSize: isMobile ? 13 : 15.5,
        lineHeight: 1.18,
        color: "var(--ink)",
        marginBottom: 2,
        letterSpacing: "-0.005em",
      }}>
        {node.name}
      </div>
      <div style={{
        fontSize: isMobile ? 9.5 : 10.5,
        color: "var(--ink-soft)",
        fontStyle: "italic",
        lineHeight: 1.3,
      }}>
        {node.role}
      </div>
    </div>
  );
};

// ─── DESCRIPTION PANEL ───────────────────────────────────────────────────────
const DescriptionPanel = ({ branch, onClose, isMobile }) => {
  const visible = !!branch;
  const [shown, setShown] = useState(branch);
  useEffect(() => {
    if (branch) setShown(branch);
    else {
      const t = setTimeout(() => setShown(null), 500);
      return () => clearTimeout(t);
    }
  }, [branch]);

  if (!shown) return null;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "fixed",
        left: "50%",
        bottom: isMobile ? 16 : 32,
        transform: `translate(-50%, ${visible ? 0 : 20}px)`,
        opacity: visible ? 1 : 0,
        width: "calc(100% - 32px)",
        maxWidth: isMobile ? 420 : 560,
        background: "var(--paper-warm)",
        border: "1px solid var(--coral)",
        borderRadius: 4,
        padding: isMobile ? "18px 22px" : "22px 28px",
        boxShadow: "0 16px 60px oklch(0.22 0.03 250 / 0.18)",
        transition: "all 500ms cubic-bezier(0.34, 1.2, 0.64, 1)",
        zIndex: 30,
      }}
    >
      <div style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        gap: 14,
        marginBottom: 10,
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <span style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 26,
            color: "var(--coral-deep)",
            lineHeight: 1,
          }}>
            {shown.number}
          </span>
          <span className="eyebrow">{shown.label}</span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            background: "transparent",
            border: "1px solid var(--line)",
            borderRadius: 999,
            width: 26,
            height: 26,
            cursor: "pointer",
            color: "var(--ink-soft)",
            fontSize: 14,
            fontFamily: "var(--mono)",
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

      <div style={{
        fontFamily: "var(--serif)",
        fontSize: isMobile ? 22 : 26,
        lineHeight: 1.18,
        color: "var(--ink)",
        letterSpacing: "-0.012em",
        marginBottom: 10,
      }}>
        {shown.tagline}
      </div>

      <div style={{
        fontSize: isMobile ? 13.5 : 14.5,
        lineHeight: 1.55,
        color: "var(--ink-soft)",
      }}>
        {shown.description}
      </div>

      <div style={{
        marginTop: 14,
        paddingTop: 12,
        borderTop: "1px dotted var(--line)",
        display: "flex",
        justifyContent: "space-between",
        gap: 10,
        fontFamily: "var(--mono)",
        fontSize: 9,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "var(--ink-faint)",
      }}>
        <span>{shown.nodes.length} ventures</span>
        <span style={{ opacity: 0.7 }}>esc · click hub to close</span>
      </div>
    </div>
  );
};

// ─── SVG ARC HELPERS ─────────────────────────────────────────────────────────
function polarToCartesian(cx, cy, r, angleDeg) {
  const a = (angleDeg * Math.PI) / 180.0;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}
function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArc = endAngle - startAngle <= 180 ? "0" : "1";
  return ["M", start.x, start.y, "A", r, r, 0, largeArc, "1", end.x, end.y].join(" ");
}

window.Constellation = Constellation;
