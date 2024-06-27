const db = require('../models'); // models 폴더에서 db 객체를 가져옵니다.

(async (req,res,next) => {
  try {
    await db.sequelize.sync(); // 모든 정의된 모델을 DB에 동기화합니다.

    // products 테이블에 데이터가 있는지 확인
    const existingProductsCount = await db.Product.count();
    if (existingProductsCount === 0) {
      // products 테이블이 비어 있는 경우에만 데이터 삽입
    const products = [
      {
        prod_category: '정수기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod1.png', 
        prod_name: '코웨이 아이콘 냉온정 얼음정수기',
        prod_text: '코웨이 아이콘 냉온정 얼음정수기는 현대적이고 기능적인 디자인으로 주거 공간에 아름다움을 더합니다. 이 제품은 우수한 성능과 혁신적인 기술을 통해 사용자에게 최상의 사용 경험을 제공합니다. 이 제품의 핵심 기능 중 하나는 다양한 물의 온도 선택이 가능한 점입니다. 냉수, 온수, 실온수를 모두 제공하여 사용자가 필요에 따라 쉽게 선택할 수 있습니다. 냉수는 더위를 식히고 체온을 내리며 상쾌한 느낌을 줍니다. 온수는 차를 끓이기 번거로워하지 않고도 뜨거운 음료를 즉시 제공합니다. 실온수는 즉석에서 바로 마시기에 적합하며 다양한 용도로 사용할 수 있습니다. 또한, 아이콘 냉온정 얼음정수기는 얼음 제조 기능이 탑재되어 있어 여름철 더운 날씨에도 식사나 음료를 시원하게 즐길 수 있습니다. 얼음을 원하는 모양으로 제작할 수 있는 옵션도 제공하여 사용자의 취향에 맞게 선택할 수 있습니다. 제품의 디자인은 공간을 절약하면서도 우아하고 세련되게 디자인되었습니다. 모던한 외관과 함께 주방이나 거실에 어울리는 컬러 팔레트를 제공하여 인테리어와 조화를 이룹니다. 간결하면서도 사용자 편의성을 최대화하는 UI와 직관적인 조작 방법은 모든 연령층에게 쉽고 편리한 사용 경험을 제공합니다. 코웨이 아이콘 냉온정 얼음정수기는 고품질의 소재와 철저한 품질 관리를 통해 오랜 사용에도 불구하고 안정적인 성능을 유지합니다. 에너지 효율성과 환경 친화적인 제품 설계는 에너지 소비를 최소화하고 지구 환경 보호에 기여합니다. 이 모든 기능과 디자인 요소들이 결합된 코웨이 아이콘 냉온정 얼음정수기는 현대 가정의 필수적인 가전제품으로서, 생활의 질을 높이는 데 큰 기여를 합니다.',
        prod_likes: 0,
        prod_price: 80000,
      },
      {
        prod_category: '공기청정기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod2.png', 
        prod_name: '코웨이 듀얼클린 제습공기청정기',
        prod_text: '코웨이 듀얼클린 제습공기청정기는 현대적이고 세련된 디자인으로 주거 공간에 고급스러움을 더하는 동시에, 강력한 공기청정과 제습 기능을 제공하여 사용자의 건강과 편안함을 책임집니다. 이 제품은 뛰어난 듀얼클린 기술을 기반으로 하여 공기 중의 다양한 유해 물질을 효과적으로 제거합니다. 먼지, 집진, 꽃가루 등의 미세한 입자들을 청정하면서도, 공기 중의 유해 화학 물질, 포름알데히드, 휘발성 유기 화합물(VOCs) 등을 신속하게 감지하고 제거하여 실내 공기를 맑고 깨끗하게 유지합니다.또한, 듀얼클린 제습공기청정기는 우수한 제습 기능을 제공하여 습기로 인한 불쾌감을 줄여줍니다. 특히 습도가 높은 계절이나 습기가 많은 지역에서 사용하면, 실내의 고온다습한 환경을 적절히 조절하여 건강한 생활 공간을 유지할 수 있습니다. 이는 곰팡이와 같은 습기로 인한 공기질 악화 요소들을 줄여주어 알레르기 반응을 예방하고 숨쉬기 좋은 환경을 제공합니다. 코웨이 듀얼클린 제습공기청정기는 또한 사용자 편의성을 고려한 다양한 기능을 갖추고 있습니다. 터치 스크린을 통한 직관적인 조작, 자동 모드를 통한 최적의 공기 처리, 예약 설정을 통한 에너지 절약 등의 기능이 있어 사용자가 편리하게 사용할 수 있습니다. 종합적으로 코웨이 듀얼클린 제습공기청정기는 고급스러운 디자인과 강력한 성능을 결합하여, 현대 인테리어에 잘 어울리며 건강하고 쾌적한 실내 환경을 유지하는 데 큰 도움을 줍니다.',
        prod_likes: 0,
        prod_price: 110000,
      },
      {
        prod_category: '공기청정기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod3.png', 
        prod_name: '삼성 비스포크 큐브 에어 인피니트 라인 공기청정기 30평형',
        prod_text: '삼성 비스포크 큐브 에어 인피니트 라인 공기청정기는 최신 기술과 혁신적인 디자인을 결합하여 공기 청정과 관리를 목적으로 하는 고급형 공기청정기입니다. 이 제품은 다양한 기능과 성능을 제공하여 사용자에게 깨끗하고 건강한 실내 환경을 제공합니다. 먼저, 비스포크 큐브 에어 인피니트 라인 공기청정기는 강력한 공기 청정 성능을 자랑합니다. 고급 HEPA 필터와 활성 탄소 필터를 통해 99.97% 이상의 미세먼지, 초미세먼지, 바이러스, 세균 및 악취를 제거하여 실내 공기를 깨끗하게 정화합니다. 또한, 듀얼 에어 인피니티 라인 테크놀로지를 채용하여 최대 30평 규모의 공간을 효과적으로 처리할 수 있습니다. 이 제품은 스마트 기능을 통해 사용자 편의성을 극대화합니다. Wi-Fi 연결을 통해 스마트폰 애플리케이션을 통해 원격으로 공기 청정기를 제어하고 모니터링할 수 있습니다. 또한, AI 기술을 활용하여 실내 공기질 상태를 실시간으로 모니터링하고, 필터 교체 알림 등을 제공하여 관리가 용이합니다. 디자인 측면에서도 비스포크 큐브 에어 인피니트 라인은 세련되고 현대적인 룩을 자랑합니다. 공간을 가로지르는 형태의 큐브 디자인은 공기청정기가 실내 인테리어와 잘 어울리도록 설계되었으며, 다양한 색상 옵션을 제공하여 사용자의 취향에 맞는 선택이 가능합니다. 이 외에도 자동 모드, 수면 모드, 타이머 기능 등 다양한 사용자 맞춤형 설정이 가능하며, 저소음 작동으로 실내 환경을 조용하게 유지할 수 있습니다. 삼성 비스포크 큐브 에어 인피니트 라인 공기청정기는 공기 청정과 관리에 있어서 혁신적인 솔루션을 제공하며, 사용자들에게 안심하고 건강한 생활 환경을 제공하는 데 기여합니다.',
        prod_likes: 0,
        prod_price: 40000,
      },
      {
        prod_category: '청소기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod4.png', 
        prod_name: '삼성 비스포크 제트 AI 무선청소기 310W',
        prod_text: '삼성 비스포크 제트 AI 무선청소기 310W는 혁신적인 기술과 세련된 디자인을 결합하여 사용자에게 뛰어난 청소 경험을 제공하는 제품입니다. 이 청소기는 강력한 310W 디지털 인버터 모터를 탑재하여 탁월한 흡입력을 제공합니다. 이를 통해 먼지와 이물질을 신속하게 흡입하며, 다양한 바닥재나 특수한 표면에서도 효과적인 청소를 가능하게 합니다. 또한, 다양한 물건이나 가구 사이를 깔끔하게 청소할 수 있는 터보 액션 브러시가 포함되어 있어 사용자의 청소 효율성을 크게 높여줍니다. 이 청소기는 AI 기술을 활용하여 스마트하고 직관적인 청소를 가능하게 합니다. AI Dust Sensor 기능은 청소 중 먼지의 양을 실시간으로 감지하여 최적의 흡입 세기를 자동으로 조절합니다. 이로 인해 사용자는 더욱 효율적이고 저음의 청소를 경험할 수 있습니다. 디자인적으로도 뛰어나며, 삼성의 비스포크 시리즈 특유의 커스터마이징 기능을 제공합니다. 다양한 컬러와 디자인 옵션을 선택할 수 있어 개인의 취향에 맞춘 공간에 잘 어울리며, 집안 인테리어와 조화를 이룹니다. 무선으로 사용할 수 있어 이동이 자유롭고 편리하며, 장시간 사용을 위한 강력한 배터리 수명을 자랑합니다. 또한, 하이퍼 파워 모드와 같은 고급 기능을 통해 더욱 어려운 청소 작업을 효과적으로 처리할 수 있습니다. 종합적으로 삼성 비스포크 제트 AI 무선청소기 310W는 고성능과 스마트 기능을 결합하여 현대적인 가정에서 필수적인 청소 도구로서 높은 평가를 받고 있습니다.',
        prod_likes: 0,
        prod_price: 70000,
      },
      {
        prod_category: '에어컨',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod5.png', 
        prod_name: '삼성 비스포크 윈도우핏 창문형 에어컨 6평형',
        prod_text: '삼성 비스포크 윈도우핏 창문형 에어컨 6평형은 현대적인 디자인과 고급스러운 기능을 갖춘 창문형 에어컨 제품입니다. 이 제품은 주거 공간이나 사무실의 창문에 간편하게 설치할 수 있어, 공간을 효과적으로 활용할 수 있습니다. 이 에어컨은 강력한 성능을 바탕으로 실내 공기를 신속하게 냉방하고, 필요한 경우 따뜻한 난방 기능도 제공합니다. 6평형의 적정 용량은 중소형 공간에 최적화되어 있어, 사용자가 원하는 온도와 환경을 쉽게 조절할 수 있습니다. 비스포크 시리즈의 특징인 커스터마이징 기능을 통해 다양한 디자인과 색상 옵션을 선택할 수 있어, 사용자의 인테리어 스타일에 맞춘 맞춤형 설치가 가능합니다. 이로써 에어컨이 공간에 잘 어울리며, 외관과 기능 모두에서 사용자의 만족도를 높이는 역할을 합니다. 또한, 에너지 효율성이 뛰어나 에너지 소비를 줄이는 데 기여하며, 지능형 제어 기능을 통해 편리하고 스마트한 사용 경험을 제공합니다. 사용자는 Wi-Fi 연결을 통해 스마트폰이나 태블릿을 통해 원격으로 에어컨을 제어하고 모니터링할 수 있습니다. 종합적으로 삼성 비스포크 윈도우핏 창문형 에어컨 6평형은 현대적인 디자인과 뛰어난 성능을 결합하여 사용자에게 효율적이고 편리한 공간 관리를 제공하는 고급 에어컨 제품입니다.',
        prod_likes: 0,
        prod_price: 80000,
      },
      {
        prod_category: '세탁기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod6.png', 
        prod_name: '삼성 비스포크 그랑데 세탁기 AI',
        prod_text: '삼성 비스포크 그랑데 세탁기 AI는 최신 기술과 혁신적인 디자인을 결합하여 사용자에게 뛰어난 세탁 경험을 제공하는 세탁기입니다. 이 제품은 다양한 고급 기능을 탑재하여 효율적인 세탁을 가능하게 하며, 스마트하고 편리한 사용자 경험을 제공합니다. 그랑데 세탁기 AI는 인공지능 기술을 활용하여 세탁 과정을 최적화합니다. AI Wash 기능은 세탁물의 종류와 양을 감지하여 최적의 세탁 조건을 자동으로 설정합니다. 이를 통해 사용자는 세탁물의 종류나 양에 따라 별도의 설정을 하지 않아도 최상의 세탁 결과를 얻을 수 있습니다. 세탁 성능 또한 뛰어나며, 강력한 흡수력을 가진 디지털 인버터 모터가 장착되어 소음을 최소화하면서도 안정적인 세탁을 가능하게 합니다. 또한, 고급스러운 스테인리스 스틸 드럼과 자동 청정 기능을 통해 세탁기 내부를 깨끗하게 유지할 수 있습니다. 사용자 편의성을 고려한 다양한 기능도 제공됩니다. Wi-Fi 연결을 통해 스마트폰 애플리케이션을 통해 원격으로 세탁기를 제어하고 모니터링할 수 있으며, 세탁 완료 시 알림 기능도 지원하여 사용자가 세탁물을 효율적으로 관리할 수 있습니다. 디자인적으로도 모던하고 고급스러운 비스포크 시리즈의 특징을 잘 반영하여 다양한 인테리어 스타일에 잘 어울리며, 사용자가 선택할 수 있는 다양한 컬러 옵션도 제공됩니다. 이를 통해 세탁기가 공간에 잘 어울리며, 스타일과 기능 모두에서 높은 만족도를 제공합니다. 종합적으로 삼성 비스포크 그랑데 세탁기 AI는 최신 기술과 탁월한 세탁 성능을 결합하여 사용자에게 뛰어난 편의성과 세탁 효율성을 제공하는 고급 세탁기로 평가받고 있습니다.',
        prod_likes: 0,
        prod_price: 120000,
      },
      {
        prod_category: '냉장고',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod7.png', 
        prod_name: '삼성 비스포크 4도어 냉장고',
        prod_text: '삼성 비스포크 4도어 냉장고는 현대 주방의 필수품으로, 최신 기술과 디자인을 결합하여 사용자에게 탁월한 경험을 제공합니다. 이 냉장고는 매우 스타일리시하며, 고급스러운 외관과 다양한 컬러 옵션으로 주방 인테리어에 잘 어울립니다. 비스포크 시리즈의 특징인 디자인은 고급스럽고 세련되어 있어, 사용자들 사이에서 인기가 매우 높습니다. 또한, 비스포크 4도어 냉장고는 사용자 편의성을 극대화하기 위해 다양한 공간과 수납 옵션을 제공합니다. 내부적으로는 유연한 조정이 가능한 선반과 공간 활용을 최적화하는 기능들이 장착되어 있어, 식품 보관과 관리가 매우 편리합니다. 스마트 기능 역시 이 제품의 큰 강점 중 하나입니다. 스마트폰 애플리케이션을 통해 원격으로 냉장고를 제어하고 모니터링할 수 있습니다. 식품 유통기한 관리, 내부 온도 조절, 냉동실 설정 등을 스마트하게 관리할 수 있어, 사용자의 생활을 더욱 편리하게 만들어 줍니다. 냉장고의 성능 역시 탁월합니다. 신선도 유지를 위한 최신 기술이 적용되어 있으며, 에너지 효율성도 뛰어납니다. 이를 통해 전력 소모를 최소화하면서도 최상의 성능을 유지할 수 있습니다. 종합적으로 삼성 비스포크 4도어 냉장고는 현대적인 생활에 필수적인 고급 냉장고로, 디자인과 기능 면에서 사용자들에게 높은 만족을 제공하는 제품입니다.',
        prod_likes: 0,
        prod_price: 60000,
      },
      {
        prod_category: '냉장고',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod8.png', 
        prod_name: '삼성 냉장고 300L',
        prod_text: '삼성의 300L 용량 냉장고는 소형 가정용으로 설계된 제품으로, 실용적인 기능과 현대적인 디자인을 갖추고 있습니다. 이 제품은 공간 효율성을 극대화하기 위해 실내 구성이 잘 조정되어 있습니다. 다양한 식품을 보관하기에 적합한 크기와 수납 공간을 제공하여 사용자가 식료품을 효율적으로 정리하고 관리할 수 있습니다. 냉장고 내부는 스마트하게 구성되어 있어, 각 구획별로 온도와 습도를 쉽게 조절할 수 있습니다. 식품의 신선도를 오랫동안 유지할 수 있는 기능이 갖춰져 있어, 사용자가 식품을 오래 보관할 수 있습니다. 디자인적으로도 현대적이고 심플하며, 다양한 인테리어에 잘 어울리는 스타일을 제공합니다. 소형 냉장고임에도 불구하고 세련된 외관과 다양한 컬러 옵션을 선택할 수 있는 선택 폭을 제공합니다. 또한, 에너지 효율성 측면에서도 우수한 성능을 보여줍니다. 최신 기술이 적용된 냉장고로, 전력 소비를 줄이면서도 최적의 성능을 발휘할 수 있어 가정의 전기 요금을 절감하는 데 도움을 줍니다. 종합적으로 삼성의 300L 냉장고는 소형 가정에서 현대적인 생활을 지원하는 실용적이고 성능 우수한 제품으로, 식품 보관과 관리를 편리하게 해주며 디자인적으로도 만족스러운 선택입니다.',
        prod_likes: 0,
        prod_price: 40000,
      },
      {
        prod_category: '세탁기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod9.png', 
        prod_name: '삼성 그랑데 통버블 세탁기 10kg',
        prod_text: '삼성 그랑데 통버블 세탁기 10kg는 현대적인 기술과 사용자 친화적인 기능을 갖춘 대용량 세탁기입니다. 이 세탁기는 10kg의 대용량으로, 대가족이나 많은 양의 세탁물을 처리할 수 있어 가정 생활에서 매우 유용합니다. 세탁 공간을 효율적으로 활용할 수 있으며, 각종 의류와 침구류를 한 번에 세탁할 수 있는 편리함을 제공합니다. 그랑데 통버블 기술은 세탁 과정에서 효율적인 세탁을 가능하게 합니다. 세탁기 내부에서 옷 간에 더 잘 통하는 통버블 구조가 적용되어 세탁 물질이 옷 섬유 사이로 통과할 때 물질이 더 효과적으로 세탁됩니다. 이 기술은 세탁물을 부드럽게 다루면서도 효율적인 세탁을 제공하여 세탁 후에도 최상의 세탁 품질을 유지할 수 있습니다. 또한, 스마트 기능을 지원하여 사용자가 세탁기를 쉽게 제어하고 모니터링할 수 있습니다. 스마트폰 애플리케이션을 통해 원격으로 세탁 프로그램을 설정하거나 세탁이 완료되었는지 확인할 수 있어 사용 편의성을 크게 높입니다. 디자인적으로도 현대적이며, 다양한 인테리어에 잘 어울리는 스타일을 제공합니다. 실버 컬러와 고급스러운 디자인으로 주방이나 세탁실에서도 잘 어우러집니다. 종합적으로 삼성 그랑데 통버블 세탁기 10kg는 대가족을 위한 대용량 세탁기로, 현대적인 기술과 성능을 겸비하여 효율적인 세탁 경험을 제공하는 제품입니다.',
        prod_likes: 0,
        prod_price: 90000,
      },
      {
        prod_category: 'TV',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod10.png', 
        prod_name: '삼성 The Serif QLED 65인치 TV',
        prod_text: '삼성 The Serif QLED 65인치 TV는 독특하고 세련된 디자인과 최신 기술을 결합한 프리미엄 TV입니다. 이 TV는 고유의 아이코닉한 디자인을 자랑합니다. "서플라이" 디자이너 로닉 아란이 디자인한 The Serif는 전통적인 TV의 틀을 깨고 세로로 서있는 형태로, 방에 자연스럽게 어울리는 아름다운 물체로서의 역할을 합니다. 위선을 포함한 실제로 하나의 인테리어 요소로 작동합니다. 이 TV는 65인치의 대형 화면을 갖추고 있으며, QLED 기술을 채택하여 화면의 밝기와 색상 표현력을 최적화합니다. 색감의 깊이와 선명도를 뛰어난 HDR 기능으로 제공하며, 밝고 어두운 장면에서도 세밀한 디테일을 잘 보여줍니다. 또한, The Serif TV는 삼성의 스마트 TV 플랫폼인 Tizen을 탑재하고 있어 다양한 스트리밍 서비스에 쉽게 접근할 수 있습니다. 사용자는 넷플릭스, 유튜브 등 인기 있는 앱을 통해 영화, 드라마, 게임을 감상할 수 있습니다. 또한, 스마트폰과의 연결을 통해 화면을 미러링하거나 컨트롤하는 기능도 지원합니다. 음향적으로도 뛰어난 성능을 자랑합니다. The Serif TV는 멀티채널 사운드 시스템을 갖추고 있어 몰입감 있는 오디오 경험을 제공합니다. 사운드 채널이 TV의 다양한 방향으로 퍼져 공간감을 제공하며, 특히 영화나 음악을 보다 생생하게 즐길 수 있습니다. 종합적으로 삼성 The Serif QLED 65인치 TV는 독특하고 혁신적인 디자인을 갖춘 고급 TV로, 뛰어난 화질과 음향, 스마트 기능을 결합하여 최고의 시청 경험을 제공합니다.',
        prod_likes: 0,
        prod_price: 50000,
      },
      {
        prod_category: 'TV',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod11.png', 
        prod_name: '삼성 The Frame 75인치',
        prod_text: '삼성 The Frame 75인치 TV는 고급스러운 디자인과 혁신적인 기술을 결합한 프리미엄 TV 제품입니다. 이 TV는 그림을 감상하는 것처럼 TV를 감상할 수 있는 느낌을 주기 위해 디자인되었습니다. 실제로 그림액자처럼 벽에 걸려 있는 듯한 느낌을 주며, 인테리어에 조화롭게 어울리는 디자인을 자랑합니다. 벽에 설치할 때 특히 두드러진다고 할 수 있습니다. 화면은 75인치의 대형 디스플레이를 갖추고 있으며, QLED 기술을 채용하여 밝고 선명한 화질을 제공합니다. HDR 기능을 지원하여 깊고 세밀한 색감을 표현하며, 어두운 장면에서도 디테일을 잘 보여줍니다. 또한, 삼성의 최신 이미지 프로세서를 탑재하여 영상 처리 속도와 품질을 향상시키며, 움직임이 빠른 장면에서도 끊김 없는 자연스러운 화면 전환을 제공합니다. The Frame TV는 삼성의 스마트 TV 플랫폼 Tizen을 기반으로 하여 다양한 온라인 콘텐츠에 쉽게 접근할 수 있습니다. 넷플릭스, 유튜브 등 인기 있는 스트리밍 서비스를 지원하며, 사용자는 편리하게 컨텐츠를 탐색하고 시청할 수 있습니다. 또한, 스마트폰과의 연결을 통해 화면을 미러링하거나 콘텐츠를 공유할 수 있는 기능도 제공됩니다. 음향적으로도 The Frame TV는 풍부한 사운드를 제공합니다. 멀티채널 사운드 시스템을 탑재하여 몰입감 있는 오디오 경험을 제공하며, TV의 디자인에 어울리는 현대적인 사운드 솔루션을 제공합니다. 종합적으로 삼성 The Frame 75인치 TV는 혁신적인 디자인과 최고의 화질, 스마트 기능을 결합하여 고급스러운 시청 경험을 제공하는 프리미엄 TV입니다.',
        prod_likes: 0,
        prod_price: 40000,
      },
      {
        prod_category: '에어컨',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod12.png', 
        prod_name: '삼성 Q9000 스탠드 에어컨 17평형',
        prod_text: '삼성 Q9000 스탠드 에어컨 17평형은 고급스러운 디자인과 뛰어난 성능을 갖춘 공기 조화 기기입니다. 이 제품은 첨단 기술을 활용하여 효율적인 냉난방을 제공합니다. 먼저, 강력한 냉방 성능을 특징으로 하며, 17평형의 공간에 적합한 용량을 갖추고 있어 넓은 공간을 효과적으로 냉각할 수 있습니다. 또한, 공기를 깨끗하게 유지하는데 중점을 둬 실내 공기를 신선하고 청정하게 유지할 수 있습니다. 디자인적으로도 Q9000은 세련되고 현대적인 스탠드 형태를 채택하여 실내 인테리어에 잘 어울리며, 공간을 아름답게 완성시킬 수 있습니다. 블랙 컬러와 금속 마감이 현대적인 느낌을 더합니다. 이 에어컨은 사용자의 편의를 고려하여 다양한 스마트 기능을 탑재하고 있습니다. 스마트폰 애플리케이션을 통해 원격으로 제어할 수 있고, 예약 설정을 통해 원하는 시간에 자동으로 켜지거나 꺼지도록 설정할 수 있습니다. 또한, 삼성의 AI 기술을 적용하여 사용 패턴을 학습하고 최적의 에너지 소비를 지원하여 에너지 효율성을 높이는 기능도 갖추고 있습니다. 종합적으로 삼성 Q9000 스탠드 에어컨 17평형은 뛰어난 냉방 성능과 현대적인 디자인, 스마트 기능을 제공하여 사용자에게 최고의 편안함을 제공하는 고급 에어컨 제품입니다.',
        prod_likes: 0,
        prod_price: 110000,
      },
      {
        prod_category: '청소기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod13.png', 
        prod_name: '로보락 Q Revo 로봇청소기',
        prod_text: '로보락 Q Revo 로봇청소기는 혁신적인 기술과 편리한 기능을 갖춘 스마트 홈 청소 도구입니다. 로보락 Q Revo는 먼저 강력한 청소 성능을 자랑합니다. 최대 3000Pa의 집진력을 제공하여 다양한 바닥 재질에서 효과적으로 먼지와 이물질을 제거할 수 있습니다. 이는 고층 타일, 나무 바닥, 카페트 등 다양한 바닥에서도 뛰어난 성능을 발휘합니다. 또한, 다단계 먼지 필터링 시스템을 통해 미세한 먼지까지 철저하게 걸러내어 깨끗한 공기를 유지합니다. 이 로봇청소기는 스마트 기능이 풍부하여 사용자의 생활을 편리하게 만듭니다. Wi-Fi 연결을 통해 스마트폰 앱을 통해 언제 어디서나 청소를 시작하거나 일정을 설정할 수 있습니다. 또한, 가상 벽을 설정하여 특정 구역을 제한하거나 피해야 할 장애물을 설정할 수 있어 청소의 효율성을 높입니다. 맵핑 기능을 활용하여 가정의 구조를 학습하고 최적의 청소 경로를 설정하여 더욱 효율적인 청소를 지원합니다. 디자인적으로도 로보락 Q Revo는 낮은 프로필과 슬림한 디자인을 갖추고 있어 가구 아래와 같은 좁은 공간도 청소할 수 있습니다. 진공과 스크럽 브러시를 결합한 2in1 청소 기능을 제공하여 청소 작업을 한 번에 처리할 수 있습니다. 종합적으로 로보락 Q Revo 로봇청소기는 강력한 성능과 스마트 기능을 갖춘 혁신적인 제품으로, 사용자의 생활을 더욱 편리하고 청결하게 유지할 수 있도록 도와줍니다.',
        prod_likes: 0,
        prod_price: 20000,
      },
      {
        prod_category: '정수기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod14.png', 
        prod_name: 'SK매직 원코크 냉온정 얼음물 정수기',
        prod_text: 'SK매직 원코크 냉온정 얼음물 정수기는 현대적인 디자인과 탁월한 기능을 결합한 고급 정수기입니다. 먼저, 이 제품은 냉수, 온수, 실온수를 제공하는 다기능 정수기로, 사용자의 다양한 필요에 맞춰 물을 편리하게 제공합니다. 냉수는 상온보다 낮은 온도로 신선하게 유지되며, 온수는 차가운 날씨에도 따뜻한 물을 제공하여 편리하게 이용할 수 있습니다. 또한, 실온수는 간편하게 사용할 수 있어 다양한 요구에 맞춰 최적의 물 온도를 제공합니다. 이 정수기는 얼음물 기능이 탑재되어 여름철 뜨거운 날씨에도 시원한 얼음물을 제공합니다. 얼음 물 탱크에서 얼음을 생성하고 물과 함께 제공하여 더욱 상쾌한 마실 거리를 제공합니다. 이는 가정 내에서 시원하고 맛있는 물을 즐기고자 하는 사람들에게 적합한 기능입니다. 디자인적으로도 SK매직 원코크 냉온정 얼음물 정수기는 모던하면서도 실용적인 디자인을 갖추고 있습니다. 스테인리스 스틸 소재와 깔끔한 LED 디스플레이를 통해 고급스러운 느낌을 제공하며, 주방이나 사무실 등 다양한 공간에 어울립니다. 또한, 사용자 편의성을 높이기 위해 간편한 버튼 조작 및 친화적인 UI를 채택하여 사용자 경험을 향상시킵니다. 종합적으로 SK매직 원코크 냉온정 얼음물 정수기는 현대적인 디자인과 다양한 기능을 갖춘 고급 정수기로, 물의 품질과 온도를 유지하면서 사용자의 생활을 더욱 편리하고 쾌적하게 만들어 줍니다.',
        prod_likes: 0,
        prod_price: 30000,
      },
      {
        prod_category: '에어컨',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod15.png', 
        prod_name: 'LG 휘센 오브제컬렉션 위너 스탠드 에어컨',
        prod_text: 'LG 휘센 오브제컬렉션 위너 스탠드 에어컨은 현대적인 디자인과 강력한 성능을 자랑하는 스탠드형 에어컨입니다. 먼저, 이 제품은 LG의 휘센 기술을 기반으로 제작되어, 고급스러운 외관과 함께 최신 기술이 적용되어 있습니다. 휘센 기술은 효율적인 냉방 및 난방 성능을 제공하며, 다양한 온도 조절 기능을 통해 사용자가 원하는 환경을 조성할 수 있습니다. 특히, 강력한 냉방 능력으로 더운 여름철에도 시원한 공기를 제공하며, 안정적인 난방 기능으로 추운 겨울철에도 따뜻함을 유지합니다. 디자인적으로는 LG의 오브제컬렉션 디자인 컨셉을 채택하여 현대적이고 세련된 외관을 자랑합니다. 고급스러운 메탈 컬러와 깔끔한 디자인 세부사항이 조화를 이루며, 인테리어에 더욱 뛰어난 시각적 효과를 제공합니다. 또한, 사용자 편의성을 고려한 조작 패널과 LCD 디스플레이를 통해 간편한 사용이 가능합니다. 기능적으로는 LG의 스마트 기술을 적용하여 스마트폰과 연동하여 원격으로 제어할 수 있는 기능을 제공합니다. LG ThinQ 앱을 통해 에어컨의 작동을 멀리서도 간편하게 조절할 수 있으며, 에너지 절약 모드와 타이머 기능을 통해 전력 소비를 최소화하면서도 효율적인 에어컨 운영이 가능합니다. 종합적으로 LG 휘센 오브제컬렉션 위너 스탠드 에어컨은 현대적인 디자인과 강력한 성능을 결합하여, 사용자에게 최상의 편의성과 효율성을 제공하는 스탠드형 에어컨입니다.',
        prod_likes: 0,
        prod_price: 50000,
      },
      {
        prod_category: '정수기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod16.png', 
        prod_name: 'LG 퓨리케어 오브제컬렉션 맞춤출수 냉온정 정수기',
        prod_text: 'LG 퓨리케어 오브제컬렉션 맞춤출수 냉온정 정수기는 최신 기술과 세련된 디자인이 결합된 고급스러운 정수기입니다. 이 제품은 LG의 퓨리케어 기술을 기반으로 제작되어, 신선하고 깨끗한 물을 제공합니다. 냉수와 온수를 제공하며, 필터 교체가 간편하고 사용자가 원하는 수온을 선택할 수 있는 맞춤출수 기능을 갖추고 있습니다. 이는 다양한 사용 환경에 맞춰 편리하게 사용할 수 있는 장점을 제공합니다. 디자인적으로는 LG의 오브제컬렉션 컨셉을 따라 현대적이고 세련된 외관을 자랑합니다. 고급스러운 메탈 컬러와 간결한 디자인이 조화를 이루며, 주방 인테리어에 더욱 매력적인 시각적 요소를 제공합니다. 또한, 사용자 편의성을 고려하여 터치 버튼과 LCD 디스플레이를 갖추어 간편한 조작이 가능합니다. 기능적으로는 LG의 최신 기술을 활용하여 물의 순도를 유지하고 에너지 소비를 최소화하는 스마트 모드를 제공합니다. 또한, 필터 교체 주기와 관리 안내 기능을 통해 사용자가 정수기를 효율적으로 관리할 수 있도록 지원합니다. 또한, LG ThinQ 앱을 통해 스마트폰에서도 제어가 가능하여 언제 어디서나 편리하게 사용할 수 있습니다. 종합적으로 LG 퓨리케어 오브제컬렉션 맞춤출수 냉온정 정수기는 고급스러운 디자인과 최신 기술이 결합된 제품으로, 사용자에게 탁월한 물의 품질과 사용 편의성을 제공합니다.',
        prod_likes: 0,
        prod_price: 40000,
      },
      {
        prod_category: '공기청정기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod17.png', 
        prod_name: 'LG 퓨리케어 360도 공기청정기 18평형',
        prod_text: 'LG 퓨리케어 360도 공기청정기는 최신 기술과 뛰어난 성능을 갖춘 공기청정기로, 주거나 상업 공간에서 공기 질을 개선하는 데 적합한 제품입니다. 이 공기청정기는 360도로 공기를 흡입하여 청정화하는 기능을 제공합니다. 먼지, 습기, 냄새, 균 등 다양한 유해 물질을 효과적으로 제거하여 깨끗하고 신선한 공기를 유지할 수 있습니다. 특히, LG의 퓨리케어 기술은 고성능 필터와 함께 사용되어 미세 먼지부터 초미세먼지까지 효과적으로 제거하며, 알레르기를 유발할 수 있는 유해 물질도 신속하게 제거합니다. 디자인적으로는 현대적이고 세련된 외관을 자랑하며, 공간에 어울리는 심플한 디자인이 사용자에게 매력적입니다. 터치 버튼과 LCD 디스플레이를 통해 직관적인 조작이 가능하며, 사용자 편의성을 고려하여 설계되었습니다. 기능적으로는 LG ThinQ 플랫폼을 통해 스마트폰 애플리케이션을 이용하여 원격으로 공기 청정기를 제어할 수 있습니다. 사용자는 언제 어디서나 공기 상태를 모니터링하고 제어할 수 있어, 편리하고 스마트한 사용 경험을 제공받을 수 있습니다. 또한, 자동 모드와 타이머 기능을 지원하여 에너지를 효율적으로 관리할 수 있습니다. 종합적으로 LG 퓨리케어 360도 공기청정기는 고급스러운 디자인과 강력한 성능을 갖춘 제품으로, 다양한 공간에서 청정하고 건강한 공기를 유지하는 데 탁월한 선택이 될 것입니다.',
        prod_likes: 0,
        prod_price: 60000,
      },
      {
        prod_category: '세탁기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod18.png', 
        prod_name: 'LG 트롬 오브제컬렉션 세탁기',
        prod_text: 'LG 트롬 오브제컬렉션 세탁기는 혁신적인 기술과 세련된 디자인이 결합된 고급스러운 세탁기입니다. 이 세탁기는 LG의 최신 기술을 적용하여 세탁 효율성을 극대화하고 사용자 편의성을 높였습니다. 특히, LG의 트롬 워시테크놀로지를 기반으로 하여 세탁 과정 중에도 옷 감김을 최소화하고 세탁물의 형태를 보존합니다. 또한, 터보워시 기능을 통해 짧은 시간 내에 효과적인 세탁을 완료할 수 있습니다. 디자인적으로는 오브제컬렉션의 컨셉에 맞춰 현대적이고 세련된 외관을 자랑합니다. 메탈 톤과 부드러운 곡선이 조화를 이루며, 주거 공간에 고급스러운 느낌을 더해줍니다. 또한, 사용자 인터페이스가 간결하고 직관적이어서 사용이 편리합니다. 기능적으로는 LG ThinQ 기술을 탑재하여 스마트폰 애플리케이션을 통해 원격으로 세탁기를 제어하고 모니터링할 수 있습니다. 세탁 상태를 실시간으로 확인하고 사용자 맞춤 세탁 프로그램을 설정할 수 있어, 편리하고 스마트한 세탁 경험을 제공받을 수 있습니다. 또한, 에너지 효율성을 고려하여 물과 전기를 절약하는 기능도 갖추고 있습니다. 종합적으로 LG 트롬 오브제컬렉션 세탁기는 고급스러운 디자인과 혁신적인 기술이 결합된 세탁기로, 세탁 효율성과 사용자 편의성을 동시에 만족시키는 최고의 선택입니다.',
        prod_likes: 0,
        prod_price: 90000,
      },
      {
        prod_category: '청소기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod19.png', 
        prod_name: 'LG 코드제로 R5 올인원타워 로봇청소기',
        prod_text: 'LG 코드제로 R5 올인원타워 로봇청소기는 현대적인 기술과 강력한 성능을 자랑하는 스마트 로봇청소기입니다. 이 제품은 LG의 최신 기술력을 바탕으로 하여, 집안의 다양한 바닥 재질에 맞춘 효율적인 청소를 가능하게 합니다. 코드제로 R5은 스마트 트루맵핑을 통해 주변 환경을 인식하고 최적의 청소 경로를 계획합니다. 이를 통해 세밀하고 완벽한 청소를 실현하며, 사용자가 직접 경험하는 청결감을 높입니다. 로봇청소기의 핵심 기능 중 하나는 딥러닝 기술을 활용한 AI 색상 카메라입니다. 이 기술은 색상을 인식하여 가구와 장애물을 피해가며 최적의 청소 경로를 설정합니다. 또한, 센서 기반의 방문 청소와 함께 자동 충전 기능을 갖추어 배터리가 소진되면 스스로 충전 도크로 돌아가 충전합니다. LG 코드제로 R5은 Wi-Fi 연결을 지원하여 LG ThinQ 앱을 통해 스마트폰에서 원격으로 제어할 수 있습니다. 사용자는 언제 어디서나 청소 상태를 모니터링하고, 청소 시간을 계획하며, 청소 프로그램을 설정할 수 있습니다. 또한, 음성 인식 기능을 지원하여 AI 스피커와 연동하여 음성 명령으로 청소를 시작하거나 멈출 수 있습니다. 디자인적으로는 실버 메탈 컬러와 현대적인 디자인이 결합되어 모든 공간에 잘 어울리며, 집안의 인테리어에 더욱 가치를 더합니다. 특히, 터치 버튼을 통한 간편한 사용성과 큰 용량의 먼지통을 갖추어 장시간 청소가 가능합니다. 종합적으로 LG 코드제로 R5 올인원타워 로봇청소기는 혁신적인 기술과 높은 성능을 자랑하여, 스마트한 청소 경험과 함께 현대적인 생활에 필수적인 가전 제품으로 손색이 없습니다.',
        prod_likes: 0,
        prod_price: 80000,
      },
      {
        prod_category: '냉장고',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod20.png', 
        prod_name: 'LG 디오스 오브제컬렉션 노크온 냉장고',
        prod_text: 'LG 디오스 오브제컬렉션 노크온 냉장고는 현대적인 디자인과 첨단 기술이 결합된 프리미엄 냉장고입니다. 이 냉장고는 LG의 디오스 시리즈 중 하나로, 오브제컬렉션의 일환으로 독특한 외관 디자인과 고급 소재를 사용하여 현대적이고 세련된 느낌을 주는 제품입니다. 노크온 기능을 갖추고 있어 문을 두드리거나 발을 차는 등의 간단한 동작으로도 내부를 확인하고 절전 모드로 전환할 수 있습니다. 디오스 노크온 냉장고는 LG의 인버터 선형 압축기 기술을 이용하여 에너지 효율성을 극대화하며, 더욱 조용하고 오래 사용할 수 있는 제품을 제공합니다. 이러한 기술은 온도 변화에 따라 신속하고 정확하게 조절되어 신선도를 유지하며 식품을 오랫동안 신선하게 보관할 수 있습니다. 냉장고 내부는 공간 활용을 극대화한 슬림 디자인으로 설계되었으며, 다양한 조리 식품을 보관할 수 있는 다양한 수납 공간과 적절한 냉동실 용량을 제공합니다. 또한, 스마트 기술을 통해 사용자가 언제든지 냉장고의 상태를 모니터링하고 제어할 수 있는 기능을 갖추고 있습니다. 디오스 노크온 냉장고는 디지털 인버터 컨트롤을 통해 정확하게 온도를 유지하며, LG ThinQ 기술을 통해 Wi-Fi 연결을 지원하여 스마트폰에서 원격으로 제어할 수 있습니다. 또한, 음성 인식 기능을 지원하여 AI 스피커와 연동하여 음성 명령으로 냉장고를 제어할 수 있습니다. 종합적으로 LG 디오스 오브제컬렉션 노크온 냉장고는 현대적인 디자인과 첨단 기술이 결합된 프리미엄 냉장고로, 사용자에게 높은 편의성과 기능성을 제공하여 일상 생활을 더욱 편리하게 만들어 줍니다.',
        prod_likes: 0,
        prod_price: 70000,
      },
      {
        prod_category: 'TV',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod21.png', 
        prod_name: 'LG OLED 스마트 TV 55인치',
        prod_text: 'LG OLED 스마트 TV 55인치는 최신 기술과 고급 디스플레이를 특징으로 하는 고해상도 텔레비전입니다. OLED 기술은 각 픽셀이 독립적으로 발광하므로 더욱 생생하고 정교한 화면을 제공합니다. 이 TV는 깊고 우수한 검은색 표현과 동시에 탁월한 명암 비율을 제공하여 현실감 있는 시청 경험을 제공합니다. 55인치의 화면 크기는 일반적인 거실에 적합하며, 넓은 시야각과 높은 해상도를 통해 콘텐츠를 선명하게 시청할 수 있습니다. LG의 AI ThinQ 기술을 탑재하여 인공지능 기능을 갖추고 있어, 음성으로 TV를 제어하거나 다양한 스마트 기능을 활용할 수 있습니다. 또한, LG Magic Remote와의 호환성을 통해 손쉽게 TV를 조작할 수 있습니다. 이 TV는 최신 HDR 기술을 지원하여 HDR10 Pro와 Dolby Vision을 포함한 다양한 HDR 형식을 처리할 수 있습니다. 이로 인해 풍부한 색감과 더 깊고 섬세한 그래디언트를 보여줍니다. 또한, 4K 해상도를 지원하여 고해상도 콘텐츠를 더욱 생생하게 시청할 수 있습니다. 디자인적으로도 LG OLED 스마트 TV는 미끄럼 방지 베젤리스 디자인과 얇은 프레임을 갖추고 있어 모던하고 세련된 외관을 자랑합니다. 벽에 부착할 수 있는 옵션을 포함한 다양한 설치 방식을 지원하여 실내 공간을 효율적으로 활용할 수 있습니다. 종합적으로, LG OLED 스마트 TV 55인치는 고급 기술과 뛰어난 화질을 제공하여 홈 엔터테인먼트 경험을 한 단계 높여줄 수 있는 최신 TV입니다.',
        prod_likes: 0,
        prod_price: 20000,
      },
    ];

    for (const product of products) {
      await db.Product.create(product);
    }

    console.log('성공적으로 데이터베이스에 기본 제품 데이터를 INSERT 하였습니다.');
  }else{
    console.log('기본 제품 데이터가 이미 존재합니다.');
  }
  } catch (err) {
    next(err);
  }
})();
