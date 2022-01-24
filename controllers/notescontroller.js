const router = require('express').Router();
const { text } = require('express');
const validateJWT = require('../middleware/validate-session');
const { models } = require('../models');
const Notes = require('../models/notes');

router.post('/create', validateJWT, async (req, res) => {

    const { text, priority, trackerId } = req.body.notes;

    try {
        await models.NotesModel.create({
            text: text,
            priority: priority,
            trackerId: trackerId,
            userId: req.user.id
        })
            .then(
                Notes => {
                    res.status(201).json({
                        Notes: Notes,
                        message: 'Your notes have been recorded!'
                    });
                }
            )
    } catch (err) {
        res.status(500).json({
            error: `Failed to create your notes: ${err}`
        });
    };
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const results = await models.NotesModel.findOne({
            where: {
                id: id
            }
        })
        if (!results) { res.status(404).json('There are no notes with this ID') }
        res.status(200).json({ message: `Character found`, results: results })
    } catch (err) {
        res.status(500).json({ message: `Failed retrieve notes. Error: ${err}` })
    }
})

router.put('/:id', validateJWT, async (req, res) => {
    const {
        text,
        priority

    } = req.body.notes;
    const { id } = req.params
    const query = {
        where: {
            id: id
        }
    }

    const updatedNotes = {
        text,
        priority
    };

    try {
        const update = await models.NotesModel.update(updatedNotes, query);

        if (update > 0) {
            res.status(202).json({ message: `Your notes were updated!`, Notes: updatedNotes })
        } else {
            res.status(500).json({ message: `Notes have failed.` })
        }
    } catch (err) {
        res.status(500).json({ message: `Failed to update Error: ${err}` })
    }


    //

})
router.delete('/:id', validateJWT, async (req, res) => {
    const { id } = req.params;


    try {
        const query = {
            where: {
                id: id,



            }
        }

        const result = await models.NotesModel.destroy(query);
        if (result) {
            res.status(200).json({ message: 'Your notes have been deleted' });
        } else {
            res.status(400).json({ message: "Failed to delete notes. You may not be the owner of these notes." })
        }
    } catch (err) {
        res.status(500).json({ message: `Failed to delete notes. Error: ${err}` })
    }
})
module.exports = router;