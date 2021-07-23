"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const model_1 = require("./digipet/model");
const controller_1 = require("./digipet/controller");
const app = express_1.default();
/**
 * Simplest way to connect a front-end. Unimportant detail right now, although you can read more: https://flaviocopes.com/express-cors/
 */
app.use(cors_1.default());
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Digipet, the totally original digital pet game! Keep your pet happy, healthy and well-disciplined to win the game. If in doubt, check out the /instructions endpoint!",
    });
});
app.get("/instructions", (req, res) => {
    res.json({
        message: "You can check out your digipet's stats with /digipet, and add various actions after that with the /digipet/[action], for actions like walk, train, feed, ignore and hatch. For example, try /digipet/walk to walk a digipet!",
    });
});
app.get("/digipet", (req, res) => {
    // console.log("req",req)
    // console.log("res",res)
    const digipet = model_1.getDigipet();
    if (digipet) {
        res.json({
            message: "Your digipet is waiting for you!",
            digipet,
        });
    }
    else {
        res.json({
            message: "You don't have a digipet yet! Try hatching one with /hatch",
            digipet: undefined,
        });
    }
});
app.get("/digipet/hatch", (req, res) => {
    const digipet = model_1.getDigipet();
    if (digipet) {
        res.json({
            message: "Error - no digipet",
            description: "You can't hatch a digipet now because you already have one!",
            digipet,
        });
    }
    else {
        const digipet = controller_1.hatchDigipet();
        res.json({
            message: "You have successfully hatched an adorable new digipet. Just the cutest.",
            digipet,
        });
    }
});
app.get("/digipet/walk", (req, res) => {
    // check the user has a digipet to walk
    if (model_1.getDigipet()) {
        controller_1.walkDigipet();
        res.json({
            message: "You walked your digipet. It looks happier now!",
            digipet: model_1.getDigipet(),
        });
    }
    else {
        res.json({
            message: "Error = no digipet",
            description: "First Hatch a digipet! "
        });
    }
});
app.get("/digipet/ignore", (req, res) => {
    // check the user has a digipet to ignore
    if (model_1.getDigipet()) {
        controller_1.ignoreDigipet();
        res.json({
            message: "You ignored your digipet. It looks sadder now!",
            digipet: model_1.getDigipet(),
        });
    }
    else {
        res.json({
            message: "You don't have a digipet to walk! Try hatching one with /digipet/hatch",
        });
    }
});
app.get("/digipet/train", (req, res) => {
    // check the user has a digipet to walk
    if (model_1.getDigipet()) {
        controller_1.trainDigipet();
        res.json({
            message: "You trained your digipet. It looks better now!",
            digipet: model_1.getDigipet(),
        });
    }
    else {
        res.json({
            message: "You don't have a digipet to train! Try hatching one with /digipet/hatch",
        });
    }
});
app.get("/digipet/feed", (req, res) => {
    // check the user has a digipet to walk
    if (model_1.getDigipet()) {
        controller_1.feedDigipet();
        res.json({
            message: "You feed your digipet. It looks better now!",
            digipet: model_1.getDigipet(),
        });
    }
    else {
        res.json({
            message: "You don't have a digipet to feed! Try hatching one with /digipet/hatch",
        });
    }
});
exports.default = app;
