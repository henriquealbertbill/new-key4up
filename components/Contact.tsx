"use client"

import { useState, type ChangeEvent, type FormEvent, type KeyboardEvent } from "react"
import { motion } from "framer-motion"
import { Calendar, Mail, Send } from "lucide-react"
import CalApiBooking from "./CalApiBooking"
import SectionTitle from "./ui/SectionTitle"
import Button from "./ui/form-button"

const CONTACT_EMAIL = "geral@key4up.com" as const
const CAL_PROFILE_URL =
  `https://cal.com/${process.env.NEXT_PUBLIC_CAL_USERNAME ?? "henrique-albert"}` as const

type ContactPanelId = "message" | "call"

const CONTACT_TAB_ORDER: ContactPanelId[] = ["message", "call"]

type ContactFormState = {
  name: string
  email: string
  message: string
}

const initialForm: ContactFormState = {
  name: "",
  email: "",
  message: "",
}

const buildMailtoHref = (input: ContactFormState): string => {
  const subject = `Contacto — ${input.name.trim() || "Website"}`
  const body = [
    `Nome: ${input.name.trim()}`,
    `Email: ${input.email.trim()}`,
    "",
    input.message.trim(),
  ].join("\n")
  const params = new URLSearchParams({
    subject,
    body,
  })
  return `mailto:${CONTACT_EMAIL}?${params.toString()}`
}

