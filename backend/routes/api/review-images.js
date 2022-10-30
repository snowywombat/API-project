const express = require('express')
const router = express.Router();
const sequelize = require('sequelize')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { captureRejectionSymbol } = require('pg/lib/query');

//delete spot image
router.delete('/:imageId', requireAuth, async(req, res, next) => {
    const { imageId } = req.params;
    const userId = req.user.id

    const currentImage = await ReviewImage.findByPk(imageId
        , {
        where: {
            userId: userId
        }
    }
    );

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
            message: "Review Image couldn't be found",
            statusCode: 404
        })
    }
});

module.exports = router;