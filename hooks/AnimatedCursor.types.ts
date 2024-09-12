import { CSSProperties, ReactNode } from 'react'

export interface AnimatedCursorOptions {
  children?: ReactNode
  color?: string
  innerScale?: number
  innerSize?: number
  innerStyle?: CSSProperties
  outerAlpha?: number
  outerScale?: number
  outerSize?: number
  outerStyle?: CSSProperties
  mouseText?: string
  textClass?: string
  activeText?: string
}

export type Clickable = string | ({ target: string } & AnimatedCursorOptions)

export interface AnimatedCursorProps extends AnimatedCursorOptions {
  clickables?: Clickable[]
  showSystemCursor?: boolean
  trailingSpeed?: number
  setActiveText?: Function
}

export interface AnimatedCursorCoordinates {
  x: number
  y: number
}
