const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique : true,
    lowercase: true,
    trim: true,
    validate(v) {
      if (!validator.isEmail(v)) throw new Error("E-mail non valide!");
    },
  },
  password: {
    type: String,
    required: true,
    validate(v) {
      if (!validator.isLength(v, { min: 4, max: 20 }))
        throw new Error("Le mot de passe doit être entre 4 et 20 caractères!");
    },
  },
});

userSchema.statics.findUser = async(email,password) => {
    const user = User.findOne({ email });
    if(!user) throw new Error('Erreur, pas possible de se connecter!');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) throw new Error('Erreur, pas possible de se connecter!');
    return user;
}

userSchema.pre('save', async function () {
    if(this.isModified('password')) this.password = await bcrypt.hash(this.password, 8);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
