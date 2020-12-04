const asyncHandler = require('express-async-handler')
const User = require('../models/User.model')
const Order = require('../models/Order.model')
// @desc    get all Users
// @route   GET /api/auth/users
// @access  Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advanceResults)
})

// @desc    get single User
// @route   GET /api/auth/:id
// @access  Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  res.status(200).json({
    success: true,
    data: user,
  })
})

// @desc    Create User
// @route   GET /api/auth/users
// @access  Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body)

  res.status(201).json({
    success: true,
    data: user,
  })
})

// @desc    Update User
// @route   GET /api/auth/users/:id
// @access  Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(201).json({
    success: true,
    data: user,
  })
})

// @desc    Delete User
// @route   GET /api/auth/users
// @access  Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id)

  res.status(201).json({
    success: true,
    data: {},
  })
})

exports.checkoutCreateUser = asyncHandler(async (req, res, next) => {
  const orders = await Order.create(req.body)
  // orders
  // const orders = req.body.orders;
  console.log(orders)

  res.status(201).json({
    success: true,
    data: orders,
  })
})

exports.checkoutUpdateUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body)

  res.status(201).json({
    success: true,
    data: user,
  })
})
