const {Product,Review} = require('../models');

//제품 페이지 조회 및 검색
exports.main = async (req,res, next) => {
  try{
    //category 쿼리 가져오기
    const category = req.query.category || 'all';

    //검색 조건 설정하기
    const condition = category === 'all' ? {} : {prod_category : category};

    //제품 목록 가져오기
    const products = await Product.findAll({
      where : condition,
      attributes: ['prod_index', 'prod_img', 'prod_name', 'prod_likes', 'prod_price'] // 필요한 필드 목록
    });

    //요청이 성공한 경우
  res.json({
    code:200,
    message : "성공적으로 제품 데이터를 전송하였습니다.",
    data:{
      products : products// 검색된 결과인 products를  products의 키로 넣어줄 것.
    }
  });
  }catch(err){
    //요청이 실패한 경우 에러처리. 여기서 에러처리를 하지 말고, 에러처리 미들웨어에 전달해준다.
    next(err);
  } 
}

//제품 상세 페이지
exports.details = async (req,res, next) =>{
  try{
    //제품 인덱스에 해당하는 값을 파라미터로 받는다.
    const productId = req.params.prod_idx;
    
    //제품의 상세정보를 조회합니다.
    const productDetail = await Product.findByPk(productId, {
      //product의 prod_img(사진), prod_name(제목), prod_price(비용), prod_likes(좋아요), prod_price(텍스트)를 전송합니다.
      attributes : ['prod_img','prod_name','prod_price','prod_likes'],
      //review의 rev_img(후기사진), rev_rating(별점), rev_title(제목), rev_text(텍스트)를 전송합니다.

      include: [
        {
          model: Review,
          attributes: ['rev_img', 'rev_rating', 'rev_title', 'rev_text'],
          where: {
            prod_index: productId,
            rev_isAuth: true // rev_isAuth가 참인 값만 가져옵니다.
          }
        }
      ]
    });

    //실패할 경우(전송받은 데이터가 비어있을 경우)
    if(!productDetail){
      return res.status(404).json({
        code: 404,
        message: '검색된 제품이 없습니다.',
        error:{}
      });
    }
    //성공 시
    res.json({
      code: 200,
      message: '성공적으로 제품 상세 데이터를 전송하였습니다.',
      data: {
        productDetail: productDetail // 검색된 상세 정보를 productDetail의 키로 넣어줍니다.
      }
    });

  }catch(err){
    next(err);
  }
}

//제품 찜하기
exports.like = async(req,res,next)=>{
  try{
    const productId = req.params.prod_idx;
    const userId = req.session.userId; //세션에 저장된 사용자 ID를 가져올 것.

    //product의
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({
        code: 404,
        message: '제품을 찾을 수 없습니다.',
        error: {}
      });
    }
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        code: 404,
        message: '사용자를 찾을 수 없습니다.',
        error: {}
      });
    }

     // Sequelize의 add 메서드를 통해 연결
    await user.addProduct(product);

     // 성공적으로 연결되었음을 확인할 수 있음
    res.json({
      code: 200,
      message: '제품을 찜했습니다.',
      data: {
        product: product // product 정보 반환
      }
    });
  }catch(err){
    next(err);
  }
};