export default function Contact() {
  const [activePanel, setActivePanel] = useState<ContactPanelId>("message")
  const [form, setForm] = useState<ContactFormState>(initialForm)
  const [didSubmitAttempt, setDidSubmitAttempt] = useState(false)

  const handleSelectPanel = (panel: ContactPanelId) => {
    setActivePanel(panel)
  }

  const handleTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return
    }
    event.preventDefault()
    const index = CONTACT_TAB_ORDER.indexOf(activePanel)
    const delta = event.key === "ArrowRight" ? 1 : -1
    const nextIndex = (index + delta + CONTACT_TAB_ORDER.length) % CONTACT_TAB_ORDER.length
    const nextPanel = CONTACT_TAB_ORDER[nextIndex]
    handleSelectPanel(nextPanel)
  }

  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
  const canSubmit =
    form.name.trim().length > 0 && form.email.trim().length > 0 && emailLooksValid && form.message.trim().length > 0

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setDidSubmitAttempt(true)
    if (!canSubmit) {
      return
    }
    window.location.href = buildMailtoHref(form)
  }

  const handleChange =
    (field: keyof ContactFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }))
    }

  return (
    <section id="contacto" aria-label="Contacto" className="border-t border-figma-border bg-background py-24 sm:py-28">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-8 lg:px-11">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionTitle ghostLines={["Vamos"]} solidLine="falar." className="mb-8" />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-md text-base leading-relaxed text-figma-muted"
            >
              Conta-me o teu projeto, prazos e objetivos. Respondo em poucos dias úteis com próximos passos ou uma
              proposta direta.
            </motion.p>
            <motion.ul
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-col gap-6"
            >
              <li>
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-figma-gray">Email</p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-figma-muted"
                >
                  <Mail className="size-4 shrink-0 text-figma-gray" aria-hidden />
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-figma-gray">Agendar</p>
                <p className="mt-2 inline-flex items-start gap-2 text-sm leading-snug text-foreground">
                  <Calendar className="mt-0.5 size-4 shrink-0 text-figma-gray" aria-hidden />
                  <span>
                    Usa o separador <span className="font-semibold">Marcar uma call</span> para escolher horário na API do
                    Cal.com (sem iframe).
                  </span>
                </p>
              </li>
            </motion.ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div
              className="rounded-2xl border border-figma-border bg-card p-6 shadow-[0px_0.6px_0.6px_-1.1px_rgba(0,0,0,0.12),0px_8px_20px_-4px_rgba(0,0,0,0.06)] dark:border-card-border dark:shadow-none sm:p-8"
            >
              <div
                role="tablist"
                aria-label="Modo de contacto"
                onKeyDown={handleTabKeyDown}
                className="mb-6 flex w-full gap-1 rounded-full border border-figma-border bg-figma-gallery/80 p-1 dark:border-card-border dark:bg-card-border/40"
              >
                <button
                  type="button"
                  role="tab"
                  id="tab-contact-message"
                  aria-selected={activePanel === "message"}
                  aria-controls="panel-contact-message"
                  tabIndex={activePanel === "message" ? 0 : -1}
                  onClick={() => handleSelectPanel("message")}
                  className={`relative flex-1 rounded-full px-3 py-2.5 text-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/25 focus-visible:ring-offset-2 focus-visible:ring-offset-card sm:px-4 ${
                    activePanel === "message"
                      ? "bg-background text-foreground shadow-sm dark:bg-background"
                      : "text-figma-muted hover:text-foreground"
                  }`}
                >
                  Enviar mensagem
                </button>
                <button
                  type="button"
                  role="tab"
                  id="tab-contact-call"
                  aria-selected={activePanel === "call"}
                  aria-controls="panel-contact-call"
                  tabIndex={activePanel === "call" ? 0 : -1}
                  onClick={() => handleSelectPanel("call")}
                  className={`relative flex-1 rounded-full px-3 py-2.5 text-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/25 focus-visible:ring-offset-2 focus-visible:ring-offset-card sm:px-4 ${
                    activePanel === "call"
                      ? "bg-background text-foreground shadow-sm dark:bg-background"
                      : "text-figma-muted hover:text-foreground"
                  }`}
                >
                  Marcar uma call
                </button>
              </div>

              <div
                role="tabpanel"
                id="panel-contact-message"
                aria-labelledby="tab-contact-message"
                hidden={activePanel !== "message"}
                className={activePanel !== "message" ? "hidden" : undefined}
              >
                <form id="form-contacto" onSubmit={handleSubmit} noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <label htmlFor="contact-name" className="block text-xs font-medium uppercase tracking-[0.08em] text-figma-gray">
                        Nome
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={handleChange("name")}
                        aria-invalid={didSubmitAttempt && !form.name.trim()}
                        aria-describedby={didSubmitAttempt && !form.name.trim() ? "contact-name-error" : undefined}
                        className="mt-2 w-full rounded-xl border border-figma-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-[box-shadow,border-color] placeholder:text-figma-muted focus:border-foreground focus:ring-2 focus:ring-foreground/15 dark:border-card-border dark:bg-background"
                        placeholder="O teu nome"
                      />
                      {didSubmitAttempt && !form.name.trim() ? (
                        <p id="contact-name-error" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                          Indica o teu nome.
                        </p>
                      ) : null}
                    </div>
                    <div className="sm:col-span-1">
                      <label htmlFor="contact-email" className="block text-xs font-medium uppercase tracking-[0.08em] text-figma-gray">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={handleChange("email")}
                        aria-invalid={didSubmitAttempt && (!form.email.trim() || !emailLooksValid)}
                        aria-describedby={
                          didSubmitAttempt && (!form.email.trim() || !emailLooksValid) ? "contact-email-error" : undefined
                        }
                        className="mt-2 w-full rounded-xl border border-figma-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-[box-shadow,border-color] placeholder:text-figma-muted focus:border-foreground focus:ring-2 focus:ring-foreground/15 dark:border-card-border dark:bg-background"
                        placeholder="nome@empresa.com"
                      />
                      {didSubmitAttempt && (!form.email.trim() || !emailLooksValid) ? (
                        <p id="contact-email-error" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                          Indica um email válido.
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="mt-5">
                    <label htmlFor="contact-message" className="block text-xs font-medium uppercase tracking-[0.08em] text-figma-gray">
                      Mensagem
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange("message")}
                      aria-invalid={didSubmitAttempt && !form.message.trim()}
                      aria-describedby={didSubmitAttempt && !form.message.trim() ? "contact-message-error" : undefined}
                      className="mt-2 w-full resize-y rounded-xl border border-figma-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-[box-shadow,border-color] placeholder:text-figma-muted focus:border-foreground focus:ring-2 focus:ring-foreground/15 dark:border-card-border dark:bg-background"
                      placeholder="Projeto, stack, prazo, orçamento orientativo…"
                    />
                    {didSubmitAttempt && !form.message.trim() ? (
                      <p id="contact-message-error" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                        Escreve uma mensagem.
                      </p>
                    ) : null}
                  </div>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-figma-muted">
                      Ao enviar, abre-se o teu cliente de email com a mensagem preenchida.
                    </p>
                    <Button type="submit" variant="primary" size="md" className="shrink-0 justify-center sm:justify-start">
                      <Send className="size-4" aria-hidden />
                      Enviar mensagem
                    </Button>
                  </div>
                </form>
              </div>

              <div
                role="tabpanel"
                id="panel-contact-call"
                aria-labelledby="tab-contact-call"
                hidden={activePanel !== "call"}
                className={activePanel !== "call" ? "hidden" : undefined}
              >
                {activePanel === "call" ? <CalApiBooking /> : null}
                <p className="mt-3 text-xs text-figma-muted">
                  Marcação via{" "}
                  <a href={CAL_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="font-medium text-foreground underline-offset-2 hover:underline">
                    Cal.com
                  </a>
                  . Se o teu evento for privado, precisas de API key no servidor — vê a documentação Cal.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
