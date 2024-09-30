"use client";
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
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
var Login = function () {
    var router = useRouter();
    var _a = useState(''), username = _a[0], setUsername = _a[1];
    var _b = useState(''), userPassword = _b[0], setUserPassword = _b[1];
    var _c = useState(''), error = _c[0], setError = _c[1];
    // Handle form submission
    var handleSubmit = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    setError(''); // Clear any previous errors
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios.post('/api/User/login', {
                            email: username,
                            password: userPassword
                        })];
                case 2:
                    data = (_a.sent()).data.data;
                    localStorage.setItem('user', JSON.stringify(data));
                    router.push('/dashboard/sidebar');
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    setError('Invalid username or password.'); // Set error message for invalid login
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="h-screen w-screen flex items-center justify-center bg-slate-900">
            {/* Left side for login form */}
            <div className="left-side ml-4 w-full lg:w-1/2 md:w-2/3 h-screen p-8 flex flex-col justify-center text-slate-50">
                <h2 className="text-4xl font-bold mb-4">SkillBoost!</h2>
                <h3 className="mb-24 text-lg">Welcome Back...</h3>
                <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-slate-300 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-900 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" value={username} onChange={function (e) { return setUsername(e.target.value); }} required/>
                    </div>
                    <div className="mb-8">
                        <label className="block text-slate-300 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-900 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" value={userPassword} onChange={function (e) { return setUserPassword(e.target.value); }} required/>
                    </div>
                    {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                    <div className="flex items-center justify-between">
                        <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-white focus:text-indigo-700" type="submit">
                            Sign In
                        </button>
                    </div>
                </form>
                <a className="inline-block mt-4 align-baseline font-bold text-sm text-red-200 hover:text-red-400" href="#">
                    Forgot Password?
                </a>
            </div>

            {/* Right side for illustration */}
            <div className="right-side hidden md:flex lg:flex w-1/2 h-screen items-center justify-start p-8">
                <img src="/login.jpg" alt="Login Illustration" className="w-4/5 h-4/5 object-contain"/>
            </div>
        </div>);
};
export default Login;
