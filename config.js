// Parses the environment and port; sets defaults if not provided
// Also makes a list of images from the file of all images

// https://nodejs.org/api/fs.html
var fs = require('fs');
var exec = require('child_process').exec;

var config = {};
config.userFriendly = {};
config.test = (parseInt(process.argv[3]) ? parseInt(process.argv[3]):0);
config.http_port = parseInt(process.argv[2]) || 9999;
config.http_url = 'http://localhost:' + config.http_port;
config.db_url = 'mongodb://localhost/prototype';
config.num_dests = 15;
config.num_tags = 5;
config.optimum_img_selection = 6;
config.num_hotels = 20;
config.num_reviews = 1000;

// Loads a list of images from the file of all images from the directory and stores in config.images variable
config.images = fs.readdirSync('./img/images');
for (var i = 0; i < config.images.length; i++) {
    config.images[i] = '/images/' + config.images[i];
}

config.userFriendly.WHERE_AFRICA = 'Africa';
config.userFriendly.WHERE_ASIA = 'Asia';
config.userFriendly.WHERE_AUSTRALIA_PACIFIC = 'Australia & Pacific Islands';
config.userFriendly.WHERE_CENTRAL_AMERICA = 'Central America';
config.userFriendly.WHERE_MEDITERRANEAN_SEA = 'Mediterranean Sea';
config.userFriendly.WHERE_MIDDLE_EAST = 'Middle East';
config.userFriendly.WHERE_NORTH_AMERICA = 'North America';
config.userFriendly.WHERE_SOUTH_AMERICA = 'South America';
config.userFriendly.WHERE_EUROPE = 'Europe';

config.userFriendly.INSPIRE_BAR = 'Bars';
config.userFriendly.INSPIRE_BOATING = 'Boating';
config.userFriendly.INSPIRE_BUNGEE_JUMPING = 'Bungee jumping';
config.userFriendly.INSPIRE_CAMPING = 'Camping';
config.userFriendly.INSPIRE_CANOEING = 'Canoeing';
config.userFriendly.INSPIRE_CROSS_COUNTRY_SKIING = 'Cross country skiing';
config.userFriendly.INSPIRE_DINING = 'Dining';
config.userFriendly.INSPIRE_DOWNHILL_MOUNTAIN_BIKING = 'Mountain biking';
config.userFriendly.INSPIRE_DOWNHILL_SKIING = 'Downhill skiing';
config.userFriendly.INSPIRE_DRINKING_ALCOHOL = 'Drinking';
config.userFriendly.INSPIRE_DANCING = 'Dancing';
config.userFriendly.INSPIRE_GAMBLING_CASINO = 'Casinos';
config.userFriendly.INSPIRE_GOING_TO_CONCERT = 'Concerts';
config.userFriendly.INSPIRE_GOING_PLAY = 'Plays';
config.userFriendly.INSPIRE_GOING_TO_BALLET = 'Ballets';
config.userFriendly.INSPIRE_GOING_TO_OPERA = 'Operas';
config.userFriendly.INSPIRE_GOLFING = 'Golfing';
config.userFriendly.INSPIRE_HIKING = 'Hiking';
config.userFriendly.INSPIRE_HORSEBACK_RIDING = 'Horseback riding';
config.userFriendly.INSPIRE_KITE_SURFING = 'Kite surfing';
config.userFriendly.INSPIRE_NIGHT_CLUB = 'Nightclubs';
config.userFriendly.INSPIRE_POOL_PARTY = 'Pool parties';
config.userFriendly.INSPIRE_RELAXING = 'Relaxing';
config.userFriendly.INSPIRE_ROAD_TRAIL_BIKING = 'Road & trail biking';
config.userFriendly.INSPIRE_ROCK_CLIMBING = 'Rock climbing';
config.userFriendly.INSPIRE_SCUBA_DIVING = 'Scuba diving';
config.userFriendly.INSPIRE_SEA_KAYAKING = 'Sea kayaking';
config.userFriendly.INSPIRE_SHOPPING = 'Shopping';
config.userFriendly.INSPIRE_SIGHTSEEING = 'Sightseeing';
config.userFriendly.INSPIRE_SKY_DIVING = 'Sky diving';
config.userFriendly.INSPIRE_SNORKELING = 'Snorkeling';
config.userFriendly.INSPIRE_SNOWBOARDING = 'Snowboarding';
config.userFriendly.INSPIRE_SNOWSHOEING = 'Snowshoeing';
config.userFriendly.INSPIRE_SURFING = 'Surfing';
config.userFriendly.INSPIRE_SWIMMING = 'Swimming';
config.userFriendly.INSPIRE_VISIT_SPA = 'Spa visits';
config.userFriendly.INSPIRE_VISIT_THEME_PARK = 'Amusement parks';
config.userFriendly.INSPIRE_WATCHING_MOVIE = 'Movies';
config.userFriendly.INSPIRE_WHITE_WATER_KAYKING = 'White water kayaking';
config.userFriendly.INSPIRE_WHITE_WATER_RAFTING = 'White water rafting';
config.userFriendly.INSPIRE_WINDSURFING = 'Windsurfing';
config.userFriendly.INSPIRE_ZIP_LINING = 'Zip lining';

