import { UserModel } from './userModel';
import { InternalServerError } from '../../utils/errors';

class AllUsersModel {
    private static instance: AllUsersModel;
    private allUsers: UserModel[];

    private constructor() {
        this.allUsers = [];
    }

    public static getInstance(): AllUsersModel {
        if (AllUsersModel.instance == null) {
            AllUsersModel.instance = new AllUsersModel()
        }
        return AllUsersModel.instance
    }

    public async addUser(user: UserModel) {
        this.allUsers.push(user)
        return;
    }

    public async getUserById(id: number): Promise<UserModel> {
        const user = this.allUsers.find(currUser => currUser.id === id);
        if (!user) {
            throw new InternalServerError('No user found.')
        }
        return user;
    }

    public async getMemberByEmail({ email }): Promise<UserModel> {
        const user = this.allUsers.find(currUser => {
            return currUser.email === email;
        })
        if (!user) {
            throw new InternalServerError('No user found.')
        }
        return user;
    }

    public async isUserRegistered(user: UserModel): Promise<boolean> {
        try {
            await this.getMemberByEmail(user);
            return true;
        } catch(e) {
            return false;
        }
    }
}

export const AllUsersInstance = AllUsersModel.getInstance();

