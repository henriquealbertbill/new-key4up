"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { pt } from "date-fns/locale"
import * as React from "react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/style.css"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

/**
 * Calendário estilo shadcn + tabela nativa do react-day-picker v9.
 * Não usar flex em `weekdays`/`week`/`day` — são <tr>/<td> e quebram o alinhamento.
 * `fixedWeeks` (default true) mantém sempre 6 linhas de datas para o bloco não saltar entre meses.
 */
function Calendar({
  className,
  classNames,
  locale = pt,
  showOutsideDays = true,
  fixedWeeks = true,
  navLayout = "around",
  captionLayout = "label",
  weekStartsOn = 1,
  components,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      locale={locale}
      showOutsideDays={showOutsideDays}
      fixedWeeks={fixedWeeks}
      navLayout={navLayout}
      captionLayout={captionLayout}
      weekStartsOn={weekStartsOn}
      className={cn("w-full min-w-0 p-2", className)}
      classNames={{
        ...classNames,
        root: cn("w-full max-w-full min-w-[288px]", classNames?.root),
        months: cn("w-full max-w-full space-y-4", classNames?.months),
        /** Com navLayout="around", prev | caption | next são irmãos: space-y empilhava setas — usar grelha. */
        month: cn(
          "relative grid min-w-[288px] w-full grid-cols-[auto_minmax(0,1fr)_auto] grid-rows-[auto_auto] gap-x-1 gap-y-3",
          classNames?.month,
        ),
        month_caption: cn(
          "col-start-2 row-start-1 flex h-11 w-full min-w-0 items-center justify-center px-1",
          classNames?.month_caption,
        ),
        dropdowns: cn("flex w-full flex-1 items-center justify-center gap-2", classNames?.dropdowns),
        dropdown_root: cn(
          "relative inline-flex h-9 min-h-9 shrink-0 items-stretch rounded-md border border-input bg-background shadow-sm",
          "min-w-[7.25rem] pl-2 pr-1 sm:min-w-[8rem]",
          classNames?.dropdown_root,
        ),
        dropdown: cn(
          "absolute inset-0 z-10 h-full w-full min-w-0 cursor-pointer opacity-0",
          classNames?.dropdown,
        ),
        months_dropdown: cn(
          "h-full min-h-9 w-full min-w-0 cursor-pointer appearance-none rounded-md border-0 bg-transparent py-0 pl-0 pr-6 text-sm font-medium text-transparent",
          classNames?.months_dropdown,
        ),
        years_dropdown: cn(
          "h-full min-h-9 w-full min-w-0 cursor-pointer appearance-none rounded-md border-0 bg-transparent py-0 pl-0 pr-6 text-sm font-medium text-transparent",
          classNames?.years_dropdown,
        ),
        caption_label: cn(
          "pointer-events-none text-center text-sm font-semibold text-foreground",
          classNames?.caption_label,
        ),
        nav: cn(
          "mt-2 flex items-center justify-between gap-1",
          classNames?.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: "ghost" }),
          "col-start-1 row-start-1 size-9 shrink-0 justify-self-start self-center p-0 text-muted-foreground hover:text-foreground",
          classNames?.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: "ghost" }),
          "col-start-3 row-start-1 size-9 shrink-0 justify-self-end self-center p-0 text-muted-foreground hover:text-foreground",
          classNames?.button_next,
        ),
        month_grid: cn(
          "col-span-3 row-start-2 w-full table-fixed border-collapse text-center",
          classNames?.month_grid,
        ),
        weekdays: cn("h-10", classNames?.weekdays),
        weekday: cn(
          "w-[14.28%] p-1 text-center align-middle text-[11px] font-medium text-muted-foreground sm:text-xs",
          classNames?.weekday,
        ),
        /** Com `fixedWeeks`, o RDP mostra sempre 6 linhas de semanas; `h-10` fixa a altura de cada linha. */
        weeks: cn("align-top", classNames?.weeks),
        week: cn("h-10 align-top", classNames?.week),
        day: cn(
          "group p-0 text-center align-middle text-sm",
          classNames?.day,
        ),
        day_button: cn(
          "relative mx-auto flex size-9 min-w-9 items-center justify-center rounded-xl p-0 text-sm font-normal transition-colors",
          "text-foreground",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/60",
          "group-aria-[selected=true]:bg-primary group-aria-[selected=true]:font-semibold group-aria-[selected=true]:text-primary-foreground group-aria-[selected=true]:shadow-sm",
          "group-aria-[selected=true]:hover:bg-primary/90 group-aria-[selected=true]:hover:text-primary-foreground",
          "group-aria-[selected=true]:after:absolute group-aria-[selected=true]:after:bottom-0.5 group-aria-[selected=true]:after:left-1/2 group-aria-[selected=true]:after:size-1 group-aria-[selected=true]:after:-translate-x-1/2 group-aria-[selected=true]:after:rounded-full group-aria-[selected=true]:after:bg-primary-foreground group-aria-[selected=true]:after:content-['']",
          classNames?.day_button,
        ),
        selected: cn(
          "rounded-lg",
          classNames?.selected,
        ),
        today: cn(
          "font-semibold",
          "aria-[selected=true]:font-semibold",
          classNames?.today,
        ),
        outside: cn("text-muted-foreground/70", classNames?.outside),
        disabled: cn("opacity-40", classNames?.disabled),
      }}
      components={{
        ...components,
        Chevron: ({ className: chevronClass, orientation, ...rest }) => {
          if (orientation === "left") {
            return <ChevronLeft className={cn("size-4", chevronClass)} strokeWidth={2} aria-hidden {...rest} />
          }
          if (orientation === "right") {
            return <ChevronRight className={cn("size-4", chevronClass)} strokeWidth={2} aria-hidden {...rest} />
          }
          return (
            <ChevronRight
              className={cn("size-3.5 shrink-0 text-muted-foreground opacity-70", chevronClass)}
              strokeWidth={2}
              aria-hidden
              {...rest}
            />
          )
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
