const crypto = require('crypto');
const errorResponse = require('../utils/errorResponse.util');
const asyncHandler = require('../middlewares/async.middleware');
const sendMail = require('../utils/sendEmail.util');
const User = require('../models/User.model');

// @desc    Get current logged in user
// @route   POST /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select('-password');

    res
        .status(200)
        .json({
            success:true,
            isAuthenticated:true,
            isAdmin:user.role === 'admin' ? true:false,
            data:user
        });
});

// @desc    Create User
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req,res,next) => {
    const {name, email, password } = req.body;

    //create user
    const user = await User.create({
        name,
        email,
        password,
        role
    });

    sendTokenResponse(user,200,res);
});


// @desc    Login User
// @route   POST /api/auth/login
// @access  Public

exports.login = asyncHandler(async (req,res,next) => {
    const {email,password} = req.body;

    //Validate email and password
    if(!email || !password){
        return next(new errorResponse('Please provide an email and password',404));
    }

    //Check for user
    const user = await User.findOne({ email }).select('+password');

    if(!user){
        return next(new errorResponse('Invalid credentials',401));
    }

    //Check if password matches
    const isMatch = await user.matchPassword(password);
   
    if(!isMatch){
        return next(new errorResponse('Invalid credentials',401));
    }

    sendTokenResponse(user,200,res);
});


// @desc    Get current logged out clear cookies
// @route   POST /api/auth/logout
// @access  Private
exports.logout = asyncHandler(async(req,res,next)=>{
    res.cookie('token','none',{
        expires:new Date(Date.now() + 10 * 1000),
        httpOnly:true
    });
    res
        .status(200)
        .json({
            success:true,
            data:{}
        });
});



// @desc    Update user detail
// @route   GET /api/auth/updatedetail
// @access  Private
exports.updateDetails = asyncHandler(async (req,res,next) => {
    const fieldsToUpdate = {
        name: req.body.name,
        email: req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id,fieldsToUpdate,{
        new:true,
        runValidators:true
    });

    res
        .status(200)
        .json({
            success:true,
            data:user,
            isAdmin:user.role
        });
});


// @desc    Update user detail
// @route   GET /api/auth/updatepassword
// @access  Private
exports.updatePassword = asyncHandler(async (req,res,next) => {
    // const fieldsToUpdate = {
    //     name: req.body.name,
    //     email: req.body.email
    // }

    const user = await User.findById(req.user.id).select('+password');
    //Check current password
    if(!(await user.matchPassword(req.body.currentPassword))){
        return next(new errorResponse('Password is incorrect',401));
    }

    user.password = req.body.newPassword;
    await user.save();

    sendTokenResponse(user,200,res);
});



// @desc    Forgot password
// @route   POST /api/auth/forgotpassword
// @access  Public
exports.forgotPassword = asyncHandler(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next(new errorResponse('There is no user with that email',404));
    }

    //Reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    //Create reset url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/resetpassword/${resetToken}`;

    const message = `You receiving this email because you (or someone else) has requested the reset of password.
     Please make a PUT request to: \n\n ${resetUrl}`;

    try {
        await sendMail({
            email:user.email,
            subject:'Password reset',
            message
        });
        res.status(200).json({success:true,data:"Email sent"})
    } catch (err) {
        console.log(err);
        user.getResetPasswordToken = undefined;
        user.getResetPasswordExpire = undefined;

        await user.save({validateBeforeSave:false})
        return next(new errorResponse('Email could not be sent',500));
    }
    res
        .status(200)
        .json({
            success:true,
            data:user,
            isAdmin:user.role
        });
});

// @desc    Reset Password
// @route   POST /api/auth/resetpassword/:resettoken
// @access  Public
exports.resetPassword = asyncHandler(async(req,res,next)=>{
    //Get hash token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    });

    if(!user){
        return next(new errorResponse('Invalid token',400));
    }

    //Set new Password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();


    sendTokenResponse(user,200,res);
});



//Get token from model, create cookie and send response
const sendTokenResponse = (user,statusCode,res) => {

    //Create token
    const token = user.getSignedJwtToken();
    
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly:true
    }

    // https
    if(process.env.NODE_ENV ==='production'){
        options.secure = true;
    }

    res
        .status(statusCode)
        .cookie('token',token,options)
        .json({
            success:true,
            isAuthenticated:true,
            isAdmin:user.role === 'admin' ? true:false,
            data:user,
            token
        });
}