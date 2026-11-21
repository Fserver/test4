export interface GrubConfig {
  GRUB_DEFAULT: string;
  GRUB_TIMEOUT: string;
  GRUB_TIMEOUT_STYLE: string;
  GRUB_DISTRIBUTOR: string;
  GRUB_CMDLINE_LINUX_DEFAULT: string;
  GRUB_CMDLINE_LINUX: string;
  GRUB_GFXMODE: string;
  GRUB_GFXPAYLOAD_LINUX: string;
  GRUB_DISABLE_RECOVERY: string;
  GRUB_DISABLE_OS_PROBER: string;
  GRUB_THEME: string;
  GRUB_BACKGROUND: string;
  GRUB_INIT_TUNE: string;
  GRUB_SERIAL_COMMAND: string;
  GRUB_TERMINAL: string;
  GRUB_COLOR_NORMAL: string;
  GRUB_COLOR_HIGHLIGHT: string;
  GRUB_SAVEDEFAULT: string;
}

export interface WindowsBootConfig {
  timeout: string;
  defaultEntry: string;
  displayBootMenu: string;
  advancedOptions: string;
  emsEnabled: string;
  bootDebug: string;
  testSigning: string;
  nxPolicy: string;
  paePolicy: string;
  bootMenuPolicy: string;
  bootShutDown: string;
}

export interface BootEntry {
  id: string;
  name: string;
  enabled: boolean;
  isDefault: boolean;
}

export type TabType = 'config' | 'entries' | 'preview' | 'help';
export type OSType = 'ubuntu' | 'windows';
