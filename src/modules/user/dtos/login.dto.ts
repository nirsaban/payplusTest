import { CustomerResponseDTO } from "../../customer/dtos/customer.dto";

export interface LoginUserDTO {
    idNumber: string;
    password: string;
}

export interface LoginResponseDTO {
    user: {
        id: string;
        idNumber: string;
        email: string;
        fullName?: string;
        birthDay?: Date;
        phoneNumber?: string;
    };
    token: string;
    customers: CustomerResponseDTO[];
}
