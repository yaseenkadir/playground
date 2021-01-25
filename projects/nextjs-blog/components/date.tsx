import { parseISO, format } from 'date-fns'

export type DateProps = {
  dateString: string
}

export default function Date({ dateString }: DateProps) {
  const date = parseISO(dateString)
  const formatted = format(date, 'LLLL d, yyyy')
  return <time dateTime={dateString}>{formatted}</time>
}

