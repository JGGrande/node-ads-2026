import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class Music extends Model {
    declare id: number;
    declare title: string;
    declare durationInSeconds: number;
    declare releaseYear: number;
    declare photoUrl: string | null
}

Music.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(150), //varchar(150)
        allowNull: false
    },
    durationInSeconds: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    releaseYear: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    photoUrl: {
        type: DataTypes.STRING(500), //varchar(500)
        allowNull: true
    }
}, {
    tableName: "musics",
    timestamps: true,
    sequelize: sequelize
});
