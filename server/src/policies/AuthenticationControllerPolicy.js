const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = Joi.object({
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    })

    const {error} = schema.validate(req.body)

    if (error) {
      switch (error.details[0].context.key) {
        case 'firstName':
          res.status(400).send({
            error: 'Vă rugăm să vă completați prenumele.'
          })
          break
        case 'lastName':
          res.status(400).send({
            error: 'Vă rugăm să vă completați numele.'
          })
          break
        case 'email':
          res.status(400).send({
            error: 'Vă rugăm să introduceți o adresă de email validă.'
          })
          break
        case 'password':
          res.status(400).send({
            error: `Parola trebuie să respecte următoarele reguli:
              <br>
              1. Trebuie să conțină doar următoarele tipuri de caractere: litere mici, litere mari, cifre.
              <br>
              2. Trebuie să conțină între 8 și 32 de caractere.
            `
          })
          break
        default:
          res.status(400).send({
            error: 'Datele de înregistrare nu sunt valide'
          })
      }
    } else {
      next()
    }
  }
}