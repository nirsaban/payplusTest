import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
    Unique,
    HasMany,
} from "sequelize-typescript";
import {
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";
import { Customer } from "../customer/customer.model";

@Table({ tableName: "users", timestamps: true })
export class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: CreationOptional<string>; // ✅ optional at creation

    @Unique
    @Column({ type: DataType.STRING(9), allowNull: false })
    declare idNumber: string;

    @Unique
    @Column({ type: DataType.STRING, allowNull: false })
    declare email: string;

    @Column({ type: DataType.STRING, allowNull: false })
    declare password: string;


    @Column(DataType.STRING)
    declare fullName?: string;


    @HasMany(() => Customer)
    declare customers?: CreationOptional<Customer[]>; // ✅ optional, relation
}
