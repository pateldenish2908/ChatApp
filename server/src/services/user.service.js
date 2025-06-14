const User = require('../models/user.model');

const registerUser = async (name, email, password, role) => {
  // check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // create user (storing plain password as you wanted)
  const user = await User.create({ name, email, password, role });

  return user;
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    throw new Error('Invalid credentials');
  }

  return user;
};

// Create new user
const addUser = async (userData) => {
  return await User.create(userData);
};

// Update existing user
const updateUser = async (id, userData) => {
  const user = await User.findByIdAndUpdate(id, userData, { new: true });
  if (!user) throw new Error('User not found');
  return user;
};

// Delete user
const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new Error('User not found');
  return user;
};

// Get user by ID
const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error('User not found');
  return user;
};

// Get all users
const getAllUsers = async () => {
  return await User.find();
};

// Pagination, Searching, Sorting
const getUserWithPaginationSearchingAndSorting = async (query) => {
  const {
    page = 1,
    limit = 10,
    search = '',
    sortBy = 'createdAt',
    order = 'desc',
  } = query;

  const searchQuery = {
    $or: [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ],
  };

  const users = await User.find(searchQuery)
    .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const total = await User.countDocuments(searchQuery);

  return {
    data: users,
    total,
    page: parseInt(page),
    totalPages: Math.ceil(total / limit),
  };
};

// Seed Users for testing
const seedUsers = async () => {
  const dummyUsers = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
      role: 'user',
    },
    {
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: '123456',
      role: 'admin',
    },
  ];

  await User.insertMany(dummyUsers);
  return 'Users seeded';
};

module.exports = {
  registerUser,
  loginUser,
  addUser,
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
  getUserWithPaginationSearchingAndSorting,
  seedUsers,
};
