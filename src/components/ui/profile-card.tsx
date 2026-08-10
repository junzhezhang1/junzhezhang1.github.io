"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
} from "react";

import "./profile-card.css";

const DEFAULT_INNER_GRADIENT =
  "linear-gradient(145deg, #102340 0%, #294d735c 52%, #c79b5d38 100%)";

const ANIMATION_CONFIG = {
  initialDuration: 1_200,
  initialXOffset: 70,
  initialYOffset: 60,
  deviceBetaOffset: 20,
  enterTransitionMs: 180,
};

const clamp = (value: number, min = 0, max = 100) =>
  Math.min(Math.max(value, min), max);
const round = (value: number, precision = 3) =>
  Number.parseFloat(value.toFixed(precision));
const adjust = (
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number,
) =>
  round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));

type ProfileCardStyle = CSSProperties & Record<`--${string}`, string | number>;

export interface ProfileCardProps {
  avatarUrl?: string;
  iconUrl?: string;
  grainUrl?: string;
  innerGradient?: string;
  behindGlowEnabled?: boolean;
  behindGlowColor?: string;
  behindGlowSize?: string;
  className?: string;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  mobileTiltSensitivity?: number;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
}

interface TiltEngine {
  setImmediate: (x: number, y: number) => void;
  setTarget: (x: number, y: number) => void;
  toCenter: () => void;
  beginInitial: (durationMs: number) => void;
  getCurrent: () => { x: number; y: number; tx: number; ty: number };
  cancel: () => void;
}

type MotionPermissionConstructor = typeof DeviceMotionEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

