import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "../config/db.js";
import Agency from "../models/Agency.js";

dotenv.config();

const seedAbout = async () => {
  try {
    await connectDB();

    const agency = await Agency.findOne({
      domain: "localhost",
    });

    if (!agency) {
      throw new Error(
        "Time Travels agency not found"
      );
    }

    agency.about = {
      hero: {
        label: "About Us",

        title:
          "More Than Travel, We Create Memories",

        description:
          "We believe travel is not just about visiting new places, but about discovering stories, cultures and unforgettable experiences.",

        image:
          "/images/about/about-hero.png",
      },

      story: {
        label: "Our Story",

        title:
          "A Journey That Began With a Simple Dream",

        paragraphs: [
          "Time Travels began with a simple idea — to make travel easy, comfortable and memorable for everyone.",

          "We are passionate about showcasing Odisha's natural beauty, culture, heritage and unforgettable experiences while helping every traveler enjoy a journey planned with care.",

          "From peaceful family holidays and spiritual journeys to nature escapes and customized tours, our goal is to make every journey simple, enjoyable and worth remembering.",
        ],

        image:
          "/images/about/about-story.png",
      },

      reasonsLabel:
        "Why Travel With Us",

      reasonsHeading:
        "Your Trusted Travel Partner",

      reasonsDescription:
        "From planning to the journey itself, we focus on making travel simple, comfortable and memorable.",

      reasons: [
        {
          icon: "users",

          title:
            "Personalized Service",

          description:
            "Every journey is planned around your preferences, comfort and travel needs.",
        },

        {
          icon: "award",

          title:
            "Trusted & Reliable",

          description:
            "We focus on dependable service, careful planning and a smooth travel experience.",
        },

        {
          icon: "map-pinned",

          title:
            "Local Travel Knowledge",

          description:
            "Discover popular attractions and memorable experiences across Odisha with thoughtful planning.",
        },

        {
          icon: "heart",

          title:
            "Memorable Experiences",

          description:
            "We create journeys designed to become memories you will cherish long after your trip.",
        },
      ],

      statsBackgroundImage:
        "/images/about/about-stats-bg.png",

      stats: [
        {
          value: "1000+",

          label:
            "Happy Travelers",
        },

        {
          value: "50+",

          label:
            "Tour Packages",
        },

        {
          value: "10+",

          label:
            "Destinations",
        },

        {
          value: "25+",

          label:
            "Years of Experience",
        },
      ],

      missionVisionLabel:
        "Our Mission & Vision",

      missionVisionTitle:
        "Driven by a Bigger Purpose",

      missionVisionDescription:
        "Our purpose goes beyond arranging trips. We want every traveler to experience a journey that feels comfortable, meaningful and thoughtfully planned.",

      mission: {
        heading:
          "Our Mission",

        description:
          "To create enriching travel experiences through dependable service, thoughtful planning and genuine customer care.",
      },

      vision: {
        heading:
          "Our Vision",

        description:
          "To become a trusted travel brand that inspires people to explore new places, discover meaningful experiences and create memories that last.",
      },

      cta: {
        label:
          "Let's Explore Together",

        title:
          "Ready for Your Next Journey?",

        description:
          "Let Time Travels turn your travel ideas into a memorable journey. Tell us where you want to go, and we'll help you plan the experience.",

        buttonText:
          "Plan Your Trip",

        buttonLink:
          "/plan-my-trip",

        image:
          "/images/about/about-cta.png",
      },
    };

    await agency.save();

    console.log(
      "✅ Time Travels About data seeded successfully"
    );
  } catch (error) {
    console.error(
      "❌ About seed failed:",
      error.message
    );
  } finally {
    await mongoose.connection.close();
  }
};

seedAbout();