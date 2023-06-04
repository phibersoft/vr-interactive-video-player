// Extend global window object
interface Window {
  videojs: (
    element: string | Element,
    options?: any,
    ready?: (player: any) => void
  ) => any;
}
