// @ts-nocheck — Unframer generated bundle; strict typing would duplicate unframer internals
"use client";

/**
 * Bottom contact nav (S05E3gKH6). Regenerate with `unframer` when the Framer project changes.
 */
/* eslint-disable -- generated layout / motion */

import type { CSSProperties, ReactNode } from "react";

export type FramerBottomContactNavControlProps = {
  readonly children?: ReactNode;
  readonly locale?: string;
  readonly style?: CSSProperties;
  readonly className?: string;
  readonly id?: string;
  readonly width?: unknown;
  readonly height?: unknown;
  readonly layoutId?: string;
  readonly variant?: "Closed" | "Open" | "Mobile";
  readonly bookACallLink?: string;
  readonly T2eKpjYwE?: string;
  /** Full WhatsApp / wa.me URL */
  readonly whatsappHref?: string;
  readonly S36CzfaRp?: (
    ...args: unknown[]
  ) => boolean | void | Promise<boolean | void>;
};

import { className, css, fonts } from "./chunks/chunk-AWW6CEJH.js";
import { Icon } from "./chunks/chunk-NI3BWCIH.js";
import {
  className as className2,
  css as css2,
  fonts as fonts2,
} from "./chunks/chunk-3GSWMNFR.js";
import { routes } from "./chunks/chunk-UMI7NCHA.js";

// virtual:bottom-contact-nav
import { Fragment as Fragment2 } from "react";
import { ContextProviders } from "unframer";

