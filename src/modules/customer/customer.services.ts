import { Customer } from "./customer.model";
import { CreateCustomerDTO, CustomerResponseDTO } from "./dtos/customer.dto";
import {ApiError} from "../../core/errors/apiError";

export class CustomerService {
    private toResponse(customer: Customer): CustomerResponseDTO {
        return {
            id: customer.id,
            fullName: customer.fullName,
            phoneNumber: customer.phoneNumber,
            birthDay: customer.birthDay,
            userId: customer.userId,
        };
    }
    async create(userId: string, dto: CreateCustomerDTO): Promise<CustomerResponseDTO> {
        const customer = await Customer.create({
            userId,
            fullName: dto.fullName,
            phoneNumber: dto.phoneNumber,
            birthDay: dto.birthDay,
        });

        return this.toResponse(customer);
    }

    async getById(userId: string, id: string): Promise<CustomerResponseDTO> {
        const customer = await Customer.findOne({ where: { id, userId } });
        if (!customer) throw ApiError.notFound("Customer not found");
        return this.toResponse(customer);
    }

    async getAllByUser(userId: string): Promise<CustomerResponseDTO[]> {
        const customers = await Customer.findAll({ where: { userId } });
        return customers.map((c) => this.toResponse(c));
    }
}
