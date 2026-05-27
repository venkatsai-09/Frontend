export function safeText(value: any, fallback = ''): string {
  if (value === undefined || value === null) return fallback;
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return String(value);
  // Try common nested shapes
  if (typeof value === 'object') {
    if ('name' in value && typeof (value as any).name === 'string') return (value as any).name;
    if ('title' in value && typeof (value as any).title === 'string') return (value as any).title;
    if ('address' in value && typeof (value as any).address === 'string') return (value as any).address;
    try { return JSON.stringify(value); } catch { return fallback; }
  }
  return fallback;
}

export function defaultTicketFromEvent(event: any) {
  const price = (event?.price ?? 0) as number;
  return {
    id: event?.id ? String(event.id) : 'general',
    name: price > 0 ? 'General Admission' : 'Free Registration',
    price: price || 0,
    desc: event?.description ? String(event.description).slice(0, 120) : '',
  };
}
