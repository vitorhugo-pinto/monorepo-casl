import { AbilityBuilder } from '@casl/ability'
import { User } from './models/user'
import { Role } from './models/role'
import { AppAbility } from '.'

// abilities definition from previous example

type DefinePermissions = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const rolePermissions: Record<Role, DefinePermissions> = {
  ROOT: (user, { can, cannot }) => {
    can('manage', 'all')

    cannot(['transfer_ownership', 'update'], 'Organization')
    can(['transfer_ownership', 'update'], 'Organization', {
      ownerId: { $eq: user.id },
    })
  },
  MEMBER: (user, { can }) => {
    can('get', 'User')
    can(['create', 'get'], 'Project')
    can(['update', 'delete'], 'Project', { ownerId: { $eq: user.id } })
  },
  BILLING: (_, { can }) => {
    can('manage', 'Billing')
  },
}
