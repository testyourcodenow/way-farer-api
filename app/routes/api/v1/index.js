import trips from './trips'

const apiPrefix = '/api/v1'

const routes = app => {
  app.use(apiPrefix, trips)
  app.use('*', (req, res) =>
    res.status(404).json({ message: 'Kindly, check if your URL is correct' }),
  )

  return app
}

export default routes
