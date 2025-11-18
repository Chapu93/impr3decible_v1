import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { db } from './db'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.error('❌ Credenciales faltantes')
            return null
          }

          console.log('🔍 Buscando admin:', credentials.email)

          // Buscar admin en la base de datos
          const admin = await db.admin.findUnique({
            where: { email: credentials.email },
            include: { company: true },
          })

          if (!admin) {
            console.error('❌ Admin no encontrado')
            return null
          }

          console.log('✅ Admin encontrado:', admin.email)

          // Verificar contraseña
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            admin.password
          )

          if (!isPasswordValid) {
            console.error('❌ Contraseña inválida')
            return null
          }

          console.log('✅ Autenticación exitosa')

          // Retornar usuario
          return {
            id: admin.id,
            email: admin.email,
            name: admin.name,
            role: admin.role,
            companyId: admin.companyId,
            companyName: admin.company?.name,
          }
        } catch (error) {
          console.error('❌ Error en authorize:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.companyId = user.companyId
        token.companyName = user.companyName
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.companyId = token.companyId as string | null
        session.user.companyName = token.companyName as string | undefined
      }
      return session
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
}
