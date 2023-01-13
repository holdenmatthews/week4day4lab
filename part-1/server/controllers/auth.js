const bcryptjs = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body

      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          const authenticated = bcryptjs.compareSync(password, users[i].passwordHash)
          if (authenticated) {
            let userToReturn = {...users[i]}
            delete userToReturn.passwordHash
            res.status(200).send(userToReturn)
          }
        } else {
        res.status(400).send("User not found.")
        }
      }
    },  
    register: (req, res) => {
        const { username, email, firstName, lastName, password } = req.body
        const salt = bcryptjs.genSaltSync(5)
        const passwordHash = bcryptjs.hashSync(password, salt)

        let user = {
          username,
          email,
          firstName,
          lastName,
          passwordHash
        }

        users.push(user)
        console.log('Registering User')
        console.log(req.body)
        let userToReturn = {...user}
        delete userToReturn.passwordHash
        res.status(200).send(req.body)
    }
  }