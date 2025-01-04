import { z } from 'zod'

export const roleSchema = z.union([
  z.literal('ROOT'),
  z.literal('MEMBER'),
  z.literal('BILLING'),
])

export type Role = z.infer<typeof roleSchema>
