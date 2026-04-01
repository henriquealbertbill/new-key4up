// @ts-nocheck — Unframer generated bundle; strict checking would duplicate unframer internals
"use client"

/**
 * Unframer bundle: Work History (Bx6rBCZSm). Prefer updating via `unframer` CLI when the Framer project changes.
 * Control props use Framer-internal IDs (see `FramerWorkHistoryControlProps`).
 */
/* eslint-disable -- generated layout / motion */

import type { CSSProperties, ReactNode } from "react"

/** Framer canvas controls mapped to codegen prop names (company1 → qGp7vI2z6, etc.). */
export type FramerWorkHistoryControlProps = {
  readonly children?: ReactNode
  readonly locale?: string
  readonly style?: CSSProperties
  readonly className?: string
  readonly id?: string
  readonly width?: unknown
  readonly height?: unknown
  readonly layoutId?: string
  readonly variant?: "Closed" | "Open"
  readonly qGp7vI2z6?: string
  readonly wrlTXIfKr?: string
  readonly rrXhSebWp?: string
  readonly cWbhifCIf?: string
  readonly C3wqzi1gH?: string
  readonly rxHhshyDG?: string
  readonly fY47FdliR?: string
  readonly onWmspHut?: string
  readonly ciHciAUDB?: string
}

import { Icon } from "./chunks/chunk-NI3BWCIH.js";
import { className, css, fonts } from "./chunks/chunk-3GSWMNFR.js";
import {
  className as className2,
  css as css2,
  fonts as fonts2,
} from "./chunks/chunk-B53WOYBJ.js";
import { routes } from "./chunks/chunk-UMI7NCHA.js";

// virtual:work-history
import { Fragment as Fragment3 } from "react";
import { ContextProviders } from "unframer";

// /:https://framerusercontent.com/modules/iOJbpZ441oAbkSoMn8lF/vB0RPqWbP1DQtTzsHOIk/Bx6rBCZSm.js
import { jsx as _jsx2, jsxs as _jsxs2 } from "react/jsx-runtime";
import {
  addFonts as addFonts2,
  addPropertyControls as addPropertyControls2,
  ComponentViewportProvider,
  ControlType as ControlType2,
  cx as cx2,
  forwardLoader,
  getFonts,
  getFontsFromSharedStyle as getFontsFromSharedStyle2,
  RichText as RichText2,
  SmartComponentScopedContainer,
  useActiveVariantCallback,
  useComponentViewport as useComponentViewport2,
  useLocaleInfo as useLocaleInfo2,
  useVariantState as useVariantState2,
  withCSS as withCSS2,
} from "unframer";
import {
  LayoutGroup as LayoutGroup2,
  motion as motion2,
  MotionConfigContext as MotionConfigContext2,
} from "unframer";
import * as React2 from "react";
import { useRef as useRef2 } from "react";

