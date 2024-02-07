import Decimal from 'decimal.js';

const formatPercent = (number, decPlaces) => {
  return (
    number
      .mul(100)
      .toDecimalPlaces(decPlaces, Decimal.ROUND_HALF_UP)
      .toString() + '%'
  );
};
export const isValidNumber = (input: any) => {
  if (typeof input === 'number' && !isNaN(input)) {
    return true;
  }
  if (input instanceof Decimal) {
    return true;
  } else if (input instanceof Decimal) {
    // console.warn('Error: 请使用 Decimal !!!')
    return true;
  }
  const parsed = Number.parseFloat(input);
  if (typeof input === 'string' && !isNaN(parsed)) {
    return true;
  }
  return false;
};
const suffix = [
  '₀',
  '₁',
  '₂',
  '₃',
  '₄',
  '₅',
  '₆',
  '₇',
  '₈',
  '₉',
  '₁₀',
  '₁₁',
  '₁₂',
  '₁₃',
  '₁₄',
  '₁₅',
  '₁₆',
  '₁₇',
  '₁₈',
  '₁₉',
  '₂₀',
  '₂₁',
  '₂₂',
  '₂₃',
  '₂₄',
  '₂₅',
  '₂₆',
  '₂₇',
  '₂₈',
  '₂₉',
  '₃₀',
  '₃₁',
  '₃₂',
  '₃₃',
  '₃₄',
  '₃₅',
  '₃₆',
  '₃₇',
  '₃₈',
  '₃₉',
  '₄₀',
];

type PercentBaseNum = string | number | Decimal; // 没乘 100 的
export interface DisplayPercentOptions {
  showPlusGtThanZero?: boolean; // 大于 0 的时候是否显示 +
}

export interface DisplayAmountOptions {
  showPlusGtThanZero?: boolean;
  isHighPrecise?: boolean;
}

export const NumUtils = {
  // 实现表格逻辑：https://pionex.atlassian.net/wiki/spaces/nfttrack/pages/311788308/X
  displayAmount(
    amount,
    options: DisplayAmountOptions = {
      showPlusGtThanZero: false,
      isHighPrecise: false,
    },
  ) {
    if (!isValidNumber(amount)) {
      return '--';
    }
    const amt = new Decimal(amount);
    const isNegative = amt.lt(0);
    const absAmt = amt.abs();

    let formattedAmt;
    if (absAmt.lt(0.0001)) {
      formattedAmt = absAmt.toDecimalPlaces(5, Decimal.ROUND_DOWN).toString();
    } else if (absAmt.lt(0.001)) {
      formattedAmt = absAmt.toDecimalPlaces(5, Decimal.ROUND_DOWN).toString();
    } else if (absAmt.lt(1)) {
      formattedAmt = absAmt.toDecimalPlaces(3, Decimal.ROUND_DOWN).toString();
    } else if (absAmt.lt(100)) {
      formattedAmt = absAmt.toDecimalPlaces(2, Decimal.ROUND_DOWN).toString();
    } else if (absAmt.lt(100000)) {
      formattedAmt = formatWithComma(absAmt, 2);
    } else {
      formattedAmt = formatLargeNumbers(absAmt);
    }
    // 比如 0.0000013469 格式化完变成0了
    if (Number(formattedAmt) === 0) {
      return formattedAmt;
    }
    if (isNegative) {
      formattedAmt = '-' + formattedAmt;
    } else if (options && options.showPlusGtThanZero && absAmt.gt(0)) {
      formattedAmt = '+' + formattedAmt;
    }
    return formattedAmt;
  },
  displayAmountUSD(amount, options = { showPlusGtThanZero: false }) {
    if (!isValidNumber(amount)) {
      return '--';
    }
    const amt = new Decimal(amount);
    const isNegative = amt.lt(0);
    const absAmt = amt.abs();

    let formattedAmt;
    if (absAmt.lt(0.0001) || absAmt.lt(0.001)) {
      formattedAmt = '$0';
    } else if (absAmt.lt(1)) {
      formattedAmt = '$' + absAmt.toDecimalPlaces(3, Decimal.ROUND_DOWN);
    } else if (absAmt.lt(100)) {
      formattedAmt = '$' + absAmt.toDecimalPlaces(2, Decimal.ROUND_DOWN);
    } else if (absAmt.lt(10000)) {
      formattedAmt = '$' + formatWithComma(absAmt, 2);
    } else {
      formattedAmt = '$' + formatLargeNumbers(absAmt);
    }
    if (formattedAmt === '$0') {
      return formattedAmt;
    }
    // 添加正负号
    if (isNegative) {
      formattedAmt = '-' + formattedAmt;
    } else if (options && options.showPlusGtThanZero && absAmt.gt(0)) {
      formattedAmt = '+' + formattedAmt;
    }
    return formattedAmt;
  },
  displayPriceUSD(amount, options = { isHighPrecise: true }) {
    if (!isValidNumber(amount) || amount < 0) {
      return '--';
    }
    const amt = new Decimal(amount);
    const absAmt = amt.abs();
    const isHighPrecise = options && options.isHighPrecise;
    const max = 4;
    let formattedAmt;
    if (absAmt.lt(0.0001)) {
      // 小于0.0001【要求精度】带下角标，例如$0.0₅1346，截取“0”后面的4位有效数字（末位不四舍五入）【不要求精度】带下角标，截取“0”后面的2位有效数字（末位不四舍五入）
      formattedAmt = getSuffixFormatValue(absAmt, isHighPrecise ? max : 2);
    } else if (absAmt.lt(0.001) || absAmt.lt(1)) {
      // 0.0001 - 0.001(不含) 【要求精度】截取小数点后4位【不要求精度】截取“0”后面的2位有效数字
      // 0.001 ~ 1(不含)【要求精度】截取小数点后4位【不要求精度】截取“0”后2位有效数字
      formattedAmt = isHighPrecise
        ? formatWithComma(absAmt, max)
        : getRetainZeroFormatValue(absAmt, 2);
    } else if (absAmt.lt(100) || absAmt.lt(10000)) {
      // 1~100(不含)【要求精度】截取小数点后4位【不要求精度】截取小数点后2位
      // 100-10K(不含) 【要求精度】截取小数点后4位【不要求精度】截取小数点后2位
      formattedAmt = formatWithComma(absAmt, isHighPrecise ? max : 2);
    } else if (absAmt.lt(100000)) {
      // 10K-100K(不含)【要求精度】截取小数点后2位 【不要求精度】截取小数点后2位
      formattedAmt = formatWithComma(absAmt, 2);
    } else {
      formattedAmt = formatLargeNumbers(absAmt);
    }
    return '$' + formattedAmt;
  },
  displayPercent(
    percent?: PercentBaseNum,
    options = { showPlusGtThanZero: false },
  ) {
    if (!isValidNumber(percent)) {
      return '--%';
    }
    const pct = new Decimal(percent);
    const isNegative = pct.lt(0);
    const absPct = pct.abs();
    const sign = isNegative ? '-' : options?.showPlusGtThanZero ? '+' : '';

    let num;
    if (absPct.lt(0.0001)) {
      num = '0%';
    } else if (absPct.lt(1) || absPct.lt(100)) {
      num = sign + formatPercent(absPct, 2);
    } else if (absPct.lt(100000)) {
      num = sign + formatPercent(absPct, 1);
    } else {
      return isNegative
        ? '->99,999%'
        : `${options && options.showPlusGtThanZero ? '+' : ''}>99,999%`;
    }
    return num;
  },
  displayMultiplier(
    num?: PercentBaseNum,
    options: DisplayPercentOptions = { showPlusGtThanZero: true },
  ) {
    if (!isValidNumber(num)) {
      return '0%';
    }
    const pct = new Decimal(num);
    const isNegative = pct.lt(0);
    const absNum = pct.abs();
    const sign = isNegative ? '-' : options?.showPlusGtThanZero ? '+' : '';

    let formattedAmt;

    if (absNum.lt(0.0001) || absNum.lt(0.001)) {
      formattedAmt = '0%';
    } else if (absNum.lt(1)) {
      if (absNum.gte(0.01) && absNum.lt(10)) {
        formattedAmt = sign + formatWithComma(absNum, 2) + 'X';
      } else {
        formattedAmt = '0%';
      }
    } else if (absNum.lt(100)) {
      if (absNum.gte(0.01) && absNum.lt(10)) {
        formattedAmt = sign + formatWithComma(absNum, 2) + 'X';
      } else if (absNum.gte(10)) {
        formattedAmt = sign + formatWithComma(absNum, 1) + 'X';
      } else {
        formattedAmt = '0%';
      }
    } else if (absNum.lt(10000) || absNum.lt(100000)) {
      formattedAmt = sign + formatWithComma(absNum, 0) + 'X';
    } else {
      return isNegative
        ? '->99,999%'
        : `${options && options.showPlusGtThanZero ? '+' : ''}>99,999%`;
    }
    return formattedAmt;
  },
  // todo: 待补充
  displayCount: (num) => {
    if (!isValidNumber(num)) {
      return '';
    }
    const numDecimal = new Decimal(num);
    if (numDecimal.lt(100000)) {
      return formatWithComma(numDecimal, 0);
    } else {
      return formatLargeNumbers(numDecimal);
    }
  },
};

