// import { checkToken } from '../services/jwtService.js';
// import { checkUserExistsService, getUserByIdService } from '../services/userService.js';
// import { catchAsync } from '../utils/catchAsync.js';
// import { HttpError } from '../utils/httpError.js';
// import { loginUserDataValidator, signupUserDataValidator } from '../utils/userValidators.js';

// export const checkSignupData = catchAsync(async (req, res, next) => {
//   const { value, errors } = signupUserDataValidator(req.body);

//   if (errors) throw new HttpError(400, 'Invalid user data..', errors);

//   const userExists = await checkUserExistsService({ email: value.email });

//   if (userExists) throw new HttpError(409, 'User with this email already exists..');

//   req.body = value;

//   next();
// });

// export const checkLoginData = (req, res, next) => {
//   const { value, errors } = loginUserDataValidator(req.body);

//   if (errors) throw new HttpError(401, 'Unauthorized..', errors);

//   req.body = value;

//   next();
// };

// export const protect = catchAsync(async (req, res, next) => {
//   const token =
//     req.headers.authorization?.startsWith('Bearer ') && req.headers.authorization.split(' ')[1];
//   const userId = checkToken(token);

//   if (!userId) throw new HttpError(401, 'Unauthorized..');

//   const currentUser = await getUserByIdService(userId);

//   if (!currentUser) throw new HttpError(401, 'Unauthorized..');

//   req.user = currentUser;

//   next();
// });

// // allowFor('admin', 'moderator')
// export const allowFor = (...roles) => (req, res, next) => {
//   if (roles.includes(req.user.role)) return next();

//   next(new HttpError(403, 'You are not allowed to perform this action..'));
// }
