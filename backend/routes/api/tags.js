const express = require('express')
const router = express.Router();
const sequelize = require('sequelize')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Tag } = require('../../db/models')
const e = require('express');

//delete a tag
router.delete('/:tagId', requireAuth, async(req, res, next)  => {
    const { tagId } = req.params;
    const userId = req.user.id;

    const deleteTag = await Tag.findByPk(tagId);

    if(!deleteTag) {
        res.status(400)
        res.json({
            message: "Tag couldn't be found",
            statusCode: 404
        })
    }

    else if(userId === deleteTag.userId) {
        if(deleteTag) {
            await deleteTag.destroy();
            res.status(200)
            res.json({
                message: 'Successfully deleted',
                statusCode: 200
            })
        }
    }

    else if(userId !== deleteTag.userId) {
        res.status(403),
        res.json({
            message: 'Forbidden',
            statusCode: 403,
            errors: ['Not authorized to delete tag']
        })
    }

});

module.exports = router;
