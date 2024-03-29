const express = require('express')
const router = express.Router();
const sequelize = require('sequelize')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot } = require('../../db/models');
const { User } = require('../../db/models');
const { Review } = require('../../db/models');
const { Booking } = require('../../db/models');
const { SpotImage } = require('../../db/models');
const { ReviewImage } = require('../../db/models');
const { Tag } = require('../../db/models')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { captureRejectionSymbol } = require('pg/lib/query');
const { DATEONLY } = require('sequelize');
const { get } = require('./reviews');
const { user } = require('pg/lib/defaults');
const { Sequelize, Op } = require("sequelize");
const e = require('express');



//get all spots
router.get('/', async (req, res, next) => {

    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    const where = {}

    page = parseInt(page);
    size = parseInt(size);


    if(page < 1) {
        res.status(400),
        res.json({
            message: "Validation error",
            statusCode: 400,
            errors: {
                page: "Page must be greater than or equal to 1",
            }
        })
    }

    if(size < 1) {
        res.status(400),
        res.json({
            message: "Validation error",
            statusCode: 400,
            errors: {
                size: "Size must be greater than or equal to 1",
            }
        })
    }

    //minLat
    if(minLat && !maxLat) {
        if(minLat % 1 !== 0) {
            where.lat = {
                [Op.gte]: req.query.minLat,
            }

        }

        else if(minLat % 1 === 0)  {
            res.status(400)
            res.json({
                message: "Validation error",
                statusCode: 400,
                errors: {
                    minLat: "Minimum latitude is invalid",
                }
            })
        }
    }


    //maxLat
    if(maxLat && !minLat) {
        if( maxLat % 1 !== 0) {
            where.lat = {
                [Op.lte]: req.query.maxLat
            }

        }

        else if(maxLat % 1 === 0)  {
            res.status(400),
            res.json({
                message: "Validation error",
                statusCode: 400,
                errors: {
                    maxLat: "Maximum latitude is invalid",
                }
            })
        }
    }

   //minLng
   if(minLng && !maxLng) {
        if(minLng % 1 !== 0) {
            where.lng = {
                [Op.gte]: req.query.minLng,

            }

        }

        else if(minLng % 1 === 0)  {
            res.status(400)
            res.json({
                message: "Validation error",
                statusCode: 400,
                errors: {
                    minLng: "Minimum longitude is invalid",
                }
            })
        }
    }


    //maxLng
    if(maxLng && !minLng) {
        if(maxLng % 1 !== 0) {
            where.lng = {
                [Op.lte]: req.query.maxLng
            }

        }

    else if(maxLng % 1 === 0)  {
            res.status(400)
            res.json({
                message: "Validation error",
                statusCode: 400,
                errors: {
                    maxLng: "Maximum longitude is invalid",
                }
            })
        }
    }

    //minPrice
    if(minPrice && !maxPrice) {
        if(minPrice >= 0) {
            where.price = {
                [Op.gte]: req.query.minPrice
            }
        }

        else if(minPrice < 0) {
            res.status(400),
            res.json({
                message: "Validation error",
                statusCode: 400,
                errors: {
                    minPrice: "Minimum price must be greater than or equal to 0",
                }
            })
        }
    }


    //maxPrice
    if(maxPrice && !minPrice) {
        if(maxPrice >= 0) {
            where.price = {
                [Op.lte]: req.query.maxPrice
            }
        }
    else if(maxPrice < 0) {
            res.status(400),
            res.json({
                message: "Validation error",
                statusCode: 400,
                errors: {
                    maxPrice: "Maximum price must be greater than or equal to 0",
                }
            })
        }
    }


    //both lat
    if(minLat && maxLat) {
        if(minLat % 1 !== 0 || maxLat % 1 !== 0) {
            where.lat = {
                [Op.gte]: req.query.minLat,
                [Op.lte]: req.query.maxLat
            }

        }
        else if(minLat % 1 === 0)  {
            res.status(400)
            res.json({
                message: "Validation error",
                statusCode: 400,
                errors: {
                    minLat: "Minimum latitude is invalid",
                }
            })
        }

        else if(maxLat % 1 === 0)  {
            res.status(400),
            res.json({
                message: "Validation error",
                statusCode: 400,
                errors: {
                    maxLat: "Maximum latitude is invalid",
                }
            })
        }
    }

    //both lng
    if(minLng && maxLng) {
        if(minLng % 1 !== 0 && maxLng % 1 !== 0) {
            where.lng = {
                [Op.gte]: req.query.minLng,
                [Op.lte]: req.query.maxLng
            }
        }

        else if(minLng % 1 === 0)  {
            res.status(400)
            res.json({
                message: "Validation error",
                statusCode: 400,
                errors: {
                    minLng: "Minimum longitude is invalid",
                }
            })
        }

        else if(maxLng % 1 === 0)  {
            res.status(400)
            res.json({
                message: "Validation error",
                statusCode: 400,
                errors: {
                    maxLng: "Maximum longitude is invalid",
                }
            })
        }

    }

    //both prices
    if(minPrice && maxPrice) {
        if(minPrice >= 0 && maxPrice >= 0) {
            where.price = {
                [Op.gte]: req.query.minPrice,
                [Op.lte]: req.query.maxPrice
            }
        }
        else if(minPrice < 0) {
            res.status(400),
            res.json({
                message: "Validation error",
                statusCode: 400,
                errors: {
                    minPrice: "Minimum price must be greater than or equal to 0",
                }
            })
        }
        else if(maxPrice < 0) {
            res.status(400),
            res.json({
                message: "Validation error",
                statusCode: 400,
                errors: {
                    maxPrice: "Maximum price must be greater than or equal to 0",
                }
            })
        }

    }


    if(!page) page = 1;
    if(!size) size = 24;

    let pagination = []
    if ((page > 0 || page < 10) && (size > 0 || size < 24)) {
        pagination.limit = size;
        pagination.offset = size * (page - 1)
    }


    const findSpots = await Spot.findAll({
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            }
        ],

        where,
        ...pagination,

    })


    let Spots = [];
   findSpots.forEach(spot => {
        Spots.push(spot.toJSON())
    })

    for (let spot of Spots){

        const reviews = await Review.findAll({
            where: {
                spotId: spot.id
            },
            attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']]
        })

        if(reviews[0].dataValues.avgRating) {
            spot.avgRating = reviews[0].dataValues.avgRating
        }
        else {
            spot.avgRating = '';
        }

        const images = await SpotImage.findAll({
            where: {
                spotId: spot.id
            },
            attributes: [[sequelize.fn('MIN', sequelize.col('url')), 'previewImage']]
        })

        if(images[0].dataValues.previewImage) {
            spot.previewImage = images[0].dataValues.previewImage
        }
        else {
            spot.previewImage = 'No images exist for this spot.'
        }


        delete spot.Reviews,
        delete spot.SpotImages

    }


    return res.json({
        Spots,
        page,
        size,
    });
});


