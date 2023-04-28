import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { User } from "./user";
import { Recipe } from "./recipe";

export class Comment extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>>{
    declare commentId: number;
    declare commentTitle: string;
    declare UserUserId: number;
    declare RecipeRecipeId: number;
    declare createdAt?: Date;
    declare updatedAt?: Date;
}

export function CommentFactory(sequelize: Sequelize) {
    Comment.init({
        commentId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        commentTitle: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        UserUserId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        RecipeRecipeId: {
            type: DataTypes.INTEGER,
            allowNull: true
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
        tableName: 'comments',
        sequelize
    });

    Comment.belongsTo(User);
    Comment.belongsTo(Recipe);
    Recipe.hasMany(Comment)

};

