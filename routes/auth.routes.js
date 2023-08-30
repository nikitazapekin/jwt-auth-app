/*const {Router} = require('express')
const bcrypt = require('bcryptjs')
const router = Router()
const config=require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} =require('express-validator')
const User = require('../models/User')
router.post(
    '/register',
    [
check('email', 'Неккоректная почта').isEmail(), 
check('password', 'мин длина пароля 6 символов').isLength({min: 6})
    ],
 async (req, res)=> {
try{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array(),
            message: "неккоректные данные при регистрации"
        })
    }
const {email, password}=req.body()
const candidate=await User.findOne({email})
if(candidate){
   return res.status(400).json({message: "таккой пользователь существует"})
}
const hashedPassword=await bcrypt.hash(password, 12)
const user = new User({
    email, password: hashedPassword
})
await user.save()
res.status(201).json({message: " user is created"})
} catch(e) {
res.status(500).json({message: "wrong"})    
}
})
router.post('/login',
[
check('email', 'введите корректную почту').normalizeEmail().isEmail(),
check('password', 'введите пароль').exists()
],
async (req, res)=> {


    async (req, res)=> {
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: "неккоректные данные при входе"
                })
            }
            const {email, password} =req.body
            const user = await  User.findOne({email})
            if(!user){
                return res.status(400).json({
                    message: "пользователь не найден"

                })
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if(isMatch==false){
                return res.status(400).json({message: 'неверный пароль'})
            }
      const token=jwt.sign({
        userId: user.id,

      },
      config.get('jwtSecret'),
      {
        expiresIn: '1h'
      }
      )
      res.json({token,  userId: user.id})
        } catch(e) {
        res.status(500).json({message: "wrong"})    
        }
        }


})
module.exports = router
*/




const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()


// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов')
      .isLength({ min: 6 })
  ],
  async (req, res) => {
  try {
    console.log("Body", req.body)
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректный данные при регистрации'
      })
    }

    const {email, password} = req.body

    const candidate = await User.findOne({ email })

    if (candidate) {
      return res.status(400).json({ message: 'Такой пользователь уже существует' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ email, password: hashedPassword })

    await user.save()

    res.status(201).json({ message: 'Пользователь создан' })

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректный данные при входе в систему'
      })
    }

    const {email, password} = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
    }

    const token = jwt.sign(
      { userId: user.id },
      config.get('jwtSecret'),
      { expiresIn: '1h' }
    )

    res.json({ token, userId: user.id })

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})


module.exports = router