var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { PrismaClient, Domain, Roles } from '@prisma/client';
import bcrypt from 'bcrypt';
var prisma = new PrismaClient();
var getRandomInt = function (min, max) { return Math.floor(Math.random() * (max - min) + min); };
var randomUserName = function () { return "User".concat(getRandomInt(1, 1000)); };
var randomGender = function () { return (Math.random() < 0.5 ? 'Male' : 'Female'); };
function seed() {
    return __awaiter(this, void 0, void 0, function () {
        var trainingData, i, users, i, password, hashedPassword, responses, userIds, trainingIds, i, retentionData, _i, userIds_1, user, _a, trainingIds_1, training;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: 
                // Create dummy Domains
                return [4 /*yield*/, Promise.all(Object.values(Domain).map(function (domain) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, prisma.domains.create({
                                    data: {
                                        domainName: domain,
                                        domainDescription: "".concat(domain, " training description."),
                                    },
                                })];
                        });
                    }); }))];
                case 1:
                    // Create dummy Domains
                    _b.sent();
                    trainingData = [];
                    for (i = 1; i <= 50; i++) {
                        trainingData.push({
                            trainingName: "Training ".concat(i),
                            description: "Description for training ".concat(i),
                            domainName: Object.values(Domain)[getRandomInt(0, Object.values(Domain).length)],
                            duration: getRandomInt(1, 10), // Duration in hours
                            startDate: new Date(Date.now() + getRandomInt(1, 365) * 24 * 60 * 60 * 1000), // Random future date
                        });
                    }
                    return [4 /*yield*/, prisma.training.createMany({ data: trainingData })];
                case 2:
                    _b.sent();
                    users = [];
                    i = 1;
                    _b.label = 3;
                case 3:
                    if (!(i <= 100)) return [3 /*break*/, 6];
                    password = "Password".concat(i);
                    console.log(password, "user".concat(i, "@example.com"));
                    return [4 /*yield*/, bcrypt.hash(password, 10)];
                case 4:
                    hashedPassword = _b.sent();
                    users.push({
                        userName: randomUserName(),
                        email: "user".concat(i, "@example.com"),
                        role: Math.random() < 0.2 ? Roles.Admin : Roles.Employee, // 20% Admin, 80% Employee
                        designation: "Designation ".concat(getRandomInt(1, 10)),
                        gender: randomGender(),
                        password: hashedPassword, // Use the hashed password here
                    });
                    _b.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 3];
                case 6: return [4 /*yield*/, prisma.user.createMany({ data: users })];
                case 7:
                    _b.sent();
                    responses = [];
                    return [4 /*yield*/, prisma.user.findMany({ select: { userId: true } })];
                case 8:
                    userIds = _b.sent();
                    return [4 /*yield*/, prisma.training.findMany({ select: { trainingId: true } })];
                case 9:
                    trainingIds = _b.sent();
                    for (i = 0; i < 500; i++) {
                        responses.push({
                            userId: userIds[getRandomInt(0, userIds.length)].userId,
                            trainingId: trainingIds[getRandomInt(0, trainingIds.length)].trainingId,
                            score: getRandomInt(1, 100), // Score between 1 and 100
                            responseDate: new Date(),
                        });
                    }
                    return [4 /*yield*/, prisma.response.createMany({ data: responses })];
                case 10:
                    _b.sent();
                    retentionData = [];
                    for (_i = 0, userIds_1 = userIds; _i < userIds_1.length; _i++) {
                        user = userIds_1[_i];
                        for (_a = 0, trainingIds_1 = trainingIds; _a < trainingIds_1.length; _a++) {
                            training = trainingIds_1[_a];
                            retentionData.push({
                                trainingId: training.trainingId,
                                userId: user.userId,
                                isRetained: Math.random() < 0.8, // 80% chance of being retained
                            });
                        }
                    }
                    return [4 /*yield*/, prisma.retention.createMany({ data: retentionData })];
                case 11:
                    _b.sent();
                    console.log('Dummy data seeded successfully!');
                    return [2 /*return*/];
            }
        });
    });
}
seed()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
