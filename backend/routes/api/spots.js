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

    else if(size < 1) {
        res.status(400),
        res.json({
            message: "Validation error",
            statusCode: 400,
            errors: {
                size: "Size must be greater than or equal to 1",
            }
        })
    }

    else if(minLat) {
        if(minLat % 1 === 0 || minLat.toString().length < 4)  {
            res.status(400),
            res.json({
                message: "Validation error",
                statusCode: 400,
                errors: {
                    minLat: "Minimum latitude is invalid",
                }
            })
        }
    }

    else if(maxLat) {
        if(maxLat % 1 === 0 || maxLat.toString().length < 4)  {
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

    else if(minLng) {
        if(minLng % 1 === 0 || minLng.toString().length < 4)  {
            res.status(400),
            res.json({
                message: "Validation error",
                statusCode: 400,
                errors: {
                    minLng: "Minimum longitude is invalid",
                }
            })
        }
    }

    else if(maxLng) {
        if(minLat % 1 === 0 || maxLng.toString().length < 4)  {
            res.status(400),
            res.json({
                message: "Validation error",
                statusCode: 400,
                errors: {
                    maxLng: "Maximum longitude is invalid",
                }
            })
        }
    }

    else if(minPrice) {
        if(minPrice < 0) {
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

    else if(maxPrice) {
        if(maxPrice < 0) {
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
    if(!size) size = 20;

    let pagination = []
    if ((page > 0 || page < 10) && (size > 0 || size < 20)) {
        pagination.limit = size;
        pagination.offset = size * (page - 1)
    }


    const spots = await Spot.findAll({
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            }
        ],

        ...pagination

    })


    let spotsList = [];
    spots.forEach(spot => {
        spotsList.push(spot.toJSON())
    })

    for (let spot of spotsList){

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
            spot.avgRating = 'No reviews exist for this spot.'
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



    // async function loading() {
    //     spotsList.forEach(spot => {

    //         const reviews = Review.findByPk(spot.id, {
    //             attributes: {
    //                 include: [
    //                     [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
    //                 ]
    //             }
    //         });

    //         let res = await (reviews)

    //         console.log(res)

    //         spot.avgRating = reviews.avgRating
    //         console.log(spot.avgRating)

    //         // let reviewsList = [];
    //         // reviews.forEach(review => {
    //         //     reviewsList.push(review.toJSON())
    //         // })
    //         // reviewsList.forEach(review => {
    //         // })

    //         const spotImages = SpotImage.findByPk(spot.id, {
    //             attributes: {
    //                 include: [
    //                     [sequelize.fn('MAX', sequelize.col('url')), 'previewImage']
    //                 ]
    //             }
    //         });

    //         spot.previewImage = spotImages.previewImage

    //         delete spot.Reviews,
    //         delete spot.SpotImages
    // })
    // }

    // let imagesList = [];
    // spotImages.forEach(image => {
    //     imagesList.push(image.toJSON())
    // })


    // imagesList.forEach(image => {
    //     spot.previewImage = image.previewImage
    // })


    return res.json({
        spotsList,
        page,
        size,
        minLat,
        maxLat,
        minLng,
        maxLng,
        minPrice,
        maxPrice

    });
});


//create a spot
router.post('/', handleValidationErrors, requireAuth, async(req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    if(!address || !city || !state || !country || !lat || !lng || !name || !description || !price){
        res.status(400)
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: {
                address: 'Street address is required',
                city: 'City is required',
                state: 'State is required',
                country: 'Country is required',
                lat: 'Latitude is not valid',
                lng: 'Longitude is not valid',
                name: 'Name must be less than 50 characters',
                description: 'Description is required',
                price: 'Price per day is required'
            }
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
    console.log(findSpot)

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
            errors: {
                userId: 'Not authorized to edit spot'

            }
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

    let spots = await Spot.findByPk(spotId, {
        include: [
        {
            model: Review,
            as: 'Reviews',
            attributes: [],
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


        attributes: {
            include:
            [
                [
                    sequelize.fn('COUNT', sequelize.col('Reviews.review')), 'numReviews'
                ],
                [
                    sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgStarRating'
                ],
            ]
        },


        group: ['Spot.id', 'Reviews.id', 'SpotImages.id', 'Owner.id'],
        required: true,
        duplicating: false

    });

    if (!spots) {
        res.status(404);
        res.send({ message: 'Spot Not Found', statusCode: 404 });
    }

    res.json(spots)

});

//edit a spot
router.put('/:spotId', requireAuth, async(req, res, next) => {
    const { spotId } = req.params
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    let ownerId = req.user.id

    const findSpot = await Spot.findByPk(spotId);

    if (findSpot === null) {
        res.status(404),

        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })

    }

    if(!address || !city || !state || !country || !lat || !lng || !name || !description || !price){
        res.status(400)
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: {
                address: 'Street address is required',
                city: 'City is required',
                state: 'State is required',
                country: 'Country is required',
                lat: 'Latitude is not valid',
                lng: 'Longitude is not valid',
                name: 'Name must be less than 50 characters',
                description: 'Description is required',
                price: 'Price per day is required'
            }
        });
    }


    else if(ownerId !== findSpot.ownerId) {
        res.status(403),
        res.json({
            message: 'Forbidden',
            statusCode: 403,
            errors: {
                userId: 'Not authorized to edit spot'

            }
        })
    }

    else if(!req.body) {

        res.status(400),
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: {
                address: 'Street address is required',
                city: 'City is required',
                state: 'State is required',
                country: 'Country is required',
                lat: 'Latitude is not valid',
                lng: 'Longitude is not valid',
                name: 'Name must be less than 50 characters',
                description: 'Description is required',
                price: 'Price per day is required'
            }
        });

    }

    else if(ownerId === findSpot.ownerId){

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
        res.json(findSpot)
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
            errors: {
                ownerId: 'Not authorized to delete spot'

            }
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

    else if (review.length === 0 || (stars < 1 || stars > 5)) {
        res.status(400),
        res.json({
            message: 'Validation error',
            statusCode: 400,
            errors: {
                review: 'Review text is required',
                stars: 'Stars must be an integer from 1 to 5'
            }
        })
    }

    else if(findReviews.length > 0) {
        res.status(403),
        res.json({
            message: 'User already has a review for this spot',
            statusCode: 403
        })

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
            errors: {
                userId: 'Not authorized to make a booking'

            }
        })
    }

    //spot does not belong to owner

    if(findSpot.ownerId !== userId) {

        if(start.getTime() >= end.getTime()) {
            res.status(400),
            res.json({
                message: 'Validation error',
                statusCode: 400,
                errors: {
                    endDate: 'endDate cannot be on or before startDate'
                }
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
                errors: {
                    startDate: 'Start date conflicts with an existing booking'
                }
            })
        }


        else if(endError) {
            res.status(403),
            res.json({
                message: 'Sorry, this spot is already booked for the specified dates',
                statusCode: 403,
                errors: {
                    endDate: 'End date conflicts with an existing booking'
                }
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
router.get('/:spotId/bookings', requireAuth, async(req, res, next) => {
    const { spotId } = req.params;
    const userId = req.user.id;

    let findSpots = await Spot.findByPk(spotId)
    //     where: {
    //         id: spotId,
    //         ownerId: userId
    //     },
    //     attributes: ['ownerId']
    // })

    if (!findSpots) {
        res.status(404),
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404

        })
    }

    if(findSpots) {
        if(userId !== findSpots.ownerId) {
            const Bookings = await Booking.findAll({
                where: {
                    spotId: spotId
                },

                attributes: ['spotId', 'startDate', 'endDate'],

                // group: ['booking.id']

            })

            res.status(200)
            res.json({ Bookings })
        }

        else  {
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

                // group: ['booking.id']

            })

            res.status(200)
            res.json({ Bookings })

        }
    }

})


module.exports = router;