function formatWithComma(num, decimalPlaces = 0) {
  let numArray = num
    .toDecimalPlaces(decimalPlaces, Decimal.ROUND_DOWN)
    .toString()
    .split('.');
  numArray[0] = numArray[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return numArray.join('.');
}

function formatLargeNumbers(absAmt) {
  absAmt = new Decimal(absAmt);
  if (absAmt.lt(10 ** 3)) {
    return absAmt.toNumber();
  } else if (absAmt.lt(10 ** 6)) {
    return formatWithComma(absAmt.dividedBy(10 ** 3), 1) + 'K';
  } else if (absAmt.lt(10 ** 9)) {
    return formatWithComma(absAmt.dividedBy(10 ** 6), 1) + 'M';
  } else if (absAmt.lt(10 ** 12)) {
    return formatWithComma(absAmt.dividedBy(10 ** 9), 1) + 'B';
  } else {
    return formatWithComma(absAmt.dividedBy(10 ** 12), 1) + 'T';
  }
}

// 这个是用于 NumUtils 的专用函数，所以不重复校验 isValidNumber，不处理负数、正整数，别的地方不能用
export function getSuffixFormatValue(num, places = 5) {
  const decimalNum = new Decimal(num);
  if (decimalNum.equals(0)) {
    return '0';
  }
  const afterAry = decimalNum.toFixed().split('.')[1].split('');
  const count = afterAry.findIndex((digit) => digit !== '0');
  const suffixCount = Math.min(afterAry.length - count, places);

  return `0.0${suffix[count]}${afterAry
    .slice(count, count + suffixCount)
    .join('')
    .replace(/\.?0+$/, '')}`;
}

export function getRetainZeroFormatValue(number, afterPlaces) {
  let match = number.toString().match(/\.0*/);
  const zeroCount = match ? match[0].length - 1 : 0;
  return formatWithComma(number, zeroCount + afterPlaces);
}
