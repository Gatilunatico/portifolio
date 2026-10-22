const paths = {
  arrowLeft: 'M19 12H5M11 18l-6-6 6-6',
  arrowRight: 'M5 12h14M13 6l6 6-6 6',
  arrowUpRight: 'M7 17L17 7M8 7h9v9',
  arrowDown: 'M12 5v14M6 13l6 6 6-6',
  close: 'M6 6l12 12M18 6L6 18',
  menu: 'M4 8h16M4 16h16',
  list: 'M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01',
  notes: 'M5 4h14v16H5zM9 9h6M9 13h6M9 17h3',
  expand: 'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5',
  shrink: 'M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5',
  image: 'M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M15 9h.01',
  play: 'M7 5l12 7-12 7z',
  rotate: 'M4 12a8 8 0 1 0 2.4-5.7M4 4v5h5',
  download: 'M12 4v11M7 10l5 5 5-5M5 20h14',
  mail: 'M4 6h16v12H4zM4 7l8 6 8-6',
  lock: 'M6 11h12v9H6zM9 11V8a3 3 0 0 1 6 0v3',
}

export type IconName = keyof typeof paths

export function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[name]} />
    </svg>
  )
}
