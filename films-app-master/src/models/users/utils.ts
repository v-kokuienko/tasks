import * as jwt from "jsonwebtoken";

export async function generatUserToken(id): Promise<string> {
    return jwt.sign({ id: id.toString() }, process.env.JWT_SECRET)
    
}