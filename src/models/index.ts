import { Sequelize } from "sequelize";
import { AssociateUserRecipe, RecipeFactory } from "./recipe";
import { UserFactory } from "./user";

const dbName = 'recipeDB';
const username = 'root';
const password = 'Password1!';

const sequelize = new Sequelize(dbName, username, password, {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
});

RecipeFactory(sequelize);
UserFactory(sequelize);
AssociateUserRecipe();

export const db = sequelize;

