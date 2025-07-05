import connectDb from "@/lib/db";
import { User } from "@/models/UserSchema";



export async function seedFarmsAndAchievements() {
  try {
    await connectDb() // Use environment variable for URI

    const users = await User.find({}); // Fetch all users

    for (const user of users) {
      // Only seed if farms or achievements are empty
      if (!user.farms?.length) {
        user.farms = [
          {
            name: 'Green Valley Organic Farm',
            size: '150 acres',
            location: 'Fresno, CA',
            established: 2018,
            crops: 'Corn, Wheat, Tomatoes',
            status: 'Active',
          },
          {
            name: 'Sunshine Acres',
            size: '200 acres',
            location: 'Bakersfield, CA',
            established: 2020,
            crops: 'Soybeans, Lettuce',
            status: 'Active',
          },
          {
            name: 'Heritage Fields',
            size: '100 acres',
            location: 'Modesto, CA',
            established: 2024,
            crops: 'Barley, Carrots',
            status: 'Planning',
          },
        ];
      }

      if (!user.achievements?.length) {
        user.achievements = [
          {
            title: 'USDA Organic Certification',
            description: 'Certified organic farming practices',
            year: 2023,
            iconColor: 'yellow',
          },
          {
            title: 'Sustainable Agriculture Award',
            description: 'Recognized for environmental stewardship and innovation',
            year: 2024,
            iconColor: 'green',
          },
          {
            title: 'Water Conservation Leader',
            description: 'Achieved 35% water reduction through efficient irrigation',
            year: 2023,
            iconColor: 'blue',
          },
          {
            title: 'Community Impact Recognition',
            description: 'Outstanding contribution to local food security',
            year: 2022,
            iconColor: 'purple',
          },
        ];
      }

      await user.save();
    }

    console.log('Farms and achievements seeded successfully');
  } catch (error) {
    console.error('Seeding error:', error);
  } 
}
