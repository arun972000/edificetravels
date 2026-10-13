/**
 * Translated names for content-collection entries (journeys, regions,
 * specialist roles). The full journey and region pages stay in English; these
 * strings are used on translated pages (cards, pickers, team blocks).
 * Keys are the entry ids (file name without .md, or specialist `id`).
 */
import type { Locale } from './config';

type Pair = { title: string; tagline: string };

export const journeyText: Partial<Record<Locale, Record<string, Pair>>> = {
  de: {
    'ayurveda-rest-and-renewal': {
      title: 'Ayurveda, Ruhe und Erneuerung',
      tagline: 'Vierzehn Tage: ein ärztlich begleitetes Ayurveda-Programm in einem Retreat in den Hügeln Keralas, zehn Nächte mit Anwendungen und sattvischer Küche, dann zwei Tage am Meer, um langsam zurückzukommen.',
    },
    'forts-deserts-and-the-taj': {
      title: 'Festungen, Wüsten und der Taj',
      tagline: 'Zwölf Tage von der Hauptstadt der Moguln bis zur goldenen Stadt, mit dem Taj im Morgengrauen und der Thar-Wüste in der Abenddämmerung.',
    },
    'golden-temple-and-the-foothills': {
      title: 'Der Goldene Tempel und die Vorberge',
      tagline: 'Zehn Tage von Amritsar bis an den Ganges: die heilige Stadt der Sikhs, der Bergort des Dalai Lama, die alte Sommerhauptstadt und Yoga bei Sonnenaufgang in Rishikesh.',
    },
    'golden-triangle-and-the-ganges': {
      title: 'Goldenes Dreieck und Ganges',
      tagline: 'Neun Tage: die Städte der Moguln, die Rosa Stadt und dann Varanasi, wo Indien aufhört, eine Sehenswürdigkeit zu sein, und zu etwas ganz anderem wird.',
    },
    'kingdoms-of-the-deccan': {
      title: 'Königreiche des Dekkan',
      tagline: 'Dreizehn Tage quer durch Karnataka bis Goa: ein Maharadscha-Palast, Kaffeeberge, die Ruinenstadt Hampi, die Höhlentempel von Badami und zum Abschluss eine portugiesisch geprägte Küste.',
    },
    'ladakh-the-high-desert': {
      title: 'Ladakh, die Hochwüste',
      tagline: 'Neun Tage auf 3.500 Metern und höher: Klöster, zwei der höchsten befahrbaren Pässe der Welt, Sanddünen und ein See, der stündlich seine Farbe wechselt.',
    },
    'spice-coast-and-backwaters': {
      title: 'Gewürzküste und Backwaters',
      tagline: 'Zehn Tage entlang Keralas grünem Rückgrat: Teeberge, eine Nacht auf dem Wasser, Dorfwege mit dem Fahrrad und zum Abschluss ein Strand.',
    },
    'tea-hills-and-the-brahmaputra': {
      title: 'Teeberge und Brahmaputra',
      tagline: 'Zehn Tage im Osten Indiens: Kolkatas Gassen und Süßwarenläden, der Kanchenjunga im Morgengrauen von Darjeeling aus und die Panzernashörner von Kaziranga.',
    },
    'temples-of-the-tamil-south': {
      title: 'Tempel des tamilischen Südens',
      tagline: 'Elf Tage durch Tamil Nadu: Küstentempel, eine französisch geprägte Stadt, die Hauptstadt der Chola, die Küchen des Chettinad und Madurai bei Nacht, dann über die Berge nach Kerala.',
    },
    'the-grand-tour': {
      title: 'Die Grand Tour',
      tagline: 'Drei Wochen, Nord und Süd: der Taj und die Festungen Rajasthans, dann ein Flug nach Kerala zu Teebergen, Hausboot und einer Woche am Meer.',
    },
    'tigers-forts-and-palaces': {
      title: 'Tiger, Festungen und Paläste',
      tagline: 'Zehn Tage: fünf Safaris in Ranthambore, das Amber Fort im Jeep und die Seen von Udaipur, gemacht für Familien, die Wildnis und Königspracht zugleich suchen.',
    },
  },
  fr: {
    'ayurveda-rest-and-renewal': {
      title: 'Ayurveda, repos et renouveau',
      tagline: 'Quatorze jours : un programme ayurvédique encadré par des médecins dans une retraite des collines du Kerala, dix nuits de soins et de cuisine sattvique, puis deux jours au bord de la mer pour revenir en douceur.',
    },
    'forts-deserts-and-the-taj': {
      title: 'Forts, déserts et le Taj',
      tagline: 'Douze jours de la capitale moghole à la cité dorée, avec le Taj à l’aube et le désert du Thar au crépuscule.',
    },
    'golden-temple-and-the-foothills': {
      title: 'Le Temple d’or et les contreforts',
      tagline: 'Dix jours d’Amritsar au Gange : la ville sainte des sikhs, la station de montagne du dalaï-lama, l’ancienne capitale d’été et le yoga à l’aube à Rishikesh.',
    },
    'golden-triangle-and-the-ganges': {
      title: 'Le Triangle d’or et le Gange',
      tagline: 'Neuf jours : les cités mogholes, la Ville rose, puis Varanasi, où l’Inde cesse d’être un spectacle pour devenir tout autre chose.',
    },
    'kingdoms-of-the-deccan': {
      title: 'Royaumes du Deccan',
      tagline: 'Treize jours à travers le Karnataka jusqu’à Goa : le palais d’un maharaja, des collines de café, la cité en ruine de Hampi, les temples rupestres de Badami et, pour finir, une côte aux accents portugais.',
    },
    'ladakh-the-high-desert': {
      title: 'Ladakh, le désert d’altitude',
      tagline: 'Neuf jours à 3 500 mètres et au-delà : des monastères, deux des cols routiers les plus hauts du monde, des dunes de sable et un lac qui change de couleur d’heure en heure.',
    },
    'spice-coast-and-backwaters': {
      title: 'Côte des épices et backwaters',
      tagline: 'Dix jours le long de l’épine dorsale verte du Kerala : collines de thé, une nuit sur l’eau, des ruelles de village à vélo et une plage pour finir.',
    },
    'tea-hills-and-the-brahmaputra': {
      title: 'Collines de thé et Brahmapoutre',
      tagline: 'Dix jours dans l’est de l’Inde : les ruelles et les pâtisseries de Kolkata, le Kanchenjunga à l’aube depuis Darjeeling, et les rhinocéros unicornes de Kaziranga.',
    },
    'temples-of-the-tamil-south': {
      title: 'Temples du Sud tamoul',
      tagline: 'Onze jours à travers le Tamil Nadu : temples du rivage, une ville française, la capitale des Chola, les cuisines du Chettinad et Madurai la nuit, puis par-delà les collines jusqu’au Kerala.',
    },
    'the-grand-tour': {
      title: 'Le Grand Tour',
      tagline: 'Trois semaines, du nord au sud : le Taj et les forts du Rajasthan, puis un vol vers le Kerala pour les collines de thé, un houseboat et une semaine au bord de la mer.',
    },
    'tigers-forts-and-palaces': {
      title: 'Tigres, forts et palais',
      tagline: 'Dix jours : cinq safaris à Ranthambore, le fort d’Amber en jeep et les lacs d’Udaipur, pensés pour les familles qui veulent à la fois le sauvage et le royal.',
    },
  },
  es: {
    'ayurveda-rest-and-renewal': {
      title: 'Ayurveda, descanso y renovación',
      tagline: 'Catorce días: un programa de ayurveda dirigido por médicos en un retiro en las colinas de Kerala, diez noches de tratamientos y comida sáttvica, y después dos días junto al mar para volver poco a poco.',
    },
    'forts-deserts-and-the-taj': {
      title: 'Fuertes, desiertos y el Taj',
      tagline: 'Doce días desde la capital mogol hasta la ciudad dorada, con el Taj al amanecer y el desierto de Thar al atardecer.',
    },
    'golden-temple-and-the-foothills': {
      title: 'El Templo Dorado y las estribaciones',
      tagline: 'Diez días de Amritsar al Ganges: la ciudad santa de los sijs, el pueblo de montaña del Dalái Lama, la antigua capital de verano y yoga al amanecer en Rishikesh.',
    },
    'golden-triangle-and-the-ganges': {
      title: 'El Triángulo de Oro y el Ganges',
      tagline: 'Nueve días: las ciudades mogolas, la Ciudad Rosa y después Varanasi, donde la India deja de ser algo que se ve y se convierte en otra cosa.',
    },
    'kingdoms-of-the-deccan': {
      title: 'Reinos del Decán',
      tagline: 'Trece días por Karnataka hasta Goa: el palacio de un maharajá, colinas de café, la ciudad en ruinas de Hampi, los templos excavados en la roca de Badami y, para terminar, una costa de herencia portuguesa.',
    },
    'ladakh-the-high-desert': {
      title: 'Ladakh, el desierto de altura',
      tagline: 'Nueve días a 3.500 metros o más: monasterios, dos de los puertos de carretera más altos del mundo, dunas de arena y un lago que cambia de color a cada hora.',
    },
    'spice-coast-and-backwaters': {
      title: 'Costa de las Especias y backwaters',
      tagline: 'Diez días recorriendo la columna verde de Kerala: colinas de té, una noche sobre el agua, caminos de aldea en bicicleta y una playa para terminar.',
    },
    'tea-hills-and-the-brahmaputra': {
      title: 'Colinas de té y el Brahmaputra',
      tagline: 'Diez días en el este de la India: las callejuelas y confiterías de Kolkata, el Kanchenjunga al amanecer desde Darjeeling y los rinocerontes de un cuerno de Kaziranga.',
    },
    'temples-of-the-tamil-south': {
      title: 'Templos del sur tamil',
      tagline: 'Once días por Tamil Nadu: templos junto al mar, una ciudad francesa, la capital chola, las cocinas de Chettinad y Madurai de noche, y después, cruzando las colinas, Kerala.',
    },
    'the-grand-tour': {
      title: 'El Gran Tour',
      tagline: 'Tres semanas, de norte a sur: el Taj y los fuertes de Rajasthan, y después un vuelo a Kerala para las colinas de té, una casa flotante y una semana junto al mar.',
    },
    'tigers-forts-and-palaces': {
      title: 'Tigres, fuertes y palacios',
      tagline: 'Diez días: cinco safaris en Ranthambore, el Fuerte Amber en jeep y los lagos de Udaipur, pensados para familias que quieren naturaleza salvaje y esplendor real.',
    },
  },
  it: {
    'ayurveda-rest-and-renewal': {
      title: 'Ayurveda, riposo e rinascita',
      tagline: 'Quattordici giorni: un programma ayurvedico seguito da medici in un ritiro sulle colline del Kerala, dieci notti di trattamenti e cucina sattvica, poi due giorni al mare per tornare con calma.',
    },
    'forts-deserts-and-the-taj': {
      title: 'Forti, deserti e il Taj',
      tagline: 'Dodici giorni dalla capitale moghul alla città d’oro, con il Taj all’alba e il deserto del Thar al tramonto.',
    },
    'golden-temple-and-the-foothills': {
      title: 'Il Tempio d’Oro e le colline himalayane',
      tagline: 'Dieci giorni da Amritsar al Gange: la città santa dei sikh, la cittadina di montagna del Dalai Lama, l’antica capitale estiva e lo yoga all’alba a Rishikesh.',
    },
    'golden-triangle-and-the-ganges': {
      title: 'Il Triangolo d’Oro e il Gange',
      tagline: 'Nove giorni: le città moghul, la Città Rosa e poi Varanasi, dove l’India smette di essere uno spettacolo e diventa qualcos’altro.',
    },
    'kingdoms-of-the-deccan': {
      title: 'Regni del Deccan',
      tagline: 'Tredici giorni attraverso il Karnataka fino a Goa: il palazzo di un maharaja, le colline del caffè, la città in rovina di Hampi, i templi rupestri di Badami e, per finire, una costa dal sapore portoghese.',
    },
    'ladakh-the-high-desert': {
      title: 'Ladakh, il deserto d’alta quota',
      tagline: 'Nove giorni a 3.500 metri e oltre: monasteri, due dei passi carrozzabili più alti del mondo, dune di sabbia e un lago che cambia colore di ora in ora.',
    },
    'spice-coast-and-backwaters': {
      title: 'Costa delle spezie e backwaters',
      tagline: 'Dieci giorni lungo la spina dorsale verde del Kerala: colline del tè, una notte sull’acqua, stradine di villaggio in bicicletta e una spiaggia per finire.',
    },
    'tea-hills-and-the-brahmaputra': {
      title: 'Colline del tè e Brahmaputra',
      tagline: 'Dieci giorni nell’India orientale: i vicoli e le pasticcerie di Kolkata, il Kanchenjunga all’alba da Darjeeling e i rinoceronti unicorni di Kaziranga.',
    },
    'temples-of-the-tamil-south': {
      title: 'Templi del Sud tamil',
      tagline: 'Undici giorni nel Tamil Nadu: templi sulla riva del mare, una cittadina francese, la capitale dei Chola, le cucine del Chettinad e Madurai di notte, poi oltre le colline fino al Kerala.',
    },
    'the-grand-tour': {
      title: 'Il Grand Tour',
      tagline: 'Tre settimane, tra nord e sud: il Taj e i forti del Rajasthan, poi un volo per il Kerala tra colline del tè, una houseboat e una settimana al mare.',
    },
    'tigers-forts-and-palaces': {
      title: 'Tigri, forti e palazzi',
      tagline: 'Dieci giorni: cinque safari a Ranthambore, l’Amber Fort in jeep e i laghi di Udaipur, pensati per famiglie che vogliono natura selvaggia e fasto regale.',
    },
  },
};

