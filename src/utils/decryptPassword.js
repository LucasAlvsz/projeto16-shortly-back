import bcrypt from "bcrypt"

export const decryptPassword = (reqPassword, password) => {
	return bcrypt.compareSync(reqPassword, password)
}

export default decryptPassword