// /:https://framerusercontent.com/modules/w4MeXvCIF28w76IxilfQ/KKoJ0y1IlQFMjQ4kEl0O/S05E3gKH6.js
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import {
  addFonts,
  addPropertyControls,
  ComponentViewportProvider,
  ControlType,
  cx,
  getFonts,
  getFontsFromSharedStyle,
  Link,
  RichText,
  SmartComponentScopedContainer,
  useActiveVariantCallback,
  useComponentViewport,
  useLocaleInfo,
  useVariantState,
  withCSS,
} from "unframer";
import { LayoutGroup, motion, MotionConfigContext } from "unframer";
import * as React from "react";
import { useRef } from "react";
var PhosphorFonts = getFonts(Icon);
var cycleOrder = ["VuoPoLmFD", "bxU98jWOd", "Ykww8_o3B"];
var serializationHash = "framer-dyxdG";
var variantClassNames = {
  bxU98jWOd: "framer-v-1dnz59n",
  VuoPoLmFD: "framer-v-1x3l6cx",
  Ykww8_o3B: "framer-v-1rc6qq2",
};
function addPropertyOverrides(overrides, ...variants) {
  const nextOverrides = {};
  variants?.forEach(
    (variant) => variant && Object.assign(nextOverrides, overrides[variant]),
  );
  return nextOverrides;
}
var transition1 = {
  bounce: 0.2,
  delay: 0,
  duration: 0.5,
  type: "spring",
};
var transformTemplate1 = (_, t) => `translateY(-50%) ${t}`;
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
var humanReadableVariantMap = {
  Closed: "VuoPoLmFD",
  Mobile: "Ykww8_o3B",
  Open: "bxU98jWOd",
};
var Variants = motion.create(React.Fragment);
var getProps = ({
  bookACallLink,
  contactForm,
  whatsappHref,
  height,
  id,
  width,
  ...props
}) => {
  return {
    ...props,
    S36CzfaRp: contactForm ?? props.S36CzfaRp,
    T2eKpjYwE: bookACallLink ?? props.T2eKpjYwE,
    whatsappHref:
      whatsappHref ??
      props.whatsappHref ??
      "https://wa.me/?text=" +
        encodeURIComponent("Olá! Vim pelo site da Key4up."),
    variant:
      humanReadableVariantMap[props.variant] ?? props.variant ?? "VuoPoLmFD",
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
    T2eKpjYwE: T2eKpjYwE2,
    S36CzfaRp: S36CzfaRp2,
    whatsappHref: whatsappHref2,
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
    cycleOrder,
    defaultVariant: "VuoPoLmFD",
    ref: refBinding,
    variant,
    variantClassNames,
  });
  const layoutDependency = createLayoutDependency(props, variants);
  const { activeVariantCallback, delay } =
    useActiveVariantCallback(baseVariant);
  const onMouseEnter1c4e8v = activeVariantCallback(async (...args) => {
    setGestureState({
      isHovered: true,
    });
    setVariant("bxU98jWOd");
  });
  const onMouseLeave10mhex6 = activeVariantCallback(async (...args) => {
    setGestureState({
      isHovered: false,
    });
    setVariant("VuoPoLmFD");
  });
  const onTapau49yy = activeVariantCallback(async (...args) => {
    if (S36CzfaRp2) {
      const res = await S36CzfaRp2(...args);
      if (res === false) return false;
    }
  });
  const sharedStyleClassNames = [className, className2];
  const scopingClassNames = cx(serializationHash, ...sharedStyleClassNames);
  const isDisplayed = () => {
    if (baseVariant === "Ykww8_o3B") return false;
    return true;
  };
  return (
    <LayoutGroup id={layoutId ?? defaultLayoutId}>
      <Variants animate={variants} initial={false}>
        <Transition value={transition1}>
          <motion.nav
            {...restProps}
            {...gestureHandlers}
            className={cx(
              scopingClassNames,
              "framer-1x3l6cx",
              className3,
              classNames,
            )}
            data-border={true}
            data-framer-name={"Closed"}
            data-highlight={true}
            layoutDependency={layoutDependency}
            layoutId={"VuoPoLmFD"}
            onMouseEnter={onMouseEnter1c4e8v}
            ref={refBinding}
            style={{
              "--border-bottom-width": "1px",
              "--border-color":
                "var(--token-e3a90888-763b-420f-bb27-f2520e07d9b1, rgb(222, 222, 222))",
              "--border-left-width": "1px",
              "--border-right-width": "1px",
              "--border-style": "solid",
              "--border-top-width": "1px",
              backdropFilter: "blur(5px)",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              borderBottomLeftRadius: 48,
              borderBottomRightRadius: 48,
              borderTopLeftRadius: 48,
              borderTopRightRadius: 48,
              WebkitBackdropFilter: "blur(5px)",
              ...style,
            }}
            {...addPropertyOverrides(
              {
                bxU98jWOd: {
                  "data-framer-name": "Open",
                  onMouseEnter: void 0,
                  onMouseLeave: onMouseLeave10mhex6,
                },
                Ykww8_o3B: {
                  "data-framer-name": "Mobile",
                  "data-highlight": void 0,
                  onMouseEnter: void 0,
                },
              },
              baseVariant,
              gestureVariant,
            )}
          >
            {isDisplayed() && (
              <motion.div
                className={"framer-1vydzw7"}
                layoutDependency={layoutDependency}
                layoutId={"UiROa788G"}
                style={{
                  opacity: 1,
                }}
                variants={{
                  bxU98jWOd: {
                    opacity: 0,
                  },
                }}
                {...addPropertyOverrides(
                  {
                    bxU98jWOd: {
                      transformTemplate: transformTemplate1,
                    },
                  },
                  baseVariant,
                  gestureVariant,
                )}
              >
                <RichText
                  __fromCanvasComponent={true}
                  className={"framer-76avmj"}
                  fonts={["Inter"]}
                  layoutDependency={layoutDependency}
                  layoutId={"SAZB2YiIe"}
                  style={{
                    "--framer-link-text-color": "rgb(0, 153, 255)",
                    "--framer-link-text-decoration": "underline",
                  }}
                  verticalAlignment={"top"}
                  withExternalLayout={true}
                >
                  <React.Fragment>
                    <motion.p
                      className={"framer-styles-preset-3j1c0u"}
                      data-styles-preset={"fdldKf5t1"}
                      dir={"auto"}
                    >
                      {"Fala comigo"}
                    </motion.p>
                  </React.Fragment>
                </RichText>
                <RichText
                  __fromCanvasComponent={true}
                  className={"framer-rqlua0"}
                  fonts={["Inter"]}
                  layoutDependency={layoutDependency}
                  layoutId={"sGVGd_IEW"}
                  style={{
                    "--extracted-r6o4lv":
                      "var(--token-994646e0-68ea-49d7-897a-104048558f6f, rgb(84, 84, 84))",
                    "--framer-link-text-color": "rgb(0, 153, 255)",
                    "--framer-link-text-decoration": "underline",
                  }}
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
                      {"Email ou agenda uma call"}
                    </motion.p>
                  </React.Fragment>
                </RichText>
              </motion.div>
            )}
            <motion.div
              className={"framer-jmzyge"}
              data-framer-name={"Icons"}
              layoutDependency={layoutDependency}
              layoutId={"okBICNoPI"}
            >
              <motion.button
                aria-label={"Contact Form"}
                className={"framer-6t8tn1"}
                data-border={true}
                data-framer-name={"Contact Me"}
                data-highlight={true}
                data-reset={"button"}
                layoutDependency={layoutDependency}
                layoutId={"YHIX4aMpc"}
                onTap={onTapau49yy}
                style={{
                  "--border-bottom-width": "1px",
                  "--border-color":
                    "var(--token-2759885a-0605-4b0d-ae5f-9a938c3766f2, rgb(0, 0, 0))",
                  "--border-left-width": "1px",
                  "--border-right-width": "1px",
                  "--border-style": "solid",
                  "--border-top-width": "1px",
                  backgroundColor:
                    "var(--token-2759885a-0605-4b0d-ae5f-9a938c3766f2, rgb(0, 0, 0))",
                  borderBottomLeftRadius: 24,
                  borderBottomRightRadius: 24,
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  boxShadow:
                    "inset 0px 2px 4px 0px rgba(255, 255, 255, 0.4), 0px 0.7409732186279143px 0.7409732186279143px -0.75px rgba(0, 0, 0, 0.15), 0px 2.0178668455264415px 2.0178668455264415px -1.5px rgba(0, 0, 0, 0.14), 0px 4.430505261661892px 4.430505261661892px -2.25px rgba(0, 0, 0, 0.13), 0px 9.834710084098335px 9.834710084098335px -3px rgba(0, 0, 0, 0.11), 0px 25px 25px -3.75px rgba(0, 0, 0, 0.05), 0px 0px 0px 1px var(--token-46244ad7-86a7-41b8-b44b-214d95b54c13, rgb(130, 130, 130))",
                }}
              >
                <ComponentViewportProvider>
                  <SmartComponentScopedContainer
                    className={"framer-1vysbg7-container"}
                    data-framer-name={"Envelope"}
                    isAuthoredByUser={true}
                    isModuleExternal={true}
                    layoutDependency={layoutDependency}
                    layoutId={"Z_gzacz6w-container"}
                    name={"Envelope"}
                    nodeId={"Z_gzacz6w"}
                    rendersWithMotion={true}
                    scopeId={"S05E3gKH6"}
                  >
                    <Icon
                      color={
                        "var(--token-33c8dbd0-eb94-4e90-8099-e7a3fee4ad2f, rgb(255, 255, 255))"
                      }
                      height={"100%"}
                      iconSearch={"House"}
                      iconSelection={"EnvelopeSimple"}
                      id={"Z_gzacz6w"}
                      layoutId={"Z_gzacz6w"}
                      mirrored={false}
                      name={"Envelope"}
                      selectByList={true}
                      style={{
                        height: "100%",
                        width: "100%",
                      }}
                      weight={"fill"}
                      width={"100%"}
                      {...addPropertyOverrides(
                        {
                          bxU98jWOd: {
                            iconSelection: "EnvelopeOpen",
                          },
                          Ykww8_o3B: {
                            iconSelection: "EnvelopeOpen",
                          },
                        },
                        baseVariant,
                        gestureVariant,
                      )}
                    />
                  </SmartComponentScopedContainer>
                </ComponentViewportProvider>
                <RichText
                  __fromCanvasComponent={true}
                  className={"framer-11zkko6"}
                  fonts={["Inter"]}
                  layoutDependency={layoutDependency}
                  layoutId={"Z9uKply6c"}
                  style={{
                    "--extracted-r6o4lv":
                      "var(--token-33c8dbd0-eb94-4e90-8099-e7a3fee4ad2f, rgb(255, 255, 255))",
                    "--framer-link-text-color": "rgb(0, 153, 255)",
                    "--framer-link-text-decoration": "underline",
                    opacity: 0,
                  }}
                  transformTemplate={transformTemplate1}
                  variants={{
                    bxU98jWOd: {
                      opacity: 1,
                    },
                    Ykww8_o3B: {
                      opacity: 1,
                    },
                  }}
                  verticalAlignment={"top"}
                  withExternalLayout={true}
                  {...addPropertyOverrides(
                    {
                      bxU98jWOd: {
                        transformTemplate: void 0,
                      },
                      Ykww8_o3B: {
                        transformTemplate: void 0,
                      },
                    },
                    baseVariant,
                    gestureVariant,
                  )}
                >
                  <React.Fragment>
                    <motion.p
                      className={"framer-styles-preset-455vy9"}
                      data-styles-preset={"xYEC_wF3E"}
                      dir={"auto"}
                      style={{
                        "--framer-text-color":
                          "var(--extracted-r6o4lv, var(--token-33c8dbd0-eb94-4e90-8099-e7a3fee4ad2f, rgb(255, 255, 255)))",
                      }}
                    >
                      {"Contacto"}
                    </motion.p>
                  </React.Fragment>
                </RichText>
              </motion.button>
              <Link
                href={whatsappHref2}
                motionChild={true}
                nodeId={"key4upWaLink"}
                openInNewTab={true}
                scopeId={"S05E3gKH6"}
              >
                <motion.a
                  aria-label={"WhatsApp (abre num novo separador)"}
                  className={"framer-wa-cta framer-1isgeyj"}
                  data-border={true}
                  data-framer-name={"WhatsApp"}
                  layoutDependency={layoutDependency}
                  layoutId={"key4upWaAnchor"}
                  rel={"noopener noreferrer"}
                  style={{
                    "--border-bottom-width": "1px",
                    "--border-color": "rgba(18, 140, 126, 0.65)",
                    "--border-left-width": "1px",
                    "--border-right-width": "1px",
                    "--border-style": "solid",
                    "--border-top-width": "1px",
                    backgroundColor: "rgb(37, 211, 102)",
                    borderBottomLeftRadius: 24,
                    borderBottomRightRadius: 24,
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    boxShadow:
                      "inset 0px 2px 4px 0px rgba(255, 255, 255, 0.35), 0px 0.74px 0.74px -0.75px rgba(0, 0, 0, 0.12), 0px 2px 2px -1.5px rgba(0, 0, 0, 0.1), 0px 4.4px 4.4px -2.25px rgba(0, 0, 0, 0.08), 0px 9.8px 9.8px -3px rgba(0, 0, 0, 0.06), 0px 25px 25px -3.75px rgba(0, 0, 0, 0.04), 0px 0px 0px 1px rgba(18, 140, 126, 0.55)",
                  }}
                >
                  <ComponentViewportProvider>
                    <SmartComponentScopedContainer
                      className={"framer-wa-icon-container"}
                      data-framer-name={"WhatsApp Icon"}
                      isAuthoredByUser={true}
                      isModuleExternal={true}
                      layoutDependency={layoutDependency}
                      layoutId={"waIconScope-container"}
                      name={"WhatsApp Icon"}
                      nodeId={"waIconKey4up"}
                      rendersWithMotion={true}
                      scopeId={"S05E3gKH6"}
                    >
                      <Icon
                        color={
                          "var(--token-33c8dbd0-eb94-4e90-8099-e7a3fee4ad2f, rgb(255, 255, 255))"
                        }
                        height={"100%"}
                        iconSearch={"House"}
                        iconSelection={"WhatsappLogo"}
                        id={"waIconKey4up"}
                        layoutId={"waIconKey4up"}
                        mirrored={false}
                        name={"WhatsApp"}
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
                  <RichText
                    __fromCanvasComponent={true}
                    className={"framer-wa-label"}
                    fonts={["Inter"]}
                    layoutDependency={layoutDependency}
                    layoutId={"waLabelKey4up"}
                    style={{
                      "--extracted-r6o4lv":
                        "var(--token-33c8dbd0-eb94-4e90-8099-e7a3fee4ad2f, rgb(255, 255, 255))",
                      "--framer-link-text-color": "rgb(0, 153, 255)",
                      "--framer-link-text-decoration": "underline",
                      opacity: 0,
                    }}
                    transformTemplate={transformTemplate1}
                    variants={{
                      bxU98jWOd: {
                        opacity: 1,
                      },
                      Ykww8_o3B: {
                        opacity: 1,
                      },
                    }}
                    verticalAlignment={"top"}
                    withExternalLayout={true}
                    {...addPropertyOverrides(
                      {
                        bxU98jWOd: {
                          transformTemplate: void 0,
                        },
                        Ykww8_o3B: {
                          transformTemplate: void 0,
                        },
                      },
                      baseVariant,
                      gestureVariant,
                    )}
                  >
                    <React.Fragment>
                      <motion.p
                        className={"framer-styles-preset-455vy9"}
                        data-styles-preset={"xYEC_wF3E"}
                        dir={"auto"}
                        style={{
                          "--framer-text-color":
                            "var(--extracted-r6o4lv, var(--token-33c8dbd0-eb94-4e90-8099-e7a3fee4ad2f, rgb(255, 255, 255)))",
                        }}
                      >
                        {"WhatsApp"}
                      </motion.p>
                    </React.Fragment>
                  </RichText>
                </motion.a>
              </Link>
              <Link
                href={T2eKpjYwE2}
                motionChild={true}
                nodeId={"vJ8FwRnsa"}
                openInNewTab={true}
                scopeId={"S05E3gKH6"}
              >
                <motion.a
                  aria-label={"Book a call"}
                  className={"framer-1rtf9d0 framer-1isgeyj"}
                  data-border={true}
                  data-framer-name={"Book a Call"}
                  layoutDependency={layoutDependency}
                  layoutId={"vJ8FwRnsa"}
                  style={{
                    "--border-bottom-width": "1px",
                    "--border-color":
                      "var(--token-e3a90888-763b-420f-bb27-f2520e07d9b1, rgb(222, 222, 222))",
                    "--border-left-width": "1px",
                    "--border-right-width": "1px",
                    "--border-style": "solid",
                    "--border-top-width": "1px",
                    backgroundColor:
                      "var(--token-bf8bd38a-4575-40c0-9459-6a86668113f1, rgb(250, 250, 250))",
                    borderBottomLeftRadius: 24,
                    borderBottomRightRadius: 24,
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    boxShadow:
                      "inset 0px 2px 4px 0px rgba(255, 255, 255, 0.4), 0px 0.7409732186279143px 0.7409732186279143px -0.75px rgba(0, 0, 0, 0.07), 0px 2.0178668455264415px 2.0178668455264415px -1.5px rgba(0, 0, 0, 0.07), 0px 4.430505261661892px 4.430505261661892px -2.25px rgba(0, 0, 0, 0.07), 0px 9.834710084098335px 9.834710084098335px -3px rgba(0, 0, 0, 0.06), 0px 25px 25px -3.75px rgba(0, 0, 0, 0.03), 0px 0px 0px 1px var(--token-08cb0f10-6dc5-4949-913f-dbd7168f1cf0, rgb(240, 240, 240))",
                  }}
                >
                  <ComponentViewportProvider>
                    <SmartComponentScopedContainer
                      className={"framer-1jjv92v-container"}
                      data-framer-name={"Calendar"}
                      isAuthoredByUser={true}
                      isModuleExternal={true}
                      layoutDependency={layoutDependency}
                      layoutId={"wN4_dB21D-container"}
                      name={"Calendar"}
                      nodeId={"wN4_dB21D"}
                      rendersWithMotion={true}
                      scopeId={"S05E3gKH6"}
                    >
                      <Icon
                        color={
                          "var(--token-2759885a-0605-4b0d-ae5f-9a938c3766f2, rgb(0, 0, 0))"
                        }
                        height={"100%"}
                        iconSearch={"House"}
                        iconSelection={"CalendarBlank"}
                        id={"wN4_dB21D"}
                        layoutId={"wN4_dB21D"}
                        mirrored={false}
                        name={"Calendar"}
                        selectByList={true}
                        style={{
                          height: "100%",
                          width: "100%",
                        }}
                        weight={"fill"}
                        width={"100%"}
                        {...addPropertyOverrides(
                          {
                            bxU98jWOd: {
                              iconSelection: "CalendarCheck",
                            },
                            Ykww8_o3B: {
                              iconSelection: "CalendarCheck",
                            },
                          },
                          baseVariant,
                          gestureVariant,
                        )}
                      />
                    </SmartComponentScopedContainer>
                  </ComponentViewportProvider>
                  <RichText
                    __fromCanvasComponent={true}
                    className={"framer-6oy5fn"}
                    fonts={["Inter"]}
                    layoutDependency={layoutDependency}
                    layoutId={"iyzNS5b0v"}
                    style={{
                      "--framer-link-text-color": "rgb(0, 153, 255)",
                      "--framer-link-text-decoration": "underline",
                      opacity: 0,
                    }}
                    transformTemplate={transformTemplate1}
                    variants={{
                      bxU98jWOd: {
                        opacity: 1,
                      },
                      Ykww8_o3B: {
                        opacity: 1,
                      },
                    }}
                    verticalAlignment={"top"}
                    withExternalLayout={true}
                    {...addPropertyOverrides(
                      {
                        bxU98jWOd: {
                          transformTemplate: void 0,
                        },
                        Ykww8_o3B: {
                          transformTemplate: void 0,
                        },
                      },
                      baseVariant,
                      gestureVariant,
                    )}
                  >
                    <React.Fragment>
                      <motion.p
                        className={"framer-styles-preset-455vy9"}
                        data-styles-preset={"xYEC_wF3E"}
                        dir={"auto"}
                      >
                        {"Agendar call"}
                      </motion.p>
                    </React.Fragment>
                  </RichText>
                </motion.a>
              </Link>
            </motion.div>
          </motion.nav>
        </Transition>
      </Variants>
    </LayoutGroup>
  );
});
var css3 = [
  "@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
  ".framer-dyxdG.framer-1isgeyj, .framer-dyxdG .framer-1isgeyj { display: block; }",
  ".framer-dyxdG.framer-1x3l6cx { align-content: center; align-items: center; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 18px; height: min-content; justify-content: center; overflow: hidden; padding: 12px 12px 12px 24px; position: relative; width: min-content; will-change: var(--framer-will-change-override, transform); }",
  ".framer-dyxdG .framer-1vydzw7 { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 5px; height: min-content; justify-content: center; overflow: visible; padding: 0px; pointer-events: none; position: relative; width: min-content; }",
  ".framer-dyxdG .framer-76avmj, .framer-dyxdG .framer-rqlua0 { flex: none; height: auto; position: relative; white-space: pre; width: auto; }",
  ".framer-dyxdG .framer-jmzyge { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 8px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: min-content; }",
  ".framer-dyxdG .framer-6t8tn1 { align-content: center; align-items: center; cursor: pointer; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 6px; height: min-content; justify-content: center; overflow: hidden; padding: 8px; position: relative; width: min-content; will-change: var(--framer-will-change-override, transform); }",
  ".framer-dyxdG .framer-1vysbg7-container, .framer-dyxdG .framer-1jjv92v-container, .framer-dyxdG .framer-wa-icon-container { flex: none; height: 24px; position: relative; width: 24px; }",
  ".framer-dyxdG .framer-11zkko6, .framer-dyxdG .framer-6oy5fn, .framer-dyxdG .framer-wa-label { -webkit-user-select: none; flex: none; height: auto; position: absolute; right: -20px; top: 50%; user-select: none; white-space: pre; width: auto; z-index: 1; }",
  ".framer-dyxdG .framer-1rtf9d0, .framer-dyxdG .framer-wa-cta { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 6px; height: min-content; justify-content: center; overflow: hidden; padding: 8px; position: relative; text-decoration: none; width: min-content; will-change: var(--framer-will-change-override, transform); }",
  ".framer-dyxdG.framer-v-1dnz59n.framer-1x3l6cx, .framer-dyxdG.framer-v-1rc6qq2.framer-1x3l6cx { padding: 12px; }",
  ".framer-dyxdG.framer-v-1dnz59n .framer-1vydzw7 { left: 24px; position: absolute; top: 50%; z-index: 1; }",
  ".framer-dyxdG.framer-v-1dnz59n .framer-6t8tn1, .framer-dyxdG.framer-v-1dnz59n .framer-1rtf9d0, .framer-dyxdG.framer-v-1dnz59n .framer-wa-cta, .framer-dyxdG.framer-v-1rc6qq2 .framer-6t8tn1, .framer-dyxdG.framer-v-1rc6qq2 .framer-1rtf9d0, .framer-dyxdG.framer-v-1rc6qq2 .framer-wa-cta { padding: 8px 12px 8px 8px; }",
  ".framer-dyxdG.framer-v-1dnz59n .framer-11zkko6, .framer-dyxdG.framer-v-1dnz59n .framer-6oy5fn, .framer-dyxdG.framer-v-1dnz59n .framer-wa-label, .framer-dyxdG.framer-v-1rc6qq2 .framer-11zkko6, .framer-dyxdG.framer-v-1rc6qq2 .framer-6oy5fn, .framer-dyxdG.framer-v-1rc6qq2 .framer-wa-label { position: relative; right: unset; top: unset; }",
  ...css,
  ...css2,
  '.framer-dyxdG[data-border="true"]::after, .framer-dyxdG [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; corner-shape: inherit; pointer-events: none; }',
];
var FramerS05E3gKH6 = withCSS(Component, css3, "framer-dyxdG");
var stdin_default = FramerS05E3gKH6;
FramerS05E3gKH6.displayName = "Bottom Contact Nav";
FramerS05E3gKH6.defaultProps = {
  height: 64,
  width: 248,
};
addPropertyControls(FramerS05E3gKH6, {
  variant: {
    options: ["VuoPoLmFD", "bxU98jWOd", "Ykww8_o3B"],
    optionTitles: ["Closed", "Open", "Mobile"],
    title: "Variant",
    type: ControlType.Enum,
  },
  T2eKpjYwE: {
    title: "Book a call link",
    type: ControlType.Link,
  },
  whatsappHref: {
    title: "WhatsApp link",
    type: ControlType.Link,
  },
  S36CzfaRp: {
    title: "Contact Form",
    type: ControlType.EventHandler,
  },
});
addFonts(
  FramerS05E3gKH6,
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
    ...PhosphorFonts,
    ...getFontsFromSharedStyle(fonts),
    ...getFontsFromSharedStyle(fonts2),
  ],
  {
    supportsExplicitInterCodegen: true,
  },
);

// virtual:bottom-contact-nav
import { WithFramerBreakpoints } from "unframer";
import { jsx } from "react/jsx-runtime";
var locales = [];
var defaultResponsiveVariants = {
  base: "Ykww8_o3B",
  xl: "VuoPoLmFD",
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
      {jsx(stdin_default, {
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
 * Renders BottomContactNavFramerComponent for all breakpoints with a variants map. Variant prop is inferred per breakpoint.
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
        Component={stdin_default}
        variants={defaultResponsiveVariants}
        {...rest}
      />
    </ContextProviders>
  );
};
Object.assign(ComponentWithRoot, stdin_default);
var bottom_contact_nav_default = ComponentWithRoot;
export { bottom_contact_nav_default as default };
