export class Utils {
  static getBalanceColorClass = (balance) => {
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
}
