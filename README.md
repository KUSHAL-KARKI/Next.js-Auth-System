# Next.js Authentication System

A complete authentication system built with Next.js 14, TypeScript, MongoDB, and JWT tokens. Features user registration, login, email verification, password reset, and admin functionality.

## 🚀 Features

- **User Authentication**
  - User registration and login
  - JWT-based authentication
  - Secure password hashing with bcrypt
  - Protected routes with middleware

- **Email Verification**
  - Email verification on signup
  - Resend verification emails
  - Token-based verification system

- **Password Management**
  - Forgot password functionality
  - Secure password reset with email tokens
  - Password strength validation

- **Admin System**
  - Admin user roles
  - Admin-only pages and features
  - Role-based access control

- **User Interface**
  - Modern, responsive design
  - Consistent theme across all pages
  - Loading states and error handling
  - Mobile-friendly interface

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Email**: Nodemailer
- **Styling**: CSS with custom properties
- **Security**: bcryptjs for password hashing

## 📁 Project Structure

```
next-auth/
├── app/
│   ├── api/
│   │   └── users/
│   │       ├── login/route.ts
│   │       ├── logout/route.ts
│   │       ├── me/route.ts
│   │       ├── signup/route.ts
│   │       ├── forgotpassword/route.ts
│   │       ├── resetpassword/route.ts
│   │       └── verifyemail/route.ts
│   ├── admin/
│   ├── login/
│   ├── signup/
│   ├── profile/
│   ├── forgotpassword/
│   ├── resetpassword/
│   ├── verifyemail/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── dbconfig/
│   └── dbConfig.ts
├── helper/
│   ├── getDataFromToken.ts
│   └── mailer.ts
├── models/
│   └── userModel.ts
├── middleware.ts
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB database
- Email service (Gmail, SendGrid, etc.)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd next-auth
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   TOKEN_SECRET=your_jwt_secret_key
   DOMAIN=http://localhost:3000
   
   # Email Configuration
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Database Setup

The project uses MongoDB. Make sure to:
1. Create a MongoDB database
2. Add your connection string to `MONGODB_URI`
3. The user schema will be automatically created

### Email Setup

For email functionality:
1. Use Gmail with App Passwords, or
2. Configure your preferred email service in `helper/mailer.ts`
3. Update email credentials in environment variables

### JWT Configuration

- Set a strong `TOKEN_SECRET` for JWT signing
- Tokens expire in 1 day by default
- Modify token expiration in the auth API routes

## 📱 Usage

### User Registration
1. Navigate to `/signup`
2. Fill in username, email, and password
3. Check email for verification link
4. Click verification link to activate account

### User Login
1. Navigate to `/login`
2. Enter email and password
3. Access protected routes after login

### Password Reset
1. Click "Forgot Password" on login page
2. Enter your email address
3. Check email for reset link
4. Create new password

### Admin Access
- Admin users see additional "Admin" button on home page
- Admin status is set in the database (`isAdmin: true`)
- Admin routes are protected by middleware

## 🛡️ Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Route Protection**: Middleware-based route protection
- **Email Verification**: Prevents fake account creation
- **Token Expiration**: Time-limited tokens for security
- **CORS Protection**: Secure API endpoints

## 🎨 UI Components

### Home Page
- Authentication status display
- Login/Signup buttons for guests
- Profile/Admin/Logout buttons for users

### Form Pages
- Consistent styling across all forms
- Input validation and error states
- Loading indicators

### Profile Pages
- User information display
- Secure data presentation

## 🔄 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/users/signup` | POST | User registration |
| `/api/users/login` | POST | User login |
| `/api/users/logout` | POST | User logout |
| `/api/users/me` | GET | Get current user |
| `/api/users/verifyemail` | POST | Verify email |
| `/api/users/forgotpassword` | POST | Request password reset |
| `/api/users/resetpassword` | POST | Reset password |

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy automatically

### Other Platforms
- Ensure all environment variables are set
- MongoDB connection string updated for production
- Domain updated in environment variables

## 🐛 Troubleshooting

### Common Issues

**Admin button not showing:**
- Check if user has `isAdmin: true` in database
- Verify API response includes `isAdmin` field

**Email not sending:**
- Check email credentials
- Verify less secure apps or app passwords
- Check spam folder

**MongoDB connection issues:**
- Verify connection string
- Check network access in MongoDB Atlas
- Ensure database user has proper permissions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the API documentation

---

**Built with ❤️ using Next.js and TypeScript**
