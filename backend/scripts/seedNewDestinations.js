import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "../config/db.js";
import Agency from "../models/Agency.js";
import Destination from "../models/Destination.js";

dotenv.config();

const AGENCY_SLUG = "time-travels";

/* =========================================
   DESTINATION DATA
========================================= */

const destinations = [
  /* =======================================
     1. CUTTACK
  ======================================= */
  {
    name: "Cuttack",
    slug: "cuttack",

    subtitle:
      "Explore Odisha's historic Silver City",

    heroImage:
      "/images/destinations/cuttack/cuttack-hero.jpg",

    cardImage:
      "/images/destinations/cuttack/cuttack-hero.jpg",

    description:
      "Cuttack is one of Odisha's oldest cities, known for its historic landmarks, cultural heritage, river landscapes and famous silver filigree tradition.",

    attractions: [
      {
        title: "Barabati Fort",
        image:
          "/images/destinations/cuttack/barabati-fort.webp",
        description:
          "A historic fort on the banks of the Mahanadi River and an important landmark of Cuttack.",
      },
      {
        title:
          "Odisha State Maritime Museum",
        image:
          "/images/destinations/cuttack/odisha-state-maritime-museum.jpg",
        description:
          "A museum showcasing Odisha's maritime history, traditional navigation and boat-building heritage.",
      },
      {
        title: "Ansupa Lake",
        image:
          "/images/destinations/cuttack/ansupa-lake.png",
        description:
          "A scenic freshwater lake surrounded by greenery, offering a peaceful natural escape near Cuttack.",
      },
      {
        title: "Dhabaleswar Temple",
        image:
          "/images/destinations/cuttack/dhabaleswar-temple.png",
        description:
          "A well-known Shiva temple situated on an island in the Mahanadi River near Cuttack.",
      },
    ],

    bestTimeToVisit:
      "October to March",

    idealDuration: "1–2 Days",

    location: "Cuttack, Odisha",

    type: "Heritage & Culture",

    ctaImage:
      "/images/destinations/cuttack/cuttack-cta.png",

    gallery: [],

    status: "active",
  },

  /* =======================================
     2. GOPALPUR
  ======================================= */
  {
    name: "Gopalpur",
    slug: "gopalpur",

    subtitle:
      "A peaceful seaside escape on Odisha's coast",

    heroImage:
      "/images/destinations/gopalpur/gopalpur-hero.png",

    cardImage:
      "/images/destinations/gopalpur/gopalpur-hero.png",

    description:
      "Gopalpur is a coastal destination in southern Odisha known for its beach, lighthouse and relaxed seaside atmosphere, with several scenic and spiritual attractions nearby.",

    attractions: [
      {
        title: "Gopalpur Beach",
        image:
          "/images/destinations/gopalpur/gopalpur-beach.png",
        description:
          "A popular beach known for its long coastline, sea views and peaceful atmosphere.",
      },
      {
        title: "Gopalpur Lighthouse",
        image:
          "/images/destinations/gopalpur/gopalpur-lighthouse.png",
        description:
          "A prominent coastal landmark associated with Gopalpur's maritime character and scenic shoreline.",
      },
      {
        title: "Tampara Lake",
        image:
          "/images/destinations/gopalpur/tampara-lake.png",
        description:
          "A scenic freshwater lake near Chatrapur surrounded by natural beauty and calm waters.",
      },
      {
        title: "Tara Tarini Temple",
        image:
          "/images/destinations/gopalpur/tara-tarini-temple.png",
        description:
          "A revered hilltop shrine dedicated to Maa Tara Tarini, overlooking the surrounding landscape.",
      },
    ],

    bestTimeToVisit:
      "October to March",

    idealDuration: "1–2 Days",

    location: "Ganjam, Odisha",

    type: "Beach & Leisure",

    ctaImage:
      "/images/destinations/gopalpur/gopalpur-cta.png",

    gallery: [],

    status: "active",
  },

  /* =======================================
     3. CHANDIPUR
  ======================================= */
  {
    name: "Chandipur",
    slug: "chandipur",

    subtitle:
      "Discover Odisha's unique receding sea beach",

    heroImage:
      "/images/destinations/chandipur/chandipur-hero.png",

    cardImage:
      "/images/destinations/chandipur/chandipur-hero.png",

    description:
      "Chandipur is a distinctive coastal destination in Balasore district, famous for its unusual tidal beach where the sea recedes significantly during low tide.",

    attractions: [
      {
        title: "Chandipur Beach",
        image:
          "/images/destinations/chandipur/chandipur-beach.png",
        description:
          "A unique beach famous for the dramatic movement of the shoreline during low and high tides.",
      },
      {
        title: "Panchalingeswar Temple",
        image:
          "/images/destinations/chandipur/panchalingeswar-temple.png",
        description:
          "A scenic Shiva pilgrimage site situated amid the hills and greenery of Balasore district.",
      },
      {
        title:
          "Nilagiri Jagannath Temple",
        image:
          "/images/destinations/chandipur/nilagiri-jagannath-temple.png",
        description:
          "A notable Jagannath temple at Nilagiri, surrounded by the natural landscape of northern Odisha.",
      },
      {
        title:
          "Khirachora Gopinath Temple",
        image:
          "/images/destinations/chandipur/khirachora-gopinath-temple.png",
        description:
          "A renowned Krishna temple at Remuna and an important spiritual destination near Balasore.",
      },
    ],

    bestTimeToVisit:
      "October to March",

    idealDuration: "1–2 Days",

    location: "Balasore, Odisha",

    type: "Beach & Pilgrimage",

    ctaImage:
      "/images/destinations/chandipur/chandipur-cta.png",

    gallery: [],

    status: "active",
  },

  /* =======================================
     4. SATKOSIA
  ======================================= */
  {
    name: "Satkosia",
    slug: "satkosia",

    subtitle:
      "Experience forests, wildlife and the Mahanadi Gorge",

    heroImage:
      "/images/destinations/satkosia/satkosia-hero.jpg",

    cardImage:
      "/images/destinations/satkosia/satkosia-hero.jpg",

    description:
      "Satkosia is a nature and wildlife destination centred around the spectacular Mahanadi Gorge, with forests, river landscapes and eco-tourism experiences.",

    attractions: [
      {
        title: "Satkosia Gorge",
        image:
          "/images/destinations/satkosia/satkosia-gorge.webp",
        description:
          "A spectacular gorge where the Mahanadi River flows through forested hills, creating one of Odisha's remarkable natural landscapes.",
      },
      {
        title: "Tikarpada",
        image:
          "/images/destinations/satkosia/tikarpada.jpg",
        description:
          "A riverside destination in the Satkosia landscape known for its natural scenery and association with gharial conservation.",
      },
      {
        title: "Satkosia Sands, Badmul",
        image:
          "/images/destinations/satkosia/satkosia-sands-badmul.jpg",
        description:
          "A nature-based destination at Badmul offering views of the river, forests and sandy banks of the Satkosia landscape.",
      },
      {
        title: "Deojhar Waterfall",
        image:
          "/images/destinations/satkosia/deojhar-waterfall.jpg",
        description:
          "A scenic waterfall surrounded by greenery, adding another natural attraction to the wider Satkosia region.",
      },
    ],

    bestTimeToVisit:
      "October to March",

    idealDuration: "2 Days",

    location:
      "Satkosia, Odisha",

    type: "Nature & Wildlife",

    ctaImage:
      "/images/destinations/satkosia/satkosia-cta.jpg",

    gallery: [],

    status: "active",
  },

  /* =======================================
     5. TAPTAPANI
  ======================================= */
  {
    name: "Taptapani",
    slug: "taptapani",

    subtitle:
      "Hot springs, hills and peaceful tribal landscapes",

    heroImage:
      "/images/destinations/taptapani/taptapani-hero.jpg",

    cardImage:
      "/images/destinations/taptapani/taptapani-hero.jpg",

    description:
      "Taptapani is a scenic destination in southern Odisha known for its natural hot spring, forested hills and nearby cultural and spiritual attractions.",

    attractions: [
      {
        title: "Taptapani Hot Spring",
        image:
          "/images/destinations/taptapani/taptapani-hot-spring.jpg",
        description:
          "A natural hot spring surrounded by hills and greenery, and the best-known attraction of Taptapani.",
      },
      {
        title:
          "Jirang Buddhist Monastery",
        image:
          "/images/destinations/taptapani/jirang-buddhist-monastery.jpg",
        description:
          "The Padmasambhava Mahavihara at Jirang is a major Buddhist monastery set amid the peaceful landscape of Gajapati district.",
      },
      {
        title: "Khasada Waterfall",
        image:
          "/images/destinations/taptapani/khasada-waterfall.jpg",
        description:
          "A scenic waterfall surrounded by rocky terrain and greenery near the Taptapani region.",
      },
      {
        title: "Chandragiri",
        image:
          "/images/destinations/taptapani/chandragiri.jpg",
        description:
          "A peaceful hill settlement known for its Tibetan cultural influence and beautiful natural surroundings.",
      },
    ],

    bestTimeToVisit:
      "October to March",

    idealDuration: "1–2 Days",

    location:
      "Ganjam & Gajapati, Odisha",

    type: "Nature & Culture",

    ctaImage:
      "/images/destinations/taptapani/taptapani-cta.png",

    gallery: [],

    status: "active",
  },

  /* =======================================
     6. GHATAGAON
  ======================================= */
  {
    name: "Ghatagaon",
    slug: "ghatagaon",

    subtitle:
      "Spiritual heritage and natural beauty of Keonjhar",

    heroImage:
      "/images/destinations/ghatagaon/ghatagaon-hero.jpg",

    cardImage:
      "/images/destinations/ghatagaon/ghatagaon-hero.jpg",

    description:
      "Ghatagaon is an important pilgrimage destination in Keonjhar district, centred around the famous Maa Tarini Temple and surrounded by waterfalls, heritage sites and traditional crafts.",

    attractions: [
      {
        title: "Maa Tarini Temple",
        image:
          "/images/destinations/ghatagaon/maa-tarini-temple.jpg",
        description:
          "A highly revered temple dedicated to Maa Tarini and one of the best-known pilgrimage sites of Keonjhar district.",
      },
      {
        title:
          "Gundichaghagi Waterfall",
        image:
          "/images/destinations/ghatagaon/gundichaghagi-waterfall.jpg",
        description:
          "A picturesque waterfall surrounded by greenery and rocky terrain near Ghatagaon.",
      },
      {
        title: "Sitabinji",
        image:
          "/images/destinations/ghatagaon/sitabinji.jpg",
        description:
          "A heritage site known for its ancient rock shelters, historic paintings and distinctive natural rock formations.",
      },
      {
        title:
          "Ghatagaon Terracotta Craft",
        image:
          "/images/destinations/ghatagaon/ghatagaon-terracotta.png",
        description:
          "Traditional terracotta craftsmanship representing the local artistic heritage of the Ghatagaon area.",
      },
    ],

    bestTimeToVisit:
      "October to March",

    idealDuration: "1–2 Days",

    location:
      "Ghatagaon, Keonjhar, Odisha",

    type: "Pilgrimage & Nature",

    ctaImage:
      "/images/destinations/ghatagaon/ghatagaon-cta.jpg",

    gallery: [],

    status: "active",
  },

  /* =======================================
     7. KEONJHAR
  ======================================= */
  {
    name: "Keonjhar",
    slug: "keonjhar",

    subtitle:
      "Waterfalls, forests and scenic highlands",

    heroImage:
      "/images/destinations/keonjhar/keonjhar-hero.jpg",

    cardImage:
      "/images/destinations/keonjhar/keonjhar-hero.jpg",

    description:
      "Keonjhar is a scenic district of northern Odisha known for its forested hills, impressive waterfalls, rocky landscapes and important natural and spiritual sites.",

    attractions: [
      {
        title:
          "Sanaghagara Waterfall",
        image:
          "/images/destinations/keonjhar/sanaghagara-waterfall.jpg",
        description:
          "A popular waterfall and nature spot surrounded by greenery near Keonjhar town.",
      },
      {
        title:
          "Badaghagara Waterfall",
        image:
          "/images/destinations/keonjhar/badaghagara-waterfall.jpg",
        description:
          "A scenic waterfall in a forested setting and one of Keonjhar's notable natural attractions.",
      },
      {
        title:
          "Khandadhar Waterfall",
        image:
          "/images/destinations/keonjhar/khandadhar-waterfall-keonjhar.jpg",
        description:
          "A beautiful waterfall in Keonjhar district surrounded by hills and dense natural vegetation.",
      },
      {
        title: "Gonasika & Guptaganga",
        image:
          "/images/destinations/keonjhar/gonasika-guptaganga.png",
        description:
          "A sacred and scenic area associated with the origin of the Baitarani River, surrounded by forested hills.",
      },
    ],

    bestTimeToVisit:
      "October to March",

    idealDuration: "2 Days",

    location:
      "Keonjhar, Odisha",

    type: "Nature & Waterfalls",

    ctaImage:
      "/images/destinations/keonjhar/keonjhar-cta.jpg",

    gallery: [],

    status: "active",
  },

  /* =======================================
     8. NAYAGARH
  ======================================= */
  {
    name: "Nayagarh",
    slug: "nayagarh",

    subtitle:
      "Sacred temples and scenic countryside",

    heroImage:
      "/images/destinations/nayagarh/nayagarh-hero.jpg",

    cardImage:
      "/images/destinations/nayagarh/nayagarh-hero.jpg",

    description:
      "Nayagarh offers a blend of spiritual destinations, historic temples, hills and peaceful countryside, making it an interesting cultural journey through central Odisha.",

    attractions: [
      {
        title:
          "Shree Ram Temple, Fategarh",
        image:
          "/images/destinations/nayagarh/fategarh-ram-mandir.jpg",
        description:
          "A prominent hilltop temple dedicated to Lord Ram at Fategarh, offering a spiritual setting amid the surrounding landscape.",
      },
      {
        title:
          "Maa Vaishno Devi Temple, Jamukana",
        image:
          "/images/destinations/nayagarh/vaishno-devi-temple-jamukana.png",
        description:
          "A spiritual destination at Jamukana dedicated to Maa Vaishno Devi, set amid the natural landscape of Nayagarh.",
      },
      {
        title:
          "Nilamadhab Temple, Kantilo",
        image:
          "/images/destinations/nayagarh/nilamadhab-temple-kantilo.jpg",
        description:
          "An important temple dedicated to Lord Nilamadhab at Kantilo, situated near the Mahanadi River.",
      },
      {
        title:
          "Ladukeswar Temple, Sarankul",
        image:
          "/images/destinations/nayagarh/ladukeswar-temple-sarankul.jpg",
        description:
          "A revered Shiva temple at Sarankul, popularly associated with Ladu Baba and an important pilgrimage site of Nayagarh.",
      },
    ],

    bestTimeToVisit:
      "October to March",

    idealDuration: "1–2 Days",

    location:
      "Nayagarh, Odisha",

    type: "Pilgrimage & Heritage",

    ctaImage:
      "/images/destinations/nayagarh/nayagarh-cta.png",

    gallery: [],

    status: "active",
  },

  /* =======================================
     9. MAHENDRAGIRI
  ======================================= */
  {
    name: "Mahendragiri",
    slug: "mahendragiri",

    subtitle:
      "Sacred peaks, ancient shrines and mountain views",

    heroImage:
      "/images/destinations/mahendragiri/mahendragiri-hero.jpg",

    cardImage:
      "/images/destinations/mahendragiri/mahendragiri-hero.jpg",

    description:
      "Mahendragiri is a prominent mountain destination in Gajapati district, combining scenic Eastern Ghats landscapes with ancient temples and traditions associated with the Mahabharata.",

    attractions: [
      {
        title: "Yudhishthira Temple",
        image:
          "/images/destinations/mahendragiri/yudhishthira-temple.jpg",
        description:
          "An ancient hilltop shrine associated by local tradition with Yudhishthira, set amid Mahendragiri's mountain landscape.",
      },
      {
        title: "Bhima Temple",
        image:
          "/images/destinations/mahendragiri/bhima-temple.jpg",
        description:
          "A historic stone shrine on Mahendragiri traditionally associated with Bhima of the Mahabharata.",
      },
      {
        title: "Kunti Temple",
        image:
          "/images/destinations/mahendragiri/kunti-temple.jpg",
        description:
          "An ancient shrine traditionally associated with Kunti and part of Mahendragiri's sacred landscape.",
      },
      {
        title:
          "Parashurama Shrine",
        image:
          "/images/destinations/mahendragiri/parashurama-shrine.png",
        description:
          "A sacred site associated with Parashurama and the religious traditions surrounding Mahendragiri.",
      },
    ],

    bestTimeToVisit:
      "October to February",

    idealDuration: "1–2 Days",

    location:
      "Gajapati, Odisha",

    type: "Nature & Pilgrimage",

    ctaImage:
      "/images/destinations/mahendragiri/mahendragiri-cta.png",

    gallery: [],

    status: "active",
  },
];

