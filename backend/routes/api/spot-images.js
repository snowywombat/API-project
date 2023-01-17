const express = require('express')
const router = express.Router();
const sequelize = require('sequelize')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { SpotImage } = require('../../db/models');
const { Spot } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { captureRejectionSymbol } = require('pg/lib/query');

//delete spot image
router.delete('/:imageId', requireAuth, async(req, res, next) => {
    const { imageId } = req.params;
    const ownerId = req.user.id;

    const findImage = await SpotImage.findByPk(imageId);
    const findSpot = await Spot.findAll({
        where: {
            ownerId: ownerId
        },
        include: [
            {
                model: SpotImage
            }
        ]
    })

    let spotsList = [];
    findSpot.forEach(spot => {
        spotsList.push(spot.toJSON())
    })


    for(spot of spotsList) {
        if(ownerId === spot.ownerId) {
            if (findImage) {
                await findImage.destroy();
                res.status(200),
                res.json({
                    message: 'Successfully deleted',
                    statusCode: 200
                })
            }

            else {
                res.status(400),
                res.json({
                    message: "Spot Image couldn't be found",
                    statusCode: 404
                })
            }
        }

        else if(ownerId !== spot.ownerId) {
            res.status(403),
            res.json({
                message: 'Forbidden',
                statusCode: 403,
                errors: ['Not authorized to delete spot image']
            })
           }

    }


});

module.exports = router;
