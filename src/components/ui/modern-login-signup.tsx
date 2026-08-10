"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const socialButtonClass =
  "mb-1.5 flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-white/15 bg-transparent px-4 text-sm font-medium text-white transition-colors duration-200 hover:border-white/30 hover:bg-white/[0.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const inputClass =
  "min-h-11 w-full rounded-md border border-white/15 bg-black px-3.5 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-white/45";

function GoogleIcon() {
  return (
    <svg aria-hidden="true" className="size-4 shrink-0" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg aria-hidden="true" className="size-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.699-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg aria-hidden="true" className="size-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.79 3.59-.76 1.56.04 2.88.75 3.65 1.89-3.08 1.75-2.58 5.61.35 6.75-1.01 2.37-2.39 4.39-4.29 4.29zM12.03 7.25c-.15-2.23 1.66-4.07 3.72-4.25.36 2.38-1.92 4.34-3.72 4.25z" />
    </svg>
  );
}

function BrandMark() {
  return (
    <div className="mb-3 flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-sm font-semibold tracking-[-0.03em]">
      JZ
    </div>
  );
}

function TermsFooter() {
  return (
    <p className="mt-3 text-center text-[0.7rem] leading-5 text-white/35">
      By proceeding, you agree to our{" "}
      <a className="text-white/55 underline-offset-2 hover:underline" href="#terms">Terms of Service</a>
      {" "}and{" "}
      <a className="text-white/55 underline-offset-2 hover:underline" href="#privacy">Privacy Policy</a>.
    </p>
  );
}