export const regionText: Partial<Record<Locale, Record<string, Pair>>> = {
  de: {
    'east-northeast': {
      title: 'Ost- und Nordostindien',
      tagline: 'Kolkatas morbider Glanz, Tee auf dem Bergrücken von Darjeeling, Nashörner am Brahmaputra und dahinter die Bergvölker. Das Indien, das selbst Indien noch nicht entdeckt hat.',
    },
    himalaya: {
      title: 'Himalaya',
      tagline: 'Vom Goldenen Tempel in der Ebene bis zu den Klöstern Ladakhs auf 3.500 Metern, mit kolonialen Bergorten, Ashrams und Apfeltälern dazwischen.',
    },
    north: {
      title: 'Nordindien',
      tagline: 'Das Kernland der Moguln und der Ganges: die sieben Städte Delhis, der Taj im Morgengrauen und die älteste Flussstadt der Welt.',
    },
    rajasthan: {
      title: 'Rajasthan',
      tagline: 'Festungen auf jedem Bergkamm, Farbe in jedem Hauseingang und eine Wüste, die um sechs Uhr golden leuchtet.',
    },
    south: {
      title: 'Südindien',
      tagline: 'Grün von den Bergen bis zum Meer, Tempel, in denen bis heute täglich gebetet wird, Gewürze auf jedem Teller und am Ende der Straße das Arabische Meer.',
    },
  },
  fr: {
    'east-northeast': {
      title: 'Est et Nord-Est',
      tagline: 'La splendeur décatie de Kolkata, le thé sur la crête de Darjeeling, les rhinocéros du Brahmapoutre et, au-delà, les peuples des collines. L’Inde que l’Inde elle-même n’a pas encore découverte.',
    },
    himalaya: {
      title: 'Himalaya',
      tagline: 'Du Temple d’or dans la plaine aux monastères du Ladakh à 3 500 mètres, avec entre les deux les stations de montagne, les ashrams et les vallées de pommiers.',
    },
    north: {
      title: 'Inde du Nord',
      tagline: 'Le cœur de l’empire moghol et le Gange : les sept cités de Delhi, le Taj à l’aube et la plus ancienne ville fluviale du monde.',
    },
    rajasthan: {
      title: 'Rajasthan',
      tagline: 'Des forts sur chaque crête, de la couleur à chaque porte, et un désert qui se pare d’or à six heures du soir.',
    },
    south: {
      title: 'Inde du Sud',
      tagline: 'Du vert des collines jusqu’à la mer, des temples toujours vivants au quotidien, des épices dans chaque assiette et la mer d’Arabie au bout de la route.',
    },
  },
  es: {
    'east-northeast': {
      title: 'Este y noreste',
      tagline: 'La grandeza decadente de Kolkata, té en la cresta de Darjeeling, rinocerontes junto al Brahmaputra y, más allá, los pueblos de las colinas. La India que ni la propia India ha descubierto aún.',
    },
    himalaya: {
      title: 'Himalaya',
      tagline: 'Del Templo Dorado en la llanura a los monasterios de Ladakh a 3.500 metros, con las estaciones de montaña, los ashrams y los valles de manzanos entre medias.',
    },
    north: {
      title: 'Norte de la India',
      tagline: 'El corazón mogol y el Ganges: las siete ciudades de Delhi, el Taj al amanecer y la ciudad ribereña más antigua del mundo.',
    },
    rajasthan: {
      title: 'Rajasthan',
      tagline: 'Fuertes en cada cresta, color en cada portal y un desierto que se vuelve dorado a las seis.',
    },
    south: {
      title: 'Sur de la India',
      tagline: 'Verde desde las colinas hasta el mar, templos que siguen en uso a diario, especias en cada plato y el mar Arábigo al final del camino.',
    },
  },
  it: {
    'east-northeast': {
      title: 'Est e Nord-Est',
      tagline: 'La grandezza decadente di Kolkata, il tè sul crinale di Darjeeling, i rinoceronti sul Brahmaputra e, più in là, le tribù delle colline. L’India che nemmeno l’India ha ancora scoperto.',
    },
    himalaya: {
      title: 'Himalaya',
      tagline: 'Dal Tempio d’Oro in pianura ai monasteri del Ladakh a 3.500 metri, passando per le località di montagna, gli ashram e le valli dei meli.',
    },
    north: {
      title: 'India del Nord',
      tagline: 'Il cuore dell’impero moghul e il Gange: le sette città di Delhi, il Taj all’alba e la più antica città fluviale del mondo.',
    },
    rajasthan: {
      title: 'Rajasthan',
      tagline: 'Forti su ogni crinale, colore su ogni porta e un deserto che alle sei diventa d’oro.',
    },
    south: {
      title: 'India del Sud',
      tagline: 'Verde dalle colline al mare, templi ancora vivi ogni giorno, spezie in ogni piatto e il Mar Arabico in fondo alla strada.',
    },
  },
};

export const specialistRole: Partial<Record<Locale, Record<string, string>>> = {
  de: { team: 'Reisespezialisten' },
  fr: { team: 'Spécialistes du voyage' },
  es: { team: 'Especialistas en viajes' },
  it: { team: 'Specialisti di viaggio' },
};
