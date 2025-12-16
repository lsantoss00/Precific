export const getCurrentDay = (): string => {
  const today = new Date();
  const dayIndex = today.getDay();

  const daysMap: Record<number, string> = {
    0: "Domingo",
    1: "Segunda-feira",
    2: "Terça-feira",
    3: "Quarta-feira",
    4: "Quinta-feira",
    5: "Sexta-feira",
    6: "Sábado",
  };

  return daysMap[dayIndex];
};
