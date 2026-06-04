export type DeviceColorId = 'tokyo' | 'berlin' | 'nairobi' | 'professor' | 'rio';

export interface DeviceColor {
  id: DeviceColorId;
  name: string;
  glowColor: string;
  accentClass: string;
  glowClass: string;
  techLabel: string;
}

export interface SpecItem {
  label: string;
  value: string;
  unit?: string;
  description: string;
}