// /:https://framerusercontent.com/modules/k5RHJY0YzIv0vwL3ZH4x/8T2yXsVEPtFfNxxhrxRe/VaHmJ_0mu.js
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import {
  addFonts,
  addPropertyControls,
  ControlType,
  cx,
  getFontsFromSharedStyle,
  RichText,
  useComponentViewport,
  useLocaleInfo,
  useVariantState,
  withCSS,
} from "unframer";
import { LayoutGroup, motion, MotionConfigContext } from "unframer";
import * as React from "react";
import { useRef } from "react";
var serializationHash = "framer-1qiCu";
var variantClassNames = {
  mWXUroCXi: "framer-v-1v7iyva",
};
var transition1 = {
  bounce: 0.2,
  delay: 0,
  duration: 0.4,
  type: "spring",
};
var Transition = ({ value, children }) => {
  const config = React.useContext(MotionConfigContext);
  const transition = value ?? config.transition;
  const contextValue = React.useMemo(
    () => ({
      ...config,
      transition,
    }),
    [JSON.stringify(transition)],
  );
  return (
    <MotionConfigContext.Provider value={contextValue}>
      {children}
    </MotionConfigContext.Provider>
  );
};
var Variants = motion.create(React.Fragment);
var getProps = ({ company, date, height, id, title, width, ...props }) => {
  return {
    ...props,
    MtwQdXmPu: date ?? props.MtwQdXmPu ?? "2020-2022",
    Q9Y3Wh1N0: title ?? props.Q9Y3Wh1N0 ?? "Staff Product Designer",
    u951OiT8B: company ?? props.u951OiT8B ?? "ZigZag",
  };
};
var createLayoutDependency = (props, variants) => {
  if (props.layoutDependency)
    return variants.join("-") + props.layoutDependency;
  return variants.join("-");
};
var Component = /* @__PURE__ */ React.forwardRef(function (props, ref) {
  const fallbackRef = useRef(null);
  const refBinding = ref ?? fallbackRef;
  const defaultLayoutId = React.useId();
  const { activeLocale, setLocale } = useLocaleInfo();
  const componentViewport = useComponentViewport();
  const {
    style,
    className: className3,
    layoutId,
    variant,
    u951OiT8B: u951OiT8B2,
    MtwQdXmPu: MtwQdXmPu2,
    Q9Y3Wh1N0: Q9Y3Wh1N02,
    ...restProps
  } = getProps(props);
  const {
    baseVariant,
    classNames,
    clearLoadingGesture,
    gestureHandlers,
    gestureVariant,
    isLoading,
    setGestureState,
    setVariant,
    variants,
  } = useVariantState({
    defaultVariant: "mWXUroCXi",
    ref: refBinding,
    variant,
    variantClassNames,
  });
  const layoutDependency = createLayoutDependency(props, variants);
  const sharedStyleClassNames = [className2, className];
  const scopingClassNames = cx(serializationHash, ...sharedStyleClassNames);
  return (
    <LayoutGroup id={layoutId ?? defaultLayoutId}>
      <Variants animate={variants} initial={false}>
        <Transition value={transition1}>
          <motion.div
            {...restProps}
            {...gestureHandlers}
            className={cx(
              scopingClassNames,
              "framer-1v7iyva",
              className3,
              classNames,
            )}
            data-border={true}
            data-framer-name={"History"}
            layoutDependency={layoutDependency}
            layoutId={"mWXUroCXi"}
            ref={refBinding}
            style={{
              "--border-bottom-width": "1px",
              "--border-color":
                "var(--token-e3a90888-763b-420f-bb27-f2520e07d9b1, rgb(222, 222, 222))",
              "--border-left-width": "1px",
              "--border-right-width": "1px",
              "--border-style": "solid",
              "--border-top-width": "1px",
              backgroundColor:
                "var(--token-33c8dbd0-eb94-4e90-8099-e7a3fee4ad2f, rgb(255, 255, 255))",
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              boxShadow:
                "0px 0.5971439051427296px 0.5971439051427296px -0.9375px rgba(0, 0, 0, 0.07), 0px 1.8108796073283884px 1.8108796073283884px -1.875px rgba(0, 0, 0, 0.07), 0px 4.786990141113346px 4.786990141113346px -2.8125px rgba(0, 0, 0, 0.06), 0px 15px 15px -3.75px rgba(0, 0, 0, 0.03)",
              ...style,
            }}
          >
            <motion.div
              className={"framer-ctsyc2"}
              data-framer-name={"Container"}
              layoutDependency={layoutDependency}
              layoutId={"DnmWMRMtH"}
            >
              <motion.div
                className={"framer-a9yo0v"}
                data-framer-name={"Company & Dates"}
                layoutDependency={layoutDependency}
                layoutId={"NkmUCy2GZ"}
              >
                <RichText
                  __fromCanvasComponent={true}
                  className={"framer-1wjplei"}
                  fonts={["Inter"]}
                  layoutDependency={layoutDependency}
                  layoutId={"Fmi5iEI9i"}
                  style={{
                    "--framer-link-text-color": "rgb(0, 153, 255)",
                    "--framer-link-text-decoration": "underline",
                  }}
                  text={u951OiT8B2}
                  verticalAlignment={"top"}
                  withExternalLayout={true}
                >
                  <React.Fragment>
                    <motion.p
                      className={"framer-styles-preset-1pvr9s"}
                      data-styles-preset={"aPqv2C1EJ"}
                      dir={"auto"}
                    >
                      {"ZigZag"}
                    </motion.p>
                  </React.Fragment>
                </RichText>
                <RichText
                  __fromCanvasComponent={true}
                  className={"framer-uvrv9v"}
                  fonts={["Inter"]}
                  layoutDependency={layoutDependency}
                  layoutId={"pwvhmRABd"}
                  style={{
                    "--extracted-r6o4lv":
                      "var(--token-994646e0-68ea-49d7-897a-104048558f6f, rgb(84, 84, 84))",
                    "--framer-link-text-color": "rgb(0, 153, 255)",
                    "--framer-link-text-decoration": "underline",
                  }}
                  text={Q9Y3Wh1N02}
                  verticalAlignment={"top"}
                  withExternalLayout={true}
                >
                  <React.Fragment>
                    <motion.p
                      className={"framer-styles-preset-455vy9"}
                      data-styles-preset={"xYEC_wF3E"}
                      dir={"auto"}
                      style={{
                        "--framer-text-color":
                          "var(--extracted-r6o4lv, var(--token-994646e0-68ea-49d7-897a-104048558f6f, rgb(84, 84, 84)))",
                      }}
                    >
                      {"Staff Product Designer"}
                    </motion.p>
                  </React.Fragment>
                </RichText>
              </motion.div>
              <RichText
                __fromCanvasComponent={true}
                className={"framer-6bebwn"}
                fonts={["Inter"]}
                layoutDependency={layoutDependency}
                layoutId={"xFlTvv3NA"}
                style={{
                  "--extracted-r6o4lv":
                    "var(--token-994646e0-68ea-49d7-897a-104048558f6f, rgb(84, 84, 84))",
                  "--framer-link-text-color": "rgb(0, 153, 255)",
                  "--framer-link-text-decoration": "underline",
                }}
                text={MtwQdXmPu2}
                verticalAlignment={"top"}
                withExternalLayout={true}
              >
                <React.Fragment>
                  <motion.p
                    className={"framer-styles-preset-455vy9"}
                    data-styles-preset={"xYEC_wF3E"}
                    dir={"auto"}
                    style={{
                      "--framer-text-color":
                        "var(--extracted-r6o4lv, var(--token-994646e0-68ea-49d7-897a-104048558f6f, rgb(84, 84, 84)))",
                    }}
                  >
                    {"2020-2022"}
                  </motion.p>
                </React.Fragment>
              </RichText>
            </motion.div>
          </motion.div>
        </Transition>
      </Variants>
    </LayoutGroup>
  );
});
var css3 = [
  "@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
  ".framer-1qiCu.framer-fkch29, .framer-1qiCu .framer-fkch29 { display: block; }",
  ".framer-1qiCu.framer-1v7iyva { align-content: center; align-items: center; display: flex; flex-direction: column; flex-wrap: nowrap; height: min-content; justify-content: space-between; overflow: visible; padding: 18px; position: relative; width: 300px; }",
  ".framer-1qiCu .framer-ctsyc2 { align-content: flex-end; align-items: flex-end; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; height: min-content; justify-content: space-between; overflow: visible; padding: 0px; position: relative; width: 100%; }",
  ".framer-1qiCu .framer-a9yo0v { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 4px; height: min-content; justify-content: flex-start; overflow: visible; padding: 0px; position: relative; width: min-content; }",
  ".framer-1qiCu .framer-1wjplei { flex: none; height: auto; overflow: visible; position: relative; white-space: pre; width: auto; }",
  ".framer-1qiCu .framer-uvrv9v, .framer-1qiCu .framer-6bebwn { flex: none; height: auto; position: relative; white-space: pre; width: auto; }",
  ...css2,
  ...css,
  '.framer-1qiCu[data-border="true"]::after, .framer-1qiCu [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; corner-shape: inherit; pointer-events: none; }',
];
var FramerVaHmJ_0mu = withCSS(Component, css3, "framer-1qiCu");
var stdin_default = FramerVaHmJ_0mu;
FramerVaHmJ_0mu.displayName = "Work Card";
FramerVaHmJ_0mu.defaultProps = {
  height: 76,
  width: 300,
};
addPropertyControls(FramerVaHmJ_0mu, {
  u951OiT8B: {
    defaultValue: "ZigZag",
    displayTextArea: false,
    title: "Company",
    type: ControlType.String,
  },
  MtwQdXmPu: {
    defaultValue: "2020-2022",
    displayTextArea: false,
    title: "Date",
    type: ControlType.String,
  },
  Q9Y3Wh1N0: {
    defaultValue: "Staff Product Designer",
    displayTextArea: false,
    title: "Title",
    type: ControlType.String,
  },
});
addFonts(
  FramerVaHmJ_0mu,
  [
    {
      explicitInter: true,
      fonts: [
        {
          cssFamilyName: "Inter",
          source: "framer",
          style: "normal",
          uiFamilyName: "Inter",
          unicodeRange:
            "U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F",
          url: "https://framerusercontent.com/assets/5vvr9Vy74if2I6bQbJvbw7SY1pQ.woff2",
          weight: "400",
        },
        {
          cssFamilyName: "Inter",
          source: "framer",
          style: "normal",
          uiFamilyName: "Inter",
          unicodeRange: "U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116",
          url: "https://framerusercontent.com/assets/EOr0mi4hNtlgWNn9if640EZzXCo.woff2",
          weight: "400",
        },
        {
          cssFamilyName: "Inter",
          source: "framer",
          style: "normal",
          uiFamilyName: "Inter",
          unicodeRange: "U+1F00-1FFF",
          url: "https://framerusercontent.com/assets/Y9k9QrlZAqio88Klkmbd8VoMQc.woff2",
          weight: "400",
        },
        {
          cssFamilyName: "Inter",
          source: "framer",
          style: "normal",
          uiFamilyName: "Inter",
          unicodeRange: "U+0370-03FF",
          url: "https://framerusercontent.com/assets/OYrD2tBIBPvoJXiIHnLoOXnY9M.woff2",
          weight: "400",
        },
        {
          cssFamilyName: "Inter",
          source: "framer",
          style: "normal",
          uiFamilyName: "Inter",
          unicodeRange:
            "U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF",
          url: "https://framerusercontent.com/assets/JeYwfuaPfZHQhEG8U5gtPDZ7WQ.woff2",
          weight: "400",
        },
        {
          cssFamilyName: "Inter",
          source: "framer",
          style: "normal",
          uiFamilyName: "Inter",
          unicodeRange:
            "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2070, U+2074-207E, U+2080-208E, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
          url: "https://framerusercontent.com/assets/GrgcKwrN6d3Uz8EwcLHZxwEfC4.woff2",
          weight: "400",
        },
        {
          cssFamilyName: "Inter",
          source: "framer",
          style: "normal",
          uiFamilyName: "Inter",
          unicodeRange:
            "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB",
          url: "https://framerusercontent.com/assets/b6Y37FthZeALduNqHicBT6FutY.woff2",
          weight: "400",
        },
      ],
    },
    ...getFontsFromSharedStyle(fonts2),
    ...getFontsFromSharedStyle(fonts),
  ],
  {
    supportsExplicitInterCodegen: true,
  },
);

