"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const databaseConfig = {
    connection: Env_1.default.get("DB_CONNECTION", "mysql"),
    connections: {
        mysql: {
            client: "mysql2",
            connection: {
                host: Env_1.default.get("DB_HOST", "127.0.0.1"),
                port: Env_1.default.get("DB_PORT", "3306"),
                user: Env_1.default.get("DB_USER", "root"),
                password: Env_1.default.get("DB_PASSWORD", "root"),
                database: Env_1.default.get("DB_DATABASE", "Hunlian"),
            },
            debug: false,
        },
    },
};
exports.default = databaseConfig;
//# sourceMappingURL=database.js.map