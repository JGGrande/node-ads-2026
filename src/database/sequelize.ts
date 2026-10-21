import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    dialect: "mysql",
    database: "musicas",
    username: "root",
    password: "",
    port: 3306,
    host: "localhost"
});

export async function connectToDb() {
    try {
        await sequelize.authenticate();
    
        console.log("Conectado ao banco de dados com sucesso!");
    
        await sequelize.sync({ force: true });
    
        console.log("Tabelas criadas com sucesso!")
    }catch (err) {
        console.error(err)
    }
}