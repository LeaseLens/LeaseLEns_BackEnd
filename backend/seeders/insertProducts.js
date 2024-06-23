const db = require('../models'); // models 폴더에서 db 객체를 가져옵니다.

(async () => {
  try {
    await db.sequelize.sync(); // 모든 정의된 모델을 DB에 동기화합니다.

    const products = [
      {
        prod_category: '정수기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod1.png', 
        prod_name: '코웨이 아이콘 냉온정 얼음정수기',
        prod_text: 'Latest model smartphone with advanced features.',
        prod_likes: 318,
        prod_price: 80000,
      },
      {
        prod_category: '공기청정기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod2.png', 
        prod_name: '코웨이 듀얼클린 제습공기청정기',
        prod_text: 'Latest model smartphone with advanced features.',
        prod_likes: 213,
        prod_price: 110000,
      },
      {
        prod_category: '공기청정기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod3.png', 
        prod_name: '삼성 비스포크 큐브 에어 인피니트 라인 공기청정기 30평형',
        prod_text: 'Latest model smartphone with advanced features.',
        prod_likes: 23,
        prod_price: 40000,
      },
      {
        prod_category: '청소기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod4.png', 
        prod_name: '삼성 비스포크 제트 AI 무선청소기 310W',
        prod_text: 'Latest model smartphone with advanced features.',
        prod_likes: 54,
        prod_price: 70000,
      },
      {
        prod_category: '에어컨',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod5.png', 
        prod_name: '삼성 비스포크 윈도우핏 창문형 에어컨 6평형',
        prod_text: 'Latest model smartphone with advanced features.',
        prod_likes: 38,
        prod_price: 80000,
      },
      {
        prod_category: '세탁기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod6.png', 
        prod_name: '삼성 비스포크 그랑데 세탁기 AI',
        prod_text: 'Latest model smartphone with advanced features.',
        prod_likes: 54,
        prod_price: 120000,
      },
      {
        prod_category: '냉장고',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod7.png', 
        prod_name: '삼성 비스포크 4도어 냉장고',
        prod_text: 'Latest model smartphone with advanced features.',
        prod_likes: 658,
        prod_price: 60000,
      },
      {
        prod_category: '냉장고',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod8.png', 
        prod_name: '삼성 냉장고 300L',
        prod_text: 'Latest model smartphone with advanced features.',
        prod_likes: 113,
        prod_price: 40000,
      },
      {
        prod_category: '세탁기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod9.png', 
        prod_name: '삼성 그랑데 통버블 세탁기 10kg',
        prod_text: 'Latest model smartphone with advanced features.',
        prod_likes: 164,
        prod_price: 90000,
      },
      {
        prod_category: 'TV',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod10.png', 
        prod_name: '삼성 The Serif QLED 65인치 TV',
        prod_text: 'Latest model smartphone with advanced features.',
        prod_likes: 90,
        prod_price: 50000,
      },
      {
        prod_category: 'TV',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod11.png', 
        prod_name: '삼성 The Frame 75인치',
        prod_text: 'Latest model smartphone with advanced features.',
        prod_likes: 45,
        prod_price: 40000,
      },
      {
        prod_category: '에어컨',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod12.png', 
        prod_name: '삼성 Q9000 스탠드 에어컨 17평형',
        prod_text: 'Latest model smartphone with advanced features.',
        prod_likes: 96,
        prod_price: 110000,
      },
      {
        prod_category: '청소기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod13.png', 
        prod_name: '로보락 Q Revo 로봇청소기',
        prod_text: 'Latest model smartphone with advanced features.',
        prod_likes: 30,
        prod_price: 20000,
      },
      {
        prod_category: '정수기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod14.png', 
        prod_name: 'SK매직 원코크 냉온정 얼음물 정수기',
        prod_text: 'Latest model smartphone with advanced features.',
        prod_likes: 24,
        prod_price: 30000,
      },
      {
        prod_category: '에어컨',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod15.png', 
        prod_name: 'LG 휘센 오브제컬렉션 위너 스탠드 에어컨',
        prod_text: 'Latest model smartphone with advanced features.',
        prod_likes: 11,
        prod_price: 50000,
      },
      {
        prod_category: '정수기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod16.png', 
        prod_name: 'LG 퓨리케어 오브제컬렉션 맞춤출수 냉온정 정수기',
        prod_text: 'Latest model smartphone with advanced features.',
        prod_likes: 0,
        prod_price: 40000,
      },
      {
        prod_category: '공기청정기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod17.png', 
        prod_name: 'LG 퓨리케어 360도 공기청정기 18평형',
        prod_text: 'Latest model smartphone with advanced features.',
        prod_likes: 17,
        prod_price: 60000,
      },
      {
        prod_category: '세탁기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod18.png', 
        prod_name: 'LG 트롬 오브제컬렉션 세탁기',
        prod_text: 'Latest model smartphone with advanced features.',
        prod_likes: 47,
        prod_price: 90000,
      },
      {
        prod_category: '청소기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod19.png', 
        prod_name: 'LG 코드제로 R5 올인원타워 로봇청소기',
        prod_text: 'Latest model smartphone with advanced features.',
        prod_likes: 61,
        prod_price: 80000,
      },
      {
        prod_category: '냉장고',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod20.png', 
        prod_name: 'LG 디오스 오브제컬렉션 노크온 냉장고',
        prod_text: 'Latest model smartphone with advanced features.',
        prod_likes: 11,
        prod_price: 70000,
      },
      {
        prod_category: 'TV',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod21.png', 
        prod_name: 'LG OLED 스마트 TV 55인치',
        prod_text: 'Latest model smartphone with advanced features.',
        prod_likes: 18,
        prod_price: 20000,
      },
    ];

    for (const product of products) {
      await db.Product.create(product);
    }

    console.log('Products have been inserted successfully.');
  } catch (error) {
    next(err);
  } finally {
    await db.sequelize.close();
  }
})();
