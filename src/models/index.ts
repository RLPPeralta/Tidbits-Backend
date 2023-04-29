import { Sequelize } from "sequelize";
import { UserFactory } from "./user";
import { CommentFactory } from "./comment";
import { RecipeFactory } from "./recipe";

const dbName = 'recipeDB';
const username = 'root';
const password = 'Password1!';

const sequelize = new Sequelize(dbName, username, password, {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
});

UserFactory(sequelize);
RecipeFactory(sequelize);
CommentFactory(sequelize);
// AssociateUserRecipe();


export const db = sequelize;

