"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = require("./config/db");
const errorHandler_1 = require("./middleware/errorHandler");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const eleve_routes_1 = __importDefault(require("./routes/eleve.routes"));
const scolarite_routes_1 = __importDefault(require("./routes/scolarite.routes"));
const personnes_routes_1 = __importDefault(require("./routes/personnes.routes"));
const finance_routes_1 = __importDefault(require("./routes/finance.routes"));
const parametres_routes_1 = __importDefault(require("./routes/parametres.routes"));
const evaluations_routes_1 = __importDefault(require("./routes/evaluations.routes"));
// Load env vars
dotenv_1.default.config();
const app = (0, express_1.default)();
// Body parser
app.use(express_1.default.json());
// Enable CORS
app.use((0, cors_1.default)());
// Set security headers
app.use((0, helmet_1.default)());
// Dev logging middleware
if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
    app.use((0, morgan_1.default)('dev'));
}
// API Routes
app.get('/api/health', (req, res) => {
    res.status(200).json({ success: true, message: 'API is running' });
});
app.use('/api/auth', auth_routes_1.default);
app.use('/api/eleves', eleve_routes_1.default);
app.use('/api/scolarite', scolarite_routes_1.default);
app.use('/api/personnes', personnes_routes_1.default);
app.use('/api/finance', finance_routes_1.default);
app.use('/api/parametres', parametres_routes_1.default);
app.use('/api/evaluations', evaluations_routes_1.default);
// Error Handler (must be after routes)
app.use(errorHandler_1.errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    // Attempt to connect to DB at startup
    await (0, db_1.checkDBConnection)();
});
