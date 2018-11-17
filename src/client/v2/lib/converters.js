export function getType(type) {
  switch (type) {
  case 'tv':
    return 'TV сериал';
  case 'movie':
    return 'Фильм';
  case 'ova':
    return 'OVA';
  case 'ona':
    return 'ONA';
  case 'special':
    return 'Спэшл';
  default:
    return '';
  }
}

export function getStatus(obj) {
  if (!obj.start) return 'Анонсировано';
  if (obj.start && !obj.finish) {
    return 'Выходит сейчас';
  }
  if (obj.finish) return 'Закончено';
  return '';
}
