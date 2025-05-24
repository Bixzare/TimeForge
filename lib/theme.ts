type ThemeColorScope = 'light' | 'dark' | 'both'

type ColorToken =
  | 'primary'
  | 'primary-foreground'
  | 'background'
  | 'foreground'
  | 'card'
  | 'card-foreground'
  | 'accent'
  | 'accent-foreground'

// Add more as needed

export function setThemeColors(
  colors: Partial<Record<ColorToken, string>>,
  scope: ThemeColorScope = 'both'
) {
  const lightRoot = document.documentElement
  const darkRoot = document.querySelector('.dark')

  if (scope === 'light' || scope === 'both') {
    Object.entries(colors).forEach(([key, value]) => {
      lightRoot?.style.setProperty(`--${key}`, value)
    })
  }

  if ((scope === 'dark' || scope === 'both') && darkRoot) {
    Object.entries(colors).forEach(([key, value]) => {
      ;(darkRoot as HTMLElement).style.setProperty(`--${key}`, value)
    })
  }
}
