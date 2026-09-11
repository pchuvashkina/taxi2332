import { orderStatusColor } from '../styles/tokens'
import { TRANSLATION } from '../localization'

export const mini_orders = [
  {
    id: 1,
    time: 7,
    count: 2,
    amount: 25,
    borderColor: orderStatusColor.waiting,
  },
  {
    id: 2,
    time: 12,
    count: 1,
    amount: 31,
    borderColor: orderStatusColor.accepted,
  },
  {
    id: 3,
    time: 3,
    count: 4,
    amount: 15,
    borderColor: orderStatusColor.accepted,
  },
  {
    id: 4,
    time: 20,
    count: 2,
    amount: 39,
    borderColor: orderStatusColor.accepted,
  },
  {
    id: 5,
    time: 40,
    count: 3,
    amount: 55,
    borderColor: orderStatusColor.neutral,
  },
  {
    id: 6,
    time: 60,
    count: 4,
    amount: 75,
    borderColor: orderStatusColor.neutral,
  },
  {
    id: 7,
    time: 7,
    count: 2,
    amount: 25,
    borderColor: orderStatusColor.neutral,
  },
  {
    id: 8,
    time: 12,
    count: 1,
    amount: 31,
    borderColor: orderStatusColor.neutral,
  },
  {
    id: 9,
    time: 3,
    count: 4,
    amount: 15,
    borderColor: orderStatusColor.neutral,
  },
]

export const statuses = [
  { id: 1, className: 'trip', label: TRANSLATION.TRIP },
  { id: 2, className: 'waiting', label: TRANSLATION.WAITING },
  { id: 3, className: 'rating', label: TRANSLATION.RATING },
  { id: 4, className: 'urgently', label: TRANSLATION.URGENTLY },
  { id: 5, className: 'taken', label: TRANSLATION.TAKEN },
  { id: 6, className: 'requested', label: TRANSLATION.REQUESTED },
  { id: 7, className: 'recomended', label: TRANSLATION.RECOMMENDED },
]
