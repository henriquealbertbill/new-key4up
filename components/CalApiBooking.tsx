"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { CheckCircle2, ExternalLink, Loader2 } from "lucide-react"
import { CalendarScheduler, type CalendarTimeSlot } from "@/components/ui/calendar-scheduler"
import { Button as UiButton } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Button from "./ui/form-button"

const CAL_API_ORIGIN = "https://api.cal.com" as const
const SLOTS_API_VERSION = "2024-09-04" as const
const BOOKINGS_API_VERSION = "2026-02-25" as const
/** Janela de slots a pedir à API (navegação por vários meses). */
const SLOT_FETCH_DAY_SPAN = 120 as const

const DEFAULT_USERNAME = "henrique-albert" as const
const DEFAULT_EVENT_SLUG = "30min" as const

type SlotItem = { start: string }

type SlotsJson = {
  data?: Record<string, SlotItem[] | string[]>
  error?: { message?: string }
}

type BookingSuccessJson = {
  status?: string
  data?: {
    meetingUrl?: string
    title?: string
    start?: string
    end?: string
  }
}

type BookingErrorJson = {
  error?: { message?: string }
  message?: string
}

const getPublicCalConfig = (): { username: string; eventTypeSlug: string; profileUrl: string } => {
  const username = process.env.NEXT_PUBLIC_CAL_USERNAME ?? DEFAULT_USERNAME
  const eventTypeSlug = process.env.NEXT_PUBLIC_CAL_EVENT_SLUG ?? DEFAULT_EVENT_SLUG
  const profileUrl = `https://cal.com/${username}`
  return { username, eventTypeSlug, profileUrl }
}

const addDaysLocal = (base: Date, days: number): Date => {
  const next = new Date(base.getFullYear(), base.getMonth(), base.getDate())
  next.setDate(next.getDate() + days)
  return next
}

