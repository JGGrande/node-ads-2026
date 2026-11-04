import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class User extends Model {
    declare id: number;
    declare name: string;
    declare cpf: string;
    declare email: string;
    declare password: string;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING(11),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    sequelize: sequelize,
    tableName: "users",
    timestamps: true
})