import { AccessType } from '../../accessType';

export interface User {
    id: number,
    name: string,
    email: string,
    password: string,
    accessType: AccessType,
    tokens: string[]
}