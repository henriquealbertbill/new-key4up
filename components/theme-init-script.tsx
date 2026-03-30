import type { ReactElement } from "react"
import Script from "next/script"

const THEME_INIT_JS = `
(function(){
  try {
    var k="key4up-theme";
    var s=localStorage.getItem(k);
    var dark=s==="dark";
    document.documentElement.classList.toggle("dark", dark);
  } catch (e) {}
})()
`

/**
 * Runs before hydration. Default is always light; dark only if the user chose it (localStorage).
 */
export default function ThemeInitScript(): ReactElement {
  return (
    <Script id="theme-init" strategy="beforeInteractive">
      {THEME_INIT_JS}
    </Script>
  )
}
