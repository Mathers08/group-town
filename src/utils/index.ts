export const formatDate = (date: Date): string => date.toLocaleTimeString(
  'ru',
  {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).replace(' г.', '');
