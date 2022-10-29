const express = require('express')
const router = express.Router();
const sequelize = require('sequelize')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot } = require('../../db/models');
const { User } = require('../../db/models');
const { Review } = require('../../db/models');
const { SpotImage } = require('../../db/models');
const { ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { captureRejectionSymbol } = require('pg/lib/query');

//get all reviews of current user
router.get('/current', requireAuth, async (req, res, next) => {
    const userId = req.user.id

    const reviews = await Review.findAll({
        where: {
            userId: userId
        },
        include: [{
                    model: User,
                    as: 'User',
                    attributes: ['id', 'firstName', 'lastName'],
                },
                {
                    model: Spot,
                    as: 'Spot',
                    attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat','lng', 'name', 'price'],
                    include:
                    {
                        model: SpotImage,
                        where: { preview: true }
                    }
                },
                {
                    model: ReviewImage,
                    as: 'ReviewImages',
                    attributes: ['id', 'url'],
                },
        ],

        attributes: ['id', 'userId', 'spotId', 'review', 'stars', 'createdAt', 'updatedAt'],

        group: ['Review.id']

    })

    let reviewsList = [];
    reviews.forEach(review => {
        reviewsList.push(review.toJSON())
    })

    reviewsList.forEach(review => {
        review.Spot.SpotImages.forEach(spotImage => {
            if(spotImage.preview === true) {
                review.Spot.previewImage = spotImage.url
            }
        })

        delete review.Spot.SpotImages
    })

    const Reviews = reviewsList
    res.status(200)
    res.json({Reviews})

});

//create an image for a review
router.post('/:reviewId/images', requireAuth, async(req, res, next) => {
    const { reviewId } = req.params
    const { url } = req.body;

    const reviews = await Review.findByPk(reviewId)

    try {
        await ReviewImage.create({
            reviewId: reviews.id,
            url,
        })

        const findImg = await ReviewImage.findAll({
            where: {
                reviewId: reviewId

            },
            attributes: {
                exclude: ['reviewId', 'updatedAt', 'createdAt']
            }

        })

        res.status(200)
        res.json(findImg)
    }

    catch(error) {
        res.status(404),
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

})

//edit a review
router.put('/:reviewId', requireAuth, async(req, res, next) => {
    const { reviewId } = req.params
    const { review, stars } = req.body;

    const findReview = await Review.findByPk(reviewId);

        if(findReview) {
            if(review) {
                findReview.review = review;
            }
            if(stars) {
                findReview.stars = stars;
            }

            findReview.save();

            res.status(200)
            res.json(findReview)

        }

    else if(!findReview) {
        res.status(404)
        res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })

    }

});

//delete a review
router.delete('/:reviewId', requireAuth, async(req, res, next) => {
    const { reviewId } = req.params;

    const deletedReview = await Review.findByPk(reviewId);

    if(deletedReview) {
        await deletedReview.destroy();
        res.status(200)
        res.json({
            message: 'Successfully deleted',
            statusCode: 200
        })
    } else {
        res.status(400)
        res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }


});





module.exports = router;
