import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

export interface UserAttributes {
  id?: number;
  name?: string;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserInput
  extends Omit<UserAttributes, "id" | "createdAt" | "updatedAt"> {}
export interface UserOutput extends Required<UserAttributes> {}

export class User
  extends Model<UserAttributes, UserInput>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);

export default User;
