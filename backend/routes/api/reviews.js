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
const e = require('express');

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
                        as: 'SpotImages',
                        where: { preview: true },
                        required: true,
                        duplicating: false
                    },
                    group: ['SpotImages.id']

                },
                {
                    model: ReviewImage,
                    as: 'ReviewImages',
                    attributes: ['id', 'url'],
                },
        ],

        attributes: ['id', 'userId', 'spotId', 'review', 'stars', 'createdAt', 'updatedAt'],

        group: ['Review.id', 'User.id', 'Spot.id', 'SpotImages.id', 'ReviewImages.id'],
        required: true,
        duplicating: false

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
    const userId = req.user.id;

    const findReview = await Review.findByPk(reviewId, {
        where: {
            userId: userId
        }
    })

    const findImages = await ReviewImage.findAll({
        where: {
            reviewId: reviewId
        }
    })

    if (findReview === null) {
        res.status(404),
        res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }


    else if(findImages.length >= 10) {
        res.status(403),
        res.json ({
            message: 'Maximum number of images for this resource was reached',
            statusCode: 403
        })

    }

    else if (userId === findReview.userId) {
        await ReviewImage.create({
            reviewId: findReview.id,
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

    else {
        res.status(403),
        res.json({
            message: 'Forbidden',
            statusCode: 403,
            errors: {
                userId: 'Not authorized to add image to review'

            }
        })
    }

})

//edit a review
router.put('/:reviewId', requireAuth, async(req, res, next) => {
    const { reviewId } = req.params
    const { review, stars } = req.body;
    const userId = req.user.id;

    const findReview = await Review.findByPk(reviewId);

    if(findReview === null) {
        res.status(404),
        res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }

    else if (userId !== findReview.userId) {
        res.status(403),
        res.json({
            message: 'Forbidden',
            statusCode: 403,
            errors: {
                userId: 'Not authorized add image to review'

            }
        })
    }

    else if (review.length === 0 || (stars < 1 || stars > 5) ) {
        res.status(400),
        res.json({
            message: 'Validation error',
            statusCode: 400,
            errors : {
                review: "Review text is required",
                stars: "Stars must be an integer from 1 to 5"
              }
        })
    }

    else if (userId === findReview.userId) {

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

});

//delete a review
router.delete('/:reviewId', requireAuth, async(req, res, next) => {
    const { reviewId } = req.params;
    const userId = req.user.id;

    const deletedReview = await Review.findByPk(reviewId);

    console.log(deletedReview)

    if(!deletedReview) {
        res.status(400)
        res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }

    else if(userId === deletedReview.userId) {
        if(deletedReview) {
            await deletedReview.destroy();
            res.status(200)
            res.json({
                message: 'Successfully deleted',
                statusCode: 200
            })
        }
    }

    else if(userId !== deletedReview.userId) {
        res.status(403),
        res.json({
            message: 'Forbidden',
            statusCode: 403,
            errors: {
                ownerId: 'Not authorized to delete review'

            }
        })
    }


});





module.exports = router;