config.userFriendly.SETTINGS_BAR_NIGHTCLUB = 'Nightclubs';
config.userFriendly.SETTINGS_BEACH = 'Beaches';
config.userFriendly.SETTINGS_BIG_CITY = 'Big cities';
config.userFriendly.SETTINGS_CROWDED = 'Crowds';
config.userFriendly.SETTINGS_CRUISE_SHIP = 'Cruises';
config.userFriendly.SETTINGS_DESERT = 'Desert';
config.userFriendly.SETTINGS_FOREST = 'Forests';
config.userFriendly.SETTINGS_GARDEN = 'Gardens';
config.userFriendly.SETTINGS_GOLF_COURSE = 'Golf courses';
config.userFriendly.SETTINGS_HILLY = 'Hilly terrain';
config.userFriendly.SETTINGS_HISTORIC_CITY = 'Historic city';
config.userFriendly.SETTINGS_HISTORIC_LANDMARK = 'Historic landmarks';
config.userFriendly.SETTINGS_HUT_CABANA = 'Huts & cabanas';
config.userFriendly.SETTINGS_ISLANDS = 'Islands';
config.userFriendly.SETTINGS_JUNGLE = 'Jungles';
config.userFriendly.SETTINGS_LAKE = 'Lakes';
config.userFriendly.SETTINGS_LODGE_CABIN = 'Lodges & cabins';
config.userFriendly.SETTINGS_LUSH = 'Lush terrain';
config.userFriendly.SETTINGS_LUXURY_HOTEL_RESORT = 'Luxury hotels';
config.userFriendly.SETTINGS_MODERN_CITY = 'Modern cities';
config.userFriendly.SETTINGS_MONUMENT_STATUE = 'Monuments & statues';
config.userFriendly.SETTINGS_MOUNTAIN = 'Mountains';
config.userFriendly.SETTINGS_MUSEUM = 'Museums';
config.userFriendly.SETTINGS_OCEAN_SEA = 'Ocean & sea';
config.userFriendly.SETTINGS_PARK = 'Parks';
config.userFriendly.SETTINGS_PLACE_OF_WORSHIP = 'Places of worship';
config.userFriendly.SETTINGS_POOL = 'Pools';
config.userFriendly.SETTINGS_RESTAURANT = 'Restaurants';
config.userFriendly.SETTINGS_RIVER = 'Rivers';
config.userFriendly.SETTINGS_ROCKY = 'Rocky terrain';
config.userFriendly.SETTINGS_RUINS = 'Ruins';
config.userFriendly.SETTINGS_SECLUDED = 'Secluded';
config.userFriendly.SETTINGS_SKI_RESORT = 'Ski resorts';
config.userFriendly.SETTINGS_SMALL_HOTEL = 'Small hotels';
config.userFriendly.SETTINGS_SMALL_TOWN_VILLAGE = 'Villages';
config.userFriendly.SETTINGS_SPA = 'Spas';
config.userFriendly.SETTINGS_TENT = 'Tents & camping';
config.userFriendly.SETTINGS_THEME_PARK = 'Theme parks';
config.userFriendly.SETTINGS_VINEYARDS = 'Vineyards';
config.userFriendly.SETTINGS_WATER_PARK = 'Water parks';
config.userFriendly.SETTINGS_WATERFALL = 'Waterfalls';
config.userFriendly.SETTINGS_ZOO_AQUARIUM = 'Zoo & aquarium';

config.userFriendly.WEATHER_COLD = 'Cold weather';
config.userFriendly.WEATHER_DRY = 'Dry weather';
config.userFriendly.WEATHER_FOGGY = 'Foggy weather';
config.userFriendly.WEATHER_HUMID = 'Humid weather';
config.userFriendly.WEATHER_MODERATE = 'Moderate weather';
config.userFriendly.WEATHER_OVERCAST = 'Overcast weather';
config.userFriendly.WEATHER_RAINY = 'Rainy weather';
config.userFriendly.WEATHER_SNOWY = 'Snowy weather';
config.userFriendly.WEATHER_SUNNY = 'Sunny weather';
config.userFriendly.WEATHER_TROPICAL = 'Tropical weather';
config.userFriendly.WEATHER_WINDY = 'Windy weather';

module.exports = config;