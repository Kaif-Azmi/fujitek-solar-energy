import type React from "react"

type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket"

interface HighlighterProps {
  children: React.ReactNode
  action?: AnnotationAction
  color?: string
  strokeWidth?: number
  animationDuration?: number
  iterations?: number
  padding?: number
  multiline?: boolean
  isView?: boolean
}

export function Highlighter({
  children,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
}: HighlighterProps) {
  void animationDuration
  void iterations
  void padding
  void multiline
  void isView

  const style: React.CSSProperties = {}

  if (action === "underline") {
    style.textDecorationLine = "underline"
    style.textDecorationColor = color
    style.textDecorationThickness = `${strokeWidth}px`
    style.textUnderlineOffset = "0.12em"
  } else if (action === "highlight") {
    style.backgroundImage = `linear-gradient(transparent 60%, ${color} 60%)`
    style.backgroundRepeat = "no-repeat"
  } else if (action === "strike-through" || action === "crossed-off") {
    style.textDecorationLine = "line-through"
    style.textDecorationColor = color
    style.textDecorationThickness = `${strokeWidth}px`
  } else if (action === "box" || action === "circle" || action === "bracket") {
    style.boxShadow = `inset 0 0 0 ${strokeWidth}px ${color}`
    if (action === "circle") style.borderRadius = "9999px"
  }

  return (
    <span className="relative inline-block bg-transparent" style={style}>
      {children}
    </span>
  )
}
