export type BreakpointDirection = 'down' | 'up'
export type ResponsiveBreakpoint = ScreenSize | `${BreakpointDirection}:${ScreenSize}`
export type ScreenSize = '2xl' | 'lg' | 'md' | 'sm' | 'xl'
export type ScreenSizeValue = Record<ScreenSize, number>
