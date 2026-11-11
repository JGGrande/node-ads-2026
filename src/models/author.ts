import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class Author extends Model {
    declare id: number;
    declare name: string;
    declare photoUrl: string | null;
}

Author.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    photoUrl: {
        type: DataTypes.STRING(500),
        allowNull: true
    }
}, {
    tableName: "authors",
    timestamps: true,
    sequelize: sequelize
});
