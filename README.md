# Lancaster Loves Local

A comprehensive digital ecosystem that combines direct mail postcards with a public-facing digital coupon directory, creating a self-reinforcing flywheel between physical and digital marketing.

## 🚀 Features

### For Businesses
- **Business Portal**: Secure dashboard for managing ads and tracking performance
- **Ad Creation**: Visual postcard grid selection with real-time preview
- **Analytics Dashboard**: Track QR code scans, phone calls, and website clicks
- **Logo Upload**: Drag-and-drop logo upload with instant preview
- **Payment Integration**: Ready for Stripe integration

### For Consumers
- **Public Directory**: Browse all active local business offers
- **Offer Landing Pages**: Dedicated pages for each business offer
- **QR Code Integration**: Seamless mobile experience
- **Analytics Tracking**: Automatic engagement tracking

## 🛠 Technology Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: React Icons
- **QR Codes**: qrcode.react
- **File Upload**: React Dropzone
- **Backend**: Supabase (Auth, Database, Storage)
- **Routing**: React Router DOM (HashRouter)

## 🏗 Architecture

### The "Mosaic" Approach
- Each advertiser's ad is generated as a separate, self-contained image file
- MarkupGo API integration for programmatic ad generation
- Final 9x12 postcard is a composition of pre-generated images
- Decoupled ad creation from final print layout

### Database Schema
```sql
-- Ads table
ads (
  id uuid primary key,
  user_id uuid references users(id),
  ad_size text,
  slot_position integer,
  logo_url text,
  business_name text,
  offer_text text,
  contact_phone text,
  contact_website text,
  contact_address text,
  ad_visual_url text,
  is_active boolean default false,
  created_at timestamp
)

-- Analytics table
ad_analytics (
  ad_id uuid primary key references ads(id),
  scan_count integer default 0,
  call_clicks integer default 0,
  website_clicks integer default 0
)
```

## 🔧 Setup Instructions

1. **Clone and Install**
   ```bash
   git clone [repository-url]
   cd lancaster-loves-local
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file with:
   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

3. **Supabase Setup**
   - Create a new Supabase project
   - Run the SQL schema (see Database Schema section)
   - Set up storage bucket named 'business-assets'
   - Configure RLS policies

4. **Development**
   ```bash
   npm run dev
   ```

5. **Production Build**
   ```bash
   npm run build
   ```

## 🎯 User Journeys

### Business Advertiser Journey
1. **Authentication**: Secure login/registration
2. **Dashboard**: View current ads and analytics
3. **Ad Creation**: Select postcard position and create ad
4. **Analytics**: Track performance metrics

### Consumer Journey
1. **Directory**: Browse active local business offers
2. **Offer Page**: View business details and special offers
3. **Engagement**: Call, visit website, or get directions
4. **Analytics**: Automatic tracking of user interactions

## 📊 Analytics & Tracking

- **QR Code Scans**: Tracked automatically on offer page load
- **Phone Calls**: Tracked on click of phone number
- **Website Visits**: Tracked on click of website link
- **Real-time Dashboard**: Live analytics for business owners

## 🔮 Future Enhancements

- **Digital-Only Listings**: Directory-only listings without postcard
- **Consumer Accounts**: Save favorite offers and businesses
- **Advanced Analytics**: Time-based trends and insights
- **Automated Renewals**: Email reminders for expiring ads
- **Payment Integration**: Stripe integration for ad purchases
- **MarkupGo Integration**: Automated ad visual generation

## 📱 Responsive Design

- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interactions
- Fast loading times

## 🔒 Security

- Supabase Authentication
- Row Level Security (RLS)
- Secure file uploads
- Environment variable protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is proprietary to Lancaster Loves Local.