import { AccessType } from '../../models/accessType';

export interface UserCreateRequest {
    name?: string,
    email: string,
    password: string,
    accessType: AccessType
}