//create a spot
router.post('/', requireAuth, async(req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    if(!address) {
        res.status(400)
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: ['Street address is required']
        });
    }

    else if(address.length > 256) {
        res.status(400)
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: ['Address must be less than 256 characters.']
        });
    }

    else if(!city) {
        res.status(400)
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: ['City is required']
        });
    }

    else if(city.length > 50) {
        res.status(400)
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: ['City must be less than 50 characters.']
        });
    }

    else if(!state) {
        res.status(400)
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: ['State is required']
        });
    }

    else if(state.length > 50) {
        res.status(400)
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: ['State must be less than 50 characters.']
        });
    }

    else if(!country) {
        res.status(400)
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: ['Country is required']
        });
    }

    else if(country.length > 50) {
        res.status(400)
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: ['Country must be less than 50 characters.']
        });
    }

    else if(!lat) {
        res.status(400)
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: ['Latitude is not valid']
        });
    }

    else if(!lng) {
        res.status(400)
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: ['Longitude is not valid']
        });
    }

    else if(!name) {
        res.status(400)
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: ['Name is required']
        });
    }

    else if(name.length > 50) {
        res.status(400)
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: ['Name must be less than 50 characters']
        });
    }

    else if(!description) {
        res.status(400)
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: ['Description is required']
        });
    }

    else if(description.length > 256) {
        res.status(400)
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: ['Description must be less than 256 characters.']
        });
    }

    else if(!price) {
        res.status(400)
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: ['Price per day is required']
        });
    }

    else {
        const ownerId = req.user.id
        const newSpot = await Spot.create({
            ownerId,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        });

        res.status(201)
        res.json(newSpot)
    }

})

