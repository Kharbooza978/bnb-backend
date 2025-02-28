const express = require('express');
const cors = require('cors');
const connectDB = require('./mongoDb/db');
const authRoutes = require('./routes/auth');
const path = require('path');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', authRoutes);
const profileRoutes = require('./routes/profile');
app.use('/api/profile', profileRoutes);


const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

app.use('/api/', require('./routes/clientRoutes'));

app.use('/api/bookings', require('./routes/bookingRoutes'));

app.use('/api/admin-bookings', require('./routes/adminBookingRoutes'));
console.log(process.env.MONGODB_URI);

const PORT = process.env.PORT || 5000 ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
