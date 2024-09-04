// npm install mongoose uuid

const repositories = require('../repositories/role_repository');
const { v4: uuidv4 } = require('uuid');


// Function to create a new role
const create = async (roleData) => {
    try {
        const roleId = uuidv4();
        const role = {
            role_id: roleId,
            ...roleData
        };
        const createdRole = await repositories.create(role);
        return createdRole;
    } catch (error) {
        throw new Error('Failed to create role');
    }
};

// Function to get list of roles
const getList = async () => {
    try {
        const roles = await repositories.findAll();
        return roles;
    } catch (error) {
        throw new Error('Failed to get list of roles');
    }
}

const update = async (roleID, roleData) => {
    try {
        const updatedRole = await repositories.update(roleID, roleData);
        return updatedRole;
    } catch (error) {
        throw new Error('Failed to update role')
    }
}

const remove = async (roleID) => {
    try {
        const deletedRole = await repositories.remove(roleID);
        return deletedRole;
    } catch (error) {
        throw new Error("Failed to delete role");
    }
}

module.exports = { create, getList, update, remove};