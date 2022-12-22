const express = require('express')
const router = express.Router();
const sequelize = require('sequelize')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { captureRejectionSymbol } = require('pg/lib/query');

//delete spot image
router.delete('/:imageId', requireAuth, async(req, res, next) => {
    const { imageId } = req.params;
    const ownerId = req.user.id;

    const currentImage = await SpotImage.findByPk(imageId);

    if(ownerId === currentImage.ownerId) {
        if (currentImage) {
            await currentImage.destroy();
            res.status(200)
            res.json({
                message: 'Successfully deleted',
                statusCode: 200
            })
        }

        else {
            res.status(400)
            res.json({
                message: "Spot Image couldn't be found",
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
                ownerId: 'Not authorized to delete spot image'

            }
        })
    }

});

module.exports = router;
