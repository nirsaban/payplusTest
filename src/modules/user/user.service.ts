import bcrypt from "bcrypt";
import { User } from "./user.model";
import { Customer } from "../customer/customer.model";
import {AuthService} from "../auth/auth.services";
import {LoginResponseDTO, LoginUserDTO} from "./dtos/login.dto";
import {ApiError} from "../../core/errors/apiError";
import {IRegisterDTO} from "./dtos/register.dto";


export class UserService {
    constructor(private readonly authService: AuthService) {}

    private toUserResponse(user: User) {
        return {
            id: user.id,
            idNumber: user.idNumber,
            email: user.email,
            fullName: user.fullName,
        };
    }

    async register(dto: IRegisterDTO): Promise<LoginResponseDTO> {
        const existingEmail = await User.findOne({ where: { email: dto.email } });
        if (existingEmail) throw ApiError.badRequest("Email already registered");

        const existingId = await User.findOne({ where: { idNumber: dto.idNumber } });
        if (existingId) throw ApiError.badRequest("ID number already registered");

        const hashed = await bcrypt.hash(dto.password, 10);

        const user = await User.create({
            idNumber: dto.idNumber,
            email: dto.email,
            password: hashed,
            fullName: dto.fullName,
        });

        const token = this.authService.signToken({ id: user.id, email: user.email });

        return { user: this.toUserResponse(user), token, customers: [] };
    }

    async login(dto: LoginUserDTO): Promise<LoginResponseDTO> {
        // 1️⃣ Find user + eager load customers
        const user = await User.findOne({
            where: { idNumber: dto.idNumber },
            include: [Customer],
        });

        if (!user) throw ApiError.unauthorized("Invalid ID number or password");

        // 2️⃣ Check password
        const valid = await bcrypt.compare(dto.password, user.password);
        if (!valid) throw ApiError.unauthorized("Invalid ID number or password");

        // 3️⃣ Generate JWT
        const token = this.authService.signToken({
            id: user.id,
            idNumber: user.idNumber,
        });

        // 4️⃣ Transform response (map customers into DTOs)
        const customers = user.customers?.map((c) => ({
            id: c.id,
            fullName: c.fullName,
            phoneNumber: c.phoneNumber,
            birthDay: c.birthDay,
            userId: c.userId,
        })) || [];

        return {
            user: this.toUserResponse(user),
            token,
            customers,
        };
    }
}