// /:https://framerusercontent.com/modules/iOJbpZ441oAbkSoMn8lF/vB0RPqWbP1DQtTzsHOIk/Bx6rBCZSm.js
var WorkCardFonts = getFonts(stdin_default);
var PhosphorFonts = getFonts(Icon);
var cycleOrder = ["wrjEuEMq5", "HWoct9CQh"];
var serializationHash2 = "framer-yls2A";
var variantClassNames2 = {
  HWoct9CQh: "framer-v-ah5at9",
  wrjEuEMq5: "framer-v-4ul5sv",
};
function addPropertyOverrides(overrides, ...variants) {
  const nextOverrides = {};
  variants?.forEach(
    (variant) => variant && Object.assign(nextOverrides, overrides[variant]),
  );
  return nextOverrides;
}
var transition12 = {
  bounce: 0.2,
  delay: 0,
  duration: 0.6,
  type: "spring",
};
var transformTemplate1 = (_, t) => `translateX(-50%) ${t}`;
var Transition2 = ({ value, children }) => {
  const config = React2.useContext(MotionConfigContext2);
  const transition = value ?? config.transition;
  const contextValue = React2.useMemo(
    () => ({
      ...config,
      transition,
    }),
    [JSON.stringify(transition)],
  );
  return (
    <MotionConfigContext2.Provider value={contextValue}>
      {children}
    </MotionConfigContext2.Provider>
  );
};
var humanReadableVariantMap = {
  Closed: "wrjEuEMq5",
  Open: "HWoct9CQh",
};
var Variants2 = motion2.create(React2.Fragment);
var getProps2 = ({
  company1,
  company2,
  company3,
  date1,
  date2,
  date3,
  height,
  id,
  title1,
  title2,
  title3,
  width,
  ...props
}) => {
  return {
    ...props,
    C3wqzi1gH: title2 ?? props.C3wqzi1gH ?? "Staff Product Designer",
    ciHciAUDB: date3 ?? props.ciHciAUDB ?? "2016-2020",
    cWbhifCIf: company2 ?? props.cWbhifCIf ?? "Quantum",
    fY47FdliR: company3 ?? props.fY47FdliR ?? "Zazzle",
    onWmspHut: title3 ?? props.onWmspHut ?? "Designer",
    qGp7vI2z6: company1 ?? props.qGp7vI2z6 ?? "Nexus Technology",
    rrXhSebWp: date1 ?? props.rrXhSebWp ?? "2012-2024",
    rxHhshyDG: date2 ?? props.rxHhshyDG ?? "2020-2022",
    variant:
      humanReadableVariantMap[props.variant] ?? props.variant ?? "wrjEuEMq5",
    wrlTXIfKr: title1 ?? props.wrlTXIfKr ?? "Full-Stack Designer",
  };
};
var createLayoutDependency2 = (props, variants) => {
  if (props.layoutDependency)
    return variants.join("-") + props.layoutDependency;
  return variants.join("-");
};
var Component2 = /* @__PURE__ */ React2.forwardRef(function (props, ref) {
  const fallbackRef = useRef2(null);
  const refBinding = ref ?? fallbackRef;
  const defaultLayoutId = React2.useId();
  const { activeLocale, setLocale } = useLocaleInfo2();
  const componentViewport = useComponentViewport2();
  const {
    style,
    className: className3,
    layoutId,
    variant,
    qGp7vI2z6: qGp7vI2z62,
    wrlTXIfKr: wrlTXIfKr2,
    rrXhSebWp: rrXhSebWp2,
    cWbhifCIf: cWbhifCIf2,
    C3wqzi1gH: C3wqzi1gH2,
    rxHhshyDG: rxHhshyDG2,
    fY47FdliR: fY47FdliR2,
    onWmspHut: onWmspHut2,
    ciHciAUDB: ciHciAUDB2,
    ...restProps
  } = getProps2(props);
  const {
    baseVariant,
    classNames,
    clearLoadingGesture,
    gestureHandlers,
    gestureVariant,
    isLoading,
    setGestureState,
    setVariant,
    variants,
  } = useVariantState2({
    cycleOrder,
    defaultVariant: "wrjEuEMq5",
    ref: refBinding,
    variant,
    variantClassNames: variantClassNames2,
  });
  const layoutDependency = createLayoutDependency2(props, variants);
  const { activeVariantCallback, delay } =
    useActiveVariantCallback(baseVariant);
  const onTap1gh82vc = activeVariantCallback(async (...args) => {
    setGestureState({
      isPressed: false,
    });
    setVariant("HWoct9CQh");
  });
  const onTapw2kpiw = activeVariantCallback(async (...args) => {
    setGestureState({
      isPressed: false,
    });
    setVariant("wrjEuEMq5");
  });
  const sharedStyleClassNames = [className];
  const scopingClassNames = cx2(serializationHash2, ...sharedStyleClassNames);
  return (
    <LayoutGroup2 id={layoutId ?? defaultLayoutId}>
      <Variants2 animate={variants} initial={false}>
        <Transition2 value={transition12}>
          <motion2.div
            {...restProps}
            {...gestureHandlers}
            className={cx2(
              scopingClassNames,
              "framer-4ul5sv",
              className3,
              classNames,
            )}
            data-framer-name={"Closed"}
            data-highlight={true}
            layoutDependency={layoutDependency}
            layoutId={"wrjEuEMq5"}
            onTap={onTap1gh82vc}
            ref={refBinding}
            style={{
              ...style,
            }}
            {...addPropertyOverrides(
              {
                HWoct9CQh: {
                  "data-framer-name": "Open",
                  onTap: onTapw2kpiw,
                },
              },
              baseVariant,
              gestureVariant,
            )}
          >
            <motion2.div
              className={"framer-1n76p3r"}
              data-framer-name={"Work History"}
              layoutDependency={layoutDependency}
              layoutId={"R7CU6kHnG"}
            >
              <ComponentViewportProvider
                height={76}
                width={componentViewport?.width || "100vw"}
                y={
                  (componentViewport?.y || 0) +
                  0 +
                  (((componentViewport?.height || 200) - 0 - 138) / 2 + 0 + 0) +
                  0 +
                  0
                }
                {...addPropertyOverrides(
                  {
                    HWoct9CQh: {
                      y:
                        (componentViewport?.y || 0) +
                        0 +
                        (((componentViewport?.height || 200) - 0 - 314) / 2 +
                          0 +
                          0) +
                        0 +
                        0,
                    },
                  },
                  baseVariant,
                  gestureVariant,
                )}
              >
                <SmartComponentScopedContainer
                  className={"framer-tda8zr-container"}
                  data-framer-name={"Work History 1"}
                  layoutDependency={layoutDependency}
                  layoutId={"PDCgrqfau-container"}
                  name={"Work History 1"}
                  nodeId={"PDCgrqfau"}
                  rendersWithMotion={true}
                  scopeId={"Bx6rBCZSm"}
                >
                  {_jsx2(stdin_default, {
                    height: "100%",
                    id: "PDCgrqfau",
                    layoutId: "PDCgrqfau",
                    MtwQdXmPu: rrXhSebWp2,
                    name: "Work History 1",
                    Q9Y3Wh1N0: wrlTXIfKr2,
                    style: {
                      width: "100%",
                    },
                    u951OiT8B: qGp7vI2z62,
                    width: "100%",
                  })}
                </SmartComponentScopedContainer>
              </ComponentViewportProvider>
              <ComponentViewportProvider
                height={76}
                width={componentViewport?.width || "100vw"}
                y={
                  (componentViewport?.y || 0) +
                  0 +
                  (((componentViewport?.height || 200) - 0 - 138) / 2 + 0 + 0) +
                  8
                }
                {...addPropertyOverrides(
                  {
                    HWoct9CQh: {
                      y:
                        (componentViewport?.y || 0) +
                        0 +
                        (((componentViewport?.height || 200) - 0 - 314) / 2 +
                          0 +
                          0) +
                        0 +
                        88,
                    },
                  },
                  baseVariant,
                  gestureVariant,
                )}
              >
                <SmartComponentScopedContainer
                  className={"framer-tsyghy-container"}
                  data-framer-name={"Work History 2"}
                  layoutDependency={layoutDependency}
                  layoutId={"lu7wGB5vs-container"}
                  name={"Work History 2"}
                  nodeId={"lu7wGB5vs"}
                  rendersWithMotion={true}
                  scopeId={"Bx6rBCZSm"}
                  style={{
                    scale: 0.95,
                  }}
                  transformTemplate={transformTemplate1}
                  variants={{
                    HWoct9CQh: {
                      scale: 1,
                    },
                  }}
                  {...addPropertyOverrides(
                    {
                      HWoct9CQh: {
                        transformTemplate: void 0,
                      },
                    },
                    baseVariant,
                    gestureVariant,
                  )}
                >
                  {_jsx2(stdin_default, {
                    height: "100%",
                    id: "lu7wGB5vs",
                    layoutId: "lu7wGB5vs",
                    MtwQdXmPu: rxHhshyDG2,
                    name: "Work History 2",
                    Q9Y3Wh1N0: C3wqzi1gH2,
                    style: {
                      width: "100%",
                    },
                    u951OiT8B: cWbhifCIf2,
                    width: "100%",
                  })}
                </SmartComponentScopedContainer>
              </ComponentViewportProvider>
              <ComponentViewportProvider
                height={76}
                width={componentViewport?.width || "100vw"}
                y={
                  (componentViewport?.y || 0) +
                  0 +
                  (((componentViewport?.height || 200) - 0 - 138) / 2 + 0 + 0) +
                  16
                }
                {...addPropertyOverrides(
                  {
                    HWoct9CQh: {
                      y:
                        (componentViewport?.y || 0) +
                        0 +
                        (((componentViewport?.height || 200) - 0 - 314) / 2 +
                          0 +
                          0) +
                        0 +
                        176,
                    },
                  },
                  baseVariant,
                  gestureVariant,
                )}
              >
                <SmartComponentScopedContainer
                  className={"framer-1pk4stx-container"}
                  data-framer-name={"Work History 3"}
                  layoutDependency={layoutDependency}
                  layoutId={"lL9qYg5Pn-container"}
                  name={"Work History 3"}
                  nodeId={"lL9qYg5Pn"}
                  rendersWithMotion={true}
                  scopeId={"Bx6rBCZSm"}
                  style={{
                    scale: 0.9,
                  }}
                  transformTemplate={transformTemplate1}
                  variants={{
                    HWoct9CQh: {
                      scale: 1,
                    },
                  }}
                  {...addPropertyOverrides(
                    {
                      HWoct9CQh: {
                        transformTemplate: void 0,
                      },
                    },
                    baseVariant,
                    gestureVariant,
                  )}
                >
                  {_jsx2(stdin_default, {
                    height: "100%",
                    id: "lL9qYg5Pn",
                    layoutId: "lL9qYg5Pn",
                    MtwQdXmPu: ciHciAUDB2,
                    name: "Work History 3",
                    Q9Y3Wh1N0: onWmspHut2,
                    style: {
                      width: "100%",
                    },
                    u951OiT8B: fY47FdliR2,
                    width: "100%",
                  })}
                </SmartComponentScopedContainer>
              </ComponentViewportProvider>
            </motion2.div>
            <motion2.div
              className={"framer-1rzo9gk"}
              data-border={true}
              data-framer-name={"Show More / Hide"}
              layoutDependency={layoutDependency}
              layoutId={"WYoxjJiNA"}
              style={{
                "--border-bottom-width": "1px",
                "--border-color":
                  "var(--token-08cb0f10-6dc5-4949-913f-dbd7168f1cf0, rgb(240, 240, 240))",
                "--border-left-width": "1px",
                "--border-right-width": "1px",
                "--border-style": "solid",
                "--border-top-width": "1px",
                backgroundColor:
                  "var(--token-33c8dbd0-eb94-4e90-8099-e7a3fee4ad2f, rgb(255, 255, 255))",
                borderBottomLeftRadius: 24,
                borderBottomRightRadius: 24,
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                boxShadow:
                  "0px 0.6021873017743928px 0.6021873017743928px -1.25px rgba(0, 0, 0, 0.18), 0px 2.288533303243457px 2.288533303243457px -2.5px rgba(0, 0, 0, 0.16), 0px 10px 10px -3.75px rgba(0, 0, 0, 0.06)",
              }}
            >
              <RichText2
                __fromCanvasComponent={true}
                className={"framer-sbqftt"}
                fonts={["Inter"]}
                layoutDependency={layoutDependency}
                layoutId={"nKVeM35DL"}
                style={{
                  "--framer-link-text-color": "rgb(0, 153, 255)",
                  "--framer-link-text-decoration": "underline",
                  "--framer-paragraph-spacing": "0px",
                }}
                verticalAlignment={"top"}
                withExternalLayout={true}
                {...addPropertyOverrides(
                  {
                    HWoct9CQh: {
                      children: (
                        <React2.Fragment>
                          <motion2.p
                            className={"framer-styles-preset-455vy9"}
                            data-styles-preset={"xYEC_wF3E"}
                          >
                            {"Hide"}
                          </motion2.p>
                        </React2.Fragment>
                      ),
                    },
                  },
                  baseVariant,
                  gestureVariant,
                )}
              >
                <React2.Fragment>
                  <motion2.p
                    className={"framer-styles-preset-455vy9"}
                    data-styles-preset={"xYEC_wF3E"}
                    dir={"auto"}
                  >
                    {"Ver tudo"}
                  </motion2.p>
                </React2.Fragment>
              </RichText2>
              <ComponentViewportProvider>
                <SmartComponentScopedContainer
                  className={"framer-w9rdve-container"}
                  data-framer-name={"Caret"}
                  isAuthoredByUser={true}
                  isModuleExternal={true}
                  layoutDependency={layoutDependency}
                  layoutId={"H5PmzrrKe-container"}
                  name={"Caret"}
                  nodeId={"H5PmzrrKe"}
                  rendersWithMotion={true}
                  scopeId={"Bx6rBCZSm"}
                  style={{
                    rotate: 0,
                  }}
                  variants={{
                    HWoct9CQh: {
                      rotate: 180,
                    },
                  }}
                >
                  <Icon
                    color={
                      "var(--token-2759885a-0605-4b0d-ae5f-9a938c3766f2, rgb(0, 0, 0))"
                    }
                    height={"100%"}
                    iconSearch={"House"}
                    iconSelection={"CaretCircleDown"}
                    id={"H5PmzrrKe"}
                    layoutId={"H5PmzrrKe"}
                    mirrored={false}
                    name={"Caret"}
                    selectByList={true}
                    style={{
                      height: "100%",
                      width: "100%",
                    }}
                    weight={"fill"}
                    width={"100%"}
                  />
                </SmartComponentScopedContainer>
              </ComponentViewportProvider>
            </motion2.div>
          </motion2.div>
        </Transition2>
      </Variants2>
    </LayoutGroup2>
  );
});
var css4 = [
  "@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
  ".framer-yls2A.framer-1fnwc6k, .framer-yls2A .framer-1fnwc6k { display: block; }",
  ".framer-yls2A.framer-4ul5sv { align-content: center; align-items: center; cursor: pointer; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 32px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: 300px; }",
  ".framer-yls2A .framer-1n76p3r { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 12px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: 100%; }",
  ".framer-yls2A .framer-tda8zr-container { flex: none; height: auto; position: relative; width: 100%; z-index: 3; }",
  ".framer-yls2A .framer-tsyghy-container { flex: none; height: auto; left: 50%; position: absolute; top: 8px; width: 100%; z-index: 2; }",
  ".framer-yls2A .framer-1pk4stx-container { flex: none; height: auto; left: 50%; position: absolute; top: 16px; width: 100%; z-index: 1; }",
  ".framer-yls2A .framer-1rzo9gk { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 6px; justify-content: center; min-height: 30px; height: auto; overflow: visible; padding: 10px 14px; position: relative; width: min-content; }",
  ".framer-yls2A .framer-1rzo9gk .framer-sbqftt { align-items: center; display: flex; flex: none; height: auto; line-height: 0; position: relative; white-space: pre; width: auto; }",
  ".framer-yls2A .framer-1rzo9gk .framer-sbqftt p { display: block; line-height: 1.15; margin: 0; }",
  ".framer-yls2A .framer-sbqftt { flex: none; height: auto; position: relative; white-space: pre; width: auto; }",
  ".framer-yls2A .framer-1rzo9gk .framer-w9rdve-container { align-items: center; align-self: center; display: flex; flex: none; flex-shrink: 0; height: 12px; justify-content: center; position: relative; width: 12px; }",
  ".framer-yls2A .framer-w9rdve-container { flex: none; height: 12px; position: relative; width: 12px; }",
  ".framer-yls2A.framer-v-ah5at9 .framer-tsyghy-container, .framer-yls2A.framer-v-ah5at9 .framer-1pk4stx-container { left: unset; position: relative; top: unset; }",
  ...css,
  '.framer-yls2A[data-border="true"]::after, .framer-yls2A [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; corner-shape: inherit; pointer-events: none; }',
];
var FramerBx6rBCZSm = withCSS2(Component2, css4, "framer-yls2A");
var stdin_default2 = FramerBx6rBCZSm;
FramerBx6rBCZSm.displayName = "Work History";
FramerBx6rBCZSm.defaultProps = {
  height: 139,
  width: 300,
};
addPropertyControls2(FramerBx6rBCZSm, {
  variant: {
    options: ["wrjEuEMq5", "HWoct9CQh"],
    optionTitles: ["Closed", "Open"],
    title: "Variant",
    type: ControlType2.Enum,
  },
  qGp7vI2z6: {
    defaultValue: "Nexus Technology",
    displayTextArea: false,
    title: "Company 1",
    type: ControlType2.String,
  },
  wrlTXIfKr: {
    defaultValue: "Full-Stack Designer",
    displayTextArea: false,
    title: "Title 1",
    type: ControlType2.String,
  },
  rrXhSebWp: {
    defaultValue: "2012-2024",
    displayTextArea: false,
    title: "Date 1",
    type: ControlType2.String,
  },
  cWbhifCIf: {
    defaultValue: "Quantum",
    displayTextArea: false,
    title: "Company 2",
    type: ControlType2.String,
  },
  C3wqzi1gH: {
    defaultValue: "Staff Product Designer",
    displayTextArea: false,
    title: "Title 2",
    type: ControlType2.String,
  },
  rxHhshyDG: {
    defaultValue: "2020-2022",
    displayTextArea: false,
    title: "Date 2",
    type: ControlType2.String,
  },
  fY47FdliR: {
    defaultValue: "Zazzle",
    displayTextArea: false,
    title: "Company 3",
    type: ControlType2.String,
  },
  onWmspHut: {
    defaultValue: "Designer",
    displayTextArea: false,
    title: "Title 3",
    type: ControlType2.String,
  },
  ciHciAUDB: {
    defaultValue: "2016-2020",
    displayTextArea: false,
    title: "Date 3",
    type: ControlType2.String,
  },
});
addFonts2(
  FramerBx6rBCZSm,
  [
    {
      explicitInter: true,
      fonts: [
        {
          cssFamilyName: "Inter",
          source: "framer",
          style: "normal",
          uiFamilyName: "Inter",
          unicodeRange:
            "U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F",
          url: "https://framerusercontent.com/assets/5vvr9Vy74if2I6bQbJvbw7SY1pQ.woff2",
          weight: "400",
        },
        {
          cssFamilyName: "Inter",
          source: "framer",
          style: "normal",
          uiFamilyName: "Inter",
          unicodeRange: "U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116",
          url: "https://framerusercontent.com/assets/EOr0mi4hNtlgWNn9if640EZzXCo.woff2",
          weight: "400",
        },
        {
          cssFamilyName: "Inter",
          source: "framer",
          style: "normal",
          uiFamilyName: "Inter",
          unicodeRange: "U+1F00-1FFF",
          url: "https://framerusercontent.com/assets/Y9k9QrlZAqio88Klkmbd8VoMQc.woff2",
          weight: "400",
        },
        {
          cssFamilyName: "Inter",
          source: "framer",
          style: "normal",
          uiFamilyName: "Inter",
          unicodeRange: "U+0370-03FF",
          url: "https://framerusercontent.com/assets/OYrD2tBIBPvoJXiIHnLoOXnY9M.woff2",
          weight: "400",
        },
        {
          cssFamilyName: "Inter",
          source: "framer",
          style: "normal",
          uiFamilyName: "Inter",
          unicodeRange:
            "U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF",
          url: "https://framerusercontent.com/assets/JeYwfuaPfZHQhEG8U5gtPDZ7WQ.woff2",
          weight: "400",
        },
        {
          cssFamilyName: "Inter",
          source: "framer",
          style: "normal",
          uiFamilyName: "Inter",
          unicodeRange:
            "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2070, U+2074-207E, U+2080-208E, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
          url: "https://framerusercontent.com/assets/GrgcKwrN6d3Uz8EwcLHZxwEfC4.woff2",
          weight: "400",
        },
        {
          cssFamilyName: "Inter",
          source: "framer",
          style: "normal",
          uiFamilyName: "Inter",
          unicodeRange:
            "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB",
          url: "https://framerusercontent.com/assets/b6Y37FthZeALduNqHicBT6FutY.woff2",
          weight: "400",
        },
      ],
    },
    ...WorkCardFonts,
    ...PhosphorFonts,
    ...getFontsFromSharedStyle2(fonts),
  ],
  {
    supportsExplicitInterCodegen: true,
  },
);
FramerBx6rBCZSm.loader = {
  load: (props, context) => {
    const locale = context.locale;
    return Promise.allSettled([forwardLoader(stdin_default, {}, context)]);
  },
};

