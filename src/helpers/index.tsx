import Decimal from 'decimal.js';

export const displaySortAddress = (address?: string) => {
  if (!address) {
    return '--';
  }
  return address.slice(0, 5) + '...' + address.slice(-5);
};

const isNil = (value) => value === undefined || value === null;

export function satsToBTC(sats: Decimal.Value) {
  if (isNil(sats)) {
    return null;
  }
  return Number(new Decimal(sats).dividedBy(100000000).toDecimalPlaces(8));
}

export function btcToSats(btcAmount) {
  if (isNil(btcAmount)) {
    return null;
  }
  return parseInt(new Decimal(btcAmount).mul(100000000).toString());
}
