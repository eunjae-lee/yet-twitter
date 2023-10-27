/* eslint-disable n/prefer-global/process */
import {resolve} from 'node:path'
import {bgCyan, black} from 'kolorist'

export const port = Number.parseInt(process.env.PORT ?? '', 10) || 3303

export const r = (...args: string[]) => resolve(__dirname, '..', ...args)
export const isDev = process.env.NODE_ENV !== 'production'
export const isFirefox = process.env.EXTENSION === 'firefox'

export function log(name: string, message: string) {
  console.log(black(bgCyan(` ${name} `)), message)
}
