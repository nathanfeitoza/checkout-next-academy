export const OnlyNumber = (data: string) => {
  if (!data) {
    return data;
  }
  
  return data.replace(/\D/g, '');
}
