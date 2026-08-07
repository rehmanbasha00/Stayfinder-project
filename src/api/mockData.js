// Simulated backend dataset. In production this lives on a real server;
// here it powers the mock REST layer so the app is fully runnable offline.

const CITIES = ['Goa', 'Jaipur', 'Manali', 'Udaipur', 'Kerala', 'Mumbai', 'Delhi', 'Rishikesh']

const IMAGE_SEED = [
  'photo-1566073771259-6a8506099945',
  'photo-1571003123894-1f0594d2b5d9',
  'photo-1520250497591-112f2f40a3f4',
  'photo-1551882547-ff40c63fe5fa',
  'photo-1445019980597-93fa8acb246c',
  'photo-1584132967334-10e028bd69f7',
  'photo-1542314831-068cd1dbfeeb',
  'photo-1590490360182-c33d57733427',
]

function img(seed, w = 800, h = 600) {
  return `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=${w}&h=${h}&q=80`
}

const AMENITIES_POOL = ['wifi', 'pool', 'parking', 'breakfast', 'gym', 'spa', 'ac', 'bar', 'petFriendly', 'restaurant']

function randomAmenities() {
  return AMENITIES_POOL.filter(() => Math.random() > 0.45)
}

export const HOTELS = Array.from({ length: 24 }).map((_, i) => {
  const city = CITIES[i % CITIES.length]
  const rating = +(3.5 + Math.random() * 1.5).toFixed(1)
  const price = 2500 + Math.floor(Math.random() * 12000)
  return {
    id: `htl-${i + 1}`,
    name: `${['The Grand', 'Azure', 'Palm Court', 'Regal', 'Serene', 'Horizon', 'Le Ciel', 'The Nest'][i % 8]} ${city}`,
    city,
    address: `${12 + i} MG Road, ${city}, India`,
    rating,
    reviewsCount: 20 + Math.floor(Math.random() * 480),
    price,
    currency: 'INR',
    images: [img(IMAGE_SEED[i % IMAGE_SEED.length]), img(IMAGE_SEED[(i + 1) % IMAGE_SEED.length]), img(IMAGE_SEED[(i + 2) % IMAGE_SEED.length]), img(IMAGE_SEED[(i + 3) % IMAGE_SEED.length])],
    amenities: randomAmenities(),
    available: Math.random() > 0.1,
    featured: i % 5 === 0,
    onOffer: i % 4 === 0,
    discountPercent: i % 4 === 0 ? 10 + Math.floor(Math.random() * 25) : 0,
    description:
      'A refined retreat blending contemporary comfort with timeless hospitality. Enjoy spacious rooms, curated dining, and personalized service just moments from the city\u2019s best attractions.',
    location: { lat: 15.2993 + Math.random(), lng: 74.124 + Math.random() },
    rooms: [
      { id: 'standard', name: 'Standard Room', price, capacity: 2, beds: '1 Queen Bed', perks: ['Free Wi-Fi', 'Air Conditioning'] },
      { id: 'deluxe', name: 'Deluxe Room', price: price + 1500, capacity: 3, beds: '1 King Bed', perks: ['Free Wi-Fi', 'Breakfast Included', 'City View'] },
      { id: 'suite', name: 'Executive Suite', price: price + 4000, capacity: 4, beds: '1 King + 1 Sofa Bed', perks: ['Free Wi-Fi', 'Breakfast Included', 'Lounge Access', 'Sea View'] },
    ],
    reviews: Array.from({ length: 3 }).map((_, r) => ({
      id: `${i}-rev-${r}`,
      author: ['Aarav Mehta', 'Priya Sharma', 'Rohan Iyer', 'Ananya Gupta'][r % 4],
      rating: Math.max(3, Math.round(rating)) ,
      comment: [
        'Wonderful stay, the staff were incredibly attentive and the rooms spotless.',
        'Great location and value for money. Would book again on my next trip.',
        'Loved the pool and breakfast spread. Slightly noisy street-facing rooms though.',
      ][r % 3],
      date: new Date(Date.now() - r * 1000 * 60 * 60 * 24 * 30).toISOString(),
    })),
  }
})

export const DESTINATIONS = CITIES.map((city, i) => ({
  city,
  image: img(IMAGE_SEED[i % IMAGE_SEED.length], 600, 700),
  hotelsCount: HOTELS.filter((h) => h.city === city).length,
}))

export const MOCK_USERS_KEY = 'stayfinder_mock_users'
