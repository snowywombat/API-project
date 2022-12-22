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

    let { page, size } = req.query;

    //minLat, maxLat, minLng, maxLng, minPrice, maxPrice

    page = parseInt(page);
    size = parseInt(size);

    if(!page) page = 1;
    if(!size) size = 20;

    let pagination = []
    if ((page > 0 || page < 10) && (size > 0 || size < 20)) {
        pagination.limit = size;
        pagination.offset = size * (page - 1)
    }

    if(page < 1) {
        res.status(400),
        res.json({
            message: "Validation error",
            statusCode: 400,
            errors: {
            username: "Page must be greater than or equal to 1",
            }
        })
    }

    else if(size < 1) {
        res.status(400),
        res.json({
            message: "Validation error",
            statusCode: 400,
            errors: {
            username: "Size must be greater than or equal to 1",
            }
        })
    }



    const spots = await Spot.findAll({
        include: [{
            model: Review,
            as: 'Reviews',
            attributes: [],
        },
        {
            model: SpotImage,
            as: 'SpotImages',
            attributes: [],
        }],

        attributes: [
            "id",
            "ownerId",
            "address",
            "city",
            "state",
            "country",
            "lat",
            "lng",
            "name",
            "description",
            "price",
            [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'],
            [sequelize.fn('MAX', sequelize.col('SpotImages.url')), 'previewImage'],
        ],

        group: ['Spot.id', 'Reviews.stars', 'SpotImages.url'],

        ...pagination

    })

    return res.json({
        spots,
        page,
        size
    });
});

//create a spot
router.post('/', handleValidationErrors, requireAuth, async(req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    try {
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

    catch(error) {
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
})

//create an image for a spot
router.post('/:spotId/images', requireAuth, async(req, res, next) => {
    const { spotId } = req.params
    const { url, preview } = req.body;
    const ownerId = req.user.id;

    const spot = await Spot.findByPk(spotId, {
        // where: {
        //     ownerId: req.user.id
        // }
    })

    //if user has spot
    if(ownerId === spot.ownerId) {

       if(!spot) {
            res.status(404),
            res.json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        }

        else {

           await SpotImage.create({
                spotId: spot.id,
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

    }

    else {
        res.status(403),
        res.json({
            message: 'Forbidden',
            statusCode: 403,
            errors: {
                ownerId: 'Not authorized to add image'

            }
        })
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
        include: [{
            model: Review,
            as: 'Reviews',
            attributes: [],
        },
        {
            model: SpotImage,
            as: 'SpotImages',
            attributes:
                ['id', 'url', 'preview']

        },
        {
            model: User,
            as: 'Owner',
            attributes: ['id', 'firstName', 'lastName']
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

        group: ['SpotImages.id']

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

    const spot = await Spot.findByPk(spotId);
    let ownerId = req.user.id

    console.log(ownerId)

    if (ownerId === spot.ownerId) {
        if(spot){
            if(ownerId) {
                ownerId = ownerId;
            }
            if(address) {
                spot.address = address;
            }
            if(city) {
                spot.city = city;
            }
            if(state) {
                spot.state = state;
            }
            if(country) {
                spot.country = country;
            }
            if(lat) {
                spot.lat = lat;
            }
            if(lng) {
                spot.lng = lng;
            }
            if(name) {
                spot.name = name;
            }
            if(description) {
                spot.description = description;
            }
            if(price) {
                spot.price = price;
            }
            spot.save();

            res.status(200)
            res.json(spot)

        }


        else if(!spot) {
            res.status(404)
            res.json({
                message: "Spot couldn't be found",
                statusCode: 404
            })

        }

        else {
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
    }

    else {
        res.status(403),
        res.json({
            message: 'Forbidden',
            statusCode: 403,
            errors: {
                userId: 'Not authorized to edit spot'

            }
        })
    }


});

//delete a spot
router.delete('/:spotId', requireAuth, async(req, res, next) => {
    const { spotId } = req.params;
    const ownerId = req.user.id;

    const deletedSpot = await Spot.findByPk(spotId);

    if(ownerId === deletedSpot.ownerId) {
        if(deletedSpot) {
            await deletedSpot.destroy();
            res.status(200)
            res.json({
                message: 'Successfully deleted',
                statusCode: 200
            })
        } else {
            res.status(400)
            res.json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        }
    }

    else {
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

    console.log(findReviews.length)

    if(!findSpot) {
        res.status(404),
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    else if(findReviews.length > 0) {
        res.status(403),
        res.json({
            message: 'User already has a review for this spot',
            statusCode: 403
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

            group: ['Review.id', 'ReviewImages.id']
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

    const spot = await Spot.findByPk(spotId, {
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

    //spot does not belong to owner

    if(spot.ownerId !== userId) {

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

        if(!spot) {
            res.status(404),
            res.json({
                message: "Spot couldn't be found",
                statusCode: 404
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
            spotId: spot.id,
            userId: userId,
            startDate,
            endDate
            })

            bookings.save();
            res.status(200)
            res.json(bookings)
        }
    }

    else {
        res.status(403),
        res.json({
            message: 'Forbidden',
            statusCode: 403,
            errors: {
                userId: 'Not authorized to make a booking'

            }
        })
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

                attributes: ["id", 'spotId', 'startDate', 'endDate'],

                group: ['booking.id']

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

                group: ['booking.id']

            })

            res.status(200)
            res.json({ Bookings })

        }
    }

})





module.exports = router;
