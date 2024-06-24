const express = require('express');
const router = express.Router();
const adminReviewController = require('../controller/adminReviewController');
const isAdmin = require('../Middlewares/isAdmin');

// 모든 리뷰 가져오기
router.get('/', isAdmin, adminReviewController.getAllReviews);

// 리뷰 인증
router.post('/:id/verify', isAdmin, adminReviewController.verifyReview);

module.exports = router;
