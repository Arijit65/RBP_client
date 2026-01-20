# 99acres Landing Page Components

This landing page is built with a modular component architecture for easy maintenance and reusability.

## Component Structure

### 1. **Navbar** (`components/Navbar.jsx`)
- Sticky navigation bar with logo
- Location dropdown
- Navigation links (For Buyers, Tenants, Owners, Dealers, Insights)
- Post Property button
- Notification and user icons
- Responsive mobile menu
- Animations: Slide down on mount

### 2. **HeroBanner** (`components/HeroBanner.jsx`)
- Large hero section with background image
- Featured property promotion (Krisumi Waterside Residences)
- Gradient overlays
- Staggered animations for content
- Responsive layout

### 3. **ExploreOptions** (`components/ExploreOptions.jsx`)
- Grid of clickable cards (Buying, Renting, Investing, etc.)
- Hover animations with scale and lift effects
- Icon integration from Lucide
- Badge support for "NEW" labels
- Staggered entrance animations

### 4. **PopularTools** (`components/PopularTools.jsx`)
- Calculator tools section (Budget, EMI, Loan Eligibility, Area Converter)
- Card-based layout with icons
- Hover scale animations
- Link to view all insights

### 5. **ArticlesSection** (`components/ArticlesSection.jsx`)
- Two-column layout (Living spaces & Buy a home)
- Tabbed article navigation (News, Tax & Legal, Help Guides, Investment)
- Article cards with images
- Tab animations with layout transitions
- CTA button for exploring buying options

### 6. **Testimonials** (`components/Testimonials.jsx`)
- Carousel/slider for customer testimonials
- Star ratings
- Navigation buttons (prev/next)
- Dot indicators
- Smooth slide transitions
- Avatar images with quote icons

### 7. **MobileApp** (`components/MobileApp.jsx`)
- Two-column layout (content & app preview)
- Feature list with checkmarks
- Download buttons (Google Play & App Store)
- Phone mockup with decorative elements
- Download count badge animation
- Hover effects on buttons

### 8. **QuickLinks** (`components/QuickLinks.jsx`)
- Curated property search links
- Three-column grid layout
- Search bar with CTA
- Location-based quick links
- Hover animations on links

### 9. **Footer** (`components/Footer.jsx`)
- Four-column layout with links
- Company information
- Partner links
- Download app section
- Social media icons with hover animations
- Copyright information
- Bottom bar with branding

## Technologies Used

- **React** - Component framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Tailwind CSS** - Utility-first CSS framework
- **Stock Images** - Unsplash & Placeholder images

## Animations

All components use Framer Motion for smooth, professional animations:
- **Fade in** effects on scroll
- **Staggered children** animations
- **Hover states** with scale and translate
- **Layout animations** for tab switching
- **Slide transitions** for carousels

## Responsive Design

All components are fully responsive with breakpoints:
- Mobile: `< 640px`
- Tablet: `640px - 1024px`
- Desktop: `> 1024px`

## Usage

Import components in your main App.jsx:

```jsx
import Navbar from './components/Navbar'
import HeroBanner from './components/HeroBanner'
import ExploreOptions from './components/ExploreOptions'
import PopularTools from './components/PopularTools'
import ArticlesSection from './components/ArticlesSection'
import Testimonials from './components/Testimonials'
import MobileApp from './components/MobileApp'
import QuickLinks from './components/QuickLinks'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroBanner />
      <ExploreOptions />
      <PopularTools />
      <ArticlesSection />
      <Testimonials />
      <MobileApp />
      <QuickLinks />
      <Footer />
    </div>
  )
}
```

## Customization

Each component is self-contained and can be:
- Easily modified with different content
- Styled with Tailwind classes
- Extended with additional features
- Reused across different pages

## Future Enhancements

- Add real data integration
- Implement search functionality
- Add property listing pages
- Integrate authentication
- Add backend API connections
