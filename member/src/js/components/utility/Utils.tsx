interface ColorClass {
  color: string;
  cls: 'low' | 'medium' | 'high';
}

export const getBalanceColorClass = (balance: number): ColorClass => {
  if (balance > -30) {
    return {
      color: '#5BA05E',
      cls: 'low',
    };
  } else if (balance <= -30 && balance >= -60) {
    return {
      color: '#FFA000',
      cls: 'medium',
    };
  } else {
    return {
      color: '#CC4949',
      cls: 'high',
    };
  }
};
