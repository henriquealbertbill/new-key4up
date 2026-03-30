"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { Mic, Pause } from "lucide-react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import chatScript from "@/data/whatsapp-demo-conversation.json";

const WHATSAPP_WALLPAPER_SRC = "/images/whatsapp_background.png";

type Step =
  | {
      type: "composer_typing";
      durationMs: number;
      preview: string;
      sendDelayMs?: number;
    }
  | { type: "typing_indicator"; from: "user" | "agent"; durationMs: number }
  | {
      type: "message_text";
      from: "user" | "agent";
      text: string;
      time: string;
    }
  | { type: "recording_user"; durationMs: number; sendDelayMs?: number }
  | {
      type: "message_audio";
      from: "user" | "agent";
      seconds: number;
      time: string;
      /** Transcrição abaixo da onda, como no WhatsApp real. */
      transcript?: string;
      /** Nome no topo da bolha (ex.: agente). */
      senderLabel?: string;
    }
  | {
      type: "message_image";
      from: "user" | "agent";
      image: string;
      time: string;
      alt?: string;
    }
  | { type: "sending_photo_user"; durationMs: number; sendDelayMs?: number };

type ConversationFile = Readonly<{ steps: readonly Step[] }>;

const SCRIPT = chatScript as ConversationFile;

type DisplayMessage = Readonly<{
  id: string;
  kind: "text" | "audio" | "image";
  from: "user" | "agent";
  time: string;
  text?: string;
  seconds?: number;
  transcript?: string;
  senderLabel?: string;
  imageSrc?: string;
  imageAlt?: string;
}>;

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });

const formatAudioLabel = (totalSec: number): string => {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

/** Timestamps estilo WhatsApp (00:01 / 16:59). */
const formatAudioMmSs = (totalSec: number): string => {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

/** Onda mais densa, estática (sem reprodução). */
const AUDIO_WAVE_BARS = [
  3, 8, 5, 11, 6, 4, 9, 7, 10, 5, 8, 4, 9, 6, 11, 5, 7, 9, 4, 10, 6, 8, 5, 9, 7,
  6, 10, 4, 8, 7, 5, 9, 6, 11, 5, 8, 6, 9, 7, 5, 10, 6, 8, 5, 7, 9, 6, 10, 5,
] as const;

const TypingDots = ({
  align,
  reducedMotion,
}: {
  readonly align: "left" | "right";
  readonly reducedMotion: boolean;
}) => (
  <div
    className={
      align === "right"
        ? "flex max-w-[88%] justify-end"
        : "flex max-w-[92%] justify-start"
    }
  >
    <div
      className={
        align === "right"
          ? "rounded-lg rounded-tr-sm bg-[#d9fdd3] px-3 py-2.5 shadow-sm dark:bg-[#005c4b]"
          : "rounded-lg rounded-tl-sm bg-white px-3 py-2.5 shadow-sm dark:bg-[#1f2c33]"
      }
      aria-hidden
    >
      <span className="flex items-center gap-1">
        {[0, 1, 2].map((i) =>
          reducedMotion ? (
            <span key={i} className="size-2 rounded-full bg-[#8696a0] opacity-70" />
          ) : (
            <motion.span
              key={i}
              className="size-2 rounded-full bg-[#8696a0]"
              animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 1.15,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.14,
              }}
            />
          ),
        )}
      </span>
    </div>
  </div>
);

const ImageBubble = ({
  from,
  imageSrc,
  imageAlt,
  time,
}: {
  readonly from: "user" | "agent";
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly time: string;
}) => {
  const isUser = from === "user";
  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={
          isUser
            ? "max-w-[88%] overflow-hidden rounded-lg rounded-tr-sm bg-[#d9fdd3] p-0.5 shadow-sm dark:bg-[#005c4b] sm:max-w-[85%]"
            : "max-w-[88%] overflow-hidden rounded-lg rounded-tl-sm bg-white p-0.5 shadow-sm dark:bg-[#1f2c33] sm:max-w-[85%]"
        }
      >
        <div className="relative aspect-[4/3] w-[min(100%,260px)] min-w-[180px] max-w-[260px] overflow-hidden rounded-md bg-black/5 sm:w-[min(100%,280px)] sm:max-w-[280px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 72vw, 280px"
          />
        </div>
        <p className="px-2 pb-1 pt-0.5 text-right text-[11px] tabular-nums text-[#667781] dark:text-[#8696a0]">
          {time}
        </p>
      </div>
    </div>
  );
};

