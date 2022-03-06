import { access, mkdir } from 'fs/promises';
import { constants } from 'fs';
import parseISO from 'date-fns/parseISO';
import formatDate from 'date-fns/format';

export async function mkDirIfNotExists(path: string) {
  try {
    await access(path, constants.R_OK | constants.W_OK)
  } catch {
    try {
      await mkdir(path, { recursive: true });
    } catch (e: unknown) {
      throw new Error(`Can't create directory: ${path}`);
    }
  }
}

export async function isModuleInstalled(name: string) {
  try {
    await access(require.resolve(name));
    return true;
  } catch (e) {
    return false;
  }
}

export type GroupedArrayList<T> = {
  [key: string]: T[];
};

export type FormatterCallback = (date: Date) => string;

export function groupBy<T>(key: string, array: any[]): GroupedArrayList<T> {
  return array.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

/**
 * Compare two semvers string
 *
 * @example
 *  semverCompare('1.2.3', '1.2.2') // -1
 *  semverCompare('1.2.3', '1.1.4') // -1
 *  semverCompare('1.2.3', '1.2.3') // 0
 *  semverCompare('4.2.19', '4.2.20') // 1
 * 
 * @param version1
 * @param version2
 */
export function semverCompare(version1: string, version2: string): 0 | -1 | 1 {
  const left = version1.split('.');
  const right = version2.split('.');

  const diff = left.length - right.length;
  if (diff < 0) {
    left.push(...new Array(Math.abs(diff)).fill('0')) 
  } else if (diff > 0) {
    right.push(...new Array(diff).fill('0'));
  }

  for (let i = 0; i < left.length; i++) {
    const na = Number(left[i]);
    const nb = Number(right[i]);
    if (na > nb) return -1;
    if (nb > na) return 1;
    if (!isNaN(na) && isNaN(nb)) return -1;
    if (isNaN(na) && !isNaN(nb)) return 1;
  }
  return 0;
}

export function dateFormatter(format: string = 'dd.MM.yyyy HH:mm:ss'): FormatterCallback {
  return (date: Date): string => {
    return formatDate(parseISO(date.toISOString()), format);
  };
}