/**
 * What each photograph shows, written from the photograph itself and its
 * Wikimedia Commons description. Used as alt text where a photo carries
 * content. Card thumbnails inside links stay alt="" because the link text
 * already names them. Replace a line when you replace the photo.
 */
export const PHOTO_ALT: Record<string, string> = {
  'hero-taj-dawn': 'The Taj Mahal at sunrise, the sun low beside its minaret',
  'hero-kerala-backwaters': 'A boatman under a purple umbrella paddling across the Kerala backwaters near Punnamada Lake',
  'hero-ladakh': 'Pangong Tso, a deep blue lake between bare mountains in Ladakh',
  'hero-rajasthan-desert': 'A camel rider silhouetted against the evening sky on the Sam dunes near Jaisalmer',
  'jaipur-hawa-mahal': 'The pink sandstone face of the Hawa Mahal in Jaipur',
  'jaipur-amber-fort': 'Amber Fort on its hillside above Jaipur',
  'udaipur-lake': 'Lake Pichola at sunset in Udaipur, with the Lake Palace on the water',
  'varanasi-ghats': 'Pilgrims in a boat hung with marigolds on the Ganges below the ghats of Varanasi',
  'agra-taj': 'The Taj Mahal reflected in still water',
  'munnar-tea': 'Tea plantations rolling over the hills near Munnar',
  'alleppey-houseboat': 'A thatched houseboat on the backwaters near Nedumudy, Kerala',
  'ranthambore-tiger': 'A Bengal tiger walking through Ranthambore National Park',
  'indian-market': 'Heaped onions and green chillies on a stall in Ooty market',
  'jodhpur-blue-city': 'A Rajasthani musician playing the ravanhatha at Mehrangarh Fort, Jodhpur',
  'delhi-humayun': 'Humayun\'s Tomb in Delhi beyond its long water channel',
  'kovalam-beach': 'The curve of Kovalam beach and its lighthouse, Kerala',
  'periyar-wildlife': 'A boat on Periyar Lake among the drowned trees at Thekkady',
  'madurai-meenakshi': 'The painted south gateway tower of the Meenakshi Temple, Madurai',
  'thanjavur-temple': 'The Brihadisvara Temple in Thanjavur lit at dusk for Maha Shivaratri',
  'mahabalipuram-shore': 'Women in red saris in front of the Shore Temple at Mamallapuram',
  'hampi-ruins': 'The Vitthala Temple at Hampi reflected in a pool of rainwater',
  'mysore-palace': 'Mysore Palace lit by thousands of bulbs at night',
  'goa-beach': 'A performer silhouetted against the sunset on Arambol beach, Goa',
  'kaziranga-rhino': 'A greater one-horned rhinoceros grazing in Kaziranga National Park',
  'bandhavgarh-forest': 'A Bengal tiger in the forest of Bandhavgarh National Park',
  'rishikesh-ganga': 'Lakshman Jhula suspension bridge over the Ganges at Rishikesh',
  'amritsar-golden-temple': 'The Golden Temple in Amritsar reflected in its sacred pool',
  'shimla-himalaya': 'Snow peaks above the Bhaga valley in Lahaul, Himachal Pradesh',
  'darjeeling-tea': 'Morning sun on the summit of Kangchenjunga, seen from Darjeeling',
  'spiti-valley': 'The braided Spiti River below Kaza, Himachal Pradesh',
  'khajuraho': 'The carved sandstone Devi Jagadambi Temple at Khajuraho',
  'indian-food': 'A thali of curries, rice and flatbread on a steel plate',
  'indian-festival': 'A crowd showered with pink colour during Holi at Barsana',
  'rural-village': 'An elderly herder resting among camels at the Pushkar fair, Rajasthan',
  'pondicherry-street': 'A yellow French colonial building with a teal door in Puducherry',
  'kochi-nets': 'A Chinese fishing net raised against the sunset at Fort Kochi',
  'bodh-gaya': 'The Mahabodhi Temple at Bodh Gaya rising above its gardens',
  'heritage-hotel': 'The Taj Lake Palace lit up at night on Lake Pichola, Udaipur',
  'jaisalmer-fort': 'The golden sandstone bastions of Jaisalmer Fort',
  'luxury-train': 'The blue toy train of the Darjeeling Himalayan Railway at Kurseong',
  'ayurveda-spa': 'Small boats on calm backwaters at Kumarakom, Kerala',
  'traveller-couple': 'A fruit seller paddling his shikara on Dal Lake, Srinagar',
  'yoga-sunrise': 'Priests lifting lamps through incense smoke at the evening Ganga aarti, Varanasi',
  'srinagar-houseboats': 'Carved wooden houseboats lit at dusk along the shore of Dal Lake, Srinagar, with mountains behind',
  'srinagar-shalimar-bagh': 'Water falling over a stone terrace in the Mughal garden of Shalimar Bagh, Srinagar, under chinar trees',
  'gulmarg-meadows': 'Horses grazing on the open meadow at Gulmarg, ringed by pine forest',
  'pahalgam-lidder': 'The pale blue Lidder river running over boulders below pine forest at Pahalgam',
  'coorg-hills': 'Forested hills of Kodagu rolling to the horizon from Raja\'s Seat, Madikeri',
  'chettinad-mansion': 'A Chettiar merchant mansion with a carved parapet on a quiet street in Kanadukathan',
  'kolkata-howrah-bridge': 'Crowds crossing the steel cantilever Howrah Bridge over the Hooghly, Kolkata',
  'dharamshala-mcleod-ganj': 'McLeod Ganj on its forested ridge above the Kangra valley, with a red flag in the foreground',
  'shimla-town': 'Shimla\'s houses spread along a forested ridge under a clear sky',
};

/** Alt text for a photo slug, or the fallback when the slug has none. */
export function photoAlt(slug: string, fallback = ''): string {
  return PHOTO_ALT[slug] ?? fallback;
}