const AudioBubble = ({
  from,
  seconds,
  time,
  transcript,
  senderLabel,
}: {
  readonly from: "user" | "agent";
  readonly seconds: number;
  readonly time: string;
  readonly transcript?: string;
  readonly senderLabel?: string;
}) => {
  const isUser = from === "user";
  const showName = !isUser && Boolean(senderLabel);
  const totalStr = formatAudioMmSs(seconds);
  /** Posição fixa do “cursor” na onda (só visual). */
  const progressPct = Math.min(18, 6 + (seconds % 7) * 1.2);
  const barTint = isUser
    ? "bg-[#667781]/75 dark:bg-[#b8e0d0]/55"
    : "bg-[#8696a0]/70 dark:bg-[#8d9599]";
  const pauseTint = isUser
    ? "bg-[#00a884]/25 text-[#006b52] dark:bg-white/15 dark:text-[#b8e0d0]"
    : "bg-[#e9edef] text-[#54656f] dark:bg-[#2a3942] dark:text-[#d1d7db]";
  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={
          isUser
            ? "max-w-[min(100%,300px)] rounded-lg rounded-tr-sm bg-[#d9fdd3] px-2.5 pb-1.5 pt-2 shadow-sm dark:bg-[#005c4b] sm:max-w-[min(100%,320px)]"
            : "max-w-[min(100%,300px)] rounded-lg rounded-tl-sm bg-white px-2.5 pb-1.5 pt-2 shadow-sm dark:bg-[#1f2c33] sm:max-w-[min(100%,320px)]"
        }
      >
        {showName ? (
          <p className="mb-1.5 text-[14px] font-medium leading-tight text-[#7c59b6] dark:text-[#b088e8]">
            {senderLabel}
          </p>
        ) : null}
        <div className="flex items-stretch gap-2">
          <div
            className={`flex size-10 shrink-0 items-center justify-center rounded-full ${pauseTint}`}
            aria-hidden
          >
            <Pause className="size-[18px]" strokeWidth={2.25} />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div
              className="relative flex h-9 min-w-0 items-end gap-[1px] overflow-hidden rounded-sm px-0.5"
              aria-hidden
            >
              {AUDIO_WAVE_BARS.map((h, i) => (
                <span
                  key={i}
                  className={`w-[2px] shrink-0 rounded-full ${barTint}`}
                  style={{ height: `${h}px` }}
                />
              ))}
              <span
                className="pointer-events-none absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#53bdeb] shadow-sm dark:border-[#1f2c33]"
                style={{ left: `${progressPct}%` }}
              />
            </div>
            <div className="flex justify-between px-0.5 text-[11px] tabular-nums text-[#8696a0] dark:text-[#8d9599]">
              <span>00:01</span>
              <span>{totalStr}</span>
            </div>
          </div>
          {!isUser ? (
            <div className="relative shrink-0 self-center" aria-hidden>
              <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-[#a78bfa] to-[#6366f1] text-[13px] font-semibold text-white">
                {(senderLabel ?? "A").slice(0, 1).toUpperCase()}
              </div>
              <span className="absolute -bottom-0.5 -left-0.5 flex size-[18px] items-center justify-center rounded-full bg-[#53bdeb] text-white shadow-sm ring-2 ring-white dark:ring-[#1f2c33]">
                <Mic className="size-2.5" strokeWidth={2.5} aria-hidden />
              </span>
            </div>
          ) : null}
        </div>
        {transcript ? (
          <p
            className={`mt-2 border-t pt-2 text-[14px] leading-snug tracking-[-0.01em] ${
              isUser
                ? "border-[#000000]/8 text-[#111b21] dark:border-white/12 dark:text-[#e8eaed]"
                : "border-[#000000]/8 text-[#3b4a54] dark:border-white/10 dark:text-[#d1d7db]"
            }`}
          >
            <span className="text-[#54656f] dark:text-[#8d9599]">&ldquo;</span>
            {transcript}
            <span className="text-[#54656f] dark:text-[#8d9599]">&rdquo;</span>
          </p>
        ) : null}
        <p className="mt-1 text-right text-[11px] tabular-nums text-[#667781] dark:text-[#8696a0]">
          {time}
        </p>
      </div>
    </div>
  );
};

