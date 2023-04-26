import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { User } from "./user";

export class Recipe extends Model<InferAttributes<Recipe>, InferCreationAttributes<Recipe>>{
    declare recipeId: number;
    declare userId: number;
    declare recipe: string;
    declare instructions: string;
    declare ingredients: string;
    declare continent: string;
    declare image: string;
    declare country: string;
    declare servings: string;
    declare prepTime: string;
    declare cookTime: string;
    declare createdAt?: Date;
    declare updatedAt?: Date;
}


export function RecipeFactory(sequelize: Sequelize) {
    Recipe.init({
        recipeId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        }, 
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        recipe: {
            type: DataTypes.STRING,
            allowNull: false
        },
        instructions: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        ingredients: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        continent: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        servings: {
            type: DataTypes.STRING,
            allowNull: false
        },
        prepTime: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cookTime: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    }, {
        freezeTableName: true,
        tableName: 'recipes',
        sequelize
    });

    Recipe.belongsTo(User);
    User.hasMany(Recipe);
}

// export function AssociateUserRecipe() {
//     User.hasMany(Recipe, { foreignKey: 'userId' });
//     Recipe.belongsTo(User, { foreignKey: 'userId' });
// }