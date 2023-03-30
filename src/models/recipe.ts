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
            type: DataTypes.STRING,
            allowNull: false
        },
        ingredients: {
            type: DataTypes.STRING,
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
        createdAt: {
            type: DataTypes.DATE,
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
}

export function AssociateUserRecipe() {
    User.hasMany(Recipe, { foreignKey: 'userId' });
    Recipe.belongsTo(User, { foreignKey: 'userId' });
}