import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
  item?: any;
  type?: string;
  persistent?: boolean;
  onSelect?: () => void;
  render?: () => React.ReactNode;
}
