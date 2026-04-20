import { describe, expect, it } from 'vitest'
import { getTimeDiff } from './countdown-timer'

describe('getTimeDiff', () => {
  it('returns zeros when target and now are the same', () => {
    const now = new Date('2024-01-01T00:00:00.000Z')
    const target = new Date('2024-01-01T00:00:00.000Z')

    expect(getTimeDiff(target, now)).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    })
  })

  it('returns zeros when target is in the past', () => {
    const now = new Date('2024-01-02T00:00:00.000Z')
    const target = new Date('2024-01-01T00:00:00.000Z')

    expect(getTimeDiff(target, now)).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    })
  })

  it('calculates 1 second difference', () => {
    const now = new Date('2024-01-01T00:00:00.000Z')
    const target = new Date('2024-01-01T00:00:01.000Z')

    expect(getTimeDiff(target, now)).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 1
    })
  })

  it('calculates 1 minute difference', () => {
    const now = new Date('2024-01-01T00:00:00.000Z')
    const target = new Date('2024-01-01T00:01:00.000Z')

    expect(getTimeDiff(target, now)).toEqual({
      days: 0,
      hours: 0,
      minutes: 1,
      seconds: 0
    })
  })

  it('calculates 1 hour difference', () => {
    const now = new Date('2024-01-01T00:00:00.000Z')
    const target = new Date('2024-01-01T01:00:00.000Z')

    expect(getTimeDiff(target, now)).toEqual({
      days: 0,
      hours: 1,
      minutes: 0,
      seconds: 0
    })
  })

  it('calculates 1 day difference', () => {
    const now = new Date('2024-01-01T00:00:00.000Z')
    const target = new Date('2024-01-02T00:00:00.000Z')

    expect(getTimeDiff(target, now)).toEqual({
      days: 1,
      hours: 0,
      minutes: 0,
      seconds: 0
    })
  })

  it('calculates complex combination of days, hours, minutes, and seconds', () => {
    const now = new Date('2024-01-01T00:00:00.000Z')
    // 1 day (24h) + 2 hours + 3 minutes + 4 seconds
    const target = new Date('2024-01-02T02:03:04.000Z')

    expect(getTimeDiff(target, now)).toEqual({
      days: 1,
      hours: 2,
      minutes: 3,
      seconds: 4
    })
  })

  it('calculates correctly across month boundaries', () => {
    const now = new Date('2024-01-31T23:00:00.000Z')
    const target = new Date('2024-02-01T01:30:15.000Z')

    // Gap: 2 hours, 30 minutes, 15 seconds
    expect(getTimeDiff(target, now)).toEqual({
      days: 0,
      hours: 2,
      minutes: 30,
      seconds: 15
    })
  })
})
