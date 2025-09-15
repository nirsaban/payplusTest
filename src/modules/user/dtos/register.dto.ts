export interface IRegisterDTO {
    idNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
    fullName?: string;
}

export interface IUserResponseDTO {
    id: string;
    email: string;
    fullName?: string;
}