import express from 'express'
import { analyzeSite } from '../services/analyzer'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { url } = req.body
    console.log('Received request to analyze URL:', url)

    if (!url) {
      console.log('URL is missing in request')
      return res.status(400).json({ error: 'URL is required' })
    }

    console.log('Starting analysis...')
    const analysis = await analyzeSite(url)
    console.log('Analysis completed successfully:', analysis)
    
    res.json(analysis)
  } catch (error) {
    console.error('Error in analyze route:', error)
    res.status(500).json({ 
      error: 'Failed to analyze site',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

export default router
