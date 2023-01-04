import { User, Token } from './types';
import { AccessType } from '../accessType';
import { AllUsersInstance } from './allUsersModel';
import { generatUserToken } from './utils';
import { InternalServerError } from '../../utils/errors';

export type UserCreationParams = Pick<User, "name" | "email" | "password" | "accessType">;

export class UserModel implements User{
    name: string;
    email: string;
    password: string;
    accessType: AccessType;
    id: number;
    tokens: string[];

    constructor ({name = '', email, password, accessType}) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.accessType = accessType;
        this.tokens = [];
    }

    public async register(): Promise<void> {
        if (await AllUsersInstance.isUserRegistered(this)) {
            throw new InternalServerError('User is already registered.')
        }
        this.id = Math.floor(Math.random() * 1000000);

        const token = await generatUserToken(this.id);
        this.tokens.push(token);

        return await AllUsersInstance.addUser(this);
    }

    public async login(): Promise<Token> {
        const token = await generatUserToken(this.id);
        this.tokens.push(token);
        return { token };
    }

    public async logout() {
        this.tokens = [];
        return;
    }
}