/* =========================================
   SEED DESTINATIONS
========================================= */

const seedDestinations = async () => {
  try {
    /* =====================================
       CONNECT DATABASE
    ===================================== */

    await connectDB();

    /* =====================================
       FIND TIME TRAVELS
    ===================================== */

    const agency =
      await Agency.findOne({
        slug: AGENCY_SLUG,
        status: "active",
      }).select("_id name slug");

    if (!agency) {
      throw new Error(
        `Active agency "${AGENCY_SLUG}" was not found`
      );
    }

    console.log(
      `\n🏢 Agency: ${agency.name}`
    );

    console.log(
      `🆔 Agency ID: ${agency._id}`
    );

    console.log(
      "\n🌍 Starting destination seed...\n"
    );

    let insertedCount = 0;
    let skippedCount = 0;

    /* =====================================
       INSERT ONE BY ONE
    ===================================== */

    for (const destination of destinations) {
      /*
       * IMPORTANT:
       * Check both agencyId and slug.
       * This keeps destinations isolated
       * between different agencies.
       */
      const existingDestination =
        await Destination.findOne({
          agencyId: agency._id,
          slug: destination.slug,
        }).select("_id name slug");

      /*
       * Never update or overwrite an
       * existing destination.
       */
      if (existingDestination) {
        console.log(
          `⏭️  Skipped: ${destination.name} (already exists)`
        );

        skippedCount += 1;
        continue;
      }

      /*
       * agencyId always comes from the
       * trusted Agency document.
       */
      await Destination.create({
        agencyId: agency._id,
        ...destination,
      });

      console.log(
        `✅ Inserted: ${destination.name}`
      );

      insertedCount += 1;
    }

    /* =====================================
       RESULT
    ===================================== */

    console.log(
      "\n=============================="
    );

    console.log(
      "🌍 Destination seed completed"
    );

    console.log(
      `✅ Inserted: ${insertedCount}`
    );

    console.log(
      `⏭️  Skipped: ${skippedCount}`
    );

    console.log(
      `📦 Processed: ${destinations.length}`
    );

    console.log(
      "==============================\n"
    );
  } catch (error) {
    console.error(
      "\n❌ Destination seed failed:",
      error.message
    );

    process.exitCode = 1;
  } finally {
    /*
     * Always close the MongoDB connection,
     * whether the seed succeeds or fails.
     */
    await mongoose.disconnect();

    console.log(
      "🔌 MongoDB disconnected"
    );
  }
};

/* =========================================
   RUN
========================================= */

seedDestinations();