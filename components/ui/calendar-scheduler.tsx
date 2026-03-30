"use client"

/**
 * Agendador estilo 21st/shadcn + integração Cal.com.
 * Props alargadas face ao snippet base (`date`, `timeSlots` com ISO, `dayDisabled`, etc.).
 * O `Calendar` em `@/components/ui/calendar` usa react-day-picker v9 com tabela nativa — não substituir pelo originui em flex nas linhas da grelha.
 */

import { format } from "date-fns"
import { pt } from "date-fns/locale"
import { CalendarDays } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type CalendarTimeSlot = {
  readonly value: string
  readonly label: string
}

export interface CalendarSchedulerProps {
  readonly title?: string
  readonly date: Date | undefined
  readonly onDateChange: (next: Date | undefined) => void
  readonly calendarStartMonth: Date
  readonly calendarEndMonth: Date
  readonly dayDisabled: (day: Date) => boolean
  readonly timeSlots: readonly CalendarTimeSlot[]
  readonly onConfirm?: (value: { date: Date; timeSlot: CalendarTimeSlot }) => void
  readonly className?: string
}

const splitSlotsByPeriod = (
  slots: readonly CalendarTimeSlot[],
): { readonly morning: CalendarTimeSlot[]; readonly afternoon: CalendarTimeSlot[] } => {
  const morning: CalendarTimeSlot[] = []
  const afternoon: CalendarTimeSlot[] = []
  for (const slot of slots) {
    const minutes = new Date(slot.value).getHours() * 60 + new Date(slot.value).getMinutes()
    if (minutes < 12 * 60) {
      morning.push(slot)
    } else {
      afternoon.push(slot)
    }
  }
  return { morning, afternoon }
}

function CalendarScheduler({
  title = "Agendar reunião",
  date,
  onDateChange,
  calendarStartMonth,
  calendarEndMonth,
  dayDisabled,
  timeSlots,
  onConfirm,
  className,
}: CalendarSchedulerProps) {
  const [displayMonth, setDisplayMonth] = React.useState<Date>(() => date ?? calendarStartMonth)
  const [timeSlot, setTimeSlot] = React.useState<CalendarTimeSlot | undefined>()

  React.useEffect(() => {
    if (date) {
      setDisplayMonth(new Date(date.getFullYear(), date.getMonth(), 1))
    }
  }, [date])

  React.useEffect(() => {
    setTimeSlot(undefined)
  }, [timeSlots, date])

  const { morning, afternoon } = React.useMemo(() => splitSlotsByPeriod(timeSlots), [timeSlots])

  const handleReset = () => {
    onDateChange(undefined)
    setTimeSlot(undefined)
    setDisplayMonth(calendarStartMonth)
  }

  const handleConfirm = () => {
    if (!date || !timeSlot) {
      return
    }
    onConfirm?.({ date, timeSlot })
  }

  const canPickTime = Boolean(date) && timeSlots.length > 0

  const formattedDatePt =
    date != null
      ? format(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: pt })
      : null

  const renderSlotGroup = (label: string, slots: CalendarTimeSlot[]) => {
    if (slots.length === 0) {
      return null
    }
    return (
      <div className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
        <div className="grid min-w-0 grid-cols-3 gap-2">
          {slots.map((slot) => {
            const isSelected = timeSlot?.value === slot.value
            return (
              <Button
                key={slot.value}
                type="button"
                variant={isSelected ? "default" : "outline"}
                size="sm"
                className={cn(
                  "h-9 w-full min-w-0 justify-center rounded-full px-2 text-xs font-medium tabular-nums sm:text-sm",
                  isSelected && "border-primary shadow-sm",
                )}
                onClick={() => setTimeSlot(slot)}
              >
                <span className="truncate">{slot.label}</span>
              </Button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className={cn("w-full", className)}>
      <Card className="w-full max-w-[640px] border-none bg-transparent shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold tracking-tight">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="w-full overflow-x-auto rounded-xl border border-border bg-card/30 p-3 dark:bg-card/20">
            <Calendar
              mode="single"
              selected={date}
              onSelect={onDateChange}
              disabled={dayDisabled}
              startMonth={calendarStartMonth}
              endMonth={calendarEndMonth}
              month={displayMonth}
              onMonthChange={setDisplayMonth}
              className="rounded-md"
            />
          </div>

          <div className="flex w-full min-w-0 flex-col rounded-xl border border-border bg-card/30 p-4 dark:bg-card/20">
            <div className="mb-4 min-w-0 shrink-0 space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Escolhe a hora</p>
              {formattedDatePt != null ? (
                <p className="text-sm font-medium leading-snug text-foreground">{formattedDatePt}</p>
              ) : (
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground sm:text-sm">
                  <CalendarDays className="size-3.5 shrink-0 opacity-80" aria-hidden />
                  Seleciona uma data.
                </p>
              )}
            </div>

            {!canPickTime ? (
              <p className="text-sm text-muted-foreground">
                {date != null && timeSlots.length === 0
                  ? "Sem horas livres neste dia."
                  : "Escolhe um dia com disponibilidade."}
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                <p className="text-xs text-muted-foreground">
                  {timeSlots.length} {timeSlots.length === 1 ? "hora disponível" : "horas disponíveis"}
                </p>
                {renderSlotGroup("Manhã", morning)}
                {renderSlotGroup("Tarde / noite", afternoon)}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-between">
          <Button type="button" variant="ghost" size="sm" onClick={handleReset}>
            Limpar
          </Button>
          <Button type="button" size="sm" onClick={handleConfirm} disabled={!date || !timeSlot}>
            Confirmar
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export { CalendarScheduler }