// virtual:work-history
import { WithFramerBreakpoints } from "unframer";
import { jsx } from "react/jsx-runtime";
var locales = [];
var defaultResponsiveVariants = {
  base: "wrjEuEMq5",
};
/** @type {function(Props): any} */
function ComponentWithRoot({ locale, ...rest }) {
  return (
    <ContextProviders
      routes={routes}
      framerSiteId={
        "0e6d645bd10e55baeaf5506a44fad69a4a32a264fb6901dc89344048fda9ac90"
      }
      locale={locale}
      locales={locales}
    >
      {jsx(stdin_default2, {
        ...rest,
      })}
    </ContextProviders>
  );
}
/**
 * @type {import("unframer").UnframerBreakpoint}
 * Represents a responsive breakpoint for unframer.
 */

/**
 * @typedef VariantsMap
 * Partial record of UnframerBreakpoint to Props.variant, with a mandatory 'base' key.
 * { [key in UnframerBreakpoint]?: Props['variant'] } & { base: Props['variant'] }
 */

/**
 * Renders WorkHistoryFramerComponent for all breakpoints with a variants map. Variant prop is inferred per breakpoint.
 * @function
 * @param {Omit<Props, 'variant'> & {variants?: VariantsMap}} props
 * @returns {any}
 */
ComponentWithRoot.Responsive = ({ locale = "", ...rest }) => {
  return (
    <ContextProviders
      routes={routes}
      framerSiteId={
        "0e6d645bd10e55baeaf5506a44fad69a4a32a264fb6901dc89344048fda9ac90"
      }
      locale={locale}
      locales={locales}
    >
      <WithFramerBreakpoints
        Component={stdin_default2}
        variants={defaultResponsiveVariants}
        {...rest}
      />
    </ContextProviders>
  );
};
Object.assign(ComponentWithRoot, stdin_default2);
var work_history_default = ComponentWithRoot;
export { work_history_default as default };
