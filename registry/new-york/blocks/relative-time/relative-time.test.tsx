
import { render, screen } from '@testing-library/react';
import { RelativeTime, relativeTime } from './relative-time';

const mockDateNow = 1730588400000; // Mon Nov 03 2025 07:00:00 GMT+0000

beforeAll(() => {
  jest.spyOn(Date, 'now').mockImplementation(() => mockDateNow);
});

afterAll(() => {
  jest.restoreAllMocks();
});

it('returns "just now" for times less than a minute ago', () => {
  const date = new Date(mockDateNow - 1000 * 10);
  expect(relativeTime(date)).toBe('just now');
});

it('returns "X min. ago" for times less than an hour ago', () => {
  const date = new Date(mockDateNow - 1000 * 60 * 5);
  expect(relativeTime(date)).toBe('5 min. ago');
});

it('returns "X hr. ago" for times less than a day ago', () => {
  const date = new Date(mockDateNow - 1000 * 60 * 60 * 3);
  expect(relativeTime(date)).toBe('3 hr. ago');
});

it('returns "X days ago" for times less than a week ago', () => {
  const date = new Date(mockDateNow - 1000 * 60 * 60 * 24 * 4);
  expect(relativeTime(date)).toBe('4 days ago');
});

it('returns "X wk. ago" for times less than a month ago', () => {
  const date = new Date(mockDateNow - 1000 * 60 * 60 * 24 * 7 * 2);
  expect(relativeTime(date)).toBe('2 wk. ago');
});

it('returns "X mo. ago" for times less than a year ago', () => {
  const date = new Date(mockDateNow - 1000 * 60 * 60 * 24 * 30 * 5);
  expect(relativeTime(date)).toBe('5 mo. ago');
});

it('returns "X yr. ago" for times more than a year ago', () => {
  const date = new Date(mockDateNow - 1000 * 60 * 60 * 24 * 365 * 2);
  expect(relativeTime(date)).toBe('2 yr. ago');
});

it('returns "in X min." for times in the future', () => {
  const date = new Date(mockDateNow + 1000 * 60 * 5);
  expect(relativeTime(date)).toBe('in 5 min.');
});

it('renders the relative time', () => {
  const date = new Date(mockDateNow - 1000 * 60 * 5);
  render(<RelativeTime date={date} />);

  const relativeTimeElement = screen.getByText('5 min. ago');
  expect(relativeTimeElement).toBeInTheDocument();
});
