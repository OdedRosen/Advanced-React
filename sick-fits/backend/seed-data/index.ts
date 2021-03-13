import { KeystoneContext } from '@keystone-next/types';
import { Mongoose } from 'mongoose';
import { products } from './data';

export async function insertSeedData(keystone: KeystoneContext): Promise<void> {
  console.log(`🌱 Inserting Seed Data: ${products.length} Products`);
  const mongoose = keystone.mongoose as Mongoose;
  for (const product of products) {
    console.log(`  🛍️ Adding Product: ${product.name}`);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { _id } = await mongoose
      .model('ProductImage')
      .create({ image: product.photo, altText: product.description });
    product.photo = _id;
    await mongoose.model('Product').create(product);
  }
  console.log(`✅ Seed Data Inserted: ${products.length} Products`);
  console.log('👋 Please start the process with `yarn dev` or `npm run dev`');
  process.exit();
}
