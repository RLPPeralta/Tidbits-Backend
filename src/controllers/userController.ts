import { RequestHandler } from "express";
import { Recipe } from "../models/recipe";
import { User } from "../models/user";
import { comparePasswords, hashPassword } from "../services/auth";
import { signUserToken, verifyUser } from "../services/auth";




export const getAllUsers: RequestHandler = async (req, res, next) => { 
    let users = await User.findAll();
    res.status(200).json(users);
}

export const createUser: RequestHandler = async (req, res, next) => {
    let newUser: User = req.body;

    try {
        if (newUser.email && newUser.password) { 
            let hashedPassword = await hashPassword(newUser.password);
            newUser.password = hashedPassword;
            let created = await User.create(newUser);
            res.status(200).json({
                email: created.email,
                userId: created.userId, 
            });
        }
        else {
            res.status(400).send('Username and password required');
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
}

export const loginUser: RequestHandler = async (req, res, next) => {
    let existingUser: User | null = await User.findOne({
        where: { email: req.body.email }
    });

    if (existingUser) { 
        let passwordsMatch = await comparePasswords(req.body.password, existingUser.password)

    if (passwordsMatch) { 
        let token = await signUserToken(existingUser)
        res.status(200).json({ token: token, user: existingUser }); 
    }
    else {
        res.status(401).json('Invalid Password')
    }
    }
    else { 
        res.status(401).json('Invalid username')
    }
}

export const getUser: RequestHandler = async (req, res, next) => {
    let userId = req.params.id; 
    let user = await User.findByPk(userId); 
    if (user) { 
        res.status(200).json(user);
    }
    else { 
        res.status(404).json({});
    }
}

export const getCurrentUser: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);

    if (user) {
        let { email, userId, firstName, lastName, bio, continent, password } = user;
        res.status(200).json({
            email,
            password,
            userId,
            firstName, 
            lastName, 
            bio, 
            continent, 
        });
    }
    else {
        res.status(401).send();
    }
}


export const editUser: RequestHandler = async (req, res, next) => {
    let userId = req.params.id; 

    let userFound = await User.findByPk(userId); 

    let user: User | null = await verifyUser(req); 

    if (!user) { 
        return res.status(403).send();
    }

    if (userFound && user.userId == userFound.userId && req.body.email && req.body.lastName) { 
        userFound.firstName = req.body.firstName;
        userFound.lastName = req.body.lastName;
        userFound.email = req.body.email;
        userFound.password =  req.body.password;
        userFound.continent = req.body.continent;
        userFound.bio = req.body.bio;


        await userFound.save()

        res.status(200).json(userFound);
    }
    else { 
        res.status(400).json();
    }

}