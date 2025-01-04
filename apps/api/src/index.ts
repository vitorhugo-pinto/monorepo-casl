import { defineAbilityFor, projectSchema, userSchema } from '@saas/auth'

const user = userSchema.parse({ id: 'user-id', role: 'MEMBER' })
const project = projectSchema.parse({ id: 'project-id', ownerId: 'user-id' })

console.log('👻 It`s alive')

console.log(typeof user)

console.log(defineAbilityFor(user).can('manage', 'User'))
console.log(defineAbilityFor(user).can('get', 'Billing'))
console.log(defineAbilityFor(user).can('create', 'Invite'))
console.log(defineAbilityFor(user).can('delete', project))