//create an image for a spot
router.post('/:spotId/images', requireAuth, async(req, res, next) => {
    const { spotId } = req.params
    const { url, preview } = req.body;

    const ownerId = req.user.id;

    const findSpot = await Spot.findByPk(spotId, {
        where: {
            ownerId: ownerId
        }
    })

    if(findSpot === null) {

        res.status(404),
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }


    else if(ownerId !== findSpot.ownerId) {
        res.status(403),
        res.json({
            message: 'Forbidden',
            statusCode: 403,
            errors: ['Not authorized to edit spot']
        })
    }

    //if user has spot
    else if(ownerId === findSpot.ownerId) {

        await SpotImage.create({
            spotId: findSpot.id,
            url,
            preview
        })

        const findImg = await SpotImage.findAll({
            where: {
                spotId: spotId
            },
            attributes: {
                exclude: ['spotId','updatedAt', 'createdAt']
            }
        })

        res.status(200)
        res.json(findImg)

    }


})



//get all spots owned by the current user
router.get('/current', requireAuth, async(req, res, next) => {
    const ownerId = req.user.id
    const spots = await Spot.findAll({
        where: {
            ownerId: ownerId
        },
        include: [{
            model: Review,
            as: 'Reviews',
            attributes: [],
        },
        {
            model: SpotImage,
            as: 'SpotImages',
            attributes: [],
        }
        ],
        attributes: {
            include:
            [
                [
                    sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'
                ],
                [
                    sequelize.fn('MAX', sequelize.col('SpotImages.url')), 'previewImage'
                ],
            ]
        },

        group: ['Spot.id']

    })

    res.json({ spots })

})


//get details of a Spot from an id
router.get('/:spotId', async(req, res, next) => {
    const { spotId } = req.params
    //findAll reviews where spotId == spot id
    //calculate the num reviews, average review score
    //after find spot convert to json object, add keys and values to spots
    let reviews = await Review.findAll({
        where: {
            spotId: spotId
        }
    })

    function avgStars(reviews)  {
        let sum = 0;

        reviews.forEach(review => {
            sum += review.stars
        });

        return (sum * 1.0 / reviews.length).toFixed(2)
    }


    const review = reviews.length



    let spots = await Spot.findByPk(spotId, {
        include: [
        {
            model: Review,
            as: 'Reviews',
            attributes: ['review', 'stars'],
        },
        {
            model: SpotImage,
            as: 'SpotImages',
            attributes: ['id', 'url', 'preview'],
        },
        {
            model: User,
            as: 'Owner',
            attributes: ['id', 'firstName', 'lastName'],
        }],

        // attributes: {
        //     include:
        //     [
        //         [
        //             sequelize.fn('COUNT', sequelize.col('Reviews.id')), 'numReviews'
        //         ],
        //         [
        //             sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgStarRating'
        //         ],
        //     ]
        // },


        group: ['Spot.id', 'Reviews.id', 'SpotImages.id', 'Owner.id'],
        required: true,
        duplicating: false,

    });

    spotJSON = spots.toJSON()
    spotJSON.numReviews = review
    spotJSON.avgStarRating = avgStars(reviews)

    if (!spots) {
        res.status(404);
        res.send({ message: 'Spot Not Found', statusCode: 404 });
    }

    res.json(spotJSON)

});

//edit a spot
router.put('/:spotId', requireAuth, async(req, res, next) => {
    const { spotId } = req.params
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    let ownerId = req.user.id

    const findSpot = await Spot.findByPk(spotId);

    if (findSpot === null) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })

    }

    if(!address) {
        res.status(400)
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: ['Street address is required']
        });
    }

    else if(address.length > 256) {
        res.status(400)
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: ['Address must be less than 256 characters.']
        });
    }

    else if(!city) {
        res.status(400)
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: ['City is required']
        });
    }

    else if(city.length > 50) {
        res.status(400)
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: ['City must be less than 50 characters.']
        });
    }

    else if(!state) {
        res.status(400)
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: ['State is required']
        });
    }

    else if(state.length > 50) {
        res.status(400)
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: ['State must be less than 50 characters.']
        });
    }

    else if(!country) {
        res.status(400)
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: ['Country is required']
        });
    }

    else if(country.length > 50) {
        res.status(400)
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: ['Country must be less than 50 characters.']
        });
    }

    else if(!lat) {
        res.status(400)
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: ['Latitude is not valid']
        });
    }

    else if(!lng) {
        res.status(400)
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: ['Longitude is not valid']
        });
    }

    else if(!name) {
        res.status(400)
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: ['Name is required']
        });
    }

    else if(name.length > 50) {
        res.status(400)
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: ['Name must be less than 50 characters']
        });
    }

    else if(!description) {
        res.status(400)
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: ['Description is required']
        });
    }

    else if(description.length > 256) {
        res.status(400)
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: ['Description must be less than 256 characters.']
        });
    }

    else if(!price) {
        res.status(400)
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: ['Price per day is required']
        });
    }


    if(ownerId !== findSpot.ownerId) {
        res.status(403)
        return res.json({
            message: 'Forbidden',
            statusCode: 403,
            errors: ['Not authorized to edit spot']
        })
    }

    // if(!req.body) {

    //     res.status(400)
    //     return res.json({
    //         message: 'Validation Error',
    //         statusCode: 400,
    //         errors: [
    //             'Street address is required',
    //             'City is required',
    //             'State is required',
    //             'Country is required',
    //             'Latitude is not valid',
    //             'Longitude is not valid',
    //             'Name must be less than 50 characters',
    //             'Description is required',
    //             'Price per day is required'
    //         ]
    //     });

    // }

    if(ownerId === findSpot.ownerId){

        if(ownerId) {
            ownerId = ownerId;
        }
        if(address) {
            findSpot.address = address;
        }
        if(city) {
            findSpot.city = city;
        }
        if(state) {
            findSpot.state = state;
        }
        if(country) {
            findSpot.country = country;
        }
        if(lat) {
            findSpot.lat = lat;
        }
        if(lng) {
            findSpot.lng = lng;
        }
        if(name) {
            findSpot.name = name;
        }
        if(description) {
            findSpot.description = description;
        }
        if(price) {
            findSpot.price = price;
        }
        findSpot.save();

        res.status(200)
        return res.json(findSpot)
    }


});

