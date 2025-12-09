import { add, isBefore } from 'date-fns'
import { useFormatter, useNow } from 'next-intl'

export const useFormattedDate = (date: Date): string => {
  if (!date) return ''
  const now = useNow({
    updateInterval: 10000,
  })
  const formatter = useFormatter()

  switch (true) {
    //if date is older than 7 days, show actual date
    case isBefore(date, add(new Date(), { days: -7 })):
      return formatter.dateTime(date)
  }
  return formatter.relativeTime(date, now)
}
