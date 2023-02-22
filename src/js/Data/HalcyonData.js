export const HalcyonDefaults = {
    DEFAULT_DISCOUNT: 2,
    DEFAULT_OZ: 19.2,
    INVESTMENT_TOTAL: 550,
};

export const BeerData = [
    { id: 'boolong-hand', name: 'Boolong Hand', note: 'NZ Pilsner w/ Oolong and Buddahs hand tea' },
    { id: 'bullet-train', name: 'Bullet Train Pale' },
    { id: 'calvin-and-hops', name: 'Calvin And Hops IPA' },
    { id: 'casino-tour', name: 'Casino Tour', note: 'NZ Keller Bier, Collaboration with Burke Gilman' },
    { id: 'charmed-sea', name: 'Charmed Sea Hazy IPA', note: 'Hazy IPA' },
    { id: 'dry-tiny-ipa', name: 'Dry Tiny Horses', note: 'WC IPA' },
    { id: 'first-dream', name: 'First Dream', note: 'IPA' },
    { id: 'friendly-wave', name: 'Friendly Wave IPA', note: 'West Coast' },
    { id: 'frosted-wheat', name: 'Frosted Wheat Cold Wheat', note: 'Collaboration with Lad and Lass' },
    { id: 'good-vibes', name: 'Only Good Vibes', note: 'IPA Citrus/Tropical' },
    { id: 'hanami-hazy', name: 'Hanami Hazy IPA' },
    { id: 'high-altitude-spy-balloon', name: 'High Altitude Spy Balloon', note: 'Dark Lager' },
    { id: 'highly-classified', name: 'Highly Classified' },
    { id: 'honey-lager', name: 'Hawaiian Honey Lager', note: 'Collaboration with Lucky Envelope' },
    { id: 'hop-grinder', name: 'Hop Grinder', notes: 'Hazy IPA' },
    { id: 'hydra-ponic', name: 'Hydra-ponic Pale', note: 'Collaboration with Breakthru Brewing' },
    { id: 'keller-bitter', name: 'KellerBitter' },
    { id: 'kiwi-fisher', name: 'Kiwi Fisher', note: 'NZ Pilsner' },
    { id: 'mark-of-the-yeast', name: 'Mark of the Yeast', note: 'Hazy IPA' },
    { id: 'nz-pilsner', name: 'New Zealand Pilsner', note: 'NZ Pilsner' },
    { id: 'our-good-friends', name: 'Our Good Friends', note: 'Dark Lager, Collaboration with Standard' },
    { id: 'pilsner', name: 'Halcyon Pilsner' },
    { id: 'save-the-snake', name: 'Save the Snake', note: 'Lager, Collaboration with Stoup and WA Wild' },
    { id: 'so-fresh-so-green', name: 'So Fresh and So Green', note: 'Dry Hopped, Collaboration with Big Time Brewery' },
    { id: 'soft-metal', name: 'Soft Metal', note: 'French-style Pilsner' },
    { id: 'sparkling-clusters', name: 'Sparkling Clusters', note: 'Hazy IPA' },
    { id: 'suit-and-tie', name: 'Suit and Tie', note: 'CDA, Collaboration with Big Time' },
    { id: 'ube-your-thirst', name: 'Ube Your Thirst', note: 'Ube Lager' },
    { id: 'urban-hike', name: 'Urban Hike', note: 'Hoppy Rice Lager' },
    { id: 'very-serious-young-man', name: 'Very Serious Young Man', note: 'Double IPA' },
    { id: 'we-say-gay', name: 'We Say Gay' },
];

export function GetBeerName(beerId) {
    const beer = BeerData.find(({ id }) => id === beerId);
    return typeof beer === 'object' ? beer.name : beer;
}