function ProfileCardComponent({
  avatarUrl = "",
  iconUrl = "",
  grainUrl = "",
  innerGradient,
  behindGlowEnabled = true,
  behindGlowColor = "rgba(125, 190, 255, 0.67)",
  behindGlowSize = "50%",
  className = "",
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  miniAvatarUrl,
  name = "Javi A. Torres",
  title = "Software Engineer",
  handle = "javicodes",
  status = "Online",
  contactText = "Contact",
  showUserInfo = true,
  onContactClick,
}: ProfileCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const enterTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveRafRef = useRef<number | null>(null);

  const tiltEngine = useMemo<TiltEngine | null>(() => {
    if (!enableTilt) return null;

    let rafId: number | null = null;
    let running = false;
    let lastTimestamp = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let initialUntil = 0;

    const setVarsFromXY = (x: number, y: number) => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap) return;

      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;
      const percentX = clamp((100 / width) * x);
      const percentY = clamp((100 / height) * y);
      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties: Record<string, string> = {
        "--pointer-x": `${percentX}%`,
        "--pointer-y": `${percentY}%`,
        "--background-x": `${adjust(percentX, 0, 100, 35, 65)}%`,
        "--background-y": `${adjust(percentY, 0, 100, 35, 65)}%`,
        "--pointer-from-center": `${clamp(Math.hypot(centerY, centerX) / 50, 0, 1)}`,
        "--pointer-from-top": `${percentY / 100}`,
        "--pointer-from-left": `${percentX / 100}`,
        "--rotate-x": `${round(-(centerX / 5))}deg`,
        "--rotate-y": `${round(centerY / 4)}deg`,
      };

      Object.entries(properties).forEach(([property, value]) => {
        wrap.style.setProperty(property, value);
      });
    };

    const step = (timestamp: number) => {
      if (!running) return;
      if (lastTimestamp === 0) lastTimestamp = timestamp;
      const delta = (timestamp - lastTimestamp) / 1_000;
      lastTimestamp = timestamp;
      const tau = timestamp < initialUntil ? 0.6 : 0.14;
      const factor = 1 - Math.exp(-delta / tau);

      currentX += (targetX - currentX) * factor;
      currentY += (targetY - currentY) * factor;
      setVarsFromXY(currentX, currentY);

      const unsettled =
        Math.abs(targetX - currentX) > 0.05 ||
        Math.abs(targetY - currentY) > 0.05;
      if (unsettled || document.hasFocus()) {
        rafId = requestAnimationFrame(step);
      } else {
        running = false;
        lastTimestamp = 0;
        rafId = null;
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTimestamp = 0;
      rafId = requestAnimationFrame(step);
    };

    return {
      setImmediate(x, y) {
        currentX = x;
        currentY = y;
        setVarsFromXY(x, y);
      },
      setTarget(x, y) {
        targetX = x;
        targetY = y;
        start();
      },
      toCenter() {
        const shell = shellRef.current;
        if (shell) this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
      },
      beginInitial(durationMs) {
        initialUntil = performance.now() + durationMs;
        start();
      },
      getCurrent() {
        return { x: currentX, y: currentY, tx: targetX, ty: targetY };
      },
      cancel() {
        if (rafId !== null) cancelAnimationFrame(rafId);
        rafId = null;
        running = false;
        lastTimestamp = 0;
      },
    };
  }, [enableTilt]);

  const getOffsets = (event: PointerEvent, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;
      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine],
  );

  const handlePointerEnter = useCallback(
    (event: PointerEvent) => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap || !tiltEngine) return;

      shell.classList.add("active", "entering");
      wrap.classList.add("active");
      if (enterTimerRef.current) clearTimeout(enterTimerRef.current);
      enterTimerRef.current = setTimeout(
        () => shell.classList.remove("entering"),
        ANIMATION_CONFIG.enterTransitionMs,
      );

      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine],
  );

  const handlePointerLeave = useCallback(() => {
    const shell = shellRef.current;
    if (!shell || !tiltEngine) return;
    tiltEngine.toCenter();

    const checkSettle = () => {
      const { x, y, tx, ty } = tiltEngine.getCurrent();
      if (Math.hypot(tx - x, ty - y) < 0.6) {
        shell.classList.remove("active");
        wrapRef.current?.classList.remove("active");
        leaveRafRef.current = null;
      } else {
        leaveRafRef.current = requestAnimationFrame(checkSettle);
      }
    };
    if (leaveRafRef.current !== null) cancelAnimationFrame(leaveRafRef.current);
    leaveRafRef.current = requestAnimationFrame(checkSettle);
  }, [tiltEngine]);

  const handleDeviceOrientation = useCallback(
    (event: DeviceOrientationEvent) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine || event.beta == null || event.gamma == null) return;

      const centerX = shell.clientWidth / 2;
      const centerY = shell.clientHeight / 2;
      tiltEngine.setTarget(
        clamp(centerX + event.gamma * mobileTiltSensitivity, 0, shell.clientWidth),
        clamp(
          centerY +
            (event.beta - ANIMATION_CONFIG.deviceBetaOffset) * mobileTiltSensitivity,
          0,
          shell.clientHeight,
        ),
      );
    },
    [mobileTiltSensitivity, tiltEngine],
  );

  useEffect(() => {
    const shell = shellRef.current;
    const wrap = wrapRef.current;
    if (!enableTilt || !tiltEngine || !shell || !wrap) return;

    shell.addEventListener("pointerenter", handlePointerEnter);
    shell.addEventListener("pointermove", handlePointerMove);
    shell.addEventListener("pointerleave", handlePointerLeave);

    const handleClick = () => {
      if (!enableMobileTilt || window.location.protocol !== "https:") return;
      const motion = window.DeviceMotionEvent as MotionPermissionConstructor | undefined;
      if (motion?.requestPermission) {
        void motion.requestPermission().then((state) => {
          if (state === "granted") {
            window.addEventListener("deviceorientation", handleDeviceOrientation);
          }
        });
      } else {
        window.addEventListener("deviceorientation", handleDeviceOrientation);
      }
    };
    shell.addEventListener("click", handleClick);

    tiltEngine.setImmediate(
      shell.clientWidth - ANIMATION_CONFIG.initialXOffset,
      ANIMATION_CONFIG.initialYOffset,
    );
    tiltEngine.toCenter();
    tiltEngine.beginInitial(ANIMATION_CONFIG.initialDuration);

    return () => {
      shell.removeEventListener("pointerenter", handlePointerEnter);
      shell.removeEventListener("pointermove", handlePointerMove);
      shell.removeEventListener("pointerleave", handlePointerLeave);
      shell.removeEventListener("click", handleClick);
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
      if (enterTimerRef.current) clearTimeout(enterTimerRef.current);
      if (leaveRafRef.current !== null) cancelAnimationFrame(leaveRafRef.current);
      tiltEngine.cancel();
      shell.classList.remove("active", "entering");
      wrap.classList.remove("active");
    };
  }, [
    enableMobileTilt,
    enableTilt,
    handleDeviceOrientation,
    handlePointerEnter,
    handlePointerLeave,
    handlePointerMove,
    tiltEngine,
  ]);

  const cardStyle = useMemo<ProfileCardStyle>(
    () => ({
      "--icon": iconUrl ? `url(${iconUrl})` : "none",
      "--grain": grainUrl ? `url(${grainUrl})` : "none",
      "--inner-gradient": innerGradient ?? DEFAULT_INNER_GRADIENT,
      "--behind-glow-color": behindGlowColor,
      "--behind-glow-size": behindGlowSize,
    }),
    [behindGlowColor, behindGlowSize, grainUrl, iconUrl, innerGradient],
  );

  return (
    <div
      ref={wrapRef}
      className={`pc-card-wrapper ${className}`.trim()}
      style={cardStyle}
    >
      {behindGlowEnabled && <div className="pc-behind" aria-hidden="true" />}
      <div ref={shellRef} className="pc-card-shell">
        <section className="pc-card" aria-label={`${name}, ${title}`}>
          <div className="pc-inside">
            <div className="pc-shine" aria-hidden="true" />
            <div className="pc-glare" aria-hidden="true" />
            <div className="pc-content pc-avatar-content">
              {/* The source component deliberately uses a regular image for layered transforms. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="avatar"
                src={avatarUrl}
                alt={`${name || "User"} avatar`}
                loading="eager"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
              {showUserInfo && (
                <div className="pc-user-info">
                  <div className="pc-user-details">
                    <div className="pc-mini-avatar">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={miniAvatarUrl || avatarUrl}
                        alt=""
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.style.opacity = "0.35";
                        }}
                      />
                    </div>
                    <div className="pc-user-text">
                      <div className="pc-handle">@{handle}</div>
                      <div className="pc-status">{status}</div>
                    </div>
                  </div>
                  <button
                    className="pc-contact-btn"
                    onClick={onContactClick}
                    type="button"
                    aria-label={`Contact ${name || "user"}`}
                  >
                    {contactText}
                  </button>
                </div>
              )}
            </div>
            <div className="pc-content">
              <div className="pc-details">
                <h3>{name}</h3>
                <p>{title}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

const ProfileCard = React.memo(ProfileCardComponent);
ProfileCard.displayName = "ProfileCard";

export default ProfileCard;
