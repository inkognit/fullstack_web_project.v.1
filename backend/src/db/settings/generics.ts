import { PrismaClient } from '@prisma/client'

type TQProps = {
    prisma: PrismaClient
    user_id?: string
}

export type PQV<T, V> = (props: TQProps, vars: V) => Promise<T>

export type PQVN<T, V> = (props: TQProps, vars: V) => Promise<T | null>