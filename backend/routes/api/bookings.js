const express = require('express')
const router = express.Router();
const sequelize = require('sequelize')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking } = require('../../db/models');
const { Spot } = require('../../db/models');
const { User } = require('../../db/models');
const { Review } = require('../../db/models');
const { SpotImage } = require('../../db/models');
const { ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { captureRejectionSymbol } = require('pg/lib/query');
const { get } = require('./reviews');


//get all of current user's bookings
router.get('/current', requireAuth, async(req, res, next) => {
    const userId = req.user.id

    const findBookings = await Booking.findAll({
        where: {
            userId: userId
        },
        include: [{

                    model: Spot,
                    as: 'Spot',
                    attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat','lng', 'name', 'price'],
                    include:
                    {
                        model: SpotImage,
                        where: { preview: true }
                    }
                },
        ],
        attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt'],

        group: ['Booking.id']

    })


    let bookingsList = [];
    findBookings.forEach(booking => {
        bookingsList.push(booking.toJSON())
    })

   bookingsList.forEach(booking => {
        booking.Spot.SpotImages.forEach(spotImage => {
            if(spotImage.preview === true) {
                booking.Spot.previewImage = spotImage.url
            }
        })

        delete booking.Spot.SpotImages
    })


    const Bookings = bookingsList
    res.status(200)
    res.json({Bookings})

});

//edit a booking
router.put('/:bookingId', requireAuth, async(req, res, next) => {
    const { bookingId } = req.params
    const userId = req.user.id;
    const { startDate, endDate } = req.body;
    const start = new Date(startDate)
    const end = new Date(endDate)

    const findBooking = await Booking.findByPk(bookingId);

    if(findBooking.userId === userId) {

        if(!findBooking) {
            res.status(404),
            res.json({
                message: "Booking couldn't be found",
                statusCode: 404
            })
        }

        const bookStartDate = new Date(findBooking.startDate);
        const bookingStartTime = bookStartDate.getTime();

        const bookEndDate = new Date(findBooking.endDate);
        const bookingEndTime = bookEndDate.getTime();

        const desiredStart = start.getTime();

        const desiredEnd = end.getTime();

        let startError = false;
        let endError = false;

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

        if(startError) {
            res.status(403),
            res.json({
                message: 'Sorry, this spot is already booked for the specified dates',
                statusCode: 403,
                errors: {
                    startDate: 'Start date conflicts with an existing booking',
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



        if(end.getTime() <= start.getTime()) {
            res.status(400)
            res.json({
                message: "Validation error",
                statusCode: 400,
                errors: {
                    endDate: 'endDate cannot come before startDate'
                }
            })

        }


        if(bookEndDate.getTime() <= Date.now()) {
            console.log(bookEndDate)
            console.log(end)
            res.status(403),
            res.json({
                message: "Past bookings can't be modified",
                statusCode: 403
            })
        }


        else {
            if(startDate) {
                findBooking.startDate = startDate;
            }
            if(endDate) {
                findBooking.endDate = endDate;
            }

            findBooking.save();

            res.status(200)
            res.json(findBooking)

        }
    }

    else {
        res.status(403),
        res.json({
            message: 'Forbidden',
            statusCode: 403,
            errors: {
               userId: 'Not authorized to modify booking'

            }
        })
    }

});

//delete booking
router.delete('/:bookingId', requireAuth, async(req, res, next) => {
    const { bookingId } = req.params;
    const userId = req.user.id;

    const currentBooking = await Booking.findByPk(bookingId);

    if(currentBooking.userId === userId || userId === ownerId)
        if(currentBooking) {
            const bookStartDate = new Date(currentBooking.startDate);
            const bookingStartTime = bookStartDate.getTime();

            if(bookingStartTime < Date.now()) {
                res.status(403),
                res.json({
                    message: "Bookings that have been started can't be deleted",
                    statusCode: 403
                })
            }
            else  {
                await currentBooking.destroy();
                res.status(200)
                res.json({
                    message: 'Successfully deleted',
                    statusCode: 200
                })
            }
        }

        else {
            res.status(400)
            res.json({
                message: "Booking couldn't be founxd",
                statusCode: 404
            })
        }

        else {
            res.status(403),
            res.json({
                message: 'Forbidden',
                statusCode: 403,
                errors: {
                   userId: 'Not authorized to delete booking'

                }
            })
        }
});


module.exports = router;