//delete a spot
router.delete('/:spotId', requireAuth, async(req, res, next) => {
    const { spotId } = req.params;

    const ownerId = req.user.id;

    const deletedSpot = await Spot.findByPk(spotId);

    if(!deletedSpot) {
        res.status(400)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    else if(ownerId === deletedSpot.ownerId) {
        if(deletedSpot) {
            await deletedSpot.destroy();
            res.status(200)
            res.json({
                message: 'Successfully deleted',
                statusCode: 200
            })
        }
    }

    else if(ownerId !== deletedSpot.ownerId) {
        res.status(403),
        res.json({
            message: 'Forbidden',
            statusCode: 403,
            errors: ['Not authorized to delete spot']

        })
    }


});

//create review for a spot
router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {
    const { spotId } = req.params;
    const { review, stars } = req.body;
    let userId = req.user.id;

    const findSpot = await Spot.findByPk(spotId, {
        where: {
            userId: userId
        }
    });
    const findReviews = await Review.findAll({
        where: {
            userId: userId,
            spotId: spotId
        }
    })


    if(findSpot === null) {
        res.status(404),

        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    else if (review.length === 0) {
        res.status(400),
        res.json({
            message: 'Validation error',
            statusCode: 400,
            errors: [
               'Review cannot be empty',
            ]
        })
    }

    else if ((stars < 1 || stars > 5)) {
        res.status(400),
        res.json({
            message: 'Validation error',
            statusCode: 400,
            errors: [
                'Stars must be an integer from 1 to 5'
            ]
        })
    }

    else if(findReviews.length > 0) {

        const err = new Error('Forbidden');
        err.title = 'Forbidden';
        err.errors = ["You've already created a review for this spot."];
        err.status = 403;
        return next(err);

        // res.status(403),
        // res.json({
        //     message: 'User already has a review for this spot',
        //     statusCode: 403
        // })
    }


    else {
        const newReview = await Review.create({
            spotId: findSpot.id,
            userId: userId,
            review,
            stars

        })

        res.status(201)
        res.json(newReview)
    }

});



//get reviews by spot id
router.get('/:spotId/reviews', async (req, res, next) => {
    const { spotId } = req.params;

    const findSpot = await Spot.findByPk(spotId)

    if(findSpot){
        const Reviews = await Review.findAll({
            where: {
                spotId: spotId
            },
            include: [{
                model: User,
                as: 'User',
                attributes: ['id', 'firstName', 'lastName'],
            },
            {
                model: ReviewImage,
                as: 'ReviewImages',
                attributes: ['id', 'url'],

            }],
            attributes: ['id', 'userId', 'spotId', 'review', 'stars', 'createdAt', 'updatedAt'],

            group: ['Review.id', 'User.id', 'ReviewImages.id'],
            required: true,
            duplicating: false
        })

        res.status(200)
        res.json({Reviews})
    }

   else {
        res.status(404),
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

});

//create booking on spot id
router.post('/:spotId/bookings', requireAuth, async(req, res, next) => {
    const { spotId } = req.params;
    const { startDate, endDate } = req.body;
    let userId = req.user.id;

    const findSpot = await Spot.findByPk(spotId, {
        where: {
            id: spotId,
        }
    });

    const start = new Date(startDate)
    const end = new Date(endDate)


    const findBookings = await Booking.findAll({
        where: {
            spotId: spotId
        },
        attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt']
    })

    if(findSpot === null) {
        res.status(404),
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })

    }

    else if(findSpot.ownerId === userId) {
        res.status(403),
        res.json({
            message: 'Forbidden',
            statusCode: 403,
            errors: ['Not authorized to make a booking']
        })
    }

    //spot does not belong to owner

    if(findSpot.ownerId !== userId) {

        if(start.getTime() >= end.getTime()) {
            res.status(400),
            res.json({
                message: 'Validation error',
                statusCode: 400,
                errors: [
                    'endDate cannot be on or before startDate'
                ]
            })
        }

        if(start.getTime() < Date.now()) {
            res.status(400),
            res.json({
                message: "Validation error",
                statusCode: 400,
                errors: [
                    'A booking past the current date cannot be created'
                ]
            })
        }

        let startError = false;
        let endError = false;

        for(let i = 0; i < findBookings.length; i++) {
            let booking = findBookings[i]

            const bookStartDate = new Date(booking.startDate);
            const bookingStartTime = bookStartDate.getTime();

            const bookEndDate = new Date(booking.endDate);
            const bookingEndTime = bookEndDate.getTime();

            const desiredStart = start.getTime();

            const desiredEnd = end.getTime();

            if(bookingStartTime <= desiredStart && bookingEndTime >= desiredStart) {
                startError = true
            }

            if(bookingStartTime <= desiredEnd && bookingEndTime >= desiredEnd) {
                endError = true
            }


            if(bookingStartTime >= desiredStart && bookingEndTime <= desiredEnd) {
                startError = true,
                endError = true
            }
        }

        if(startError) {
            res.status(403),
            res.json({
                message: 'Sorry, this spot is already booked for the specified dates',
                statusCode: 403,
                errors: [
                'Start date conflicts with an existing booking'
                ]
            })
        }


        else if(endError) {
            res.status(403),
            res.json({
                message: 'Sorry, this spot is already booked for the specified dates',
                statusCode: 403,
                errors: ['End date conflicts with an existing booking']
            })
        }



        else {
            const bookings = await Booking.create({
            spotId: findSpot.id,
            userId: userId,
            startDate,
            endDate
            })

            bookings.save();
            res.status(200)
            res.json(bookings)
        }
    }


})

