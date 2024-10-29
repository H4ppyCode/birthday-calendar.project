import type { HttpContext } from '@adonisjs/core/http'
import Birthday from '#models/birthday'
import { DateTime } from 'luxon'

export default class BirthdaysController {
  public async index({ response }: HttpContext) {
    const anniversaires = await Birthday.all()
    return response.json(anniversaires)
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['fullname', 'birthdate'])

    const formattedData = {
      ...data,
    }

    const anniversaire = await Birthday.create(formattedData)
    return response.status(201).json(anniversaire)
  }

  public async show({ params, response }: HttpContext) {
    try {
      const anniversaire = await Birthday.findOrFail(params.id)
      return response.json(anniversaire)
    } catch {
      return response.status(404).json({ message: 'Anniversaire non trouvé' })
    }
  }

  public async update({ params, request, response }: HttpContext) {
    try {
      const anniversaire = await Birthday.findOrFail(params.id)
      const data = request.only(['fullname', 'birthdate'])

      anniversaire.fullname = data.fullname || anniversaire.fullname
      anniversaire.birthdate = data.birthdate
        ? DateTime.fromISO(data.birthdate)
        : anniversaire.birthdate

      await anniversaire.save()
      return response.json(anniversaire)
    } catch {
      return response.status(404).json({ message: 'Anniversaire non trouvé' })
    }
  }

  public async destroy({ params, response }: HttpContext) {
    try {
      const anniversaire = await Birthday.findOrFail(params.id)
      await anniversaire.delete()
      return response.status(200).json({ message: 'Anniversaire supprimé avec succès' })
    } catch {
      return response.status(404).json({ message: 'Anniversaire non trouvé' })
    }
  }
}