const formatLocalYmd = (d: Date): string => {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

const atLocalMidnight = (d: Date): Date => {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

const normalizeSlotList = (raw: Record<string, SlotItem[] | string[] | undefined>): Record<string, SlotItem[]> => {
  const out: Record<string, SlotItem[]> = {}
  for (const [day, list] of Object.entries(raw)) {
    if (!list?.length) {
      continue
    }
    const first = list[0]
    if (typeof first === "string") {
      out[day] = (list as string[]).map((start) => ({ start }))
      continue
    }
    out[day] = list as SlotItem[]
  }
  return out
}

const pickErrorMessage = (body: unknown, fallback: string): string => {
  if (body && typeof body === "object") {
    const b = body as BookingErrorJson
    if (b.error?.message) {
      return b.error.message
    }
    if (typeof b.message === "string") {
      return b.message
    }
  }
  return fallback
}

/**
 * Fluxo de marcação com a API pública Cal.com (slots + criar booking), sem iframe.
 * Para eventos públicos não é obrigatória API key; ver documentação Cal se mudares para evento privado.
 */
export default function CalApiBooking() {
  const { username, eventTypeSlug, profileUrl } = useMemo(() => getPublicCalConfig(), [])
  const timeZone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, [])

  const [slotsByDay, setSlotsByDay] = useState<Record<string, SlotItem[]> | null>(null)
  const [slotsError, setSlotsError] = useState<string | null>(null)
  const [isLoadingSlots, setIsLoadingSlots] = useState(true)

  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<SlotItem | null>(null)

  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [calSchedulerKey, setCalSchedulerKey] = useState(0)

  const [attendeeName, setAttendeeName] = useState("")
  const [attendeeEmail, setAttendeeEmail] = useState("")
  const [attendeeMessage, setAttendeeMessage] = useState("")
  const [bookingError, setBookingError] = useState<string | null>(null)
  const [isBooking, setIsBooking] = useState(false)
  const [bookingDone, setBookingDone] = useState<{ meetingUrl: string; title: string } | null>(null)

  const loadSlots = useCallback(async () => {
    setIsLoadingSlots(true)
    setSlotsError(null)
    setSlotsByDay(null)
    try {
      const start = new Date()
      const end = addDaysLocal(start, SLOT_FETCH_DAY_SPAN - 1)
      const params = new URLSearchParams({
        username,
        eventTypeSlug,
        start: formatLocalYmd(start),
        end: formatLocalYmd(end),
        timeZone,
      })
      const res = await fetch(`${CAL_API_ORIGIN}/v2/slots?${params.toString()}`, {
        method: "GET",
        headers: { "cal-api-version": SLOTS_API_VERSION },
      })
      const json = (await res.json()) as SlotsJson
      if (!res.ok) {
        setSlotsError(pickErrorMessage(json, "Não foi possível carregar os horários."))
        return
      }
      const normalized = normalizeSlotList(json.data ?? {})
      setSlotsByDay(normalized)
      const firstDay = Object.keys(normalized).sort()[0] ?? null
      setSelectedDay(firstDay)
      setSelectedSlot(null)
      setBookingDone(null)
    } catch {
      setSlotsError("Erro de rede ao carregar horários.")
    } finally {
      setIsLoadingSlots(false)
    }
  }, [username, eventTypeSlug, timeZone])

  useEffect(() => {
    void loadSlots()
  }, [loadSlots])

  useEffect(() => {
    setSelectedSlot(null)
  }, [selectedDay])

  const sortedDays = useMemo(() => (slotsByDay ? Object.keys(slotsByDay).sort() : []), [slotsByDay])

  const slotsForSelectedDay = useMemo(() => {
    if (!selectedDay || !slotsByDay) {
      return []
    }
    return slotsByDay[selectedDay] ?? []
  }, [selectedDay, slotsByDay])

  const selectedCalendarDate = useMemo(() => {
    if (!selectedDay) {
      return undefined
    }
    return new Date(`${selectedDay}T12:00:00`)
  }, [selectedDay])

  const rangeStart = useMemo(() => atLocalMidnight(new Date()), [])

  const calendarStartMonth = useMemo(() => {
    const t = new Date()
    return new Date(t.getFullYear(), t.getMonth(), 1)
  }, [])

  /** Último mês visível nos dropdowns (fim do ano civil seguinte). */
  const calendarEndMonth = useMemo(() => {
    const t = new Date()
    return new Date(t.getFullYear() + 1, 11, 1)
  }, [])

  const schedulerTimeSlots: CalendarTimeSlot[] = useMemo(
    () =>
      slotsForSelectedDay.map((s) => ({
        value: s.start,
        label: new Date(s.start).toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" }),
      })),
    [slotsForSelectedDay],
  )

  const handleSchedulerDateChange = useCallback(
    (next: Date | undefined) => {
      if (!next) {
        const fallback = sortedDays[0] ?? null
        setSelectedDay(fallback)
        setBookingError(null)
        return
      }
      setSelectedDay(formatLocalYmd(next))
      setBookingError(null)
    },
    [sortedDays],
  )

  const dayDisabledForCal = useCallback(
    (day: Date) => {
      const t = atLocalMidnight(day)
      if (t < rangeStart) {
        return true
      }
      return !sortedDays.includes(formatLocalYmd(day))
    },
    [rangeStart, sortedDays],
  )

  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(attendeeEmail.trim())
  const canBook =
    Boolean(selectedSlot) && attendeeName.trim().length > 0 && attendeeEmail.trim().length > 0 && emailLooksValid

  const slotSummaryLabel = useMemo(() => {
    if (!selectedSlot || !selectedDay) {
      return null
    }
    const d = new Date(`${selectedDay}T12:00:00`)
    const dateStr = d.toLocaleDateString("pt-PT", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    const timeStr = new Date(selectedSlot.start).toLocaleTimeString("pt-PT", {
      hour: "2-digit",
      minute: "2-digit",
    })
    return `${dateStr} · ${timeStr}`
  }, [selectedDay, selectedSlot])

  const handleBookingDialogOpenChange = useCallback((open: boolean) => {
    setBookingModalOpen(open)
    if (!open) {
      setBookingError(null)
      setAttendeeName("")
      setAttendeeEmail("")
      setAttendeeMessage("")
      setSelectedSlot(null)
      setCalSchedulerKey((k) => k + 1)
    }
  }, [])

  const handleConfirmBooking = async () => {
    if (!selectedSlot) {
      return
    }
    setBookingError(null)
    if (!canBook) {
      setBookingError("Preenche nome e um email válido.")
      return
    }
    setIsBooking(true)
    try {
      const messageTrimmed = attendeeMessage.trim()
      const metadata =
        messageTrimmed.length > 0 ? { message: messageTrimmed.slice(0, 500) } : undefined
      const payload: Record<string, unknown> = {
        username,
        eventTypeSlug,
        start: selectedSlot.start,
        attendee: {
          name: attendeeName.trim(),
          email: attendeeEmail.trim(),
          timeZone,
          language: "pt",
        },
      }
      if (metadata) {
        payload.metadata = metadata
      }
      const res = await fetch(`${CAL_API_ORIGIN}/v2/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "cal-api-version": BOOKINGS_API_VERSION,
        },
        body: JSON.stringify(payload),
      })
      const json = (await res.json()) as BookingSuccessJson & BookingErrorJson
      if (!res.ok || json.status === "error") {
        setBookingError(pickErrorMessage(json, "Não foi possível criar a marcação."))
        return
      }
      const meetingUrl = json.data?.meetingUrl ?? profileUrl
      const title = json.data?.title ?? "Marcação confirmada"
      setBookingModalOpen(false)
      setBookingDone({ meetingUrl, title })
    } catch {
      setBookingError("Erro de rede ao confirmar a marcação.")
    } finally {
      setIsBooking(false)
    }
  }

  if (isLoadingSlots) {
    return (
      <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-xl border border-figma-border bg-background px-4 py-16 dark:border-card-border">
        <Loader2 className="size-9 animate-spin text-foreground" aria-hidden />
        <p className="text-sm font-medium text-foreground">A carregar horários disponíveis…</p>
      </div>
    )
  }

  if (slotsError) {
    return (
      <div className="rounded-xl border border-figma-border bg-background p-6 dark:border-card-border">
        <p className="text-sm text-foreground">{slotsError}</p>
        <Button type="button" variant="secondary" size="sm" className="mt-4" onClick={() => void loadSlots()}>
          Tentar outra vez
        </Button>
        <p className="mt-4 text-xs text-figma-muted">
          Podes marcar diretamente em{" "}
          <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="font-medium underline-offset-2 hover:underline">
            {profileUrl.replace("https://", "")}
          </a>
          .
        </p>
      </div>
    )
  }

  if (bookingDone) {
    return (
      <div className="rounded-xl border border-figma-border bg-background p-6 dark:border-card-border">
        <div className="flex gap-3">
          <CheckCircle2 className="size-8 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden />
          <div>
            <p className="font-semibold text-foreground">Marcação criada</p>
            <p className="mt-1 text-sm text-figma-muted">{bookingDone.title}</p>
            <a
              href={bookingDone.meetingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-2 hover:underline"
            >
              Abrir link da reunião
              <ExternalLink className="size-3.5" aria-hidden />
            </a>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-6"
          onClick={() => {
            setBookingDone(null)
            setSelectedSlot(null)
            setAttendeeName("")
            setAttendeeEmail("")
            setAttendeeMessage("")
            setCalSchedulerKey((k) => k + 1)
            void loadSlots()
          }}
        >
          Marcar outra chamada
        </Button>
      </div>
    )
  }

  if (!sortedDays.length) {
    return (
      <div className="rounded-xl border border-figma-border bg-background p-6 dark:border-card-border">
        <p className="text-sm text-foreground">Sem horários disponíveis neste intervalo.</p>
        <Button type="button" variant="secondary" size="sm" className="mt-4" onClick={() => void loadSlots()}>
          Atualizar
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-figma-border bg-background dark:border-card-border">
      <div className="p-4 sm:p-6">
        <CalendarScheduler
          key={calSchedulerKey}
          title="Escolhe dia e hora"
          date={selectedCalendarDate}
          onDateChange={handleSchedulerDateChange}
          calendarStartMonth={calendarStartMonth}
          calendarEndMonth={calendarEndMonth}
          dayDisabled={dayDisabledForCal}
          timeSlots={schedulerTimeSlots}
          onConfirm={({ timeSlot }) => {
            setSelectedSlot({ start: timeSlot.value })
            setBookingError(null)
            setBookingModalOpen(true)
          }}
        />

        <Dialog open={bookingModalOpen} onOpenChange={handleBookingDialogOpenChange}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Os teus dados</DialogTitle>
              <DialogDescription>
                {slotSummaryLabel != null ? (
                  <span className="block text-foreground/90">{slotSummaryLabel}</span>
                ) : (
                  "Completa o formulário para confirmar a marcação."
                )}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="cal-modal-name">Nome</Label>
                <Input
                  id="cal-modal-name"
                  name="name"
                  autoComplete="name"
                  value={attendeeName}
                  onChange={(e) => setAttendeeName(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cal-modal-email">Email</Label>
                <Input
                  id="cal-modal-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={attendeeEmail}
                  onChange={(e) => setAttendeeEmail(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cal-modal-message">Mensagem (opcional)</Label>
                <Textarea
                  id="cal-modal-message"
                  name="message"
                  rows={4}
                  maxLength={500}
                  placeholder="Contexto, objetivos da chamada, ou notas para o anfitrião…"
                  value={attendeeMessage}
                  onChange={(e) => setAttendeeMessage(e.target.value)}
                  className="min-h-[96px] rounded-xl"
                  aria-describedby="cal-modal-message-hint"
                />
                <p id="cal-modal-message-hint" className="text-xs text-muted-foreground">
                  Até 500 caracteres. Enviada como nota junto do pedido (metadata na Cal.com).
                </p>
              </div>
            </div>
            {bookingError ? (
              <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                {bookingError}
              </p>
            ) : null}
            <DialogFooter>
              <UiButton
                type="button"
                variant="outline"
                size="sm"
                className="rounded-xl"
                onClick={() => handleBookingDialogOpenChange(false)}
                disabled={isBooking}
              >
                Cancelar
              </UiButton>
              <Button
                type="button"
                variant="primary"
                size="md"
                className="w-full justify-center sm:w-auto"
                disabled={isBooking}
                onClick={() => void handleConfirmBooking()}
              >
                {isBooking ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                    A confirmar…
                  </>
                ) : (
                  "Confirmar marcação"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
