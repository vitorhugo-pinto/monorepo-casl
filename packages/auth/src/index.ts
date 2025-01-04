import {
  createMongoAbility,
  CreateAbility,
  MongoAbility,
  AbilityBuilder,
} from '@casl/ability'
import { User } from './models/user'
import { rolePermissions } from './permissions'
import { userSubject } from './subjects/user'
import { projectSubject } from './subjects/project'
import { organizationSubject } from './subjects/organization'
import { inviteSubject } from './subjects/invite'
import { billingSubject } from './subjects/billing'
import { z } from 'zod'

export * from './models/organization'
export * from './models/project'
export * from './models/user'

const appAbilities = z.union([
  userSubject,
  projectSubject,
  organizationSubject,
  inviteSubject,
  billingSubject,
  z.tuple([z.literal('manage'), z.literal('all')]),
])

type AppAbilities = z.infer<typeof appAbilities>

export type AppAbility = MongoAbility<AppAbilities>

export function defineAbilityFor(user: User): AppAbility {
  const builder = new AbilityBuilder(
    createMongoAbility as CreateAbility<AppAbility>,
  )

  if (typeof rolePermissions[user.role] === 'function') {
    rolePermissions[user.role](user, builder)
  } else {
    throw new Error(`Trying to use unknown role "${user.role}"`)
  }

  return builder.build({
    detectSubjectType(subject) {
      return subject.__typename
    },
  })
}
