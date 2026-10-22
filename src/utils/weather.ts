interface WeatherInfo {
  description: string;
  bgClass: string;
}

const weatherMap: Record<number, WeatherInfo> = {
  0: { description: 'Trời quang đãng', bgClass: 'bg-clear' },
  1: { description: 'Gần như quang', bgClass: 'bg-clear' },
  2: { description: 'Có mây rải rác', bgClass: 'bg-cloudy' },
  3: { description: 'Nhiều mây', bgClass: 'bg-overcast' },
  45: { description: 'Sương mù', bgClass: 'bg-fog' },
  48: { description: 'Sương mù đóng băng', bgClass: 'bg-fog' },
  51: { description: 'Mưa phùn nhẹ', bgClass: 'bg-drizzle' },
  53: { description: 'Mưa phùn vừa', bgClass: 'bg-drizzle' },
  55: { description: 'Mưa phùn dày', bgClass: 'bg-drizzle' },
  61: { description: 'Mưa nhẹ', bgClass: 'bg-rain' },
  63: { description: 'Mưa vừa', bgClass: 'bg-rain' },
  65: { description: 'Mưa to', bgClass: 'bg-heavy-rain' },
  71: { description: 'Tuyết nhẹ', bgClass: 'bg-snow' },
  73: { description: 'Tuyết vừa', bgClass: 'bg-snow' },
  75: { description: 'Tuyết dày', bgClass: 'bg-snow' },
  80: { description: 'Mưa rào nhẹ', bgClass: 'bg-rain' },
  81: { description: 'Mưa rào vừa', bgClass: 'bg-rain' },
  82: { description: 'Mưa rào to', bgClass: 'bg-heavy-rain' },
  95: { description: 'Dông', bgClass: 'bg-thunder' },
  96: { description: 'Dông kèm mưa đá nhẹ', bgClass: 'bg-thunder' },
  97: { description: 'Dông lớn', bgClass: 'bg-thunder' },
  99: { description: 'Dông kèm mưa đá to', bgClass: 'bg-thunder' },
};

const defaultInfo: WeatherInfo = {
  description: 'Không xác định',
  bgClass: 'bg-default',
};

export function getWeatherInfo(code: number): WeatherInfo {
  return weatherMap[code] ?? defaultInfo;
}

export function convertTemp(celsius: number, unit: 'C' | 'F'): string {
  if (unit === 'F') {
    return `${Math.round(celsius * 9 / 5 + 32)}°F`;
  }
  return `${Math.round(celsius)}°C`;
}

export function removeDiacritics(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

export function formatDate(dateStr: string): { dayName: string; dateFormatted: string } {
  const date = new Date(dateStr + 'T00:00:00');
  const days = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
  const dayName = days[date.getDay()];
  const dateFormatted = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
  return { dayName, dateFormatted };
}

export function formatTime(timeStr: string): string {
  const date = new Date(timeStr);
  return date.toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function getWindDirection(degrees: number): string {
  const dirs = ['B', 'ĐB', 'Đ', 'ĐN', 'N', 'TN', 'T', 'TB'];
  const index = Math.round(degrees / 45) % 8;
  return dirs[index];
}

export function getUVLevel(uv: number): { label: string; color: string } {
  if (uv <= 2) return { label: 'Thấp', color: '#4ade80' };
  if (uv <= 5) return { label: 'Trung bình', color: '#facc15' };
  if (uv <= 7) return { label: 'Cao', color: '#fb923c' };
  if (uv <= 10) return { label: 'Rất cao', color: '#ef4444' };
  return { label: 'Cực cao', color: '#a855f7' };
}
