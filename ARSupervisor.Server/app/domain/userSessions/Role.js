function Role(roleRepository) {
	async function createRole(userId, role) {
		const model = await roleRepository.addRole(userId, role);
		if (!model) {
			return null;
		}
		return {
			role: model.role
		}
	}

	async function getRoleById(userId) {
		const model = await roleRepository.getRoleById(userId);
		if (!model) {
			return null;
		}
		return {
			role: model.role
		}
	}

	return {
		createRole,
		getRoleById
	}
}

module.exports = Role;