//get all bookings by spotId
router.get('/:spotId/bookings', async(req, res, next) => {
    const { spotId } = req.params;
    const findSpots = await Spot.findByPk(spotId)


    if(findSpots) {

        const Bookings = await Booking.findAll({
            where: {
                spotId: spotId
            },
            include: [{
                model: User,
                as: 'User',
                attributes: ['id', 'firstName', 'lastName']
            }],
            attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt'],

        })

        res.status(200)
        res.json({Bookings})

    }

    else {
        res.status(404),
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404

        })
    }
})

//get all tags by spotId
router.get('/:spotId/tags', async (req, res, next) => {
    const { spotId } = req.params;

    const findSpot = await Spot.findByPk(spotId)

    if(findSpot) {
        const Tags = await Tag.findAll({
            where: {
                spotId: spotId
            },
            include: [{
                model: User,
                as: 'User',
                attributes: ['id', 'firstName', 'lastName'],
            }],
            attributes: ['id', 'userId', 'spotId', 'tagName', 'createdAt', 'updatedAt']
        })

        res.status(200)
        res.json({Tags})
    }

    else {
        res.status(404),
        res.json({
            message: "Spot couldn't be found",
            status: 404
        })
    }
})

//create tags for a spot
router.post('/:spotId/tags', requireAuth, async (req, res, next) => {
    const { spotId } = req.params;
    const { tagName } = req.body;
    let userId = req.user.id;

    const findSpot = await Spot.findByPk(spotId, {
        where: {
            userId: userId
        }
    })


    if(findSpot === null) {
        res.status(404),

        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    else if (tagName.length === 0) {
        res.status(400),
        res.json({
            message: 'Validation error',
            statusCode: 400,
            errors: [
               'Tag cannot be empty',
            ]
        })
    }

    else {
        const newTag = await Tag.create({
            spotId: findSpot.id,
            userId: userId,
            tagName,

        })

        res.status(201)
        res.json(newTag)
    }
});


module.exports = router;
