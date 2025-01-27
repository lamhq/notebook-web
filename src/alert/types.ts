export type AlertItem = {
  type: 'success' | 'error' | 'warning';
  message: string;
  timestamp: number;
};

export type AlertTemplateProps = {
  items: (AlertItem & { remove: () => void })[];
};
