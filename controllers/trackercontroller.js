const router = require('express').Router();
const TrackerModel = require('../models')

const { models } = require('../models');

const validateJWT = require('../middleware/validate-session');


router.post('/create', validateJWT, async (req, res) => {

    const { company, title, salary, contactInfo, haveIContacted, haveTheyContacted } = req.body.tracker;

    try {
        models.TrackerModel.create({
            company: company,
            title: title,
            salary: salary,
            contactInfo: contactInfo,
            haveIContacted: haveIContacted,
            haveTheyContacted: haveTheyContacted,
            userId: req.user.id

        })
            .then(
                tracker => {
                    res.status(201).json({
                        tracker: tracker,
                        message: 'New Job Tracker successfully created!'
                    });
                }
            ).catch(error => { console.log(error) })
    } catch (err) {
        console.log(error)
        res.status(500).json

            ({
                error: `Failed to create Job tracker: ${err}`

            });


    };
});
router.get('/', validateJWT, async (req, res) => {
    const { id } = req.params;
    try {
        const results = await models.TrackerModel.findAll({
            where: {
                userId: req.user.id
            }
        })
        res.status(200).json({ message: `Character found`, results: results })
    } catch (err) {
        res.status(500).json({ message: `Failed dasfsdfto get character. Error: ${err}` })
    }
})

router.get('/all', async (req, res) => {

    try {
        const trackers = await models.TrackerModel.findAll();
        res.status(200).json({ trackers })
    } catch (err) {
        res.status(500).json({ message: `Failed pull progress. Error: ${err}` })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const results = await models.TrackerModel.findOne({
            where: {
                id: id
            }
        })
        res.status(200).json({ message: `Character found`, results: results })
    } catch (err) {
        res.status(500).json({ message: `Failed dasfsdfto get character. Error: ${err}` })
    }
})




router.put('/:id', validateJWT, async (req, res) => {
    const {
        company,
        title,
        salary,
        contactInfo,
        haveIContacted,
        haveTheyContacted

    } = req.body.tracker;
    const { id } = req.params
    const query = {
        where: {
            id: id
        }
    }

    const updatedTracker = {
        company,
        title,
        salary,
        contactInfo,
        haveIContacted,
        haveTheyContacted
    };

    try {
        const update = await models.TrackerModel.update(updatedTracker, query);

        if (update > 0) {
            res.status(202).json({ message: `Tracker was updated succesfully!`, tracker: updatedTracker })
        } else {
            res.status(500).json({ message: `Tracker upate failed.` })
        }
    } catch (err) {
        res.status(500).json({ message: `Failed to update Error: ${err}` })
    }



})
router.delete('/:id', validateJWT, async (req, res) => {
    const { id } = req.params;


    try {
        const query = req.user.isAdmin ? {
            where: {
                id: id,



            }
        }
            : {
                where: {
                    id: id,
                    userId: req.user.id
                }
            };
        const result = await models.TrackerModel.destroy(query);
        if (!result) {
            throw "Failed to delete this tracker, you may not have the right ID, or be the owner"
        }
        res.status(200).json({ message: `tracker deleted` })
    } catch (err) {
        res.status(500).json({ message: `Failed to Tracker. Error: ${err}` })
    }
})






module.exports = router;