export default function ModernLoginSignup() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId = 0;
    let renderer: THREE.WebGLRenderer | null = null;
    let geometry: THREE.PlaneGeometry | null = null;
    let material: THREE.ShaderMaterial | null = null;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const uniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(1, 1) },
      u_opacities: { value: [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1] },
      u_colors: {
        value: [
          new THREE.Vector3(1, 1, 1),
          new THREE.Vector3(0.75, 0.82, 0.95),
          new THREE.Vector3(1, 1, 1),
          new THREE.Vector3(0.55, 0.67, 0.86),
          new THREE.Vector3(1, 1, 1),
          new THREE.Vector3(0.7, 0.78, 0.92),
        ],
      },
      u_total_size: { value: 20 },
      u_dot_size: { value: 5 },
    };

    const resize = () => {
      if (!renderer) return;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      renderer.getDrawingBufferSize(uniforms.u_resolution.value);
    };

    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);

      material = new THREE.ShaderMaterial({
        vertexShader: `
          precision mediump float;
          uniform vec2 u_resolution;
          out vec2 fragCoord;
          void main() {
            gl_Position = vec4(position, 1.0);
            fragCoord = (position.xy + 1.0) * 0.5 * u_resolution;
            fragCoord.y = u_resolution.y - fragCoord.y;
          }
        `,
        fragmentShader: `
          precision mediump float;
          in vec2 fragCoord;
          uniform float u_time;
          uniform float u_opacities[10];
          uniform vec3 u_colors[6];
          uniform float u_total_size;
          uniform float u_dot_size;
          uniform vec2 u_resolution;
          out vec4 fragColor;

          float PHI = 1.61803398874989484820459;
          float random(vec2 xy) {
            return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x);
          }

          void main() {
            vec2 st = fragCoord.xy;
            st.x -= abs(floor((mod(u_resolution.x, u_total_size) - u_dot_size) * 0.5));
            st.y -= abs(floor((mod(u_resolution.y, u_total_size) - u_dot_size) * 0.5));
            float opacity = step(0.0, st.x) * step(0.0, st.y);
            vec2 st2 = vec2(int(st.x / u_total_size), int(st.y / u_total_size));
            float frequency = 5.0;
            float show_offset = random(st2);
            float rand = random(st2 * floor((u_time / frequency) + show_offset + frequency));
            opacity *= u_opacities[int(rand * 10.0)];
            opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.x / u_total_size));
            opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.y / u_total_size));
            vec3 color = u_colors[int(show_offset * 6.0)];
            float timing_offset = distance(u_resolution / 2.0 / u_total_size, st2) * 0.01 + random(st2) * 0.15;
            opacity *= step(timing_offset, u_time * 3.0);
            opacity *= clamp((1.0 - step(timing_offset + 0.1, u_time * 3.0)) * 1.25, 1.0, 1.25);
            fragColor = vec4(color, opacity);
            fragColor.rgb *= fragColor.a;
          }
        `,
        uniforms,
        glslVersion: THREE.GLSL3,
        blending: THREE.CustomBlending,
        blendSrc: THREE.SrcAlphaFactor,
        blendDst: THREE.OneFactor,
        transparent: true,
      });

      geometry = new THREE.PlaneGeometry(2, 2);
      scene.add(new THREE.Mesh(geometry, material));
      resize();

      const startTime = performance.now();
      const animate = () => {
        uniforms.u_time.value = reduceMotion ? 1.4 : (performance.now() - startTime) / 1000;
        renderer?.render(scene, camera);
        if (!reduceMotion) animationFrameId = window.requestAnimationFrame(animate);
      };
      animate();
      window.addEventListener("resize", resize);
    } catch {
      canvas.style.display = "none";
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrameId);
      geometry?.dispose();
      material?.dispose();
      renderer?.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[400] flex min-h-[100svh] items-center justify-center overflow-y-auto bg-black px-4 py-8 font-sans text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-25"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.28) 1px, transparent 1px)", backgroundSize: "20px 20px" }}
      />
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 size-full" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,.82)_0%,rgba(0,0,0,.28)_48%,rgba(0,0,0,.78)_100%)]" />

      <section
        aria-labelledby="authentication-title"
        className="relative z-10 flex w-full max-w-[400px] flex-col items-center rounded-xl border border-white/10 bg-[#111]/95 p-6 text-center shadow-[0_24px_90px_rgba(0,0,0,.8)] backdrop-blur-xl sm:p-8"
      >
        <BrandMark />
        <h1 id="authentication-title" className="text-[1.35rem] font-semibold tracking-[-0.025em]">
          {isLogin ? "Sign in to your account" : "Create your account"}
        </h1>
        <p className="mb-4 mt-1 text-sm leading-6 text-white/50">
          {isLogin ? "Continue to your research workspace." : "Create an account to get started."}
        </p>

        <form className="flex w-full flex-col gap-2.5" onSubmit={(event) => event.preventDefault()}>
          {!isLogin && (
            <label className="sr-only" htmlFor="full-name">Full name</label>
          )}
          {!isLogin && (
            <input id="full-name" className={inputClass} name="name" type="text" placeholder="Full name" autoComplete="name" required />
          )}
          <label className="sr-only" htmlFor="account-email">Email address</label>
          <input id="account-email" className={inputClass} name="email" type="email" placeholder="name@work-email.com" autoComplete="email" required />
          <button className="min-h-11 w-full cursor-pointer rounded-md bg-[#ededed] px-4 text-sm font-medium text-black transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" type="submit">
            {isLogin ? "Continue with email" : "Sign up with email"}
          </button>
        </form>

        <div className="my-3.5 h-px w-full bg-white/10" />

        <div className="w-full">
          <button className={socialButtonClass} type="button"><GoogleIcon />Continue with Google</button>
          <button className={socialButtonClass} type="button"><GitHubIcon />Continue with GitHub</button>
          <button className={`${socialButtonClass} mb-0`} type="button"><AppleIcon />Continue with Apple</button>
        </div>

        <p className="mt-5 text-sm text-white/50">
          {isLogin ? "Do not have an account?" : "Already have an account?"}{" "}
          <button
            className="cursor-pointer border-0 bg-transparent p-0 font-medium text-white hover:underline"
            type="button"
            onClick={() => setIsLogin((current) => !current)}
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
        <TermsFooter />
      </section>
    </div>
  );
}
