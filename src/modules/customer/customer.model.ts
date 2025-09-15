import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";
import {
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";
import { User } from "../user/user.model";

@Table({ tableName: "customers", timestamps: true })
export class Customer extends Model<
    InferAttributes<Customer>,
    InferCreationAttributes<Customer>
> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: CreationOptional<string>; // ✅ mark as optional on creation

    @Column({ type: DataType.STRING, allowNull: false })
    declare fullName: string;

    @Column({ type: DataType.STRING, allowNull: true })
    declare phoneNumber?: string;

    @Column({ type: DataType.DATEONLY, allowNull: true })
    declare birthDay?: Date;

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID, allowNull: false })
    declare userId: string;

    @BelongsTo(() => User)
    declare user?: User; // also optional on creation
}
