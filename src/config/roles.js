const allRoles = {
  user: ['getProducts'],
  admin: ['getUsers', 'manageUsers', 'manageProducts','getProducts', 'manageCategory', 'getCategory', 'getTags', 'manageTag', 'managePosts', 'getPosts'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
