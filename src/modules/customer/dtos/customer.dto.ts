export interface CreateCustomerDTO {
    fullName: string;
    phoneNumber?: string;
    birthDay?: Date;
}

export interface CustomerResponseDTO {
    id: string;
    fullName: string;
    phoneNumber?: string;
    birthDay?: Date;
    userId: string;
}