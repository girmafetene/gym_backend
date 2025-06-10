import express from 'express';
import bodyParser from 'body-parser';
import memberRoutes from './routes/member.routes';
import membershipPlanRoutes from './routes/membershipPlan.routes';
const app = express();
app.use(bodyParser.json());

app.use('/api/members', memberRoutes);
app.use('/api/membership-plans', membershipPlanRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
