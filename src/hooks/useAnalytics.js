import { supabase } from '../config/supabase'

export const useAnalytics = () => {
  const incrementScanCount = async (adId) => {
    try {
      const { error } = await supabase.rpc('increment_scan_count', {
        ad_id: adId
      })
      if (error) throw error
    } catch (err) {
      console.error('Error incrementing scan count:', err)
    }
  }

  const incrementCallClicks = async (adId) => {
    try {
      const { error } = await supabase.rpc('increment_call_clicks', {
        ad_id: adId
      })
      if (error) throw error
    } catch (err) {
      console.error('Error incrementing call clicks:', err)
    }
  }

  const incrementWebsiteClicks = async (adId) => {
    try {
      const { error } = await supabase.rpc('increment_website_clicks', {
        ad_id: adId
      })
      if (error) throw error
    } catch (err) {
      console.error('Error incrementing website clicks:', err)
    }
  }

  return {
    incrementScanCount,
    incrementCallClicks,
    incrementWebsiteClicks,
  }
}