export default function WhatsAppDemoConversation() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const playbackId = useRef(0);
  const headingId = useId();
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(rootRef, { once: true, amount: 0.28 });
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [typingFrom, setTypingFrom] = useState<"user" | "agent" | null>(null);
  const [composerText, setComposerText] = useState("");
  const [composerMode, setComposerMode] = useState<
    "idle" | "typing" | "recording" | "sending" | "sending_photo"
  >("idle");
  const [recordingElapsedSec, setRecordingElapsedSec] = useState(0);

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (!el) {
      return;
    }
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingFrom, composerMode, composerText, scrollToBottom]);

  useEffect(() => {
    if (!isInView) {
      return undefined;
    }
    const id = ++playbackId.current;
    let cancelled = false;
    const steps = SCRIPT.steps;

    const effectiveDelay = (ms: number): number =>
      prefersReducedMotion ? Math.min(ms, 80) : ms;

    const runComposerTyping = async (preview: string, durationMs: number) => {
      if (cancelled) {
        return;
      }
      setComposerMode("typing");
      if (prefersReducedMotion) {
        setComposerText(preview);
        return;
      }
      const n = preview.length;
      const perChar = durationMs / Math.max(n, 1);
      for (let i = 0; i <= n; i += 1) {
        if (cancelled) {
          return;
        }
        setComposerText(preview.slice(0, i));
        await sleep(effectiveDelay(perChar));
      }
    };

    const runRecording = async (durationMs: number) => {
      if (cancelled) {
        return;
      }
      setComposerMode("recording");
      setComposerText("");
      setRecordingElapsedSec(0);
      if (prefersReducedMotion) {
        setRecordingElapsedSec(1);
        await sleep(80);
        return;
      }
      const tickMs = 200;
      let elapsed = 0;
      while (elapsed < durationMs && !cancelled) {
        await sleep(tickMs);
        elapsed += tickMs;
        setRecordingElapsedSec(Math.min(Math.floor(elapsed / 1000), 599));
      }
    };

    const play = async () => {
      setMessages([]);
      setTypingFrom(null);
      setComposerText("");
      setComposerMode("idle");

      for (let i = 0; i < steps.length; i += 1) {
        if (cancelled || playbackId.current !== id) {
          return;
        }
        const step = steps[i];
        switch (step.type) {
          case "composer_typing": {
            await runComposerTyping(step.preview, step.durationMs);
            const sendDelay = step.sendDelayMs ?? 400;
            await sleep(effectiveDelay(sendDelay));
            if (cancelled) {
              return;
            }
            setComposerMode("sending");
            setComposerText("");
            await sleep(effectiveDelay(prefersReducedMotion ? 40 : 280));
            if (cancelled) {
              return;
            }
            setComposerMode("idle");
            break;
          }
          case "typing_indicator": {
            setTypingFrom(step.from);
            await sleep(effectiveDelay(step.durationMs));
            if (cancelled) {
              return;
            }
            setTypingFrom(null);
            break;
          }
          case "message_text": {
            const mid = `m-${i}-${step.time}`;
            setMessages((prev) => [
              ...prev,
              {
                id: mid,
                kind: "text",
                from: step.from,
                text: step.text,
                time: step.time,
              },
            ]);
            await sleep(effectiveDelay(prefersReducedMotion ? 60 : 220));
            break;
          }
          case "recording_user": {
            await runRecording(step.durationMs);
            const sendDelay = step.sendDelayMs ?? 450;
            await sleep(effectiveDelay(sendDelay));
            if (cancelled) {
              return;
            }
            setComposerMode("sending");
            await sleep(effectiveDelay(prefersReducedMotion ? 40 : 320));
            if (cancelled) {
              return;
            }
            setComposerMode("idle");
            setRecordingElapsedSec(0);
            break;
          }
          case "message_audio": {
            const mid = `a-${i}-${step.time}`;
            setMessages((prev) => [
              ...prev,
              {
                id: mid,
                kind: "audio",
                from: step.from,
                seconds: step.seconds,
                time: step.time,
                transcript: step.transcript,
                senderLabel: step.senderLabel,
              },
            ]);
            await sleep(effectiveDelay(prefersReducedMotion ? 60 : 220));
            break;
          }
          case "sending_photo_user": {
            setComposerText("");
            setComposerMode("sending_photo");
            await sleep(effectiveDelay(step.durationMs));
            const photoSendDelay = step.sendDelayMs ?? 400;
            await sleep(effectiveDelay(photoSendDelay));
            if (cancelled) {
              return;
            }
            setComposerMode("sending");
            await sleep(effectiveDelay(prefersReducedMotion ? 40 : 280));
            if (cancelled) {
              return;
            }
            setComposerMode("idle");
            break;
          }
          case "message_image": {
            const mid = `img-${i}-${step.time}`;
            setMessages((prev) => [
              ...prev,
              {
                id: mid,
                kind: "image",
                from: step.from,
                time: step.time,
                imageSrc: step.image,
                imageAlt:
                  step.alt ?? "Foto na conversa (simulação)",
              },
            ]);
            await sleep(effectiveDelay(prefersReducedMotion ? 60 : 220));
            break;
          }
          default: {
            const _exhaustive: never = step;
            void _exhaustive;
            break;
          }
        }
      }
    };

    void play();

    return () => {
      cancelled = true;
    };
  }, [isInView, prefersReducedMotion]);

  const headerSubtitle =
    typingFrom === "agent"
      ? "a digitar…"
      : typingFrom === "user"
        ? "a escrever…"
        : "online";

  return (
    <div ref={rootRef} className="w-full min-h-0">
      <div
        className="overflow-hidden rounded-2xl border border-black/10 shadow-[0_28px_72px_-14px_rgba(0,0,0,0.28)] dark:border-white/10 sm:rounded-[1.35rem]"
        role="region"
        aria-labelledby={headingId}
      >
        <p id={headingId} className="sr-only">
          Simulação animada de conversa no WhatsApp com agente de IA
        </p>
        <div className="flex items-center gap-3 bg-[#075E54] px-3 py-3 text-white sm:px-4 sm:py-3.5">
          <span
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-lg sm:size-10"
            aria-hidden
          >
            ←
          </span>
          <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3">
            <span
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-semibold sm:size-11 sm:text-[15px]"
              aria-hidden
            >
              K4
            </span>
            <div className="min-w-0">
              <p className="truncate text-[15px] font-medium leading-tight sm:text-[16px]">
                Key4up · Agente do comércio
              </p>
              <p
                className="text-[12px] text-white/85 sm:text-[13px]"
                aria-live="polite"
              >
                {headerSubtitle}
              </p>
            </div>
          </div>
          <span className="shrink-0 text-lg opacity-90" aria-hidden>
            ⋮
          </span>
        </div>
        <div className="relative flex h-[min(500px,68vh)] flex-col overflow-hidden bg-[#e5ddd5] dark:bg-[#0b141a] sm:h-[min(580px,72vh)]">
          <div
            className="pointer-events-none absolute inset-0 z-0 bg-repeat opacity-100 dark:opacity-[0.38]"
            style={{
              backgroundImage: `url(${WHATSAPP_WALLPAPER_SRC})`,
              backgroundSize: "380px auto",
              backgroundPosition: "left top",
            }}
            aria-hidden
          />
          <div
            ref={scrollRef}
            className="relative z-[1] min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-3 pt-3.5 pb-2 sm:px-3.5 sm:pt-4"
          >
            <ul className="flex min-h-full flex-col justify-end gap-2.5 sm:gap-3" aria-live="polite">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.li
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: prefersReducedMotion ? 0.12 : 0.28,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="list-none"
                  >
                    {msg.kind === "text" ? (
                      <div
                        className={`flex w-full ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={
                            msg.from === "user"
                              ? "max-w-[90%] rounded-lg rounded-tr-sm bg-[#d9fdd3] px-3 py-2 shadow-sm dark:bg-[#005c4b] sm:max-w-[88%]"
                              : "max-w-[92%] rounded-lg rounded-tl-sm bg-white px-3 py-2 shadow-sm dark:bg-[#1f2c33]"
                          }
                        >
                          <p className="text-[15px] leading-[1.38] tracking-[-0.01em] text-[#0a0d12] dark:text-[#e8eaed] sm:text-[15.5px]">
                            {msg.text}
                          </p>
                          <p className="mt-1 text-right text-[11px] tabular-nums text-[#667781] dark:text-[#8696a0]">
                            {msg.time}
                          </p>
                        </div>
                      </div>
                    ) : msg.kind === "audio" ? (
                      <AudioBubble
                        from={msg.from}
                        seconds={msg.seconds ?? 0}
                        time={msg.time}
                        transcript={msg.transcript}
                        senderLabel={msg.senderLabel}
                      />
                    ) : (
                      <ImageBubble
                        from={msg.from}
                        imageSrc={msg.imageSrc ?? ""}
                        imageAlt={msg.imageAlt ?? "Foto na conversa (simulação)"}
                        time={msg.time}
                      />
                    )}
                  </motion.li>
                ))}
              </AnimatePresence>
              {typingFrom ? (
                <li className="list-none">
                  <TypingDots
                    align={typingFrom === "user" ? "right" : "left"}
                    reducedMotion={Boolean(prefersReducedMotion)}
                  />
                </li>
              ) : null}
            </ul>
          </div>
          <div className="relative z-[1] shrink-0 px-3 pb-3.5 pt-2 sm:px-3.5 sm:pb-4 sm:pt-2">
            <div
              className={`pointer-events-none flex items-center gap-2 rounded-full border border-black/5 bg-white/95 px-3 py-2.5 text-[14px] text-[#8696a0] shadow-sm dark:border-white/10 dark:bg-[#1f2c33]/95 dark:text-[#8696a0] sm:py-3 ${
                composerMode === "recording"
                  ? "ring-2 ring-red-500/55"
                  : composerMode === "sending_photo"
                    ? "ring-2 ring-[#00a884]/45"
                    : ""
              }`}
              aria-hidden
            >
              {composerMode === "recording" ? (
                <span className="flex items-center gap-2 text-[13px] font-medium text-red-600 dark:text-red-400">
                  <span className="relative flex size-2.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-500 opacity-60" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-red-600" />
                  </span>
                  A gravar… {formatAudioLabel(recordingElapsedSec)}
                </span>
              ) : composerMode === "sending_photo" ? (
                <span className="flex min-h-[1.25em] flex-1 items-center gap-2 text-[13px] font-medium text-[#54656f] dark:text-[#b8c0c5]">
                  <span className="text-lg" aria-hidden>
                    📷
                  </span>
                  A preparar foto…
                </span>
              ) : (
                <span className="min-h-[1.25em] flex-1 truncate">
                  {composerMode === "sending" ? (
                    <span className="text-[#8696a0]/70">A enviar…</span>
                  ) : composerText ? (
                    composerText
                  ) : (
                    "Mensagem"
                  )}
                </span>
              )}
              <span
                className={`ml-auto flex size-9 shrink-0 items-center justify-center rounded-full text-white sm:size-10 ${
                  composerMode === "recording"
                    ? "bg-red-600"
                    : "bg-[#00a884]"
                }`}
              >
                <Mic className="size-4 sm:size-[18px]" strokeWidth={2} aria-hidden />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
