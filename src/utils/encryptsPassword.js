import bcrypt from "bcrypt"

export const encryptsPassword = password => {
	return bcrypt.hashSync(password, 10)
}

export default encryptsPassword
