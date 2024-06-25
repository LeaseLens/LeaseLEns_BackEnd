const {Review, Product, User, Favorite} = require('../models');
//메인 페이지 렌더링
exports.main = async(req,res,next) => {
  //response에 
  //review 테이블의 모든 항목들의 rev_img, rev_text, rev_title, rev_rating만 모두 가져온다.
  //product 테이블의 모든 항목들의 prod_img, prod_name을 모두 가져온다.
  try{
    // review 테이블에서 필요한 데이터 가져오기
    const reviews = await Review.findAll({
      attributes: ['rev_img', 'rev_text', 'rev_title', 'rev_rating']
    });

    // product 테이블에서 필요한 데이터 가져오기
    const products = await Product.findAll({
      attributes: ['prod_img', 'prod_name']
    });

    // 응답 데이터 구성
    res.json({
      code: 200,
      message: '메인 페이지 데이터 조회 성공',
      data: {
        reviews,
        products
      }
    });  
  }catch(err){
    next(err);
  }
}
//마이 페이지 렌더링
exports.mypage = async(req,res,next) =>{
  try{
    const user_index = req.session.user_Id;
    //user_index에 해당하는 User 테이블의 user_name, user_ID, user_points
    const userInfo = await User.findOne({
      where:{ user_index },
      attributes : ['user_name', 'user_ID', 'user_points'] 
    });
    // user_index에 해당하는 Favorite 테이블에서 prod_index 가져오기
    const userFavorites = await Favorite.findAll({
      where: { user_index },
      attributes: ['prod_index']
    });    

    //user_index에 포함되는 Favorite 테이블의 user_index에 해당하는 prod_index에 해당하는 prod_img, prod_name
    const favoriteProducts = await Product.findAll({
      where:{prod_index : userFavorites.map(fav => fav.prod_index) },
      attributes:['prod_img','prod_name']
    });

    // user_index에 해당하는 Review 테이블의 rev_title, rev_name, rev_createdAt
    const userReviews = await Review.findAll({
      where: { user_index },
      attributes: ['rev_title', 'rev_name', 'rev_createdAt']
    });    
    // 응답 데이터 구성
    res.json({
      code: 200,
      message: '마이 페이지 데이터 조회 성공',
      data: {
        userInfo,
        favoriteProducts,
        userReviews
      }
    });
  }catch(err){
    next(err);
  }
}