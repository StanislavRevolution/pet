// Функция для создания данных активности за последние 30 дней
export function generateActivityData() {
  const activityData = [];
  const now = new Date();
  
  // Создаем данные за последние 30 дней
  for (let i = 0; i < 30; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    
    // Случайное количество активностей в день (от 0 до 10)
    const count = Math.floor(Math.random() * 11);
    
    activityData.push({
      date: date.toISOString().split('T')[0], // Формат YYYY-MM-DD
      count: count
    });
  }
  
  return activityData;
}

// Генерируем данные активности
export const activityData = generateActivityData(); 