/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const BirthdaysController = () => import('#controllers/birthdays_controller')

router
  .group(() => {
    router.post('/birthdays', [BirthdaysController, 'store'])
    router.get('/birthdays', [BirthdaysController, 'index'])
    router.get('/birthdays/:id', [BirthdaysController, 'show'])
    router.put('/birthdays/:id', [BirthdaysController, 'update'])
    router.delete('/birthdays/:id', [BirthdaysController, 'destroy'])
  })
  .prefix('api')
