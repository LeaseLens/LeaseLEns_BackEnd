// seeders/insertProducts.js
const db = require('../models'); // models 폴더에서 db 객체를 가져옵니다.

(async () => {
  try {
    await db.sequelize.sync(); // 모든 정의된 모델을 DB에 동기화합니다.

    const products = [
      {
        prod_category: 'Electronics',
        prod_img: 'path/to/smartphone.jpg', // 실제 이미지 경로로 변경하세요.
        prod_name: 'Smartphone',
        prod_text: 'Latest model smartphone with advanced features.',
        prod_likes: 100,
        prod_price: 999,
      },
      {
        prod_category: 'Books',
        prod_img: 'path/to/book.jpg', // 실제 이미지 경로로 변경하세요.
        prod_name: 'JavaScript: The Good Parts',
        prod_text: 'A book about the best parts of JavaScript.',
        prod_likes: 50,
        prod_price: 29,
      },
    ];

    for (const product of products) {
      await db.Product.create(product);
    }

    console.log('Products have been inserted successfully.');
  } catch (error) {
    console.error('Error inserting products:', error);
  } finally {
    await db.sequelize.close();
  }
})();
