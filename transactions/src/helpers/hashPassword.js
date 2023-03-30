import bcrypt from 'bcryptjs'; 

const salt = bcrypt.genSaltSync(10); 
const hashPassword = (password) => bcrypt.hashSync(password, salt); 

export default hashPassword;