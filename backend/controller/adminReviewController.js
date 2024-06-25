const { Review } = require('../models');


//모든 리뷰를 가져오기
exports.getAllReviews = async (req,res,next )=>{
    try{
        const reviews = await Review.findAll();
        res.status(200).json({
            code: 200,
            message: '모든 리뷰 리스트',
            reviews,
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            code: 500,
            message: '서버 오류',
            error: error.message,
        });
    }
};


//리뷰 인증
exports.verifyReview = async (req,res,next)=>{
    try{
        console.log('req.params.id: ',req.params.id)

        const reviewId = req.params.id;  //  req.params.id; 리뷰 아이디를 저장
        const review = await Review.findByPk(reviewId);
        if(!review){
            return res.status(404).json({
                code: 404,
                message: '리뷰를 찾을 수 없습니다.',
                error: {}
            });
        }
        //수동 인증을 위해 rev_isAuth를 true로 변경
        review.isAuth = true;  /////--------rev_isAuth 인지 
        await review.save()
        
        res.status(200).json({
            code: 200,
            message: '리뷰가 인증되었습니다!',
            data:{}
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            code: 500,
            message: '서버 오류',
            error: {
              message:error.message
            },
        });
    }
};