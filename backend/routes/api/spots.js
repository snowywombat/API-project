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


//get all spots
router.get('/', async (req, res, next) => {
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

    const spot = await Spot.findByPk(spotId);

    try {
        const newImg = await SpotImage.create({
            spotId: spot.id,
            url,
            preview
        })

        res.status(200)
        res.json(newImg)
    }

    catch(error) {
        res.status(404),
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
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
            attributes: ['id', 'url', 'preview'],
        },
        {
            model: User,
            as: 'User',
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

        group: ['Spot.id']

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

    // try {
        if(spot) {
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

    // }

    else if(!spot) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })

    }

    // catch(error) {
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
    // }

});

//delete a spot
router.delete('/:spotId', requireAuth, async(req, res, next) => {
    const { spotId } = req.params;

    const deletedSpot = await Spot.findByPk(spotId);

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


});

//create review for a spot
router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {
    const { spotId } = req.params;
    const { review, stars } = req.body;
    let userId = req.user.id;

    const spot = await Spot.findByPk(spotId);

    try {
        const newReview = await Review.create({
            spotId: spot.id,
            userId: userId,
            review,
            stars

        })

        res.status(200)
        res.json(newReview)
    }

    catch(error) {
        res.status(404),
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

});



//get reviews by spot id
router.get('/:spotId/reviews', async (req, res, next) => {
    const { spotId } = req.params;
    const spot = await Spot.findOne({
        where: {
            id: spotId
        },
        include: [{
            model: Review,
            include: [
                {
                    model: User,
                    as: 'User',
                    attributes: ['id', 'firstName', 'lastName'],
                },
                {
                    model: ReviewImage,
                    as: 'ReviewImages',
                    attributes: ['id', 'url'],
                }
            ]
        }],
        attributes: [],

        group: ['spot.id']

    })

    const Reviews = spot.Reviews
    res.status(200)
    res.json({Reviews})

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
                startDate: 'Start date conflicts with an existing booking',
                endDate: 'End date conflicts with an existing booking'
            }
        })
    }


    else if(endError) {
        res.status(403),
        res.json({
            message: 'Sorry, this spot is already booked for the specified dates',
            statusCode: 403,
            errors: {
                startDate: 'Start date conflicts with an existing booking',
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

})

//get all bookings by spotId
router.get('/:spotId/bookings', requireAuth, async(req, res, next) => {
    const { spotId } = req.params;
    const userId = req.user.id;

    let findSpots = await Spot.findAll({
        where: {
            id: spotId
        },
        attributes: ['ownerId']
    })

    console.log(findSpots)

    if (!findSpots) {
        res.status(404),
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404

        })
    }

    else if(userId !== findSpots.ownerId) {
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

    else if(userId === findSpots.ownerId) {
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

})





module.exports = router;
