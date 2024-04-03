export function formatBRLCurrency(value: number | string): string {
    if (!value) return value as string;

    if (typeof value === 'string') {
      const onlyNumber = value.replace(/\D/g, '');
      value = Number(onlyNumber);
    }

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value / 100);
  }