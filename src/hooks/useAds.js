import { useState, useEffect } from 'react'
import { supabase } from '../config/supabase'

export const useAds = (userId = null) => {
  const [ads, setAds] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchAds()
  }, [userId])

  const fetchAds = async () => {
    try {
      setLoading(true)
      let query = supabase
        .from('ads')
        .select(`
          *,
          ad_analytics (
            scan_count,
            call_clicks,
            website_clicks
          )
        `)

      if (userId) {
        query = query.eq('user_id', userId)
      } else {
        query = query.eq('is_active', true)
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) throw error
      setAds(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createAd = async (adData) => {
    try {
      const { data, error } = await supabase
        .from('ads')
        .insert([adData])
        .select()
        .single()

      if (error) throw error

      // Create analytics record
      await supabase
        .from('ad_analytics')
        .insert([{ ad_id: data.id }])

      await fetchAds()
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err.message }
    }
  }

  const updateAd = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('ads')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      await fetchAds()
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err.message }
    }
  }

  const deleteAd = async (id) => {
    try {
      const { error } = await supabase
        .from('ads')
        .delete()
        .eq('id', id)

      if (error) throw error
      await fetchAds()
      return { error: null }
    } catch (err) {
      return { error: err.message }
    }
  }

  return {
    ads,
    loading,
    error,
    fetchAds,
    createAd,
    updateAd,
    deleteAd,
  }
}