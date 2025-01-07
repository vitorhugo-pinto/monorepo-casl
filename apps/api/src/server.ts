import { fastify } from 'fastify'
import fastifyCors from '@fastify/cors'
import {
  ZodTypeProvider,
  validatorCompiler,
  serializerCompiler,
} from 'fastify-type-provider-zod'
import { createUserRoute } from './http/routes/index'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors)

app.register(createUserRoute)

app.listen({ port: 3333 }).then(() => {
  console.log('👻 It`s alive!!!')
})
